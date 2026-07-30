# AI-Assisted Search v2 Context

Last updated: 2026-06-16

## Project

- Prototype: `ai-assisted-search-v2`
- Main file: `/Users/tomashalajcik/Documents/Playground/hlidacky-prototypes/ai-assisted-search-v2/index.html`
- Local browser URL: `file:///Users/tomashalajcik/Documents/Playground/hlidacky-prototypes/ai-assisted-search-v2/index.html`
- Production site: `https://hlidacky-prototypes.vercel.app/`
- V2 route: `https://hlidacky-prototypes.vercel.app/ai-assisted-search-v2/`

## Current Direction

V2 changes the AI entry point and assistant behavior compared with the original `ai-assisted-search` prototype.

- AI entry point is a badge inside the location input, labeled `AI Search`.
- Location input uses `icon-location-pin.svg`; the old search icon should not be stacked under it.
- AI assistant is no longer a fullscreen messenger panel. It is a top dynamic panel above the results feed.
- When AI assistant is open, hide header/title/description/quick filters/filter component and keep search results visible below.
- AI panel has expanded/collapsed header states.
- `ai-head` and `ai-stage` share one purple gradient background.
- If `.searches-page-header-component` has no visible content, it should take zero height.

## Important Assets Used

Downloaded assets previously referenced:

- `/Users/tomashalajcik/Downloads/icon-location-pin.svg`
- `/Users/tomashalajcik/Downloads/AI-search-icon.svg`
- `/Users/tomashalajcik/Downloads/x.svg`
- `/Users/tomashalajcik/Downloads/chevron.svg`
- `/Users/tomashalajcik/Downloads/robot-icon.svg`
- `/Users/tomashalajcik/Downloads/icon-paperplane.svg`
- `/Users/tomashalajcik/Downloads/bookmark-off.svg`
- `/Users/tomashalajcik/Downloads/bookmark-on.svg`

## Current AI Flow State

There is a `SCRIPT` array in `index.html` around the AI assistant logic. Recent intended state:

- Step 0 should ask: `Hi Alena, what kind of help do you need?`
- Step 0 should not show pills.
- Step 0 should show a free text input with placeholder: `Please explain what you need...`
- Under the input, show rotating example query text that fits on one line.
- On input focus, show a dropdown of suggested searches like Google suggestions.
- Only after submitting the first free query should the assistant ask about regularity using pills.
- Free text input should remain available in every AI step; only placeholder changes by step context.

Useful examples for first query dropdown:

- `Babysitters available next Thursday`
- `Babysitters offering also household cleaning`
- `Babysitters with ADHD experience`
- `English speaking babysitter nearby`
- `German speaking babysitter nearby`
- `Montessori babysitting in Praha 2`
- `Overnight babysitting nearby`
- `Top rated babysitters in Praha 2`

Rotating examples should be shorter, for example:

- `Babysitter next Thursday`
- `English-speaking babysitter`
- `Overnight babysitting nearby`
- `ADHD-experienced babysitter`

## Latest Unfinished Request

The newest unfinished request from the user:

> Default state after opening AI assistant should look like the provided screenshots:
> - instead of pills, show a free input for the first query
> - below that input, show rotating query examples that fit on one line
> - on focus, show a dropdown with example queries
> - ask about regularity only in the next step
> - free input should be available in all AI assistant steps, with context-specific placeholder

This should be implemented and verified visually in the local `file://` prototype.

## Areas To Inspect First

In `ai-assisted-search-v2/index.html`, inspect:

- `SCRIPT` array around `var SCRIPT = [`
- `renderCurrentStep`
- `renderQuestion`
- `renderSuggestions`
- `openQueryDropdown`
- `startRotatingExamples`
- AI panel markup around `section#aiPanel`
- CSS for `.ai-stage`, `.ai-stage-question`, `.ai-input-wrap`, `.ai-query-dropdown`, `.ai-suggest-chip`

Previous grep anchors:

- `var DEFAULT_QUERY_EXAMPLES`
- `var SCRIPT`
- `function startRotatingExamples`
- `function openQueryDropdown`
- `function renderSuggestions`
- `function renderCurrentStep`
- `section id="aiPanel"`

## Known Risk

There may already be partial code for:

- step-specific `dropdownExamples`
- rotating examples
- focus/blur dropdown opening
- keeping input visible in `renderCurrentStep`

However, the visible prototype still showed pills in the default state, so check for hardcoded initial DOM or JS that renders suggestions independently of `SCRIPT[0].suggest`.

## Deployment

Deploys have been done with Vercel CLI. Approved command prefixes exist for:

- `npx vercel`
- `npx vercel@48.4.1`

Use production deploy when requested:

```bash
npx vercel@48.4.1 --prod
```

Run from:

```bash
/Users/tomashalajcik/Documents/Playground/hlidacky-prototypes
```
