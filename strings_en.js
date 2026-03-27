// strings_en.js — English
// Published via /strings editor. Missing keys fall back to CZ source (strings.js).
(function(){
  function _dm(b,o){var r=Object.assign({},b);Object.keys(o).forEach(function(k){r[k]=(o[k]&&typeof o[k]==="object"&&!Array.isArray(o[k]))?_dm(b[k]||{},o[k]):o[k];});return r;}
  window.STRINGS = _dm(window.STRINGS, {
  "nav": {
    "title": "Create a new job post",
    "btnPrev": "Back",
    "btnNext": "Continue",
    "cancelConfirm": "Cancel creating this job post?"
  },
  "exitModal": {
    "title": "You're just one step away from posting",
    "body": "Don't give up now. Complete the form to get offers from sitters who perfectly match your needs.",
    "leave": "Leave",
    "stay": "View offers"
  },
  "service": {
    "heroTitle": "Who are you looking for?",
    "heroSub": "Select what you need from the sitter.",
    "sectionLabel": "Select what you need from the sitter.",
    "validationAlert": "Please select at least one service",
    "babysitting": "Babysitting",
    "cleaning": "Household cleaning",
    "pet": "Pet care",
    "senior": "Senior care",
    "tutoring": "Tutoring"
  },
  "location": {
    "heroSub": "The location will stay private, but we’ll still show you the best matches nearby.",
    "inputLabel": "Location",
    "inputPlaceholder": "e.g. London, UK",
    "hint": "The exact address will be hidden.",
    "validationAlert": "Please enter the location where you need help",
    "titlePrefix": "Where do you need",
    "titleFallback": "help",
    "titleAnd": "and",
    "serviceNames": {
      "babysitting": "babysitting",
      "cleaning": "household cleaning",
      "pet": "pet care",
      "senior": "senior care",
      "tutoring": "tutoring"
    }
  },
  "cleaning": {
    "heroTitle": "What needs to be cleaned?",
    "heroSub": "We will prepare a draft of your job post based on your selection.",
    "sectionLabel": "What do you need to clean?",
    "flat": "Apartment",
    "house": "House"
  },
  "cleaningExtras": {
    "heroTitle": "Do you need help with anything else?",
    "heroSub": "We will prepare a draft of your job post based on your selection.",
    "sectionLabel": "Select additional services",
    "optional": "(optional)",
    "ironing": "Ironing",
    "laundry": "Laundry",
    "windowCleaning": "Window cleaning",
    "airbnbCleaning": "Airbnb / vacation rental cleaning",
    "carCleaning": "Car cleaning",
    "moveCleaning": "Move-in / move-out cleaning",
    "upholsteryCleaning": "Upholstery cleaning",
    "lightMaintenance": "Light home maintenance",
    "gardenHelp": "Gardening help"
  },
  "pet": {
    "heroTitle": "Your pet",
    "heroSub": "We will prepare a draft of your job post based on your selection.",
    "sectionLabel": "Which pets need care?",
    "dogs": "Dogs",
    "cats": "Cats",
    "other": "Other",
    "largePet": "I have a large dog",
    "validationAlert": "Please select at least one pet"
  },
  "seniorCare": {
    "heroTitle": "Care details",
    "heroSub": "This helps us find the best fit for your loved ones.",
    "careTypeLabel": "What type of care are you looking for?",
    "liveIn": "Live-in care (24/7)",
    "fullTime": "Full-time care",
    "partTime": "Regular part-time visits"
  },
  "frequencyPet": {
    "heroTitle": "When and where?",
    "heroSub": "💡 Tap the purple tags to add more details:",
    "howOftenLabel": "How often do you need help?",
    "onetime": "One-time (e.g. during holidays)",
    "regularly": "Regularly",
    "whereLabel": "Where do you need the care?",
    "atMyHome": "At my home",
    "atSitterHome": "At the sitter's home",
    "dontCare": "I don't mind"
  },
  "frequency": {
    "heroTitle": "When and how often?",
    "heroSub": "Are you looking for one-time or regular help?",
    "sectionLabel": "How often do you need help?",
    "regularly": "Regularly",
    "onetime": "One-time",
    "daysLabel": "Select preferred days",
    "optional": "(optional)",
    "days": {
      "mo": "Mon",
      "tu": "Tue",
      "we": "Wed",
      "th": "Thu",
      "fr": "Fri",
      "sa": "Sat",
      "su": "Sun"
    },
    "freqLabel": "Select frequency",
    "freqOptions": [
      "Once a week",
      "Twice a week",
      "Every day",
      "Every two weeks",
      "Once a month"
    ],
    "dateLabel": "Specify date and time",
    "datePlaceholder": "e.g. every Monday 4pm–8pm and Friday 2pm–6pm, starting next month",
    "notsure": "not sure",
    "dateLabelRegular": "Specify date and time",
    "longterm": "I am looking for long-term help"
  },
  "review": {
    "heroTitle": "Review your job post",
    "heroSub1": "Almost there!",
    "heroSub2": "We found 128 sitters matching your criteria 🎉",
    "aiLabel": "💡 Tap the purple tags to add more details:",
    "privacyNote": "Your personal details stay private and are not shown to sitters.",
    "btnPost": "Post job",
    "footerNote": "Posting is free. We will create a Sitter.com account for you to manage everything securely.",
    "generatedTexts": {
      "babysitting": "We are looking for a careful and reliable sitter for our children. We need regular help and are seeking an experienced, friendly person.",
      "cleaning": "We need help with regular house cleaning. We live in an apartment and would also appreciate help with ironing and laundry.",
      "pet": "We are looking for a responsible person with experience to watch our dog during our holidays. The care will take place at our home.",
      "senior": "We are seeking a kind and responsible caregiver for an elderly family member. The goal is daily assistance and ensuring home comfort.",
      "tutoring": "We are looking for an experienced tutor to help our child with school subjects and exam preparation. Patience and adaptability are important to us."
    },
    "hintLabel": "Tip: Add more details about your request",
    "pillLanguage": "preferred language",
    "pillNeeds": "special needs",
    "pillPrice": "estimated price",
    "modalCancel": "Cancel",
    "modalAdd": "Add to description",
    "language": {
      "modalTitle": "Add information about the sitter's language",
      "cs": "Czech",
      "sk": "Slovak",
      "en": "English",
      "de": "German",
      "es": "Spanish",
      "fr": "French",
      "it": "Italian",
      "uk": "Ukrainian",
      "moreLangs": "+ more languages",
      "appendText": "We prefer a sitter who speaks: {langs}."
    },
    "needs": {
      "modalTitle": "Add information about special needs",
      "autism": "Autism",
      "diabetes": "Diabetes ",
      "asthma": "Asthma",
      "adhd": "ADHD ",
      "allergies": "Food allergies",
      "childhood": "Childhood illnesses",
      "sleep": "Sleep disorders",
      "vision": "Visual impairment",
      "hearing": "Hearing impairment",
      "epilepsy": "Epilepsy",
      "other": "Other needs",
      "appendText": "Our child has special needs: {needs}."
    },
    "price": {
      "modalTitle": "Enter your price expectations",
      "label": "Set price",
      "appendText": "We offer {price}."
    }
  },
  "locationTutoring": {
    "heroTitle": "Where do you want the tutoring?",
    "heroSub": "Where should the lessons take place?",
    "sectionLabel": "Select one or more locations",
    "studentPlace": "At the student's home",
    "tutorPlace": "At the tutor's location",
    "online": "Online (video lessons)",
    "validationAlert": "Please select at least one location"
  },
  "subjects": {
    "heroTitle": "Subjects",
    "heroSub": "Select one or more subjects",
    "languagesLabel": "Languages",
    "scienceLabel": "Sciences",
    "musicLabel": "Music",
    "moreLanguages": "+ more languages",
    "moreMusic": "+ more instruments",
    "otherLabel": "Any other subject",
    "otherPlaceholder": "Programming, dance, history...",
    "cs": "Czech",
    "en": "English",
    "de": "German",
    "fr": "French",
    "it": "Italian",
    "es": "Spanish",
    "physics": "Physics",
    "math": "Math",
    "chemistry": "Chemistry",
    "biology": "Biology",
    "singing": "Singing",
    "piano": "Piano",
    "guitar": "Guitar"
  },
  "contact": {
    "heroTitle": "Your name and email",
    "heroSub": "So we can deliver replies from sitters to you.",
    "nameLabel": "Full name",
    "namePlaceholder": "e.g. Jane Doe",
    "emailLabel": "Email",
    "emailPlaceholder": "jane.doe@example.com",
    "emailPrefsLabel": "Select e-mails you want to receive from us",
    "emailMonthly": "A monthly inspiration on topics tailored to you",
    "emailOffers": "Discounts and offers from Hlídačky.cz and partners"
  },
  "phone": {
    "heroTitle": "Phone number",
    "heroSub": "Your private number with international prefix. Showing it will help you get more contacts from sitters.",
    "inputLabel": "Phone number",
    "inputPlaceholder": "+44 7700 900000",
    "skipLink": "I'll do this later"
  },
  "success": {
    "heroTitle": "That's it!",
    "heroSub": "Your job post in {city} has been published.",
    "body": "Once approved, we will show your post to sitters in your city. You will see their replies in your messages, and we will notify you about each new response.",
    "btnContinue": "Continue",
    "editLink": "Edit job post"
  }
});
})();
