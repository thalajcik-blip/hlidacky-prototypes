(function() {
  var LANGS = ['CZ', 'EN', 'SK', 'HU', 'AT', 'HR'];
  var state = {
    detail: null
  };

  function resolveScript() {
    if (document.currentScript) return document.currentScript;
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1] || null;
  }

  function detectPrototype(script) {
    var explicit = script && script.getAttribute('data-prototype');
    var path = window.location.pathname || '/';

    if (explicit) return explicit;
    if (path.indexOf('/jobs/jobs-for-sitters-v2') === 0) return 'sitters-v2';
    if (path.indexOf('/jobs/jobs-for-sitters') === 0) return 'sitters';
    if (path.indexOf('/jobs-for-families') === 0) return 'jobs';
    return '';
  }

  function detectLanguage() {
    var segments = (window.location.pathname || '/').split('/').filter(Boolean);
    for (var i = segments.length - 1; i >= 0; i -= 1) {
      var candidate = String(segments[i] || '').toUpperCase();
      if (LANGS.indexOf(candidate) !== -1) return candidate;
    }
    return 'CZ';
  }

  function deepMerge(base, override) {
    var result = Object.assign({}, base || {});
    Object.keys(override || {}).forEach(function(key) {
      var overrideValue = override[key];
      if (
        overrideValue &&
        typeof overrideValue === 'object' &&
        !Array.isArray(overrideValue) &&
        result[key] &&
        typeof result[key] === 'object' &&
        !Array.isArray(result[key])
      ) {
        result[key] = deepMerge(result[key], overrideValue);
      } else {
        result[key] = overrideValue;
      }
    });
    return result;
  }

  function getByPath(source, path) {
    return String(path || '').split('.').reduce(function(acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : null;
    }, source);
  }

  function applyDomStrings(root) {
    var scope = root || document;
    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n]'), function(node) {
      var value = getByPath(window.STRINGS || {}, node.getAttribute('data-i18n'));
      if (value !== null && value !== undefined) {
        node.textContent = value;
      }
    });

    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n-placeholder]'), function(node) {
      var value = getByPath(window.STRINGS || {}, node.getAttribute('data-i18n-placeholder'));
      if (value !== null && value !== undefined) {
        node.setAttribute('placeholder', value);
      }
    });
  }

  function dispatch(detail) {
    state.detail = detail;
    window.dispatchEvent(new CustomEvent('hlidacky:strings-updated', { detail: detail }));
  }

  function fetchOverride(prototypeKey, language) {
    return fetch(
      '/api/strings?prototype=' + encodeURIComponent(prototypeKey) + '&language=' + encodeURIComponent(language),
      { cache: 'no-store', headers: { Accept: 'application/json' } }
    ).then(function(response) {
      return response.json().catch(function() { return {}; }).then(function(data) {
        if (!response.ok) {
          throw new Error((data && data.error) || 'Strings override could not be loaded.');
        }
        return data;
      });
    });
  }

  function whenDomReady() {
    if (document.readyState === 'loading') {
      return new Promise(function(resolve) {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      });
    }
    return Promise.resolve();
  }

  var script = resolveScript();
  var prototypeKey = detectPrototype(script);
  var language = detectLanguage();

  var ready = whenDomReady().then(function() {
    if (!prototypeKey) {
      dispatch({ applied: false, reason: 'missing-prototype' });
      return state.detail;
    }

    return fetchOverride(prototypeKey, language)
      .then(function(data) {
        var items = data && Array.isArray(data.items) ? data.items : [];
        var item = items[0] || null;

        if (!item || !item.payload || typeof item.payload !== 'object') {
          dispatch({
            applied: false,
            prototype: prototypeKey,
            language: language,
            reason: 'missing-override'
          });
          return state.detail;
        }

        window.STRINGS = deepMerge(window.STRINGS || {}, item.payload);

        applyDomStrings(document);

        if (typeof window.applyStrings === 'function') {
          window.applyStrings();
        }

        dispatch({
          applied: true,
          prototype: prototypeKey,
          language: language,
          touchedKeys: Array.isArray(item.touched_keys) ? item.touched_keys : []
        });
        return state.detail;
      })
      .catch(function(error) {
        dispatch({
          applied: false,
          prototype: prototypeKey,
          language: language,
          reason: 'error',
          error: error && error.message ? error.message : String(error)
        });
        return state.detail;
      });
  });

  window.HlidackyStringsRuntime = {
    applyDomStrings: applyDomStrings,
    currentPrototype: prototypeKey,
    currentLanguage: language,
    getLastDetail: function() {
      return state.detail;
    },
    ready: ready
  };
})();
