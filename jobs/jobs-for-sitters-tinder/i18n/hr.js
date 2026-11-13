// Hrvatski. Strings from the localisation sheet are used verbatim (Poslovi, Novo, Prije 2 sata,
// Udaljeno 2,5 km, Čuvanje djece, the 2 boys job, Preskoči, Odgovori, tab bar); service names follow
// jobs/strings_hr.js. Formal (vi); the sitter writes in the feminine (Irena).
(window.I18N = window.I18N || {}).hr = {
  name: "Hrvatski", locale: "hr",
  ui: {
    app: { title: "Poslovi" },
    cat: { new: "Novo", replied: "Odgovoreno", archived: "Arhivirano" },
    aria: {
      categories: "Kategorije poslova", notif: "Postavke obavijesti", filtersActive: "Filteri, aktivno: {n}",
      close: "Zatvori", more: "Više opcija", prevTpl: "Prethodni predložak", nextTpl: "Sljedeći predložak", job: "Posao: {title}"
    },
    vert: { baby: "Čuvanje djece", pet: "Briga o kućnim ljubimcima", senior: "Briga o starijim osobama", clean: "Čišćenje kućanstva", tutor: "Podučavanje" },
    chip: { hoursAgo: "Prije 2 sata", yesterday: "Jučer", away: "Udaljeno 2,5 km" },
    addr: "Ilica, Zagreb",
    stamp: { yes: "Zanima me", no: "Ne zanima me" },
    act: { skip: "Preskoči", reply: "Odgovori", send: "Pošalji odgovor", sending: "Šaljem…", sent: "Poslano", showDesc: "Prikaži opis posla" },
    reply: { title: "Vaš odgovor", clear: "Obriši", template: "predložak {i} / {n}" },
    empty: { title: "Pregledali ste sve poslove", text: "Novi poslovi obično stižu ujutro.<br>Javit ćemo vam.", replay: "Ponovi demo" },
    toast: {
      archived: "Premješteno u arhivu", undo: "Poništi", sent: "Vaš odgovor je poslan.", soon: "Ovo nije dio prototipa",
      toNew: "Vraćeno među nove", noFilter: "Filtriranje nije dio prototipa", notifSaved: "Postavke obavijesti su spremljene"
    },
    feed: {
      replied: "Odgovoreno", declined: "Odbijeno", readMore: "Pročitaj više", messages: "Prikaži poruke", unarchive: "Vrati iz arhive",
      none: "Nema arhiviranih poslova", aria: "{flag}: {title}", unarchiveAria: "Vrati iz arhive: {title}"
    },
    filters: {
      title: "Filteri", close: "Zatvori filtere", services: "Odaberite usluge", clear: "Obriši",
      babysitting: "Čuvanje djece", cleaning: "Čišćenje kućanstva", petCare: "Briga o kućnim ljubimcima", seniorCare: "Briga o starijim osobama", tutoring: "Podučavanje",
      location: "Lokacija", locationAria: "Filter lokacije", loc1: "Zagreb – Donji grad", loc2: "Velika Gorica",
      mine: "sve moje lokacije", anywhere: "Bilo gdje", radius: "Radijus", radiusAria: "Filter radijusa",
      show: { one: "Prikaži {n} posao", few: "Prikaži {n} posla", other: "Prikaži {n} poslova" }
    },
    notif: {
      title: "Postavke obavijesti", email: "Obavijesti e-poštom", mobile: "Obavijesti na mobitelu",
      opts: ["Odmah nakon objave", "Nikad", "Sažetak jednom dnevno", "Sažetak jednom tjedno"],
      further: "Obavijesti me i o udaljenijim poslovima",
      note: 'Primat ćete ponude koje odgovaraju svim vašim spremljenim <a href="#" data-soon>adresama</a> i <a href="#" data-soon>profilima</a>.',
      save: "Spremi promjene"
    },
    tab: { search: "Pretraži", favourites: "Favoriti", messages: "Poruke", jobs: "Poslovi", bookings: "Bukiranja" }
  },
  jobs: {
    baby: {
      title: "2 djevojčice, 6 i 4 godine, svaki drugi utorak poslijepodne",
      desc: "Dobar dan, tražim osobu za redovito čuvanje djece od prosinca za cijelu sljedeću školsku godinu za dvoje djece, Matildu (u studenom puni 6 godina) i Annu (4 godine). Prvo čuvanje je u utorak u 14:00. Nakon dogovora moguće je čuvanje svaka 2 tjedna. Osobu za čuvanje djece možemo povesti i na zajednički odmor, ali sve uz međusobni dogovor.",
      tags: ["2 djece", "4–6 godina", "Od prosinca", "Svaka 2 tjedna"],
      replies: [
        "Dobar dan, Jana, rado ću čuvati Matildu i Annu. Svaki drugi utorak poslijepodne mi odgovara i mogu doći na prvo čuvanje u utorak u 14:00. Možemo li se prije toga kratko čuti telefonom? Hvala, Irena",
        "Dobar dan, Jana, vaš oglas savršeno odgovara mom rasporedu, a živim samo 2,5 km od vas. Imam višegodišnje iskustvo s djevojčicama te dobi. Rado bih upoznala vas i djevojčice prije početka. Irena",
        "Dobar dan, zainteresirana sam za čuvanje Matilde i Anne od prosinca. Mogu početi s čuvanjem u utorak u 14:00, a rado ću pomoći i na zajedničkom odmoru. Kada bi vam odgovaralo da se čujemo? Irena"
      ]
    },
    pet: {
      title: "Energični zlatni retriver, jutarnje šetnje radnim danima",
      desc: "Pozdrav svima, trebamo pouzdanu osobu za čuvanje ljubimaca koja bi svakog radnog dana oko 8:00 došla prošetati našeg prijateljskog trogodišnjeg psa Maxa. Voljeli bismo nekoga tko može ostati na pravoj šetnji od oko 45 minuta, napuniti mu vodu i kratko ga počešljati. Max je dobro dresiran, voli druge pse i lijepo hoda na povodcu.",
      tags: ["Radnim danima ujutro", "Šetnje od 45 min", "Dobro dresiran", "Prijateljski prema psima"],
      replies: [
        "Dobar dan, Jana, rado ću šetati Maxa svakog radnog dana u 8:00. Čuvala sam već nekoliko velikih pasa, uključujući zlatnog retrivera, a živim samo 2,5 km od vas. Možemo li se naći da me Max prvo upozna? Irena",
        "Dobar dan, Jana, jutarnje šetnje s Maxom savršeno se uklapaju u moj raspored. Pouzdana sam, volim energične pse, a češljanje i svježa voda nakon šetnje nisu problem. Kada bi vam odgovaralo da se čujemo? Irena",
        "Dobar dan, zainteresirana sam za šetanje Maxa radnim danima ujutro. Iskusna sam u čuvanju pasa i rado ću vam poslati preporuke. Biste li prije početka htjeli probnu zajedničku šetnju? Hvala, Irena"
      ]
    },
    senior: {
      title: "Svakodnevno društvo i obavljanje poslova za moju mamu",
      desc: "Tražim ljubaznu i strpljivu osobu koja bi tri puta tjedno pomagala mojoj baki s poslijepodnevnim šetnjama, manjom kupnjom i ugodnim razgovorom. Vesela je i samostalna, ali hodanje joj je postalo teže i jako voli imati nekoga za razgovor. Najbolje ponedjeljkom, srijedom i petkom poslijepodne.",
      tags: ["3× tjedno", "Pon/Sri/Pet", "Poslijepodnevne šetnje", "Manja kupnja"],
      replies: [
        "Dobar dan, Jana, rado ću praviti društvo vašoj dragoj osobi. Imam iskustva sa starijim osobama i uživam u šetnjama, obavljanju poslova i dobrom razgovoru. Poslijepodneva tri puta tjedno mi odgovaraju. Možemo li se kratko čuti? Irena",
        "Dobar dan, Jana, strpljiva sam i smirena, a starijim osobama već sam pomagala s kupnjom i svakodnevnim šetnjama. Živim samo 2,5 km od vas pa mogu pouzdano dolaziti. Rado bih je prvo upoznala. Irena",
        "Dobar dan, zainteresirana sam za ovaj posao. Poslijepodnevne šetnje, manja kupnja i razgovor mi odgovaraju, a mogu početi sljedeći tjedan. Kada bi vam odgovaralo da razgovaramo o detaljima? Irena"
      ]
    },
    clean: {
      title: "Tjedno temeljito čišćenje obiteljske kuće s 3 spavaće sobe",
      desc: "Dobar dan, tražimo temeljitu i pouzdanu osobu za redovito čišćenje, glačanje i pospremanje doma svakog četvrtka ujutro. Kuća ima tri spavaće sobe, dvije kupaonice i malu vrtnu terasu. Sva sredstva za čišćenje i oprema su osigurani, a imamo i prijateljsku mačku.",
      tags: ["Četvrtkom ujutro", "3 spavaće sobe", "Sredstva osigurana", "Dom s mačkom"],
      replies: [
        "Dobar dan, Jana, rado ću preuzeti tjedno čišćenje četvrtkom ujutro. Imam višegodišnje iskustvo s obiteljskim kućama, uključujući glačanje, a mačke mi ne smetaju. Možemo li se kratko čuti? Irena",
        "Dobar dan, Jana, četvrtkom ujutro mi odgovara, a živim samo 2,5 km od vas. Radim temeljito i pouzdano i rado ću s vama dogovoriti popis zadataka da sve bude po vašoj želji. Irena",
        "Dobar dan, zainteresirana sam za redovito čišćenje vaše obiteljske kuće. Mogu početi već ovaj četvrtak, a rado bih prvo došla na upoznavanje da dogovorimo detalje. Kada bi vam odgovaralo? Irena"
      ]
    },
    tutor: {
      title: "Pomoć iz srednjoškolske matematike i fizike za 15-godišnjaka",
      desc: "Tražimo iskusnog studenta ili instruktora koji bi našem sinu dva puta tjedno pomogao nadoknaditi gradivo iz algebre i fizikalnih formula prije završnih ispita. Satovi mogu biti kod nas doma poslijepodne ili online, kako vam više odgovara. Motiviran je, samo mu treba netko strpljiv tko će mu stvari objasniti korak po korak.",
      tags: ["Algebra i fizika", "2× tjedno", "Uživo ili online", "Priprema za ispite"],
      replies: [
        "Dobar dan, Jana, rado ću pomoći vašem sinu s algebrom i fizikom prije ispita. Studentica sam i već dvije godine dajem instrukcije srednjoškolcima. Dva puta tjedno mi odgovara. Irena",
        "Dobar dan, Jana, volim objašnjavati matematiku i fiziku korak po korak, a mogu dolaziti k vama ili raditi online. Možemo li početi prvim satom da vidim što vašem sinu najviše treba? Irena",
        "Dobar dan, zainteresirana sam za instrukcije vašem sinu. Pomoći ću mu nadoknaditi formule i dva puta tjedno vježbati ispitne zadatke. Kada bi vam odgovaralo da se čujemo? Irena"
      ]
    },
    baby2: {
      title: "Tražimo pouzdanu osobu za čuvanje slatkog mališana",
      desc: "Tražimo ljubaznu i pažljivu osobu za čuvanje djece za zabavnu poslijepodnevnu igru, čitanje priča i redovito čuvanje.",
      tags: ["Mališan", "Poslijepodnevna igra", "Redovito čuvanje", "Čitanje priča"],
      replies: [
        "Dobar dan, Jana, rado ću čuvati vašeg mališana. Poslijepodnevna igra i čitanje priča nešto su u čemu stvarno uživam, a živim samo 2,5 km od vas. Možemo li dogovoriti upoznavanje? Irena",
        "Dobar dan, Jana, imam iskustva s malom djecom i rado ću pomoći s igrom, pričama i redovitim čuvanjem. Kada bi vam odgovaralo da razgovaramo o detaljima? Irena",
        "Dobar dan, zainteresirana sam za čuvanje vašeg mališana. Strpljiva sam i pouzdana i volim kreativnu igru i zajedničko čitanje. Možemo li se ovaj tjedan kratko čuti? Irena"
      ]
    },
    baby3: {
      title: "2 dječaka, 6 i 4 godine, svaki drugi utorak poslijepodne",
      desc: "Tražimo energičnu i brižnu osobu za redovito čuvanje djece, kreativnu igru i lagani nadzor.",
      tags: ["2 dječaka", "4–6 godina", "Svaka 2 tjedna", "Kreativna igra"],
      replies: [
        "Dobar dan, Jana, rado ću čuvati vaše dečke svaki drugi utorak poslijepodne. Uživam u energičnoj igri i kreativnim aktivnostima, a živim samo 2,5 km od vas. Možemo li se kratko čuti? Irena",
        "Dobar dan, Jana, čuvanje dvojice dječaka uz kreativnu igru i lagani nadzor zvuči odlično. Svaki drugi utorak mi odgovara. Kada bi vam odgovaralo da ih prvo upoznam? Irena",
        "Dobar dan, zainteresirana sam za čuvanje vaših sinova svaki drugi utorak poslijepodne. Imam puno energije za aktivnu igru. Možemo li dogovoriti prvi susret? Irena"
      ]
    },
    pet2: {
      title: "Pahuljasta perzijska mačka treba svakodnevnu brigu i pažnju",
      desc: "Tražimo nježnu i pouzdanu osobu za čuvanje mačke koja bi svratila, nahranila našu dragu perzijsku mačku i brinula se da joj je lijepo dok smo odsutni.",
      tags: ["Perzijska mačka", "Svakodnevni posjeti", "Hranjenje", "Dok smo odsutni"],
      replies: [
        "Dobar dan, Jana, rado ću se brinuti o vašoj perzijskoj mački. Nježna sam i pouzdana, a živim samo 2,5 km od vas pa lako mogu svratiti. Možemo li dogovoriti kada da je upoznam? Irena",
        "Dobar dan, Jana, hranjenje i društvo vašoj mački dok ste odsutni zvuči divno. Imam iskustva s dugodlakim mačkama. Kada bi vam odgovaralo da se čujemo? Irena",
        "Dobar dan, zainteresirana sam za brigu o vašoj perzijskoj mački. Rado ću dolaziti svaki dan da je nahranim i posvetim joj pažnju. Možemo li prvo dogovoriti upoznavanje? Irena"
      ]
    },
    pet3: {
      title: "Prijateljski mali pas treba svakodnevne šetnje i igru",
      desc: "Tražimo nježnu i pouzdanu osobu koja voli pse, koja bi svratila, odvela našeg malog psa u ugodnu šetnju i pravila mu društvo.",
      tags: ["Mali pas", "Svakodnevne šetnje", "Društvo"],
      replies: [
        "Dobar dan, Jana, rado ću svaki dan šetati vašeg psa i praviti mu društvo. Obožavam male pse, a živim samo 2,5 km od vas. Možemo li se naći da me upozna? Irena",
        "Dobar dan, Jana, svakodnevne šetnje i igra s vašim psom zvuče odlično. Pouzdana sam i nježna prema životinjama. Kada bi vam odgovaralo da dogovorimo raspored? Irena",
        "Dobar dan, zainteresirana sam za šetanje vašeg psa i druženje s njim. Imam iskustva s malim pasminama. Možemo li dogovoriti probnu šetnju? Irena"
      ]
    },
    senior2: {
      title: "Svakodnevno društvo i obavljanje poslova za mog oca",
      desc: "Tražimo strpljivu i toplu osobu koja će pomagati s poslijepodnevnim šetnjama, manjom kupnjom i ugodnim razgovorima.",
      tags: ["Svaki dan", "Poslijepodnevne šetnje", "Manja kupnja", "Društvo"],
      replies: [
        "Dobar dan, Jana, rado ću praviti društvo vašem ocu. Uživam u poslijepodnevnim šetnjama, manjoj kupnji i dobrom razgovoru, a živim samo 2,5 km od vas. Možemo li se čuti? Irena",
        "Dobar dan, Jana, strpljiva sam i topla, a starijim osobama već sam pomagala s obavljanjem poslova i kao društvo. Kada bi vam odgovaralo da razgovaramo o detaljima? Irena",
        "Dobar dan, zainteresirana sam za ovaj posao. Mogu pomoći sa šetnjama, kupnjom i razgovorom, a rado bih prvo upoznala vašeg oca. Možemo li dogovoriti kratak posjet? Irena"
      ]
    },
    senior3: {
      title: "Dragi stariji par treba ljubaznu pomoć poslijepodne",
      desc: "Tražimo brižnu osobu koja bi dragom starijem paru pomagala s lakšim svakodnevnim zadacima, društvom i šetnjama.",
      tags: ["Stariji par", "Svakodnevni zadaci", "Društvo", "Šetnje"],
      replies: [
        "Dobar dan, Jana, rado ću poslijepodne pomagati paru sa svakodnevnim zadacima i šetnjama te im praviti društvo. Živim samo 2,5 km od vas. Možemo li dogovoriti susret? Irena",
        "Dobar dan, Jana, pomoć starijem paru s lakšim zadacima i ugodno društvo zvuče divno. Strpljiva sam i pouzdana. Kada bi vam odgovaralo da se čujemo? Irena",
        "Dobar dan, zainteresirana sam za poslijepodnevnu pomoć paru. Volim praviti društvo i pomagati s lakšim svakodnevnim zadacima. Možemo li dogovoriti prvi posjet? Irena"
      ]
    },
    clean2: {
      title: "Tjedno temeljito čišćenje obiteljske kuće s 3 spavaće sobe",
      desc: "Tražimo temeljitu i pouzdanu osobu za redovitu dezinfekciju kupaonica, brisanje prašine i opće održavanje kuće.",
      tags: ["Tjedno", "Kupaonice", "Brisanje prašine", "Opće održavanje"],
      replies: [
        "Dobar dan, Jana, rado ću preuzeti tjedno temeljito čišćenje, uključujući kupaonice i brisanje prašine. Živim samo 2,5 km od vas. Možemo li se kratko čuti? Irena",
        "Dobar dan, Jana, temeljitu dezinfekciju kupaonica i opće održavanje obavljam pažljivo svaki tjedan. Kada bi vam odgovaralo da dogovorimo detalje? Irena",
        "Dobar dan, zainteresirana sam za tjedno čišćenje vaše kuće s 3 spavaće sobe. Rado bih prvo došla da vidim što je potrebno. Možemo li dogovoriti termin? Irena"
      ]
    },
    clean3: {
      title: "Jednokratno temeljito čišćenje stana nakon bojanja",
      desc: "Tražimo pedantnu osobu koja bi nam pomogla počistiti nakon bojanja, uključujući uklanjanje prašine od boje, pranje podova i brisanje površina.",
      tags: ["Jednokratni posao", "Prašina od boje", "Podovi i površine"],
      replies: [
        "Dobar dan, Jana, rado ću pomoći s čišćenjem nakon bojanja, ukloniti prašinu i oprati sve podove i površine. Živim samo 2,5 km od vas. Možemo li dogovoriti termin? Irena",
        "Dobar dan, Jana, čišćenje prašine od boje i brisanje površina obavljam pažljivo. Kada bi vam odgovarao jednokratni dolazak? Irena",
        "Dobar dan, zainteresirana sam za čišćenje nakon bojanja. Pedantna sam i mogu donijeti vlastitu opremu. Možemo li dogovoriti termin ovaj tjedan? Irena"
      ]
    },
    tutor2: {
      title: "Satovi klavira za našu 15-godišnju kćer",
      desc: "Tražimo iskusnog instruktora koji bi našoj kćeri pomogao savladati srednjoškolske prirodoslovne i tehničke predmete te se pripremiti za nadolazeće ispite.",
      tags: ["Srednja škola", "Priprema za ispite", "STEM predmeti"],
      replies: [
        "Dobar dan, Jana, rado ću pomoći vašoj kćeri s pripremom za ispite. Imam iskustva s instrukcijama za tinejdžere, a živim samo 2,5 km od vas. Možemo li početi prvim satom da vidim što joj najviše treba? Irena",
        "Dobar dan, Jana, volim raditi s motiviranim učenicima i pomagati im da steknu samopouzdanje prije ispita. Kada bi vam odgovaralo da počnemo? Irena",
        "Dobar dan, zainteresirana sam za instrukcije vašoj kćeri. Fleksibilna sam oko dana i termina. Možemo li se kratko čuti i dogovoriti detalje? Irena"
      ]
    },
    tutor3: {
      title: "Strpljive instrukcije za pripremu srednjoškolskih ispita",
      desc: "Tražimo zanimljivog studenta ili studenticu koji će objasniti zahtjevne formule i pomoći steći samopouzdanje u matematici i fizici.",
      tags: ["Matematika i fizika", "Student/ica", "Priprema za ispite"],
      replies: [
        "Dobar dan, Jana, rado ću pomoći s formulama iz matematike i fizike te s pripremom za ispite. Studentica sam, a živim samo 2,5 km od vas. Možemo li početi probnim satom? Irena",
        "Dobar dan, Jana, volim pomagati u stjecanju samopouzdanja iz matematike i fizike prije ispita. Kada bi vam odgovaralo da dogovorimo raspored? Irena",
        "Dobar dan, zainteresirana sam za instrukcije za srednjoškolske ispite. Mogu objasniti formule korak po korak i prilagoditi se tempu vaše kćeri. Možemo li dogovoriti prvi sat? Irena"
      ]
    }
  }
};
