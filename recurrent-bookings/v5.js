// Variants 2 and 3 — "Repeat booking (calendar)". Replaces the weekday
// repeat with one multi-select calendar: what is selected is what gets
// sent, each date as its own booking request. Plugs into app.js through
// window.RB (shared state, date sheet, time picker, render/send hooks).
// Follows repeat-booking-v5-calendar-spec.md, but on Variant 1's date and
// time row: a series shows in its date cell, and "Several days" can't
// repeat. Pet care is treated like every other service (no visits/stays).
// Variant 2 sends a series through app.js's review step; Variant 3 lists
// it in the form instead (each booking with its own times) and sends it
// from there.

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
    items: [], // Variant 3: the series as { date, start, end }
  };
  const isV3 = () => RB.variant === 3;

  const key = (d) => d.getTime();
  const label = (d) => `${DOW_SHORT[d.getDay()]} ${short(d)}`;

  // ---------- elements ----------

  const tiles = [...$$('.tile input')]; // babysitting, cleaning, pet care, senior care, tutoring
  const dateField = $('.when [data-date-field="start"]'); // Variant 1's date cell
  const repeatLink = $('[data-v5-repeat]');
  const removeLink = $('[data-v5-remove]');
  const card = $('[data-v5-card]');
  const v3List = $('[data-v3-list]');
  const v3Items = $('[data-v3-items]');
  const v3Add = $('[data-v3-add]');
  const totalBox = $('[data-total-box]');

  const calSheet = $('[data-cal-sheet]');
  const calWeeks = $('[data-cal-weeks]');
  const calMore = $('[data-cal-more]');
  const noteCap = $('[data-cal-note-cap]');
  const calCta = $('[data-cal-cta]');
  const calCtaMain = $('[data-cal-cta-main]');
  const calCtaSub = $('[data-cal-cta-sub]');

  const isMulti = () => state.mode === 'multi';

  // ---------- main screen ----------
  // Variant 1's row stays as it is, showing the first date; with a series
  // the date cell opens the calendar, and Variant 1's repeat card replaces
  // the link (Edit opens the calendar, X keeps the first date). Each
  // booking is priced in the review, so the total is hidden.

  function renderMain() {
    const series = isMulti() ? null : v5.series;
    repeatLink.hidden = !!series;
    card.hidden = !series;
    totalBox.hidden = !!series;
    if (!v5.series) v5.items = [];
    // Variant 3: the list takes the date / time row's place.
    const listed = isV3() && !!series;
    v3List.hidden = !listed;
    document.body.toggleAttribute('data-listed', listed);
    if (listed) renderList();

    if (series) {
      const n = series.length;
      $('[data-v5-title]').textContent = `Repeats on ${RB.daysPhrase(new Set(series.map((d) => d.getDay())))}`;
      $('[data-v5-sub]').textContent = `${n} dates, first ${RB.seriesLabel(series[0])}, last ${RB.seriesLabel(series.at(-1))}`;
      dateField.setAttribute('aria-label', `${n} dates: ${series.map(label).join(', ')} Edit`);
    }

    RB.updateTotal(1);
    RB.setSendLabel(series ? series.length : 1, { review: !isV3() });
  }

  // ---------- Variant 3: the bookings listed in the form ----------

  // Keep each date's own times; a new date gets the form's times.
  function syncItems() {
    const old = v5.items;
    v5.items = (v5.series || []).map((d) => old.find((it) => sameDay(it.date, d)) || { date: d, start: state.startTime, end: state.endTime });
  }

  function renderList() {
    v3Items.replaceChildren(...v5.items.map((it, i) => {
      const li = document.createElement('li');
      li.className = 'confirm__item';
      li.innerHTML = `
        <span class="confirm__date"><strong></strong><span class="confirm__meta"><span class="confirm__times"></span><span class="price-pill"></span></span></span>
        <span class="confirm__actions">
          <button class="btn-small" type="button" data-v3-edit>Edit time</button>
          <button class="icon-btn icon-btn--remove" type="button" data-v3-remove><i class="fa-regular fa-xmark" aria-hidden="true"></i></button>
        </span>`;
      li.querySelector('strong').textContent = RB.longDate(it.date);
      li.querySelector('.confirm__times').textContent = RB.itemTimes(it);
      li.querySelector('.price-pill').textContent = `${RB.itemPrice(it).toLocaleString('cs-CZ')} Kč`;
      const edit = li.querySelector('[data-v3-edit]');
      edit.setAttribute('aria-label', `Edit the time on ${RB.longDate(it.date)}`);
      edit.addEventListener('click', () => RB.openEditItem(it, edit, (draft) => {
        v5.items[i] = draft;
        renderMain();
      }));
      const remove = li.querySelector('[data-v3-remove]');
      remove.setAttribute('aria-label', `Remove the booking on ${RB.longDate(it.date)}`);
      remove.addEventListener('click', () => removeItem(i));
      return li;
    }));
  }

  // Down to one booking, it goes back to the date / time row with its times.
  function removeItem(i) {
    v5.items.splice(i, 1);
    v5.series = v5.items.map((it) => it.date);
    if (v5.items.length === 1) {
      const [last] = v5.items;
      state.startDate = last.date;
      state.startTime = last.start;
      state.endTime = last.end;
      v5.series = null;
      RB.renderForm();
      RB.flash(dateField);
      dateField.focus({ preventScroll: true, focusVisible: false });
      return;
    }
    state.startDate = v5.series[0];
    RB.renderForm();
    v3Add.focus({ preventScroll: true, focusVisible: false });
  }

  v3Add.addEventListener('click', () => openCal());
  // Remove all keeps the first date, with its times.
  $('[data-v3-remove-all]').addEventListener('click', () => {
    const [first] = v5.items;
    state.startDate = first.date;
    state.startTime = first.start;
    state.endTime = first.end;
    v5.series = null;
    RB.renderForm();
    RB.flash(dateField);
    repeatLink.focus({ preventScroll: true });
  });
  RB.rateSelect.addEventListener('change', () => { if (isV3() && v5.series) renderList(); });

  repeatLink.addEventListener('click', () => openCal());
  $('[data-v5-edit]').addEventListener('click', () => openCal());
  // Removing the repeat keeps the earliest date as a single booking.
  removeLink.addEventListener('click', () => {
    v5.series = null;
    RB.renderForm();
    RB.flash(dateField);
    repeatLink.focus({ preventScroll: true });
  });

  // ---------- calendar sheet ----------
  // Month blocks, Monday first, starting with this week (rolling). Tap a
  // day to toggle it, or a column header (in any month) for every eligible
  // day in that column across all the shown weeks.

  let selected = new Set(); // keys of the selected dates
  let weeksStart = null; // Monday of the first shown week
  let weekCount = INITIAL_WEEKS;
  let originalDate = null; // the main-screen date when the sheet opened
  let calCloseTimer = null;

  let shown = []; // the real (tappable) days in the grid, set by buildCal
  const selectedDates = () => [...selected].sort((a, b) => a - b).map((t) => new Date(t));
  const eligibleInColumn = (col) => shown.filter((d) => (d.getDay() + 6) % 7 === col && d >= RB.today);

  function cellLabel(d) {
    const parts = [`${DOW_LONG[d.getDay()]} ${d.getDate()}. ${d.getMonth() + 1}.`];
    if (sameDay(d, RB.today)) parts.push('today');
    if (d < RB.today) parts.push('past');
    return parts.join(', ');
  }


  // Build the grid as month blocks: a heading with the year (and a line
  // under it), the weekday row, then the month's weeks. The first block
  // starts at the first shown week; the others at their 1st, with the
  // previous month's days left blank. A block ends on its last day, the
  // rest of that week blank, except the last block, which fills its last
  // week with the next month's days greyed out (not tappable).
  function buildCal() {
    const lastShown = addDays(weeksStart, weekCount * 7 - 1);
    const end = day(lastShown.getFullYear(), lastShown.getMonth() + 1, 0);
    shown = [];
    const blocks = [];
    const cell = (cls) => {
      const el = document.createElement('span');
      el.className = `mcell ${cls}`;
      el.setAttribute('aria-hidden', 'true');
      return el;
    };
    for (let m = day(weeksStart.getFullYear(), weeksStart.getMonth(), 1); m <= end; m = day(m.getFullYear(), m.getMonth() + 1, 1)) {
      const monthEnd = day(m.getFullYear(), m.getMonth() + 1, 0);
      const lastBlock = sameDay(monthEnd, end);
      const first = m < weeksStart ? weeksStart : m;
      const block = document.createElement('section');
      block.className = 'mcal__block';
      block.setAttribute('aria-label', `${MONTHS[m.getMonth()]} ${m.getFullYear()}`);
      const head = document.createElement('div');
      head.className = 'mcal__mhead';
      head.textContent = `${MONTHS[m.getMonth()]} ${m.getFullYear()}`;
      const dows = document.createElement('div');
      dows.className = 'mcal__dows';
      DOW_GRID.forEach((name, col) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mcal__dow';
        btn.dataset.col = String(col);
        btn.textContent = name;
        btn.addEventListener('click', () => toggleColumn(col));
        dows.append(btn);
      });
      const days = document.createElement('div');
      days.className = 'mcal__days';
      for (let w = mondayOf(first); w <= monthEnd; w = addDays(w, 7)) {
        const week = document.createElement('div');
        week.className = 'mcal__week';
        for (let i = 0; i < 7; i++) {
          const d = addDays(w, i);
          const weekend = i >= 5;
          if (d < first) { week.append(cell('mcell--blank')); continue; }
          if (d > monthEnd && !lastBlock) { week.append(cell('mcell--blank')); continue; }
          if (d > monthEnd) {
            const out = cell('mcell--outside');
            out.classList.toggle('is-weekend', weekend);
            out.textContent = d.getDate();
            week.append(out);
            continue;
          }
          shown.push(d);
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'mcell';
          btn.dataset.key = String(key(d));
          btn.classList.toggle('is-today', sameDay(d, RB.today));
          btn.classList.toggle('is-past', d < RB.today);
          btn.classList.toggle('is-weekend', weekend);
          btn.setAttribute('aria-label', cellLabel(d));
          btn.innerHTML = `${sameDay(d, RB.today) ? '<span class="mcell__today">Today</span>' : ''}${d.getDate()}`;
          btn.addEventListener('click', () => tapDay(d));
          week.append(btn);
        }
        days.append(week);
      }
      block.append(head, dows, days);
      blocks.push(block);
    }
    calWeeks.replaceChildren(...blocks);
    updateCal();
  }

  // Update states in place (no rebuild), so focus stays where it was and
  // no programmatic focus ring appears on the tapped cell.
  function updateCal() {
    calWeeks.querySelectorAll('.mcal__dow').forEach((btn) => {
      const col = Number(btn.dataset.col);
      const eligible = eligibleInColumn(col);
      const all = eligible.length > 0 && eligible.every((d) => selected.has(key(d)));
      btn.setAttribute('aria-pressed', String(all));
      btn.setAttribute('aria-label', `${all ? 'Clear' : 'Select'} every ${DOW_LONG[(col + 1) % 7]} from today`);
    });
    calWeeks.querySelectorAll('.mcell[data-key]').forEach((btn) => {
      const on = selected.has(Number(btn.dataset.key));
      btn.classList.toggle('is-selected', on);
      btn.setAttribute('aria-pressed', String(on));
    });

    // The note and the CTA, which is always enabled and says what happens.
    const dates = selectedDates();
    const n = dates.length;
    noteCap.hidden = n <= SOFT_CAP;
    // Worded like Variant 1's CTA; with nothing picked it still works
    // (no disabled buttons) and keeps the original date.
    const ctaDay = (d) => `${label(d)}${sameDay(d, RB.today) ? ' (Today)' : ''}`;
    if (n >= 2) {
      calCtaMain.textContent = `Continue with ${n} dates`;
      calCtaSub.textContent = `from ${ctaDay(dates[0])} to ${ctaDay(dates.at(-1))}`;
    } else if (n === 1) {
      calCtaMain.textContent = 'Continue with 1 date';
      calCtaSub.textContent = `on ${ctaDay(dates[0])}`;
    } else {
      calCtaMain.textContent = `Keep ${ctaDay(originalDate)}`;
      calCtaSub.textContent = 'No dates picked';
    }
  }

  function tapDay(d) {
    if (selected.has(key(d))) selected.delete(key(d)); else selected.add(key(d));
    updateCal();
  }

  function toggleColumn(col) {
    const eligible = eligibleInColumn(col);
    if (!eligible.length) return;
    const all = eligible.every((d) => selected.has(key(d)));
    eligible.forEach((d) => { if (all) selected.delete(key(d)); else selected.add(key(d)); });
    updateCal();
  }

  calMore.addEventListener('click', () => {
    weekCount += MORE_WEEKS;
    buildCal();
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
    buildCal();

    calSheet.style.transform = '';
    RB.showBackdrop();
    calSheet.hidden = false;
    calSheet.getBoundingClientRect();
    calSheet.classList.add('is-open');
    // Focus for keyboard users without drawing a ring after a tap.
    (calWeeks.querySelector('.mcell.is-selected') || calCta).focus({ preventScroll: true, focusVisible: false });
  }

  // Close or swipe = discard; the CTA applies.
  function closeCal({ apply = false } = {}) {
    if (calSheet.hidden) return;
    if (apply) {
      const dates = selectedDates();
      if (dates.length >= 2) {
        v5.series = dates;
        state.startDate = dates[0];
        syncItems();
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
    (v5.series ? (isV3() ? v3Add : dateField) : repeatLink).focus({ preventScroll: true, focusVisible: false });
  }

  calCta.addEventListener('click', () => closeCal({ apply: true }));
  RB.draggable(calSheet, $('[data-cal-grip]'), () => closeCal());
  $('[data-backdrop]').addEventListener('click', () => closeCal());
  $('[data-screen]').addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !calSheet.hidden) closeCal();
  });

  // ---------- hooks into app.js ----------

  hooks.render = renderMain;
  // With a series, the date cell edits the series instead of one date.
  hooks.dateField = (target) => {
    if (RB.variant < 2 || target !== 'start' || isMulti() || !v5.series) return false;
    openCal();
    return true;
  };
  // Several days can't repeat: drop the series, keep its start.
  // Variant 3 keeps the series aside instead: it comes back, list and
  // all, on switching back to a single day.
  hooks.modeChange = (mode) => {
    if (isV3() && mode === 'single' && v5.series) return true;
    if (RB.variant < 2 || mode !== 'multi' || !v5.series) return;
    state.startDate = v5.series[0];
    if (isV3()) {
      state.startTime = v5.items[0].start;
      state.endTime = v5.items[0].end;
      return;
    }
    v5.series = null;
    RB.toast('Repeat removed — several days can\'t repeat.');
  };
  hooks.closeSheets = () => closeCal();
  hooks.send = () => {
    if (isMulti() || !v5.series) RB.sendNow();
    else if (isV3()) RB.showBookings(v5.items.map((it) => ({ ...it })));
    else RB.showReview(v5.series);
  };
  // Called by RB.resetForm before it sets the date and times.
  hooks.reset = () => {
    v5.series = null;
    v5.items = [];
    totalBox.hidden = false; // Variant 1 never hides it
    v3List.hidden = true;
    document.body.removeAttribute('data-listed');
    tiles.forEach((t, i) => { t.checked = i === 0; }); // babysitting
    if (RB.variant >= 2) RB.setToday(DEMO_TODAY);
  };

  if (RB.variant >= 2) RB.resetForm();
})();
