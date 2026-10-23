(function () {
  // The AI field from /components/input-content-ai-generation/, with three
  // quick questions asked before the draft is written. The answers shape
  // the text. Two versions share this file:
  //   sheet   – version 01: the questions open in a bottom sheet;
  //   section – version 02: they open one at a time in a card under the
  //             field, and the step header folds into a compact bar.
  const VERSION = document.body.dataset.version;
  const IS_SHEET = VERSION === 'sheet';

  const MAX_PICKS = 2;
  const QUESTIONS = [
    {
      id: 'where',
      title: 'Where did you look after kids?',
      options: [
        ['teaching', 'Teaching assistant'],
        ['babysitting', 'Babysitting'],
        ['kindergarten', 'Kindergarten'],
        ['own', 'Own Kids'],
        ['camps', 'Camps, scouts'],
        ['other', 'Something else'],
      ],
    },
    {
      id: 'help',
      title: 'What can you help families with?',
      options: [
        ['baby', 'Baby, toddler'],
        ['overnight', 'Overnight'],
        ['holidays', 'Holidays'],
        ['special', 'Special needs'],
        ['lastminute', 'Last minute'],
      ],
    },
    {
      id: 'afternoon',
      title: 'Describe your afternoon with kids.',
      options: [
        ['routine', 'Your routine'],
        ['pickup', 'School pickup'],
        ['homework', 'Homework'],
        ['games', 'Games'],
        ['outdoors', 'Outdoors'],
      ],
    },
  ];
  // Used by "Jump to a state", so every snapshot has answers behind it.
  const PRESET = { where: ['teaching', 'kindergarten'], help: ['baby', 'lastminute'], afternoon: ['homework', 'outdoors'] };

  // Used when every question is skipped: the draft then comes only from
  // the previous steps of the profile, as in the original component.
  const FALLBACK = 'I graduated from The School of Education in the field of Pre-school and After-school Pedagogy. I’ve been babysitting for more than 5 years. I started with taking care of my younger sibling and currently I work as a school teacher.\n\n'
    + 'With little ones I like to be outside: playgrounds, short trips into nature and, when it rains, crafts or building with Lego. I make up bedtime stories and I am happy to help older kids with homework.';

  const MIN_CHARACTERS = 150;
  const FIRST_WORD_MS = 700;
  const SLOW_AFTER_MS = 3500;
  const STUCK_AFTER_MS = 8000;
  const SETTLE_MS = 420;

  const setup = document.querySelector('.setup');
  const root = document.querySelector('[data-ai-input]');
  const textarea = root.querySelector('textarea');
  const ink = root.querySelector('.ai-input__ink');
  const counter = root.querySelector('[data-counter]');
  const status = root.querySelector('.ai-input__status');
  const actions = root.querySelector('.ai-input__actions');
  const summary = root.querySelector('.ai-summary');
  const summaryText = root.querySelector('.ai-summary__text');
  const questionSlot = root.querySelector('.ai-input__questions');
  const sheetLayer = document.querySelector('.sheet-layer');
  const previewButtons = document.querySelectorAll('[data-preview]');
  const PLACEHOLDER = textarea.placeholder;

  let state = 'idle';
  let asking = false;
  let step = 0;
  let before = '';
  let lastStalled = false;
  let variant = 0;
  let timers = [];
  let renderedActions = '';
  let renderedStatus = '';
  let returnFocus = null;
  const answers = { where: [], help: [], afternoon: [] };
  let otherText = '';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function animate(element, keyframes, options) {
    if (!element || reducedMotion.matches || !element.animate) return;
    element.animate(keyframes, options);
  }
  const ENTER = [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }];
  const EASE_OUT = 'cubic-bezier(.2, .8, .2, 1)';

  const isBusy = () => state === 'generating' || state === 'slow';
  const escapeHtml = (text) => text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);
  const hasAnswers = () => QUESTIONS.some((q) => answers[q.id].length);

  function clearTimers() {
    timers.forEach(window.clearTimeout);
    timers = [];
  }

  function schedule(callback, delay) {
    timers.push(window.setTimeout(callback, delay));
  }

  // ---------- the text the answers produce ----------

  const WHERE = {
    teaching: 'I work as a teaching assistant',
    babysitting: 'I’ve been babysitting for more than 5 years',
    kindergarten: 'I’ve worked at a kindergarten',
    own: 'I’ve raised kids of my own',
    camps: 'I’ve led summer camps and scout groups',
  };
  const HELP = {
    overnight: 'I’m happy to stay overnight when you need it.',
    holidays: 'I can also help during school holidays.',
    special: 'I have experience with children with special needs.',
    lastminute: 'If you need someone at short notice, just message me.',
  };
  const AFTERNOON = {
    routine: 'we keep to your family’s routine',
    pickup: 'I pick the kids up from school',
    homework: 'we do homework first',
    games: 'we play board games',
    outdoors: 'we head outside',
  };
  const CLOSINGS = {
    outdoors: ['And if it rains, we build a fort out of whatever we find.', 'Rain or shine, we always find something to explore.'],
    games: ['Card games and Lego are our favourites.', 'Somehow I always lose at Uno.'],
    any: ['Kids usually ask when I’m coming back.', 'I’m calm, patient and always on time.'],
  };

  // The second experience reads "I've also…" / "I also work…".
  const withAlso = (phrase) => phrase.replace(/^I’ve /, 'I’ve also ').replace(/^I work /, 'I also work ').replace(/^I have /, 'I also have ');

  function compose() {
    if (!hasAnswers()) return FALLBACK;

    const experience = answers.where.map((id) => (id === 'other'
      ? (otherText.trim() ? 'I have experience with ' + lowerFirst(otherText.trim()) : '')
      : WHERE[id])).filter(Boolean);
    let first = experience.length
      ? experience[0] + (experience[1] ? ' and ' + withAlso(experience[1]) : '')
      : 'I’ve been looking after children for several years';
    first += ', so I’m used to kids of different ages';
    first += answers.help.includes('baby') ? ' – babies and toddlers included.' : '.';
    const help = answers.help.filter((id) => id !== 'baby').map((id) => HELP[id]);

    let afternoon;
    if (answers.afternoon.length) {
      const parts = answers.afternoon.map((id) => AFTERNOON[id]);
      const key = answers.afternoon.includes('outdoors') ? 'outdoors' : answers.afternoon.includes('games') ? 'games' : 'any';
      afternoon = 'On a usual afternoon ' + parts.join(' and then ') + '. ' + CLOSINGS[key][variant % 2];
    } else {
      afternoon = 'With little ones I like to be outside, play games and read bedtime stories. ' + CLOSINGS.any[variant % 2];
    }
    return [first].concat(help).join(' ') + '\n\n' + afternoon;
  }

  function summaryLabels() {
    return QUESTIONS.flatMap((q) => answers[q.id].map((id) => {
      if (id === 'other') return otherText.trim();
      return q.options.find((o) => o[0] === id)[1];
    })).filter(Boolean);
  }

  // ---------- the field ----------

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
    done: ['done', '<i class="fa-regular fa-check" aria-hidden="true"></i>', 'Done. It’s your text now – change anything you want.'],
  };

  function actionsFor(next) {
    if (next === 'generating' || next === 'slow') return button('stop', 'fa-solid fa-stop', 'Stop writing', 'stop');
    if (next === 'stuck') return button('write', 'fa-regular fa-rotate-right', 'Try again');
    if (next === 'done' || next === 'stopped') {
      return '<div class="ai-input__row">' + button('write', 'fa-regular fa-sparkles', 'Write again')
        + '<button class="ai-input__link" type="button" data-action="undo"><i class="fa-regular fa-rotate-left" aria-hidden="true"></i><span>Undo</span></button></div>';
    }
    return button('ask', 'fa-regular fa-sparkles', 'Write it with AI')
      + '<p class="ai-input__caption">Answer 3 quick questions and we’ll draft it. You can edit everything.</p>';
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

    const markup = actionsFor(next);
    if (markup !== renderedActions) {
      const first = !renderedActions;
      actions.innerHTML = markup;
      renderedActions = markup;
      if (!first) animate(actions, ENTER, { duration: 220, easing: EASE_OUT });
    }
    renderLayout();
    count();
  }

  // Everything that depends on both the field state and the questions.
  function renderLayout() {
    const inline = !IS_SHEET && asking;
    actions.hidden = inline;
    status.hidden = inline;
    textarea.placeholder = asking ? 'Your text will appear here.' : PLACEHOLDER;

    // The summary shows once a draft has been asked for from real answers.
    const labels = summaryLabels();
    const showSummary = !asking && state !== 'idle' && labels.length > 0;
    summaryText.textContent = labels.join(' · ');
    summary.classList.toggle('is-shown', showSummary);
    const edit = summary.querySelector('[data-action="edit"]');
    if (edit) edit.disabled = isBusy();

    // Version 02 folds the header while the questions are open and keeps
    // it folded while there is a draft to look at.
    if (!IS_SHEET) setup.classList.toggle('is-compact', asking || state !== 'idle');
  }

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

  function generate(keepBefore) {
    clearTimers();
    // A failure or Undo leads back to whatever was in the field when the
    // draft was asked for. "Try again" keeps that same starting point.
    if (!keepBefore) before = textarea.value;
    const words = compose().match(/\S+\s*/g);
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
      if (index >= words.length) {
        schedule(() => {
          setState('done');
          focusField();
        }, reducedMotion.matches ? 0 : SETTLE_MS);
        return;
      }
      textarea.value += words[index];
      addInk(words[index]);
      index += 1;
      textarea.scrollTop = textarea.scrollHeight;
      count();
      schedule(tick, 28 + Math.random() * 55);
    }
    schedule(tick, FIRST_WORD_MS);
  }

  // ---------- questions ----------

  function chipsMarkup(q) {
    const chips = q.options.map(([id, label]) =>
      `<button class="chip" type="button" data-q="${q.id}" data-o="${id}" aria-pressed="false">${label}</button>`).join('');
    const other = q.options.some((o) => o[0] === 'other')
      ? `<input class="q-other" type="text" data-other maxlength="60" placeholder="Where else? E.g. tutoring" aria-label="Where else did you look after kids?">`
      : '';
    return `<div class="chips" role="group" aria-label="${escapeHtml(q.title)}">${chips}</div>${other}`;
  }

  function syncChips(scope) {
    scope.querySelectorAll('.chip').forEach((chip) => {
      const picked = answers[chip.dataset.q];
      const on = picked.includes(chip.dataset.o);
      const blocked = !on && picked.length >= MAX_PICKS;
      chip.setAttribute('aria-pressed', String(on));
      chip.classList.toggle('is-blocked', blocked);
      if (blocked) chip.setAttribute('aria-disabled', 'true');
      else chip.removeAttribute('aria-disabled');
    });
    scope.querySelectorAll('[data-count]').forEach((item) => {
      const n = answers[item.dataset.count].length;
      item.textContent = `${n} of ${MAX_PICKS}`;
      item.classList.toggle('is-full', n >= MAX_PICKS);
    });
    scope.querySelectorAll('[data-other]').forEach((input) => {
      const shown = answers.where.includes('other');
      const wasShown = input.classList.contains('is-shown');
      input.classList.toggle('is-shown', shown);
      if (document.activeElement !== input) input.value = otherText;
      if (shown && !wasShown && input.dataset.focusNext) input.focus({ preventScroll: false });
      delete input.dataset.focusNext;
    });
  }

  function toggleChip(chip) {
    if (chip.classList.contains('is-blocked')) {
      animate(chip, [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 260 });
      return;
    }
    const picked = answers[chip.dataset.q];
    const id = chip.dataset.o;
    const index = picked.indexOf(id);
    if (index >= 0) picked.splice(index, 1);
    else {
      picked.push(id);
      animate(chip, [{ transform: 'scale(.92)' }, { transform: 'scale(1.06)', offset: .6 }, { transform: 'scale(1)' }], { duration: 260, easing: EASE_OUT });
    }
    const scope = chip.closest('[data-questions]');
    const other = scope.querySelector('[data-other]');
    if (id === 'other' && index < 0 && other) other.dataset.focusNext = '1';
    syncChips(scope);
  }

  // ----- version 01: bottom sheet -----

  function buildSheet() {
    const questions = QUESTIONS.map((q) => `
      <div class="q">
        <div class="q__head"><h4 class="q__title">${q.title}</h4><span class="q__count" data-count="${q.id}"></span></div>
        ${chipsMarkup(q)}
      </div>`).join('');
    sheetLayer.querySelector('.sheet__questions').innerHTML = questions;
  }

  function openSheet() {
    returnFocus = document.activeElement;
    asking = true;
    syncChips(sheetLayer);
    sheetLayer.classList.add('is-open');
    sheetLayer.setAttribute('aria-hidden', 'false');
    sheetLayer.querySelector('.sheet').style.transform = '';
    sheetLayer.querySelector('.sheet__body').scrollTop = 0;
    renderLayout();
    window.setTimeout(() => {
      const firstChip = sheetLayer.querySelector('.chip');
      if (firstChip) firstChip.focus({ preventScroll: true });
    }, reducedMotion.matches ? 0 : 60);
  }

  function closeSheet(restoreFocus) {
    asking = false;
    sheetLayer.classList.remove('is-open');
    sheetLayer.setAttribute('aria-hidden', 'true');
    sheetLayer.querySelector('.sheet').style.transform = '';
    renderLayout();
    if (restoreFocus && returnFocus && document.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
  }

  function setupSheetDrag() {
    const sheet = sheetLayer.querySelector('.sheet');
    const handle = sheetLayer.querySelector('.sheet__handle');
    let startY = 0;
    let startTime = 0;
    let offset = 0;
    let dragging = false;

    handle.addEventListener('pointerdown', (event) => {
      dragging = true;
      startY = event.clientY;
      startTime = performance.now();
      offset = 0;
      sheet.classList.add('is-dragging');
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      offset = Math.max(0, event.clientY - startY);
      sheet.style.transform = `translateY(${offset}px)`;
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      sheet.classList.remove('is-dragging');
      const velocity = offset / Math.max(1, performance.now() - startTime);
      if (offset > sheet.offsetHeight * 0.3 || (offset > 30 && velocity > 0.5)) closeSheet(true);
      else sheet.style.transform = '';
    };
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  }

  // ----- version 02: dynamic section -----

  function renderCard(direction) {
    const q = QUESTIONS[step];
    const last = step === QUESTIONS.length - 1;
    const primary = last
      ? '<button class="ai-input__button ai-input__button--primary" type="button" data-action="write-answers"><i class="fa-regular fa-sparkles" aria-hidden="true"></i>Write my text</button>'
      : '<button class="ai-input__button ai-input__button--trail" type="button" data-action="next-question">Next question<i class="fa-regular fa-angle-right" aria-hidden="true"></i></button>';
    const card = questionSlot.querySelector('.qcard');
    const body = `
      <div class="qcard__body" data-questions>
        <div class="qcard__question">
          <h3 class="qcard__title" id="qcardTitle">${q.title}</h3>
          <p class="qcard__hint">Pick up to ${MAX_PICKS} – or skip</p>
        </div>
        ${chipsMarkup(q)}
      </div>`;
    const html = `
      <div class="qcard__top">
        <i class="fa-regular fa-sparkles" aria-hidden="true"></i>
        <span class="qcard__step">Question ${step + 1}/${QUESTIONS.length}</span>
        <button class="qcard__close" type="button" data-action="close-questions" aria-label="Close questions"><i class="fa-light fa-xmark" aria-hidden="true"></i></button>
      </div>
      ${body}
      <div class="qcard__foot">
        ${primary}
        <button class="text-link" type="button" data-action="skip-question">Skip</button>
      </div>`;
    if (card) {
      card.innerHTML = html;
    } else {
      questionSlot.innerHTML = `<section class="qcard" aria-labelledby="qcardTitle">${html}</section>`;
    }
    const newBody = questionSlot.querySelector('.qcard__body');
    if (direction) newBody.classList.add(direction < 0 ? 'is-entering-back' : 'is-entering');
    syncChips(questionSlot);
  }

  function openCard(at) {
    asking = true;
    step = at || 0;
    renderCard(0);
    renderLayout();
    const firstChip = questionSlot.querySelector('.chip');
    if (firstChip) firstChip.focus({ preventScroll: true });
  }

  function closeCard() {
    asking = false;
    questionSlot.innerHTML = '';
    renderLayout();
  }

  function advance() {
    if (step < QUESTIONS.length - 1) {
      step += 1;
      renderCard(1);
      const firstChip = questionSlot.querySelector('.chip');
      if (firstChip) firstChip.focus({ preventScroll: true });
    } else {
      startFromAnswers();
    }
  }

  // ---------- actions ----------

  function openQuestions(at) {
    if (IS_SHEET) openSheet();
    else openCard(at);
  }

  function closeQuestions(restoreFocus) {
    if (IS_SHEET) closeSheet(restoreFocus);
    else {
      closeCard();
      if (restoreFocus) {
        const target = root.querySelector('[data-action="ask"], [data-action="write"]');
        if (target) target.focus({ preventScroll: true });
      }
    }
  }

  function startFromAnswers() {
    if (IS_SHEET) closeSheet(false);
    else closeCard();
    variant = 0;
    generate();
  }

  function handle(action) {
    if (action === 'ask' || action === 'edit') {
      if (!isBusy()) openQuestions(0);
    } else if (action === 'write') {
      // Write again picks another wording; Try again repeats the last one.
      if (state !== 'stuck') variant += 1;
      generate(state === 'stuck');
    } else if (action === 'write-answers') {
      startFromAnswers();
    } else if (action === 'skip-all') {
      QUESTIONS.forEach((q) => { answers[q.id] = []; });
      startFromAnswers();
    } else if (action === 'next-question') {
      advance();
    } else if (action === 'skip-question') {
      answers[QUESTIONS[step].id] = [];
      advance();
    } else if (action === 'close-questions') {
      closeQuestions(true);
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

  // Jumped-to states are snapshots for review: no timers run.
  function preview(next) {
    clearTimers();
    lastStalled = false;
    before = '';
    variant = 0;
    if (IS_SHEET && asking) closeSheet(false);
    if (!IS_SHEET && asking) closeCard();
    QUESTIONS.forEach((q) => { answers[q.id] = next === 'idle' ? [] : PRESET[q.id].slice(); });
    otherText = '';
    const full = compose();
    const partialWords = full.match(/\S+\s*/g);
    textarea.value = next === 'done' ? full
      : (next === 'generating' || next === 'slow') ? partialWords.slice(0, Math.floor(partialWords.length * 0.35)).join('')
        : '';
    resetInk(textarea.value, true);
    setState(next === 'questions' ? 'idle' : next);
    textarea.scrollTop = 0;
    if (next === 'questions') {
      QUESTIONS.forEach((q) => { answers[q.id] = []; });
      answers.where = ['teaching'];
      openQuestions(0);
    }
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

  // ---------- wiring ----------

  document.querySelector('.phone__screen').addEventListener('click', (event) => {
    const chip = event.target.closest('.chip');
    if (chip) {
      toggleChip(chip);
      return;
    }
    const target = event.target.closest('[data-action]');
    if (target && !target.disabled) handle(target.dataset.action);
  });
  document.querySelector('.phone__screen').addEventListener('input', (event) => {
    if (event.target.matches('[data-other]')) otherText = event.target.value;
  });
  textarea.addEventListener('input', count);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && asking) closeQuestions(true);
  });
  previewButtons.forEach((item) => {
    item.addEventListener('click', () => preview(item.dataset.preview));
  });

  if (IS_SHEET) {
    buildSheet();
    setupSheetDrag();
    sheetLayer.querySelector('.sheet-layer__overlay').addEventListener('click', () => closeSheet(true));
  }

  setState('idle');
  markPreview('idle');
})();
