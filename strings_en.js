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
    "validationAlert": "Please select your location",
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
    "heroTitle": "What needs cleaning?",
    "heroSub": "We'll provide a job draft based on your selection.",
    "sectionLabel": "What do you need to clean?",
    "flat": "Apartment",
    "house": "House"
  },
  "cleaningExtras": {
    "heroTitle": "Do you need help with anything else?",
    "heroSub": "We'll provide a job draft based on your selection.",
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
    "heroSub": "We'll provide a job draft based on your selection.",
    "sectionLabel": "Which pets need care?",
    "dogs": "Dogs",
    "cats": "Cats",
    "other": "Other",
    "largePet": "I have a large dog",
    "validationAlert": "Please select at least one pet"
  },
  "seniorCare": {
    "heroTitle": "Care specifics",
    "heroSub": "This helps us find the best match for their needs.",
    "careTypeLabel": "What type of care are you looking for?",
    "notSure": "Not sure",
    "notSureSub": "You can specify it later",
    "liveIn": "24/7 live-in care",
    "liveInSub": "Full-time support with sitter staying in the home.",
    "fullTime": "Full-time care",
    "fullTimeSub": "Daily support, typically 35-40 hours per week.",
    "partTime": "Part-time care",
    "partTimeSub": "Flexible or occasional assistance as needed.",
    "holidayCare": "Holiday care",
    "holidayCareSub": "Temporary care to provide caregiver relief."
  },
  "frequencyPet": {
    "heroTitle": "When and where?",
    "heroSub": "💡 Tap the purple tags to add more details:",
    "howOftenLabel": "How often do you need help?",
    "notSureYet": "not sure yet",
    "onetime": "One-time (e.g. during holidays)",
    "regularly": "regularly",
    "whereLabel": "Where do you need the care?",
    "atMyHome": "At my home",
    "atSitterHome": "At the sitter's home",
    "dontCare": "I don't mind"
  },
  "frequency": {
    "heroTitle": "When and how often?",
    "heroSub": "Are you looking for one-time or regular help?",
    "sectionLabel": "How often do you need help?",
    "regularly": "regularly",
    "onetime": "one-time",
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
    "footerNote": "Post for free. We’ll set up your account to manage it safely.",
    "generatedTexts": {
      "babysitting": "We are looking for a careful and reliable sitter for our children. We need regular help and are seeking an experienced, friendly person.",
      "cleaning": "We need help with regular house cleaning. We live in an apartment and would also appreciate help with ironing and laundry.",
      "pet": "We are looking for a responsible person with experience to watch our dog during our holidays. The care will take place at our home.",
      "senior": "We are seeking a kind and responsible caregiver for an elderly family member. The goal is daily assistance and ensuring home comfort.",
      "tutoring": "We are looking for an experienced tutor to help our child with school subjects and exam preparation. Patience and adaptability are important to us."
    },
    "hintLabel": "Tip: Add more details about your request",
    "pillLanguage": "language",
    "pillNeeds": "special needs",
    "pillPrice": "price",
    "modalCancel": "Cancel",
    "modalAdd": "Add to job post",
    "language": {
      "modalTitle": "Sitter’s languages",
      "sectionLabel": "Which languages should the sitter speak?",
      "cs": "Čeština",
      "sk": "Slovenčina",
      "en": "English",
      "de": "Deutsch",
      "es": "Español",
      "fr": "Français",
      "it": "Italiano",
      "uk": "Українська",
      "moreLangs": "+ more languages",
      "appendText": "We prefer a sitter who speaks: {langs}."
    },
    "languageTutor": {
      "modalTitle": "Tutor’s languages",
      "sectionLabel": "Which languages should the tutor speak?",
      "moreLangs": "+ more languages",
      "appendText": "We prefer a tutor who speaks: {langs}."
    },
    "needs": {
      "modalTitle": "Special needs",
      "sectionLabel": "Are there any special needs you want to mention?",
      "autism": "Autism spectrum",
      "diabetes": "Diabetes ",
      "asthma": "Asthma",
      "adhd": "ADHD ",
      "allergies": "Food allergies",
      "childhood": "Childhood diseases",
      "sleep": "Sleep disorders",
      "vision": "Vision disorders",
      "hearing": "Hearing disorders",
      "epilepsy": "Epilepsy",
      "other": "Other needs",
      "appendText": "Our child has special needs: {needs}."
    },
    "needsTutor": {
      "modalTitle": "Special requirements",
      "sectionLabel": "Any specific learning needs or formats?",
      "speechDisorders": "Speech disorders",
      "learningDisorders": "Learning disorders",
      "helpWithHomework": "Help with homework",
      "homeSchooling": "Home-schooling",
      "appendText": "Special tutoring requirements include: {needs}."
    },
    "specialRequirements": {
      "pillLabel": "special requirements",
      "modalTitle": "Special requirements",
      "sectionLabel": "Any specific care needs or experience?",
      "keepingCompany": "Keeping company",
      "alzheimers": "Alzheimer's disease",
      "parkinsons": "Parkinson's disease",
      "diabetes": "Diabetes",
      "dementia": "Dementia",
      "mobilityIssues": "Mobility issues",
      "personalHygiene": "Personal hygiene",
      "mealPreparation": "Meal preparation",
      "doctorAppointments": "Doctor appointments",
      "physiotherapy": "Physiotherapy",
      "artTherapy": "Art therapy",
      "appendText": "Special care requirements include: {requirements}."
    },
    "extraTasks": {
      "pillLabel": "extra tasks",
      "modalTitle": "Extra tasks",
      "sectionLabel": "Any special cleaning requests?",
      "ironing": "Ironing",
      "laundry": "Laundry",
      "windowCleaning": "Window cleaning",
      "airbnbCleaning": "Airbnb/apartments cleaning",
      "carCleaning": "Car cleaning",
      "moveCleaning": "Move-in/move-out cleaning",
      "upholsteryCleaning": "Upholstery cleaning",
      "lightMaintenance": "Light home maintenance",
      "gardenHelp": "Garden help",
      "appendText": "We would also appreciate help with: {tasks}."
    },
    "petsAtHome": {
      "pillLabel": "pets at home",
      "modalTitle": "Pets at home",
      "sectionLabel": "Are there any animals at home?",
      "dogs": "Dogs",
      "cats": "Cats",
      "other": "Other",
      "none": "None",
      "appendText": "There are pets at home: {pets}.",
      "appendNoneText": "There are no pets at home."
    },
    "dogSize": {
      "pillLabel": "dog size",
      "modalTitle": "Dog size",
      "sectionLabel": "How big is your dog?",
      "small": "Small (up to 5 kg)",
      "medium": "Medium (up to 25 kg)",
      "large": "Large (up to 40 kg)",
      "huge": "Huge (over 40 kg)",
      "appendText": "Our dog is: {sizes}."
    },
    "dogAge": {
      "pillLabel": "dog's age",
      "modalTitle": "Dog's age",
      "sectionLabel": "How old is your dog?",
      "puppy": "Puppy",
      "adult": "Adult",
      "senior": "Senior",
      "puppyExtraAttention": "The puppy requires extra attention",
      "seniorSpecialCare": "The dog requires special care",
      "puppySummary": "a puppy",
      "adultSummary": "an adult dog",
      "seniorSummary": "a senior dog",
      "appendText": "Our dog is {age}.",
      "appendPuppyExtraText": "The puppy requires extra attention.",
      "appendSeniorExtraText": "The dog requires special care."
    },
    "dogPersonality": {
      "pillLabel": "dog's personality",
      "modalTitle": "Dog's personality",
      "sectionLabel": "What's your dog like?",
      "highEnergy": "High-energy",
      "calm": "Calm",
      "playful": "Playful",
      "protective": "Protective",
      "social": "Social/Friendly",
      "curious": "Curious",
      "stubborn": "Stubborn",
      "wellTrained": "Well-trained",
      "intelligent": "Intelligent",
      "dogFriendlyLabel": "Is your dog dog-friendly?",
      "dogFriendlyYes": "Yes, very friendly",
      "dogFriendlyNo": "No, prefers to be alone",
      "kidsFriendlyLabel": "Is your dog good with kids?",
      "kidsFriendlyYes": "Yes, loves kids",
      "kidsFriendlyNo": "No, not used to children",
      "appendTraitsText": "Our dog is: {traits}.",
      "appendDogFriendlyYes": "Our dog is very friendly with other dogs.",
      "appendDogFriendlyNo": "Our dog prefers to be alone around other dogs.",
      "appendKidsFriendlyYes": "Our dog is good with kids.",
      "appendKidsFriendlyNo": "Our dog is not used to children."
    },
    "healthDiet": {
      "pillLabel": "health and diet",
      "modalTitle": "Health & diet",
      "diet": {
        "sectionLabel": "Any special diet or allergies?",
        "items": [
          { "key": "standardDiet", "label": "Standard diet", "sub": "No restrictions" },
          { "key": "specialDiet", "label": "Special diet/sllergies", "sub": "Grain-free, raw, specific brand, etc." },
          { "key": "noTreats", "label": "Strict: No treats", "sub": "Dogs with sensitive stomach or weight needs" }
        ]
      },
      "health": {
        "sectionLabel": "Does your dog have any health needs?",
        "items": [
          { "key": "medication", "label": "Help with medication", "sub": "Sitter will need to give pills, drops, or injections" },
          { "key": "mobility", "label": "Mobility or exercise needs", "sub": "Struggles with stairs, requires short walks only, or has joint issues" },
          { "key": "medicalHistory", "label": "Medical history", "sub": "History of seizures, anxiety, or specific chronic conditions" }
        ]
      },
      "appendDietText": "Our dog has these diet preferences or restrictions: {diet}.",
      "appendHealthText": "Our dog has these health-related needs: {health}."
    },
    "typeCare": {
      "pillLabel": "type of care",
      "modalTitle": "Type of care",
      "sectionLabel": "What help does your pet need?",
      "items": [
        { "key": "walking", "label": "Walking", "sub": "Walking and potty breaks" },
        { "key": "sittingAtMyHome", "label": "Sitting at my home", "sub": "Sitter stays at your home to care for your pet" },
        { "key": "stayingAtSitterHome", "label": "Staying at sitter's home", "sub": "Your pet stays at the sitter's home" },
        { "key": "holidayCare", "label": "Holiday care", "sub": "Longer or continuous care while you are away" }
      ],
      "appendText": "We are looking for this type of pet care: {types}."
    },
    "gradeLevels": {
      "pillLabel": "grade levels",
      "modalTitle": "Grade levels",
      "sectionLabel": "What's the academic level?",
      "items": [
        { "key": "preschool", "label": "pre-school" },
        { "key": "elementary", "label": "elementary school" },
        { "key": "secondary", "label": "secondary school" }
      ],
      "appendText": "The academic level is: {levels}."
    },
    "entranceExams": {
      "pillLabel": "entrance exams",
      "modalTitle": "Entrance exams",
      "sectionLabel": "Preparing for any exams?",
      "items": [
        { "key": "primaryAdmissions", "label": "primary school admissions" },
        { "key": "highSchoolAdmissions", "label": "high school admissions" },
        { "key": "schoolLeaving", "label": "school leaving examinations" },
        { "key": "otherTests", "label": "other tests & exams" }
      ],
      "appendText": "We are preparing for: {exams}."
    },
    "cleaningSupplies": {
      "pillLabel": "cleaning supplies",
      "modalTitle": "Cleaning supplies",
      "sectionLabel": "Who provides the cleaning supplies?",
      "noPreference": "No preference",
      "familyProvides": "Family provides",
      "sitterProvides": "Sitter provides",
      "familyProvidesSummary": "the family",
      "sitterProvidesSummary": "the sitter",
      "appendText": "Cleaning supplies will be provided by {provider}.",
      "appendNoPreferenceText": "We have no preference on who provides the cleaning supplies."
    },
    "daysTimes": {
      "pillLabel": "days & times",
      "modalTitle": "When and how often?",
      "appendNotSureText": "We are still flexible about the days and times.",
      "appendRegularText": "We are looking for regular help.",
      "appendRegularWithDetails": "We are looking for regular help: {details}.",
      "appendLongtermText": "We are looking for long-term help.",
      "appendOneTimeText": "We need one-time help on {date} from {fromTime} to {toTime}.",
      "appendOneTimeOvernightText": "We need one-time overnight help from {fromDate} {fromTime} to {toDate} {toTime}."
    },
    "specialOccasions": {
      "pillLabel": "special occasions",
      "modalTitle": "Special occasions",
      "sectionLabel": "Need help for an event?",
      "parties": "Parties",
      "holidays": "Holidays",
      "overnightCare": "Overnight care",
      "childrensGroups": "Children's groups",
      "weddings": "Weddings",
      "appendText": "We would also appreciate help for special occasions such as: {occasions}."
    },
    "skillsTalents": {
      "pillLabel": "skills",
      "modalTitle": "Preferred skills & talents",
      "sectionLabel": "Which activities would you like the sitter to engage in?",
      "singing": "Singing",
      "music": "Music",
      "sports": "Sports",
      "dramaDance": "Drama or Dance",
      "artsCrafts": "Arts and Crafts",
      "extraLabel": "Anything else?",
      "extraPlaceholder": "e.g., baking, chess, yoga...",
      "appendText": "It would be great if the sitter could support activities such as: {skills}.",
      "appendExtraText": "Additional activities we care about: {note}."
    },
    "parentingStyle": {
      "pillLabel": "parenting style",
      "modalTitle": "Parenting philosophy",
      "sectionLabel": "Which approach do you use at home? We’ll look for sitters who share your values.",
      "traditional": "Traditional",
      "respectfulParenting": "Respectful parenting",
      "forestSchool": "Forest School / Outdoor",
      "montessori": "Montessori",
      "waldorf": "Waldorf",
      "appendText": "Our parenting style is closest to: {styles}."
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
    "inputPlaceholder": "777 123 456",
    "skipLink": "I'll do this later"
  },
  "success": {
    "heroTitle": "That's it!",
    "heroSub": "Your job in {city} was posted.",
    "body": "We’ll share your job with sitters in your area. Their responses will appear in your messages, with notifications for each new reply.",
    "btnContinue": "Continue",
    "editLink": "Edit job post"
  },
  "children": {
    "modalTitle": "Information about children",
    "sectionLabel": "How many kids need care?",
    "helperText": "Add each child’s age and gender so sitters get a clearer idea of who will need care.",
    "childLabel": "child",
    "boy": "Boy",
    "girl": "Girl",
    "ageLabel": "Age",
    "monthSingular": "month",
    "monthPlural": "months",
    "yearSingular": "year",
    "yearPlural": "years",
    "appendText": "We have {desc}.",
    "summaryBoy": "a boy ({ageLabel})",
    "summaryGirl": "a girl ({ageLabel})",
    "and": "and",
    "childOrdinals": [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5+"
    ],
    "pillLabel": "children",
    "years": "years"
  },
  "childrenTutor": {
    "modalTitle": "Student information",
    "sectionLabel": "How many students need tutoring?",
    "childLabel": "student",
    "boy": "Boy",
    "girl": "Girl",
    "ageLabel": "Age",
    "lessThanTwo": "less than 2",
    "yearSingular": "year",
    "yearPlural": "years",
    "appendText": "We are looking for tutoring for {desc}.",
    "summaryBoy": "a boy ({ageLabel})",
    "summaryGirl": "a girl ({ageLabel})",
    "and": "and",
    "childOrdinals": [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5+"
    ],
    "pillLabel": "children"
  },
  "transport": {
    "pillLabel": "transport",
    "modalTitle": "Location & travel",
    "modalTitleSenior": "Transport & travel",
    "appendText": "It would also help if the sitter offered: {items}.",
    "and": "and",
    "location": {
      "sectionLabel": "Where do you need help?",
      "items": {
        "atMyHome": {
          "label": "At my home",
          "summary": "care at our home"
        },
        "atSitterHome": {
          "label": "At sitter’s home",
          "summary": "the option of care at the sitter’s home"
        }
      }
    },
    "driver": {
      "sectionLabel": "Driver needed?",
      "items": {
        "hasCar": {
          "label": "Sitter has their own car",
          "summary": "their own car"
        },
        "comfortableDriving": {
          "label": "Sitter is comfortable driving children",
          "sub": "(Sitter has a valid license and experience driving with children)",
          "summary": "a valid license and experience driving children"
        }
      }
    },
    "driverSenior": {
      "sectionLabel": "Is driving required?",
      "items": {
        "hasCar": {
          "label": "Sitter has their own car",
          "summary": "their own car"
        },
        "comfortableDriving": {
          "label": "Sitter is comfortable driving seniors",
          "sub": "Sitter has a valid license and experience driving seniors (e.g. to doctor’s appointments or errands).",
          "summary": "a valid license and experience driving seniors"
        }
      }
    }
  },
  "onboarding": {
    "navTitle": "Onboarding",
    "title": "Sitters matching your preferences",
    "sub": "👶 Experienced, available part-time, suitable for all age groups",
    "verified": "Verified",
    "readMore": "read more",
    "showMore": "Show more sitters",
    "ctaText": "Instant access to sitters — become a member now!",
    "ctaBtn": "View membership options",
    "restart": "Start over"
  }
});
})();
