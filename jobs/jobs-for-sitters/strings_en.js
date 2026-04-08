// strings_en.js — English
(function(){
  function _dm(b,o){var r=Object.assign({},b||{});Object.keys(o).forEach(function(k){r[k]=(o[k]&&typeof o[k]==="object"&&!Array.isArray(o[k]))?_dm((b&&b[k])||{},o[k]):o[k];});return r;}
  window.STRINGS = _dm(window.STRINGS, {
    "sittersHub": {
      "navTitle": "Jobs for sitters",
      "topNavTitle": "Jobs",
      "selectorLabel": "Show all job offerings for",
      "notificationsLink": "Set up notifications",
      "showMore": "show more results",
      "resultsTabs": {
        "new": "New",
        "replied": "Replied",
        "all": "All"
      },
      "activeFiltersHeading": {
        "new": "Show latest job offerings for",
        "replied": "Show replied job offerings for",
        "all": "Show all job offerings for"
      },
      "filtersModal": {
        "title": "Filters",
        "activeCount": "1",
        "servicesTitle": "Select services",
        "clear": "Clear",
        "babysitting": "Babysitting",
        "cleaning": "Cleaning",
        "petCare": "Pet care",
        "seniorCare": "Senior care",
        "tutoring": "Tutoring",
        "clearFilters": "Clear filters",
        "sortTitle": "Sort by",
        "latest": "Latest",
        "closest": "Closest",
        "bestPaid": "Best paid",
        "showJobs": "Show 128 jobs"
      },
      "locationValue": "Praha 2",
      "radiusValue": "+20 km",
      "title": "Jobs for sitters",
      "subtitle": "The current job-search screen prototype for sitters.",
      "bodyTitle": "Prototype scaffold",
      "bodyText": "The mobile container is ready for the first sitter-facing job-search screens.",
      "primaryCta": "Open strings editor",
      "secondaryCta": "Back to hub",
      "jobAdvert": {
        "postedLabel": "posted",
        "postedTime": "2 hours ago",
        "title": "Potočná 44, Brno–Bystrc",
        "distance": "3 km",
        "distanceSuffix": "away from you",
        "price": "450 Kč/h",
        "service": "Babysitting",
        "date": "June 4, 18:00",
        "author": "Alexandra",
        "wrote": "wrote:",
        "body": "Hello, I am looking for a nanny for regular babysitting from September for the next school year for two children, a son (4 years old in November) and a daughter (2 years old). Mon-Fri 8-14:00. After agreement possible adjustment of time. Exceptional evening babysitting. It is also possible to use the services of a babysitter for a joint holiday, but all by mutual agreement.",
        "reply": "Reply to job",
        "otherActions": "Other actions"
      }
    }
  });
})();
