// strings_hr.js — Hrvatski
// Published via /strings editor. Missing keys fall back to CZ source (strings.js).
(function(){
  function _dm(b,o){var r=Object.assign({},b||{});Object.keys(o).forEach(function(k){r[k]=(o[k]&&typeof o[k]==="object"&&!Array.isArray(o[k]))?_dm((b&&b[k])||{},o[k]):o[k];});return r;}
  window.STRINGS = _dm(window.STRINGS, {
  "nav": {
    "title": "Izradite novu ponudu za posao",
    "btnPrev": "Natrag",
    "btnNext": "Nastavi",
    "cancelConfirm": "Želite li prekinuti izradu ove ponude za posao?"
  },
  "exitModal": {
    "title": "Još vas samo jedan korak dijeli od objave",
    "body": "Nemojte sada odustati. Ispunite obrazac kako biste dobili ponude od siterica koje najbolje odgovaraju vašim potrebama.",
    "leave": "Napusti",
    "stay": "Pogledaj ponude"
  },
  "service": {
    "heroTitle": "Koga tražite?",
    "heroSub": "Odaberite kakva vam je pomoć potrebna.",
    "sectionLabel": "Odaberite kakva vam je pomoć potrebna.",
    "validationAlert": "Molimo odaberite barem jednu uslugu",
    "babysitting": "Čuvanje djece",
    "cleaning": "Čišćenje kućanstva",
    "pet": "Briga o kućnim ljubimcima",
    "senior": "Briga o starijim osobama",
    "tutoring": "Podučavanje"
  },
  "location": {
    "heroSub": "Točna lokacija ostat će privatna, no svejedno ćemo vam pokazati najbolje rezultate u blizini.",
    "inputLabel": "Lokacija",
    "inputPlaceholder": "npr. Zagreb, Hrvatska",
    "hint": "Točna adresa bit će skrivena.",
    "validationAlert": "Molimo odaberite svoju lokaciju",
    "titlePrefix": "Gdje trebate",
    "titleFallback": "pomoć",
    "titleAnd": "i",
    "serviceNames": {
      "babysitting": "čuvanje djece",
      "cleaning": "čišćenje kućanstva",
      "pet": "brigu o ljubimcima",
      "senior": "brigu o starijima",
      "tutoring": "podučavanje"
    }
  },
  "price": {
    "heroTitle": "Fiksna cijena po satu ili po dogovoru?",
    "inputLabel": "Postavite svoju cijenu",
    "inputPlaceholder": "npr. 10 € po satu, 80 € po danu...",
    "averageHint": "Prosječna cijena u vašem području je 10 € po satu",
    "placeholderFallback": "10 € po satu"
  },
  "cleaning": {
    "heroTitle": "Što je potrebno očistiti?",
    "heroSub": "Pripremit ćemo nacrt posla na temelju vašeg odabira.",
    "sectionLabel": "Što trebate očistiti?",
    "flat": "Stan",
    "house": "Kuća"
  },
  "cleaningExtras": {
    "heroTitle": "Trebate li pomoć s još nečim?",
    "heroSub": "Na temelju vašeg odabira izradit ćemo prijedlog oglasa.",
    "sectionLabel": "Odaberite dodatne usluge",
    "optional": "(neobavezno)",
    "ironing": "Peglanje",
    "laundry": "Pranje rublja",
    "windowCleaning": "Pranje prozora",
    "airbnbCleaning": "Čišćenje apartmana / najma za odmor",
    "carCleaning": "Pranje automobila",
    "moveCleaning": "Čišćenje prije ili nakon selidbe",
    "upholsteryCleaning": "Čišćenje tapeciranog namještaja",
    "lightMaintenance": "Sitni popravci u kući",
    "gardenHelp": "Pomoć u vrtu"
  },
  "pet": {
    "heroTitle": "Vaš ljubimac",
    "heroSub": "Pripremit ćemo nacrt posla na temelju vašeg odabira.",
    "sectionLabel": "Kojim je ljubimcima potrebna briga?",
    "dogs": "Psi",
    "cats": "Mačke",
    "other": "Ostalo",
    "largePet": "Imam velikog psa",
    "validationAlert": "Molimo odaberite barem jednog ljubimca"
  },
  "seniorCare": {
    "heroTitle": "Detalji o skrbi",
    "heroSub": "Ove informacije pomažu nam pronaći najbolju osobu za vaše najmilije.",
    "careTypeLabel": "Koju vrstu skrbi tražite?",
    "notSure": "Nisam siguran/na",
    "notSureSub": "Možete odrediti kasnije",
    "liveIn": "Cjelodnevna skrb (24/7)",
    "liveInSub": "Potpuna podrška uz boravak siterice u kućanstvu.",
    "fullTime": "Skrb na puno radno vrijeme",
    "fullTimeSub": "Svakodnevna podrška, obično 35 – 40 sati tjedno.",
    "partTime": "Povremeni posjeti",
    "partTimeSub": "Fleksibilna ili povremena pomoć prema potrebi.",
    "holidayCare": "Privremena skrb",
    "holidayCareSub": "Kratkotrajna pomoć radi odmora primarnog skrbnika."
  },
  "frequencyPet": {
    "heroTitle": "Kada i gdje?",
    "heroSub": "💡 Dodirnite ljubičaste oznake za više detalja:",
    "howOftenLabel": "Koliko često trebate pomoć?",
    "notSureYet": "još ne znam",
    "onetime": "Jednokratno (npr. tijekom godišnjeg odmora)",
    "regularly": "redovito",
    "whereLabel": "Gdje je potrebna skrb?",
    "atMyHome": "Kod nas doma",
    "atSitterHome": "Kod siterice doma",
    "dontCare": "Svejedno mi je"
  },
  "frequency": {
    "heroTitle": "Kada i koliko često?",
    "heroSub": "Tražite li jednokratnu ili redovitu pomoć?",
    "sectionLabel": "Koliko često trebate pomoć?",
    "regularly": "redovito",
    "onetime": "jednokratno",
    "daysLabel": "Odaberite željene dane",
    "optional": "(neobavezno)",
    "days": {
      "mo": "Pon",
      "tu": "Uto",
      "we": "Sri",
      "th": "Čet",
      "fr": "Pet",
      "sa": "Sub",
      "su": "Ned"
    },
    "freqLabel": "Odaberite učestalost",
    "freqOptions": [
      "Jednom tjedno",
      "Dvaput tjedno",
      "Svaki dan",
      "Svaka dva tjedna",
      "Jednom mjesečno"
    ],
    "dateLabel": "Navedite datum i vrijeme",
    "datePlaceholder": "npr. svaki ponedjeljak 16:00 – 20:00 i petak 14:00 – 18:00, od idućeg mjeseca",
    "notsure": "još ne znam",
    "dateLabelRegular": "Navedite datum i vrijeme",
    "longterm": "Tražim dugoročnu pomoć"
  },
  "review": {
    "heroTitle": "Nova ponuda",
    "heroSub1": "Skoro ste gotovi!",
    "heroSub2": "Pronašli smo 128 siterica koje odgovaraju vašim kriterijima 🎉",
    "aiLabel": "💡 Dodirnite ljubičaste oznake za više detalja:",
    "multiHeroTitle": "Dodajte više detalja o poslu",
    "multiHeroSub1": "Dijeli vas samo jedan korak.",
    "multiHeroSub2": "Vašu ponudu podijelit ćemo sa 128 siterica u vašoj blizini.",
    "multiLabel": "Opis posla",
    "multiPlaceholder": "Pozdrav sitericama, tražimo pomoć za {services} u mjestu {location}. Naša očekivana cijena je oko {price}",
    "privacyNote": "Vaši osobni podaci ostaju privatni i ne prikazuju se sitericama.",
    "btnPost": "Objavi posao",
    "footerNote": "Objavljivanje je besplatno. Izradit ćemo vam račun za sigurno upravljanje ponudom.",
    "generatedTexts": {
      "babysitting": "Tražimo brižnu i pouzdanu osobu za čuvanje naše djece. Potrebna nam je redovita pomoć te tražimo nekoga tko je iskusan i prijateljski nastrojen.",
      "cleaning": "Potrebna nam je pomoć s redovitim čišćenjem kućanstva. Živimo u stanu te bismo cijenili i dodatnu pomoć oko peglanja i pranja rublja.",
      "pet": "Tražimo odgovornu osobu s iskustvom koja bi čuvala našeg psa tijekom godišnjeg odmora. Briga bi se odvijala u našem domu.",
      "senior": "Tražimo ljubaznu i odgovornu osobu za skrb o starijem članu obitelji. Cilj je svakodnevna pomoć i osiguravanje udobnosti doma.",
      "tutoring": "Tražimo iskusnog podučavatelja koji bi pomogao našem djetetu sa školskim predmetima i pripremama za ispite. Važni su nam strpljenje i prilagodljivost."
    },
    "hintLabel": "Savjet: dodajte više detalja svom zahtjevu",
    "pillLanguage": "jezik",
    "pillNeeds": "posebne potrebe",
    "pillPrice": "cijena",
    "modalCancel": "Odustani",
    "modalAdd": "Dodaj u ponudu",
    "language": {
      "modalTitle": "Jezici siterice",
      "sectionLabel": "Koje jezike bi siterica trebala govoriti?",
      "cs": "Češki",
      "sk": "Slovački",
      "en": "Engleski",
      "de": "Njemački",
      "es": "Španjolski",
      "fr": "Francuski",
      "it": "Talijanski",
      "uk": "Ukrajinski",
      "moreLangs": "+ više jezika",
      "appendText": "Preferiramo sitericu koja govori: {langs}."
    },
    "languageTutor": {
      "modalTitle": "Jezici podučavatelja",
      "sectionLabel": "Koje jezike bi podučavatelj trebao govoriti?",
      "moreLangs": "+ više jezika",
      "appendText": "Preferiramo podučavatelja koji govori: {langs}."
    },
    "needs": {
      "modalTitle": "Posebne potrebe",
      "sectionLabel": "Postoje li posebne potrebe koje želite spomenuti?",
      "autism": "Spektar autizma",
      "diabetes": "Dijabetes",
      "asthma": "Astma",
      "adhd": "ADHD/ADD",
      "allergies": "Alergije na hranu",
      "childhood": "Uobičajene dječje bolesti",
      "sleep": "Poremećaji spavanja",
      "vision": "Oštećenja vida",
      "hearing": "Oštećenja sluha",
      "epilepsy": "Epilepsija",
      "other": "Ostale potrebe",
      "appendText": "Naše dijete ima posebne potrebe: {needs}."
    },
    "needsTutor": {
      "modalTitle": "Posebni zahtjevi",
      "sectionLabel": "Postoje li specifične potrebe pri učenju ili željenom formatu?",
      "speechDisorders": "Govorni poremećaji",
      "learningDisorders": "Poteškoće u učenju",
      "helpWithHomework": "Pomoć s domaćom zadaćom",
      "homeSchooling": "Školovanje kod kuće",
      "appendText": "Posebni zahtjevi za podučavanje uključuju: {needs}."
    },
    "specialRequirements": {
      "pillLabel": "posebni zahtjevi",
      "modalTitle": "Posebni zahtjevi",
      "sectionLabel": "Zahtijeva li skrb specifično iskustvo ili vještine?",
      "keepingCompany": "Pravljenje društva",
      "alzheimers": "Alzheimerova bolest",
      "parkinsons": "Parkinsonova bolest",
      "diabetes": "Dijabetes",
      "dementia": "Demencija",
      "mobilityIssues": "Poteškoće s kretanjem",
      "personalHygiene": "Osobna higijena",
      "mealPreparation": "Priprema obroka",
      "doctorAppointments": "Pratnja liječniku",
      "physiotherapy": "Fizioterapija",
      "artTherapy": "Art terapija",
      "appendText": "Posebni zahtjevi za skrb uključuju: {requirements}."
    },
    "extraTasks": {
      "pillLabel": "dodatni zadaci",
      "modalTitle": "Dodatni zadaci",
      "sectionLabel": "Imate li posebne zahtjeve za čišćenje?",
      "ironing": "Peglanje",
      "laundry": "Pranje rublja",
      "windowCleaning": "Pranje prozora",
      "airbnbCleaning": "Čišćenje apartmana / Airbnb",
      "carCleaning": "Pranje automobila",
      "moveCleaning": "Čišćenje kod selidbe",
      "upholsteryCleaning": "Čišćenje tapeciranog namještaja",
      "lightMaintenance": "Sitni popravci u kući",
      "gardenHelp": "Pomoć u vrtu",
      "appendText": "Također bismo cijenili pomoć oko: {tasks}."
    },
    "petsAtHome": {
      "pillLabel": "ljubimci u domu",
      "modalTitle": "Ljubimci u domu",
      "sectionLabel": "Imate li životinje kod kuće?",
      "dogs": "Psi",
      "cats": "Mačke",
      "other": "Ostalo",
      "none": "Nema ih",
      "appendText": "U domu se nalaze ljubimci: {pets}.",
      "appendNoneText": "U domu nema kućnih ljubimaca."
    },
    "dogSize": {
      "pillLabel": "veličina psa",
      "modalTitle": "Veličina psa",
      "sectionLabel": "Koliko je velik vaš pas?",
      "small": "Mali (do 5 kg)",
      "medium": "Srednji (do 25 kg)",
      "large": "Veliki (do 40 kg)",
      "huge": "Vrlo veliki (preko 40 kg)",
      "appendText": "Naš pas je: {sizes}."
    },
    "dogAge": {
      "pillLabel": "dob psa",
      "modalTitle": "Dob psa",
      "sectionLabel": "Koliko je star vaš pas?",
      "puppy": "Štene",
      "adult": "Odrastao pas",
      "senior": "Stariji pas",
      "puppyExtraAttention": "Štene zahtijeva dodatnu pažnju",
      "seniorSpecialCare": "Pas zahtijeva posebnu skrb",
      "puppySummary": "štene",
      "adultSummary": "odrastao pas",
      "seniorSummary": "stariji pas",
      "appendText": "Naš pas je {age}.",
      "appendPuppyExtraText": "Štene zahtijeva dodatnu pažnju.",
      "appendSeniorExtraText": "Pas zahtijeva posebnu skrb."
    },
    "dogPersonality": {
      "pillLabel": "osobnost psa",
      "modalTitle": "Osobnost psa",
      "sectionLabel": "Kakve je naravi vaš pas?",
      "highEnergy": "Vrlo energičan",
      "calm": "Miran",
      "playful": "Razigran",
      "protective": "Zaštitnički nastrojen",
      "social": "Društven / Prijateljski",
      "curious": "Znatiželjan",
      "stubborn": "Tvrdoglav",
      "wellTrained": "Dobro dresiran",
      "intelligent": "Inteligentan",
      "dogFriendlyLabel": "Slaže li se s drugim psima?",
      "dogFriendlyYes": "Da, vrlo je prijateljski raspoložen",
      "dogFriendlyNo": "Ne, radije je sam",
      "kidsFriendlyLabel": "Slaže li se s djecom?",
      "kidsFriendlyYes": "Da, voli djecu",
      "kidsFriendlyNo": "Ne, nije navikao na djecu",
      "appendTraitsText": "Naš pas je: {traits}.",
      "appendDogFriendlyYes": "Naš pas je vrlo prijateljski raspoložen prema drugim psima.",
      "appendDogFriendlyNo": "Naš pas radije boravi sam bez prisutnosti drugih pasa.",
      "appendKidsFriendlyYes": "Naš pas se odlično slaže s djecom.",
      "appendKidsFriendlyNo": "Naš pas nije navikao na društvo djece."
    },
    "healthDiet": {
      "pillLabel": "zdravlje i prehrana",
      "modalTitle": "Zdravlje i prehrana",
      "diet": {
        "sectionLabel": "Ima li pas posebnu prehranu ili alergije?",
        "items": [
          {
            "key": "standardDiet",
            "label": "Standardna prehrana",
            "sub": "Bez ograničenja"
          },
          {
            "key": "specialDiet",
            "label": "Posebna prehrana / Alergije",
            "sub": "Prehrana bez žitarica, sirova hrana (BARF), specifičan brend itd."
          },
          {
            "key": "noTreats",
            "label": "Strogo: Bez poslastica",
            "sub": "Psi s osjetljivim želucem ili potrebom za kontrolom težine"
          }
        ]
      },
      "health": {
        "sectionLabel": "Ima li vaš pas specifične zdravstvene potrebe?",
        "items": [
          {
            "key": "medication",
            "label": "Davanje lijekova",
            "sub": "Siterica će morati davati tablete, kapi ili injekcije"
          },
          {
            "key": "mobility",
            "label": "Potrebe vezane uz kretanje",
            "sub": "Teškoće s penjanjem uz stepenice, potrebne su isključivo kratke šetnje ili ima problema sa zglobovima"
          },
          {
            "key": "medicalHistory",
            "label": "Povijest bolesti",
            "sub": "Povijest napadaja, tjeskobe ili specifičnih kroničnih stanja"
          }
        ]
      },
      "appendDietText": "Naš pas ima ove prehrambene navike ili ograničenja: {diet}.",
      "appendHealthText": "Naš pas ima ove specifične zdravstvene potrebe: {health}."
    },
    "typeCare": {
      "pillLabel": "vrsta skrbi",
      "modalTitle": "Vrsta skrbi",
      "sectionLabel": "Kakva je pomoć potrebna vašem ljubimcu?",
      "items": [
        {
          "key": "walking",
          "label": "Šetanje",
          "sub": "Šetnje i odlasci na obavljanje nužde"
        },
        {
          "key": "sittingAtMyHome",
          "label": "Čuvanje kod nas doma",
          "sub": "Siterica boravi u vašem domu kako bi se brinula o ljubimcu"
        },
        {
          "key": "stayingAtSitterHome",
          "label": "Boravak kod siterice doma",
          "sub": "Vaš ljubimac boravi u domu siterice"
        },
        {
          "key": "holidayCare",
          "label": "Skrb tijekom godišnjeg odmora",
          "sub": "Duža ili kontinuirana skrb dok ste odsutni"
        }
      ],
      "appendText": "Tražimo ovu vrstu skrbi za ljubimca: {types}."
    },
    "gradeLevels": {
      "pillLabel": "obrazovna razina",
      "modalTitle": "Razina obrazovanja",
      "sectionLabel": "O kojoj se obrazovnoj razini radi?",
      "items": [
        {
          "key": "preschool",
          "label": "predškolska dob"
        },
        {
          "key": "elementary",
          "label": "osnovna škola"
        },
        {
          "key": "secondary",
          "label": "srednja škola"
        }
      ],
      "appendText": "Razina obrazovanja je: {levels}."
    },
    "entranceExams": {
      "pillLabel": "prijemni ispiti",
      "modalTitle": "Prijemni ispiti",
      "sectionLabel": "Pripreme za ispite?",
      "items": [
        {
          "key": "primaryAdmissions",
          "label": "upisi u osnovnu školu"
        },
        {
          "key": "highSchoolAdmissions",
          "label": "upisi u srednju školu"
        },
        {
          "key": "schoolLeaving",
          "label": "državna matura"
        },
        {
          "key": "otherTests",
          "label": "ostali testovi i ispiti"
        }
      ],
      "appendText": "Pripremamo se za: {exams}."
    },
    "schedule": {
      "pillLabel": "raspored",
      "modalTitle": "Raspored",
      "sectionLabel": "Kada želite prvi termin?",
      "timeLabel": "Odaberite željeno doba dana",
      "optional": "(neobavezno)",
      "items": [
        {
          "key": "morning",
          "label": "Jutro"
        },
        {
          "key": "afternoon",
          "label": "Poslijepodne"
        },
        {
          "key": "evening",
          "label": "Večer"
        }
      ],
      "appendText": "Prvi termin bi idealno bio: {date}.",
      "appendTextWithTimes": "Prvi termin bi idealno bio: {date}, po mogućnosti: {times}."
    },
    "teachingStyle": {
      "pillLabel": "stil podučavanja",
      "modalTitle": "Stil podučavanja",
      "sectionLabel": "Koji stil podučavanja preferirate?",
      "traditional": "Tradicionalni",
      "forestSchool": "Šumski / Boravak u prirodi",
      "montessori": "Montessori",
      "waldorf": "Waldorf",
      "appendText": "Naš željeni stil podučavanja je: {styles}."
    },
    "cleaningSupplies": {
      "pillLabel": "pribor za čišćenje",
      "modalTitle": "Pribor za čišćenje",
      "sectionLabel": "Tko osigurava sredstva za čišćenje?",
      "noPreference": "Svejedno mi je",
      "familyProvides": "Osigurava obitelj",
      "sitterProvides": "Donosi siterica",
      "familyProvidesSummary": "obitelj",
      "sitterProvidesSummary": "siterica",
      "appendText": "Sredstva za čišćenje osigurava {provider}.",
      "appendNoPreferenceText": "Nemamo specifičnih želja oko toga tko osigurava pribor za čišćenje."
    },
    "daysTimes": {
      "pillLabel": "dani i vrijeme",
      "modalTitle": "Kada i koliko često?",
      "appendNotSureText": "Još uvijek smo fleksibilni oko točnih dana i vremena.",
      "appendRegularText": "Tražimo redovitu pomoć.",
      "appendRegularWithDetails": "Tražimo redovitu pomoć: {details}.",
      "appendLongtermText": "Tražimo dugoročnu pomoć.",
      "appendOneTimeText": "Trebamo jednokratnu pomoć dana {date} od {fromTime} do {toTime}.",
      "appendOneTimeOvernightText": "Trebamo jednokratnu noćnu pomoć od {fromDate} {fromTime} do {toDate} {toTime}."
    },
    "specialOccasions": {
      "pillLabel": "posebne prigode",
      "modalTitle": "Posebne prigode",
      "sectionLabel": "Trebate pomoć za određeni događaj?",
      "parties": "Proslave / Rođendani",
      "holidays": "Praznici / Godišnji odmori",
      "overnightCare": "Čuvanje preko noći",
      "childrensGroups": "Dječje grupe",
      "weddings": "Vjenčanja",
      "appendText": "Također bismo cijenili pomoć u posebnim prigodama kao što su: {occasions}."
    },
    "skillsTalents": {
      "pillLabel": "vještine",
      "modalTitle": "Poželjne vještine i talenti",
      "sectionLabel": "U koje bi aktivnosti željeli uključiti sitericu?",
      "singing": "Pjevanje",
      "music": "Glazba",
      "sports": "Sport",
      "dramaDance": "Gluma ili ples",
      "artsCrafts": "Kreativno stvaralaštvo / Rukotvorine",
      "extraLabel": "Još nešto?",
      "extraPlaceholder": "npr. pečenje kolača, šah, joga...",
      "appendText": "Bilo bi sjajno kada bi siterica mogla podržati aktivnosti poput: {skills}.",
      "appendExtraText": "Dodatne aktivnosti koje su nam važne: {note}."
    },
    "parentingStyle": {
      "pillLabel": "stil odgoja",
      "modalTitle": "Filozofija odgoja",
      "sectionLabel": "Koji pristup koristite u svom domu? Tražit ćemo siterice koje dijele vaše vrijednosti.",
      "traditional": "Tradicionalni",
      "respectfulParenting": "Pristup s uvažavanjem",
      "forestSchool": "Šumski / U prirodi",
      "montessori": "Montessori",
      "waldorf": "Waldorf",
      "appendText": "Naš stil odgoja je najbliži pristupu: {styles}."
    },
    "price": {
      "modalTitle": "Unesite svoja očekivanja oko cijene",
      "label": "Postavi cijenu",
      "appendText": "Nudimo {price}."
    }
  },
  "locationTutoring": {
    "heroTitle": "Gdje želite podučavanje?",
    "heroSub": "Gdje bi se trebali održavati termini?",
    "sectionLabel": "Odaberite jednu ili više lokacija",
    "studentPlace": "Kod učenika doma",
    "tutorPlace": "Kod podučavatelja doma",
    "online": "Online (video pozivi)",
    "validationAlert": "Molimo odaberite barem jednu lokaciju"
  },
  "subjects": {
    "heroTitle": "Predmeti",
    "heroSub": "Odaberite jedan ili više predmeta",
    "languagesLabel": "Jezici",
    "scienceLabel": "Prirodne znanosti",
    "musicLabel": "Glazba",
    "moreLanguages": "+ više jezika",
    "moreMusic": "+ više instrumenata",
    "otherLabel": "Bilo koji drugi predmet",
    "otherPlaceholder": "Programiranje, ples, povijest...",
    "cs": "Češki",
    "en": "Engleski",
    "de": "Njemački",
    "fr": "Francuski",
    "it": "Talijanski",
    "es": "Španjolski",
    "physics": "Fizika",
    "math": "Matematika",
    "chemistry": "Kemija",
    "biology": "Biologija",
    "singing": "Pjevanje",
    "piano": "Klavir",
    "guitar": "Gitara"
  },
  "contact": {
    "heroTitle": "Vaše ime i e-adresa",
    "heroSub": "Kako bismo vam mogli dostaviti odgovore siterica.",
    "nameLabel": "Puno ime",
    "namePlaceholder": "npr. Ana Horvat",
    "emailLabel": "E-adresa",
    "emailPlaceholder": "ana.horvat@primjer.hr",
    "emailPrefsLabel": "Odaberite e-poruke koje želite primati od nas",
    "emailMonthly": "Mjesečna inspiracija o temama prilagođenim vama",
    "emailOffers": "Popusti i ponude od Siterice.hr i partnera"
  },
  "phone": {
    "heroTitle": "Broj telefona",
    "heroSub": "Vaš privatni broj s međunarodnim predbrojem. Prikazivanje broja pomoći će vam da dobijete više kontakata od siterica.",
    "inputLabel": "Broj telefona",
    "inputPlaceholder": "+385 91 123 4567",
    "skipLink": "Učinit ću to kasnije"
  },
  "success": {
    "heroTitle": "To je to!",
    "heroSub": "Vaša ponuda za posao u mjestu {city} je objavljena.",
    "body": "Vašu ponudu podijelit ćemo sa sitericama u vašoj blizini. Njihovi odgovori pojavit će se u vašim porukama, a o svakoj novoj reakciji dobit ćete obavijest.",
    "btnContinue": "Nastavi",
    "editLink": "Uredi ponudu za posao"
  },
  "children": {
    "modalTitle": "Informacije o djeci",
    "sectionLabel": "Koliko je djece potrebno čuvati?",
    "helperText": "Dodajte dob i spol svakog djeteta kako bi siterice imale jasniju sliku o tome koga će čuvati.",
    "childLabel": "dijete",
    "boy": "Dječak",
    "girl": "Djevojčica",
    "ageLabel": "Dob",
    "monthSingular": "mjesec",
    "monthPlural": "mjeseci",
    "yearSingular": "godina",
    "yearPlural": "godina",
    "appendText": "Imamo {desc}.",
    "summaryBoy": "dječaka ({ageLabel})",
    "summaryGirl": "djevojčicu ({ageLabel})",
    "and": "i",
    "childOrdinals": [
      "1.",
      "2.",
      "3.",
      "4.",
      "5.+"
    ],
    "pillLabel": "djeca",
    "years": "godina"
  },
  "childrenTutor": {
    "modalTitle": "Informacije o učeniku",
    "sectionLabel": "Koliko učenika treba podučavanje?",
    "childLabel": "učenik",
    "boy": "Dječak",
    "girl": "Djevojčica",
    "ageLabel": "Dob",
    "lessThanTwo": "manje od 2",
    "yearSingular": "godina",
    "yearPlural": "godina",
    "appendText": "Tražimo podučavanje za {desc}.",
    "summaryBoy": "dječaka ({ageLabel})",
    "summaryGirl": "djevojčicu ({ageLabel})",
    "and": "i",
    "childOrdinals": [
      "1.",
      "2.",
      "3.",
      "4.",
      "5.+"
    ],
    "pillLabel": "djeca"
  },
  "transport": {
    "pillLabel": "prijevoz",
    "modalTitle": "Lokacija i putovanje",
    "modalTitleSenior": "Prijevoz i putovanje",
    "appendText": "Također bi pomoglo ako siterica nudi: {items}.",
    "and": "i",
    "location": {
      "sectionLabel": "Gdje trebate pomoć?",
      "items": {
        "atMyHome": {
          "label": "Kod nas doma",
          "summary": "skrb u našem domu"
        },
        "atSitterHome": {
          "label": "Kod siterice doma",
          "summary": "mogućnost skrbi u domu siterice"
        }
      }
    },
    "driver": {
      "sectionLabel": "Potreban vozač?",
      "items": {
        "hasCar": {
          "label": "Siterica ima vlastiti automobil",
          "summary": "vlastiti automobil"
        },
        "comfortableDriving": {
          "label": "Siterica može voziti djecu",
          "sub": "(Siterica ima važeću vozačku dozvolu i iskustvo u vožnji s djecom)",
          "summary": "važeću vozačku dozvolu i iskustvo u vožnji djece"
        }
      }
    },
    "driverSenior": {
      "sectionLabel": "Je li vožnja obavezna?",
      "items": {
        "hasCar": {
          "label": "Siterica ima vlastiti automobil",
          "summary": "vlastiti automobil"
        },
        "comfortableDriving": {
          "label": "Siterica može voziti starije osobe",
          "sub": "Siterica ima važeću vozačku dozvolu i iskustvo u vožnji starijih osoba (npr. na preglede ili u kupovinu).",
          "summary": "važeću vozačku dozvolu i iskustvo u vožnji starijih osoba"
        }
      }
    }
  },
  "onboarding": {
    "navTitle": "Uvodne postavke",
    "title": "Siterice koje odgovaraju vašim željama",
    "sub": "👶 Iskusne, dostupne na nepuno radno vrijeme i prilagođene svim dobnim skupinama",
    "verified": "Provjereno",
    "readMore": "pročitaj više",
    "showMore": "Prikaži više siterica",
    "ctaText": "Dobijte trenutačan pristup sitericama i postanite član već danas!",
    "ctaBtn": "Pogledajte opcije članstva",
    "restart": "Kreni ispočetka"
  }
});
})();
