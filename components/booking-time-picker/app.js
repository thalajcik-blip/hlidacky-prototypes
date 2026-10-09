(function () {
  const { TimePicker, parse, format, formatDuration, isTouch, DAY } = window.HlidackyTimePicker;

  const form = document.querySelector('[data-booking-form]');
  const dateInput = document.getElementById('booking_date');
  const startInput = document.getElementById('booking_start');
  const endInput = document.getElementById('booking_end');
  const summary = document.querySelector('[data-summary]');
  const nextDayBadge = document.querySelector('[data-next-day]');
  const variantHint = document.querySelector('[data-variant-hint]');
  const toast = document.querySelector('[data-toast]');

  const HINTS = {
    grid: 'Both fields: an hour grid plus :00 / :15 / :30 / :45 chips. Hours between start and end are tinted in the end picker.',
    durations: 'Start: hour grid. End: pick how long (1–12 h) and see the end time on each button.',
    list: 'The current jQuery timepicker: one long list of every 15 minutes.',
  };

  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const today = new Date();
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  dateInput.value = iso(tomorrow);
  dateInput.min = iso(today);
  dateInput.addEventListener('click', () => dateInput.showPicker && dateInput.showPicker());

  // Duration is the thing parents think in, so it survives start changes.
  let duration = 4 * 60;

  function context() {
    const isToday = dateInput.value === iso(new Date());
    const now = new Date();
    return {
      start: parse(startInput.value),
      minStart: isToday ? now.getHours() * 60 + now.getMinutes() : null,
    };
  }

  function update() {
    const start = parse(startInput.value);
    const end = parse(endInput.value);
    if (start == null || end == null || !dateInput.value) {
      summary.textContent = '';
      nextDayBadge.hidden = true;
      return;
    }
    const dur = ((end - start + DAY) % DAY) || DAY;
    const overnight = end <= start;
    nextDayBadge.hidden = !overnight;

    const day = new Date(`${dateInput.value}T00:00`);
    const fmt = (d) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    const endDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    summary.innerHTML = overnight
      ? `<i class="fa-light fa-moon"></i> <strong>${formatDuration(dur)}</strong> · ${fmt(day)} ${format(start)} – ${fmt(endDay)} ${format(end)}`
      : `<i class="fa-light fa-hourglass-half"></i> <strong>${formatDuration(dur)}</strong> · ${fmt(day)}, ${format(start)} – ${format(end)}`;
  }

  startInput.addEventListener('change', () => {
    const start = parse(startInput.value);
    if (start == null) return;
    const endValue = (start + duration) % DAY;
    endPicker ? endPicker.setValue(endValue, { silent: true }) : (endInput.value = format(endValue));
    update();
  });
  endInput.addEventListener('change', () => {
    const start = parse(startInput.value);
    const end = parse(endInput.value);
    if (start != null && end != null) duration = ((end - start + DAY) % DAY) || DAY;
    update();
  });
  // Switching to today must not leave a start time that is already over.
  dateInput.addEventListener('change', () => {
    const { start, minStart } = context();
    if (minStart != null && start != null && start < minStart) {
      const next = Math.ceil((minStart + 1) / 15) * 15;
      if (next < DAY) {
        startInput.value = format(next);
        startInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
    update();
  });

  let startPicker = null;
  let endPicker = null;

  if (isTouch()) {
    document.querySelector('[data-touch-hint]').hidden = false;
  } else {
    startPicker = new TimePicker(startInput, { mode: 'grid', context });
    endPicker = new TimePicker(endInput, { mode: 'grid', context });
  }

  function setVariant(v) {
    variantHint.textContent = HINTS[v];
    if (startPicker) startPicker.setMode(v);
    if (endPicker) endPicker.setMode(v);
    try { localStorage.setItem('booking-time-picker-variant', v); } catch (e) { /* storage blocked */ }
  }
  document.querySelectorAll('input[name="variant"]').forEach((radio) => {
    radio.addEventListener('change', () => radio.checked && setVariant(radio.value));
  });
  let saved = null;
  try { saved = localStorage.getItem('booking-time-picker-variant'); } catch (e) { /* storage blocked */ }
  const initial = document.querySelector(`input[name="variant"][value="${saved}"]`);
  if (initial) initial.checked = true;
  setVariant(document.querySelector('input[name="variant"]:checked').value);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    toast.textContent = `Submitted booking[start]=${data.get('booking[start]')}, booking[end]=${data.get('booking[end]')}`;
    toast.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.hidden = true; }, 3000);
  });

  update();
})();
