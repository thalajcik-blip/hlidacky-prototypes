// Magyar. Strings from the localisation sheet are used verbatim (Állások, Új, 2 órája, 2,5 km-re,
// Gyermekfelügyelet, the 2 boys job, Kihagyás, Válasz, tab bar); service names follow jobs/strings_hu.js.
// Informal (tegezés), as in jobs/strings_hu.js.
(window.I18N = window.I18N || {}).hu = {
  name: "Magyar", locale: "hu",
  ui: {
    app: { title: "Állások" },
    cat: { new: "Új", replied: "Megválaszolt", archived: "Archivált" },
    aria: {
      categories: "Álláskategóriák", notif: "Értesítési beállítások", filtersActive: "Szűrők, {n} aktív",
      close: "Bezárás", more: "További lehetőségek", prevTpl: "Előző sablon", nextTpl: "Következő sablon", job: "Állás: {title}"
    },
    vert: { baby: "Gyermekfelügyelet", pet: "Kisállat-felügyelet", senior: "Idősgondozás", clean: "Háztartási takarítás", tutor: "Korrepetálás" },
    chip: { hoursAgo: "2 órája", yesterday: "Tegnap", away: "2,5 km-re" },
    addr: "Andrássy út, Budapest",
    stamp: { yes: "Érdekel", no: "Nem érdekel" },
    act: { skip: "Kihagyás", reply: "Válasz", send: "Válasz küldése", sending: "Küldés…", sent: "Elküldve", showDesc: "Állásleírás megjelenítése" },
    reply: { title: "Válaszod", clear: "Törlés", template: "sablon {i} / {n}" },
    empty: { title: "Mindent átnéztél", text: "Az új állások általában reggel érkeznek.<br>Szólunk, ha jön új.", replay: "Demo újraindítása" },
    toast: {
      archived: "Archiválva", undo: "Visszavonás", sent: "Elküldtük a válaszodat.", soon: "Ez nem része a prototípusnak",
      toNew: "Visszakerült az újak közé", noFilter: "A szűrés nem része a prototípusnak", notifSaved: "Értesítési beállítások mentve"
    },
    feed: {
      replied: "Megválaszolva", declined: "Elutasítva", readMore: "Tovább", messages: "Üzenetek megtekintése", unarchive: "Visszaállítás",
      none: "Nincs archivált állás", aria: "{flag}: {title}", unarchiveAria: "Visszaállítás: {title}"
    },
    filters: {
      title: "Szűrők", close: "Szűrők bezárása", services: "Válassz szolgáltatást", clear: "Törlés",
      babysitting: "Gyermekfelügyelet", cleaning: "Háztartási takarítás", petCare: "Kisállat-felügyelet", seniorCare: "Idősgondozás", tutoring: "Korrepetálás",
      location: "Helyszín", locationAria: "Helyszínszűrő", loc1: "Budapest, VI. kerület", loc2: "Szentendre",
      mine: "minden helyszínem", anywhere: "Bárhol", radius: "Körzet", radiusAria: "Körzetszűrő",
      show: { one: "{n} állás megjelenítése", other: "{n} állás megjelenítése" }
    },
    notif: {
      title: "Értesítési beállítások", email: "E-mail-értesítések", mobile: "Mobilértesítések",
      opts: ["Azonnal a közzététel után", "Soha", "Napi összefoglaló", "Heti összefoglaló"],
      further: "Értesíts a távolabbi állásokról is",
      note: 'Az összes mentett <a href="#" data-soon>címednek</a> és <a href="#" data-soon>profilodnak</a> megfelelő ajánlatokat kapod.',
      save: "Változások mentése"
    },
    tab: { search: "Keresés", favourites: "Kedvencek", messages: "Üzenetek", jobs: "Állások", bookings: "Foglalások" }
  },
  jobs: {
    baby: {
      title: "2 lány, 6 és 4 évesek, minden második kedd délután",
      desc: "Szia! Rendszeres gyermekfelügyeletre keresek segítséget decembertől a következő tanévre két gyermekhez, Matildához (novemberben lesz 6 éves) és Annához (4 éves). Az első alkalom kedden 14:00-kor lenne. Megbeszélés szerint kéthetente lehetne felügyelet. Közös nyaraláson is igénybe vehetnénk a segítséget, de mindent közös megegyezéssel.",
      tags: ["2 gyermek", "4–6 évesek", "Decembertől", "Kéthetente"],
      replies: [
        "Kedves Jana! Szívesen vigyáznék Matildára és Annára. Minden második kedd délután jól illik a beosztásomba, és az első alkalomra kedden 14:00-ra is el tudok jönni. Beszélhetnénk előtte röviden telefonon? Köszönöm, Irena",
        "Kedves Jana! A hirdetésed tökéletesen illik a beosztásomba, és csak 2,5 km-re lakom tőletek. Több éves tapasztalatom van ilyen korú lányokkal. Szívesen megismerkednék veled és a lányokkal a kezdés előtt. Irena",
        "Szia! Szívesen vállalnám Matilda és Anna felügyeletét decembertől. Kezdhetnék a keddi 14:00-s alkalommal, és közös nyaraláson is szívesen segítek. Mikor lenne alkalmas beszélni? Irena"
      ]
    },
    pet: {
      title: "Energikus golden retriever, reggeli séták hétköznap",
      desc: "Sziasztok! Megbízható kisállat-felügyelőt keresünk, aki minden hétköznap reggel 8 óra körül átjönne és megsétáltatná barátságos, 3 éves kutyánkat, Maxot. Nagyon jó lenne, ha valaki egy rendes, kb. 45 perces sétára is ráérne, utána friss vizet adna neki és gyorsan kifésülné. Max jól nevelt, szereti a többi kutyát, és szépen sétál pórázon.",
      tags: ["Hétköznap reggel", "45 perces séták", "Jól nevelt", "Barátságos más kutyákkal"],
      replies: [
        "Kedves Jana! Szívesen sétáltatnám Maxot minden hétköznap reggel 8-kor. Vigyáztam már több nagytestű kutyára, köztük egy golden retrieverre is, és csak 2,5 km-re lakom tőletek. Találkozhatnánk, hogy Max előbb megismerjen? Irena",
        "Kedves Jana! A reggeli séták Maxszal tökéletesen beleférnek a beosztásomba. Megbízható vagyok, imádom az energikus kutyákat, és a séta utáni fésülés meg a friss víz sem gond. Mikor lenne alkalmas beszélni? Irena",
        "Szia! Szívesen sétáltatnám Maxot hétköznap reggelente. Tapasztalt kutyaszitter vagyok, és szívesen küldök referenciákat. Mit szólnál egy közös próbasétához a kezdés előtt? Köszönöm, Irena"
      ]
    },
    senior: {
      title: "Mindennapi társaság és ügyintézés édesanyámnak",
      desc: "Kedves, türelmes segítőt keresek, aki hetente háromszor elkísérné a nagymamámat délutáni sétákra, segítene kisebb bevásárlásban, és szívesen elbeszélgetne vele. Vidám és önálló, de a járás már nehezebben megy neki, és nagyon szeret beszélgetni. Ideális esetben hétfőn, szerdán és pénteken délután.",
      tags: ["Heti 3×", "H/Sze/P", "Délutáni séták", "Kisebb bevásárlás"],
      replies: [
        "Kedves Jana! Szívesen lennék a hozzátartozód társasága. Van tapasztalatom idősekkel, és szeretem a sétákat, az ügyintézést és egy jó beszélgetést. A heti háromszori délután jól illik hozzám. Beszélhetnénk röviden telefonon? Irena",
        "Kedves Jana! Türelmes és nyugodt vagyok, és segítettem már idősebbeknek bevásárlásban és napi sétákban. Csak 2,5 km-re lakom tőletek, így megbízhatóan tudok jönni. Szívesen megismerkednék vele először. Irena",
        "Szia! Érdekel ez a munka. A délutáni séták, kisebb bevásárlások és beszélgetések nekem valók, és már jövő héten kezdhetek. Mikor lenne alkalmas megbeszélni a részleteket? Irena"
      ]
    },
    clean: {
      title: "Heti nagytakarítás egy 3 hálószobás családi házban",
      desc: "Szia! Alapos és megbízható segítséget keresünk rendszeres takarításra, vasalásra és rendrakásra minden csütörtök délelőtt. A házban három hálószoba, két fürdőszoba és egy kis kerti terasz van. Minden tisztítószert és eszközt biztosítunk, és van egy barátságos macskánk.",
      tags: ["Csütörtök délelőtt", "3 hálószoba", "Tisztítószerek biztosítva", "Macskás háztartás"],
      replies: [
        "Kedves Jana! Szívesen vállalnám a heti takarítást csütörtök délelőttönként. Több éves tapasztalatom van családi házak takarításában, vasalással együtt, és a macskákkal is jól kijövök. Beszélhetnénk röviden telefonon? Irena",
        "Kedves Jana! A csütörtök délelőttök jól illenek a beosztásomba, és csak 2,5 km-re lakom tőletek. Alaposan és megbízhatóan dolgozom, és szívesen egyeztetünk egy feladatlistát, hogy minden úgy legyen, ahogy szeretnéd. Irena",
        "Szia! Érdekel a családi házatok rendszeres takarítása. Már ezen a csütörtökön kezdhetek, és szívesen eljönnék előbb egy első látogatásra, hogy megbeszéljük a részleteket. Mikor lenne jó? Irena"
      ]
    },
    tutor: {
      title: "Középiskolai matek és fizika korrepetálás 15 éves diáknak",
      desc: "Tapasztalt egyetemistát vagy korrepetítort keresünk, aki hetente kétszer segítene a fiunknak behozni a lemaradást algebrából és a fizikai képletekből az év végi vizsgák előtt. Az órák lehetnek nálunk délután vagy online, ahogy neked jobban megfelel. Motivált, csak kell valaki türelmes, aki lépésről lépésre elmagyarázza a dolgokat.",
      tags: ["Algebra és fizika", "Heti 2×", "Személyesen vagy online", "Vizsgafelkészítés"],
      replies: [
        "Kedves Jana! Szívesen segítenék a fiadnak algebrából és fizikából a vizsgák előtt. Egyetemre járok, és két éve korrepetálok középiskolásokat. A heti két alkalom nekem megfelel. Irena",
        "Kedves Jana! Szeretem lépésről lépésre elmagyarázni a matekot és a fizikát, és tudok nálatok vagy online is tanítani. Kezdhetnénk egy első órával, hogy lássam, mire van a legnagyobb szüksége? Irena",
        "Szia! Szívesen korrepetálnám a fiadat. Segítek behozni a képleteket és hetente kétszer gyakorolni a vizsgafeladatokat. Mikor lenne alkalmas beszélni? Irena"
      ]
    },
    baby2: {
      title: "Megbízható bébiszittert keresünk egy édes kisgyerek mellé",
      desc: "Kedves, figyelmes segítőt keresünk vidám délutáni játékhoz, meseolvasáshoz és rendszeres gyermekfelügyelethez.",
      tags: ["Kisgyerek", "Délutáni játék", "Rendszeres felügyelet", "Meseolvasás"],
      replies: [
        "Kedves Jana! Nagyon szívesen vigyáznék a kicsire. Imádom a délutáni játékot és a meseolvasást, és csak 2,5 km-re lakom tőletek. Megbeszélhetnénk egy találkozót? Irena",
        "Kedves Jana! Van tapasztalatom kisgyerekekkel, és szívesen segítek a játékban, a mesékben és a rendszeres felügyeletben. Mikor lenne alkalmas megbeszélni a részleteket? Irena",
        "Szia! Szívesen vigyáznék a kisgyerekedre. Türelmes és megbízható vagyok, és szeretek kreatívan játszani és együtt olvasni. Beszélhetnénk röviden telefonon ezen a héten? Irena"
      ]
    },
    baby3: {
      title: "2 fiú, 6 és 4 évesek, minden második kedd délután",
      desc: "Energikus és gondoskodó segítséget keresünk rendszeres gyermekfelügyelethez, kreatív játékhoz és könnyű felügyelethez.",
      tags: ["2 fiú", "4–6 évesek", "Kéthetente", "Kreatív játék"],
      replies: [
        "Kedves Jana! Szívesen vigyáznék a fiaidra minden második kedd délután. Szeretem a mozgalmas játékokat és a kreatív programokat, és csak 2,5 km-re lakom tőletek. Beszélhetnénk röviden telefonon? Irena",
        "Kedves Jana! Két fiú felügyelete kreatív játékkal és könnyű felügyelettel nagyon jól hangzik. Minden második kedd megfelel. Mikor lenne jó, hogy előbb megismerjem őket? Irena",
        "Szia! Szívesen vigyáznék a fiaidra minden második kedd délután. Van bennem bőven energia a mozgalmas játékokhoz. Megbeszélhetnénk egy első találkozót? Irena"
      ]
    },
    pet2: {
      title: "Bolyhos perzsa cica szerető napi gondoskodást és figyelmet keres",
      desc: "Gyengéd és megbízható cicavigyázót keresünk, aki átjönne, megetetné édes perzsa cicánkat, és gondoskodna róla, hogy jól érezze magát, amíg távol vagyunk.",
      tags: ["Perzsa cica", "Napi látogatás", "Etetés", "Amíg távol vagyunk"],
      replies: [
        "Kedves Jana! Szívesen gondoskodnék a perzsa cicádról. Gyengéd és megbízható vagyok, és csak 2,5 km-re lakom, így könnyen át tudok jönni. Megbeszélhetnénk, mikor ismerkedhetnék meg vele? Irena",
        "Kedves Jana! Nagyon kedvesen hangzik, hogy etessem és társaságot nyújtsak a cicádnak, amíg távol vagy. Van tapasztalatom hosszú szőrű macskákkal. Mikor lenne alkalmas beszélni? Irena",
        "Szia! Szívesen vigyáznék a perzsa cicádra. Naponta szívesen jönnék etetni és foglalkozni vele. Megbeszélhetnénk előbb egy ismerkedést? Irena"
      ]
    },
    pet3: {
      title: "Barátságos kiskutya napi sétákra és játékra vár",
      desc: "Gyengéd és megbízható kutyabarátot keresünk, aki átjönne, kellemes sétára vinné a kiskutyánkat, és társaságot nyújtana neki.",
      tags: ["Kiskutya", "Napi séták", "Társaság"],
      replies: [
        "Kedves Jana! Szívesen sétáltatnám naponta a kutyádat, és társaságot is nyújtanék neki. Imádom a kiskutyákat, és csak 2,5 km-re lakom tőletek. Találkozhatnánk, hogy megismerjen? Irena",
        "Kedves Jana! A napi séták és a játék a kutyáddal nagyon jól hangzanak. Megbízható vagyok, és gyengéden bánok az állatokkal. Mikor lenne alkalmas megbeszélni a beosztást? Irena",
        "Szia! Szívesen sétáltatnám a kutyádat és lennék a társasága. Van tapasztalatom kistestű fajtákkal. Megbeszélhetnénk egy közös próbasétát? Irena"
      ]
    },
    senior2: {
      title: "Mindennapi társaság és ügyintézés édesapámnak",
      desc: "Türelmes és melegszívű segítőt keresünk délutáni sétákhoz, kisebb bevásárlásokhoz és kellemes beszélgetésekhez.",
      tags: ["Naponta", "Délutáni séták", "Kisebb bevásárlás", "Társaság"],
      replies: [
        "Kedves Jana! Szívesen lennék az édesapád társasága. Szeretem a délutáni sétákat, a kisebb bevásárlásokat és egy jó beszélgetést, és csak 2,5 km-re lakom tőletek. Beszélhetnénk telefonon? Irena",
        "Kedves Jana! Türelmes és melegszívű vagyok, és segítettem már időseknek ügyintézésben és társaságként is. Mikor lenne alkalmas megbeszélni a részleteket? Irena",
        "Szia! Érdekel ez a munka. Segítek a sétákban, a bevásárlásban és a beszélgetésben is, és szívesen megismerkednék előbb az édesapáddal. Megbeszélhetnénk egy rövid látogatást? Irena"
      ]
    },
    senior3: {
      title: "Kedves idős házaspár keres segítséget délutánonként",
      desc: "Gondoskodó segítőt keresünk egy kedves idős házaspár mellé könnyű napi teendőkhöz, társasághoz és sétákhoz.",
      tags: ["Idős házaspár", "Napi teendők", "Társaság", "Séták"],
      replies: [
        "Kedves Jana! Szívesen segítenék a házaspárnak délutánonként a napi teendőkben és a sétákban, és társaságot is nyújtanék. Csak 2,5 km-re lakom tőletek. Megbeszélhetnénk egy találkozót? Irena",
        "Kedves Jana! Egy idős házaspár támogatása könnyű feladatokkal és jó társasággal nagyon szépen hangzik. Türelmes és megbízható vagyok. Mikor lenne alkalmas beszélni? Irena",
        "Szia! Szívesen segítenék a házaspárnak délutánonként. Szeretek társaságot nyújtani és segíteni a kisebb napi teendőkben. Megbeszélhetnénk egy első látogatást? Irena"
      ]
    },
    clean2: {
      title: "Heti nagytakarítás egy 3 hálószobás családi házban",
      desc: "Alapos és megbízható takarítót keresünk a fürdőszobák rendszeres fertőtlenítésére, porolásra és általános rendben tartásra.",
      tags: ["Hetente", "Fürdőszobák", "Porolás", "Általános rendben tartás"],
      replies: [
        "Kedves Jana! Szívesen vállalnám a heti nagytakarítást, a fürdőszobákkal és a porolással együtt. Csak 2,5 km-re lakom tőletek. Beszélhetnénk röviden telefonon? Irena",
        "Kedves Jana! A fürdőszobák alapos fertőtlenítését és az általános rendben tartást minden héten gondosan végzem. Mikor lenne alkalmas egyeztetni a részleteket? Irena",
        "Szia! Érdekel a 3 hálószobás házad heti takarítása. Szívesen eljönnék előbb egy első alkalomra, hogy lássam, mire van szükség. Megbeszélhetnénk egy időpontot? Irena"
      ]
    },
    clean3: {
      title: "Egyszeri alapos takarítás festés után egy lakásban",
      desc: "Precíz takarítót keresünk, aki segítene rendet rakni festés után: festékpor eltávolítása, padlómosás és a felületek letörlése.",
      tags: ["Egyszeri munka", "Festékpor", "Padló és felületek"],
      replies: [
        "Kedves Jana! Szívesen segítenék a festés utáni takarításban: eltávolítom a port, és felmosom az összes padlót és felületet. Csak 2,5 km-re lakom tőletek. Megbeszélhetnénk egy időpontot? Irena",
        "Kedves Jana! A festékpor eltakarítását és a felületek letörlését gondosan végzem. Mikor lenne jó az egyszeri alkalom? Irena",
        "Szia! Érdekel a festés utáni takarítás. Precíz vagyok, és saját eszközöket is hozhatok. Megbeszélhetnénk egy időpontot ezen a héten? Irena"
      ]
    },
    tutor2: {
      title: "Zongoraórák 15 éves lányunknak",
      desc: "Tapasztalt korrepetítort keresünk, aki segítene a lányunknak elsajátítani a középiskolai reál tárgyakat, és felkészülni a közelgő vizsgákra.",
      tags: ["Középiskola", "Vizsgafelkészítés", "Reál tárgyak"],
      replies: [
        "Kedves Jana! Szívesen segítenék a lányodnak a vizsgafelkészülésben. Van tapasztalatom tinédzserek korrepetálásában, és csak 2,5 km-re lakom tőletek. Kezdhetnénk egy első órával, hogy lássam, mire van a legnagyobb szüksége? Irena",
        "Kedves Jana! Szeretek motivált diákokkal dolgozni, és segíteni nekik, hogy magabiztosan menjenek a vizsgákra. Mikor lenne jó kezdeni? Irena",
        "Szia! Szívesen korrepetálnám a lányodat. A napok és időpontok terén rugalmas vagyok. Beszélhetnénk röviden telefonon a részletekről? Irena"
      ]
    },
    tutor3: {
      title: "Türelmes korrepetálás középiskolai vizsgafelkészítéshez",
      desc: "Lelkes egyetemistát keresünk, aki elmagyarázza a nehéz képleteket, és segít magabiztosságot szerezni matekból és fizikából.",
      tags: ["Matek és fizika", "Egyetemista", "Vizsgafelkészítés"],
      replies: [
        "Kedves Jana! Szívesen segítenék a matek- és fizikaképletekben és a vizsgafelkészülésben. Egyetemista vagyok, és csak 2,5 km-re lakom tőletek. Kezdhetnénk egy próbaórával? Irena",
        "Kedves Jana! Szívesen segítek magabiztosságot szerezni matekból és fizikából a vizsgák előtt. Mikor lenne alkalmas megbeszélni a beosztást? Irena",
        "Szia! Érdekel a középiskolai vizsgafelkészítés. Lépésről lépésre el tudom magyarázni a képleteket, és alkalmazkodom a lányod tempójához. Megbeszélhetnénk egy első órát? Irena"
      ]
    }
  }
};
