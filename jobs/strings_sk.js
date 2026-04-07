// strings_sk.js — Slovenčina
// Published via /strings editor. Missing keys fall back to CZ source (strings.js).
(function(){
  function _dm(b,o){var r=Object.assign({},b||{});Object.keys(o).forEach(function(k){r[k]=(o[k]&&typeof o[k]==="object"&&!Array.isArray(o[k]))?_dm((b&&b[k])||{},o[k]):o[k];});return r;}
  window.STRINGS = _dm(window.STRINGS, {
  "nav": {
    "title": "Vytvoriť nový inzerát",
    "btnPrev": "Späť",
    "btnNext": "Pokračovať",
    "cancelConfirm": "Chcete zrušiť vytváranie tohto inzerátu?"
  },
  "exitModal": {
    "title": "K uverejneniu inzerátu vám chýba už len posledný krok",
    "body": "Teraz to nevzdávajte. Stačí dokončiť formulár a získate ponuky od hlídačiek, ktoré presne zodpovedajú vašim potrebám.",
    "leave": "Odisť",
    "stay": "Zobraziť ponuky"
  },
  "service": {
    "heroTitle": "Koho hľadáte?",
    "heroSub": "Vyberte si služby, ktoré od hlídačky potrebujete.",
    "sectionLabel": "Vyberte si služby, ktoré od hlídačky potrebujete.",
    "validationAlert": "Prosím, vyberte aspoň jednu službu",
    "babysitting": "Opatrovanie detí",
    "cleaning": "Upratovanie domácnosti",
    "pet": "Stráženie zvieratiek",
    "senior": "Starostlivosť o seniorov",
    "tutoring": "Doučovanie"
  },
  "location": {
    "heroSub": "Presná poloha zostane skrytá, no napriek tomu vám ukážeme tie najlepšie zhody vo vašom okolí.",
    "inputLabel": "Lokalita",
    "inputPlaceholder": "napr. Bratislava, Slovensko",
    "hint": "Presná adresa nebude zverejnená.",
    "validationAlert": "Prosím, vyberte svoju lokalitu",
    "titlePrefix": "Kde potrebujete",
    "titleFallback": "pomoc",
    "titleAnd": "a",
    "serviceNames": {
      "babysitting": "opatrovanie detí",
      "cleaning": "upratovanie domácnosti",
      "pet": "stráženie zvieratiek",
      "senior": "starostlivosť o seniorov",
      "tutoring": "doučovanie"
    }
  },
  "price": {
    "heroTitle": "Fixná suma za hodinu alebo dohodou?",
    "inputLabel": "Nastavte si cenu",
    "inputPlaceholder": "napr. 10 €/hod, 80 €/deň...",
    "averageHint": "Priemerná cena vo vašej oblasti je 10 € za hodinu",
    "placeholderFallback": "10 € za hodinu"
  },
  "cleaning": {
    "heroTitle": "Čo potrebujete upratať?",
    "heroSub": "Na základe vášho výberu pripravíme návrh inzerátu.",
    "sectionLabel": "Čo potrebujete upratať?",
    "flat": "Byt",
    "house": "Dom"
  },
  "cleaningExtras": {
    "heroTitle": "Potrebujete pomoc aj s niečím ďalším?",
    "heroSub": "Na základe vášho výberu pripravíme návrh inzerátu.",
    "sectionLabel": "Vyberte si doplnkové služby",
    "optional": "(voliteľné)",
    "ironing": "Žehlenie",
    "laundry": "Pranie",
    "windowCleaning": "Umývanie okien",
    "airbnbCleaning": "Upratovanie Airbnb / dovolenkových prenájmov",
    "carCleaning": "Čistenie auta",
    "moveCleaning": "Upratovanie po sťahovaní",
    "upholsteryCleaning": "Čistenie čalúnenia",
    "lightMaintenance": "Drobná údržba domácnosti",
    "gardenHelp": "Pomoc v záhrade"
  },
  "pet": {
    "heroTitle": "Váš domáci miláčik",
    "heroSub": "Na základe vášho výberu pripravíme návrh inzerátu.",
    "sectionLabel": "O aké zvieratá sa treba postarať?",
    "dogs": "Psy",
    "cats": "Mačky",
    "other": "Iné",
    "largePet": "Mám veľkého psa",
    "validationAlert": "Prosím, vyberte aspoň jedno zviera"
  },
  "seniorCare": {
    "heroTitle": "Detaily starostlivosti",
    "heroSub": "Tieto informácie nám pomôžu nájsť pre vašich blízkych tú najlepšiu pomoc.",
    "careTypeLabel": "O aký typ starostlivosti máte záujem?",
    "notSure": "Ešte neviem",
    "notSureSub": "Môžete to upresniť neskôr",
    "liveIn": "Nepretržitá starostlivosť (24/7)",
    "liveInSub": "Celodenná podpora, pri ktorej hlídačka býva priamo v domácnosti.",
    "fullTime": "Starostlivosť na plný úväzok",
    "fullTimeSub": "Každodenná pomoc, zvyčajne 35 – 40 hodín týždenne.",
    "partTime": "Pravidelná dochádzka",
    "partTimeSub": "Flexibilná alebo občasná pomoc podľa potreby.",
    "holidayCare": "Odľahčovacia služba",
    "holidayCareSub": "Dočasná starostlivosť na odbremenenie rodinných príslušníkov."
  },
  "frequencyPet": {
    "heroTitle": "Kedy a kde?",
    "heroSub": "💡 Klepnutím na fialové štítky pridáte ďalšie podrobnosti:",
    "howOftenLabel": "Ako často potrebujete pomoc?",
    "notSureYet": "ešte neviem",
    "onetime": "Jednorazovo (napr. počas dovolenky)",
    "regularly": "pravidelne",
    "whereLabel": "Kde má starostlivosť prebiehať?",
    "atMyHome": "U nás doma",
    "atSitterHome": "U hlídačky doma",
    "dontCare": "Je mi to jedno"
  },
  "frequency": {
    "heroTitle": "Kedy a ako často?",
    "heroSub": "Hľadáte jednorazovú alebo pravidelnú pomoc?",
    "sectionLabel": "Ako často potrebujete pomoc?",
    "regularly": "pravidelne",
    "onetime": "jednorazovo",
    "daysLabel": "Vyberte si preferované dni",
    "optional": "(voliteľné)",
    "days": {
      "mo": "Po",
      "tu": "Ut",
      "we": "St",
      "th": "Št",
      "fr": "Pi",
      "sa": "So",
      "su": "Ne"
    },
    "freqLabel": "Zvoľte frekvenciu",
    "freqOptions": [
      "Raz týždenne",
      "Dvakrát týdtne",
      "Každý deň",
      "Raz za dva týždne",
      "Raz mesačne"
    ],
    "dateLabel": "Upresnite dátum a čas",
    "datePlaceholder": "napr. každý pondelok 16:00 – 20:00 a piatok 14:00 – 18:00, od budúceho mesiaca",
    "notsure": "ešte neviem",
    "dateLabelRegular": "Upresnite dátum a čas",
    "longterm": "Hľadám dlhodobú pomoc"
  },
  "review": {
    "heroTitle": "Nový inzerát",
    "heroSub1": "Už ste takmer v cieli!",
    "heroSub2": "Našli sme 128 hlídačiek, ktoré zodpovedajú vašim kritériám 🎉",
    "aiLabel": "💡 Klepnutím na fialové štítky pridáte ďalšie podrobnosti:",
    "multiHeroTitle": "Doplňte podrobnosti o inzeráte",
    "multiHeroSub1": "K uverejneniu vám chýba už len posledný krok.",
    "multiHeroSub2": "Váš inzerát rozošleme 128 hlídačkám vo vašom okolí.",
    "multiLabel": "Popis inzerátu",
    "multiPlaceholder": "Dobrý deň, radi by sme našli pomoc v oblasti {services} v lokalite {location}. Naša predstava o cene je približne {price}",
    "privacyNote": "Vaše osobné údaje zostávajú skryté a hlídačkám sa nezobrazujú.",
    "btnPost": "Zverejniť inzerát",
    "footerNote": "Zverejnenie je zadarmo. Vytvoríme vám účet, aby ste mohli všetko bezpečne spravovať.",
    "generatedTexts": {
      "babysitting": "Hľadáme starostlivú a spoľahlivú osobu na opatrovanie našich detí. Potrebujeme pravidelnú pomoc a hľadáme niekoho skúseného s priateľským prístupom.",
      "cleaning": "Potrebujeme pomoc s pravidelným upratovaním domácnosti. Bývame v byte a ocenili by sme aj výpomoc so žehlením a praním.",
      "pet": "Hľadáme zodpovednú osobu so skúsenosťami, ktorá by nám postrážila psa počas dovolenky. Starostlivosť bude prebiehať u nás doma.",
      "senior": "Hľadáme láskavú a zodpovednú pomoc pre staršieho člena rodiny. Cieľom je každodenná asistencia a zabezpečenie domáceho pohodlia.",
      "tutoring": "Hľadáme skúseného doučovateľa, ktorý by pomohol nášmu dieťaťu so školskými predmetmi a prípravou na skúšky. Dôležitá je pre nás trpezlivosť a schopnosť prispôsobiť sa."
    },
    "hintLabel": "Tip: Pridajte k svojej žiadosti viac podrobností",
    "pillLanguage": "jazyk",
    "pillNeeds": "špecifické potreby",
    "pillPrice": "cena",
    "modalCancel": "Zrušiť",
    "modalAdd": "Pridať do inzerátu",
    "language": {
      "modalTitle": "Jazyky hlídačky",
      "sectionLabel": "Ktorými jazykmi by mala hlídačka hovoriť?",
      "cs": "Čeština",
      "sk": "Slovenčina",
      "en": "English",
      "de": "Deutsch",
      "es": "Español",
      "fr": "Français",
      "it": "Italiano",
      "uk": "Українська",
      "moreLangs": "+ ďalšie jazyky",
      "appendText": "Uprednostňujeme hlídačku, ktorá ovláda tieto jazyky: {langs}."
    },
    "languageTutor": {
      "modalTitle": "Jazyky doučovateľa",
      "sectionLabel": "Ktorými jazykmi by mal doučovateľ hovoriť?",
      "moreLangs": "+ ďalšie jazyky",
      "appendText": "Uprednostňujeme doučovateľa, ktorý ovláda tieto jazyky: {langs}."
    },
    "needs": {
      "modalTitle": "Špecifické potreby",
      "sectionLabel": "Chcete uviesť nejaké špecifické potreby?",
      "autism": "Poruchy autistického spektra",
      "diabetes": "Cukrovka",
      "asthma": "Astma",
      "adhd": "ADHD/ADD",
      "allergies": "Potravinové alergie",
      "childhood": "Bežné detské ochorenia",
      "sleep": "Poruchy spánku",
      "vision": "Zrakové postihnutie",
      "hearing": "Sluchové postihnutie",
      "epilepsy": "Epilepsia",
      "other": "Iné potreby",
      "appendText": "Naše dieťa má špecifické potreby: {needs}."
    },
    "needsTutor": {
      "modalTitle": "Špeciálne požiadavky",
      "sectionLabel": "Máte konkrétne potreby ohľadom učenia alebo formátu?",
      "speechDisorders": "Poruchy reči",
      "learningDisorders": "Poruchy učenia",
      "helpWithHomework": "Pomoc s domácimi úlohami",
      "homeSchooling": "Domáce vzdelávanie",
      "appendText": "Medzi špeciálne požiadavky na doučovanie patria: {needs}."
    },
    "specialRequirements": {
      "pillLabel": "špeciálne požiadavky",
      "modalTitle": "Špeciálne požiadavky",
      "sectionLabel": "Vyžaduje starostlivosť konkrétne skúsenosti alebo zručnosti?",
      "keepingCompany": "Robenie spoločnosti",
      "alzheimers": "Alzheimerova choroba",
      "parkinsons": "Parkinsonova choroba",
      "diabetes": "Cukrovka",
      "dementia": "Demencia",
      "mobilityIssues": "Problémy s pohybom",
      "personalHygiene": "Osobná hygiena",
      "mealPreparation": "Príprava jedla",
      "doctorAppointments": "Sprevádzanie k lekárovi",
      "physiotherapy": "Fyzioterapia",
      "artTherapy": "Arteterapia",
      "appendText": "Medzi špeciálne požiadavky na starostlivosť patria: {requirements}."
    },
    "extraTasks": {
      "pillLabel": "úlohy navyše",
      "modalTitle": "Extra úlohy",
      "sectionLabel": "Máte nejaké špeciálne požiadavky na upratovanie?",
      "ironing": "Žehlenie",
      "laundry": "Pranie",
      "windowCleaning": "Umývanie okien",
      "airbnbCleaning": "Upratovanie Airbnb / apartmánov",
      "carCleaning": "Čistenie auta",
      "moveCleaning": "Upratovanie po sťahovaní",
      "upholsteryCleaning": "Čistenie čalúnenia",
      "lightMaintenance": "Drobná údržba domácnosti",
      "gardenHelp": "Pomoc v záhrade",
      "appendText": "Ocenili by sme aj výpomoc s: {tasks}."
    },
    "petsAtHome": {
      "pillLabel": "zvieratká v domácnosti",
      "modalTitle": "Zvieratá v domácnosti",
      "sectionLabel": "Máte doma nejaké zvieratá?",
      "dogs": "Psi",
      "cats": "Mačky",
      "other": "Iné",
      "none": "Žiadne",
      "appendText": "V domácnosti sú tieto zvieratká: {pets}.",
      "appendNoneText": "V domácnosti nie sú žiadne zvieratá."
    },
    "dogSize": {
      "pillLabel": "veľkosť psa",
      "modalTitle": "Veľkosť psa",
      "sectionLabel": "Aký veľký je váš pes?",
      "small": "Malý (do 5 kg)",
      "medium": "Stredný (do 25 kg)",
      "large": "Veľký (do 40 kg)",
      "huge": "Obrovský (nad 40 kg)",
      "appendText": "Náš pes je: {sizes}."
    },
    "dogAge": {
      "pillLabel": "vek psa",
      "modalTitle": "Vek psa",
      "sectionLabel": "Aký starý je váš pes?",
      "puppy": "Šteňa",
      "adult": "Dospelý",
      "senior": "Senior",
      "puppyExtraAttention": "Šteňa vyžaduje zvýšenú pozornosť",
      "seniorSpecialCare": "Pes vyžaduje špeciálnu starostlivosť",
      "puppySummary": "šteňa",
      "adultSummary": "dospelý pes",
      "seniorSummary": "psí senior",
      "appendText": "Náš pes je {age}.",
      "appendPuppyExtraText": "Šteňa vyžaduje zvýšenú pozornosť.",
      "appendSeniorExtraText": "Pes vyžaduje špeciálnu starostlivosť."
    },
    "dogPersonality": {
      "pillLabel": "povaha psa",
      "modalTitle": "Povaha psa",
      "sectionLabel": "Akú má váš pes povahu?",
      "highEnergy": "Energický",
      "calm": "Pokojný",
      "playful": "Hravý",
      "protective": "Ochranársky",
      "social": "Spoločenský / priateľský",
      "curious": "Zvedavý",
      "stubborn": "Tvrdohlavý",
      "wellTrained": "Dobre vycvičený",
      "intelligent": "Inteligentný",
      "dogFriendlyLabel": "Znáša sa s inými psami?",
      "dogFriendlyYes": "Áno, je veľmi priateľský",
      "dogFriendlyNo": "Nie, radšej je sám",
      "kidsFriendlyLabel": "Má rád deti?",
      "kidsFriendlyYes": "Áno, deti miluje",
      "kidsFriendlyNo": "Nie, na deti nie je zvyknutý",
      "appendTraitsText": "Náš pes je: {traits}.",
      "appendDogFriendlyYes": "Náš pes je k ostatným psom veľmi priateľský.",
      "appendDogFriendlyNo": "Náš pes je v prítomnosti iných psov radšej sám.",
      "appendKidsFriendlyYes": "Náš pes sa k deťom správa veľmi dobre.",
      "appendKidsFriendlyNo": "Náš pes nie je na deti zvyknutý."
    },
    "healthDiet": {
      "pillLabel": "zdravie a strava",
      "modalTitle": "Zdravie a strava",
      "diet": {
        "sectionLabel": "Má pes špeciálnu diétu alebo alergie?",
        "items": [
          {
            "key": "standardDiet",
            "label": "Bežná strava",
            "sub": "Bez obmedzení"
          },
          {
            "key": "specialDiet",
            "label": "Špeciálna diéta / alergie",
            "sub": "Bezobilná strava, surové mäso (BARF), konkrétna značka a pod."
          },
          {
            "key": "noTreats",
            "label": "Prísne: Nepodávať maškrty",
            "sub": "Psi s citlivým žalúdkom alebo s potrebou strážiť váhu"
          }
        ]
      },
      "health": {
        "sectionLabel": "Má váš pes nejaké zdravotné potreby?",
        "items": [
          {
            "key": "medication",
            "label": "Podávanie liekov",
            "sub": "Hlídačka bude musieť podávať tablety, kvapky alebo injekcie"
          },
          {
            "key": "mobility",
            "label": "Potreby spojené s pohybom",
            "sub": "Má problémy so schodmi, vyžaduje len krátke prechádzky alebo má problémy s kĺbmi"
          },
          {
            "key": "medicalHistory",
            "label": "Anamnéza",
            "sub": "Záchvatové stavy, úzkosť alebo konkrétne chronické ochorenia"
          }
        ]
      },
      "appendDietText": "Náš pes má tieto stravovacie preferencie alebo obmedzenia: {diet}.",
      "appendHealthText": "Náš pes má tieto zdravotné potreby: {health}."
    },
    "typeCare": {
      "pillLabel": "typ starostlivosti",
      "modalTitle": "Druh starostlivosti",
      "sectionLabel": "Akú pomoc váš miláčik potrebuje?",
      "items": [
        {
          "key": "walking",
          "label": "Venčenie",
          "sub": "Pravidelné venčenie a vonkajšie aktivity"
        },
        {
          "key": "sittingAtMyHome",
          "label": "Stráženie u nás doma",
          "sub": "Hlídačka zostáva u vás doma a stará sa o miláčika"
        },
        {
          "key": "stayingAtSitterHome",
          "label": "Pobyt u hlídačky doma",
          "sub": "Váš miláčik bude bývať v domácnosti hlídačky"
        },
        {
          "key": "holidayCare",
          "label": "Starostlivosť počas dovolenky",
          "sub": "Dlhšia alebo nepretržitá starostlivosť počas vašej neprítomnosti"
        }
      ],
      "appendText": "Hľadáme tento typ starostlivosti o miláčika: {types}."
    },
    "gradeLevels": {
      "pillLabel": "študijná úroveň",
      "modalTitle": "Úroveň vzdelania",
      "sectionLabel": "O akú študijnú úroveň ide?",
      "items": [
        {
          "key": "preschool",
          "label": "predškolák"
        },
        {
          "key": "elementary",
          "label": "základná škola"
        },
        {
          "key": "secondary",
          "label": "stredná škola"
        }
      ],
      "appendText": "Úroveň vzdelania študenta je: {levels}."
    },
    "entranceExams": {
      "pillLabel": "prijímacie skúšky",
      "modalTitle": "Skúšky",
      "sectionLabel": "Pripravujete sa na nejaké skúšky?",
      "items": [
        {
          "key": "primaryAdmissions",
          "label": "prijímacie konanie na ZŠ"
        },
        {
          "key": "highSchoolAdmissions",
          "label": "prijímacie konanie na SŠ"
        },
        {
          "key": "schoolLeaving",
          "label": "maturita"
        },
        {
          "key": "otherTests",
          "label": "iné testy a skúšky"
        }
      ],
      "appendText": "Pripravujeme sa na: {exams}."
    },
    "schedule": {
      "pillLabel": "harmonogram",
      "modalTitle": "Harmonogram",
      "sectionLabel": "Kdy by malo prebehnúť prvé stretnutie?",
      "timeLabel": "Zvoľte preferovanú dennú dobu",
      "optional": "(voliteľné)",
      "items": [
        {
          "key": "morning",
          "label": "Ráno"
        },
        {
          "key": "afternoon",
          "label": "Popoludní"
        },
        {
          "key": "evening",
          "label": "Večer"
        }
      ],
      "appendText": "Prvá lekcia by sa mala ideálne uskutočniť v termíne: {date}.",
      "appendTextWithTimes": "Prvá lekcia by sa mala ideálne uskutočniť v termíne: {date}, najlepšie v čase: {times}."
    },
    "teachingStyle": {
      "pillLabel": "štýl výučby",
      "modalTitle": "Štýl výučby",
      "sectionLabel": "Aký štýl výučby uprednostňujete?",
      "traditional": "Tradičný",
      "forestSchool": "Lesná škola / vonkajšia výučba",
      "montessori": "Montessori",
      "waldorf": "Waldorf",
      "appendText": "Náš preferovaný štýl výučby je: {styles}."
    },
    "cleaningSupplies": {
      "pillLabel": "čistiace prostriedky",
      "modalTitle": "Čistiace prostriedky",
      "sectionLabel": "Kto zabezpečí čistiace prostriedky?",
      "noPreference": "Je mi to jedno",
      "familyProvides": "Zabezpečí rodina",
      "sitterProvides": "Zabezpečí hlídačka",
      "familyProvidesSummary": "rodina",
      "sitterProvidesSummary": "hlídačka",
      "appendText": "Čistiace prostriedky zabezpečí {provider}.",
      "appendNoPreferenceText": "Nemáme vyhranenú preferenciu ohľadom zabezpečenia čistiacich prostriedkov."
    },
    "daysTimes": {
      "pillLabel": "dni a časy",
      "modalTitle": "Kedy a ako často?",
      "appendNotSureText": "Ohľadne konkrétnych dní a časov sme stále flexibilní.",
      "appendRegularText": "Hľadáme pravidelnú pomoc.",
      "appendRegularWithDetails": "Hľadáme pravidelnú pomoc: {details}.",
      "appendLongtermText": "Hľadáme dlhodobú pomoc.",
      "appendOneTimeText": "Hľadáme jednorazovú pomoc na {date} od {fromTime} do {toTime}.",
      "appendOneTimeOvernightText": "Hľadáme jednorazové stráženie cez noc od {fromDate} {fromTime} do {toDate} {toTime}."
    },
    "specialOccasions": {
      "pillLabel": "zvláštne príležitosti",
      "modalTitle": "Špeciálne príležitosti",
      "sectionLabel": "Potrebujete pomoc na konkrétnu udalosť?",
      "parties": "Oslavy",
      "holidays": "Dovolenky / Prázdniny",
      "overnightCare": "Stráženie cez noc",
      "childrensGroups": "Detské skupiny",
      "weddings": "Svadby",
      "appendText": "Ocenili by sme pomoc aj pri špeciálnych príležitostiach, ako sú: {occasions}."
    },
    "skillsTalents": {
      "pillLabel": "zručnosti",
      "modalTitle": "Preferované zručnosti",
      "sectionLabel": "Do akých činností by ste radi hlídačku zapojili?",
      "singing": "Spev",
      "music": "Hudba",
      "sports": "Šport",
      "dramaDance": "Divadlo alebo tanec",
      "artsCrafts": "Tvorenie a ručné práce",
      "extraLabel": "Niečo ďalšie?",
      "extraPlaceholder": "napr. pečenie, šach, jóga...",
      "appendText": "Bolo by skvelé, keby hlídačka mohla podporiť aktivity ako: {skills}.",
      "appendExtraText": "Ďalšie činnosti, na ktorých nám záleží: {note}."
    },
    "parentingStyle": {
      "pillLabel": "výchovný štýl",
      "modalTitle": "Výchovná filozofia",
      "sectionLabel": "Aký prístup používate u vás doma? Budeme hľadať hlídačky, ktoré zdieľajú vaše hodnoty.",
      "traditional": "Tradičný",
      "respectfulParenting": "Rešpektujúca výchova",
      "forestSchool": "Lesná škola / vonkajší prístup",
      "montessori": "Montessori",
      "waldorf": "Waldorf",
      "appendText": "Náš výchovný štýl je najbližšie prístupu: {styles}."
    },
    "price": {
      "modalTitle": "Zadajte svoju predstavu o cene",
      "label": "Nastaviť cenu",
      "appendText": "Ponúkame {price}."
    }
  },
  "locationTutoring": {
    "heroTitle": "Kde má doučovanie prebiehať?",
    "heroSub": "V akom prostredí si lekcie predstavujete?",
    "sectionLabel": "Vyberte jedno alebo viac miest",
    "studentPlace": "U študenta doma",
    "tutorPlace": "U doučovateľa doma",
    "online": "Online (cez video)",
    "validationAlert": "Vyberte prosím aspoň jedno miesto"
  },
  "subjects": {
    "heroTitle": "Predmety",
    "heroSub": "Vyberte jeden alebo viac predmetov",
    "languagesLabel": "Jazyky",
    "scienceLabel": "Prírodné vedy",
    "musicLabel": "Hudba",
    "moreLanguages": "+ ďalšie jazyky",
    "moreMusic": "+ ďalšie nástroje",
    "otherLabel": "Akýkoľvek iný predmet",
    "otherPlaceholder": "Programovanie, tanec, história...",
    "cs": "Čeština",
    "en": "Angličtina",
    "de": "Nemčina",
    "fr": "Francúzština",
    "it": "Taliančina",
    "es": "Španielčina",
    "physics": "Fyzika",
    "math": "Matematika",
    "chemistry": "Chémia",
    "biology": "Biológia",
    "singing": "Spev",
    "piano": "Klavír",
    "guitar": "Gitara"
  },
  "contact": {
    "heroTitle": "Vaše meno a e-mail",
    "heroSub": "Aby sme vám mohli doručiť odpovede od hlídačiek.",
    "nameLabel": "Celé meno",
    "namePlaceholder": "napr. Jana Nováková",
    "emailLabel": "E-mail",
    "emailPlaceholder": "jana.novakova@priklad.sk",
    "emailPrefsLabel": "Vyberte e-maily, ktoré od nás chcete dostávať",
    "emailMonthly": "Mesačná inšpirácia s témami na mieru",
    "emailOffers": "Zľavy a ponuky od Hlídačky.sk a partnerov"
  },
  "phone": {
    "heroTitle": "Telefónne číslo",
    "heroSub": "Vaše súkromné číslo s medzinárodnou predvoľbou. Jeho uvedenie vám pomôže získať viac ponúk od hlídačiek.",
    "inputLabel": "Telefónne číslo",
    "inputPlaceholder": "0901 123 456",
    "skipLink": "Urobím to neskôr"
  },
  "success": {
    "heroTitle": "A je to hotové!",
    "heroSub": "Váš inzerát pre mesto {city} bol zverejnený.",
    "body": "Váš inzerát rozošleme hlídačkám vo vašom okolí. Ich odpovede sa vám zobrazia v správach a o každej novej reakcii vás budeme informovať.",
    "btnContinue": "Pokračovať",
    "editLink": "Upraviť inzerát"
  },
  "children": {
    "modalTitle": "Informácie o deťoch",
    "sectionLabel": "O koľko detí sa treba postarať?",
    "helperText": "Uveďte vek a pohlavie každého dieťaťa, aby hlídačky získali jasnú predstavu o svojich úlohách.",
    "childLabel": "dieťa",
    "boy": "Chlapec",
    "girl": "Dievča",
    "ageLabel": "Vek",
    "monthSingular": "mesiac",
    "monthPlural": "mesiacov",
    "yearSingular": "rok",
    "yearPlural": "rokov",
    "appendText": "Máme {desc}.",
    "summaryBoy": "chlapca ({ageLabel})",
    "summaryGirl": "dievča ({ageLabel})",
    "and": "a",
    "childOrdinals": [
      "1.",
      "2.",
      "3.",
      "4.",
      "5.+"
    ],
    "pillLabel": "deti",
    "years": "rokov"
  },
  "childrenTutor": {
    "modalTitle": "Informácie o študentovi",
    "sectionLabel": "Pre koľko študentov doučovanie hľadáte?",
    "childLabel": "študent",
    "boy": "Chlapec",
    "girl": "Dievča",
    "ageLabel": "Vek",
    "lessThanTwo": "menej ako 2",
    "yearSingular": "rok",
    "yearPlural": "rokov",
    "appendText": "Hľadáme doučovanie pre {desc}.",
    "summaryBoy": "chlapca ({ageLabel})",
    "summaryGirl": "dievča ({ageLabel})",
    "and": "a",
    "childOrdinals": [
      "1.",
      "2.",
      "3.",
      "4.",
      "5.+"
    ],
    "pillLabel": "deti"
  },
  "transport": {
    "pillLabel": "doprava",
    "modalTitle": "Miesto a dochádzanie",
    "modalTitleSenior": "Doprava a cestovanie",
    "appendText": "Tiež by nám pomohlo, keby hlídačka ponúkala: {items}.",
    "and": "a",
    "location": {
      "sectionLabel": "Kde potrebujete pomoc?",
      "items": {
        "atMyHome": {
          "label": "U nás doma",
          "summary": "starostlivosť u nás doma"
        },
        "atSitterHome": {
          "label": "U hlídačky doma",
          "summary": "možnosť starostlivosti u hlídačky doma"
        }
      }
    },
    "driver": {
      "sectionLabel": "Požadujete vodičský preukaz?",
      "items": {
        "hasCar": {
          "label": "Hlídačka má vlastné auto",
          "summary": "vlastné auto"
        },
        "comfortableDriving": {
          "label": "Hlídačke nevadí voziť deti",
          "sub": "(Hlídačka má platný vodičský preukaz a skúsenosti s prevážaním detí)",
          "summary": "platný vodičský preukaz a skúsenosť s vozením detí"
        }
      }
    },
    "driverSenior": {
      "sectionLabel": "Je vyžadované šoférovanie auta?",
      "items": {
        "hasCar": {
          "label": "Hlídačka má vlastné auto",
          "summary": "vlastné auto"
        },
        "comfortableDriving": {
          "label": "Hlídačke nevadí voziť seniorov",
          "sub": "Hlídačka má platný vodičský preukaz a skúsenosti s doprovodom seniorov (napr. k lekárovi alebo na nákupy).",
          "summary": "platný vodičský preukaz a skúsenosť s prevážaním seniorov"
        }
      }
    }
  },
  "onboarding": {
    "navTitle": "Úvodné nastavenie",
    "title": "Hlídačky podľa vašich predstáv",
    "sub": "👶 Skúsené, dostupné na čiastočný úväzok a vhodné pre všetky vekové kategórie",
    "verified": "Overené",
    "readMore": "čítať viac",
    "showMore": "Zobraziť ďalšie hlídačky",
    "ctaText": "Získajte okamžitý prístup k hlídačkám – staňte sa členom hneď teraz!",
    "ctaBtn": "Zobraziť možnosti členstva",
    "restart": "Začať odznova"
  }
});
})();
