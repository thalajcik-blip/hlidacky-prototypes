// English: the source language. Job texts live in JOBS in index.html; every other language
// overrides them here by job id. A key missing in another language falls back to this file.
(window.I18N = window.I18N || {}).en = {
  name: "English", locale: "en",
  ui: {
    app: { title: "Jobs" },
    cat: { new: "New", replied: "Replied", archived: "Archived" },
    aria: {
      categories: "Job categories", notif: "Notification settings", filtersActive: "Filters, {n} active",
      close: "Close", more: "More options", prevTpl: "Previous template", nextTpl: "Next template", job: "Job: {title}"
    },
    vert: { baby: "Babysitting", pet: "Pet care", senior: "Senior care", clean: "Household cleaning", tutor: "Tutoring" },
    chip: { hoursAgo: "2 hours ago", yesterday: "Yesterday", away: "2.5 km away" },
    addr: "Jandáskova, Praha 2",
    stamp: { yes: "Interested", no: "Not\ninterested" },   // \n: two lines, as in the Figma stamp
    act: { skip: "Skip", reply: "Reply", send: "Send reply", sending: "Sending…", sent: "Sent", showDesc: "Show job description" },
    reply: { title: "Your reply", clear: "Clear", template: "template {i} / {n}" },
    empty: { title: "You're all caught up", text: "New jobs usually come in the morning.<br>We'll let you know.", replay: "Replay demo" },
    toast: {
      archived: "Moved to Archive", undo: "Undo", sent: "Your reply was sent.", soon: "Not part of this prototype",
      toNew: "Moved to New", noFilter: "Filtering is not part of this prototype", notifSaved: "Notification settings saved"
    },
    feed: {
      replied: "Replied", declined: "Declined", readMore: "Read more", messages: "Show messages", unarchive: "Unarchive",
      none: "No archived jobs", aria: "{flag} job: {title}", unarchiveAria: "Unarchive job: {title}"
    },
    filters: {
      title: "Filters", close: "Close filters", services: "Select services", clear: "Clear",
      babysitting: "Babysitting", cleaning: "Cleaning", petCare: "Pet care", seniorCare: "Senior care", tutoring: "Tutoring",
      location: "Location", locationAria: "Location filter", loc1: "Praha 2", loc2: "Brandýs nad Labem",
      mine: "all my locations", anywhere: "Anywhere", radius: "Radius", radiusAria: "Radius filter",
      show: { one: "Show {n} job", other: "Show {n} jobs" }
    },
    notif: {
      title: "Notification settings", email: "Email notifications", mobile: "Mobile notifications",
      opts: ["Immediately after publication", "Never", "Summary once a day", "Summary once a week"],
      further: "Notify me also about jobs further away",
      note: 'You will receive job offers matching all your saved <a href="#" data-soon>addresses</a> and <a href="#" data-soon>profiles</a>.',
      save: "Save changes"
    },
    tab: { search: "Search", favourites: "Favourites", messages: "Messages", jobs: "Jobs", bookings: "Bookings" }
  }
};
