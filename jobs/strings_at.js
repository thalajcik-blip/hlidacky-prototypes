// strings_at.js — Deutsch (AT)
// Published via /strings editor. Missing keys fall back to CZ source (strings.js).
(function(){
  function _dm(b,o){var r=Object.assign({},b||{});Object.keys(o).forEach(function(k){r[k]=(o[k]&&typeof o[k]==="object"&&!Array.isArray(o[k]))?_dm((b&&b[k])||{},o[k]):o[k];});return r;}
  window.STRINGS = _dm(window.STRINGS, {
  "nav": {
    "title": "Neue Jobanzeige erstellen",
    "btnPrev": "Zurück",
    "btnNext": "Weiter",
    "cancelConfirm": "Möchten Sie die Erstellung dieser Jobanzeige abbrechen?"
  },
  "exitModal": {
    "title": "Nur noch ein Schritt bis zur Veröffentlichung",
    "body": "Geben Sie jetzt nicht auf. Schließen Sie das Formular ab, um Angebote von Sitter:innen zu erhalten, die perfekt zu Ihren Bedürfnissen passen.",
    "leave": "Verlassen",
    "stay": "Angebote ansehen"
  },
  "service": {
    "heroTitle": "Wen suchen Sie?",
    "heroSub": "Wählen Sie aus, wobei Sie Unterstützung benötigen.",
    "sectionLabel": "Wählen Sie aus, wobei Sie Unterstützung benötigen.",
    "validationAlert": "Bitte wählen Sie mindestens eine Dienstleistung aus",
    "babysitting": "Babysitting",
    "cleaning": "Haushaltsreinigung",
    "pet": "Tierbetreuung",
    "senior": "Seniorenbetreuung",
    "tutoring": "Nachhilfeunterricht"
  },
  "location": {
    "heroSub": "Der genaue Standort bleibt privat, aber wir zeigen Ihnen trotzdem die besten Ergebnisse in Ihrer Nähe.",
    "inputLabel": "Standort",
    "inputPlaceholder": "z. B. Wien, Österreich",
    "hint": "Die exakte Adresse wird nicht öffentlich angezeigt.",
    "validationAlert": "Bitte wählen Sie Ihren Standort aus",
    "titlePrefix": "Wo benötigen Sie",
    "titleFallback": "Hilfe",
    "titleAnd": "und",
    "serviceNames": {
      "babysitting": "Babysitting",
      "cleaning": "Haushaltsreinigung",
      "pet": "Tierbetreuung",
      "senior": "Seniorenbetreuung",
      "tutoring": "Nachhilfe"
    }
  },
  "price": {
    "heroTitle": "Fixpreis pro Stunde oder nach Vereinbarung?",
    "inputLabel": "Legen Sie Ihren Preis fest",
    "inputPlaceholder": "z. B. € 15/Std., € 80/Tag...",
    "averageHint": "Der Durchschnittspreis in Ihrer Umgebung beträgt € 15 pro Stunde",
    "placeholderFallback": "€ 15 pro Stunde"
  },
  "cleaning": {
    "heroTitle": "Was soll gereinigt werden?",
    "heroSub": "Wir erstellen einen Entwurf basierend auf Ihrer Auswahl.",
    "sectionLabel": "Was möchten Sie reinigen lassen?",
    "flat": "Wohnung",
    "house": "Haus"
  },
  "cleaningExtras": {
    "heroTitle": "Benötigen Sie noch weitere Hilfe?",
    "heroSub": "Wir erstellen einen Entwurf basierend auf Ihrer Auswahl.",
    "sectionLabel": "Zusätzliche Leistungen wählen",
    "optional": "(optional)",
    "ironing": "Bügeln",
    "laundry": "Wäsche waschen",
    "windowCleaning": "Fensterreinigung",
    "airbnbCleaning": "Reinigung von Airbnb- / Ferienwohnungen",
    "carCleaning": "Autoreinigung",
    "moveCleaning": "Einzugs- / Auszugsreinigung",
    "upholsteryCleaning": "Polsterreinigung",
    "lightMaintenance": "Leichte Instandhaltung",
    "gardenHelp": "Gartenhilfe"
  },
  "pet": {
    "heroTitle": "Ihr Haustier",
    "heroSub": "Wir erstellen einen Entwurf basierend auf Ihrer Auswahl.",
    "sectionLabel": "Welche Tiere benötigen Betreuung?",
    "dogs": "Hunde",
    "cats": "Katzen",
    "other": "Andere",
    "largePet": "Ich habe einen großen Hund",
    "validationAlert": "Bitte wählen Sie mindestens ein Tier aus"
  },
  "seniorCare": {
    "heroTitle": "Details zur Betreuung",
    "heroSub": "Dies hilft uns, die passende Unterstützung für Ihre Angehörigen zu finden.",
    "careTypeLabel": "Welche Art der Betreuung suchen Sie?",
    "notSure": "Noch nicht sicher",
    "notSureSub": "Sie können dies später präzisieren",
    "liveIn": "24-Stunden-Betreuung",
    "liveInSub": "Vollzeitunterstützung, bei der die Betreuungsperson im Haushalt wohnt.",
    "fullTime": "Vollzeitbetreuung",
    "fullTimeSub": "Tägliche Unterstützung, üblicherweise 35–40 Stunden pro Woche.",
    "partTime": "Regelmäßige Teilzeitbesuche",
    "partTimeSub": "Flexible oder gelegentliche Unterstützung nach Bedarf.",
    "holidayCare": "Urlaubsbetreuung",
    "holidayCareSub": "Vorübergehende Pflege zur Entlastung von pflegenden Angehörigen."
  },
  "frequencyPet": {
    "heroTitle": "Wann und wo?",
    "heroSub": "💡 Tippen Sie auf die lila Tags für mehr Details:",
    "howOftenLabel": "Wie oft benötigen Sie Hilfe?",
    "notSureYet": "noch nicht sicher",
    "onetime": "Einmalig (z. B. während des Urlaubs)",
    "regularly": "Regelmäßig",
    "whereLabel": "Wo soll die Betreuung stattfinden?",
    "atMyHome": "Bei mir zu Hause",
    "atSitterHome": "Bei der/dem Sitter:in zu Hause",
    "dontCare": "Egal"
  },
  "frequency": {
    "heroTitle": "Wann und wie oft?",
    "heroSub": "Suchen Sie einmalige oder regelmäßige Hilfe?",
    "sectionLabel": "Wie oft benötigen Sie Hilfe?",
    "regularly": "Regelmäßig",
    "onetime": "Einmalig",
    "daysLabel": "Bevorzugte Tage wählen",
    "optional": "(optional)",
    "days": {
      "mo": "Mo",
      "tu": "Di",
      "we": "Mi",
      "th": "Do",
      "fr": "Fr",
      "sa": "Sa",
      "su": "So"
    },
    "freqLabel": "Häufigkeit wählen",
    "freqOptions": [
      "Einmal pro Woche",
      "Zweimal pro Woche",
      "Täglich",
      "Alle zwei Wochen",
      "Einmal pro Monat"
    ],
    "dateLabel": "Datum und Uhrzeit präzisieren",
    "datePlaceholder": "z. B. jeden Montag 16:00–20:00 Uhr und Freitag 14:00–18:00 Uhr, ab nächstem Monat",
    "notsure": "nicht sicher",
    "dateLabelRegular": "Datum und Uhrzeit präzisieren",
    "longterm": "Ich suche langfristige Hilfe"
  },
  "review": {
    "heroTitle": "Neuer Job",
    "heroSub1": "Fast geschafft!",
    "heroSub2": "Wir haben 128 Sitter:innen gefunden, die Ihren Kriterien entsprechen 🎉",
    "aiLabel": "💡 Tippen Sie auf die lila Tags für mehr Details:",
    "multiHeroTitle": "Weitere Jobdetails hinzufügen",
    "multiHeroSub1": "Nur noch ein kleiner Schritt.",
    "multiHeroSub2": "Wir teilen Ihre Anzeige mit 128 Sitter:innen in Ihrer Nähe.",
    "multiLabel": "Jobbeschreibung",
    "multiPlaceholder": "Guten Tag liebe Sitter:innen, wir suchen Unterstützung im Bereich {services} in {location}. Unsere Preisvorstellung liegt bei etwa {price}",
    "privacyNote": "Ihre persönlichen Daten bleiben privat und werden Sitter:innen nicht angezeigt.",
    "btnPost": "Jobanzeige veröffentlichen",
    "footerNote": "Kostenlos veröffentlichen. Wir erstellen Ihnen ein Konto zur sicheren Verwaltung.",
    "generatedTexts": {
      "babysitting": "Wir suchen eine umsichtige und zuverlässige Sitter:in für unsere Kinder. Wir benötigen regelmäßige Unterstützung und wünschen uns eine erfahrene, freundliche Person.",
      "cleaning": "Wir benötigen Hilfe bei der regelmäßigen Haushaltsreinigung. Wir wohnen in einer Wohnung und würden uns auch über Unterstützung beim Bügeln und Wäschewaschen freuen.",
      "pet": "Wir suchen eine verantwortungsbewusste Person mit Erfahrung, die während unseres Urlaubs auf unseren Hund aufpasst. Die Betreuung findet bei uns zu Hause statt.",
      "senior": "Wir suchen eine herzliche und verantwortungsbewusste Seniorenbetreuer:in für ein älteres Familienmitglied. Ziel ist die tägliche Unterstützung und das Wohlbefinden zu Hause.",
      "tutoring": "Wir suchen eine erfahrene Nachhilfelehrer:in, um unser Kind bei Schulfächern und der Prüfungsvorbereitung zu unterstützen. Geduld und Flexibilität sind uns wichtig."
    },
    "hintLabel": "Tipp: Fügen Sie Details zu Ihrer Anfrage hinzu",
    "pillLanguage": "Sprache",
    "pillNeeds": "Besondere Bedürfnisse",
    "pillPrice": "Preis",
    "modalCancel": "Abbrechen",
    "modalAdd": "Zur Jobanzeige hinzufügen",
    "language": {
      "modalTitle": "Sprachen der Sitter:innen",
      "sectionLabel": "Welche Sprachen sollte die/der Sitter:in sprechen?",
      "cs": "Tschechisch",
      "sk": "Slowakisch",
      "en": "Englisch",
      "de": "Deutsch",
      "es": "Spanisch",
      "fr": "Französisch",
      "it": "Italienisch",
      "uk": "Ukrainisch",
      "moreLangs": "+ weitere Sprachen",
      "appendText": "Wir bevorzugen eine Sitter:in, die folgende Sprachen spricht: {langs}."
    },
    "languageTutor": {
      "modalTitle": "Sprachen der Nachhilfelehrer:innen",
      "sectionLabel": "Welche Sprachen sollte die/der Lehrer:in sprechen?",
      "moreLangs": "+ weitere Sprachen",
      "appendText": "Wir bevorzugen eine Nachhilfelehrer:in, die folgende Sprachen spricht: {langs}."
    },
    "needs": {
      "modalTitle": "Besondere Bedürfnisse",
      "sectionLabel": "Gibt es spezielle Anforderungen, die Sie erwähnen möchten?",
      "autism": "Autismus-Spektrum",
      "diabetes": "Diabetes",
      "asthma": "Asthma",
      "adhd": "ADHS/ADS",
      "allergies": "Lebensmittelallergien",
      "childhood": "Kinderkrankheiten",
      "sleep": "Schlafstörungen",
      "vision": "Sehbehinderungen",
      "hearing": "Hörbehinderungen",
      "epilepsy": "Epilepsie",
      "other": "Andere Bedürfnisse",
      "appendText": "Unser Kind hat besondere Bedürfnisse: {needs}."
    },
    "needsTutor": {
      "modalTitle": "Spezielle Anforderungen",
      "sectionLabel": "Gibt es spezifische Lernbedürfnisse oder Formate?",
      "speechDisorders": "Sprachstörungen",
      "learningDisorders": "Lernschwächen",
      "helpWithHomework": "Hausaufgabenhilfe",
      "homeSchooling": "Häuslicher Unterricht",
      "appendText": "Spezielle Anforderungen an die Nachhilfe umfassen: {needs}."
    },
    "specialRequirements": {
      "pillLabel": "Spezielle Anforderungen",
      "modalTitle": "Spezielle Anforderungen",
      "sectionLabel": "Erfordert die Pflege spezifische Erfahrungen oder Fähigkeiten?",
      "keepingCompany": "Gesellschaft leisten",
      "alzheimers": "Alzheimer-Erkrankung",
      "parkinsons": "Parkinson-Erkrankung",
      "diabetes": "Diabetes",
      "dementia": "Demenz",
      "mobilityIssues": "Mobilitätseinschränkungen",
      "personalHygiene": "Körperpflege",
      "mealPreparation": "Zubereitung von Mahlzeiten",
      "doctorAppointments": "Begleitung zu Arztterminen",
      "physiotherapy": "Physiotherapie",
      "artTherapy": "Kunsttherapie",
      "appendText": "Spezielle Anforderungen an die Betreuung umfassen: {requirements}."
    },
    "extraTasks": {
      "pillLabel": "Zusatzaufgaben",
      "modalTitle": "Zusatzaufgaben",
      "sectionLabel": "Haben Sie spezielle Reinigungswünsche?",
      "ironing": "Bügeln",
      "laundry": "Wäsche waschen",
      "windowCleaning": "Fensterreinigung",
      "airbnbCleaning": "Reinigung von Airbnb / Apartments",
      "carCleaning": "Autoreinigung",
      "moveCleaning": "Einzugs- / Auszugsreinigung",
      "upholsteryCleaning": "Polsterreinigung",
      "lightMaintenance": "Leichte Instandhaltung",
      "gardenHelp": "Gartenarbeit",
      "appendText": "Wir würden uns auch über Hilfe freuen bei: {tasks}."
    },
    "petsAtHome": {
      "pillLabel": "Haustiere im Haus",
      "modalTitle": "Haustiere im Haus",
      "sectionLabel": "Gibt es Tiere im Haushalt?",
      "dogs": "Hunde",
      "cats": "Katzen",
      "other": "Andere",
      "none": "Keine",
      "appendText": "Es befinden sich Haustiere im Haus: {pets}.",
      "appendNoneText": "Es befinden sich keine Haustiere im Haus."
    },
    "dogSize": {
      "pillLabel": "Hundegröße",
      "modalTitle": "Hundegröße",
      "sectionLabel": "Wie groß ist Ihr Hund?",
      "small": "Klein (bis 5 kg)",
      "medium": "Mittel (bis 25 kg)",
      "large": "Groß (bis 40 kg)",
      "huge": "Sehr groß (über 40 kg)",
      "appendText": "Unser Hund ist: {sizes}."
    },
    "dogAge": {
      "pillLabel": "Hundealter",
      "modalTitle": "Hundealter",
      "sectionLabel": "Wie alt ist Ihr Hund?",
      "puppy": "Welpe",
      "adult": "Ausgewachsen",
      "senior": "Senior",
      "puppyExtraAttention": "Der Welpe benötigt erhöhte Aufmerksamkeit",
      "seniorSpecialCare": "Der Hund benötigt besondere Pflege",
      "puppySummary": "ein Welpe",
      "adultSummary": "ein ausgewachsener Hund",
      "seniorSummary": "ein Senior-Hund",
      "appendText": "Unser Hund ist {age}.",
      "appendPuppyExtraText": "Der Welpe benötigt erhöhte Aufmerksamkeit.",
      "appendSeniorExtraText": "Der Hund benötigt besondere Pflege."
    },
    "dogPersonality": {
      "pillLabel": "Charakter des Hundes",
      "modalTitle": "Hundecharakter",
      "sectionLabel": "Wie ist Ihr Hund vom Wesen her?",
      "highEnergy": "Sehr aktiv",
      "calm": "Ruhig",
      "playful": "Verspielt",
      "protective": "Beschützerinstinkt",
      "social": "Sozial/Freundlich",
      "curious": "Neugierig",
      "stubborn": "Eigensinnig",
      "wellTrained": "Gut erzogen",
      "intelligent": "Intelligent",
      "dogFriendlyLabel": "Ist Ihr Hund verträglich mit anderen Hunden?",
      "dogFriendlyYes": "Ja, sehr freundlich",
      "dogFriendlyNo": "Nein, ist lieber allein",
      "kidsFriendlyLabel": "Ist Ihr Hund kinderlieb?",
      "kidsFriendlyYes": "Ja, liebt Kinder",
      "kidsFriendlyNo": "Nein, nicht an Kinder gewöhnt",
      "appendTraitsText": "Unser Hund ist: {traits}.",
      "appendDogFriendlyYes": "Unser Hund ist sehr freundlich zu anderen Hunden.",
      "appendDogFriendlyNo": "Unser Hund ist in der Nähe anderer Hunde lieber allein.",
      "appendKidsFriendlyYes": "Unser Hund ist kinderlieb.",
      "appendKidsFriendlyNo": "Unser Hund ist nicht an Kinder gewöhnt."
    },
    "healthDiet": {
      "pillLabel": "Gesundheit & Ernährung",
      "modalTitle": "Gesundheit & Ernährung",
      "diet": {
        "sectionLabel": "Spezielle Diät oder Allergien?",
        "items": [
          {
            "key": "standardDiet",
            "label": "Normale Ernährung",
            "sub": "Keine Einschränkungen"
          },
          {
            "key": "specialDiet",
            "label": "Spezielle Ernährung / Allergien",
            "sub": "Getreidefrei, Rohfütterung (BARF), bestimmte Marke etc."
          },
          {
            "key": "noTreats",
            "label": "Streng: Keine Leckerlis",
            "sub": "Hunde mit sensiblem Magen oder Gewichtsproblemen"
          }
        ]
      },
      "health": {
        "sectionLabel": "Hat Ihr Hund gesundheitliche Bedürfnisse?",
        "items": [
          {
            "key": "medication",
            "label": "Hilfe bei Medikamentengabe",
            "sub": "Sitter:in muss Tabletten, Tropfen oder Spritzen verabreichen"
          },
          {
            "key": "mobility",
            "label": "Mobilitäts- oder Bewegungsbedarf",
            "sub": "Schwierigkeiten beim Treppensteigen, nur kurze Spaziergänge oder Gelenkprobleme"
          },
          {
            "key": "medicalHistory",
            "label": "Krankengeschichte",
            "sub": "Anfälle, Angstzustände oder spezifische chronische Leiden"
          }
        ]
      },
      "appendDietText": "Unser Hund hat folgende Ernährungsvorlieben oder Einschränkungen: {diet}.",
      "appendHealthText": "Unser Hund hat folgende gesundheitliche Bedürfnisse: {health}."
    },
    "typeCare": {
      "pillLabel": "Art der Betreuung",
      "modalTitle": "Betreuungsart",
      "sectionLabel": "Welche Hilfe benötigt Ihr Tier?",
      "items": [
        {
          "key": "walking",
          "label": "Gassigehen",
          "sub": "Spaziergänge und regelmäßiger Auslauf"
        },
        {
          "key": "sittingAtMyHome",
          "label": "Betreuung bei mir zu Hause",
          "sub": "Sitter:in bleibt bei Ihnen zu Hause, um das Tier zu versorgen"
        },
        {
          "key": "stayingAtSitterHome",
          "label": "Aufenthalt bei der/dem Sitter:in",
          "sub": "Ihr Haustier wohnt bei der/dem Sitter:in zu Hause"
        },
        {
          "key": "holidayCare",
          "label": "Urlaubsbetreuung",
          "sub": "Längere oder durchgehende Betreuung während Ihrer Abwesenheit"
        }
      ],
      "appendText": "Wir suchen folgende Art der Tierbetreuung: {types}."
    },
    "gradeLevels": {
      "pillLabel": "Bildungsstufe",
      "modalTitle": "Schulstufe",
      "sectionLabel": "Um welches Bildungsniveau handelt es sich?",
      "items": [
        {
          "key": "preschool",
          "label": "Vorschule"
        },
        {
          "key": "elementary",
          "label": "Volksschule"
        },
        {
          "key": "secondary",
          "label": "Mittelschule / AHS"
        }
      ],
      "appendText": "Die Schulstufe ist: {levels}."
    },
    "entranceExams": {
      "pillLabel": "Aufnahmeprüfungen",
      "modalTitle": "Prüfungen",
      "sectionLabel": "Vorbereitung auf Prüfungen?",
      "items": [
        {
          "key": "primaryAdmissions",
          "label": "Aufnahme in die Volksschule"
        },
        {
          "key": "highSchoolAdmissions",
          "label": "Gymnasium-Aufnahmeprüfungen"
        },
        {
          "key": "schoolLeaving",
          "label": "Matura-Prüfungen"
        },
        {
          "key": "otherTests",
          "label": "Andere Tests & Prüfungen"
        }
      ],
      "appendText": "Wir bereiten uns vor auf: {exams}."
    },
    "schedule": {
      "pillLabel": "Zeitplan",
      "modalTitle": "Zeitplan",
      "sectionLabel": "Wann soll die erste Einheit stattfinden?",
      "timeLabel": "Bevorzugte Tageszeit wählen",
      "optional": "(optional)",
      "items": [
        {
          "key": "morning",
          "label": "Vormittag"
        },
        {
          "key": "afternoon",
          "label": "Nachmittag"
        },
        {
          "key": "evening",
          "label": "Abend"
        }
      ],
      "appendText": "Die erste Einheit soll idealerweise am {date} stattfinden.",
      "appendTextWithTimes": "Die erste Einheit soll idealerweise am {date} stattfinden, vorzugsweise am {times}."
    },
    "teachingStyle": {
      "pillLabel": "Unterrichtsstil",
      "modalTitle": "Lernmethode",
      "sectionLabel": "Welchen Unterrichtsstil bevorzugen Sie?",
      "traditional": "Traditionell",
      "forestSchool": "Waldorfpädagogik / Naturverbunden",
      "montessori": "Montessori",
      "waldorf": "Waldorf",
      "appendText": "Unser bevorzugter Unterrichtsstil ist: {styles}."
    },
    "cleaningSupplies": {
      "pillLabel": "Reinigungsmittel",
      "modalTitle": "Reinigungsmittel",
      "sectionLabel": "Wer stellt die Reinigungsmittel bereit?",
      "noPreference": "Keine Präferenz",
      "familyProvides": "Wird von uns gestellt",
      "sitterProvides": "Sitter:in bringt sie mit",
      "familyProvidesSummary": "die Familie",
      "sitterProvidesSummary": "die/der Sitter:in",
      "appendText": "Reinigungsmittel werden von {provider} bereitgestellt.",
      "appendNoPreferenceText": "Wir haben keine Präferenz bezüglich der Bereitstellung der Reinigungsmittel."
    },
    "daysTimes": {
      "pillLabel": "Tage & Zeiten",
      "modalTitle": "Wann und wie oft?",
      "appendNotSureText": "Wir sind bezüglich der Tage und Zeiten noch flexibel.",
      "appendRegularText": "Wir suchen regelmäßige Hilfe.",
      "appendRegularWithDetails": "Wir suchen regelmäßige Hilfe: {details}.",
      "appendLongtermText": "Wir suchen langfristige Unterstützung.",
      "appendOneTimeText": "Wir benötigen einmalige Hilfe am {date} von {fromTime} bis {toTime}.",
      "appendOneTimeOvernightText": "Wir benötigen eine einmalige Übernachtungsbetreuung von {fromDate} {fromTime} bis {toDate} {toTime}."
    },
    "specialOccasions": {
      "pillLabel": "Besondere Anlässe",
      "modalTitle": "Besondere Anlässe",
      "sectionLabel": "Benötigen Sie Hilfe für ein Event?",
      "parties": "Partys",
      "holidays": "Feiertage / Ferien",
      "overnightCare": "Betreuung über Nacht",
      "childrensGroups": "Kindergruppen",
      "weddings": "Hochzeiten",
      "appendText": "Wir würden uns auch über Unterstützung bei besonderen Anlässen freuen, wie: {occasions}."
    },
    "skillsTalents": {
      "pillLabel": "Fähigkeiten",
      "modalTitle": "Bevorzugte Talente",
      "sectionLabel": "In welche Aktivitäten soll die/der Sitter:in einbezogen werden?",
      "singing": "Singen",
      "music": "Musik machen",
      "sports": "Sport",
      "dramaDance": "Theater oder Tanz",
      "artsCrafts": "Basteln und Werken",
      "extraLabel": "Noch etwas?",
      "extraPlaceholder": "z. B. Backen, Schach, Yoga...",
      "appendText": "Es wäre toll, wenn die/der Sitter:in Aktivitäten unterstützen könnte wie: {skills}.",
      "appendExtraText": "Zusätzliche Aktivitäten, die uns wichtig sind: {note}."
    },
    "parentingStyle": {
      "pillLabel": "Erziehungsstil",
      "modalTitle": "Erziehungsphilosophie",
      "sectionLabel": "Welchen Erziehungsansatz pflegen Sie zu Hause? Wir suchen Sitter:innen, die Ihre Werte teilen.",
      "traditional": "Traditionell",
      "respectfulParenting": "Bedürfnisorientierte Erziehung",
      "forestSchool": "Waldorforientiert / Naturverbunden",
      "montessori": "Montessori",
      "waldorf": "Waldorf",
      "appendText": "Unser Erziehungsstil entspricht am ehesten: {styles}."
    },
    "price": {
      "modalTitle": "Geben Sie Ihre Preisvorstellung ein",
      "label": "Preis festlegen",
      "appendText": "Wir bieten {price} an."
    }
  },
  "locationTutoring": {
    "heroTitle": "Wo soll die Nachhilfe stattfinden?",
    "heroSub": "Wo sollen die Unterrichtseinheiten abgehalten werden?",
    "sectionLabel": "Wählen Sie einen oder mehrere Standorte",
    "studentPlace": "Beim Schützling zu Hause",
    "tutorPlace": "Beim Nachhilfelehrer zu Hause",
    "online": "Online (Video-Unterricht)",
    "validationAlert": "Bitte wählen Sie mindestens einen Standort aus"
  },
  "subjects": {
    "heroTitle": "Fächer",
    "heroSub": "Wählen Sie ein oder mehrere Fächer aus",
    "languagesLabel": "Sprachen",
    "scienceLabel": "Naturwissenschaften",
    "musicLabel": "Musik",
    "moreLanguages": "+ weitere Sprachen",
    "moreMusic": "+ weitere Instrumente",
    "otherLabel": "Jedes andere Fach",
    "otherPlaceholder": "Programmieren, Tanz, Geschichte...",
    "cs": "Tschechisch",
    "en": "Englisch",
    "de": "Deutsch",
    "fr": "Französisch",
    "it": "Italienisch",
    "es": "Spanisch",
    "physics": "Physik",
    "math": "Mathematik",
    "chemistry": "Chemie",
    "biology": "Biologie",
    "singing": "Gesang",
    "piano": "Klavier",
    "guitar": "Gitarre"
  },
  "contact": {
    "heroTitle": "Ihr Name und Ihre E-Mail",
    "heroSub": "Damit wir Ihnen die Antworten der Sitter:innen zustellen können.",
    "nameLabel": "Vollständiger Name",
    "namePlaceholder": "z. B. Erika Mustermann",
    "emailLabel": "E-Mail",
    "emailPlaceholder": "erika.mustermann@beispiel.at",
    "emailPrefsLabel": "Wählen Sie aus, welche E-Mails Sie erhalten möchten",
    "emailMonthly": "Monatliche Inspiration zu passenden Themen",
    "emailOffers": "Rabatte und Angebote von Sitters.at und Partnern"
  },
  "phone": {
    "heroTitle": "Telefonnummer",
    "heroSub": "Ihre private Nummer inklusive Ländervorwahl. Die Angabe hilft Ihnen, schneller Rückmeldungen zu erhalten.",
    "inputLabel": "Telefonnummer",
    "inputPlaceholder": "+43 664 123 4567",
    "skipLink": "Später erledigen"
  },
  "success": {
    "heroTitle": "Das war's!",
    "heroSub": "Ihre Jobanzeige für {city} wurde veröffentlicht.",
    "body": "Wir teilen Ihre Anzeige mit Sitter:innen in Ihrer Umgebung. Antworten erscheinen in Ihren Nachrichten, und wir benachrichtigen Sie bei jedem neuen Eingang.",
    "btnContinue": "Weiter",
    "editLink": "Jobanzeige bearbeiten"
  },
  "children": {
    "modalTitle": "Informationen zu den Kindern",
    "sectionLabel": "Auf wie viele Kinder soll aufgepasst werden?",
    "helperText": "Geben Sie Alter und Geschlecht an, damit Sitter:innen eine klare Vorstellung von der Aufgabe bekommen.",
    "childLabel": "Kind",
    "boy": "Bub",
    "girl": "Mädchen",
    "ageLabel": "Alter",
    "monthSingular": "Monat",
    "monthPlural": "Monate",
    "yearSingular": "Jahr",
    "yearPlural": "Jahre",
    "appendText": "Wir haben {desc}.",
    "summaryBoy": "einen Buben ({ageLabel})",
    "summaryGirl": "ein Mädchen ({ageLabel})",
    "and": "und",
    "childOrdinals": [
      "1.",
      "2.",
      "3.",
      "4.",
      "5.+"
    ],
    "pillLabel": "Kinder",
    "years": "Jahre"
  },
  "childrenTutor": {
    "modalTitle": "Informationen für Schützlinge",
    "sectionLabel": "Wie viele Schüler:innen benötigen Nachhilfe?",
    "childLabel": "Schüler:in",
    "boy": "Bub",
    "girl": "Mädchen",
    "ageLabel": "Alter",
    "lessThanTwo": "unter 2",
    "yearSingular": "Jahr",
    "yearPlural": "Jahre",
    "appendText": "Wir suchen Nachhilfe für {desc}.",
    "summaryBoy": "einen Buben ({ageLabel})",
    "summaryGirl": "ein Mädchen ({ageLabel})",
    "and": "und",
    "childOrdinals": [
      "1.",
      "2.",
      "3.",
      "4.",
      "5.+"
    ],
    "pillLabel": "Schüler:innen"
  },
  "transport": {
    "pillLabel": "Transport",
    "modalTitle": "Ort & Anfahrt",
    "modalTitleSenior": "Transport & Reisen",
    "appendText": "Es wäre zudem hilfreich, wenn die/der Sitter:in Folgendes anbietet: {items}.",
    "and": "und",
    "location": {
      "sectionLabel": "Wo benötigen Sie Hilfe?",
      "items": {
        "atMyHome": {
          "label": "Bei mir zu Hause",
          "summary": "Betreuung bei uns zu Hause"
        },
        "atSitterHome": {
          "label": "Bei der/dem Sitter:in zu Hause",
          "summary": "die Option der Betreuung bei der/dem Sitter:in"
        }
      }
    },
    "driver": {
      "sectionLabel": "Fahrer:in benötigt?",
      "items": {
        "hasCar": {
          "label": "Sitter:in hat ein eigenes Auto",
          "summary": "ein eigenes Auto"
        },
        "comfortableDriving": {
          "label": "Sitter:in kann Kinder im Auto mitnehmen",
          "sub": "(Sitter:in besitzt einen gültigen Führerschein und hat Erfahrung beim Transport von Kindern)",
          "summary": "einen gültigen Führerschein und Erfahrung beim Transport von Kindern"
        }
      }
    },
    "driverSenior": {
      "sectionLabel": "Ist Autofahren erforderlich?",
      "items": {
        "hasCar": {
          "label": "Sitter:in hat ein eigenes Auto",
          "summary": "ein eigenes Auto"
        },
        "comfortableDriving": {
          "label": "Sitter:in kann Senioren im Auto begleiten",
          "sub": "Sitter:in besitzt einen gültigen Führerschein und Erfahrung beim Transport von Senioren (z. B. zu Arztterminen oder Erledigungen).",
          "summary": "einen gültigen Führerschein und Erfahrung beim Begleiten von Senioren"
        }
      }
    }
  },
  "onboarding": {
    "navTitle": "Willkommen",
    "title": "Passende Sitter:innen für Ihre Wünsche",
    "sub": "👶 Erfahren, in Teilzeit verfügbar und passend für alle Altersgruppen",
    "verified": "Verifiziert",
    "readMore": "mehr lesen",
    "showMore": "Weitere Sitter:innen anzeigen",
    "ctaText": "Sofortiger Zugang zu Sitter:innen – werden Sie jetzt Mitglied!",
    "ctaBtn": "Mitgliedschaftsoptionen ansehen",
    "restart": "Neustart"
  }
});
})();
