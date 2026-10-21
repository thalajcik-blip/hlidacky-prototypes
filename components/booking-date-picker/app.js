// Booking date picker, three variants. Variant 1: suggested days as pills
// under a custom select of days. Variant 2: a bottom sheet with suggestions on
// top and a weekly strip / monthly grid below. Variant 3: the same sheet
// with the suggestions as pills and reworked day states. All dates are
// local midnights. Variant 4: the pills of variant 1 on the form, and the
// variant 3 sheet without its suggestions.

(() => {
  const DOW_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const DOW_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DOW_GRID = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Marie's usual bookings: Wednesdays and Fridays, 16:00–19:00.
  const USUAL = { days: [3, 5], start: '16:00', end: '19:00' };
  // Variant 4 fills in the first and offers the next three as pills.
  const SUGGESTION_COUNT = { 1: 3, 2: 2, 3: 3, 4: 4 };

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
  const dateSelect = $('[data-date-select]');
  const dateSelectLabel = $('[data-date-select-label]');
  const dateSelectField = dateSelect.closest('.when__field');
  const dateOptions = $('[data-date-options]');
  const quickDatesEl = $('[data-quick-dates]');

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
  const params = new URLSearchParams(location.search);
  let variant = ['1', '2', '3', '4'].includes(params.get('variant')) ? Number(params.get('variant')) : 2;
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
    for (let d = today; out.length < SUGGESTION_COUNT[variant]; d = addDays(d, 1)) {
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

  function renderQuickDates() {
    const days = variant === 4 ? suggestions.slice(1) : suggestions;
    quickDatesEl.replaceChildren(...days.map((d) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'quick-date';
      pill.textContent = `${DOW_SHORT[d.getDay()]} ${short(d)}`;
      pill.setAttribute('aria-label', `${DOW_LONG[d.getDay()]}, ${short(d)}, ${USUAL.start}–${USUAL.end}`);
      pill.setAttribute('aria-pressed', String(sameDay(d, selected)));
      pill.addEventListener('click', () => {
        selected = d;
        startInput.value = USUAL.start;
        endInput.value = USUAL.end;
        renderForm();
        flash(variant === 4 ? dateBtn : dateSelectField);
      });
      return pill;
    }));
  }

  function renderForm() {
    dateLabel.textContent = short(selected);
    dateBtn.setAttribute('aria-label', `Date: ${DOW_LONG[selected.getDay()]}, ${short(selected)} Change`);
    dateSelectLabel.textContent = selectLabel(selected);
    dateSelect.setAttribute('aria-label', `Date: ${dayName(selected)}. Change`);
    if (variant === 1 || variant === 4) renderQuickDates();
    updateWhenHint();
    updateTotal();
  }

  function flash(el) {
    el.classList.remove('is-flash');
    void el.offsetWidth;
    el.classList.add('is-flash');
  }

  // Variant 1 starts on today and offers the next usual days as pills;
  // the others start on the first suggestion.
  function init() {
    document.body.dataset.variant = String(variant);
    syncVariantControls();
    closeSelect({ refocus: false });
    suggestions = computeSuggestions();
    selected = variant === 1 ? today : suggestions[0];
    startInput.value = USUAL.start;
    endInput.value = USUAL.end;
    renderForm();
  }

  // ---------- sheet rendering ----------

  function dayName(d) {
    return `${DOW_LONG[d.getDay()]}, ${short(d)}${sameDay(d, today) ? ' (today)' : ''}`;
  }

  // Variant 3 shows the suggestions as pills, without the times.
  function renderSuggestionPills() {
    suggestionsEl.setAttribute('role', 'group');
    suggestionsEl.replaceChildren(...suggestions.map((d) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'sheet-pill';
      pill.textContent = `${DOW_SHORT[d.getDay()]} ${short(d)}${sameDay(d, today) ? ' (Today)' : ''}`;
      pill.setAttribute('aria-label', `${dayName(d)}, ${USUAL.start}–${USUAL.end}`);
      pill.setAttribute('aria-pressed', String(sameDay(d, draft)));
      pill.dataset.time = String(d.getTime());
      pill.addEventListener('click', () => pick(d, { fromSuggestion: true }));
      return pill;
    }));
  }

  function renderSuggestions() {
    if (variant === 3) { renderSuggestionPills(); return; }
    suggestionsEl.setAttribute('role', 'radiogroup');
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

  // ---------- weekly strip ----------
  // One continuous row of days that scrolls sideways without end: it is
  // rendered STRIP_WEEKS either side of a week and grows by that much
  // whenever the scroll gets within EDGE_WEEKS of either end. The label
  // shows the week of the day under the strip's centre.

  const STRIP_WEEKS = 8;
  const EDGE_WEEKS = 2;
  let stripStart = null; // Monday of the first rendered day
  let stripEnd = null; // Sunday of the last rendered day
  let navLock = null; // set while the strip scrolls to a week we chose

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

  // Grow the strip before the scroll runs out. Prepending shifts every
  // card right, so the scroll position is reset to keep the old first
  // card where it was on screen. It is set absolutely, not by adding the
  // new width: Chrome may already have moved it (scroll anchoring,
  // re-snapping to the snapped card), and adding would double the shift.
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

  // Scroll the strip to a week (centred on its Thursday) or a day. The
  // label jumps to the target straight away and ignores the scroll until
  // it settles, so quick repeated arrow taps count from the right week.
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
      // Release the label once the programmatic scroll stops moving.
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
    const lastOfMonth = day(anchor.getFullYear(), anchor.getMonth() + 1, 0);
    const last = addDays(mondayOf(lastOfMonth), 6);
    for (let d = first; d <= last; d = addDays(d, 1)) {
      const btn = dayButton(d, 'mday');
      // Variant 3 tags today's cell; variant 2 only outlines it.
      if (variant >= 3 && sameDay(d, today)) {
        btn.innerHTML = `<span class="mday__today">Today</span>${d.getDate()}`;
      } else {
        btn.textContent = d.getDate();
      }
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

  // Mark the picked day without rebuilding the strip, so its scroll
  // position survives.
  function updateSelection() {
    document.querySelectorAll('.day[data-time], .mday[data-time], .sheet-pill[data-time]').forEach((btn) => {
      const on = btn.dataset.time === String(draft.getTime());
      btn.classList.toggle('is-selected', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    suggestionsEl.querySelectorAll('input').forEach((input, i) => {
      input.checked = sameDay(suggestions[i], draft);
    });
    useBtn.textContent = `Use ${DOW_LONG[draft.getDay()]}, ${short(draft)}`;
  }

  function pick(d, { fromSuggestion = false } = {}) {
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
    if (fromSuggestion) suggestionsEl.querySelector('input:checked, [aria-pressed="true"]')?.focus();
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
    if (view === 'week') scrollStripTo(draft, { smooth: false });
    sheet.getBoundingClientRect();
    backdrop.classList.add('is-open');
    sheet.classList.add('is-open');
    // Variant 4's sheet has no suggestions to focus.
    ((variant !== 4 && suggestionsEl.querySelector('input:checked, [aria-pressed="true"]')) || weekEl.querySelector('.is-selected') || useBtn).focus({ preventScroll: true });
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
      flash(dateBtn);
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

  [startInput, endInput].forEach((input) => input.addEventListener('change', () => {
    updateWhenHint();
    updateTotal();
  }));
  rateSelect.addEventListener('change', updateTotal);

  // ---------- variant 1: custom date select ----------
  // A listbox of days from a week back to three months ahead, like the
  // product's select. It opens above the field when there is room in the
  // scrolling form, otherwise below, and scrolls to the current day.

  const SELECT_PAST_DAYS = 7;
  const SELECT_FUTURE_DAYS = 90;
  let selectDays = [];
  let activeIndex = -1;

  function selectLabel(d) {
    if (sameDay(d, today)) return 'Today';
    if (sameDay(d, addDays(today, 1))) return 'Tomorrow';
    return `${DOW_SHORT[d.getDay()]} ${short(d)}`;
  }

  function renderOptions() {
    let from = addDays(today, -SELECT_PAST_DAYS);
    let to = addDays(today, SELECT_FUTURE_DAYS);
    if (selected < from) from = selected;
    if (selected > to) to = selected;
    selectDays = [];
    for (let d = from; d <= to; d = addDays(d, 1)) selectDays.push(d);
    dateOptions.replaceChildren(...selectDays.map((d, i) => {
      const li = document.createElement('li');
      li.className = 'date-option';
      li.id = `date-option-${i}`;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(sameDay(d, selected)));
      li.textContent = selectLabel(d);
      if (d < today) {
        const past = document.createElement('span');
        past.className = 'date-option__past';
        past.textContent = ' past';
        li.append(past);
      }
      li.addEventListener('click', () => choose(d));
      return li;
    }));
  }

  function setActive(index, scroll = 'nearest') {
    activeIndex = Math.max(0, Math.min(selectDays.length - 1, index));
    dateOptions.querySelectorAll('.is-active').forEach((el) => el.classList.remove('is-active'));
    const li = dateOptions.children[activeIndex];
    li.classList.add('is-active');
    dateOptions.setAttribute('aria-activedescendant', li.id);
    if (scroll === 'centre') {
      dateOptions.scrollTop = li.offsetTop - (dateOptions.clientHeight - li.offsetHeight) / 2;
    } else {
      li.scrollIntoView({ block: 'nearest' });
    }
  }

  function openSelect() {
    renderOptions();
    dateOptions.hidden = false;
    // Room above the field inside the scrolling form decides the side.
    const form = dateSelectField.closest('[data-booking]').getBoundingClientRect();
    const field = dateSelectField.getBoundingClientRect();
    const up = field.top - form.top >= Math.min(272, dateOptions.scrollHeight) || field.top - form.top > form.bottom - field.bottom;
    dateOptions.classList.toggle('is-up', up);
    dateOptions.classList.toggle('is-down', !up);
    dateOptions.style.maxHeight = `${Math.min(272, Math.max(120, up ? field.top - form.top - 8 : form.bottom - field.bottom - 8))}px`;
    dateSelect.setAttribute('aria-expanded', 'true');
    setActive(selectDays.findIndex((d) => sameDay(d, selected)), 'centre');
    dateOptions.focus({ preventScroll: true });
  }

  function closeSelect({ refocus = true } = {}) {
    if (dateOptions.hidden) return;
    dateOptions.hidden = true;
    dateSelect.setAttribute('aria-expanded', 'false');
    if (refocus) dateSelect.focus({ preventScroll: true });
  }

  // Picking from the list keeps the times; only the pills set Marie's.
  function choose(d) {
    selected = d;
    closeSelect();
    renderForm();
    flash(dateSelectField);
  }

  dateSelect.addEventListener('click', () => {
    if (dateOptions.hidden) openSelect(); else closeSelect();
  });
  dateSelect.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp'].includes(e.key) && dateOptions.hidden) {
      e.preventDefault();
      openSelect();
    }
  });
  dateOptions.addEventListener('keydown', (e) => {
    const page = 7;
    const moves = { ArrowDown: 1, ArrowUp: -1, PageDown: page, PageUp: -page };
    if (e.key in moves) setActive(activeIndex + moves[e.key]);
    else if (e.key === 'Home') setActive(0);
    else if (e.key === 'End') setActive(selectDays.length - 1);
    else if (e.key === 'Enter' || e.key === ' ') choose(selectDays[activeIndex]);
    else if (e.key === 'Escape') closeSelect();
    else if (e.key === 'Tab') { closeSelect({ refocus: false }); return; }
    else return;
    e.preventDefault();
    e.stopPropagation();
  });
  document.addEventListener('pointerdown', (e) => {
    if (!dateOptions.hidden && !dateSelectField.contains(e.target)) closeSelect({ refocus: false });
  });

  // Prototype only: the page switch (desktop) and the pill + dialog
  // (phones) both pick the variant and stay in sync.
  const variantInputs = document.querySelectorAll('input[name="variant"], input[name="variant-m"]');
  const variantPill = $('[data-variant-pill]');
  const variantPillLabel = $('[data-variant-pill-label]');
  const variantDialog = $('[data-variant-dialog]');

  function syncVariantControls() {
    variantInputs.forEach((input) => { input.checked = Number(input.value) === variant; });
    variantPillLabel.textContent = `Variant ${variant}`;
    variantPill.setAttribute('aria-label', `Prototype variant: ${variant}. Change`);
  }

  function setVariant(value) {
    variant = value;
    if (!sheet.hidden) close();
    const url = new URL(location.href);
    url.searchParams.set('variant', String(variant));
    history.replaceState(null, '', url);
    init();
  }

  variantInputs.forEach((input) => input.addEventListener('change', () => {
    setVariant(Number(input.value));
    if (variantDialog.open) variantDialog.close();
  }));
  variantPill.addEventListener('click', () => variantDialog.showModal());
  // A click on the backdrop lands on the dialog element itself.
  variantDialog.addEventListener('click', (e) => {
    if (e.target === variantDialog) variantDialog.close();
  });

  init();
})();
