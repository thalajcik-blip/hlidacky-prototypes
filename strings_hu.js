// strings_hu.js — Magyar
// Published via /strings editor. Missing keys fall back to CZ source (strings.js).
(function(){
  function _dm(b,o){var r=Object.assign({},b);Object.keys(o).forEach(function(k){r[k]=(o[k]&&typeof o[k]==="object"&&!Array.isArray(o[k]))?_dm(b[k]||{},o[k]):o[k];});return r;}
  window.STRINGS = _dm(window.STRINGS, {
  "nav": {
    "title": "Vytvořit nový inzerát",
    "btnPrev": "Zpět",
    "btnNext": "Pokračovat",
    "cancelConfirm": "Zrušit vytváření inzerátu?"
  },

  "exitModal": {
    "title": "Jste jen krůček od zveřejnění inzerátu",
    "body": "Nevzdávejte to. Dokončete formulář a získejte nabídky od hlídaček, které dokonale splňují vaše potřeby.",
    "leave": "Odejít",
    "stay": "Zobrazit nabídky"
  },

  "service": {
    "heroTitle": "Koho hledáte?",
    "heroSub": "Vyberte, s čím potřebujete od hlídačky pomoci.",
    "sectionLabel": "Vyberte jednu nebo více oblastí pomoci",
    "validationAlert": "Prosím vyberte alespoň jednu službu",
    "babysitting": "Hlídání dětí",
    "cleaning": "Úklid domácnosti",
    "pet": "Opatrování mazlíčků",
    "senior": "Péče o seniory",
    "tutoring": "Doučování"
  },

  "location": {
    "heroSub": "Místo zůstane skryté, ale i přesto vám ukážeme nejlepší hlídačky v okolí.",
    "inputLabel": "Místo",
    "inputPlaceholder": "Václavské náměstí, Praha",
    "hint": "Přesná adresa bude skrytá.",
    "validationAlert": "Prosím zadejte místo, kde hledáte pomoc",
    "titlePrefix": "Kde potřebujete",
    "titleFallback": "pomoc",
    "titleAnd": "a",
    "serviceNames": {
      "babysitting": "hlídání dětí",
      "cleaning": "úklid domácnosti",
      "pet": "opatrování mazlíčků",
      "senior": "péči o seniory",
      "tutoring": "doučování"
    }
  },

  "cleaning": {
    "heroTitle": "Co je potřeba uklidit?",
    "heroSub": "Na základě vašeho výběru připravíme návrh inzerátu.",
    "sectionLabel": "Co potřebujete uklidit?",
    "flat": "Byt",
    "house": "Dům"
  },

  "cleaningExtras": {
    "heroTitle": "Potřebujete pomoc s něčím dalším?",
    "heroSub": "Na základě vašeho výběru připravíme návrh inzerátu.",
    "sectionLabel": "Vyberte doplňkové služby",
    "optional": "(nepovinné)",
    "ironing": "Žehlení",
    "laundry": "Praní",
    "windowCleaning": "Mytí oken",
    "airbnbCleaning": "Airbnb / úklid apartmánů",
    "carCleaning": "Čištění auta",
    "moveCleaning": "Úklid při stěhování",
    "upholsteryCleaning": "Čištění čalounění",
    "lightMaintenance": "Drobná údržba domácnosti",
    "gardenHelp": "Pomoc se zahradou"
  },

  "pet": {
    "heroTitle": "Váš mazlíček",
    "heroSub": "Na základě vašeho výběru připravíme návrh inzerátu.",
    "sectionLabel": "O jaká zvířata je potřeba se postarat?",
    "dogs": "Psi",
    "cats": "Kočky",
    "other": "Jiná",
    "largePet": "Mám velkého psa",
    "validationAlert": "Prosím vyberte alespoň jedno zvíře"
  },

  "seniorCare": {
    "heroTitle": "Specifikace péče",
    "heroSub": "Pomůže nám to najít to nejlepší pro vaše blízké.",
    "careTypeLabel": "Jaký typ péče hledáte?",
    "liveIn": "Nepřetržitá péče (24/7)",
    "fullTime": "Péče na plný úvazek",
    "partTime": "Pravidelná docházka (zkrácený úvazek)"
  },

  "frequencyPet": {
    "heroTitle": "Kdy a kde?",
    "heroSub": "Doplňte poslední detaily k inzerátu.",
    "howOftenLabel": "Jak často potřebujete pomoc?",
    "onetime": "jednorázově (během dovolené)",
    "regularly": "pravidelně",
    "whereLabel": "Kde potřebujete pomoc?",
    "atMyHome": "u nás doma",
    "atSitterHome": "u hlídačky doma",
    "dontCare": "nezáleží mi na tom"
  },

  "frequency": {
    "heroTitle": "Kdy a jak často?",
    "heroSub": "Hledáte jednorázovou, nebo pravidelnou pomoc?",
    "sectionLabel": "Jak často potřebujete pomoc?",
    "regularly": "pravidelně",
    "onetime": "jednorázově",
    "daysLabel": "Vyberte preferované dny",
    "optional": "(nepovinné)",
    "days": {
      "mo": "Po", "tu": "Út", "we": "St", "th": "Čt",
      "fr": "Pá", "sa": "So", "su": "Ne"
    },
    "freqLabel": "Vyberte četnost",
    "freqOptions": [
      "Jednou týdně",
      "Dvakrát týdně",
      "Každý den",
      "Jednou za dva týdny",
      "Jednou měsíčně"
    ],
    "dateLabel": "Upřesněte datum a čas",
    "datePlaceholder": "např. každé pondělí od 16:00 do 20:00 a pátek od 14:00 do 18:00, počínaje příštím měsícem",
    "notsure": "nevím, ještě se rozhoduji",
    "dateLabelRegular": "Upřesněte datum a čas",
    "longterm": "Hledám dlouhodobou pomoc"
  },

  "review": {
    "heroTitle": "Zkontrolujte si svůj inzerát",
    "heroSub1": "Téměř hotovo!",
    "heroSub2": "Vašim kritériím odpovídá 128 hlídaček 🎉",
    "aiLabel": "✨ Přidejte pár detailů, abyste oslovili více hlídaček",
    "privacyNote": "Vaše osobní údaje zůstávají v soukromí a hlídačkám se nezobrazují.",
    "btnPost": "Zveřejnit inzerát",
    "footerNote": "Inzerát zveřejníme zdarma a vytvoříme vám účet na Hlídačky.cz, abyste vše mohli bezpečně spravovat.",
    "generatedTexts": {
      "babysitting": "Hledáme pečlivou a spolehlivou hlídačku pro naše děti. Potřebujeme pravidelnou pomoc a hledáme zkušeného, přátelského člověka.",
      "cleaning":    "Hledáme pomoc s pravidelným úklidem domácnosti. Bydlíme v bytě a potřebovali bychom pomoci také s žehlením a praním.",
      "pet":         "Hledáme zodpovědného člověka se zkušenostmi na opatrování našeho psa během dovolené. Péče bude probíhat u nás doma.",
      "senior":      "Hledáme laskavého a zodpovědného poskytovatele péče pro staršího člena rodiny. Cílem je každodenní pomoc a zajištění pohodlí domova.",
      "tutoring":    "Hledáme zkušeného doučovatele, který pomůže našemu dítěti se školními předměty a přípravou na zkoušky. Důležitá je pro nás trpělivost a přizpůsobivost."
    },
    "hintLabel": "Tip: Přidejte více detailů o vaší nabídce",
    "pillLanguage": "preferovaný jazyk",
    "pillNeeds": "speciální potřeby",
    "pillPrice": "odhadovaná cena",
    "modalCancel": "Zrušit",
    "modalAdd": "Přidat do popisu",
    "language": {
      "modalTitle": "Přidejte informace o jazyce hlídačky",
      "cs": "Čeština", "sk": "Slovenština", "en": "Angličtina",
      "de": "Němčina", "es": "Španělština", "fr": "Francouzština",
      "it": "Italština", "uk": "Ukrajinština",
      "moreLangs": "+ více jazyků",
      "appendText": "Preferujeme hlídačku, která mluví: {langs}."
    },
    "needs": {
      "modalTitle": "Přidejte informace o speciálních potřebách",
      "autism": "Autismus", "diabetes": "Diabetes", "asthma": "Astma",
      "adhd": "ADHD", "allergies": "Potravinové alergie",
      "childhood": "Dětské nemoci", "sleep": "Poruchy spánku",
      "vision": "Zrakové postižení", "hearing": "Sluchové postižení",
      "epilepsy": "Epilepsie", "other": "Jiné potřeby",
      "appendText": "Naše dítě má speciální potřeby: {needs}."
    },
    "price": {
      "modalTitle": "Zadejte vaše cenové očekávání",
      "label": "Nastavte cenu",
      "appendText": "Nabízíme {price}."
    }
  },

  "locationTutoring": {
    "heroTitle": "Kde chcete doučovat?",
    "heroSub": "Kde chcete, aby vaše dítě dostávalo hodiny?",
    "sectionLabel": "Vyberte jedno nebo více míst",
    "studentPlace": "U žáka doma",
    "tutorPlace": "U doučovatele",
    "online": "Online (video výuka)",
    "validationAlert": "Prosím vyberte alespoň jedno místo"
  },

  "subjects": {
    "heroTitle": "Předměty",
    "heroSub": "Vyberte jeden nebo více předmětů",
    "languagesLabel": "Jazyky",
    "scienceLabel": "Vědy",
    "musicLabel": "Hudba",
    "moreLanguages": "+ další jazyky",
    "moreMusic": "+ další hudební nástroje",
    "otherLabel": "Jakýkoli jiný předmět",
    "otherPlaceholder": "Programování, tanec, dějepis…",
    "cs": "Čeština", "en": "Angličtina", "de": "Němčina",
    "fr": "Francouzština", "it": "Italština", "es": "Španělština",
    "physics": "Fyzika", "math": "Matematika", "chemistry": "Chemie", "biology": "Biologie",
    "singing": "Zpěv", "piano": "Klavír", "guitar": "Kytara"
  },

  "contact": {
    "heroTitle": "Vaše jméno a e-mail",
    "heroSub": "Abychom vám mohli doručit odpovědi od hlídaček.",
    "nameLabel": "Celé jméno",
    "namePlaceholder": "např. Jana Nováková",
    "emailLabel": "E-mail",
    "emailPlaceholder": "jana.novakova@priklad.cz",
    "emailPrefsLabel": "Vyberte e-maily, které od nás chcete dostávat",
    "emailMonthly": "Měsíční dávka inspirace v tématech šitých na míru",
    "emailOffers": "Slevy a nabídky od Hlídačky.cz a partnerů"
  },

  "phone": {
    "heroTitle": "Telefonní číslo",
    "heroSub": "Vaše soukromé číslo s mezinárodní předvolbou. Jeho zobrazením získáte více kontaktů od hlídaček.",
    "inputLabel": "Telefonní číslo",
    "inputPlaceholder": "777 123 456",
    "skipLink": "Udělám to později"
  },

  "success": {
    "heroTitle": "A je to!",
    "heroSub": "Váš inzerát v místě {city} byl zveřejněn.",
    "body": "Po schválení zobrazíme váš inzerát hlídačkám ve vašem městě. Jejich odpovědi uvidíte ve svých zprávách a o každé nové vás rovnou informujeme.",
    "btnContinue": "Pokračovat",
    "editLink": "Upravit inzerát"
  }
});
})();
