/*
 * Desktop time picker that progressively enhances a LOLA time input.
 *
 * The <input type="time"> stays the single source of truth: the picker only
 * switches it to a text field (so the 24h HH:MM display does not depend on the
 * OS locale) and writes HH:MM back into it, firing the usual input/change
 * events. On touch devices nothing is enhanced and the native picker is used.
 *
 * Modes:
 *   grid      – hour grid + :00/:15/:30/:45 chips
 *   durations – end time picked as start + duration (end field only)
 *   list      – the current long list (for comparison)
 */
(function () {
  const MINUTES = [0, 15, 30, 45];
  const HOUR_ROWS = [
    { label: 'Morning', hours: [6, 7, 8, 9, 10, 11] },
    { label: 'Afternoon', hours: [12, 13, 14, 15, 16, 17] },
    { label: 'Evening', hours: [18, 19, 20, 21, 22, 23] },
    { label: 'Night', hours: [0, 1, 2, 3, 4, 5], night: true },
  ];
  const DURATION_HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const DAY = 24 * 60;

  const pad = (n) => String(n).padStart(2, '0');
  const format = (m) => `${pad(Math.floor(m / 60) % 24)}:${pad(m % 60)}`;

  function formatDuration(m) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    if (!h) return `${min} min`;
    return min ? `${h} h ${min} min` : `${h} h`;
  }

  // Accepts "18:30", "18.30", "18,30", "18 30", "18h30", "1830", "830", "18", "6:5".
  function parse(raw) {
    const s = String(raw || '').trim().toLowerCase();
    if (!s) return null;
    let h;
    let m;
    const sep = s.match(/^(\d{1,2})\s*[:.,h\s]\s*(\d{0,2})$/);
    if (sep) {
      h = +sep[1];
      m = sep[2] === '' ? 0 : sep[2].length === 1 ? +sep[2] * 10 : +sep[2];
    } else if (/^\d{1,4}$/.test(s)) {
      if (s.length <= 2) { h = +s; m = 0; }
      else { h = +s.slice(0, -2); m = +s.slice(-2); }
    } else {
      return null;
    }
    if (h === 24 && m === 0) h = 0;
    if (h > 23 || m > 59) return null;
    return h * 60 + m;
  }

  const isTouch = () =>
    window.matchMedia('(pointer: coarse)').matches &&
    new URLSearchParams(location.search).get('picker') !== 'custom';

  let uid = 0;

  class TimePicker {
    constructor(input, options) {
      this.input = input;
      this.role = input.dataset.timePicker; // "start" | "end"
      this.mode = options.mode || 'grid';
      this.context = options.context || (() => ({}));
      this.open = false;
      this.id = `tp-${++uid}`;

      this.enhance();
      this.bind();
    }

    enhance() {
      const input = this.input;
      input.type = 'text';
      input.inputMode = 'numeric';
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.maxLength = 5;
      input.setAttribute('role', 'combobox');
      input.setAttribute('aria-haspopup', 'dialog');
      input.setAttribute('aria-expanded', 'false');
      input.setAttribute('aria-controls', this.id);

      this.wrapper = input.parentElement;
      this.wrapper.classList.add('tp-field');

      this.popover = document.createElement('div');
      this.popover.className = 'tp-popover';
      this.popover.id = this.id;
      this.popover.setAttribute('role', 'dialog');
      this.popover.setAttribute('aria-label', this.role === 'end' ? 'Choose end time' : 'Choose start time');
      this.popover.hidden = true;
      this.wrapper.appendChild(this.popover);
    }

    bind() {
      this.input.addEventListener('click', () => this.show());
      this.input.addEventListener('keydown', (e) => this.onInputKey(e));
      this.input.addEventListener('input', () => {
        if (this.open) this.render();
      });
      // Re-rendering removes the focused cell, which fires focusout with no
      // relatedTarget; check where focus actually landed on the next tick.
      this.wrapper.addEventListener('focusout', () => {
        setTimeout(() => {
          if (!this.wrapper.contains(document.activeElement)) {
            this.commitTyped();
            this.hide();
          }
        });
      });
      document.addEventListener('pointerdown', (e) => {
        if (this.open && !this.wrapper.contains(e.target)) {
          this.commitTyped();
          this.hide();
        }
      });
      this.popover.addEventListener('keydown', (e) => this.onPopoverKey(e));
      // Keep focus in the field when clicking cells with the mouse, so
      // typing still works after a click and focusout does not fire.
      this.popover.addEventListener('mousedown', (e) => e.preventDefault());
    }

    get value() {
      return parse(this.input.value);
    }

    setValue(minutes, { silent } = {}) {
      this.input.value = minutes == null ? '' : format(minutes);
      this.input.classList.remove('is-invalid');
      if (!silent) {
        this.input.dispatchEvent(new Event('input', { bubbles: true }));
        this.input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (this.open) this.render();
    }

    setMode(mode) {
      this.mode = mode === 'durations' && this.role !== 'end' ? 'grid' : mode;
      if (this.open) this.render();
    }

    commitTyped() {
      const raw = this.input.value;
      if (raw === this.lastCommitted) return;
      const v = parse(raw);
      if (v == null) {
        if (raw.trim()) {
          this.input.classList.add('is-invalid');
          this.input.value = this.lastCommitted || '';
          setTimeout(() => this.input.classList.remove('is-invalid'), 1200);
        }
        return;
      }
      this.lastCommitted = format(v);
      this.setValue(v);
    }

    show() {
      if (this.open) return;
      this.open = true;
      this.lastCommitted = this.input.value;
      this.popover.hidden = false;
      this.input.setAttribute('aria-expanded', 'true');
      this.render();
      this.place();
    }

    hide() {
      if (!this.open) return;
      this.open = false;
      this.popover.hidden = true;
      this.input.setAttribute('aria-expanded', 'false');
    }

    // Keep the popover inside the viewport with a 16px gutter on both sides.
    place() {
      const gutter = 16;
      this.popover.style.left = '0px';
      const vw = document.documentElement.clientWidth;
      const r = this.popover.getBoundingClientRect();
      let shift = 0;
      if (r.right > vw - gutter) shift = r.right - (vw - gutter);
      if (r.left - shift < gutter) shift = r.left - gutter;
      this.popover.style.left = `${-shift}px`;
    }

    // ---------- rendering ----------

    render() {
      const ctx = this.context();
      const value = this.value;
      if (this.mode === 'list') return this.renderList(ctx, value);
      if (this.mode === 'durations' && this.role === 'end') return this.renderDurations(ctx, value);
      return this.renderGrid(ctx, value);
    }

    // Past times on today's date are not bookable (start field only).
    isPast(ctx, minutes) {
      return this.role === 'start' && ctx.minStart != null && minutes < ctx.minStart;
    }

    renderGrid(ctx, value) {
      const hour = value == null ? null : Math.floor(value / 60);
      const minute = value == null ? null : value % 60;
      const start = this.role === 'end' ? ctx.start : null;
      const inRange = (h) => {
        if (start == null || value == null) return false;
        const s = Math.floor(start / 60);
        const span = (hour - s + 24) % 24;
        const off = (h - s + 24) % 24;
        return off > 0 && off < span;
      };

      const rows = HOUR_ROWS.map((row) => {
        const cells = row.hours.map((h) => {
          const disabled = this.isPast(ctx, h * 60 + 45);
          const cls = ['tp-hour'];
          if (h === hour) cls.push('is-selected');
          if (inRange(h)) cls.push('is-in-range');
          if (start != null && h === Math.floor(start / 60)) cls.push('is-range-start');
          if (row.night) cls.push('is-night');
          return `<button type="button" class="${cls.join(' ')}" data-hour="${h}"
            tabindex="-1" aria-pressed="${h === hour}" ${disabled ? 'disabled' : ''}>${pad(h)}</button>`;
        }).join('');
        return `<div class="tp-row"><span class="tp-row__label">${row.label}</span><div class="tp-row__cells">${cells}</div></div>`;
      }).join('');

      const minutes = MINUTES.map((m) => {
        const disabled = hour != null && this.isPast(ctx, hour * 60 + m);
        return this.minuteChip(`:${pad(m)}`, m, m === minute, disabled, 'minute');
      }).join('');

      const offGrid = minute != null && !MINUTES.includes(minute);
      this.popover.innerHTML = `
        <div class="tp-section-label">Hour</div>
        <div class="tp-grid" role="group" aria-label="Hour">${rows}</div>
        <div class="tp-section-label">Minutes</div>
        <div class="tp-minutes" role="group" aria-label="Minutes">${minutes}</div>
        ${this.footer(ctx, value, offGrid ? `Typed :${pad(minute)}` : '')}`;
      this.wireGrid();
    }

    renderDurations(ctx, value) {
      const start = ctx.start;
      const dur = start == null || value == null ? null : ((value - start + DAY) % DAY) || DAY;
      const durH = dur == null ? null : Math.floor(dur / 60);
      const durM = dur == null ? null : dur % 60;

      const cells = DURATION_HOURS.map((h) => {
        const end = start == null ? null : (start + h * 60 + (durM || 0)) % DAY;
        const selected = h === durH;
        return `<button type="button" class="tp-duration ${selected ? 'is-selected' : ''}" data-dur-hour="${h}"
          tabindex="-1" aria-pressed="${selected}">
            <span class="tp-duration__main">${h} h</span>
            <span class="tp-duration__sub">${end == null ? '' : 'until ' + format(end)}</span>
          </button>`;
      }).join('');

      const minutes = MINUTES.map((m) => this.minuteChip(`+${m}`, m, m === durM, false, 'dur-minute')).join('');

      this.popover.innerHTML = `
        <div class="tp-section-label">How long?</div>
        <div class="tp-durations" role="group" aria-label="Duration in hours">${cells}</div>
        <div class="tp-section-label">Extra minutes</div>
        <div class="tp-minutes" role="group" aria-label="Extra minutes">${minutes}</div>
        ${this.footer(ctx, value)}`;
      this.wireGrid();
    }

    renderList(ctx, value) {
      // Mirrors the current jquery-timepicker: every 15 minutes, 96 rows.
      const items = [];
      for (let m = 0; m < DAY; m += 15) {
        const past = this.isPast(ctx, m);
        const sel = m === value;
        const dur = this.role === 'end' && ctx.start != null
          ? `<span class="ui-timepicker-duration">(${formatDuration(((m - ctx.start + DAY) % DAY) || DAY)})</span>` : '';
        items.push(`<li class="${sel ? 'ui-timepicker-selected' : ''} ${past ? 'ui-timepicker-disabled' : ''}" data-list="${m}">${format(m)}${dur}</li>`);
      }
      this.popover.innerHTML = `<div class="ui-timepicker-wrapper tp-legacy ${this.role === 'end' ? 'ui-timepicker-with-duration' : ''}">
        <ul class="ui-timepicker-list">${items.join('')}</ul></div>`;
      const wrap = this.popover.firstElementChild;
      const selected = wrap.querySelector('.ui-timepicker-selected');
      if (selected) wrap.scrollTop = selected.offsetTop - 60;
      wrap.querySelectorAll('[data-list]').forEach((li) => {
        li.addEventListener('click', () => {
          if (li.classList.contains('ui-timepicker-disabled')) return;
          this.setValue(+li.dataset.list);
          this.lastCommitted = this.input.value;
          this.hide();
        });
      });
    }

    minuteChip(label, m, selected, disabled, kind) {
      return `<label class="filtering-pill-component tp-chip">
        <input type="radio" class="filtering-pill-component__checkbox" name="${this.id}-${kind}"
          data-${kind}="${m}" tabindex="-1" ${selected ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
        <span class="filtering-pill-component__pill">${label}</span>
      </label>`;
    }

    footer(ctx, value, note = '') {
      if (this.role !== 'end' || ctx.start == null || value == null) {
        return note ? `<div class="tp-footer"><span>${note}</span></div>` : '';
      }
      const dur = ((value - ctx.start + DAY) % DAY) || DAY;
      const nextDay = value <= ctx.start;
      return `<div class="tp-footer">
        <span><i class="fa-light fa-hourglass-half"></i> ${formatDuration(dur)}</span>
        ${nextDay ? '<span class="next-day-badge">+1 day</span>' : ''}
        ${note ? `<span class="tp-footer__note">${note}</span>` : ''}
      </div>`;
    }

    // ---------- interaction ----------

    wireGrid() {
      const ctx = this.context();
      this.popover.querySelectorAll('[data-hour]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const h = +btn.dataset.hour;
          const current = this.value;
          let m = current == null ? 0 : current % 60;
          // Keep the minute unless it would land in the past.
          if (this.isPast(ctx, h * 60 + m)) m = MINUTES.find((x) => !this.isPast(ctx, h * 60 + x)) ?? 0;
          this.setValue(h * 60 + m);
          this.lastCommitted = this.input.value;
          this.focusIn('[data-minute]:checked, [data-minute]:not(:disabled)');
        });
      });
      this.popover.querySelectorAll('[data-minute]').forEach((radio) => {
        radio.addEventListener('click', () => {
          const current = this.value;
          const h = current == null ? 18 : Math.floor(current / 60);
          this.setValue(h * 60 + +radio.dataset.minute);
          this.lastCommitted = this.input.value;
          this.hide();
          this.input.focus();
          this.advance();
        });
      });
      this.popover.querySelectorAll('[data-dur-hour]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const c = this.context();
          const extra = this.value == null || c.start == null ? 0 : (((this.value - c.start + DAY) % DAY) || DAY) % 60;
          this.setValue((c.start + +btn.dataset.durHour * 60 + extra) % DAY);
          this.lastCommitted = this.input.value;
          this.focusIn('[data-dur-minute]:checked, [data-dur-minute]');
        });
      });
      this.popover.querySelectorAll('[data-dur-minute]').forEach((radio) => {
        radio.addEventListener('click', () => {
          const c = this.context();
          const dur = this.value == null ? 60 : ((this.value - c.start + DAY) % DAY) || DAY;
          this.setValue((c.start + Math.floor(dur / 60) * 60 + +radio.dataset.durMinute) % DAY);
          this.lastCommitted = this.input.value;
          this.hide();
          this.input.focus();
        });
      });
      // Roving tabindex: one tab stop per group.
      ['.tp-grid, .tp-durations', '.tp-minutes'].forEach((sel) => {
        const group = this.popover.querySelector(sel);
        if (!group) return;
        const items = [...group.querySelectorAll('button:not(:disabled), input:not(:disabled)')];
        const active = items.find((el) => el.classList.contains('is-selected') || el.checked) || items[0];
        if (active) active.tabIndex = 0;
      });
    }

    // After the start time is picked, move on to the end time.
    advance() {
      if (this.role !== 'start') return;
      const next = document.querySelector('[data-time-picker="end"]');
      if (next) next.focus();
    }

    focusIn(selector) {
      const el = this.popover.querySelector(selector);
      if (el) el.focus();
    }

    // Selectors in priority order; a single comma list would match in DOM order.
    focusSelected() {
      const el = ['.is-selected', '.tp-hour:not(:disabled)', '.tp-duration']
        .map((s) => this.popover.querySelector(s))
        .find(Boolean);
      if (el) el.focus();
    }

    onInputKey(e) {
      if (e.key === 'ArrowDown' || (e.altKey && e.key === 'ArrowDown')) {
        e.preventDefault();
        this.show();
        if (this.mode !== 'list') this.focusSelected();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.commitTyped();
        this.hide();
        this.advance();
      } else if (e.key === 'Escape') {
        this.hide();
      }
    }

    onPopoverKey(e) {
      const target = e.target;
      if (e.key === 'Escape') {
        e.preventDefault();
        this.hide();
        this.input.focus();
        return;
      }
      const group = target.closest('.tp-grid, .tp-durations, .tp-minutes');
      if (!group || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        if (e.key === 'Enter' && target.matches('input[type="radio"]')) {
          e.preventDefault();
          target.click();
        }
        return;
      }
      e.preventDefault();
      const items = [...group.querySelectorAll('button:not(:disabled), input:not(:disabled)')];
      const cols = group.classList.contains('tp-grid') ? 6 : group.classList.contains('tp-durations') ? 4 : items.length;
      let i = items.indexOf(target);
      if (e.key === 'ArrowLeft') i -= 1;
      if (e.key === 'ArrowRight') i += 1;
      if (e.key === 'ArrowUp') i -= cols;
      if (e.key === 'ArrowDown') i += cols;
      const next = items[Math.max(0, Math.min(items.length - 1, i))];
      items.forEach((el) => { el.tabIndex = -1; });
      next.tabIndex = 0;
      next.focus();
    }
  }

  window.HlidackyTimePicker = { TimePicker, parse, format, formatDuration, isTouch, DAY };
})();
