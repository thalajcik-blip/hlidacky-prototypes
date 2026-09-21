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

### Keep deployments small — Vercel storage limit

The Vercel team is on the free Hobby plan, capped at **10 GB of Deployment Storage**
shared by all projects. Every deployment stores a full copy of this site (~50 MB),
whether it came from a push or from the CLI. In September 2026 this repo alone filled
the cap (10–15 GB) and old deployments had to be deleted by hand. Retention is now
7 days, but Vercel always keeps the last 10 deployments per project.

Rules:

- **One deploy path per change.** Push to `main` and let the git deploy run. Don't
  also run `npx vercel --prod` for the same change — that stores it twice. Use the CLI
  only when explicitly asked, and only from an up-to-date clone (`git pull --ff-only`
  first; a stale clone reverts production).
- **Batch your pushes.** Every push is a new deployment. Commit as often as you like,
  push once when the work is done.
- **No automated or scheduled deploys.** A deploy cron once created a new deployment
  every 5 minutes; it must stay off.
- **Size images for how they render.** Store each image at about 3× its largest
  on-screen CSS size — ~600 px for avatars and photos, ~1200 px for full-screen
  backgrounds — never the 1000–3000 px camera or export original. Photos without
  transparency should be JPEG, not PNG. Resize in place with `sips -Z <px> <file>`
  (keeps name, format and alpha). Keep full-resolution sources in an `originals/`
  directory: `.vercelignore` keeps those out of deployments.
- **Nothing big without a reason.** No videos, archives or design exports in the repo;
  any single file over ~500 KB needs a justification in the commit body.
- **Keep `.vercelignore` current.** Tooling, docs and data that no page requests
  (`scripts/`, `supabase/`, `*.md`, `.claude/`) are excluded; add new paths of that
  kind there too.

### Deploy checklist

1. `git status` — only your intended changes are staged.
2. Check staged files for size; each hit needs a reason or a resize:

   ```bash
   git diff --cached --name-only --diff-filter=AM -z | xargs -0 stat -f '%z %N' \
     | awk '$1 > 500000 {printf "%6.0f KB  %s\n", $1/1024, $2}'
   ```

3. Run the hub `MISSING` check above.
4. Commit with an explicit pathspec, then push **once**: `git push origin main`.
5. Wait for the Vercel deployment to reach `READY`, then verify production as
   described above.
6. If this repo is cloned twice on the machine, `git pull --ff-only` in the other
   clone so a later CLI deploy from it doesn't revert your change.

## Adding a prototype

The new directory and its hub card in the root `index.html` go in the **same commit** —
an `Open prototype` button plus a QR image pointing at
`https://hlidacky-prototypes.vercel.app/<dir>/`. A prototype with no hub card is
invisible; a card with no directory is a 404.
