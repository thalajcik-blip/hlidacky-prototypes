// Booking date picker: a bottom sheet with usual-time suggestions on top
// and a weekly strip / monthly grid below. All dates are local midnights.

(() => {
  const DOW_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const DOW_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DOW_GRID = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Marie's usual bookings: Wednesdays and Fridays, 16:00–19:00.
  const USUAL = { days: [3, 5], start: '16:00', end: '19:00' };
  const SUGGESTION_COUNT = 2;

  const $ = (sel) => document.querySelector(sel);
  const screen = $('[data-screen]');
  const sheet = $('[data-sheet]');
  const backdrop = $('[data-backdrop]');
  const grip = $('[data-grip]');
  const suggestionsEl = $('[data-suggestions]');
  const weekEl = $('[data-week]');
  const monthEl = $('[data-month]');
  const periodEl = $('[data-period]');
  const prevBtn = $('[data-prev]');
  const nextBtn = $('[data-next]');
  const toggleBtn = $('[data-toggle-view]');
  const useBtn = $('[data-use]');
  const dateBtn = $('[data-open-picker]');
  const dateLabel = $('[data-date-label]');
  const whenHint = $('[data-when-hint]');
  const startInput = $('[data-start]');
  const endInput = $('[data-end]');
  const rateSelect = $('[data-rate]');
  const totalEl = $('[data-total]');
  const totalLabel = $('[data-total-label]');

  // ---------- date helpers ----------

  const day = (y, m, d) => new Date(y, m, d);
  const addDays = (d, n) => day(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const sameDay = (a, b) => !!a && !!b && a.getTime() === b.getTime();
  const mondayOf = (d) => addDays(d, -((d.getDay() + 6) % 7));
  const monthOf = (d) => day(d.getFullYear(), d.getMonth(), 1);
  const short = (d) => `${d.getDate()}.${d.getMonth() + 1}.`;
  const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;

  // ---------- state ----------

  const now = new Date();
  const today = day(now.getFullYear(), now.getMonth(), now.getDate());
  let suggestions = [];
  let selected = null; // the date in the form
  let draft = null; // the date picked inside the sheet
  // The sheet reopens in whichever view the user last switched to; weekly
  // until they first switch. Kept across reloads, per browser.
  const VIEW_KEY = 'booking-date-picker:view';
  const readView = () => {
    try { return localStorage.getItem(VIEW_KEY) === 'month' ? 'month' : 'week'; } catch { return 'week'; }
  };
  const saveView = (value) => {
    try { localStorage.setItem(VIEW_KEY, value); } catch { /* storage blocked: remember for this page only */ }
  };
  let lastView = readView();
  let view = lastView;
  let anchor = null; // Monday of the shown week, or 1st of the shown month

  function computeSuggestions() {
    const out = [];
    for (let d = today; out.length < SUGGESTION_COUNT; d = addDays(d, 1)) {
      if (USUAL.days.includes(d.getDay())) out.push(d);
    }
    return out;
  }

  const suggestionIndex = (d) => suggestions.findIndex((s) => sameDay(s, d));

  // ---------- form ----------

  function minutes(value) {
    const [h, m] = value.split(':').map(Number);
    return h * 60 + m;
  }

  function updateTotal() {
    if (!startInput.value || !endInput.value) return;
    let span = minutes(endInput.value) - minutes(startInput.value);
    if (span <= 0) span += 24 * 60; // overnight
    const hours = span / 60;
    totalEl.textContent = Math.round(hours * Number(rateSelect.value)).toLocaleString('cs-CZ');
    const label = Number.isInteger(hours) ? hours : hours.toFixed(2).replace(/0$/, '');
    totalLabel.textContent = `total price for ${label} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  function updateWhenHint() {
    whenHint.hidden = !(suggestionIndex(selected) >= 0
      && startInput.value === USUAL.start && endInput.value === USUAL.end);
  }

  function renderForm() {
    dateLabel.textContent = short(selected);
    dateBtn.setAttribute('aria-label', `Date: ${DOW_LONG[selected.getDay()]}, ${short(selected)} Change`);
    updateWhenHint();
    updateTotal();
  }

  function init() {
    suggestions = computeSuggestions();
    selected = suggestions[0];
    startInput.value = USUAL.start;
    endInput.value = USUAL.end;
    renderForm();
  }

  // ---------- sheet rendering ----------

  function dayName(d) {
    return `${DOW_LONG[d.getDay()]}, ${short(d)}${sameDay(d, today) ? ' (today)' : ''}`;
  }

  function renderSuggestions() {
    suggestionsEl.replaceChildren(...suggestions.map((d, i) => {
      const label = document.createElement('label');
      label.className = 'suggestion';
      label.innerHTML = `
        <input type="radio" name="suggestion" value="${i}">
        <span class="suggestion__radio" aria-hidden="true"></span>
        <span class="suggestion__day"></span>
        <span class="suggestion__time">(${USUAL.start}–${USUAL.end})</span>`;
      label.querySelector('.suggestion__day').textContent = dayName(d);
      const input = label.querySelector('input');
      input.checked = sameDay(d, draft);
      input.addEventListener('change', () => pick(d, { fromSuggestion: true }));
      return label;
    }));
  }

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
    btn.setAttribute('aria-label', dayName(d));
    btn.setAttribute('aria-pressed', String(sameDay(d, draft)));
    btn.dataset.time = String(d.getTime());
    btn.addEventListener('click', () => pick(d));
    return btn;
  }

  function renderWeek() {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = addDays(anchor, i);
      const btn = dayButton(d, 'day');
      btn.innerHTML = `
        <span class="day__band">${sameDay(d, today) ? 'Today' : '–––'}</span>
        <span class="day__month">${MONTHS[d.getMonth()].slice(0, 3)}</span>
        <span class="day__num">${d.getDate()}</span>
        <span class="day__dow">${DOW_SHORT[d.getDay()]}</span>`;
      days.push(btn);
    }
    weekEl.replaceChildren(...days);
  }

  function renderMonth() {
    const cells = DOW_GRID.map((name) => {
      const el = document.createElement('span');
      el.className = 'month__dow';
      el.textContent = name;
      el.setAttribute('aria-hidden', 'true');
      return el;
    });
    const first = mondayOf(anchor);
    const lastOfMonth = day(anchor.getFullYear(), anchor.getMonth() + 1, 0);
    const last = addDays(mondayOf(lastOfMonth), 6);
    for (let d = first; d <= last; d = addDays(d, 1)) {
      const btn = dayButton(d, 'mday');
      btn.textContent = d.getDate();
      btn.classList.toggle('is-weekend', isWeekend(d));
      btn.classList.toggle('is-outside', d.getMonth() !== anchor.getMonth());
      cells.push(btn);
    }
    monthEl.replaceChildren(...cells);
  }

  function render() {
    renderSuggestions();
    periodEl.textContent = periodLabel();
    weekEl.hidden = view !== 'week';
    monthEl.hidden = view !== 'month';
    if (view === 'week') renderWeek(); else renderMonth();
    prevBtn.setAttribute('aria-label', view === 'week' ? 'Previous week' : 'Previous month');
    nextBtn.setAttribute('aria-label', view === 'week' ? 'Next week' : 'Next month');
    toggleBtn.textContent = view === 'week' ? 'Show monthly view' : 'Show weekly view';
    useBtn.textContent = `Use ${DOW_LONG[draft.getDay()]}, ${short(draft)}`;
  }

  // Centre a day in the weekly strip, so the cut-off cards fall on the
  // edges the way the design shows them.
  function centreWeekOn(d, smooth) {
    if (view !== 'week') return;
    const target = weekEl.querySelector(`[data-time="${d.getTime()}"]`)
      || weekEl.querySelector('.is-today')
      || weekEl.lastElementChild;
    if (!target) return;
    // offsetLeft is measured from the sheet, so take the strip's own off.
    const left = target.offsetLeft - weekEl.offsetLeft - (weekEl.clientWidth - target.offsetWidth) / 2;
    weekEl.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
  }

  function pick(d, { fromSuggestion = false } = {}) {
    draft = d;
    const inPeriod = view === 'week'
      ? sameDay(mondayOf(d), anchor)
      : d.getMonth() === anchor.getMonth() && d.getFullYear() === anchor.getFullYear();
    if (!inPeriod) anchor = view === 'week' ? mondayOf(d) : monthOf(d);
    const scroll = weekEl.scrollLeft;
    withHeightTransition(() => render());
    weekEl.scrollLeft = scroll;
    centreWeekOn(d, true);
    if (fromSuggestion) suggestionsEl.querySelector('input:checked')?.focus();
  }

  // Animate the sheet between its weekly and monthly heights.
  function withHeightTransition(change) {
    if (!sheet.classList.contains('is-open')) { change(); return; }
    const from = sheet.getBoundingClientRect().height;
    sheet.style.height = '';
    change();
    const to = sheet.getBoundingClientRect().height;
    if (Math.abs(to - from) < 1) return;
    sheet.style.height = `${from}px`;
    sheet.getBoundingClientRect(); // commit the start height
    sheet.style.height = `${to}px`;
    // Fall back to a timer: transitionend never fires if the transition
    // is interrupted, and a pinned height would break the next resize.
    const done = (e) => {
      if (e && e.propertyName !== 'height') return;
      clearTimeout(timer);
      sheet.style.height = '';
      sheet.removeEventListener('transitionend', done);
    };
    const timer = setTimeout(done, 400);
    sheet.addEventListener('transitionend', done);
  }

  // ---------- open / close ----------

  let closeTimer = null;

  function open() {
    clearTimeout(closeTimer);
    draft = selected;
    view = lastView;
    anchor = view === 'week' ? mondayOf(draft) : monthOf(draft);
    render();
    sheet.style.height = '';
    sheet.style.transform = '';
    backdrop.hidden = false;
    sheet.hidden = false;
    centreWeekOn(draft, false);
    sheet.getBoundingClientRect();
    backdrop.classList.add('is-open');
    sheet.classList.add('is-open');
    (suggestionsEl.querySelector('input:checked') || weekEl.querySelector('.is-selected') || useBtn).focus({ preventScroll: true });
  }

  function close({ apply = false } = {}) {
    if (sheet.hidden) return;
    if (apply) {
      const wasSuggested = suggestionIndex(draft) >= 0;
      selected = draft;
      if (wasSuggested) {
        startInput.value = USUAL.start;
        endInput.value = USUAL.end;
      }
      renderForm();
      dateBtn.classList.remove('is-flash');
      void dateBtn.offsetWidth;
      dateBtn.classList.add('is-flash');
    }
    sheet.style.transform = '';
    sheet.classList.remove('is-open', 'is-dragging');
    backdrop.classList.remove('is-open');
    closeTimer = setTimeout(() => {
      sheet.hidden = true;
      backdrop.hidden = true;
    }, 420);
    dateBtn.focus({ preventScroll: true });
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
    if (dismiss) close(); else sheet.style.transform = '';
  };
  grip.addEventListener('pointerup', endDrag);
  grip.addEventListener('pointercancel', endDrag);

  // ---------- events ----------

  dateBtn.addEventListener('click', open);
  backdrop.addEventListener('click', () => close());
  useBtn.addEventListener('click', () => close({ apply: true }));
  screen.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !sheet.hidden) close();
  });

  prevBtn.addEventListener('click', () => {
    anchor = view === 'week' ? addDays(anchor, -7) : day(anchor.getFullYear(), anchor.getMonth() - 1, 1);
    withHeightTransition(render);
    centreWeekOn(draft, false);
  });
  nextBtn.addEventListener('click', () => {
    anchor = view === 'week' ? addDays(anchor, 7) : day(anchor.getFullYear(), anchor.getMonth() + 1, 1);
    withHeightTransition(render);
    weekEl.scrollLeft = 0;
  });

  toggleBtn.addEventListener('click', () => {
    view = view === 'week' ? 'month' : 'week';
    lastView = view;
    saveView(view);
    anchor = view === 'week' ? mondayOf(draft) : monthOf(draft);
    withHeightTransition(render);
    centreWeekOn(draft, false);
  });

  [startInput, endInput].forEach((input) => input.addEventListener('change', () => {
    updateWhenHint();
    updateTotal();
  }));
  rateSelect.addEventListener('change', updateTotal);

  init();
})();
