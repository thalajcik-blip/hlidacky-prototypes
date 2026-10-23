// Recurrent bookings: the new booking page with a bottom-sheet date picker
// (weekly strip or month) and a custom time picker, in two modes. Single
// mode is one day, or overnight when To is before From; multi mode has a
// start and an end date. Only single mode offers "Repeat this booking",
// which opens its own sheet and leaves a summary card on the form.
// All dates are local midnights; times are "HH:MM" strings.
//
// Two variants: 1 is the weekday repeat above; 2 (v5) swaps the repeat
// for a multi-select calendar and lives in v5.js, which plugs into this
// file through window.RB (state, date sheet, time picker, hooks).

(() => {
  const DOW_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const DOW_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DOW_GRID = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const DEFAULT_OFFSET_DAYS = 2; // the form opens on the day after tomorrow
  const DEFAULT_TIMES = { start: '16:00', end: '19:00' };
  const MINUTE_STEPS = [0, 15, 30, 45];

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const screen = $('[data-screen]');
  const whenSection = $('[data-when]');
  const modeToggle = $('[data-mode-toggle]');
  const modeIcon = $('[data-mode-icon]');
  const nextDayBadges = $$('[data-next-day]');
  const whenError = $('[data-when-error]');
  const rateSelect = $('[data-rate]');
  const totalEl = $('[data-total]');
  const totalLabel = $('[data-total-label]');
  const sendBtn = $('[data-send]');
  const toastEl = $('[data-toast]');

  const sheet = $('[data-sheet]');
  const backdrop = $('[data-backdrop]');
  const grip = $('[data-grip]');
  const sheetTitle = $('[data-sheet-title]');
  const weekEl = $('[data-week]');
  const monthEl = $('[data-month]');
  const periodEl = $('[data-period]');
  const prevBtn = $('[data-prev]');
  const nextBtn = $('[data-next]');
  const toggleBtn = $('[data-toggle-view]');
  const useBtn = $('[data-use]');

  const timePicker = $('[data-time-picker]');
  const hoursEl = $('[data-hours]');
  const minutesEl = $('[data-minutes]');

  // ---------- date + time helpers ----------

  const day = (y, m, d) => new Date(y, m, d);
  const addDays = (d, n) => day(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const sameDay = (a, b) => !!a && !!b && a.getTime() === b.getTime();
  const mondayOf = (d) => addDays(d, -((d.getDay() + 6) % 7));
  const monthOf = (d) => day(d.getFullYear(), d.getMonth(), 1);
  const short = (d) => `${d.getDate()}.${d.getMonth() + 1}.`;
  const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;
  const pad = (n) => String(n).padStart(2, '0');
  const toMinutes = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const fromMinutes = (n) => { const v = ((n % 1440) + 1440) % 1440; return `${pad(Math.floor(v / 60))}:${pad(v % 60)}`; };
  const dayDiff = (a, b) => Math.round((b - a) / 86400000);
  // Minutes since the start date's midnight, so dates and times compare.
  const stamp = (date, time, base) => dayDiff(base, date) * 1440 + toMinutes(time);

  // ---------- state ----------

  const now = new Date();
  const realToday = day(now.getFullYear(), now.getMonth(), now.getDate());
  // Variant 1 runs on the real date; v5 uses the spec's demo date (set
  // from v5.js and its dev panel).
  let today = realToday;
  const params = new URLSearchParams(location.search);
  let variant = params.get('variant') === '2' ? 2 : 1;
  const hooks = {}; // filled in by v5.js
  const state = {
    mode: 'single',
    startDate: addDays(today, DEFAULT_OFFSET_DAYS),
    startTime: DEFAULT_TIMES.start,
    endDate: addDays(today, DEFAULT_OFFSET_DAYS), // used in multi mode
    endTime: DEFAULT_TIMES.end,
  };

  // Single mode: the end is on the start day, or the next day when the
  // end time is not after the start time (overnight).
  const isOvernight = () => toMinutes(state.endTime) <= toMinutes(state.startTime);
  function effectiveEndDate() {
    if (state.mode === 'multi') return state.endDate;
    return isOvernight() ? addDays(state.startDate, 1) : state.startDate;
  }
  const durationMinutes = () => stamp(effectiveEndDate(), state.endTime, state.startDate) - toMinutes(state.startTime);

  // ---------- form ----------

  function setText(sel, text) { $$(sel).forEach((el) => { el.textContent = text; }); }

  function updateTotal() {
    const span = durationMinutes();
    if (span <= 0) {
      totalEl.textContent = '–';
      totalLabel.textContent = 'total price';
      return;
    }
    const hours = span / 60;
    totalEl.textContent = Math.round(hours * Number(rateSelect.value)).toLocaleString('cs-CZ');
    const label = Number.isInteger(hours) ? hours : hours.toFixed(2).replace(/0$/, '');
    totalLabel.textContent = `total price for ${label} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  function renderForm() {
    document.body.dataset.mode = state.mode;
    const end = effectiveEndDate();
    setText('[data-start-dow]', DOW_LONG[state.startDate.getDay()]);
    setText('[data-start-date]', short(state.startDate));
    setText('[data-start-dow-short]', `(${DOW_SHORT[state.startDate.getDay()]})`);
    setText('[data-end-date]', short(end));
    setText('[data-end-dow-short]', `(${DOW_SHORT[end.getDay()]})`);
    setText('[data-start-time]', state.startTime);
    setText('[data-end-time]', state.endTime);
    nextDayBadges.forEach((b) => { b.hidden = !(state.mode === 'single' && isOvernight()); });

    const invalid = state.mode === 'multi' && durationMinutes() <= 0;
    whenError.hidden = !invalid;
    sendBtn.disabled = invalid;

    const multi = state.mode === 'multi';
    modeIcon.className = `fa-light ${multi ? 'fa-calendar-day' : 'fa-calendar-range'}`;
    modeToggle.setAttribute('aria-label', multi ? 'Book a single day instead' : 'Book several days instead');
    modeToggle.title = multi ? 'Single day' : 'Several days';

    $$('[data-date-field="start"]').forEach((b) => b.setAttribute('aria-label', `${multi ? 'Start date' : 'Date'}: ${DOW_LONG[state.startDate.getDay()]}, ${short(state.startDate)}. Change`));
    $$('[data-date-field="end"]').forEach((b) => b.setAttribute('aria-label', `End date: ${DOW_LONG[end.getDay()]}, ${short(end)}. Change`));
    $$('[data-time-field="start"]').forEach((b) => b.setAttribute('aria-label', `From ${state.startTime}. Change`));
    $$('[data-time-field="end"]').forEach((b) => b.setAttribute('aria-label', `To ${state.endTime}${!multi && isOvernight() ? ', next day' : ''}. Change`));
    if (variant === 2) {
      hooks.render?.();
    } else {
      renderRepeatCard();
      updateTotal();
      setSendLabel(state.mode === 'single' && repeat ? bookedDates(repeat).length : 1);
    }
  }

  function flash(el) {
    if (!el) return;
    el.classList.remove('is-flash');
    void el.offsetWidth;
    el.classList.add('is-flash');
  }

  let toastTimer = null;
  function toast(text) {
    toastEl.textContent = text;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2600);
  }

  // Moving the start keeps the length of the booking (the end moves with it).
  function moveStart(date, time) {
    const length = durationMinutes();
    state.startDate = date;
    state.startTime = time;
    if (state.mode === 'multi') {
      const endStamp = toMinutes(time) + (length > 0 ? length : 60);
      state.endDate = addDays(date, Math.floor(endStamp / 1440));
      state.endTime = fromMinutes(endStamp);
    } else if (length > 0 && length <= 1440) {
      state.endTime = fromMinutes(toMinutes(time) + length);
    }
  }

  function setMode(mode) {
    if (mode === state.mode) return;
    hooks.modeChange?.(mode);
    if (mode === 'multi') {
      // Keep the same span, now with its own end date.
      state.endDate = effectiveEndDate();
      if (repeat) {
        repeat = null;
        toast('Several days can\'t be repeated, so the repeat was removed.');
      }
    } else if (durationMinutes() > 1440 || durationMinutes() <= 0) {
      // Longer than a day can't be a single booking: keep the times and
      // let them fall on one day (or overnight).
      toast('Shortened to one day. Several days can\'t be repeated.');
    }
    state.mode = mode;
    closeTimePicker({ refocus: false });
    renderForm();
    flash(state.mode === 'multi' ? $('.span') : $('.when'));
  }

  modeToggle.addEventListener('click', () => setMode(state.mode === 'single' ? 'multi' : 'single'));
  rateSelect.addEventListener('change', updateTotal);

  // ---------- time picker ----------
  // Two columns: an hour, then quarter-hour minutes. Picking an hour keeps
  // the picker open; picking the minutes sets the time and closes it.

  let timeTarget = null; // 'start' | 'end'
  let timeField = null; // the button it opened from
  let pendingHour = null;
  // Where the times come from and go to: the form by default, or one
  // booking being edited in the review step (see openEdit).
  const formTimes = {
    get: (target) => (target === 'start' ? state.startTime : state.endTime),
  };
  let timeSource = formTimes;

  function timeOption(label, value, selectedNow) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'time-option';
    btn.setAttribute('role', 'option');
    btn.setAttribute('aria-selected', String(selectedNow));
    btn.dataset.value = String(value);
    btn.textContent = label;
    return btn;
  }

  function renderTimePicker() {
    const current = timeSource.get(timeTarget);
    const [h, m] = current.split(':').map(Number);
    const hour = pendingHour ?? h;
    // Minutes always show a selection: the current one, rounded down to
    // the quarter hour, and it stays selected after a new hour is picked.
    const minute = MINUTE_STEPS.filter((mm) => mm <= m).pop() ?? 0;
    hoursEl.replaceChildren(...Array.from({ length: 24 }, (_, i) => timeOption(pad(i), i, i === hour)));
    minutesEl.replaceChildren(...MINUTE_STEPS.map((mm) => timeOption(pad(mm), mm, mm === minute)));
  }

  // The picker sits in the field's host ([data-time-host]): below the
  // field, or above it when the screen has no room below.
  function placeTimePicker() {
    const box = timePicker.parentElement.getBoundingClientRect();
    const field = timeField.getBoundingClientRect();
    const width = timePicker.offsetWidth;
    const height = timePicker.offsetHeight;
    let left = field.left - box.left;
    // Keep it inside the host: right-align with the field if needed.
    if (left + width > box.width - 20) left = field.right - box.left - width;
    timePicker.style.left = `${Math.max(20, left)}px`;
    const below = screen.getBoundingClientRect().bottom - field.bottom;
    timePicker.style.top = below >= height + 8
      ? `${field.bottom - box.top}px`
      : `${field.top - box.top - height}px`;
  }

  function openTimePicker(target, field, source = formTimes) {
    if (timeTarget === target && timeField === field && !timePicker.hidden) { closeTimePicker(); return; }
    closeTimePicker({ refocus: false });
    timeSource = source;
    const host = field.closest('[data-time-host]');
    if (host && timePicker.parentElement !== host) host.append(timePicker);
    timeTarget = target;
    timeField = field;
    pendingHour = null;
    renderTimePicker();
    timePicker.hidden = false;
    placeTimePicker();
    field.classList.add('is-open');
    field.setAttribute('aria-expanded', 'true');
    // Show the current hour second from the top, as in the design.
    const sel = hoursEl.querySelector('[aria-selected="true"]');
    hoursEl.scrollTop = Math.max(0, sel.offsetTop - hoursEl.offsetTop - sel.offsetHeight - 6);
    sel.focus({ preventScroll: true });
  }

  function closeTimePicker({ refocus = true } = {}) {
    if (timePicker.hidden) return;
    timePicker.hidden = true;
    timeField?.classList.remove('is-open');
    timeField?.setAttribute('aria-expanded', 'false');
    if (refocus) timeField?.focus({ preventScroll: true });
    timeTarget = null;
    pendingHour = null;
  }

  function applyTime(time) {
    if (timeSource.set) {
      timeSource.set(timeTarget, time);
      const field = timeField;
      closeTimePicker();
      flash(field);
      return;
    }
    if (timeTarget === 'start') {
      moveStart(state.startDate, time);
    } else {
      state.endTime = time;
    }
    const field = timeField;
    closeTimePicker();
    renderForm();
    flash(field);
  }

  hoursEl.addEventListener('click', (e) => {
    const opt = e.target.closest('.time-option');
    if (!opt) return;
    pendingHour = Number(opt.dataset.value);
    const scroll = hoursEl.scrollTop;
    renderTimePicker();
    hoursEl.scrollTop = scroll;
    minutesEl.querySelector('[aria-selected="true"]').focus({ preventScroll: true });
  });
  minutesEl.addEventListener('click', (e) => {
    const opt = e.target.closest('.time-option');
    if (!opt) return;
    const hour = pendingHour ?? Number(timeSource.get(timeTarget).split(':')[0]);
    applyTime(`${pad(hour)}:${pad(Number(opt.dataset.value))}`);
  });
  timePicker.addEventListener('keydown', (e) => {
    const list = e.target.closest('.time-picker__list');
    if (e.key === 'Escape') { e.stopPropagation(); closeTimePicker(); return; }
    if (!list || !['ArrowDown', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault();
    const opts = [...list.children];
    const i = opts.indexOf(document.activeElement);
    const next = opts[Math.max(0, Math.min(opts.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)))];
    next.focus();
    next.scrollIntoView({ block: 'nearest' });
  });
  $$('[data-time-field]').forEach((field) => {
    field.addEventListener('click', () => openTimePicker(field.dataset.timeField, field));
  });
  document.addEventListener('pointerdown', (e) => {
    if (timePicker.hidden) return;
    if (timePicker.contains(e.target) || timeField.contains(e.target)) return;
    closeTimePicker({ refocus: false });
  });
  $('[data-booking]').addEventListener('scroll', () => { if (!timePicker.hidden) placeTimePicker(); }, { passive: true });

  // ---------- date sheet ----------
  // The date picker from /components/booking-date-picker/ (variant 4):
  // a weekly strip that scrolls without end, or a month, with no
  // suggestions. It edits the start date, or in multi mode the end date.

  let dateTarget = 'start';
  let dateField = null;
  let draft = null;
  const VIEW_KEY = 'recurrent-bookings:view';
  const readView = () => {
    try { return localStorage.getItem(VIEW_KEY) === 'month' ? 'month' : 'week'; } catch { return 'week'; }
  };
  const saveView = (value) => {
    try { localStorage.setItem(VIEW_KEY, value); } catch { /* storage blocked: remember for this page only */ }
  };
  let lastView = readView();
  let view = lastView;
  let anchor = null; // Monday of the shown week, or 1st of the shown month

  const dayName = (d) => `${DOW_LONG[d.getDay()]}, ${short(d)}${sameDay(d, today) ? ' (today)' : ''}`;
  // In multi mode the end can't be before the start.
  const isBlocked = (d) => dateTarget === 'end' && d < state.startDate;

  function periodLabel() {
    if (view === 'month') return `${MONTHS[anchor.getMonth()]} ${anchor.getFullYear()}`;
    const end = addDays(anchor, 6);
    if (anchor.getMonth() === end.getMonth()) {
      return `${MONTHS[anchor.getMonth()]} ${anchor.getDate()}–${end.getDate()}`;
    }
    return `${MONTHS[anchor.getMonth()].slice(0, 3)} ${anchor.getDate()} – ${MONTHS[end.getMonth()].slice(0, 3)} ${end.getDate()}`;
  }

  function dayButton(d, cls) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = cls;
    btn.classList.toggle('is-today', sameDay(d, today));
    btn.classList.toggle('is-selected', sameDay(d, draft));
    btn.disabled = isBlocked(d);
    btn.setAttribute('aria-label', `${dayName(d)}${btn.disabled ? ', before the start' : ''}`);
    btn.setAttribute('aria-pressed', String(sameDay(d, draft)));
    btn.dataset.time = String(d.getTime());
    btn.addEventListener('click', () => pick(d));
    return btn;
  }

  // Weekly strip: rendered STRIP_WEEKS either side of a week, grown by as
  // much whenever the scroll gets within EDGE_WEEKS of an end. The label
  // shows the week of the day under the strip's centre.
  const STRIP_WEEKS = 8;
  const EDGE_WEEKS = 2;
  let stripStart = null;
  let stripEnd = null;
  let navLock = null;

  function dayCard(d) {
    const btn = dayButton(d, 'day');
    btn.innerHTML = `
      <span class="day__band">${sameDay(d, today) ? 'Today' : '–––'}</span>
      <span class="day__month">${MONTHS[d.getMonth()].slice(0, 3)}</span>
      <span class="day__num">${d.getDate()}</span>
      <span class="day__dow">${DOW_SHORT[d.getDay()]}</span>`;
    return btn;
  }

  function dayCards(from, to) {
    const cards = [];
    for (let d = from; d <= to; d = addDays(d, 1)) cards.push(dayCard(d));
    return cards;
  }

  function renderWeek() {
    stripStart = addDays(anchor, -7 * STRIP_WEEKS);
    stripEnd = addDays(anchor, 7 * STRIP_WEEKS + 6);
    weekEl.replaceChildren(...dayCards(stripStart, stripEnd));
  }

  const inStrip = (d) => !!stripStart && d >= stripStart && d <= stripEnd;

  function cardStep() {
    const first = weekEl.firstElementChild;
    return first ? first.offsetWidth + parseFloat(getComputedStyle(weekEl).columnGap || 0) : 64;
  }

  // Prepending shifts every card right, so the scroll position is set
  // absolutely to keep the old first card in place; adding the new width
  // would double the shift where Chrome has already re-snapped.
  function extendStrip() {
    const edge = cardStep() * 7 * EDGE_WEEKS;
    if (weekEl.scrollLeft < edge) {
      const from = addDays(stripStart, -7 * STRIP_WEEKS);
      const ref = weekEl.firstElementChild;
      const onScreen = ref.offsetLeft - weekEl.scrollLeft;
      weekEl.prepend(...dayCards(from, addDays(stripStart, -1)));
      stripStart = from;
      weekEl.scrollLeft = ref.offsetLeft - onScreen;
    }
    if (weekEl.scrollLeft + weekEl.clientWidth > weekEl.scrollWidth - edge) {
      const to = addDays(stripEnd, 7 * STRIP_WEEKS);
      weekEl.append(...dayCards(addDays(stripEnd, 1), to));
      stripEnd = to;
    }
  }

  function centreDay() {
    const mid = weekEl.scrollLeft + weekEl.clientWidth / 2;
    const step = cardStep();
    const first = weekEl.firstElementChild;
    if (!first) return anchor;
    const firstLeft = first.offsetLeft - weekEl.offsetLeft;
    const index = Math.max(0, Math.floor((mid - firstLeft + (step - first.offsetWidth) / 2) / step));
    return addDays(stripStart, index);
  }

  function syncWeekLabel() {
    const monday = mondayOf(centreDay());
    if (sameDay(monday, anchor)) return;
    anchor = monday;
    periodEl.textContent = periodLabel();
  }

  function scrollStripTo(d, { centreOn = d, smooth = true } = {}) {
    if (!inStrip(addDays(d, -7 * EDGE_WEEKS)) || !inStrip(addDays(d, 7 * EDGE_WEEKS))) {
      anchor = mondayOf(d);
      renderWeek();
      smooth = false;
    }
    anchor = mondayOf(d);
    periodEl.textContent = periodLabel();
    const target = weekEl.querySelector(`[data-time="${centreOn.getTime()}"]`);
    if (!target) return;
    const left = target.offsetLeft - weekEl.offsetLeft - (weekEl.clientWidth - target.offsetWidth) / 2;
    if (Math.abs(weekEl.scrollLeft - left) < 1) return;
    clearTimeout(navLock);
    navLock = setTimeout(() => { navLock = null; }, 700);
    weekEl.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
  }

  weekEl.addEventListener('scroll', () => {
    if (view !== 'week' || weekEl.hidden) return;
    extendStrip();
    if (navLock) {
      clearTimeout(navLock);
      navLock = setTimeout(() => { navLock = null; syncWeekLabel(); }, 150);
      return;
    }
    syncWeekLabel();
  }, { passive: true });

  function renderMonth() {
    const cells = DOW_GRID.map((name) => {
      const el = document.createElement('span');
      el.className = 'month__dow';
      el.textContent = name;
      el.setAttribute('aria-hidden', 'true');
      return el;
    });
    const first = mondayOf(anchor);
    const last = addDays(mondayOf(day(anchor.getFullYear(), anchor.getMonth() + 1, 0)), 6);
    for (let d = first; d <= last; d = addDays(d, 1)) {
      const btn = dayButton(d, 'mday');
      if (sameDay(d, today)) btn.innerHTML = `<span class="mday__today">Today</span>${d.getDate()}`;
      else btn.textContent = d.getDate();
      btn.classList.toggle('is-weekend', isWeekend(d));
      btn.classList.toggle('is-outside', d.getMonth() !== anchor.getMonth());
      cells.push(btn);
    }
    monthEl.replaceChildren(...cells);
  }

  function useLabel() { return `Use ${DOW_LONG[draft.getDay()]}, ${short(draft)}`; }

  function render() {
    periodEl.textContent = periodLabel();
    weekEl.hidden = view !== 'week';
    monthEl.hidden = view !== 'month';
    if (view === 'week') renderWeek(); else renderMonth();
    prevBtn.setAttribute('aria-label', view === 'week' ? 'Previous week' : 'Previous month');
    nextBtn.setAttribute('aria-label', view === 'week' ? 'Next week' : 'Next month');
    toggleBtn.textContent = view === 'week' ? 'Show monthly view' : 'Show weekly view';
    useBtn.textContent = useLabel();
  }

  function updateSelection() {
    $$('.day[data-time], .mday[data-time]').forEach((btn) => {
      const on = btn.dataset.time === String(draft.getTime());
      btn.classList.toggle('is-selected', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    useBtn.textContent = useLabel();
  }

  function pick(d) {
    if (isBlocked(d)) return;
    draft = d;
    if (view === 'week') {
      updateSelection();
      scrollStripTo(d);
    } else if (d.getMonth() !== anchor.getMonth() || d.getFullYear() !== anchor.getFullYear()) {
      anchor = monthOf(d);
      withHeightTransition(render);
    } else {
      updateSelection();
    }
  }

  // Animate the sheet between its weekly and monthly heights.
  let endResize = null;
  function withHeightTransition(change) {
    if (!sheet.classList.contains('is-open')) { change(); return; }
    const from = sheet.getBoundingClientRect().height;
    endResize?.({ keepHeight: true });
    sheet.style.height = '';
    change();
    const to = sheet.getBoundingClientRect().height;
    if (Math.abs(to - from) < 1) return;
    // Hide the body's overflow while it grows, or it flashes a scrollbar.
    sheet.classList.add('is-resizing');
    sheet.style.height = `${from}px`;
    sheet.getBoundingClientRect();
    sheet.style.height = `${to}px`;
    const done = (e) => {
      if (e?.propertyName && e.propertyName !== 'height') return;
      clearTimeout(timer);
      sheet.removeEventListener('transitionend', done);
      endResize = null;
      if (e?.keepHeight) return;
      sheet.style.height = '';
      sheet.classList.remove('is-resizing');
    };
    const timer = setTimeout(done, 400);
    sheet.addEventListener('transitionend', done);
    endResize = done;
  }

  let closeTimer = null;

  // target 'start' / 'end' edits the form; 'custom' picks a date for
  // someone else (the review step's edit sheet) and hands it to onApply.
  let customApply = null;

  function openSheet(target, field, custom = null) {
    closeTimePicker({ refocus: false });
    clearTimeout(closeTimer);
    dateTarget = target;
    dateField = field;
    customApply = custom?.onApply ?? null;
    draft = custom ? custom.date : target === 'end' ? effectiveEndDate() : state.startDate;
    sheetTitle.textContent = custom || state.mode === 'single' ? 'Pick a date' : target === 'end' ? 'Pick the end date' : 'Pick the start date';
    view = lastView;
    anchor = view === 'week' ? mondayOf(draft) : monthOf(draft);
    render();
    sheet.style.height = '';
    sheet.style.transform = '';
    showBackdrop();
    sheet.hidden = false;
    if (view === 'week') scrollStripTo(draft, { smooth: false });
    sheet.getBoundingClientRect();
    sheet.classList.add('is-open');
    ((view === 'week' ? weekEl : monthEl).querySelector('.is-selected') || useBtn).focus({ preventScroll: true });
  }

  function closeSheet({ apply = false } = {}) {
    if (sheet.hidden) return;
    if (apply && dateTarget === 'custom') {
      customApply?.(draft);
      flash(dateField);
    } else if (apply) {
      if (dateTarget === 'start') {
        moveStart(draft, state.startTime);
        if (repeat) reanchorRepeat(draft);
      } else {
        state.endDate = draft;
      }
      renderForm();
      flash(dateField);
    }
    sheet.style.transform = '';
    sheet.classList.remove('is-open', 'is-dragging');
    hideBackdrop();
    closeTimer = setTimeout(() => { sheet.hidden = true; }, 420);
    dateField?.focus({ preventScroll: true });
  }

  $$('[data-date-field]').forEach((field) => {
    field.addEventListener('click', () => {
      // v5: with a series, the date cell opens the repeat calendar instead.
      if (hooks.dateField?.(field.dataset.dateField, field)) return;
      openSheet(field.dataset.dateField, field);
    });
  });
  useBtn.addEventListener('click', () => closeSheet({ apply: true }));

  function step(dir) {
    if (view === 'week') {
      const monday = addDays(anchor, 7 * dir);
      scrollStripTo(monday, { centreOn: addDays(monday, 3) });
      return;
    }
    anchor = day(anchor.getFullYear(), anchor.getMonth() + dir, 1);
    withHeightTransition(render);
  }
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));

  toggleBtn.addEventListener('click', () => {
    view = view === 'week' ? 'month' : 'week';
    lastView = view;
    saveView(view);
    anchor = view === 'week' ? mondayOf(draft) : monthOf(draft);
    withHeightTransition(render);
    if (view === 'week') scrollStripTo(draft, { smooth: false });
  });

  // ---------- shared sheet plumbing ----------
  // All sheets share the backdrop. It counts the open ones, so a sheet
  // stacked on another (a date picked from the edit sheet) keeps it, and
  // it fades out on its own timer.

  let backdropTimer = null;
  let backdropCount = 0;
  function showBackdrop() {
    backdropCount += 1;
    clearTimeout(backdropTimer);
    backdrop.hidden = false;
    backdrop.getBoundingClientRect();
    backdrop.classList.add('is-open');
  }
  function hideBackdrop() {
    backdropCount = Math.max(0, backdropCount - 1);
    if (backdropCount) return;
    backdrop.classList.remove('is-open');
    backdropTimer = setTimeout(() => { backdrop.hidden = true; }, 420);
  }

  // Drag a sheet's handle down to dismiss it.
  function draggable(el, handle, dismiss) {
    let drag = null;
    handle.addEventListener('pointerdown', (e) => {
      drag = { y: e.clientY, t: performance.now(), dy: 0 };
      handle.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');
    });
    handle.addEventListener('pointermove', (e) => {
      if (!drag) return;
      drag.dy = Math.max(0, e.clientY - drag.y);
      el.style.transform = `translateY(${drag.dy}px)`;
      backdrop.style.opacity = String(1 - Math.min(1, drag.dy / el.offsetHeight));
    });
    const end = () => {
      if (!drag) return;
      const velocity = drag.dy / Math.max(1, performance.now() - drag.t);
      const close = drag.dy > el.offsetHeight * 0.3 || (drag.dy > 24 && velocity > 0.5);
      drag = null;
      el.classList.remove('is-dragging');
      backdrop.style.opacity = '';
      if (close) dismiss(); else el.style.transform = '';
    };
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  }

  // ---------- repeat booking ----------
  // A series of single-day bookings: the chosen weekdays within N weeks,
  // counted from the anchor (the booking's date when the repeat was set
  // up), minus the dates left out. The form's date becomes the first one.

  const WEEKDAYS = [1, 2, 3, 4, 5, 6, 0]; // Monday first
  const WEEKDAY_ABBR = { 0: 'Su', 1: 'Mo', 2: 'Tu', 3: 'We', 4: 'Th', 5: 'Fr', 6: 'Sa' };
  const WEEK_OPTIONS = [1, 2, 3, 4];
  const DEFAULT_WEEKS = 2;

  const repeatSheet = $('[data-repeat-sheet]');
  const repeatLink = $('[data-repeat]');
  const repeatCard = $('[data-repeat-card]');
  const weekdaysEl = $('[data-weekdays]');
  const weeksEl = $('[data-weeks]');
  const seriesEl = $('[data-series]');
  const applyBtn = $('[data-repeat-apply]');

  let repeat = null; // the applied series: { anchor, days, weeks, excluded }
  let repeatDraft = null; // the one being edited in the sheet
  let repeatCloseTimer = null;

  const cloneRepeat = (r) => ({ anchor: r.anchor, days: new Set(r.days), weeks: r.weeks, excluded: new Set(r.excluded) });
  const seriesLabel = (d) => `${DOW_SHORT[d.getDay()]} ${short(d)}${sameDay(d, today) ? ' (Today)' : ''}`;

  function seriesDates(r) {
    const out = [];
    for (let i = 0; i < r.weeks * 7; i++) {
      const d = addDays(r.anchor, i);
      if (r.days.has(d.getDay())) out.push(d);
    }
    return out;
  }
  const bookedDates = (r) => seriesDates(r).filter((d) => !r.excluded.has(d.getTime()));

  function daysPhrase(days) {
    const names = WEEKDAYS.filter((d) => days.has(d)).map((d) => `${DOW_LONG[d]}s`);
    return names.length > 1 ? `${names.slice(0, -1).join(', ')} & ${names.at(-1)}` : names[0];
  }

  function renderRepeatCard() {
    const on = !!repeat;
    repeatLink.hidden = on;
    repeatCard.hidden = !on;
    if (!on) return;
    const dates = bookedDates(repeat);
    $('[data-repeat-title]').textContent = `Repeats on ${daysPhrase(repeat.days)}`;
    $('[data-repeat-sub]').textContent = dates.length === 1
      ? `1 date, ${seriesLabel(dates[0])}`
      : `${dates.length} dates, first ${seriesLabel(dates[0])}, last ${seriesLabel(dates.at(-1))}`;
  }

  // A new start date by hand starts the series from it, on its weekday too.
  function reanchorRepeat(date) {
    repeat.anchor = date;
    repeat.days.add(date.getDay());
    repeat.excluded.clear();
  }

  function choicePill(label, { checked, role = 'radio', excluded = false }) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-pill';
    btn.textContent = label;
    btn.setAttribute('role', role);
    btn.setAttribute(role === 'radio' ? 'aria-checked' : 'aria-pressed', String(checked));
    btn.classList.toggle('is-excluded', excluded);
    return btn;
  }

  function renderRepeatSheet() {
    const r = repeatDraft;
    weekdaysEl.replaceChildren(...WEEKDAYS.map((d) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'weekday';
      btn.textContent = WEEKDAY_ABBR[d];
      btn.setAttribute('aria-label', `${DOW_LONG[d]}s`);
      btn.setAttribute('aria-pressed', String(r.days.has(d)));
      btn.addEventListener('click', () => {
        if (r.days.has(d)) r.days.delete(d); else r.days.add(d);
        renderRepeatSheet();
      });
      return btn;
    }));

    weeksEl.replaceChildren(...WEEK_OPTIONS.map((w) => {
      const btn = choicePill(`${w} ${w === 1 ? 'week' : 'weeks'}`, { checked: r.weeks === w });
      btn.addEventListener('click', () => { r.weeks = w; renderRepeatSheet(); });
      return btn;
    }));

    const all = seriesDates(r);
    if (!all.length) {
      const empty = document.createElement('p');
      empty.className = 'series-empty';
      empty.textContent = 'Pick at least one day above.';
      seriesEl.replaceChildren(empty);
    } else {
      seriesEl.replaceChildren(...all.map((d) => {
        const out = r.excluded.has(d.getTime());
        const btn = choicePill(seriesLabel(d), { checked: !out, role: 'button', excluded: out });
        btn.setAttribute('aria-label', `${dayName(d)}${out ? ', left out' : ''}`);
        btn.addEventListener('click', () => {
          if (out) r.excluded.delete(d.getTime()); else r.excluded.add(d.getTime());
          renderRepeatSheet();
          seriesEl.children[all.indexOf(d)]?.focus({ preventScroll: true });
        });
        return btn;
      }));
    }

    const dates = bookedDates(r);
    applyBtn.disabled = dates.length === 0;
    $('[data-repeat-apply-main]').textContent = dates.length
      ? `Set ${dates.length} ${dates.length === 1 ? 'booking' : 'bookings'}`
      : 'No dates picked';
    $('[data-repeat-apply-sub]').textContent = dates.length === 0
      ? 'Pick a day and keep at least one date'
      : dates.length === 1 ? `on ${seriesLabel(dates[0])}` : `from ${seriesLabel(dates[0])} to ${seriesLabel(dates.at(-1))}`;
  }

  function openRepeat() {
    closeTimePicker({ refocus: false });
    clearTimeout(repeatCloseTimer);
    repeatDraft = repeat
      ? cloneRepeat(repeat)
      : { anchor: state.startDate, days: new Set([state.startDate.getDay()]), weeks: DEFAULT_WEEKS, excluded: new Set() };
    renderRepeatSheet();
    repeatSheet.style.transform = '';
    showBackdrop();
    repeatSheet.hidden = false;
    repeatSheet.getBoundingClientRect();
    repeatSheet.classList.add('is-open');
    weekdaysEl.querySelector('[aria-pressed="true"]')?.focus({ preventScroll: true });
  }

  function closeRepeat({ apply = false } = {}) {
    if (repeatSheet.hidden) return;
    if (apply) {
      repeat = repeatDraft;
      state.startDate = bookedDates(repeat)[0];
      renderForm();
      flash($('.when'));
    }
    repeatSheet.style.transform = '';
    repeatSheet.classList.remove('is-open', 'is-dragging');
    hideBackdrop();
    repeatCloseTimer = setTimeout(() => { repeatSheet.hidden = true; }, 420);
    (repeat ? $('[data-repeat-edit]') : repeatLink).focus({ preventScroll: true });
  }

  repeatLink.addEventListener('click', openRepeat);
  $('[data-repeat-edit]').addEventListener('click', openRepeat);
  $('[data-repeat-remove]').addEventListener('click', () => {
    repeat = null;
    renderForm();
    repeatLink.focus({ preventScroll: true });
  });
  applyBtn.addEventListener('click', () => closeRepeat({ apply: true }));

  // ---------- review and send ----------
  // Two or more bookings go through a review step first: each one with its
  // price, Edit (its own date and times) and Remove. Nothing is sent until
  // "Send N booking requests"; then the same screen shows them as sent.
  // A single booking is sent straight from the form.

  const confirmEl = $('[data-confirm]');
  const confirmList = $('[data-confirm-list]');
  const reviewSend = $('[data-review-send]');
  const confirmBack = $('[data-confirm-back]');
  let reviewItems = []; // [{ date, start, end }]
  let reviewSent = false;

  const longDate = (d) => `${DOW_LONG[d.getDay()]} ${d.getDate()}. ${d.getMonth() + 1}.`;
  const itemOvernight = (it) => toMinutes(it.end) <= toMinutes(it.start);
  const itemMinutes = (it) => (itemOvernight(it) ? 1440 : 0) + toMinutes(it.end) - toMinutes(it.start);
  const itemPrice = (it) => Math.round((itemMinutes(it) / 60) * Number(rateSelect.value));
  const itemTimes = (it) => `${it.start}-${it.end}${itemOvernight(it) ? ' (next day)' : ''}`;
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const sortItems = () => reviewItems.sort((a, b) => a.date - b.date || toMinutes(a.start) - toMinutes(b.start));

  // The form's CTA: "Review N booking requests" once there's more than one.
  function setSendLabel(n) {
    sendBtn.querySelector('.cta__main').textContent = n > 1 ? `Review ${n} booking requests` : 'Send booking request';
    sendBtn.querySelector('.cta__sub').textContent = n > 1 ? 'You can edit each booking in the next step' : 'Change time or price anytime';
  }

  function renderReview() {
    const n = reviewItems.length;
    $('[data-confirm-title]').textContent = reviewSent
      ? `${plural(n, 'booking request', 'booking requests')} sent to Marie`
      : `Review your ${plural(n, 'booking request', 'booking requests')}`;
    $('[data-confirm-sub]').textContent = reviewSent
      ? 'Marie can confirm each date separately. We will let you know as soon as she replies'
      : 'Marie can confirm each date separately.';
    confirmList.replaceChildren(...reviewItems.map((it, i) => {
      const li = document.createElement('li');
      li.className = 'confirm__item';
      li.innerHTML = `
        <span class="confirm__date"><strong></strong><span class="confirm__meta"><span class="confirm__times"></span><span class="price-pill"></span></span></span>
        <span class="confirm__actions">
          <button class="confirm__edit" type="button" data-edit><i class="fa-regular fa-pen-to-square" aria-hidden="true"></i><span>Edit</span></button>
          <button class="confirm__remove" type="button" data-remove><i class="fa-light fa-xmark" aria-hidden="true"></i><span>Remove</span></button>
        </span>`;
      li.querySelector('strong').textContent = longDate(it.date);
      li.querySelector('.confirm__times').textContent = itemTimes(it);
      li.querySelector('.price-pill').textContent = `${itemPrice(it).toLocaleString('cs-CZ')} Kč`;
      const actions = li.querySelector('.confirm__actions');
      actions.hidden = reviewSent;
      actions.querySelector('[data-edit]').setAttribute('aria-label', `Edit the booking on ${longDate(it.date)}`);
      actions.querySelector('[data-remove]').setAttribute('aria-label', `Remove the booking on ${longDate(it.date)}`);
      actions.querySelector('[data-edit]').addEventListener('click', (e) => openEdit(i, e.currentTarget));
      actions.querySelector('[data-remove]').addEventListener('click', () => removeItem(i));
      return li;
    }));
    reviewSend.hidden = reviewSent;
    reviewSend.querySelector('.cta__main').textContent = `Send ${plural(n, 'booking request', 'booking requests')}`;
    confirmBack.hidden = !reviewSent;
  }

  function showReview(dates) {
    reviewItems = dates.map((d) => ({ date: d, start: state.startTime, end: state.endTime }));
    reviewSent = false;
    renderReview();
    document.body.dataset.view = 'confirm';
    confirmEl.hidden = false;
    confirmEl.querySelector('.confirm__scroll').scrollTop = 0;
    $('[data-confirm-close]').focus({ preventScroll: true, focusVisible: false });
  }

  function removeItem(i) {
    reviewItems.splice(i, 1);
    if (!reviewItems.length) {
      leaveReview();
      toast('All bookings removed. Nothing was sent.');
      return;
    }
    renderReview();
  }

  // Back to the form without sending: it keeps what was there.
  function leaveReview() {
    closeEdit();
    confirmEl.hidden = true;
    delete document.body.dataset.view;
    sendBtn.focus({ preventScroll: true, focusVisible: false });
  }

  reviewSend.addEventListener('click', () => {
    reviewSent = true;
    renderReview();
    confirmEl.querySelector('.confirm__scroll').scrollTop = 0;
  });

  // ---------- edit one booking (review step) ----------
  // A small sheet with the form's date / From / To row for one booking.
  // The date opens the Pick a date sheet on top; the times open the time
  // picker. Save applies; a swipe, the backdrop or Esc discard.

  const editSheet = $('[data-edit-sheet]');
  const editDate = $('[data-edit-date]');
  let editIndex = -1;
  let editDraft = null;
  let editOpener = null;
  let editCloseTimer = null;

  const editTimes = {
    get: (target) => (target === 'start' ? editDraft.start : editDraft.end),
    // Moving the start keeps the booking's length, as on the form.
    set: (target, time) => {
      if (target === 'start') {
        const length = itemMinutes(editDraft) || 180;
        editDraft.start = time;
        editDraft.end = fromMinutes(toMinutes(time) + length);
      } else {
        editDraft.end = time;
      }
      renderEdit();
    },
  };

  function renderEdit() {
    $('[data-edit-dow]').textContent = DOW_LONG[editDraft.date.getDay()];
    $('[data-edit-date-label]').textContent = short(editDraft.date);
    $('[data-edit-start]').textContent = editDraft.start;
    $('[data-edit-end]').textContent = editDraft.end;
    $('[data-edit-next-day]').hidden = !itemOvernight(editDraft);
    editDate.setAttribute('aria-label', `Date: ${DOW_LONG[editDraft.date.getDay()]}, ${short(editDraft.date)}. Change`);
  }

  function openEdit(i, opener) {
    clearTimeout(editCloseTimer);
    editIndex = i;
    editOpener = opener;
    editDraft = { ...reviewItems[i] };
    renderEdit();
    editSheet.style.transform = '';
    showBackdrop();
    editSheet.hidden = false;
    editSheet.getBoundingClientRect();
    editSheet.classList.add('is-open');
    editDate.focus({ preventScroll: true, focusVisible: false });
  }

  function closeEdit({ apply = false } = {}) {
    if (editSheet.hidden) return;
    closeTimePicker({ refocus: false });
    if (apply) {
      reviewItems[editIndex] = editDraft;
      sortItems();
      renderReview();
    }
    editSheet.style.transform = '';
    editSheet.classList.remove('is-open', 'is-dragging');
    hideBackdrop();
    editCloseTimer = setTimeout(() => { editSheet.hidden = true; }, 420);
    if (!apply) editOpener?.focus({ preventScroll: true, focusVisible: false });
  }

  editDate.addEventListener('click', () => openSheet('custom', editDate, {
    date: editDraft.date,
    onApply: (d) => { editDraft.date = d; renderEdit(); },
  }));
  $$('[data-edit-time]').forEach((field) => {
    field.addEventListener('click', () => openTimePicker(field.dataset.editTime, field, editTimes));
  });
  $('[data-edit-save]').addEventListener('click', () => closeEdit({ apply: true }));

  // A fresh booking for the current variant: v1 on the day after
  // tomorrow, v5 on tomorrow (v5.js sets its own today and options).
  function resetForm() {
    repeat = null;
    state.mode = 'single';
    if (variant === 1) today = realToday;
    hooks.reset?.();
    state.startDate = addDays(today, variant === 2 ? 1 : DEFAULT_OFFSET_DAYS);
    state.endDate = state.startDate;
    state.startTime = DEFAULT_TIMES.start;
    state.endTime = DEFAULT_TIMES.end;
    renderForm();
    $('[data-booking]').scrollTop = 0;
  }

  // After sending, leaving starts a fresh booking; before, it goes back
  // to the form as it was.
  function backToForm() {
    if (!reviewSent) { leaveReview(); return; }
    confirmEl.hidden = true;
    delete document.body.dataset.view;
    resetForm();
  }

  sendBtn.addEventListener('click', () => {
    if (variant === 2) { hooks.send?.(); return; }
    const dates = repeat ? bookedDates(repeat) : [state.startDate];
    if (state.mode === 'single' && dates.length > 1) showReview(dates);
    else toast('Booking request sent (prototype).');
  });
  $('[data-confirm-close]').addEventListener('click', backToForm);
  confirmBack.addEventListener('click', backToForm);

  // The backdrop and Esc close the topmost sheet only (the date sheet can
  // sit on the edit sheet).
  function closeTopSheet() {
    if (!sheet.hidden && sheet.classList.contains('is-open')) { closeSheet(); return; }
    closeRepeat();
    closeEdit();
  }
  draggable(sheet, grip, () => closeSheet());
  draggable(repeatSheet, $('[data-repeat-grip]'), () => closeRepeat());
  draggable(editSheet, $('[data-edit-grip]'), () => closeEdit());
  backdrop.addEventListener('click', closeTopSheet);
  screen.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeTopSheet();
  });

  // ---------- variants (prototype only) ----------
  // The page switch (desktop) and the pill + dialog (phones) both pick the
  // variant, stay in sync and keep it in the URL.

  const variantInputs = $$('input[name="variant"], input[name="variant-m"]');
  const variantPill = $('[data-variant-pill]');
  const variantPillLabel = $('[data-variant-pill-label]');
  const variantDialog = $('[data-variant-dialog]');

  function applyVariant() {
    document.body.dataset.variant = String(variant);
    variantInputs.forEach((input) => { input.checked = Number(input.value) === variant; });
    variantPillLabel.textContent = `Variant ${variant}`;
    variantPill.setAttribute('aria-label', `Prototype variant: ${variant}. Change`);
  }

  function setVariant(value) {
    if (value === variant) return;
    variant = value;
    closeSheet();
    closeRepeat();
    closeEdit();
    hooks.closeSheets?.();
    closeTimePicker({ refocus: false });
    if (!confirmEl.hidden) { confirmEl.hidden = true; delete document.body.dataset.view; }
    const url = new URL(location.href);
    url.searchParams.set('variant', String(variant));
    history.replaceState(null, '', url);
    applyVariant();
    resetForm();
  }

  variantInputs.forEach((input) => input.addEventListener('change', () => {
    setVariant(Number(input.value));
    if (variantDialog.open && input.name === 'variant-m') variantDialog.close();
  }));
  variantPill.addEventListener('click', () => variantDialog.showModal());
  variantDialog.addEventListener('click', (e) => { if (e.target === variantDialog) variantDialog.close(); });

  // ---------- shared API for v5.js ----------

  window.RB = {
    state,
    hooks,
    get variant() { return variant; },
    get today() { return today; },
    setToday(d) { today = d; },
    DOW_LONG, DOW_SHORT, DOW_GRID, MONTHS,
    day, addDays, sameDay, mondayOf, short, toMinutes, fromMinutes,
    isOvernight, durationMinutes,
    renderForm, resetForm, toast, flash, setMode,
    showReview, setSendLabel,
    openDateSheet: (field) => openSheet('start', field),
    closeTimePicker,
    draggable, showBackdrop, hideBackdrop,
    rateSelect, totalEl, totalLabel, sendBtn,
  };

  applyVariant();
  renderForm();
})();
