# Jobs for Sitters Worklog

Updated: 2026-04-09

## Current state

- Main prototype lives in `jobs/jobs-for-sitters/index.html` and identical HTML is copied to `en`, `cz`, `sk`, `at`, `hr`, `hu`.
- String sources used for recent card-flow work are mainly `jobs/jobs-for-sitters/strings.js` and `jobs/jobs-for-sitters/strings_en.js`.
- Latest production deploy after these changes:
  - `https://hlidacky-prototypes.vercel.app/jobs/jobs-for-sitters/`
  - Deployment id: `dpl_P8rgpEEebK3G2hRm9zz8k8EqMM2V`

## Implemented card flow

- Default card has `Reply to job`.
- Clicking `Reply to job` opens the in-card template reply state, not the `Replied` tab.
- Template state includes:
  - `Automatic reply` header
  - textarea with template content
  - attached footer panel with template pager and `All templates`
  - `Clear` switches to custom input state
- Custom input state includes:
  - `Your reply` header
  - empty textarea with placeholder `Enter your message here...`
  - `Use template` link
- Clicking `Send a message` changes the card to attached/summary state in the current list.
- Sent cards stay in `New`/`All`; they are not moved to `Replied`.
- `Replied` tab is currently reserved for cards with `status === "replied"`.

## Implemented visual details

- Service badge colors/icons match active filter pills for all verticals.
- Results inner horizontal padding is `8px`.
- Top navbar height is `48px`.
- Mobile fixes:
  - top navbar is visible on mobile
  - modal footer stays in viewport
  - body is anchored to top on mobile to avoid top whitespace jump
- Header uses pink paperplane icon via `assets/icon-paperplane-pink.svg`.
- Reply composer uses custom assets:
  - `sparkles.svg`
  - `eraser.svg`
  - `fa-pen-to-square.svg`
  - `chevron-left.svg`
  - `chevron-right.svg`
  - `icon-paperplane.svg`
  - `messages-icon.svg`
- Textarea behavior:
  - no horizontal overflow
  - autogrow on vertical overflow
  - template textarea min-height `144px`
- `Show messages` button:
  - custom styling
  - 24x24 icon
  - hover inverts icon/text to white on pink background
- `Other actions`:
  - custom link styling
  - opens native dropdown with:
    - `show all jobs of the user`
    - `notify of an inappropriate ad`

## Implemented after initial card flow

- Template chooser modal behind `All templates`:
  - redesigned to a simple radio list based on the supplied reference
  - uses custom `icon-template.svg`
  - contains `12` automatic replies
  - long items are clamped to `3` lines with ellipsis
  - bottom CTA is full-width green
- Template pager/footer polish:
  - nav text is `14px`
  - fixed-width centered pager label prevents jumping between `9 / 12` and `10 / 12`
- Typewriter animation:
  - runs when opening template reply via `Reply to job`
  - runs when switching from custom reply via `Use template`
  - runs when applying a different template from the modal
  - current speed is doubled compared with the first version
- Hover transitions:
  - most interactive buttons/links in this prototype now use subtle `200ms` transitions
  - green modal CTAs have hover color `#0A8C20` with the same inset shadow
- Notifications modal:
  - `Cancel` link removed
  - `Save changes` CTA fills the whole footer width
- Toast on message send:
  - bottom toast appears after `Send a message`
  - uses custom `doodle-message-sent.svg`
  - auto-dismisses after timeout and can also be closed manually
  - headline/body typography was adjusted to the latest specs
  - toast doodle is animated on show using the same principle as the hero doodles in the other prototype: stroke draw first, then fill fade-in
- Reply composer microinteractions:
  - custom draft is preserved when switching to template reply and back via `Clear`
  - `Send a message` is disabled for empty drafts
  - composer textarea autofocuses after open / template switch / clear
  - `Cmd/Ctrl + Enter` sends the current reply
- Mocked service filtering:
  - selected service filters now limit results to cards whose service badge matches the chosen verticals
  - the filters modal `Show X jobs` CTA count now follows the same mocked per-service distribution as the card list
- Notifications modal toast:
  - saving notification settings now shows its own auto-dismiss toast
  - toast uses dedicated `notification-settings.svg` artwork and a notification-specific visual variant
- Tab semantics update:
  - third tab is now `Archived` instead of `All`
  - `Replied` now contains only jobs the sitter already replied to
  - `Archived` now contains only jobs declined through `Why are you declining?`

## Important implementation notes

- Shared HTML edits should usually be made in `jobs/jobs-for-sitters/index.html` and then copied to the language variants.
- If more copy/text changes are needed for the dropdown or reply flow, also update `strings.js` and `strings_en.js`.
- Toast strings live under `sittersHub.jobAdvert.toast` in `strings.js` and `strings_en.js`.
- The toast doodle animation is implemented inline in `jobs/jobs-for-sitters/index.html`; the SVG was moved from an `<img>` to inline markup so the paths can animate.
- Main new assets added during this round:
  - `assets/icon-template.svg`
  - `assets/doodle-message-sent.svg`
  - `assets/icon-paperplane-pink.svg`
  - `assets/messages-icon.svg`
  - `assets/sparkles.svg`
  - `assets/eraser.svg`
  - `assets/fa-pen-to-square.svg`
  - `assets/chevron-left.svg`
  - `assets/chevron-right.svg`
