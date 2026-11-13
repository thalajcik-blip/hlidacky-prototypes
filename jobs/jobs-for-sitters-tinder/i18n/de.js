// Deutsch (Österreich). Strings from the localisation sheet are used verbatim (Jobs, Neu, Vor 2 Stunden,
// 2,5 km entfernt, Babysitting, the 2 Buben job, Überspringen, Antworten, tab bar); service names follow
// jobs/strings_at.js. Formal (Sie), gender-neutral wording where it reads naturally, Austrian terms
// (Buben, Ausmalen, Oberstufe).
(window.I18N = window.I18N || {}).de = {
  name: "Deutsch (AT)", locale: "de-AT",
  ui: {
    app: { title: "Jobs" },
    cat: { new: "Neu", replied: "Beantwortet", archived: "Archiviert" },
    aria: {
      categories: "Job-Kategorien", notif: "Benachrichtigungseinstellungen", filtersActive: "Filter, {n} aktiv",
      close: "Schließen", more: "Weitere Optionen", prevTpl: "Vorherige Vorlage", nextTpl: "Nächste Vorlage", job: "Job: {title}"
    },
    vert: { baby: "Babysitting", pet: "Tierbetreuung", senior: "Seniorenbetreuung", clean: "Haushaltsreinigung", tutor: "Nachhilfeunterricht" },
    chip: { hoursAgo: "Vor 2 Stunden", yesterday: "Gestern", away: "2,5 km entfernt" },
    addr: "Mariahilfer Straße, Wien",
    stamp: { yes: "Interessiert", no: "Kein Interesse" },
    act: { skip: "Überspringen", reply: "Antworten", send: "Antwort senden", sending: "Wird gesendet…", sent: "Gesendet", showDesc: "Jobbeschreibung anzeigen" },
    reply: { title: "Ihre Antwort", clear: "Löschen", template: "Vorlage {i} / {n}" },
    empty: { title: "Sie haben alles gesehen", text: "Neue Jobs kommen meist am Vormittag.<br>Wir sagen Ihnen Bescheid.", replay: "Demo neu starten" },
    toast: {
      archived: "Ins Archiv verschoben", undo: "Rückgängig", sent: "Ihre Antwort wurde gesendet.", soon: "Nicht Teil dieses Prototyps",
      toNew: "Zu „Neu“ verschoben", noFilter: "Filtern ist nicht Teil dieses Prototyps", notifSaved: "Benachrichtigungen gespeichert"
    },
    feed: {
      replied: "Beantwortet", declined: "Abgelehnt", readMore: "Weiterlesen", messages: "Nachrichten anzeigen", unarchive: "Wiederherstellen",
      none: "Keine archivierten Jobs", aria: "{flag}: {title}", unarchiveAria: "Wiederherstellen: {title}"
    },
    filters: {
      title: "Filter", close: "Filter schließen", services: "Dienstleistungen auswählen", clear: "Löschen",
      babysitting: "Babysitting", cleaning: "Haushaltsreinigung", petCare: "Tierbetreuung", seniorCare: "Seniorenbetreuung", tutoring: "Nachhilfeunterricht",
      location: "Standort", locationAria: "Standortfilter", loc1: "Wien 6., Mariahilf", loc2: "Mödling",
      mine: "alle meine Standorte", anywhere: "Überall", radius: "Umkreis", radiusAria: "Umkreisfilter",
      show: { one: "{n} Job anzeigen", other: "{n} Jobs anzeigen" }
    },
    notif: {
      title: "Benachrichtigungen", email: "E-Mail-Benachrichtigungen", mobile: "Mobile Benachrichtigungen",
      opts: ["Sofort nach Veröffentlichung", "Nie", "Tägliche Zusammenfassung", "Wöchentliche Zusammenfassung"],
      further: "Auch über weiter entfernte Jobs benachrichtigen",
      note: 'Sie erhalten Jobangebote, die zu allen gespeicherten <a href="#" data-soon>Adressen</a> und <a href="#" data-soon>Profilen</a> passen.',
      save: "Änderungen speichern"
    },
    tab: { search: "Suchen", favourites: "Favoriten", messages: "Nachrichten", jobs: "Jobs", bookings: "Buchungen" }
  },
  jobs: {
    baby: {
      title: "2 Mädchen, 6 und 4 Jahre, jeden zweiten Dienstag Nachmittag",
      desc: "Hallo, ich suche ab Dezember für das nächste Schuljahr eine Betreuungsperson für regelmäßiges Babysitting für zwei Kinder, Matilda (wird im November 6) und Anna (4 Jahre). Erster Termin am Dienstag um 14:00. Nach Absprache ist Babysitting alle 2 Wochen möglich. Die Betreuung kann auch zu einem gemeinsamen Urlaub mitkommen, aber alles nach gegenseitiger Absprache.",
      tags: ["2 Kinder", "4–6 Jahre", "Ab Dezember", "Alle 2 Wochen"],
      replies: [
        "Hallo Jana, ich würde sehr gerne auf Matilda und Anna aufpassen. Jeder zweite Dienstagnachmittag passt mir gut, und zum ersten Termin am Dienstag um 14:00 kann ich kommen. Könnten wir vorher kurz telefonieren? Danke, Irena",
        "Hallo Jana, Ihr Job passt perfekt in meinen Zeitplan, und ich wohne nur 2,5 km entfernt. Ich habe mehrere Jahre Erfahrung mit Mädchen in diesem Alter. Gerne lerne ich Sie und die Mädchen vor dem Start kennen. Irena",
        "Hallo, ich interessiere mich für das Babysitting von Matilda und Anna ab Dezember. Ich kann mit dem Termin am Dienstag um 14:00 beginnen und helfe auch gerne bei einem gemeinsamen Urlaub. Wann passt es Ihnen für ein Gespräch? Irena"
      ]
    },
    pet: {
      title: "Energiegeladener Golden Retriever, Morgenspaziergänge unter der Woche",
      desc: "Hallo, wir suchen eine verlässliche Tierbetreuung, die jeden Wochentag gegen 8:00 vorbeikommt und mit unserem freundlichen dreijährigen Hund Max Gassi geht. Schön wäre jemand, der für einen richtigen Spaziergang von etwa 45 Minuten Zeit hat, danach sein Wasser auffüllt und ihn kurz bürstet. Max ist gut erzogen, mag andere Hunde und geht schön an der Leine.",
      tags: ["Wochentags morgens", "45-Min.-Spaziergänge", "Gut erzogen", "Verträglich mit Hunden"],
      replies: [
        "Hallo Jana, ich gehe gerne jeden Wochentag um 8:00 mit Max spazieren. Ich habe schon mehrere große Hunde betreut, darunter einen Golden Retriever, und wohne nur 2,5 km entfernt. Könnten wir uns treffen, damit Max mich zuerst kennenlernt? Irena",
        "Hallo Jana, Morgenspaziergänge mit Max passen perfekt in meinen Zeitplan. Ich bin zuverlässig, liebe energiegeladene Hunde, und Bürsten und frisches Wasser nach dem Spaziergang sind kein Problem. Wann passt es Ihnen für ein Gespräch? Irena",
        "Hallo, ich interessiere mich dafür, wochentags morgens mit Max spazieren zu gehen. Ich habe Erfahrung als Hundesitterin und schicke Ihnen gerne Referenzen. Wäre ein gemeinsamer Probespaziergang vor dem Start hilfreich? Danke, Irena"
      ]
    },
    senior: {
      title: "Tägliche Gesellschaft und Besorgungen für meine Mutter",
      desc: "Ich suche eine freundliche, geduldige Person, die meine Großmutter dreimal pro Woche bei Nachmittagsspaziergängen, kleinen Einkäufen und netten Gesprächen begleitet. Sie ist fröhlich und selbstständig, aber das Gehen fällt ihr schwerer, und sie freut sich sehr über jemanden zum Reden. Am liebsten Montag, Mittwoch und Freitag am Nachmittag.",
      tags: ["3× pro Woche", "Mo/Mi/Fr", "Nachmittagsspaziergänge", "Kleine Einkäufe"],
      replies: [
        "Hallo Jana, ich leiste Ihrer Angehörigen sehr gerne Gesellschaft. Ich habe Erfahrung mit älteren Menschen und mag Spaziergänge, Besorgungen und ein gutes Gespräch. Dreimal pro Woche am Nachmittag passt mir gut. Könnten wir kurz telefonieren? Irena",
        "Hallo Jana, ich bin geduldig und ruhig und habe älteren Menschen schon beim Einkaufen und bei täglichen Spaziergängen geholfen. Ich wohne nur 2,5 km entfernt und kann daher verlässlich kommen. Gerne lerne ich sie zuerst kennen. Irena",
        "Hallo, ich interessiere mich für diesen Job. Nachmittagsspaziergänge, kleine Einkäufe und Gespräche liegen mir, und ich kann nächste Woche anfangen. Wann passt es Ihnen, die Details zu besprechen? Irena"
      ]
    },
    clean: {
      title: "Wöchentliche Grundreinigung für ein Familienhaus mit 3 Schlafzimmern",
      desc: "Hallo, wir suchen eine gründliche und vertrauenswürdige Hilfe für regelmäßiges Putzen, Bügeln und Aufräumen, jeden Donnerstagvormittag. Das Haus hat drei Schlafzimmer, zwei Badezimmer und eine kleine Gartenterrasse. Alle Reinigungsmittel und Geräte werden gestellt, und wir haben eine freundliche Katze.",
      tags: ["Donnerstagvormittag", "3 Schlafzimmer", "Putzmittel vorhanden", "Haushalt mit Katze"],
      replies: [
        "Hallo Jana, ich übernehme gerne die wöchentliche Reinigung am Donnerstagvormittag. Ich habe mehrere Jahre Erfahrung mit Familienhäusern, auch mit Bügeln, und komme gut mit Katzen zurecht. Könnten wir kurz telefonieren? Irena",
        "Hallo Jana, Donnerstagvormittag passt mir gut, und ich wohne nur 2,5 km entfernt. Ich arbeite gründlich und zuverlässig und stimme gerne eine Checkliste mit Ihnen ab, damit alles so erledigt wird, wie Sie es möchten. Irena",
        "Hallo, ich interessiere mich für die regelmäßige Reinigung Ihres Familienhauses. Ich kann schon diesen Donnerstag anfangen und komme gerne zuerst vorbei, damit wir die Details besprechen. Wann passt es Ihnen? Irena"
      ]
    },
    tutor: {
      title: "Nachhilfe in Mathematik und Physik für einen 15-Jährigen",
      desc: "Wir suchen eine erfahrene studierende Person oder Nachhilfelehrkraft, die unserem Sohn zweimal pro Woche hilft, vor den Abschlussprüfungen Algebra und Physikformeln aufzuholen. Die Stunden können nachmittags bei uns zu Hause oder online stattfinden, wie es Ihnen lieber ist. Er ist motiviert, braucht aber jemanden, der ihm alles geduldig Schritt für Schritt erklärt.",
      tags: ["Algebra & Physik", "2× pro Woche", "Vor Ort oder online", "Prüfungsvorbereitung"],
      replies: [
        "Hallo Jana, ich helfe Ihrem Sohn gerne vor den Prüfungen mit Algebra und Physik. Ich studiere und gebe seit zwei Jahren Nachhilfe für die Oberstufe. Zweimal pro Woche passt mir gut. Irena",
        "Hallo Jana, ich erkläre Mathe und Physik gerne Schritt für Schritt und kann zu Ihnen nach Hause kommen oder online unterrichten. Könnten wir mit einer ersten Stunde beginnen, damit ich sehe, was Ihr Sohn am meisten braucht? Irena",
        "Hallo, ich interessiere mich für die Nachhilfe für Ihren Sohn. Ich helfe ihm, die Formeln aufzuholen, und übe zweimal pro Woche Prüfungsaufgaben mit ihm. Wann passt es Ihnen für ein Gespräch? Irena"
      ]
    },
    baby2: {
      title: "Verlässliche Betreuung für ein süßes Kleinkind gesucht",
      desc: "Wir suchen eine liebevolle und aufmerksame Betreuungsperson für lustiges Spielen am Nachmittag, Vorlesen und regelmäßige Kinderbetreuung.",
      tags: ["Kleinkind", "Spielen am Nachmittag", "Regelmäßige Betreuung", "Vorlesen"],
      replies: [
        "Hallo Jana, ich würde sehr gerne auf Ihr Kleinkind aufpassen. Spielen am Nachmittag und Vorlesen mache ich besonders gern, und ich wohne nur 2,5 km entfernt. Könnten wir ein Kennenlernen vereinbaren? Irena",
        "Hallo Jana, ich habe Erfahrung mit Kleinkindern und helfe gerne beim Spielen, Vorlesen und bei der regelmäßigen Betreuung. Wann passt es Ihnen, die Details zu besprechen? Irena",
        "Hallo, ich interessiere mich für die Betreuung Ihres Kleinkinds. Ich bin geduldig und zuverlässig und spiele und lese gerne kreativ mit Kindern. Könnten wir diese Woche kurz telefonieren? Irena"
      ]
    },
    baby3: {
      title: "2 Buben, 6 und 4 Jahre, jeden zweiten Dienstag Nachmittag",
      desc: "Wir suchen eine energiegeladene und fürsorgliche Betreuungsperson für regelmäßiges Babysitting, kreatives Spielen und leichte Beaufsichtigung.",
      tags: ["2 Buben", "4–6 Jahre", "Alle 2 Wochen", "Kreatives Spielen"],
      replies: [
        "Hallo Jana, ich passe gerne jeden zweiten Dienstagnachmittag auf Ihre Buben auf. Ich mag lebhaftes Spielen und kreative Aktivitäten und wohne nur 2,5 km entfernt. Könnten wir kurz telefonieren? Irena",
        "Hallo Jana, zwei Buben mit kreativem Spielen und leichter Beaufsichtigung zu betreuen, klingt großartig. Jeder zweite Dienstag passt mir gut. Wann wäre es Ihnen recht, dass ich sie zuerst kennenlerne? Irena",
        "Hallo, ich interessiere mich für das Babysitting Ihrer Söhne an jedem zweiten Dienstagnachmittag. Für aktives Spielen habe ich jede Menge Energie. Könnten wir ein erstes Treffen vereinbaren? Irena"
      ]
    },
    pet2: {
      title: "Flauschige Perserkatze sucht liebevolle tägliche Betreuung",
      desc: "Wir suchen eine sanfte und verlässliche Katzenbetreuung, die vorbeikommt, unsere süße Perserkatze füttert und dafür sorgt, dass es ihr gut geht, solange wir weg sind.",
      tags: ["Perserkatze", "Tägliche Besuche", "Füttern", "Während wir weg sind"],
      replies: [
        "Hallo Jana, ich kümmere mich gerne um Ihre Perserkatze. Ich bin sanft und zuverlässig und wohne nur 2,5 km entfernt, sodass ich leicht vorbeikommen kann. Könnten wir einen Termin zum Kennenlernen vereinbaren? Irena",
        "Hallo Jana, Ihre Katze zu füttern und ihr Gesellschaft zu leisten, solange Sie weg sind, klingt wunderbar. Ich habe Erfahrung mit Langhaarkatzen. Wann passt es Ihnen für ein Gespräch? Irena",
        "Hallo, ich interessiere mich für die Betreuung Ihrer Perserkatze. Ich komme gerne täglich zum Füttern und kümmere mich um sie. Könnten wir zuerst ein Kennenlernen vereinbaren? Irena"
      ]
    },
    pet3: {
      title: "Freundlicher kleiner Hund braucht tägliche Spaziergänge & Spielzeit",
      desc: "Wir suchen eine sanfte und verlässliche Person mit Herz für Hunde, die vorbeikommt, mit unserem kleinen Hund schöne Spaziergänge macht und ihm Gesellschaft leistet.",
      tags: ["Kleiner Hund", "Tägliche Spaziergänge", "Gesellschaft"],
      replies: [
        "Hallo Jana, ich gehe gerne täglich mit Ihrem Hund spazieren und leiste ihm Gesellschaft. Ich liebe kleine Hunde und wohne nur 2,5 km entfernt. Könnten wir uns treffen, damit er mich kennenlernt? Irena",
        "Hallo Jana, tägliche Spaziergänge und Spielzeit mit Ihrem Hund klingen großartig. Ich bin zuverlässig und gehe sanft mit Tieren um. Wann passt es Ihnen, den Zeitplan zu besprechen? Irena",
        "Hallo, ich interessiere mich dafür, mit Ihrem Hund spazieren zu gehen und ihm Gesellschaft zu leisten. Ich habe Erfahrung mit kleinen Rassen. Könnten wir einen Probespaziergang vereinbaren? Irena"
      ]
    },
    senior2: {
      title: "Tägliche Gesellschaft und Besorgungen für meinen Vater",
      desc: "Wir suchen eine geduldige und herzliche Betreuungsperson für Nachmittagsspaziergänge, kleine Einkäufe und nette Gespräche.",
      tags: ["Täglich", "Nachmittagsspaziergänge", "Kleine Einkäufe", "Gesellschaft"],
      replies: [
        "Hallo Jana, ich leiste Ihrem Vater sehr gerne Gesellschaft. Nachmittagsspaziergänge, kleine Einkäufe und ein gutes Gespräch mag ich sehr, und ich wohne nur 2,5 km entfernt. Könnten wir telefonieren? Irena",
        "Hallo Jana, ich bin geduldig und herzlich und habe älteren Menschen schon bei Besorgungen geholfen und ihnen Gesellschaft geleistet. Wann passt es Ihnen, die Details zu besprechen? Irena",
        "Hallo, ich interessiere mich für diesen Job. Ich helfe gerne bei Spaziergängen, Einkäufen und Gesprächen und lerne Ihren Vater gerne zuerst kennen. Könnten wir einen kurzen Besuch vereinbaren? Irena"
      ]
    },
    senior3: {
      title: "Liebenswertes Seniorenpaar sucht nette Unterstützung am Nachmittag",
      desc: "Wir suchen eine fürsorgliche Unterstützung für ein liebenswertes älteres Paar bei leichten Alltagsaufgaben, als Gesellschaft und bei Spaziergängen.",
      tags: ["Älteres Paar", "Alltagsaufgaben", "Gesellschaft", "Spaziergänge"],
      replies: [
        "Hallo Jana, ich unterstütze das Paar am Nachmittag gerne bei Alltagsaufgaben und Spaziergängen und leiste ihnen Gesellschaft. Ich wohne nur 2,5 km entfernt. Könnten wir ein Treffen vereinbaren? Irena",
        "Hallo Jana, ein älteres Paar bei leichten Aufgaben zu unterstützen und ihm Gesellschaft zu leisten, klingt wunderbar. Ich bin geduldig und zuverlässig. Wann passt es Ihnen für ein Gespräch? Irena",
        "Hallo, ich interessiere mich für die Unterstützung am Nachmittag. Ich leiste gerne Gesellschaft und helfe bei leichten Alltagsaufgaben. Könnten wir einen ersten Besuch vereinbaren? Irena"
      ]
    },
    clean2: {
      title: "Wöchentliche Grundreinigung für ein Familienhaus mit 3 Schlafzimmern",
      desc: "Wir suchen eine gründliche und verlässliche Reinigungskraft für regelmäßige Baddesinfektion, Staubwischen und die allgemeine Pflege des Hauses.",
      tags: ["Wöchentlich", "Badezimmer", "Staubwischen", "Allgemeine Pflege"],
      replies: [
        "Hallo Jana, ich übernehme gerne die wöchentliche Grundreinigung inklusive Badezimmer und Staubwischen. Ich wohne nur 2,5 km entfernt. Könnten wir kurz telefonieren? Irena",
        "Hallo Jana, gründliche Baddesinfektion und allgemeine Pflege erledige ich jede Woche sorgfältig. Wann passt es Ihnen, die Details abzustimmen? Irena",
        "Hallo, ich interessiere mich für die wöchentliche Reinigung Ihres Hauses mit 3 Schlafzimmern. Ich komme gerne zuerst vorbei, um zu sehen, was zu tun ist. Könnten wir einen Termin vereinbaren? Irena"
      ]
    },
    clean3: {
      title: "Einmalige Grundreinigung einer Wohnung nach dem Ausmalen",
      desc: "Wir suchen eine sorgfältige Reinigungskraft, die uns nach dem Ausmalen beim Saubermachen hilft: Farbstaub entfernen, Böden wischen und Oberflächen abwischen.",
      tags: ["Einmaliger Job", "Farbstaub", "Böden & Oberflächen"],
      replies: [
        "Hallo Jana, ich helfe gerne bei der Reinigung nach dem Ausmalen, entferne den Staub und wische alle Böden und Oberflächen. Ich wohne nur 2,5 km entfernt. Könnten wir einen Termin vereinbaren? Irena",
        "Hallo Jana, Farbstaub entfernen und Oberflächen abwischen erledige ich sorgfältig. Wann passt Ihnen der einmalige Termin? Irena",
        "Hallo, ich interessiere mich für die Reinigung nach dem Ausmalen. Ich arbeite sorgfältig und kann meine eigene Ausrüstung mitbringen. Könnten wir diese Woche einen Termin vereinbaren? Irena"
      ]
    },
    tutor2: {
      title: "Klavierunterricht für unsere 15-jährige Tochter",
      desc: "Wir suchen eine erfahrene Nachhilfelehrkraft, die unserer Tochter hilft, die MINT-Fächer der Oberstufe zu meistern und sich auf die anstehenden Prüfungen vorzubereiten.",
      tags: ["Oberstufe", "Prüfungsvorbereitung", "MINT-Fächer"],
      replies: [
        "Hallo Jana, ich helfe Ihrer Tochter gerne bei der Prüfungsvorbereitung. Ich habe Erfahrung mit Nachhilfe für Jugendliche und wohne nur 2,5 km entfernt. Könnten wir mit einer ersten Stunde beginnen, damit ich sehe, was sie am meisten braucht? Irena",
        "Hallo Jana, ich arbeite gerne mit motivierten Schülerinnen und Schülern und helfe ihnen, vor Prüfungen Selbstvertrauen zu gewinnen. Wann möchten Sie starten? Irena",
        "Hallo, ich interessiere mich für die Nachhilfe für Ihre Tochter. Bei Tagen und Uhrzeiten bin ich flexibel. Könnten wir kurz telefonieren und die Details besprechen? Irena"
      ]
    },
    tutor3: {
      title: "Geduldige Nachhilfe zur Prüfungsvorbereitung in der Oberstufe",
      desc: "Wir suchen eine engagierte studierende Person, die schwierige Formeln verständlich erklärt und hilft, in Mathe und Physik sicherer zu werden.",
      tags: ["Mathe & Physik", "Studierende", "Prüfungsvorbereitung"],
      replies: [
        "Hallo Jana, ich helfe gerne bei Mathe- und Physikformeln und bei der Prüfungsvorbereitung. Ich studiere und wohne nur 2,5 km entfernt. Könnten wir mit einer Probestunde starten? Irena",
        "Hallo Jana, ich helfe gerne dabei, vor Prüfungen in Mathe und Physik sicherer zu werden. Wann passt es Ihnen, den Zeitplan zu besprechen? Irena",
        "Hallo, ich interessiere mich für die Nachhilfe zur Prüfungsvorbereitung. Ich kann Formeln Schritt für Schritt erklären und mich an das Tempo Ihrer Tochter anpassen. Könnten wir eine erste Stunde vereinbaren? Irena"
      ]
    }
  }
};
