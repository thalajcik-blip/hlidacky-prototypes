// strings_en.js — English
(function(){
  function _dm(b,o){var r=Object.assign({},b||{});Object.keys(o).forEach(function(k){r[k]=(o[k]&&typeof o[k]==="object"&&!Array.isArray(o[k]))?_dm((b&&b[k])||{},o[k]):o[k];});return r;}
  window.STRINGS = _dm(window.STRINGS, {
    "sittersHub": {
      "navTitle": "Jobs for sitters",
      "topNavTitle": "Jobs",
      "selectorLabel": "Show all job offerings for",
      "title": "Jobs for sitters",
      "subtitle": "The current job-search screen prototype for sitters.",
      "bodyTitle": "Prototype scaffold",
      "bodyText": "The mobile container is ready for the first sitter-facing job-search screens.",
      "primaryCta": "Open strings editor",
      "secondaryCta": "Back to hub"
    }
  });
})();
