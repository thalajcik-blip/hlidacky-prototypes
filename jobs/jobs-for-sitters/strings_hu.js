// strings_hu.js — Magyar
// Published via /strings editor. Missing keys fall back to CZ source (strings.js).
(function(){
  function _dm(b,o){var r=Object.assign({},b||{});Object.keys(o).forEach(function(k){r[k]=(o[k]&&typeof o[k]==="object"&&!Array.isArray(o[k]))?_dm((b&&b[k])||{},o[k]):o[k];});return r;}
  window.STRINGS = _dm(window.STRINGS, {
  "sittersHub": {
    "navTitle": "Állások segítőknek",
    "topNavTitle": "Állások",
    "selectorLabel": "Összes állásajánlat megjelenítése:",
    "notificationsLink": "Értesítések beállítása",
    "showMore": "további eredmények megjelenítése",
    "resultsTabs": {
      "new": "Új",
      "replied": "Megválaszolt",
      "archived": "Archivált",
      "all": "Összes"
    },
    "activeFiltersHeading": {
      "new": "Legújabb állásajánlatok megjelenítése:",
      "replied": "Megválaszolt állásajánlatok megjelenítése:",
      "archived": "Archivált állásajánlatok megjelenítése:",
      "all": "Összes állásajánlat megjelenítése:"
    },
    "activeFiltersHeadingEmpty": {
      "new": "Összes legújabb állásajánlat",
      "replied": "Összes megválaszolt állásajánlat",
      "archived": "Összes archivált állásajánlat",
      "all": "Show all job offerings"
    },
    "filtersModal": {
      "title": "Szűrők",
      "activeCount": "1",
      "servicesTitle": "Segítség kiválasztása",
      "clear": "Törlés",
      "babysitting": "Gyermekfelügyelet",
      "cleaning": "Takarítás",
      "petCare": "Kisállat-felügyelet",
      "seniorCare": "Idősgondozás",
      "tutoring": "Korrepetálás",
      "locationTitle": "Helyszín",
      "radiusTitle": "Körzet",
      "clearFilters": "Szűrők törlése",
      "showJobs": "128 állás megjelenítése",
      "sortTitle": "Rendezés",
      "latest": "Legújabb",
      "closest": "Legközelebbi",
      "bestPaid": "Legjobban fizetett"
    },
    "notificationsModal": {
      "title": "Értesítési beállítások",
      "body": "Maradjon naprakész a környékén lévő legújabb álláslehetőségekkel. Válassza ki, milyen gyakran szeretne frissítéseket kapni.",
      "emailLabel": "E-mail értesítések",
      "mobileLabel": "Mobil értesítések",
      "immediately": "Közvetlenül a közzététel után",
      "never": "Soha",
      "daily": "Napi összefoglaló",
      "weekly": "Heti összefoglaló",
      "cancel": "Mégse",
      "save": "Módosítások mentése",
      "toast": {
        "title": "Az értesítési beállításai frissültek.",
        "body": ""
      },
      "inboxToast": {
        "title": "A beérkező levelei jobban festenek!",
        "body": "Ön {countLabel} állást feldolgozott, amivel javította a jövőbeli találatait.",
        "all": "összes"
      }
    },
    "reportModal": {
      "title": "Nevhodný álláshirdetés jelentése",
      "label": "Kérjük, írja le, mi a probléma:",
      "placeholder": "Írja ide az üzenetét...",
      "submit": "Jelentés beküldése",
      "toast": {
        "title": "Jelentés beküldve",
        "body": "Ügyfélszolgálatunkat értesítettük a problémáról."
      }
    },
    "locationValue": "Budapest",
    "radiusValue": "+20 km",
    "title": "Állások segítőknek",
    "subtitle": "A segítőknek szánt álláskereső felület jelenlegi prototípusa.",
    "bodyTitle": "Prototípus szerkezete",
    "bodyText": "A mobil keretrendszer készen áll az első, segítőknek szánt álláskereső képernyőkhöz.",
    "primaryCta": "Szövegszerkesztő megnyitása",
    "secondaryCta": "Vissza a központba",
    "jobAdvert": {
      "postedLabel": "közzétéve",
      "postedTime": "2 órája",
      "title": "Budapest, II. kerület",
      "distance": "3 km",
      "distanceSuffix": "távolságra Öntől",
      "price": "3 500 Ft/óra",
      "service": "Gyermekfelügyelet",
      "date": "Június 4., 18:00",
      "author": "Alexandra",
      "wrote": "írta:",
      "alreadyReplied": "Már válaszolt",
      "readMore": "tovább",
      "body": "Üdvözlöm! Szeptembertől keresek bébiszittert rendszeres gyermekfelügyeletre a következő tanévre két gyermek mellé: egy kisfiú (novemberben lesz 4 éves) és egy kislány (2 éves) számára. Hétfőtől péntekig 8:00 és 14:00 között lenne szükség segítségre, de az időpontok megegyezés szerint módosíthatóak. Alkalmanként esti felügyelet is szóba jöhet, illetve közös nyaralás során is igénybe vennénk a segítséget, de minden csak kölcsönös megegyezés alapján.",
      "dismissTitle": "Miért archiválja ezt az állást?",
      "dismissReasons": {
        "location": "A helyszín nem megfelelő.",
        "rate": "Az óradíj túl alacsony számomra.",
        "schedule": "Az időbeosztás nem felel meg.",
        "other": "Egyéb okom van."
      },
      "replyComposer": {
        "sentAt": "Ön éppen most válaszolt",
        "showMessages": "Üzenetek megjelenítése",
        "automaticReply": "Automatikus válasz",
        "clear": "Törlés",
        "yourReply": "Az Ön válasza",
        "inputPlaceholder": "Írja ide az üzenetét...",
        "useTemplate": "Sablon használata",
        "templateLabel": "sablon",
        "allTemplates": "Összes sablon",
        "sendMessage": "Üzenet küldése",
        "templatesModal": {
          "title": "Sablon használata",
          "apply": "A kiválasztott sablon használata"
        }
      },
      "reply": "Jelentkezés",
      "toast": {
        "title": "Gratulálunk!",
        "body": "Az Ön üzenetét sikeresen elküldtük a(z) {familyName} családnak."
      },
      "archiveToast": {
        "title": "Az álláshirdetés archiválva",
        "body": "Továbbra is megtalálod az Archivált fül alatt."
      },
      "otherActions": "További műveletek",
      "otherActionsMenu": {
        "userJobs": "A felhasználó összes álláshirdetésének megjelenítése",
        "reportAd": "Értesítés nem megfelelő hirdetésről"
      }
    }
  }
});
})();
