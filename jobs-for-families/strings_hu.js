// strings_hu.js — Magyar
// Published via /strings editor. Missing keys fall back to CZ source (strings.js).
(function(){
  function _dm(b,o){var r=Object.assign({},b||{});Object.keys(o).forEach(function(k){r[k]=(o[k]&&typeof o[k]==="object"&&!Array.isArray(o[k]))?_dm((b&&b[k])||{},o[k]):o[k];});return r;}
  window.STRINGS = _dm(window.STRINGS, {
  "nav": {
    "title": "Új álláshirdetés létrehozása",
    "btnPrev": "Vissza",
    "btnNext": "Folytatás",
    "cancelConfirm": "Megszakítod az álláshirdetés létrehozását?"
  },
  "exitModal": {
    "title": "Már csak egy lépés választ el a közzétételtől",
    "body": "Ne add fel most, töltsd ki az űrlapot, és olyan segítőktől kapsz majd ajánlatokat, akik pontosan megfelelnek az igényeidnek.",
    "leave": "Kilépés",
    "stay": "Ajánlatok megtekintése"
  },
  "service": {
    "heroTitle": "Kit keresel?",
    "heroSub": "Válaszd ki, miben van szükséged segítségre.",
    "sectionLabel": "Válaszd ki, miben van szükséged segítségre.",
    "validationAlert": "Kérjük, válassz legalább egy szolgáltatást",
    "babysitting": "Gyermekfelügyelet",
    "cleaning": "Háztartási takarítás",
    "pet": "Kisállat-felügyelet",
    "senior": "Idősgondozás",
    "tutoring": "Korrepetálás"
  },
  "location": {
    "heroSub": "A pontos helyszín titkos marad, de megmutatjuk a legjobb környékbeli találatokat.",
    "inputLabel": "Helyszín",
    "inputPlaceholder": "pl. Budapest, Magyarország",
    "hint": "A pontos címet nem fedjük fel.",
    "validationAlert": "Kérjük, add meg a helyszínt",
    "titlePrefix": "Hol van szükséged",
    "titleFallback": "segítségre",
    "titleAnd": "és",
    "serviceNames": {
      "babysitting": "gyermekfelügyeletre",
      "cleaning": "takarításra",
      "pet": "kisállat-felügyeletre",
      "senior": "idősgondozásra",
      "tutoring": "korrepetálásra"
    }
  },
  "price": {
    "heroTitle": "Fix óradíj vagy megállapodás szerint?",
    "inputLabel": "Add meg az árat",
    "inputPlaceholder": "pl. 3 000 Ft/óra, 15 000 Ft/nap...",
    "averageHint": "Az átlagár a környékeden 3 500 Ft óránként",
    "placeholderFallback": "3 500 Ft óránként"
  },
  "cleaning": {
    "heroTitle": "Mit kell kitakarítani?",
    "heroSub": "A választásod alapján elkészítjük a hirdetés tervezetét.",
    "sectionLabel": "Milyen típusú ingatlant takarítanál?",
    "flat": "Lakás",
    "house": "Ház"
  },
  "cleaningExtras": {
    "heroTitle": "Szükséged van segítségre bármi egyébben?",
    "heroSub": "A választásod alapján elkészítjük a hirdetés tervezetét.",
    "sectionLabel": "Válassz kiegészítő szolgáltatásokat",
    "optional": "(opcionális)",
    "ironing": "Vasalás",
    "laundry": "Mosás",
    "windowCleaning": "Ablaktisztítás",
    "airbnbCleaning": "Airbnb / rövid távú kiadás takarítása",
    "carCleaning": "Autótakarítás",
    "moveCleaning": "Költözés utáni takarítás",
    "upholsteryCleaning": "Kárpittisztítás",
    "lightMaintenance": "Kisebb ház körüli karbantartás",
    "gardenHelp": "Kerti munka"
  },
  "pet": {
    "heroTitle": "A kiskedvenced",
    "heroSub": "A választásod alapján elkészítjük a hirdetés tervezetét.",
    "sectionLabel": "Milyen állatról kell gondoskodni?",
    "dogs": "Kutyák",
    "cats": "Macskák",
    "other": "Egyéb",
    "largePet": "Nagytestű kutyám van",
    "validationAlert": "Kérjük, válassz legalább egy állatot"
  },
  "seniorCare": {
    "heroTitle": "Gondozási részletek",
    "heroSub": "Ez segít megtalálni a szeretteidnek legmegfelelőbb segítőt.",
    "careTypeLabel": "Milyen típusú gondozást keresel?",
    "notSure": "Még nem tudom",
    "notSureSub": "Később is megadhatod",
    "liveIn": "Bentlakásos gondozás (24/7)",
    "liveInSub": "Teljes körű segítség, a segítő a háztartásban lakik.",
    "fullTime": "Teljes munkaidős gondozás",
    "fullTimeSub": "Napi szintű támogatás, általában heti 35-40 órában.",
    "partTime": "Rendszeres látogatás",
    "partTimeSub": "Rugalmas vagy alkalmi segítség szükség szerint.",
    "holidayCare": "Átmeneti gondozás",
    "holidayCareSub": "Időszakos segítség a család tehermentesítésére."
  },
  "frequencyPet": {
    "heroTitle": "Mikor és hol?",
    "heroSub": "💡 Koppints a lila címkékre a részletek hozzáadásához:",
    "howOftenLabel": "Milyen gyakran van szükséged segítségre?",
    "notSureYet": "még nem tudom",
    "onetime": "Egyszeri alkalom (pl. nyaralás alatt)",
    "regularly": "rendszeresen",
    "whereLabel": "Hol történjen a gondozás?",
    "atMyHome": "Nálunk otthon",
    "atSitterHome": "A segítőnél otthon",
    "dontCare": "Mindegy nekem"
  },
  "frequency": {
    "heroTitle": "Mikor és milyen gyakran?",
    "heroSub": "Egyszeri vagy rendszeres segítséget keresel?",
    "sectionLabel": "Milyen gyakran van szükséged segítségre?",
    "regularly": "rendszeresen",
    "onetime": "egyszeri alkalom",
    "daysLabel": "Válaszd ki a preferált napokat",
    "optional": "(opcionális)",
    "days": {
      "mo": "Hé",
      "tu": "Ke",
      "we": "Sze",
      "th": "Csü",
      "fr": "Pé",
      "sa": "Szo",
      "su": "Vas"
    },
    "freqLabel": "Válassz gyakoriságot",
    "freqOptions": [
      "Hetente egyszer",
      "Hetente kétszer",
      "Minden nap",
      "Kéthetente egyszer",
      "Havonta egyszer"
    ],
    "dateLabel": "Add meg a dátumot és időpontot",
    "datePlaceholder": "pl. minden hétfőn 16:00–20:00 és pénteken 14:00–18:00, jövő hónaptól",
    "notsure": "még nem tudom",
    "dateLabelRegular": "Add meg a dátumot és időpontot",
    "longterm": "Hosszú távú segítséget keresek"
  },
  "review": {
    "heroTitle": "Új hirdetés",
    "heroSub1": "Már majdnem kész!",
    "heroSub2": "128 segítőt találtunk, aki megfelel az igényeidnek 🎉",
    "aiLabel": "💡 Koppints a lila címkékre a részletek hozzáadásához:",
    "multiHeroTitle": "Adj hozzá további részleteket",
    "multiHeroSub1": "Már csak egy lépés választ el a céltól.",
    "multiHeroSub2": "Hirdetésedet megosztjuk a környékeden lévő 128 segítővel.",
    "multiLabel": "A hirdetés szövege",
    "multiPlaceholder": "Sziasztok segítők, szeretnénk {services} segítséget találni {location} területén. Az árral kapcsolatos elképzelésünk {price} körül mozog.",
    "privacyNote": "Személyes adataid titkosak maradnak, a segítők nem látják őket.",
    "btnPost": "Hirdetés feladása",
    "footerNote": "A feladás ingyenes. Létrehozunk neked egy fiókot a biztonságos kezeléshez.",
    "generatedTexts": {
      "babysitting": "Gondos és megbízható bébiszittert keresünk gyermekeink mellé. Rendszeres segítségre van szükségünk, tapasztalt és barátságos személyt keresünk.",
      "cleaning": "Rendszeres háztartási takarításhoz keresünk segítséget. Lakásban lakunk, és örülnénk a mosásban és vasalásban nyújtott támogatásnak is.",
      "pet": "Felelősségteljes és tapasztalt embert keresünk, aki vigyázna a kutyánkra a nyaralásunk alatt. A gondozás nálunk történne.",
      "senior": "Kedves és felelősségteljes gondozót keresünk idős családtagunk mellé. A cél a napi szintű segítségnyújtás és az otthoni kényelem biztosítása.",
      "tutoring": "Tapasztalt magántanárt keresünk gyermekünknek iskolai tantárgyakhoz és vizsgafelkészítéshez. Fontos számunkra a türelem és az alkalmazkodóképesség."
    },
    "hintLabel": "Tipp: Adj meg több részletet a kérésedhez",
    "pillLanguage": "nyelv",
    "pillNeeds": "speciális igények",
    "pillPrice": "ár",
    "modalCancel": "Mégse",
    "modalAdd": "Hozzáadás a hirdetéshez",
    "language": {
      "modalTitle": "A segítő által beszélt nyelvek",
      "sectionLabel": "Milyen nyelven beszéljen a segítő?",
      "cs": "Cseh",
      "sk": "Szlovák",
      "en": "Angol",
      "de": "Német",
      "es": "Spanyol",
      "fr": "Francia",
      "it": "Olasz",
      "uk": "Ukrán",
      "moreLangs": "+ további nyelvek",
      "appendText": "Olyan segítőt részesítünk előnyben, aki beszél a következő nyelveken: {langs}."
    },
    "languageTutor": {
      "modalTitle": "A magántanár által beszélt nyelvek",
      "sectionLabel": "Milyen nyelven beszéljen a tanár?",
      "moreLangs": "+ további nyelvek",
      "appendText": "Olyan tanárt részesítünk előnyben, aki beszél a következő nyelveken: {langs}."
    },
    "needs": {
      "modalTitle": "Speciális igények",
      "sectionLabel": "Szeretnél említeni bármilyen speciális igényt?",
      "autism": "Autizmus spektrum",
      "diabetes": "Diabétesz",
      "asthma": "Asztma",
      "adhd": "ADHD/ADD",
      "allergies": "Ételallergia",
      "childhood": "Gyakori gyermekbetegségek",
      "sleep": "Alvászavarok",
      "vision": "Látászavarok",
      "hearing": "Hallászavarok",
      "epilepsy": "Epilepszia",
      "other": "Egyéb igények",
      "appendText": "Gyermekünk speciális igényekkel rendelkezik: {needs}."
    },
    "needsTutor": {
      "modalTitle": "Speciális követelmények",
      "sectionLabel": "Vannak konkrét tanulási igények vagy preferált formátumok?",
      "speechDisorders": "Beszédzavarok",
      "learningDisorders": "Tanulási nehézségek",
      "helpWithHomework": "Segítség a házi feladathoz",
      "homeSchooling": "Magántanulói státusz / Otthonoktatás",
      "appendText": "A korrepetálással kapcsolatos speciális igények: {needs}."
    },
    "specialRequirements": {
      "pillLabel": "speciális igények",
      "modalTitle": "Speciális igények",
      "sectionLabel": "Igényel a gondozás konkrét tapasztalatot vagy készségeket?",
      "keepingCompany": "Társaság biztosítása",
      "alzheimers": "Alzheimer-kór",
      "parkinsons": "Parkinson-kór",
      "diabetes": "Diabétesz",
      "dementia": "Demencia",
      "mobilityIssues": "Mozgásszervi nehézségek",
      "personalHygiene": "Személyi higiénia",
      "mealPreparation": "Ételkészítés",
      "doctorAppointments": "Orvosi látogatások kísérése",
      "physiotherapy": "Fizioterápia",
      "artTherapy": "Művészetterápia",
      "appendText": "A gondozással kapcsolatos speciális igények: {requirements}."
    },
    "extraTasks": {
      "pillLabel": "extra feladatok",
      "modalTitle": "Extra feladatok",
      "sectionLabel": "Van bármilyen speciális kérésed a takarítással kapcsolatban?",
      "ironing": "Vasalás",
      "laundry": "Mosás",
      "windowCleaning": "Ablaktisztítás",
      "airbnbCleaning": "Airbnb / apartman takarítás",
      "carCleaning": "Autótakarítás",
      "moveCleaning": "Költözés előtti/utáni takarítás",
      "upholsteryCleaning": "Kárpittisztítás",
      "lightMaintenance": "Kisebb ház körüli karbantartás",
      "gardenHelp": "Kerti munka",
      "appendText": "Nagyra értékelnénk a segítséget a következőkben is: {tasks}."
    },
    "petsAtHome": {
      "pillLabel": "háziállatok",
      "modalTitle": "Háziállatok a háztartásban",
      "sectionLabel": "Vannak állatok otthon?",
      "dogs": "Kutyák",
      "cats": "Macskák",
      "other": "Egyéb",
      "none": "Nincsenek",
      "appendText": "A háztartásban a következő állatok vannak: {pets}.",
      "appendNoneText": "A háztartásban nincsenek háziállatok."
    },
    "dogSize": {
      "pillLabel": "kutya mérete",
      "modalTitle": "Kutya mérete",
      "sectionLabel": "Mekkora a kutyád?",
      "small": "Kicsi (5 kg-ig)",
      "medium": "Közepes (25 kg-ig)",
      "large": "Nagy (40 kg-ig)",
      "huge": "Óriás (40 kg felett)",
      "appendText": "A kutyánk mérete: {sizes}."
    },
    "dogAge": {
      "pillLabel": "kutya kora",
      "modalTitle": "Kutya kora",
      "sectionLabel": "Mennyi idős a kutyád?",
      "puppy": "Kölyök",
      "adult": "Felnőtt",
      "senior": "Idős",
      "puppyExtraAttention": "A kölyökkutya extra figyelmet igényel",
      "seniorSpecialCare": "A kutya speciális gondozást igényel",
      "puppySummary": "kölyökkutya",
      "adultSummary": "felnőtt kutya",
      "seniorSummary": "idős kutya",
      "appendText": "A kutyánk {age}.",
      "appendPuppyExtraText": "A kölyökkutya extra figyelmet igényel.",
      "appendSeniorExtraText": "A kutya speciális gondozást igényel."
    },
    "dogPersonality": {
      "pillLabel": "kutya jelleme",
      "modalTitle": "Kutya jelleme",
      "sectionLabel": "Milyen a kutyád természete?",
      "highEnergy": "Nagy mozgásigényű",
      "calm": "Nyugodt",
      "playful": "Játékos",
      "protective": "Védelmező",
      "social": "Társasági / Barátságos",
      "curious": "Kíváncsi",
      "stubborn": "Makacs",
      "wellTrained": "Jól nevelt",
      "intelligent": "Intelligens",
      "dogFriendlyLabel": "Barátságos más kutyákkal?",
      "dogFriendlyYes": "Igen, nagyon barátságos",
      "dogFriendlyNo": "Nem, inkább egyedül szeret lenni",
      "kidsFriendlyLabel": "Jól kijön a gyerekekkel?",
      "kidsFriendlyYes": "Igen, imádja a gyerekeket",
      "kidsFriendlyNo": "Nem, nincs hozzászokva a gyerekekhez",
      "appendTraitsText": "A kutyánk jellemzői: {traits}.",
      "appendDogFriendlyYes": "A kutyánk nagyon barátságos más kutyákkal.",
      "appendDogFriendlyNo": "A kutyánk inkább egyedül szeret lenni más kutyák társaságában.",
      "appendKidsFriendlyYes": "A kutyánk jól kijön a gyerekekkel.",
      "appendKidsFriendlyNo": "A kutyánk nincs hozzászokva a gyerekekhez."
    },
    "healthDiet": {
      "pillLabel": "egészség és étrend",
      "modalTitle": "Egészség és étrend",
      "diet": {
        "sectionLabel": "Speciális étrend vagy allergia?",
        "items": [
          {
            "key": "standardDiet",
            "label": "Általános étrend",
            "sub": "Nincsenek korlátozások"
          },
          {
            "key": "specialDiet",
            "label": "Speciális étrend / allergia",
            "sub": "Gabonamentes, nyers (BARF), konkrét márka stb."
          },
          {
            "key": "noTreats",
            "label": "Szigorú: Semmi jutalomfalat",
            "sub": "Érzékeny gyomrú vagy súlyproblémás kutyáknak"
          }
        ]
      },
      "health": {
        "sectionLabel": "Vannak a kutyádnak egészségügyi igényei?",
        "items": [
          {
            "key": "medication",
            "label": "Segítség gyógyszerezésben",
            "sub": "A segítőnek tablettát, cseppet vagy injekciót kell beadnia"
          },
          {
            "key": "mobility",
            "label": "Mozgásszervi igények",
            "sub": "Nehezen megy a lépcsőn, csak rövid sétát bír, vagy ízületi problémás"
          },
          {
            "key": "medicalHistory",
            "label": "Kórtörténet",
            "sub": "Rohamok, szorongás vagy konkrét krónikus betegségek"
          }
        ]
      },
      "appendDietText": "A kutyánk étrendi preferenciái vagy korlátozásai: {diet}.",
      "appendHealthText": "A kutyánk egészségügyi igényei: {health}."
    },
    "typeCare": {
      "pillLabel": "gondozás típusa",
      "modalTitle": "Gondozás típusa",
      "sectionLabel": "Milyen segítségre van szüksége a kedvencednek?",
      "items": [
        {
          "key": "walking",
          "label": "Sétáltatás",
          "sub": "Rendszeres sétáltatás és egészségügyi szünetek"
        },
        {
          "key": "sittingAtMyHome",
          "label": "Gondozás nálunk otthon",
          "sub": "A segítő nálad marad, hogy ellássa a kedvencedet"
        },
        {
          "key": "stayingAtSitterHome",
          "label": "Szállás a segítőnél",
          "sub": "A kedvenced a segítő otthonában marad"
        },
        {
          "key": "holidayCare",
          "label": "Gondozás nyaralás alatt",
          "sub": "Hosszabb vagy folyamatos felügyelet távolléted alatt"
        }
      ],
      "appendText": "A következő típusú kisállat-felügyeletet keressük: {types}."
    },
    "gradeLevels": {
      "pillLabel": "tanulmányi szint",
      "modalTitle": "Iskolai szint",
      "sectionLabel": "Milyen iskolai szintről van szó?",
      "items": [
        {
          "key": "preschool",
          "label": "óvodás"
        },
        {
          "key": "elementary",
          "label": "általános iskolás"
        },
        {
          "key": "secondary",
          "label": "középiskolás"
        }
      ],
      "appendText": "A tanulmányi szint: {levels}."
    },
    "entranceExams": {
      "pillLabel": "felvételi vizsgák",
      "modalTitle": "Vizsgák",
      "sectionLabel": "Készültök valamilyen vizsgára?",
      "items": [
        {
          "key": "primaryAdmissions",
          "label": "általános iskolai felvételi"
        },
        {
          "key": "highSchoolAdmissions",
          "label": "középiskolai felvételi"
        },
        {
          "key": "schoolLeaving",
          "label": "érettségi vizsgák"
        },
        {
          "key": "otherTests",
          "label": "egyéb tesztek és vizsgák"
        }
      ],
      "appendText": "A következőre készülünk: {exams}."
    },
    "schedule": {
      "pillLabel": "időbeosztás",
      "modalTitle": "Időbeosztás",
      "sectionLabel": "Mikor szeretnéd az első alkalmat?",
      "timeLabel": "Válaszd ki a preferált napszakot",
      "optional": "(opcionális)",
      "items": [
        {
          "key": "morning",
          "label": "Reggel"
        },
        {
          "key": "afternoon",
          "label": "Délután"
        },
        {
          "key": "evening",
          "label": "Este"
        }
      ],
      "appendText": "Az első alkalom ideális esetben ekkor lenne: {date}.",
      "appendTextWithTimes": "Az első alkalom ideális esetben ekkor lenne: {date}, lehetőleg ebben az időben: {times}."
    },
    "teachingStyle": {
      "pillLabel": "tanítási stílus",
      "modalTitle": "Tanítási stílus",
      "sectionLabel": "Milyen tanítási stílust részesítesz előnyben?",
      "traditional": "Hagyományos",
      "forestSchool": "Erdei iskola / Szabadtéri",
      "montessori": "Montessori",
      "waldorf": "Waldorf",
      "appendText": "A preferált tanítási stílus: {styles}."
    },
    "cleaningSupplies": {
      "pillLabel": "takarítószerek",
      "modalTitle": "Takarítószerek",
      "sectionLabel": "Ki biztosítja a takarítószereket?",
      "noPreference": "Mindegy nekem",
      "familyProvides": "A család biztosítja",
      "sitterProvides": "A segítő hozza",
      "familyProvidesSummary": "a család",
      "sitterProvidesSummary": "a segítő",
      "appendText": "A takarítószereket {provider} biztosítja.",
      "appendNoPreferenceText": "Nincs különösebb preferenciánk a takarítószerek biztosításával kapcsolatban."
    },
    "daysTimes": {
      "pillLabel": "napok és időpontok",
      "modalTitle": "Mikor és milyen gyakran?",
      "appendNotSureText": "A napok és időpontok tekintetében még rugalmasak vagyunk.",
      "appendRegularText": "Rendszeres segítséget keresünk.",
      "appendRegularWithDetails": "Rendszeres segítséget keresünk: {details}.",
      "appendLongtermText": "Hosszú távú segítséget keresünk.",
      "appendOneTimeText": "Egyszeri segítségre van szükségünk ekkor: {date}, {fromTime}-tól {toTime}-ig.",
      "appendOneTimeOvernightText": "Egyszeri éjszakai felügyeletet keresünk ettől: {fromDate} {fromTime}, eddig: {toDate} {toTime}."
    },
    "specialOccasions": {
      "pillLabel": "különleges alkalmak",
      "modalTitle": "Különleges alkalmak",
      "sectionLabel": "Szükséged van segítségre egy eseményhez?",
      "parties": "Zsúrok / Partik",
      "holidays": "Ünnepek / Szünidő",
      "overnightCare": "Éjszakai felügyelet",
      "childrensGroups": "Gyermekcsoportok",
      "weddings": "Esküvők",
      "appendText": "Nagyra értékelnénk a segítséget különleges alkalmakkor is, mint például: {occasions}."
    },
    "skillsTalents": {
      "pillLabel": "készségek",
      "modalTitle": "Preferált készségek és tehetségek",
      "sectionLabel": "Milyen tevékenységekbe vonnád be szívesen a segítőt?",
      "singing": "Éneklés",
      "music": "Zene",
      "sports": "Sport",
      "dramaDance": "Színjátszás vagy tánc",
      "artsCrafts": "Kézműveskedés",
      "extraLabel": "Bármi egyéb?",
      "extraPlaceholder": "pl. sütés, sakk, jóga...",
      "appendText": "Nagyszerű lenne, ha a segítő támogatni tudna olyan tevékenységeket, mint: {skills}.",
      "appendExtraText": "További tevékenységek, amik fontosak nekünk: {note}."
    },
    "parentingStyle": {
      "pillLabel": "nevelési stílus",
      "modalTitle": "Nevelési filozófia",
      "sectionLabel": "Milyen módszert alkalmaztok otthon? Olyan segítőt keresünk, aki osztja az értékeiteket.",
      "traditional": "Hagyományos",
      "respectfulParenting": "Válaszkész nevelés",
      "forestSchool": "Erdei iskola / Természetközeli",
      "montessori": "Montessori",
      "waldorf": "Waldorf",
      "appendText": "A nevelési stílusunk leginkább ehhez áll közel: {styles}."
    },
    "price": {
      "modalTitle": "Add meg az árral kapcsolatos elképzeléseidet",
      "label": "Ár beállítása",
      "appendText": "Az ajánlatunk: {price}."
    }
  },
  "locationTutoring": {
    "heroTitle": "Hol szeretnéd a korrepetálást?",
    "heroSub": "Hol történjenek az órák?",
    "sectionLabel": "Válassz egy vagy több helyszínt",
    "studentPlace": "A tanuló otthonában",
    "tutorPlace": "A tanárnál",
    "online": "Online (videóhívás)",
    "validationAlert": "Kérjük, válassz legalább egy helyszínt"
  },
  "subjects": {
    "heroTitle": "Tantárgyak",
    "heroSub": "Válassz egy vagy több tantárgyat",
    "languagesLabel": "Nyelvek",
    "scienceLabel": "Természettudományok",
    "musicLabel": "Zene",
    "moreLanguages": "+ további nyelvek",
    "moreMusic": "+ további hangszerek",
    "otherLabel": "Bármilyen egyéb tantárgy",
    "otherPlaceholder": "Programozás, tánc, történelem...",
    "cs": "Cseh",
    "en": "Angol",
    "de": "Német",
    "fr": "Francia",
    "it": "Olasz",
    "es": "Spanyol",
    "physics": "Fizika",
    "math": "Matematika",
    "chemistry": "Kémia",
    "biology": "Biológia",
    "singing": "Ének",
    "piano": "Zongora",
    "guitar": "Gitár"
  },
  "contact": {
    "heroTitle": "A neved és e-mail címed",
    "heroSub": "Hogy elküldhessük neked a segítők válaszait.",
    "nameLabel": "Teljes név",
    "namePlaceholder": "pl. Kovács Anna",
    "emailLabel": "E-mail",
    "emailPlaceholder": "kovacs.anna@pelda.hu",
    "emailPrefsLabel": "Válaszd ki, milyen e-maileket szeretnél kapni tőlünk",
    "emailMonthly": "Havi inspiráció a rád szabott témákban",
    "emailOffers": "Kedvezmények és ajánlatok a Bébicsősz.hu-tól és partnereitől"
  },
  "phone": {
    "heroTitle": "Telefonszám",
    "heroSub": "A magánszámod nemzetközi előhívóval. Ha megadod, több segítő fog megkeresni.",
    "inputLabel": "Telefonszám",
    "inputPlaceholder": "+36 30 123 4567",
    "skipLink": "Majd később megadom"
  },
  "success": {
    "heroTitle": "Ez az!",
    "heroSub": "A hirdetésedet közzétettük {city} területén.",
    "body": "Megosztjuk a hirdetésedet a környékbeli segítőkkel. Válaszaik az üzeneteid között fognak megjelenni, és minden új válaszról értesítünk.",
    "btnContinue": "Folytatás",
    "editLink": "Hirdetés szerkesztése"
  },
  "children": {
    "modalTitle": "Információ a gyerekekről",
    "sectionLabel": "Hány gyerekről kell gondoskodni?",
    "helperText": "Add meg minden gyermek korát és nemét, hogy a segítők pontosabb képet kapjanak a feladatukról.",
    "childLabel": "gyermek",
    "boy": "Fiú",
    "girl": "Lány",
    "ageLabel": "Kor",
    "monthSingular": "hónap",
    "monthPlural": "hónap",
    "yearSingular": "év",
    "yearPlural": "év",
    "appendText": "Van {desc}.",
    "summaryBoy": "egy fiúnk ({ageLabel})",
    "summaryGirl": "egy lányunk ({ageLabel})",
    "and": "és",
    "childOrdinals": [
      "1.",
      "2.",
      "3.",
      "4.",
      "5.+"
    ],
    "pillLabel": "gyerekek",
    "years": "év"
  },
  "childrenTutor": {
    "modalTitle": "Információ a tanulóról",
    "sectionLabel": "Hány diáknak van szüksége korrepetálásra?",
    "childLabel": "tanuló",
    "boy": "Fiú",
    "girl": "Lány",
    "ageLabel": "Kor",
    "lessThanTwo": "kevesebb mint 2",
    "yearSingular": "év",
    "yearPlural": "év",
    "appendText": "Korrepetálást keresünk {desc} részére.",
    "summaryBoy": "egy fiúnak ({ageLabel})",
    "summaryGirl": "egy lánynak ({ageLabel})",
    "and": "és",
    "childOrdinals": [
      "1.",
      "2.",
      "3.",
      "4.",
      "5.+"
    ],
    "pillLabel": "gyerekek"
  },
  "transport": {
    "pillLabel": "közlekedés",
    "modalTitle": "Helyszín és utazás",
    "modalTitleSenior": "Közlekedés és utazás",
    "appendText": "Az is segítene, ha a segítő rendelkezne a következőkkel: {items}.",
    "and": "és",
    "location": {
      "sectionLabel": "Hol van szükséged segítségre?",
      "items": {
        "atMyHome": {
          "label": "Nálunk otthon",
          "summary": "gondozás nálunk otthon"
        },
        "atSitterHome": {
          "label": "A segítőnél otthon",
          "summary": "lehetőség a segítő otthonában történő gondozásra"
        }
      }
    },
    "driver": {
      "sectionLabel": "Szükség van sofőrre?",
      "items": {
        "hasCar": {
          "label": "A segítő saját autóval rendelkezik",
          "summary": "saját autó"
        },
        "comfortableDriving": {
          "label": "A segítő szívesen szállít gyerekeket",
          "sub": "(A segítő érvényes jogosítvánnyal és gyermekszállítási tapasztalattal rendelkezik)",
          "summary": "érvényes jogosítvány és tapasztalat gyermekszállításban"
        }
      }
    },
    "driverSenior": {
      "sectionLabel": "Elvárás a vezetés?",
      "items": {
        "hasCar": {
          "label": "A segítő saját autóval rendelkezik",
          "summary": "saját autó"
        },
        "comfortableDriving": {
          "label": "A segítő szívesen szállít időseket",
          "sub": "A segítő érvényes jogosítvánnyal és tapasztalattal rendelkezik az idősek szállításában (pl. orvoshoz vagy ügyintézéshez).",
          "summary": "érvényes jogosítvány és tapasztalat idősek szállításában"
        }
      }
    }
  },
  "onboarding": {
    "navTitle": "Üdvözlünk",
    "title": "A preferenciáidnak megfelelő segítők",
    "sub": "👶 Tapasztaltak, részmunkaidőben elérhetőek, minden korosztályhoz értenek",
    "verified": "Ellenőrzött",
    "readMore": "tudj meg többet",
    "showMore": "További segítők mutatása",
    "ctaText": "Azonnali hozzáférés a segítőkhöz – válj taggá még most!",
    "ctaBtn": "Tagsági lehetőségek megtekintése",
    "restart": "Újrakezdés"
  }
});
})();
