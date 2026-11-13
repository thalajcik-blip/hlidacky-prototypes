// Slovenčina. Strings from the localisation sheet are used verbatim (Inzeráty, Nové, Pred 2 hodinami,
// 2,5 km ďaleko, Opatrovanie detí, the 2 boys job, Preskočiť, Odpovedať, tab bar); service names follow
// jobs/strings_sk.js. The sitter is addressed formally (vykanie) and writes in the feminine (Irena).
(window.I18N = window.I18N || {}).sk = {
  name: "Slovenčina", locale: "sk",
  ui: {
    app: { title: "Inzeráty" },
    cat: { new: "Nové", replied: "Zodpovedané", archived: "Archivované" },
    aria: {
      categories: "Kategórie inzerátov", notif: "Nastavenia upozornení", filtersActive: "Filtre, aktívne: {n}",
      close: "Zavrieť", more: "Ďalšie možnosti", prevTpl: "Predchádzajúca šablóna", nextTpl: "Ďalšia šablóna", job: "Inzerát: {title}"
    },
    vert: { baby: "Opatrovanie detí", pet: "Stráženie zvieratiek", senior: "Starostlivosť o seniorov", clean: "Upratovanie domácnosti", tutor: "Doučovanie" },
    chip: { hoursAgo: "Pred 2 hodinami", yesterday: "Včera", away: "2,5 km ďaleko" },
    addr: "Obchodná, Bratislava",
    stamp: { yes: "Mám záujem", no: "Nemám záujem" },
    act: { skip: "Preskočiť", reply: "Odpovedať", send: "Odoslať odpoveď", sending: "Odosielam…", sent: "Odoslané", showDesc: "Zobraziť popis inzerátu" },
    reply: { title: "Vaša odpoveď", clear: "Vymazať", template: "šablóna {i} / {n}" },
    empty: { title: "Prešli ste všetky inzeráty", text: "Nové inzeráty zvyčajne pribúdajú ráno.<br>Dáme vám vedieť.", replay: "Prehrať demo znova" },
    toast: {
      archived: "Presunuté do archívu", undo: "Späť", sent: "Vaša odpoveď bola odoslaná.", soon: "Toto prototyp neobsahuje",
      toNew: "Presunuté medzi nové", noFilter: "Filtrovanie prototyp neobsahuje", notifSaved: "Nastavenia upozornení sú uložené"
    },
    feed: {
      replied: "Odpovedané", declined: "Odmietnuté", readMore: "Čítať ďalej", messages: "Zobraziť správy", unarchive: "Obnoviť z archívu",
      none: "Žiadne archivované inzeráty", aria: "{flag}: {title}", unarchiveAria: "Obnoviť z archívu: {title}"
    },
    filters: {
      title: "Filtre", close: "Zavrieť filtre", services: "Vyberte služby", clear: "Vymazať",
      babysitting: "Opatrovanie detí", cleaning: "Upratovanie domácnosti", petCare: "Stráženie zvieratiek", seniorCare: "Starostlivosť o seniorov", tutoring: "Doučovanie",
      location: "Lokalita", locationAria: "Filter lokality", loc1: "Bratislava – Staré Mesto", loc2: "Pezinok",
      mine: "všetky moje lokality", anywhere: "Kdekoľvek", radius: "Okruh", radiusAria: "Filter okruhu",
      show: { one: "Zobraziť {n} inzerát", few: "Zobraziť {n} inzeráty", other: "Zobraziť {n} inzerátov" }
    },
    notif: {
      title: "Nastavenia upozornení", email: "Upozornenia e-mailom", mobile: "Upozornenia v mobile",
      opts: ["Ihneď po zverejnení", "Nikdy", "Súhrn raz denne", "Súhrn raz týždenne"],
      further: "Upozorňovať ma aj na vzdialenejšie inzeráty",
      note: 'Budete dostávať ponuky zodpovedajúce všetkým vašim uloženým <a href="#" data-soon>adresám</a> a <a href="#" data-soon>profilom</a>.',
      save: "Uložiť zmeny"
    },
    tab: { search: "Hľadať", favourites: "Obľúbené", messages: "Správy", jobs: "Inzeráty", bookings: "Rezervácie" }
  },
  jobs: {
    baby: {
      title: "2 dievčatá, 6 a 4 roky, každý druhý utorok popoludní",
      desc: "Dobrý deň, hľadám hlídačku na pravidelné opatrovanie od decembra na celý budúci školský rok pre dve deti, Matildu (v novembri bude mať 6 rokov) a Annu (4 roky). Prvé opatrovanie v utorok o 14:00. Po dohode je možné opatrovanie každé 2 týždne. Hlídačku môžeme vziať aj na spoločnú dovolenku, ale všetko po vzájomnej dohode.",
      tags: ["2 deti", "4 – 6 rokov", "Od decembra", "Každé 2 týždne"],
      replies: [
        "Dobrý deň, Jana, rada postrážim Matildu a Annu. Každý druhý utorok popoludní mi vyhovuje a na prvé opatrovanie v utorok o 14:00 môžem prísť. Mohli by sme si predtým krátko zavolať? Ďakujem, Irena",
        "Dobrý deň, Jana, váš inzerát presne sedí do môjho rozvrhu a bývam len 2,5 km od vás. S dievčatami v tomto veku mám niekoľkoročné skúsenosti. Rada sa s vami aj s dievčatami pred začiatkom zoznámim. Irena",
        "Dobrý deň, mám záujem o opatrovanie Matildy a Anny od decembra. Môžem začať utorkovým opatrovaním o 14:00 a rada pomôžem aj na spoločnej dovolenke. Kedy by vám vyhovovalo zavolať si? Irena"
      ]
    },
    pet: {
      title: "Energický zlatý retríver, ranné prechádzky cez pracovné dni",
      desc: "Dobrý deň, hľadáme spoľahlivú hlídačku, ktorá by k nám každý pracovný deň okolo 8:00 zašla a vyvenčila nášho priateľského trojročného psa Maxa. Veľmi by sme ocenili niekoho, kto s ním vydrží na poriadnej prechádzke asi 45 minút, doplní mu vodu a krátko ho prečeše. Max je dobre vycvičený, má rád ostatných psov a na vodítku chodí pekne.",
      tags: ["Ráno cez pracovné dni", "Prechádzky 45 min", "Dobre vycvičený", "Kamaráti sa so psami"],
      replies: [
        "Dobrý deň, Jana, rada budem Maxa venčiť každý pracovný deň o 8:00. Starala som sa už o niekoľko veľkých psov vrátane zlatého retrívera a bývam len 2,5 km od vás. Mohli by sme sa stretnúť, aby ma Max najprv spoznal? Irena",
        "Dobrý deň, Jana, ranné prechádzky s Maxom mi do rozvrhu sedia perfektne. Som spoľahlivá, energických psov mám rada a prečesanie aj čerstvá voda po prechádzke nie sú problém. Kedy by vám vyhovovalo zavolať si? Irena",
        "Dobrý deň, mám záujem venčiť Maxa cez pracovné dni ráno. So strážením psov mám skúsenosti a rada vám pošlem referencie. Nechcete sa pred začiatkom spolu prejsť na skúšobnú prechádzku? Ďakujem, Irena"
      ]
    },
    senior: {
      title: "Každodenná spoločnosť a pochôdzky pre moju mamu",
      desc: "Hľadám láskavého a trpezlivého človeka, ktorý by mojej babke trikrát týždenne robil spoločnosť na popoludňajších prechádzkach, pomohol s menším nákupom a rád sa s ňou porozprával. Je veselá a samostatná, len chôdza jej už robí ťažkosti a veľmi rada sa s niekým porozpráva. Ideálne v pondelok, stredu a piatok popoludní.",
      tags: ["3× týždenne", "Po/St/Pi", "Popoludňajšie prechádzky", "Menšie nákupy"],
      replies: [
        "Dobrý deň, Jana, rada budem vašej blízkej robiť spoločnosť. So seniormi mám skúsenosti a prechádzky, pochôdzky aj dobrý rozhovor ma bavia. Popoludnia trikrát týždenne mi vyhovujú. Mohli by sme si krátko zavolať? Irena",
        "Dobrý deň, Jana, som trpezlivá a pokojná a starším ľuďom som už pomáhala s nákupmi aj každodennými prechádzkami. Bývam len 2,5 km od vás, takže môžem chodiť spoľahlivo. Rada sa s ňou najprv zoznámim. Irena",
        "Dobrý deň, o túto prácu mám záujem. Popoludňajšie prechádzky, menšie nákupy a rozhovory mi sedia a začať môžem budúci týždeň. Kedy by vám vyhovovalo prebrať podrobnosti? Irena"
      ]
    },
    clean: {
      title: "Týždenné dôkladné upratovanie rodinného domu s 3 spálňami",
      desc: "Dobrý deň, hľadáme dôkladnú a dôveryhodnú pomoc na pravidelné upratovanie, žehlenie a poriadok v domácnosti každý štvrtok dopoludnia. Dom má tri spálne, dve kúpeľne a malú záhradnú terasu. Všetky čistiace prostriedky a pomôcky zabezpečíme a máme priateľskú mačku.",
      tags: ["Štvrtok dopoludnia", "3 spálne", "Prostriedky zabezpečené", "Domácnosť s mačkou"],
      replies: [
        "Dobrý deň, Jana, rada sa postarám o týždenné upratovanie vo štvrtok dopoludnia. S upratovaním rodinných domov vrátane žehlenia mám niekoľkoročné skúsenosti a mačky mi nevadia. Mohli by sme si krátko zavolať? Irena",
        "Dobrý deň, Jana, štvrtkové dopoludnia mi vyhovujú a bývam len 2,5 km od vás. Pracujem dôkladne a spoľahlivo a rada sa s vami dohodnem na zozname úloh, aby bolo všetko podľa vašich predstáv. Irena",
        "Dobrý deň, mám záujem o pravidelné upratovanie vášho rodinného domu. Začať môžem už tento štvrtok a rada prídem najprv na prvú návštevu, aby sme sa dohodli na podrobnostiach. Kedy by vám to vyhovovalo? Irena"
      ]
    },
    tutor: {
      title: "Doučovanie stredoškolskej matematiky a fyziky pre 15-ročného",
      desc: "Hľadáme skúseného vysokoškoláka alebo doučovateľa, ktorý by nášmu synovi dvakrát týždenne pomohol dobehnúť algebru a fyzikálne vzorce pred záverečnými skúškami. Hodiny môžu prebiehať u nás doma popoludní alebo online, ako vám to bude viac vyhovovať. Syn je motivovaný, len potrebuje niekoho trpezlivého, kto mu veci vysvetlí krok za krokom.",
      tags: ["Algebra a fyzika", "2× týždenne", "Osobne aj online", "Príprava na skúšky"],
      replies: [
        "Dobrý deň, Jana, rada pomôžem vášmu synovi s algebrou a fyzikou pred skúškami. Študujem na vysokej škole a stredoškolákov doučujem už dva roky. Dvakrát týždenne mi vyhovuje. Irena",
        "Dobrý deň, Jana, baví ma vysvetľovať matematiku a fyziku krok za krokom a môžem doučovať u vás doma aj online. Mohli by sme začať prvou hodinou, aby som zistila, čo syn potrebuje najviac? Irena",
        "Dobrý deň, mám záujem doučovať vášho syna. Pomôžem mu dobehnúť vzorce a dvakrát týždenne si precvičiť príklady na skúšky. Kedy by vám vyhovovalo zavolať si? Irena"
      ]
    },
    baby2: {
      title: "Hľadáme spoľahlivú hlídačku pre milé batoľa",
      desc: "Hľadáme láskavú a pozornú hlídačku na zábavné popoludňajšie hranie, čítanie rozprávok a pravidelné opatrovanie.",
      tags: ["Batoľa", "Popoludňajšie hranie", "Pravidelné opatrovanie", "Čítanie rozprávok"],
      replies: [
        "Dobrý deň, Jana, rada budem opatrovať vaše batoľa. Popoludňajšie hranie a čítanie rozprávok ma veľmi baví a bývam len 2,5 km od vás. Mohli by sme sa dohodnúť na zoznámení? Irena",
        "Dobrý deň, Jana, s batoľatami mám skúsenosti a rada pomôžem s hraním, rozprávkami aj pravidelným opatrovaním. Kedy by vám vyhovovalo prebrať podrobnosti? Irena",
        "Dobrý deň, mám záujem opatrovať vaše batoľa. Som trpezlivá a spoľahlivá a rada sa s deťmi tvorivo hrám a čítam. Mohli by sme si tento týždeň krátko zavolať? Irena"
      ]
    },
    baby3: {
      title: "2 chlapci, 6 a 4 roky, každý druhý utorok popoludní",
      desc: "Hľadáme energickú a starostlivú pomoc na pravidelné opatrovanie detí, kreatívne hry a ľahký dohľad.",
      tags: ["2 chlapci", "4 – 6 rokov", "Každé 2 týždne", "Kreatívne hry"],
      replies: [
        "Dobrý deň, Jana, rada postrážim vašich chlapcov každý druhý utorok popoludní. Bavia ma akčné hry a tvorenie a bývam len 2,5 km od vás. Mohli by sme si krátko zavolať? Irena",
        "Dobrý deň, Jana, opatrovanie dvoch chlapcov s kreatívnymi hrami a ľahkým dohľadom znie skvele. Každý druhý utorok mi vyhovuje. Kedy by sa vám hodilo, aby som ich najprv spoznala? Irena",
        "Dobrý deň, mám záujem opatrovať vašich synov každý druhý utorok popoludní. Na aktívne hry mám energie dosť. Mohli by sme sa dohodnúť na prvom stretnutí? Irena"
      ]
    },
    pet2: {
      title: "Chlpatá perzská mačka potrebuje každodennú starostlivosť a pozornosť",
      desc: "Hľadáme jemnú a spoľahlivú hlídačku, ktorá by k nám zašla, nakŕmila našu milú perzskú mačku a postarala sa, aby bola spokojná, kým budeme preč.",
      tags: ["Perzská mačka", "Denné návštevy", "Kŕmenie", "Počas našej neprítomnosti"],
      replies: [
        "Dobrý deň, Jana, rada sa postarám o vašu perzskú mačku. Som jemná a spoľahlivá a bývam len 2,5 km od vás, takže môžem ľahko zájsť. Mohli by sme sa dohodnúť, kedy sa s ňou zoznámim? Irena",
        "Dobrý deň, Jana, kŕmenie a spoločnosť pre vašu mačku, kým budete preč, znie veľmi pekne. S dlhosrstými mačkami mám skúsenosti. Kedy by vám vyhovovalo zavolať si? Irena",
        "Dobrý deň, mám záujem postarať sa o vašu perzskú mačku. Rada budem chodiť každý deň kŕmiť ju a venovať sa jej. Mohli by sme sa najprv zoznámiť? Irena"
      ]
    },
    pet3: {
      title: "Priateľský malý psík potrebuje denné prechádzky a hranie",
      desc: "Hľadáme niekoho jemného a spoľahlivého, kto má rád psy, zašiel by k nám, vzal nášho psíka na príjemnú prechádzku a robil mu spoločnosť.",
      tags: ["Malý psík", "Denné prechádzky", "Spoločnosť"],
      replies: [
        "Dobrý deň, Jana, rada budem vášho psíka denne venčiť a robiť mu spoločnosť. Malé psy milujem a bývam len 2,5 km od vás. Mohli by sme sa stretnúť, aby ma spoznal? Irena",
        "Dobrý deň, Jana, denné prechádzky a hranie s vaším psíkom znejú skvele. Som spoľahlivá a k zvieratám jemná. Kedy by vám vyhovovalo prebrať rozvrh? Irena",
        "Dobrý deň, mám záujem venčiť vášho psíka a robiť mu spoločnosť. S malými plemenami mám skúsenosti. Mohli by sme sa dohodnúť na skúšobnej prechádzke? Irena"
      ]
    },
    senior2: {
      title: "Každodenná spoločnosť a pochôdzky pre môjho otca",
      desc: "Hľadáme trpezlivú a vľúdnu pomoc s popoludňajšími prechádzkami, menšími nákupmi a príjemnými rozhovormi.",
      tags: ["Denne", "Popoludňajšie prechádzky", "Menšie nákupy", "Spoločnosť"],
      replies: [
        "Dobrý deň, Jana, rada budem vášmu otcovi robiť spoločnosť. Popoludňajšie prechádzky, menšie nákupy aj dobrý rozhovor ma bavia a bývam len 2,5 km od vás. Mohli by sme si zavolať? Irena",
        "Dobrý deň, Jana, som trpezlivá a vľúdna a seniorom som už pomáhala s pochôdzkami aj ako spoločníčka. Kedy by vám vyhovovalo prebrať podrobnosti? Irena",
        "Dobrý deň, o túto prácu mám záujem. Pomôžem s prechádzkami, nákupmi aj rozhovormi a rada sa s vaším otcom najprv zoznámim. Mohli by sme sa dohodnúť na krátkej návšteve? Irena"
      ]
    },
    senior3: {
      title: "Milý starší pár potrebuje láskavú pomoc popoludní",
      desc: "Hľadáme starostlivú pomoc pre milý starší pár s drobnými každodennými úlohami, spoločnosťou a prechádzkami.",
      tags: ["Starší pár", "Každodenné úlohy", "Spoločnosť", "Prechádzky"],
      replies: [
        "Dobrý deň, Jana, rada budem manželom popoludní pomáhať s každodennými úlohami a prechádzkami a robiť im spoločnosť. Bývam len 2,5 km od vás. Mohli by sme sa dohodnúť na stretnutí? Irena",
        "Dobrý deň, Jana, pomoc staršiemu páru s drobnými úlohami a príjemná spoločnosť znie veľmi pekne. Som trpezlivá a spoľahlivá. Kedy by vám vyhovovalo zavolať si? Irena",
        "Dobrý deň, mám záujem pomáhať manželom popoludní. Rada robím spoločnosť a pomáham s drobnými každodennými úlohami. Mohli by sme sa dohodnúť na prvej návšteve? Irena"
      ]
    },
    clean2: {
      title: "Týždenné dôkladné upratovanie rodinného domu s 3 spálňami",
      desc: "Hľadáme dôkladnú a spoľahlivú pomoc na pravidelnú dezinfekciu kúpeľní, utieranie prachu a bežnú údržbu domácnosti.",
      tags: ["Každý týždeň", "Kúpeľne", "Utieranie prachu", "Bežná údržba"],
      replies: [
        "Dobrý deň, Jana, rada sa postarám o týždenné dôkladné upratovanie vrátane kúpeľní a utierania prachu. Bývam len 2,5 km od vás. Mohli by sme si krátko zavolať? Irena",
        "Dobrý deň, Jana, dôkladnú dezinfekciu kúpeľní a bežnú údržbu robím starostlivo každý týždeň. Kedy by vám vyhovovalo dohodnúť podrobnosti? Irena",
        "Dobrý deň, mám záujem o pravidelné týždenné upratovanie vášho domu s 3 spálňami. Rada prídem najprv na prvú návštevu, aby som videla, čo treba. Mohli by sme sa dohodnúť na termíne? Irena"
      ]
    },
    clean3: {
      title: "Jednorazové dôkladné upratovanie bytu po maľovaní",
      desc: "Hľadáme dôslednú pomoc s upratovaním po maľovaní vrátane odstránenia prachu z farby, umytia podláh a utretia povrchov.",
      tags: ["Jednorazovo", "Prach z farby", "Podlahy a povrchy"],
      replies: [
        "Dobrý deň, Jana, rada pomôžem s upratovaním po maľovaní, odstránim prach a umyjem všetky podlahy aj povrchy. Bývam len 2,5 km od vás. Mohli by sme sa dohodnúť na termíne? Irena",
        "Dobrý deň, Jana, upratovanie prachu z farby a utieranie povrchov robím starostlivo. Kedy by sa vám hodila jednorazová návšteva? Irena",
        "Dobrý deň, mám záujem o upratovanie po maľovaní. Som dôsledná a môžem si priniesť vlastné vybavenie. Mohli by sme sa dohodnúť na termíne tento týždeň? Irena"
      ]
    },
    tutor2: {
      title: "Hodiny klavíra pre našu 15-ročnú dcéru",
      desc: "Hľadáme skúseného doučovateľa, ktorý našej dcére pomôže zvládnuť stredoškolské prírodovedné a technické predmety a pripraviť sa na blížiace sa skúšky.",
      tags: ["Stredná škola", "Príprava na skúšky", "Prírodné vedy a technika"],
      replies: [
        "Dobrý deň, Jana, rada pomôžem vašej dcére s prípravou na skúšky. S doučovaním tínedžerov mám skúsenosti a bývam len 2,5 km od vás. Mohli by sme začať prvou hodinou, aby som zistila, čo potrebuje najviac? Irena",
        "Dobrý deň, Jana, baví ma pracovať s motivovanými študentmi a pomáhať im získať istotu pred skúškami. Kedy by vám vyhovovalo začať? Irena",
        "Dobrý deň, mám záujem doučovať vašu dcéru. Dni aj časy si môžeme flexibilne prispôsobiť. Mohli by sme si krátko zavolať a prebrať podrobnosti? Irena"
      ]
    },
    tutor3: {
      title: "Trpezlivé doučovanie na prípravu na stredoškolské skúšky",
      desc: "Hľadáme študenta alebo študentku vysokej školy, ktorí vedia pútavo vysvetliť náročné vzorce a pomôcť získať istotu v matematike a fyzike.",
      tags: ["Matematika a fyzika", "Študent VŠ", "Príprava na skúšky"],
      replies: [
        "Dobrý deň, Jana, rada pomôžem so vzorcami z matematiky a fyziky aj s prípravou na skúšky. Študujem na vysokej škole a bývam len 2,5 km od vás. Mohli by sme začať skúšobnou hodinou? Irena",
        "Dobrý deň, Jana, baví ma pomáhať budovať istotu v matematike a fyzike pred skúškami. Kedy by vám vyhovovalo prebrať rozvrh? Irena",
        "Dobrý deň, mám záujem o doučovanie na stredoškolské skúšky. Vzorce viem vysvetliť krok za krokom a prispôsobím sa tempu vašej dcéry. Mohli by sme sa dohodnúť na prvej hodine? Irena"
      ]
    }
  }
};
