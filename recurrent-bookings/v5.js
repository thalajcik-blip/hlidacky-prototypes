// Variant 2 — "v5 · Repeat booking (calendar)". Replaces the weekday
// repeat with one multi-select calendar: what is selected is what gets
// sent, each date as its own booking request. Plugs into app.js through
// window.RB (shared state, date sheet, time picker, render/send hooks).
// Follows repeat-booking-v5-calendar-spec.md, but on Variant 1's date and
// time row: a series shows in its date cell, and "Several days" can't
// repeat. Pet care is treated like every other service (no visits/stays).

(() => {
  const RB = window.RB;
  const { state, hooks, DOW_LONG, DOW_SHORT, DOW_GRID, MONTHS, day, addDays, sameDay, mondayOf, short, toMinutes, fromMinutes } = RB;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ---------- demo data (spec) ----------

  const DEMO_TODAY = day(2026, 9, 21); // Wed 21.10.2026
  const INITIAL_WEEKS = 5;
  const MORE_WEEKS = 4;
  const SOFT_CAP = 20;

  const v5 = {
    series: null, // sorted dates when 2 or more are booked, else null
  };

  const key = (d) => d.getTime();
  const label = (d) => `${DOW_SHORT[d.getDay()]} ${short(d)}`;
  const kc = (n) => Math.round(n).toLocaleString('cs-CZ');

  // ---------- elements ----------

  const tiles = [...$$('.tile input')]; // babysitting, cleaning, pet care, senior care, tutoring
  const dateField = $('.when [data-date-field="start"]'); // Variant 1's date cell
  const repeatLink = $('[data-v5-repeat]');
  const removeLink = $('[data-v5-remove]');
  const { rateSelect, totalEl, totalLabel, sendBtn } = RB;

  const calSheet = $('[data-cal-sheet]');
  const calTimeline = $('[data-cal-timeline]');
  const calDows = $('[data-cal-dows]');
  const calWeeks = $('[data-cal-weeks]');
  const calMore = $('[data-cal-more]');
  const noteCap = $('[data-cal-note-cap]');
  const calCta = $('[data-cal-cta]');

  const isMulti = () => state.mode === 'multi';
  const oneVisitPrice = () => (RB.durationMinutes() / 60) * Number(rateSelect.value);

  // ---------- main screen ----------
  // Variant 1's row stays as it is; a series replaces the date cell's text
  // with "N dates" over the first date, and that cell then opens the
  // calendar.

  function renderMain() {
    const series = isMulti() ? null : v5.series;
    repeatLink.hidden = !!series;
    removeLink.hidden = !series;

    if (series) {
      const n = series.length;
      dateField.querySelector('[data-start-dow]').textContent = `${n} dates`;
      // The cell is narrow: the count goes on top, the first date below.
      dateField.querySelector('[data-start-date]').textContent = short(series[0]);
      dateField.setAttribute('aria-label', `${n} dates: ${series.map(label).join(', ')} Edit`);
    }

    // Price: one booking (or several days) by the hour, or a series
    // (N × one booking).
    const span = RB.durationMinutes();
    if (span <= 0) {
      totalLabel.textContent = 'total price';
      totalEl.textContent = '–';
    } else if (series) {
      totalLabel.textContent = `${series.length} × ${kc(oneVisitPrice())} Kč`;
      totalEl.textContent = kc(series.length * oneVisitPrice());
    } else {
      const hours = span / 60;
      const h = Number.isInteger(hours) ? hours : hours.toFixed(2).replace(/0$/, '');
      totalLabel.textContent = `total price for ${h} ${hours === 1 ? 'hour' : 'hours'}`;
      totalEl.textContent = kc(oneVisitPrice());
    }

    sendBtn.querySelector('.cta__main').textContent = series ? `Send ${series.length} booking requests` : 'Send booking request';
  }

  repeatLink.addEventListener('click', () => openCal());
  // Removing the repeat keeps the earliest date as a single booking.
  removeLink.addEventListener('click', () => {
    v5.series = null;
    RB.renderForm();
    RB.flash(dateField);
    repeatLink.focus({ preventScroll: true });
  });

  // ---------- calendar sheet ----------
  // Rolling weeks (not month pages), Monday first. Tap a day to toggle it,
  // or a column header for every eligible day in that column.

  let selected = new Set(); // keys of the selected dates
  let weeksStart = null; // Monday of the first shown week
  let weekCount = INITIAL_WEEKS;
  let originalDate = null; // the main-screen date when the sheet opened
  let calCloseTimer = null;

  const shownDays = () => {
    const out = [];
    for (let i = 0; i < weekCount * 7; i++) out.push(addDays(weeksStart, i));
    return out;
  };
  const selectedDates = () => [...selected].sort((a, b) => a - b).map((t) => new Date(t));
  const eligibleInColumn = (col) => shownDays().filter((d) => (d.getDay() + 6) % 7 === col && d >= RB.today);

  function timelineText() {
    if (RB.isOvernight()) return `All dates ${state.startTime} → ${state.endTime} next day`;
    return `All dates ${state.startTime}–${state.endTime}`;
  }

  function cellLabel(d) {
    const parts = [`${DOW_LONG[d.getDay()]} ${d.getDate()}. ${d.getMonth() + 1}.`];
    if (sameDay(d, RB.today)) parts.push('today');
    if (d < RB.today) parts.push('past');
    return parts.join(', ');
  }

  function renderCal() {
    calTimeline.textContent = timelineText();

    // Column headers: tap to (de)select every eligible date in the column.
    calDows.replaceChildren(...DOW_GRID.map((name, col) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mcal__dow';
      btn.textContent = name;
      const eligible = eligibleInColumn(col);
      const all = eligible.length > 0 && eligible.every((d) => selected.has(key(d)));
      btn.setAttribute('aria-pressed', String(all));
      btn.setAttribute('aria-label', `${all ? 'Clear' : 'Select'} every ${DOW_LONG[(col + 1) % 7]} from today`);
      btn.addEventListener('click', () => toggleColumn(col));
      return btn;
    }));

    // Weeks, with a small month heading above the first week of each month.
    // Weekends are tinted as in the date sheet's month view.
    const rows = [];
    for (let w = 0; w < weekCount; w++) {
      const monday = addDays(weeksStart, w * 7);
      const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
      const first = days.find((d) => d.getDate() === 1);
      if (w === 0 || first) {
        const m = first || monday;
        const h = document.createElement('div');
        h.className = 'mcal__month';
        h.textContent = `${MONTHS[m.getMonth()]}${m.getFullYear() !== RB.today.getFullYear() ? ` ${m.getFullYear()}` : ''}`;
        rows.push(h);
      }
      const week = document.createElement('div');
      week.className = 'mcal__week';
      days.forEach((d) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mcell';
        btn.dataset.key = String(key(d));
        const isSel = selected.has(key(d));
        btn.classList.toggle('is-selected', isSel);
        btn.classList.toggle('is-today', sameDay(d, RB.today));
        btn.classList.toggle('is-weekend', d.getDay() === 0 || d.getDay() === 6);
        btn.classList.toggle('is-past', d < RB.today);
        btn.setAttribute('aria-pressed', String(isSel));
        btn.setAttribute('aria-label', cellLabel(d));
        btn.innerHTML = `${sameDay(d, RB.today) ? '<span class="mday__today">Today</span>' : ''}<span class="mcell__num">${d.getDate()}</span>${d.getDate() === 1 ? `<span class="mcell__month">${MONTHS[d.getMonth()].slice(0, 3)}</span>` : ''}`;
        btn.addEventListener('click', () => tapDay(d));
        week.append(btn);
      });
      rows.push(week);
    }
    calWeeks.replaceChildren(...rows);

    // Notes and the CTA, which is always enabled and says what happens.
    const dates = selectedDates();
    const n = dates.length;
    noteCap.hidden = n <= SOFT_CAP;
    if (n >= 2) calCta.textContent = `Done · ${n} bookings · ${kc(n * oneVisitPrice())} Kč`;
    else if (n === 1) calCta.textContent = `Use ${label(dates[0])}`;
    else calCta.textContent = `Keep ${label(originalDate)}`;
  }

  function refocus(k) {
    calWeeks.querySelector(`[data-key="${k}"]`)?.focus({ preventScroll: true });
  }

  function tapDay(d) {
    if (selected.has(key(d))) selected.delete(key(d)); else selected.add(key(d));
    renderCal();
    refocus(key(d));
  }

  function toggleColumn(col) {
    const eligible = eligibleInColumn(col);
    if (!eligible.length) return;
    const all = eligible.every((d) => selected.has(key(d)));
    eligible.forEach((d) => { if (all) selected.delete(key(d)); else selected.add(key(d)); });
    renderCal();
    calDows.children[col].focus({ preventScroll: true });
  }

  calMore.addEventListener('click', () => {
    weekCount += MORE_WEEKS;
    renderCal();
  });

  function openCal() {
    RB.closeTimePicker({ refocus: false });
    clearTimeout(calCloseTimer);
    originalDate = state.startDate;
    const dates = v5.series || [state.startDate];
    selected = new Set(dates.map(key));
    const earliest = dates[0];
    const latest = dates.at(-1);
    // Five weeks from this week, or from an earlier date's week; longer if
    // the selection reaches further.
    weeksStart = mondayOf(earliest < RB.today ? earliest : RB.today);
    weekCount = Math.max(INITIAL_WEEKS, Math.ceil((mondayOf(latest) - weeksStart) / (7 * 86400000)) + 1);
    renderCal();

    calSheet.style.transform = '';
    RB.showBackdrop();
    calSheet.hidden = false;
    calSheet.getBoundingClientRect();
    calSheet.classList.add('is-open');
    (calWeeks.querySelector('.is-selected') || $('[data-cal-close]')).focus({ preventScroll: true });
  }

  // Close or swipe = discard; the CTA applies.
  function closeCal({ apply = false } = {}) {
    if (calSheet.hidden) return;
    if (apply) {
      const dates = selectedDates();
      if (dates.length >= 2) {
        v5.series = dates;
        state.startDate = dates[0];
      } else {
        v5.series = null;
        state.startDate = dates.length === 1 ? dates[0] : originalDate;
      }
      RB.renderForm();
      RB.flash(dateField);
    }
    calSheet.style.transform = '';
    calSheet.classList.remove('is-open', 'is-dragging');
    RB.hideBackdrop();
    calCloseTimer = setTimeout(() => { calSheet.hidden = true; }, 420);
    (v5.series ? dateField : repeatLink).focus({ preventScroll: true });
  }

  calCta.addEventListener('click', () => closeCal({ apply: true }));
  $('[data-cal-close]').addEventListener('click', () => closeCal());
  RB.draggable(calSheet, $('[data-cal-grip]'), () => closeCal());
  $('[data-backdrop]').addEventListener('click', () => closeCal());
  $('[data-screen]').addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !calSheet.hidden) closeCal();
  });

  // ---------- hooks into app.js ----------

  hooks.render = renderMain;
  // With a series, the date cell edits the series instead of one date.
  hooks.dateField = (target) => {
    if (RB.variant !== 2 || target !== 'start' || isMulti() || !v5.series) return false;
    openCal();
    return true;
  };
  // Several days can't repeat: drop the series, keep its start.
  hooks.modeChange = (mode) => {
    if (RB.variant !== 2 || mode !== 'multi' || !v5.series) return;
    state.startDate = v5.series[0];
    v5.series = null;
    RB.toast('Repeat removed — several days can\'t repeat.');
  };
  hooks.closeSheets = () => closeCal();
  hooks.send = () => {
    if (v5.series) RB.showConfirmation(v5.series);
    else RB.toast('Booking request sent (prototype).');
  };
  // Called by RB.resetForm before it sets the date and times.
  hooks.reset = () => {
    v5.series = null;
    tiles.forEach((t, i) => { t.checked = i === 0; }); // babysitting
    if (RB.variant === 2) RB.setToday(DEMO_TODAY);
  };

  if (RB.variant === 2) RB.resetForm();
})();
