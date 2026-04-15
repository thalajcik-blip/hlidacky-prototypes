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
      "feedbackModal": {
        "button": "Feedback",
        "title": "Share your thoughts",
        "body": "Please, write down your feedback for this prototype:",
        "prototypeLabel": "Prototype",
        "nameLabel": "Your name",
        "namePlaceholder": "Your name",
        "emailLabel": "Your e-mail",
        "emailPlaceholder": "Your e-mail",
        "messageLabel": "Tell us what's on your mind...",
        "optional": "(optional)",
        "placeholder": "How do you like the new features? We'd love to hear what works for you and what we could improve.",
        "submit": "Send feedback",
        "submitting": "Submitting...",
        "success": "Thank you, your feedback has been submitted.",
        "error": "We couldn't submit your feedback. Please try again.",
        "validation": "Please write your feedback first.",
        "toast": {
          "title": "Thanks for your feedback",
          "body": "Your note has been saved with this prototype."
        }
      },
      "locationValue": "Praha 2",
      "locationOptions": {
        "secondaryLocation": "Brandýs nad Labem",
        "myLocations": "all my locations",
        "allLocations": "Anywhere"
      },
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
          "templates": [
            "Hi, I'd love to care for your little ones. The schedule works well for me too 🙂. Please let me know if your offer is available. Thank you!",
            "Hi, I'd love to care for your little ones. Let me know if your offer is available.",
            "Hey, I'd be delighted to look after your little ones. The schedule fits well for me 💕",
            "Hello Alexandra, your offer sounds like a great match for me. I have experience with children of a similar age and I'm available on the days you mentioned.",
            "Hi, I am available for regular babysitting and occasional evening care as well. I would love to hear more details about your family and the routine you need help with.",
            "Hello, thank you for sharing your offer. I have several years of babysitting experience and the proposed timing works very well for me.",
            "Hi, I’m interested in this job. I’m reliable, warm, and used to caring for toddlers and preschool children on a regular basis.",
            "Hello, this looks like something I could help with. I’m available long-term and I’m comfortable with both structured daytime care and playtime outdoors.",
            "Hi Alexandra, I’d be happy to support your family. I can help with daytime babysitting, preparing simple meals, and keeping the children engaged.",
            "Hello, your offer caught my eye right away. I have a calm approach, strong references, and availability that matches your requested schedule.",
            "Hi, I’d love to connect about this babysitting opportunity. I’m flexible, communicative, and happy to adjust to your children’s needs.",
            "Hello, I’m very interested in this role. I enjoy creating a safe and playful environment for children and would be glad to discuss the details with you."
          ],
          "sendMessage": "Send a message",
          "templatesModal": {
            "title": "Use a template",
            "apply": "Use selected template"
          }
        },
        "reply": "Reply to job",
        "toast": {
          "title": "Message delivered",
          "body": "Your message to {familyName} has been sent successfully."
        },
        "archiveToast": {
          "title": "Job ad archived",
          "body": "You can still find it under the Archived tab.",
          "undo": "Undo action"
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
