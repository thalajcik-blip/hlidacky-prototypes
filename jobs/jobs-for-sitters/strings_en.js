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
        "archived": "Archived"
      },
      "activeFiltersHeading": {
        "new": "Show latest job offerings for",
        "replied": "Show replied job offerings for",
        "archived": "Show archived job offerings for"
      },
      "activeFiltersHeadingEmpty": {
        "new": "Show all latest job offerings",
        "replied": "Show all replied job offerings",
        "archived": "Show all archived job offerings"
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
        "locationTitle": "Location",
        "radiusTitle": "Radius",
        "clearFilters": "Clear filters",
        "showJobs": "Show 128 jobs"
      },
      "notificationsModal": {
        "title": "Notification settings",
        "body": "Stay up to date with the latest job opportunities in your area. Choose how often you'd like to receive updates.",
        "emailLabel": "E-mail notifications",
        "mobileLabel": "Mobile notifications",
        "immediately": "Immediately after publication",
        "never": "Never",
        "daily": "Summary once a day",
        "weekly": "Summary once a week",
        "cancel": "Cancel",
        "save": "Save changes",
        "toast": {
          "title": "Your notification settings are updated.",
          "body": ""
        },
        "inboxToast": {
          "title": "Your inbox is looking better!",
          "body": "You've processed {countLabel} jobs and improved your future matches.",
          "all": "all"
        }
      },
      "reportModal": {
        "title": "Report a harmful job ad",
        "label": "Please, write down what the problem is:",
        "placeholder": "Write your message here...",
        "submit": "Submit report",
        "toast": {
          "title": "Report submitted",
          "body": "Our support has been already notified about your concern."
        }
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
        "alreadyReplied": "Already replied",
        "readMore": "read more",
        "body": "Hello, I am looking for a nanny for regular babysitting from September for the next school year for two children, a son (4 years old in November) and a daughter (2 years old). Mon-Fri 8-14:00. After agreement possible adjustment of time. Exceptional evening babysitting. It is also possible to use the services of a babysitter for a joint holiday, but all by mutual agreement.",
        "dismissTitle": "Why you're archiving this job",
        "dismissReasons": {
          "location": "The location doesn't fit.",
          "rate": "The rate is too low for me.",
          "schedule": "The schedule doesn't work.",
          "other": "I have another reason."
        },
        "replyComposer": {
          "sentAt": "You replied just a moment ago",
          "showMessages": "Show messages",
          "automaticReply": "Automatic reply",
          "clear": "Clear",
          "yourReply": "Your reply",
          "inputPlaceholder": "Enter your message here...",
          "useTemplate": "Use template",
          "templateLabel": "template",
          "allTemplates": "All templates",
          "sendMessage": "Send a message",
          "templatesModal": {
            "title": "Use a template",
            "apply": "Use selected template"
          }
        },
        "reply": "Reply to job",
        "toast": {
          "title": "Congratulations",
          "body": "Your message to {familyName} has been sent successfully."
        },
        "archiveToast": {
          "title": "Job ad archived",
          "body": "You can still find it under the Archived tab."
        },
        "otherActions": "Other actions",
        "otherActionsMenu": {
          "userJobs": "Show all jobs of the user",
          "reportAd": "Notify of an inappropriate ad"
        }
      }
    }
  });
})();
