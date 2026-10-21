// Recurrent bookings: the new booking page with a bottom-sheet date picker
// (weekly strip or month) and a custom time picker, in two modes. Single
// mode is one day, or overnight when To is before From; multi mode has a
// start and an end date. Only single mode offers "Repeat this booking".
// All dates are local midnights; times are "HH:MM" strings.

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
  const nextDayBadge = $('[data-next-day]');
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
  const today = day(now.getFullYear(), now.getMonth(), now.getDate());
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
    nextDayBadge.hidden = !(state.mode === 'single' && isOvernight());

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
    updateTotal();
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
    if (mode === 'multi') {
      // Keep the same span, now with its own end date.
      state.endDate = effectiveEndDate();
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
  $('[data-repeat]').addEventListener('click', () => toast('Repeating a booking comes in the next iteration.'));
  sendBtn.addEventListener('click', () => toast('Booking request sent (prototype).'));

  // ---------- time picker ----------
  // Two columns: an hour, then quarter-hour minutes. Picking an hour keeps
  // the picker open; picking the minutes sets the time and closes it.

  let timeTarget = null; // 'start' | 'end'
  let timeField = null; // the button it opened from
  let pendingHour = null;

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
    const current = timeTarget === 'start' ? state.startTime : state.endTime;
    const [h, m] = current.split(':').map(Number);
    const hour = pendingHour ?? h;
    hoursEl.replaceChildren(...Array.from({ length: 24 }, (_, i) => timeOption(pad(i), i, i === hour)));
    minutesEl.replaceChildren(...MINUTE_STEPS.map((mm) => timeOption(pad(mm), mm, pendingHour === null && mm === m)));
  }

  function placeTimePicker() {
    const box = whenSection.getBoundingClientRect();
    const field = timeField.getBoundingClientRect();
    const width = timePicker.offsetWidth;
    let left = field.left - box.left;
    // Keep it inside the section: right-align with the field if needed.
    if (left + width > box.width - 20) left = field.right - box.left - width;
    timePicker.style.left = `${Math.max(20, left)}px`;
    timePicker.style.top = `${field.bottom - box.top}px`;
  }

  function openTimePicker(target, field) {
    if (timeTarget === target && timeField === field && !timePicker.hidden) { closeTimePicker(); return; }
    closeTimePicker({ refocus: false });
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
    minutesEl.querySelector('.time-option').focus({ preventScroll: true });
  });
  minutesEl.addEventListener('click', (e) => {
    const opt = e.target.closest('.time-option');
    if (!opt) return;
    const current = timeTarget === 'start' ? state.startTime : state.endTime;
    const hour = pendingHour ?? Number(current.split(':')[0]);
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

  function openSheet(target, field) {
    closeTimePicker({ refocus: false });
    clearTimeout(closeTimer);
    dateTarget = target;
    dateField = field;
    draft = target === 'end' ? effectiveEndDate() : state.startDate;
    sheetTitle.textContent = state.mode === 'single' ? 'Pick a date' : target === 'end' ? 'Pick the end date' : 'Pick the start date';
    view = lastView;
    anchor = view === 'week' ? mondayOf(draft) : monthOf(draft);
    render();
    sheet.style.height = '';
    sheet.style.transform = '';
    backdrop.hidden = false;
    sheet.hidden = false;
    if (view === 'week') scrollStripTo(draft, { smooth: false });
    sheet.getBoundingClientRect();
    backdrop.classList.add('is-open');
    sheet.classList.add('is-open');
    ((view === 'week' ? weekEl : monthEl).querySelector('.is-selected') || useBtn).focus({ preventScroll: true });
  }

  function closeSheet({ apply = false } = {}) {
    if (sheet.hidden) return;
    if (apply) {
      if (dateTarget === 'start') moveStart(draft, state.startTime);
      else state.endDate = draft;
      renderForm();
      flash(dateField);
    }
    sheet.style.transform = '';
    sheet.classList.remove('is-open', 'is-dragging');
    backdrop.classList.remove('is-open');
    closeTimer = setTimeout(() => {
      sheet.hidden = true;
      backdrop.hidden = true;
    }, 420);
    dateField?.focus({ preventScroll: true });
  }

  // Drag the handle down to dismiss.
  let drag = null;
  grip.addEventListener('pointerdown', (e) => {
    drag = { y: e.clientY, t: performance.now(), dy: 0 };
    grip.setPointerCapture(e.pointerId);
    sheet.classList.add('is-dragging');
  });
  grip.addEventListener('pointermove', (e) => {
    if (!drag) return;
    drag.dy = Math.max(0, e.clientY - drag.y);
    sheet.style.transform = `translateY(${drag.dy}px)`;
    backdrop.style.opacity = String(1 - Math.min(1, drag.dy / sheet.offsetHeight));
  });
  const endDrag = () => {
    if (!drag) return;
    const velocity = drag.dy / Math.max(1, performance.now() - drag.t);
    const dismiss = drag.dy > sheet.offsetHeight * 0.3 || (drag.dy > 24 && velocity > 0.5);
    drag = null;
    sheet.classList.remove('is-dragging');
    backdrop.style.opacity = '';
    if (dismiss) closeSheet(); else sheet.style.transform = '';
  };
  grip.addEventListener('pointerup', endDrag);
  grip.addEventListener('pointercancel', endDrag);

  $$('[data-date-field]').forEach((field) => {
    field.addEventListener('click', () => openSheet(field.dataset.dateField, field));
  });
  backdrop.addEventListener('click', () => closeSheet());
  useBtn.addEventListener('click', () => closeSheet({ apply: true }));
  screen.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !sheet.hidden) closeSheet();
  });

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

  renderForm();
})();
