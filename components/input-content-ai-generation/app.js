(function () {
  // States: idle → generating (→ slow) → done | stopped | stuck.
  // The text streams into the field the user will edit, never into a
  // separate preview, and nothing the user wrote is lost: Undo brings back
  // what was there before the first draft, and a stuck draft keeps whatever
  // made it through.
  const SAMPLE = 'For three years I have led a scout troop, so ten kids in the woods do not faze me. I study education at Charles University and I grew up looking after my two younger brothers.\n\n'
    + 'With little ones I like to be outside: playgrounds, short trips into nature and, when it rains, crafts or building with Lego. I make up bedtime stories and I am happy to help older kids with homework.\n\n'
    + 'I have a first aid course and I am comfortable picking children up from school or kindergarten. I am looking for a family I can help for a long time.';
  const WORDS = SAMPLE.match(/\S+\s*/g);
  const STALL_AT = Math.floor(WORDS.length * 0.4);
  const FIRST_WORD_MS = 700;
  const SLOW_AFTER_MS = 3500;
  const STUCK_AFTER_MS = 8000;

  const root = document.querySelector('[data-ai-input]');
  const textarea = root.querySelector('textarea');
  const status = root.querySelector('.ai-input__status');
  const alert = root.querySelector('.ai-input__alert');
  const actions = root.querySelector('.ai-input__actions');
  const scroller = document.querySelector('[data-scroller]');
  const footerButtons = document.querySelectorAll('.setup__footer button');
  const previewButtons = document.querySelectorAll('[data-preview]');

  let state = 'idle';
  let before = '';
  let lastStalled = false;
  let timers = [];
  let renderedActions = '';

  const isBusy = () => state === 'generating' || state === 'slow';

  function clearTimers() {
    timers.forEach(window.clearTimeout);
    timers = [];
  }

  function schedule(callback, delay) {
    timers.push(window.setTimeout(callback, delay));
  }

  function fit() {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(Math.max(textarea.scrollHeight + 2, 116), 480) + 'px';
  }

  // As the draft grows it pushes the status and Stop below the footer.
  // Follow the writing so both stay on screen.
  function keepInView() {
    const overflow = actions.getBoundingClientRect().bottom + 16 - scroller.getBoundingClientRect().bottom;
    if (overflow > 0) scroller.scrollTop += overflow;
  }

  const DOTS = '<span class="ai-input__dots" aria-hidden="true"><span></span><span></span><span></span></span>';
  const aiButton = (action, icon, label, modifier) =>
    `<button class="ai-input__button${modifier ? ' ai-input__button--' + modifier : ''}" type="button" data-action="${action}"><i class="${icon}" aria-hidden="true"></i>${label}</button>`;
  const textButton = (action, label) =>
    `<button class="ai-input__text-button" type="button" data-action="${action}">${label}</button>`;

  const STATUS = {
    generating: DOTS + '<span>Writing your text from your answers…</span>',
    slow: DOTS + '<span>Still writing. This is taking longer than usual.</span>',
    done: '<i class="fa-regular fa-check" aria-hidden="true"></i><span>Done. Read it through and change anything that does not sound like you.</span>',
    stopped: '<i class="fa-regular fa-circle-pause" aria-hidden="true"></i><span>Stopped. Edit the text, or generate it again.</span>',
  };

  function actionsFor(next) {
    if (next === 'generating' || next === 'slow') return aiButton('stop', 'fa-solid fa-stop', 'Stop', 'stop');
    if (next === 'stuck') return aiButton('generate', 'fa-regular fa-arrow-rotate-right', 'Try again') + textButton('manual', 'Write it myself');
    if (next === 'done' || next === 'stopped') return aiButton('generate', 'fa-regular fa-arrow-rotate-right', 'Generate again') + textButton('undo', 'Undo');
    return aiButton('generate', 'fa-regular fa-sparkles', 'Write it with AI')
      + '<p class="ai-input__caption">We draft it from your answers in the previous steps. You can edit everything.</p>';
  }

  function setState(next) {
    state = next;
    const busy = isBusy();
    root.dataset.state = next;
    root.classList.toggle('is-busy', busy);
    textarea.readOnly = busy;
    textarea.setAttribute('aria-busy', String(busy));
    footerButtons.forEach((button) => { button.disabled = busy; });
    // Re-measure on every state change too: a height taken while the page
    // was still settling would otherwise stick until the next word.
    fit();

    status.innerHTML = STATUS[next] || '';
    alert.hidden = next !== 'stuck';
    alert.innerHTML = next === 'stuck'
      ? '<i class="fa-regular fa-triangle-exclamation" aria-hidden="true"></i><div><strong>Writing got stuck</strong><p>'
        + (textarea.value
          ? 'We kept what was written so far. Try again, or finish the text yourself.'
          : 'Nothing was written this time. Try again, or write the text yourself.')
        + '</p></div>'
      : '';
    // Generating → slow keeps the same Stop button; rebuilding it would
    // drop focus to the page.
    const markup = actionsFor(next);
    if (markup !== renderedActions) {
      actions.innerHTML = markup;
      renderedActions = markup;
    }
  }

  function focus(selector) {
    const target = selector ? root.querySelector(selector) : textarea;
    if (target) target.focus({ preventScroll: true });
  }

  function generate() {
    clearTimers();
    // A retry or a second draft replaces AI text; Undo should still lead
    // back to what the user had written themselves.
    if (state === 'idle') before = textarea.value;
    const scenario = document.querySelector('[name="scenario"]:checked').value;
    const willStall = scenario === 'stuck' && !lastStalled;
    lastStalled = willStall;
    let index = 0;

    textarea.value = '';
    setState('generating');
    focus('[data-action="stop"]');

    function tick() {
      if (willStall && index === STALL_AT) {
        schedule(() => setState('slow'), SLOW_AFTER_MS);
        schedule(() => {
          clearTimers();
          setState('stuck');
          keepInView();
          focus('[data-action="generate"]');
        }, STUCK_AFTER_MS);
        return;
      }
      if (index >= WORDS.length) {
        setState('done');
        keepInView();
        focus();
        return;
      }
      textarea.value += WORDS[index];
      index += 1;
      fit();
      textarea.scrollTop = textarea.scrollHeight;
      keepInView();
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
      setState(textarea.value ? 'stopped' : 'idle');
      focus();
    } else if (action === 'undo') {
      textarea.value = before;
      setState('idle');
      focus();
    } else if (action === 'manual') {
      setState('idle');
      focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
    markPreview(null);
  }

  // Jumped-to states are snapshots for review: no timers run, only the
  // CSS ring and dots move.
  function preview(next) {
    clearTimers();
    lastStalled = false;
    before = '';
    const partial = WORDS.slice(0, STALL_AT).join('');
    textarea.value = next === 'idle' ? '' : (next === 'done' ? SAMPLE : partial);
    setState(next);
    scroller.scrollTop = 0;
    keepInView();
    markPreview(next);
  }

  function markPreview(current) {
    previewButtons.forEach((button) => {
      const on = button.dataset.preview === current;
      button.classList.toggle('is-current', on);
      button.setAttribute('aria-pressed', String(on));
    });
  }

  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (button) handle(button.dataset.action);
  });
  textarea.addEventListener('input', fit);
  previewButtons.forEach((button) => {
    button.addEventListener('click', () => preview(button.dataset.preview));
  });

  setState('idle');
  markPreview('idle');
})();
