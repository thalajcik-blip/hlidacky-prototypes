# AGENTS.md — hlidacky-prototypes

Static HTML/CSS/JS prototypes for Hlídačky.cz. One directory per prototype, no build
step, no framework. The root `index.html` is a hub of cards with QR codes pointing at
each prototype on production.

## Run it locally

```bash
python3 -m http.server 8080
```

Port 8080 is what `.claude/launch.json` expects — keep it. Absolute asset paths
(`/sitter-approval-workflow/assets/…`, `/notification-center/assets/…`) are shared
between prototypes and only resolve when served from the repo root.

## Verify before you commit

Reading the diff is not verification. Open the page in a browser and exercise the
thing you changed, then check the console for errors. For an animation or a gesture,
measure it — sample `getComputedStyle(el).transform` across `requestAnimationFrame`
ticks and look at the frame spacing, don't eyeball a screenshot. Report what you
actually observed, including the numbers.

## Commit workflow

This repo usually has unrelated work-in-progress sitting in several prototype
directories at once, and some of it is already staged. That single fact drives
everything below.

1. **Never `git add -A`, `git add .`, or `git commit -a`.** They sweep other people's
   unfinished prototypes into your commit and make it unreviewable.
2. **One commit per prototype, or per logical unit.** A fix to one prototype plus its
   hub card belong together; two unrelated prototypes do not.
3. **Scope every commit with an explicit pathspec.** Stage only your paths, then:

   ```bash
   git add <paths>
   git commit -m "subject" -m "body" -- <paths>
   ```

   `-m` comes before `--`, otherwise git reads the message as a pathspec. The
   pathspec form commits the working-tree state of those paths only and leaves
   everything else staged exactly as it was.
4. **Leave work you didn't do alone.** No `git reset`, `git stash`, `git checkout --`,
   or `git restore` on files outside your change, and no amending or rebasing commits
   you didn't author.
5. **Message format.** `type(scope): imperative subject`, lowercase, under 72 chars.
   Types: `feat`, `fix`, `perf`, `chore`, `content`, `docs`, `refactor`. The body says
   what changed and *why*; for a bug fix, name the root cause explicitly rather than
   describing the symptom. Wrap at 72 columns. Slovak in chat is fine, but commit
   messages and code comments in this repo are English.
6. **Attribution.** Add a `Co-Authored-By:` trailer for yourself if you wrote the
   change. Never attribute a commit to a different agent or person.
7. **Never commit junk.** `.DS_Store`, `.vercel/`, `$CODEX_HOME/`, `Confirmed` are
   gitignored — keep them that way. (`$CODEX_HOME/` and `Confirmed` exist because a
   shell variable went unexpanded into a real path; quote and expand env vars before
   using them in paths.)
8. **Don't commit or push unless you were asked to.**

## Deploy — read this before pushing

There are two paths to production and they do not use the same source:

- `npx vercel --prod --yes` from the repo root (or `scripts/deploy-prod.sh`) uploads
  the **working directory**, including uncommitted files.
- Pushing to `main` triggers a Vercel git deploy that builds from **committed files
  only**.

So git and production can drift, and a push can silently drop pages that only ever
existed in someone's working tree. Before `git push origin main`, check that every
path the hub links to is actually committed:

```bash
grep -o 'href="/[a-zA-Z0-9/_-]*"' index.html | sed 's/href="//;s/"//' | sort -u \
  | while read p; do git cat-file -e HEAD:"${p#/}" 2>/dev/null || echo "MISSING $p"; done
```

Anything reported `MISSING` would 404 from the hub after a git deploy — commit it
first or don't push.

After any deploy, verify production rather than assuming: `curl -o /dev/null -w '%{http_code}'`
over the prototype URLs, confirm the hub card for the prototype you touched is still
there, and grep the deployed HTML for the change itself.

**Never deploy or push without being asked.** Both are visible to everyone who has a
QR code.

## Adding a prototype

The new directory and its hub card in the root `index.html` go in the **same commit** —
an `Open prototype` button plus a QR image pointing at
`https://hlidacky-prototypes.vercel.app/<dir>/`. A prototype with no hub card is
invisible; a card with no directory is a 404.
