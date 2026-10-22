// Variant 2 — "v5 · Repeat booking (calendar)". Replaces the weekday
// repeat with one multi-select calendar: what is selected is what gets
// sent, each date as its own booking request. Plugs into app.js through
// window.RB (shared state, date sheet, time picker, render/send hooks).
// Follows repeat-booking-v5-calendar-spec.md; the visits-vs-stays part is
// inferred from that spec (the addendum wasn't available).

(() => {
  const RB = window.RB;
  const { state, hooks, DOW_LONG, DOW_SHORT, DOW_GRID, MONTHS, day, addDays, sameDay, mondayOf, short, toMinutes, fromMinutes } = RB;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ---------- demo data (spec) ----------

  const DEMO_TODAY = day(2026, 9, 21); // Wed 21.10.2026
  const EXISTING_BOOKING = day(2026, 9, 29); // Thu 29.10., 16:00–19:00
  const HOURLY_RATES = [130, 150, 170, 200];
  const DAILY_RATES = [500, 600, 700];
  const DEFAULT_HOURLY = 150;
  const DEFAULT_DAILY = 600;
  const INITIAL_WEEKS = 5;
  const MORE_WEEKS = 4;
  const SOFT_CAP = 20;

  const v5 = {
    series: null, // sorted dates when 2 or more are booked, else null
    care: 'visits', // pet care only: 'visits' | 'stay'
    stayEnd: null, // stay: the day the stay ends
    existingOn: false, // dev panel: Marie's booking on Thu 29.10.
    devToday: DEMO_TODAY,
  };

  const key = (d) => d.getTime();
  const label = (d) => `${DOW_SHORT[d.getDay()]} ${short(d)}`;
  const isBooked = (d) => v5.existingOn && sameDay(d, EXISTING_BOOKING);
  const kc = (n) => Math.round(n).toLocaleString('cs-CZ');
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  // ---------- elements ----------

  const tiles = [...$$('.tile input')]; // babysitting, cleaning, pet care, senior care, tutoring
  const PET = 2;
  const careTypeEl = $('[data-care-type]');
  const careInputs = $$('input[name="care-type"]');
  const dateCard = $('.date-card');
  const dateMain = $('[data-v5-date-main]');
  const dateSub = $('[data-v5-date-sub]');
  const dateAction = $('[data-v5-date-action]');
  const timesEl = $('[data-v5-times]');
  const repeatLink = $('[data-v5-repeat]');
  const removeLink = $('[data-v5-remove]');
  const { rateSelect, totalEl, totalLabel, sendBtn } = RB;

  const calSheet = $('[data-cal-sheet]');
  const calTitle = $('[data-cal-title]');
  const calTimeline = $('[data-cal-timeline]');
  const calDows = $('[data-cal-dows]');
  const calWeeks = $('[data-cal-weeks]');
  const calMore = $('[data-cal-more]');
  const noteBooked = $('[data-cal-note-booked]');
  const noteCap = $('[data-cal-note-cap]');
  const calCta = $('[data-cal-cta]');

  // ---------- services, visits and stays ----------

  const petOnly = () => tiles.every((t, i) => t.checked === (i === PET));
  const isStay = () => petOnly() && v5.care === 'stay';
  const oneVisitPrice = () => (RB.durationMinutes() / 60) * Number(rateSelect.value);
  const nights = () => Math.max(1, Math.round((v5.stayEnd - state.startDate) / 86400000));

  function setRateOptions(kind) {
    const daily = kind === 'daily';
    if (rateSelect.dataset.kind === kind) return;
    rateSelect.dataset.kind = kind;
    const rates = daily ? DAILY_RATES : HOURLY_RATES;
    const pick = daily ? DEFAULT_DAILY : DEFAULT_HOURLY;
    rateSelect.replaceChildren(...rates.map((r) => {
      const o = document.createElement('option');
      o.value = String(r);
      o.textContent = `${r} Kč/${daily ? 'day' : 'hour'}`;
      o.selected = r === pick;
      return o;
    }));
    rateSelect.setAttribute('aria-label', daily ? 'Daily rate' : 'Hourly rate');
  }

  // Pet care visits end on the same day (spec): pull an overnight end back.
  function keepVisitSameDay() {
    if (!(petOnly() && v5.care === 'visits') || !RB.isOvernight()) return;
    let start = toMinutes(state.startTime);
    if (start > 22 * 60 + 45) { start = 22 * 60 + 45; state.startTime = fromMinutes(start); }
    state.endTime = fromMinutes(Math.min(start + 60, 23 * 60 + 45));
    RB.toast('Pet care visits end on the same day.');
  }

  function setCare(care) {
    if (care === v5.care) return;
    if (care === 'stay') {
      if (v5.series) {
        state.startDate = v5.series[0];
        v5.series = null;
        RB.toast('Repeat removed — stays can\'t repeat.');
      }
      v5.stayEnd = addDays(state.startDate, 1);
    } else {
      v5.stayEnd = null;
    }
    v5.care = care;
    careInputs.forEach((i) => { i.checked = i.value === care; });
    keepVisitSameDay();
    RB.renderForm();
  }

  function servicesChanged() {
    if (!petOnly() && v5.care === 'stay') {
      v5.care = 'visits';
      v5.stayEnd = null;
      careInputs.forEach((i) => { i.checked = i.value === 'visits'; });
    }
    keepVisitSameDay();
    syncDevServices();
    RB.renderForm();
  }

  tiles.forEach((t) => t.addEventListener('change', () => { if (RB.variant === 2) servicesChanged(); }));
  careInputs.forEach((i) => i.addEventListener('change', () => setCare(i.value)));

  // ---------- main screen ----------

  function renderMain() {
    const stay = isStay();
    careTypeEl.hidden = !petOnly();
    timesEl.hidden = stay;
    setRateOptions(stay ? 'daily' : 'hourly');

    const series = stay ? null : v5.series;
    repeatLink.hidden = stay || !!series;
    removeLink.hidden = !series;

    if (stay) {
      if (!v5.stayEnd || v5.stayEnd <= state.startDate) v5.stayEnd = addDays(state.startDate, 1);
      dateMain.textContent = `${label(state.startDate)} – ${label(v5.stayEnd)}`;
      dateSub.textContent = plural(nights(), 'night', 'nights');
      dateSub.hidden = false;
      dateAction.textContent = 'Change';
      dateAction.setAttribute('aria-label', `Stay ${dateMain.textContent}. Change`);
    } else if (series) {
      const n = series.length;
      dateMain.textContent = `${n} dates`;
      dateSub.textContent = series.slice(0, 3).map(label).join(', ') + (n > 3 ? ` +${n - 3}` : '');
      dateSub.hidden = false;
      dateAction.textContent = 'Edit';
      dateAction.setAttribute('aria-label', `${n} dates: ${series.map(label).join(', ')}. Edit`);
    } else {
      dateMain.textContent = label(state.startDate);
      dateSub.hidden = true;
      dateAction.textContent = 'Change';
      dateAction.setAttribute('aria-label', `Date: ${DOW_LONG[state.startDate.getDay()]}, ${short(state.startDate)}. Change`);
    }

    // Price: one visit, a series (N × one visit) or a stay (nights × daily rate)
    if (stay) {
      const n = nights();
      totalLabel.textContent = `total price for ${plural(n, 'night', 'nights')}`;
      totalEl.textContent = kc(n * Number(rateSelect.value));
    } else {
      const one = oneVisitPrice();
      const span = RB.durationMinutes();
      if (span <= 0) {
        totalLabel.textContent = 'total price';
        totalEl.textContent = '–';
      } else if (series) {
        totalLabel.textContent = `${series.length} × ${kc(one)} Kč`;
        totalEl.textContent = kc(series.length * one);
      } else {
        const hours = span / 60;
        const h = Number.isInteger(hours) ? hours : hours.toFixed(2).replace(/0$/, '');
        totalLabel.textContent = `total price for ${h} ${hours === 1 ? 'hour' : 'hours'}`;
        totalEl.textContent = kc(one);
      }
    }

    sendBtn.querySelector('.cta__main').textContent = series ? `Send ${series.length} booking requests` : 'Send booking request';
  }

  dateAction.addEventListener('click', () => {
    if (isStay()) openCal('range');
    else if (v5.series) openCal('repeat');
    else RB.openDateSheet(dateAction);
  });
  repeatLink.addEventListener('click', () => openCal('repeat'));
  // Removing the repeat keeps the earliest date as a single booking.
  removeLink.addEventListener('click', () => {
    v5.series = null;
    RB.renderForm();
    RB.flash(dateCard);
    repeatLink.focus({ preventScroll: true });
  });

  // ---------- calendar sheet ----------
  // Rolling weeks (not month pages), Monday first. Repeat mode toggles
  // single days or whole columns; range mode picks a stay (first tap =
  // start, second = end).

  let calMode = 'repeat';
  let selected = new Set(); // repeat: keys of the selected dates
  let rangeStart = null;
  let rangeEnd = null;
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
  const eligibleInColumn = (col) => shownDays().filter((d) => (d.getDay() + 6) % 7 === col && d >= RB.today && !isBooked(d));

  function timelineText() {
    if (calMode === 'range') return 'Tap the first day of the stay, then the last.';
    if (RB.isOvernight()) return `All dates ${state.startTime} → ${state.endTime} next day`;
    return `All dates ${state.startTime}–${state.endTime}`;
  }

  function cellLabel(d) {
    const parts = [`${DOW_LONG[d.getDay()]} ${d.getDate()}. ${d.getMonth() + 1}.`];
    if (sameDay(d, RB.today)) parts.push('today');
    if (isBooked(d)) parts.push('already booked with Marie');
    if (d < RB.today) parts.push('past');
    return parts.join(', ');
  }

  function renderCal() {
    const repeatMode = calMode === 'repeat';
    calTitle.textContent = repeatMode ? 'Repeat booking' : 'Pick the stay dates';
    calTimeline.textContent = timelineText();

    // Column headers: tap to (de)select every eligible date in the column.
    calDows.replaceChildren(...DOW_GRID.map((name, col) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mcal__dow';
      btn.textContent = name;
      if (repeatMode) {
        const eligible = eligibleInColumn(col);
        const all = eligible.length > 0 && eligible.every((d) => selected.has(key(d)));
        btn.setAttribute('aria-pressed', String(all));
        btn.setAttribute('aria-label', `${all ? 'Clear' : 'Select'} every ${DOW_LONG[(col + 1) % 7]} from today`);
        btn.addEventListener('click', () => toggleColumn(col));
      } else {
        btn.disabled = true;
        btn.setAttribute('aria-hidden', 'true');
      }
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
        const isSel = repeatMode
          ? selected.has(key(d))
          : (sameDay(d, rangeStart) || sameDay(d, rangeEnd));
        btn.classList.toggle('is-selected', isSel);
        btn.classList.toggle('is-in-range', !repeatMode && !!rangeEnd && d > rangeStart && d < rangeEnd);
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
    if (repeatMode) {
      const dates = selectedDates();
      const n = dates.length;
      const bookedPick = dates.find(isBooked);
      noteBooked.hidden = !bookedPick;
      if (bookedPick) noteBooked.textContent = `Marie already has a booking on ${label(bookedPick)}`;
      noteCap.hidden = n <= SOFT_CAP;
      if (n >= 2) calCta.textContent = `Done · ${n} bookings · ${kc(n * oneVisitPrice())} Kč`;
      else if (n === 1) calCta.textContent = `Use ${label(dates[0])}`;
      else calCta.textContent = `Keep ${label(originalDate)}`;
    } else {
      noteBooked.hidden = true;
      noteCap.hidden = true;
      const end = rangeEnd || addDays(rangeStart, 1);
      const n = Math.round((end - rangeStart) / 86400000);
      calCta.textContent = `Use ${short(rangeStart)} – ${short(end)} · ${plural(n, 'night', 'nights')}`;
    }
  }

  function refocus(k) {
    calWeeks.querySelector(`[data-key="${k}"]`)?.focus({ preventScroll: true });
  }

  function tapDay(d) {
    if (calMode === 'repeat') {
      if (selected.has(key(d))) selected.delete(key(d)); else selected.add(key(d));
    } else if (!rangeStart || rangeEnd || d < rangeStart) {
      rangeStart = d;
      rangeEnd = null;
    } else if (d > rangeStart) {
      rangeEnd = d;
    }
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

  function openCal(mode) {
    RB.closeTimePicker({ refocus: false });
    clearTimeout(calCloseTimer);
    calMode = mode;
    originalDate = state.startDate;
    let earliest = state.startDate;
    let latest = state.startDate;
    if (mode === 'repeat') {
      const dates = v5.series || [state.startDate];
      selected = new Set(dates.map(key));
      earliest = dates[0];
      latest = dates.at(-1);
    } else {
      rangeStart = state.startDate;
      rangeEnd = v5.stayEnd;
      latest = rangeEnd || latest;
    }
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
    if (apply && calMode === 'repeat') {
      const dates = selectedDates();
      if (dates.length >= 2) {
        v5.series = dates;
        state.startDate = dates[0];
      } else {
        v5.series = null;
        state.startDate = dates.length === 1 ? dates[0] : originalDate;
      }
    } else if (apply) {
      state.startDate = rangeStart;
      v5.stayEnd = rangeEnd || addDays(rangeStart, 1);
    }
    if (apply) {
      RB.renderForm();
      RB.flash(dateCard);
    }
    calSheet.style.transform = '';
    calSheet.classList.remove('is-open', 'is-dragging');
    RB.hideBackdrop();
    calCloseTimer = setTimeout(() => { calSheet.hidden = true; }, 420);
    (v5.series || isStay() ? dateAction : repeatLink).focus({ preventScroll: true });
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
  hooks.afterTime = () => { if (RB.variant === 2) keepVisitSameDay(); };
  hooks.closeSheets = () => closeCal();
  hooks.send = () => {
    if (isStay()) RB.toast('Stay request sent (prototype).');
    else if (v5.series) RB.showConfirmation(v5.series);
    else RB.toast('Booking request sent (prototype).');
  };
  // Called by RB.resetForm before it sets the date and times.
  hooks.reset = () => {
    v5.series = null;
    v5.care = 'visits';
    v5.stayEnd = null;
    careInputs.forEach((i) => { i.checked = i.value === 'visits'; });
    if (RB.variant === 2) {
      RB.setToday(v5.devToday);
      applyServicesPreset(devServices.value || 'babysitting');
    } else {
      applyServicesPreset('babysitting');
    }
    setRateOptions('hourly');
  };

  // ---------- dev panel (prototype only) ----------
  // Two copies (desktop aside, phone dialog), kept in sync.

  const devServicesEls = $$('[data-dev-services]');
  const devTodayEls = $$('[data-dev-today]');
  const devExistingEls = $$('[data-dev-existing]');
  const devServices = { value: 'babysitting' };
  const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  function applyServicesPreset(preset) {
    devServices.value = preset;
    const on = { babysitting: [0], pet: [PET], mixed: [0, PET] }[preset] || [0];
    tiles.forEach((t, i) => { t.checked = on.includes(i); });
    devServicesEls.forEach((el) => { el.value = preset; });
  }

  function syncDevServices() {
    const checked = tiles.map((t, i) => (t.checked ? i : -1)).filter((i) => i >= 0).join(',');
    const preset = { '0': 'babysitting', [String(PET)]: 'pet', [`0,${PET}`]: 'mixed' }[checked];
    if (preset) { devServices.value = preset; devServicesEls.forEach((el) => { el.value = preset; }); }
  }

  function syncDev() {
    devTodayEls.forEach((el) => { el.value = isoDate(v5.devToday); });
    devExistingEls.forEach((el) => { el.checked = v5.existingOn; });
    devServicesEls.forEach((el) => { el.value = devServices.value; });
  }

  devServicesEls.forEach((el) => el.addEventListener('change', () => {
    applyServicesPreset(el.value);
    servicesChanged();
  }));
  devTodayEls.forEach((el) => el.addEventListener('change', () => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(el.value);
    if (!m) { syncDev(); return; }
    v5.devToday = day(+m[1], +m[2] - 1, +m[3]);
    if (RB.variant === 2) RB.setToday(v5.devToday);
    syncDev();
    RB.renderForm();
    if (!calSheet.hidden) renderCal();
  }));
  devExistingEls.forEach((el) => el.addEventListener('change', () => {
    v5.existingOn = el.checked;
    syncDev();
    if (!calSheet.hidden) renderCal();
  }));
  $$('[data-dev-reset]').forEach((el) => el.addEventListener('click', () => {
    v5.devToday = DEMO_TODAY;
    v5.existingOn = false;
    devServices.value = 'babysitting';
    syncDev();
    closeCal();
    RB.resetForm();
  }));

  syncDev();
  if (RB.variant === 2) RB.resetForm();
})();
