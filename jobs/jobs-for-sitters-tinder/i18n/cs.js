// Reviewed card copy: grammar, natural phrasing and consistency across titles, descriptions, tags and replies.
(window.I18N = window.I18N || {}).cs = {
  name: "Čeština", locale: "cs",
  ui: {
    app: { title: "Inzeráty" },
    cat: { new: "Nové", replied: "Zodpovězené", archived: "Archivované" },
    aria: {
      categories: "Kategorie inzerátů", notif: "Nastavení upozornění", filtersActive: "Filtry, aktivní: {n}",
      close: "Zavřít", more: "Další možnosti", prevTpl: "Předchozí šablona", nextTpl: "Další šablona", job: "Inzerát: {title}"
    },
    vert: { baby: "Hlídání dětí", pet: "Opatrování mazlíčků", senior: "Péče o seniory", clean: "Úklid domácnosti", tutor: "Doučování" },
    chip: { hoursAgo: "Před 2 hodinami", yesterday: "Včera", away: "2,5 km daleko" },
    addr: "Jandáskova, Praha 2",
    stamp: { yes: "Mám zájem", no: "Nemám zájem" },
    act: { skip: "Přeskočit", reply: "Odpovědět", send: "Odeslat odpověď", sending: "Odesílám…", sent: "Odesláno", showDesc: "Zobrazit popis inzerátu" },
    reply: { title: "Vaše odpověď", clear: "Vymazat", template: "šablona {i} / {n}" },
    empty: { title: "Máte prošlé všechny inzeráty", text: "Nové inzeráty obvykle přibývají ráno.<br>Dáme vám vědět.", replay: "Přehrát demo znovu" },
    toast: {
      archived: "Přesunuto do archivu", undo: "Zpět", sent: "Vaše odpověď byla odeslána.", soon: "Tohle prototyp neobsahuje",
      toNew: "Přesunuto mezi nové", noFilter: "Filtrování prototyp neobsahuje", notifSaved: "Nastavení upozornění je uložené"
    },
    feed: {
      replied: "Odpověděno", declined: "Odmítnuto", readMore: "Číst dál", messages: "Zobrazit zprávy", unarchive: "Obnovit z archivu",
      none: "Žádné archivované inzeráty", aria: "{flag}: {title}", unarchiveAria: "Obnovit z archivu: {title}"
    },
    filters: {
      title: "Filtry", close: "Zavřít filtry", services: "Vyberte služby", clear: "Vymazat",
      babysitting: "Hlídání dětí", cleaning: "Úklid domácnosti", petCare: "Opatrování mazlíčků", seniorCare: "Péče o seniory", tutoring: "Doučování",
      location: "Lokalita", locationAria: "Filtr lokality", loc1: "Praha 2", loc2: "Brandýs nad Labem",
      mine: "všechny moje lokality", anywhere: "Kdekoli", radius: "Okruh", radiusAria: "Filtr okruhu",
      show: { one: "Zobrazit {n} inzerát", few: "Zobrazit {n} inzeráty", other: "Zobrazit {n} inzerátů" }
    },
    notif: {
      title: "Nastavení upozornění", email: "Upozornění e-mailem", mobile: "Upozornění v mobilu",
      opts: ["Ihned po zveřejnění", "Nikdy", "Souhrn jednou denně", "Souhrn jednou týdně"],
      further: "Upozorňovat mě i na vzdálenější inzeráty",
      note: 'Budete dostávat nabídky odpovídající všem vašim uloženým <a href="#" data-soon>adresám</a> a <a href="#" data-soon>profilům</a>.',
      save: "Uložit změny"
    },
    tab: { search: "Hledat", favourites: "Oblíbené", messages: "Zprávy", jobs: "Inzeráty", bookings: "Rezervace" }
  },
  jobs: {
    baby: {
      title: "2 holky ve věku 6 a 4 let, každé druhé úterý odpoledne",
      desc: "Dobrý den, hledám hlídačku na pravidelné hlídání od prosince pro dvě děti, Matyldu (v listopadu jí bude 6) a Annu (4 roky). První hlídání v úterý ve 14:00. Po domluvě je možné hlídání každé 2 týdny. Hlídačku můžeme vzít i na společnou dovolenou, ale vše po vzájemné dohodě.",
      tags: ["2 děti", "4–6 let", "Od prosince", "Každé 2 týdny"],
      replies: [
        "Dobrý den, Jano, ráda pohlídám Matyldu a Annu. Každé druhé úterý odpoledne mi vyhovuje a na první hlídání v úterý ve 14:00 můžu přijít. Mohly bychom si předtím krátce zavolat? Děkuji, Irena",
        "Dobrý den, Jano, váš inzerát přesně sedí do mého rozvrhu a bydlím jen 2,5 km od vás. S holkami v tomhle věku mám několikaleté zkušenosti. Ráda se s vámi i s holkami před začátkem seznámím. Irena",
        "Dobrý den, mám zájem o hlídání Matyldy a Anny od prosince. Můžu začít úterním hlídáním ve 14:00 a ráda pomůžu i na společné dovolené. Kdy by vám vyhovovalo si zavolat? Irena"
      ]
    },
    pet: {
      title: "Energický zlatý retrívr, ranní procházky ve všední dny",
      desc: "Dobrý den, hledáme spolehlivou hlídačku, která by k nám každý všední den kolem 8:00 zašla a vyvenčila našeho přátelského tříletého psa Maxe. Moc bychom ocenili někoho, kdo s ním vydrží na pořádné procházce asi 45 minut, doplní mu vodu a krátce ho pročeše. Max je dobře vycvičený, má rád ostatní psy a na vodítku chodí hezky.",
      tags: ["Ve všední dny ráno", "Procházky 45 min", "Dobře vycvičený", "Kamarádí se se psy"],
      replies: [
        "Dobrý den, Jano, ráda budu Maxe venčit každý všední den v 8:00. Starala jsem se už o několik velkých psů včetně zlatého retrívra a bydlím jen 2,5 km od vás. Mohly bychom se potkat, aby mě Max nejdřív poznal? Irena",
        "Dobrý den, Jano, ranní procházky s Maxem mi do rozvrhu sedí perfektně. Jsem spolehlivá, energické psy mám ráda a pročesání i čerstvá voda po procházce nejsou problém. Kdy by vám vyhovovalo si zavolat? Irena",
        "Dobrý den, mám zájem venčit Maxe ve všední dny ráno. S hlídáním psů mám zkušenosti a ráda vám pošlu reference. Nechcete před začátkem vyrazit na společnou zkušební procházku? Děkuji, Irena"
      ]
    },
    senior: {
      title: "Společnost a pomoc s nákupy pro maminku 3× týdně",
      desc: "Hledám laskavého a trpělivého člověka, který by mé mamince třikrát týdně dělal společnost na odpoledních procházkách, pomohl s menším nákupem a rád si s ní popovídal. Je veselá a samostatná, jen chůze jí už dělá potíže a moc ráda si s někým popovídá. Ideálně v pondělí, ve středu a v pátek odpoledne.",
      tags: ["3× týdně", "Po/St/Pá", "Odpolední procházky", "Menší nákupy"],
      replies: [
        "Dobrý den, Jano, ráda budu vaší mamince dělat společnost. Se seniory mám zkušenosti a procházky, pochůzky i dobrý rozhovor mě baví. Odpolední návštěvy třikrát týdně mi vyhovují. Mohly bychom si krátce zavolat? Irena",
        "Dobrý den, Jano, jsem trpělivá a klidná a starším lidem jsem už pomáhala s nákupy i každodenními procházkami. Bydlím jen 2,5 km od vás, takže můžu chodit spolehlivě. Ráda se s ní nejdřív seznámím. Irena",
        "Dobrý den, o tuhle práci mám zájem. Odpolední procházky, menší nákupy a povídání mi sedí a začít můžu příští týden. Kdy by vám vyhovovalo probrat podrobnosti? Irena"
      ]
    },
    clean: {
      title: "Týdenní důkladný úklid rodinného domu se 3 ložnicemi",
      desc: "Dobrý den, hledáme důkladnou a důvěryhodnou pomoc na pravidelný úklid domácnosti a žehlení každý čtvrtek dopoledne. Dům má tři ložnice, dvě koupelny a malou zahradní terasu. Všechny čisticí prostředky a pomůcky zajistíme a máme přátelskou kočku.",
      tags: ["Čtvrtek dopoledne", "3 ložnice", "Prostředky zajištěny", "Domácnost s kočkou"],
      replies: [
        "Dobrý den, Jano, ráda se postarám o týdenní úklid ve čtvrtek dopoledne. S úklidem rodinných domů včetně žehlení mám několikaleté zkušenosti a kočky mi nevadí. Mohly bychom si krátce zavolat? Irena",
        "Dobrý den, Jano, čtvrteční dopoledne mi vyhovují a bydlím jen 2,5 km od vás. Pracuji důkladně a spolehlivě a ráda se s vámi domluvím na seznamu úkolů, aby bylo všechno podle vašich představ. Irena",
        "Dobrý den, mám zájem o pravidelný úklid vašeho rodinného domu. Začít můžu už tento čtvrtek a ráda přijdu na úvodní návštěvu, abychom se domluvily na podrobnostech. Kdy by vám to vyhovovalo? Irena"
      ]
    },
    tutor: {
      title: "Doučování středoškolské matematiky a fyziky pro 15letého syna",
      desc: "Hledáme zkušeného vysokoškoláka nebo doučovatele, který by našemu synovi dvakrát týdně pomohl doplnit znalosti algebry a fyzikálních vzorců před závěrečnými zkouškami. Hodiny můžou probíhat u nás doma odpoledne nebo online, jak vám to bude víc vyhovovat. Syn je motivovaný, jen potřebuje někoho trpělivého, kdo mu věci vysvětlí krok za krokem.",
      tags: ["Algebra a fyzika", "2× týdně", "Osobně i online", "Příprava na zkoušky"],
      replies: [
        "Dobrý den, Jano, ráda pomůžu vašemu synovi s algebrou a fyzikou před zkouškami. Studuji vysokou školu a středoškoláky doučuji už dva roky. Dvakrát týdně mi vyhovuje. Irena",
        "Dobrý den, Jano, baví mě vysvětlovat matematiku a fyziku krok za krokem a můžu doučovat u vás doma i online. Nemohly bychom začít první hodinou, abych zjistila, co syn potřebuje nejvíc? Irena",
        "Dobrý den, mám zájem doučovat vašeho syna. Pomůžu mu doplnit znalosti vzorců a dvakrát týdně si procvičit příklady ke zkouškám. Kdy by vám vyhovovalo si zavolat? Irena"
      ]
    },
    baby2: {
      title: "Hledáme spolehlivou hlídačku pro milé batole",
      desc: "Hledáme laskavou a pozornou hlídačku na zábavné odpolední hraní, čtení pohádek a pravidelné hlídání.",
      tags: ["Batole", "Odpolední hraní", "Pravidelné hlídání", "Čtení pohádek"],
      replies: [
        "Dobrý den, Jano, ráda budu hlídat vaše batole. Odpolední hraní a čtení pohádek mě moc baví a bydlím jen 2,5 km od vás. Mohly bychom se domluvit na seznámení? Irena",
        "Dobrý den, Jano, s batolaty mám zkušenosti a ráda pomůžu s hraním, pohádkami i pravidelným hlídáním. Kdy by vám vyhovovalo probrat podrobnosti? Irena",
        "Dobrý den, mám zájem hlídat vaše batole. Jsem trpělivá a spolehlivá a ráda si s dětmi tvořivě hraji a čtu. Mohly bychom si tento týden krátce zavolat? Irena"
      ]
    },
    baby3: {
      title: "2 kluci ve věku 6 a 4 let, každé druhé úterý odpoledne",
      desc: "Hledáme energickou a pečlivou pomoc na pravidelné hlídání dětí, kreativní hry a dohled nad dětmi.",
      tags: ["2 kluci", "4–6 let", "Každé 2 týdny", "Kreativní hry"],
      replies: [
        "Dobrý den, Jano, ráda pohlídám vaše kluky každé druhé úterý odpoledne. Baví mě akční hry a tvoření a bydlím jen 2,5 km od vás. Mohly bychom si krátce zavolat? Irena",
        "Dobrý den, Jano, hlídání dvou kluků s kreativními hrami a dohledem zní skvěle. Každé druhé úterý mi vyhovuje. Kdy by se vám hodilo, abych je nejdřív poznala? Irena",
        "Dobrý den, mám zájem hlídat vaše syny každé druhé úterý odpoledne. Na aktivní hry mám energie dost. Mohly bychom se domluvit na prvním setkání? Irena"
      ]
    },
    pet2: {
      title: "Načechraná perská kočka potřebuje každodenní péči a pozornost",
      desc: "Hledáme jemnou a spolehlivou hlídačku, která by k nám zašla, nakrmila naši milou perskou kočku a dohlédla, aby byla spokojená, zatímco budeme pryč.",
      tags: ["Perská kočka", "Denní návštěvy", "Krmení", "Během naší nepřítomnosti"],
      replies: [
        "Dobrý den, Jano, ráda se postarám o vaši perskou kočku. Ke zvířatům přistupuji citlivě a jsem spolehlivá. Bydlím jen 2,5 km od vás, takže můžu snadno zajít. Mohly bychom se domluvit, kdy se s ní seznámím? Irena",
        "Dobrý den, Jano, krmení a společnost pro vaši kočku, zatímco budete pryč, zní moc hezky. S dlouhosrstými kočkami mám zkušenosti. Kdy by vám vyhovovalo si zavolat? Irena",
        "Dobrý den, mám zájem postarat se o vaši perskou kočku. Ráda ji budu každý den chodit krmit a věnovat se jí. Mohly bychom se nejdřív seznámit? Irena"
      ]
    },
    pet3: {
      title: "Přátelský malý pejsek potřebuje denní procházky a hraní",
      desc: "Hledáme někoho jemného a spolehlivého, kdo má rád psy, zašel by k nám, vzal našeho pejska na příjemnou procházku a dělal mu společnost.",
      tags: ["Malý pejsek", "Denní procházky", "Společnost"],
      replies: [
        "Dobrý den, Jano, ráda budu vašeho pejska denně venčit a dělat mu společnost. Malé psy miluju a bydlím jen 2,5 km od vás. Mohly bychom se potkat, aby mě poznal? Irena",
        "Dobrý den, Jano, denní procházky a hraní s vaším pejskem znějí skvěle. Jsem spolehlivá a ke zvířatům jemná. Kdy by vám vyhovovalo probrat rozvrh? Irena",
        "Dobrý den, mám zájem venčit vašeho pejska a dělat mu společnost. S malými plemeny mám zkušenosti. Mohly bychom se domluvit na zkušební procházce? Irena"
      ]
    },
    senior2: {
      title: "Každodenní společnost a pochůzky pro mého tatínka",
      desc: "Hledáme trpělivou a vlídnou pomoc s odpoledními procházkami, menšími nákupy a příjemným povídáním.",
      tags: ["Denně", "Odpolední procházky", "Menší nákupy", "Společnost"],
      replies: [
        "Dobrý den, Jano, ráda budu vašemu tatínkovi dělat společnost. Odpolední procházky, menší nákupy i dobrý rozhovor mě baví a bydlím jen 2,5 km od vás. Mohly bychom si zavolat? Irena",
        "Dobrý den, Jano, jsem trpělivá a vlídná a seniorům jsem už pomáhala s pochůzkami i jako společnice. Kdy by vám vyhovovalo probrat podrobnosti? Irena",
        "Dobrý den, o tuhle práci mám zájem. Pomůžu s procházkami, nákupy i povídáním a ráda se s vaším tatínkem nejdřív seznámím. Mohly bychom se domluvit na krátké návštěvě? Irena"
      ]
    },
    senior3: {
      title: "Milý starší pár potřebuje laskavou pomoc odpoledne",
      desc: "Hledáme pečlivou pomoc pro milý starší pár s drobnými každodenními úkoly, společností a procházkami.",
      tags: ["Starší pár", "Každodenní úkoly", "Společnost", "Procházky"],
      replies: [
        "Dobrý den, Jano, ráda budu manželům odpoledne pomáhat s každodenními úkoly a procházkami a dělat jim společnost. Bydlím jen 2,5 km od vás. Mohly bychom se domluvit na setkání? Irena",
        "Dobrý den, Jano, pomoc staršímu páru s drobnými úkoly a povídáním zní moc hezky. Jsem trpělivá a spolehlivá. Kdy by vám vyhovovalo si zavolat? Irena",
        "Dobrý den, mám zájem pomáhat manželům odpoledne. Ráda dělám společnost a pomáhám s drobnými každodenními úkoly. Mohly bychom se domluvit na první návštěvě? Irena"
      ]
    },
    clean2: {
      title: "Týdenní důkladný úklid rodinného domu se 3 ložnicemi",
      desc: "Hledáme důkladnou a spolehlivou pomoc na pravidelnou dezinfekci koupelen, utírání prachu a běžnou údržbu domácnosti.",
      tags: ["Každý týden", "Koupelny", "Utírání prachu", "Běžná údržba"],
      replies: [
        "Dobrý den, Jano, ráda se postarám o týdenní důkladný úklid včetně koupelen a utírání prachu. Bydlím jen 2,5 km od vás. Mohly bychom si krátce zavolat? Irena",
        "Dobrý den, Jano, důkladnou dezinfekci koupelen a běžnou údržbu dělám pečlivě každý týden. Kdy by vám vyhovovalo domluvit podrobnosti? Irena",
        "Dobrý den, mám zájem o pravidelný týdenní úklid vašeho domu se 3 ložnicemi. Ráda přijdu na úvodní návštěvu, abych viděla, co je potřeba. Mohly bychom se domluvit na termínu? Irena"
      ]
    },
    clean3: {
      title: "Jednorázový důkladný úklid bytu po malování",
      desc: "Hledáme pečlivou pomoc s úklidem po malování, včetně odstranění prachu a zbytků barvy, vytření podlah a otření povrchů.",
      tags: ["Jednorázově", "Prach a zbytky barvy", "Podlahy a povrchy"],
      replies: [
        "Dobrý den, Jano, ráda pomůžu s úklidem po malování, odstraním prach a vytřu podlahy a otřu všechny povrchy. Bydlím jen 2,5 km od vás. Mohly bychom se domluvit na termínu? Irena",
        "Dobrý den, Jano, pečlivě odstraním prach a zbytky barvy a otřu povrchy. Kdy by se vám hodila jednorázová návštěva? Irena",
        "Dobrý den, mám zájem o úklid po malování. Jsem pečlivá a můžu si přinést vlastní vybavení. Mohly bychom se domluvit na termínu tento týden? Irena"
      ]
    },
    tutor2: {
      title: "Hodiny klavíru pro naši 15letou dceru",
      desc: "Hledáme zkušeného lektora klavíru pro naši 15letou dceru. Rádi bychom našli někoho trpělivého, kdo jí pomůže rozvíjet techniku hry a s jistotou hrát nové skladby.",
      tags: ["Klavír", "15 let", "Technika hry"],
      replies: [
        "Dobrý den, Jano, ráda pomůžu vaší dceři s hrou na klavír. S výukou dospívajících mám zkušenosti a bydlím jen 2,5 km od vás. Mohly bychom začít úvodní hodinou, abych zjistila, co potřebuje nejvíc? Irena",
        "Dobrý den, Jano, baví mě pomáhat mladým klavíristům rozvíjet techniku a získávat jistotu při hraní. Kdy by vám vyhovovalo začít? Irena",
        "Dobrý den, mám zájem učit vaši dceru hrát na klavír. Dny i časy si můžeme flexibilně přizpůsobit. Mohly bychom si krátce zavolat a probrat podrobnosti? Irena"
      ]
    },
    tutor3: {
      title: "Trpělivé doučování k přípravě na středoškolské zkoušky",
      desc: "Hledáme někoho z řad vysokoškolských studentů, kdo naší dceři poutavě vysvětlí náročné vzorce a pomůže jí získat jistotu v matematice a fyzice.",
      tags: ["Matematika a fyzika", "Student VŠ", "Příprava na zkoušky"],
      replies: [
        "Dobrý den, Jano, ráda pomůžu se vzorci z matematiky a fyziky i s přípravou na zkoušky. Studuji vysokou školu a bydlím jen 2,5 km od vás. Mohly bychom začít zkušební hodinou? Irena",
        "Dobrý den, Jano, baví mě pomáhat budovat jistotu v matematice a fyzice před zkouškami. Kdy by vám vyhovovalo probrat rozvrh? Irena",
        "Dobrý den, mám zájem o doučování na středoškolské zkoušky. Vzorce umím vysvětlit krok za krokem a přizpůsobím se tempu vaší dcery. Mohly bychom se domluvit na první hodině? Irena"
      ]
    }
  }
};
