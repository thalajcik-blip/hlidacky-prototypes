(function () {
  // States: idle → generating (→ slow) → done | stuck, plus stopped.
  // The text streams into the field the user will edit, never into a
  // separate preview. A request either delivers its text or fails before
  // the first word, so a stuck draft has nothing to keep: the field goes
  // back to what the user had written before pressing the button. Undo
  // does the same after a finished or stopped draft.
  const SAMPLE = 'I graduated from The School of Education in the field of Pre-school and After-school Pedagogy. I’ve been babysitting for more than 5 years. I started with taking care of my younger sibling and currently I work as a school teacher.\n\n'
    + 'With little ones I like to be outside: playgrounds, short trips into nature and, when it rains, crafts or building with Lego. I make up bedtime stories and I am happy to help older kids with homework.';
  const WORDS = SAMPLE.match(/\S+\s*/g);
  const PREVIEW_PARTIAL = WORDS.slice(0, Math.floor(WORDS.length * 0.35)).join('');
  const MIN_CHARACTERS = 150;
  const FIRST_WORD_MS = 700;
  const SLOW_AFTER_MS = 3500;
  const STUCK_AFTER_MS = 8000;
  // Lets the last words finish settling before the field hands over.
  const SETTLE_MS = 420;

  const root = document.querySelector('[data-ai-input]');
  const textarea = root.querySelector('textarea');
  const ink = root.querySelector('.ai-input__ink');
  const counter = root.querySelector('[data-counter]');
  const status = root.querySelector('.ai-input__status');
  const actions = root.querySelector('.ai-input__actions');
  const previewButtons = document.querySelectorAll('[data-preview]');

  let state = 'idle';
  let before = '';
  let lastStalled = false;
  let timers = [];
  let renderedActions = '';
  let renderedStatus = '';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function animate(element, keyframes, options) {
    if (!element || reducedMotion.matches || !element.animate) return;
    element.animate(keyframes, options);
  }
  const ENTER = [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }];
  const EASE_OUT = 'cubic-bezier(.2, .8, .2, 1)';

  const isBusy = () => state === 'generating' || state === 'slow';

  function clearTimers() {
    timers.forEach(window.clearTimeout);
    timers = [];
  }

  function schedule(callback, delay) {
    timers.push(window.setTimeout(callback, delay));
  }

  // 150 is the minimum, so the target only shows until it is met;
  // "432 of 150" would read like an overflow.
  function count() {
    const length = textarea.value.length;
    counter.textContent = length < MIN_CHARACTERS ? `${length} of ${MIN_CHARACTERS} characters` : `${length} characters`;
  }

  const button = (action, icon, label, modifier) =>
    `<button class="ai-input__button${modifier ? ' ai-input__button--' + modifier : ''}" type="button" data-action="${action}"><i class="${icon}" aria-hidden="true"></i>${label}</button>`;

  const SPINNER = '<i class="fa-regular fa-spinner fa-spin" aria-hidden="true"></i>';
  const STATUS = {
    generating: ['busy', SPINNER, 'Writing your text from your answers…'],
    slow: ['busy', SPINNER, 'Still writing. It takes longer than usual…'],
    stuck: ['error', '<i class="fa-regular fa-triangle-exclamation" aria-hidden="true"></i>', 'Writing got stuck. Sorry for the inconvenience.'],
    done: ['done', '<i class="fa-regular fa-check" aria-hidden="true"></i>', 'Done. You can change anything you want.'],
  };

  function actionsFor(next) {
    if (next === 'generating' || next === 'slow') return button('stop', 'fa-solid fa-stop', 'Stop writing', 'stop');
    if (next === 'stuck') return button('generate', 'fa-regular fa-rotate-right', 'Try again');
    if (next === 'done' || next === 'stopped') {
      return '<div class="ai-input__row">' + button('generate', 'fa-regular fa-sparkles', 'Write again')
        + '<button class="ai-input__link" type="button" data-action="undo"><i class="fa-regular fa-rotate-right" aria-hidden="true"></i><span>Undo</span></button></div>';
    }
    return button('generate', 'fa-regular fa-sparkles', 'Write it with AI')
      + '<p class="ai-input__caption">We draft it from your answers in the previous steps. You can edit everything.</p>';
  }

  function setState(next) {
    state = next;
    const busy = isBusy();
    root.dataset.state = next;
    root.classList.toggle('is-busy', busy);
    textarea.readOnly = busy;
    textarea.setAttribute('aria-busy', String(busy));

    const message = STATUS[next];
    const statusMarkup = message ? message[1] + '<span>' + message[2] + '</span>' : '';
    if (statusMarkup !== renderedStatus) {
      const first = !renderedStatus && !renderedActions;
      status.className = 'ai-input__status' + (message ? ' ai-input__status--' + message[0] : '');
      status.innerHTML = statusMarkup;
      renderedStatus = statusMarkup;
      if (message && !first) {
        animate(status, ENTER, { duration: 260, easing: EASE_OUT });
        const icon = status.querySelector('i');
        if (next === 'done') {
          animate(icon, [{ transform: 'scale(.4)', opacity: 0 }, { transform: 'scale(1.25)', opacity: 1, offset: .6 }, { transform: 'scale(1)' }], { duration: 420, delay: 80, easing: EASE_OUT, fill: 'backwards' });
        } else if (next === 'stuck') {
          animate(icon, [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(1px)' }, { transform: 'translateX(0)' }], { duration: 420, delay: 120, easing: 'ease-in-out' });
        }
      }
    }

    // Generating → slow keeps the same Stop button; rebuilding it would
    // drop focus to the page.
    const markup = actionsFor(next);
    if (markup !== renderedActions) {
      const first = !renderedActions;
      actions.innerHTML = markup;
      renderedActions = markup;
      if (!first) animate(actions, ENTER, { duration: 220, easing: EASE_OUT });
    }
    count();
  }

  // The ink layer draws the streamed words over the read-only field so
  // each one can settle in; the textarea underneath keeps the real value.
  function resetInk(text, still) {
    ink.classList.toggle('is-still', Boolean(still));
    ink.textContent = '';
    if (text) addInk(text);
  }

  function addInk(word) {
    const span = document.createElement('span');
    span.textContent = word;
    ink.appendChild(span);
    ink.scrollTop = ink.scrollHeight;
  }

  function focusField() {
    textarea.focus({ preventScroll: true });
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }

  function generate() {
    clearTimers();
    // A failure leads back to whatever was in the field when the button
    // was pressed — the user's own text or the previous draft.
    before = textarea.value;
    const scenario = document.querySelector('[name="scenario"]:checked').value;
    const willStall = scenario === 'stuck' && !lastStalled;
    lastStalled = willStall;
    let index = 0;

    textarea.value = '';
    resetInk('');
    setState('generating');
    const stop = root.querySelector('[data-action="stop"]');
    if (stop) stop.focus({ preventScroll: true });

    if (willStall) {
      schedule(() => setState('slow'), SLOW_AFTER_MS);
      schedule(() => {
        clearTimers();
        textarea.value = before;
        setState('stuck');
        focusField();
      }, STUCK_AFTER_MS);
      return;
    }

    function tick() {
      if (index >= WORDS.length) {
        schedule(() => {
          setState('done');
          focusField();
        }, reducedMotion.matches ? 0 : SETTLE_MS);
        return;
      }
      textarea.value += WORDS[index];
      addInk(WORDS[index]);
      index += 1;
      textarea.scrollTop = textarea.scrollHeight;
      count();
      schedule(tick, 28 + Math.random() * 55);
    }
    // The first words take a moment, as a real model's would.
    schedule(tick, FIRST_WORD_MS);
  }

  function handle(action) {
    if (action === 'generate') {
      generate();
    } else if (action === 'stop') {
      clearTimers();
      if (!textarea.value) textarea.value = before;
      setState(textarea.value && textarea.value !== before ? 'stopped' : 'idle');
      focusField();
    } else if (action === 'undo') {
      textarea.value = before;
      setState('idle');
      focusField();
    }
    markPreview(null);
  }

  // Jumped-to states are snapshots for review: no timers run, only the
  // tint and the spinner move.
  function preview(next) {
    clearTimers();
    lastStalled = false;
    before = '';
    textarea.value = next === 'done' ? SAMPLE : (next === 'generating' || next === 'slow' ? PREVIEW_PARTIAL : '');
    resetInk(textarea.value, true);
    setState(next);
    textarea.scrollTop = 0;
    if (next === 'done' || next === 'stuck') focusField();
    markPreview(next);
  }

  function markPreview(current) {
    previewButtons.forEach((item) => {
      const on = item.dataset.preview === current;
      item.classList.toggle('is-current', on);
      item.setAttribute('aria-pressed', String(on));
    });
  }

  root.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (target) handle(target.dataset.action);
  });
  textarea.addEventListener('input', count);
  previewButtons.forEach((item) => {
    item.addEventListener('click', () => preview(item.dataset.preview));
  });

  setState('idle');
  markPreview('idle');
})();
