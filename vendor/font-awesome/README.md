# Vendored Font Awesome Pro 7.3.0

Self-hosted copy of the Font Awesome Pro webfont CSS and its woff2 subsets.
Four prototypes load it: `ai-assisted-search`, `ai-assisted-search-v2`,
`mobile-app-redesign`, `mobile-app-redesign-v2`.

```html
<link rel="stylesheet" href="/vendor/font-awesome/css/fa.css">
```

The path is absolute, so it resolves only when the site is served from the repo
root — which is how both `python3 -m http.server 8080` and Vercel serve it.

## Why this is vendored

The prototypes used to load Hlídačky's Font Awesome kit straight off their CDN:

```
https://hlidacky-312899.c.cdn77.org/assets/legacy/font_awesome_kit-<digest>.js
```

That URL carries a Rails asset-pipeline digest. When Hlídačky deploy, the digest
is recomputed and the old hashed file is purged, so the pinned URL starts
returning a 404 HTML error page. The kit never executes, every `<i class="fa-…">`
collapses to zero width, and all four prototypes lose their icons at once — with
no change on our side to point at. That happened in October 2026.

Vendoring removes two runtime dependencies: Hlídačky's digest, and
`ka-p.fontawesome.com` plus the kit token `b14551ac05` embedded in the loader
(a token they can revoke). Nothing here is fetched from a third party at runtime.

## Layout

| Path                      | Deployed | What it is                                      |
| ------------------------- | -------- | ----------------------------------------------- |
| `css/fa.css`              | yes      | Generated. Do not hand-edit.                    |
| `webfonts/*.woff2`        | yes      | 82 subsets, ~1.6 MB                             |
| `originals/pro.min.css`   | no       | Pristine upstream CSS, for regenerating         |
| `README.md`               | no       | This file                                       |

`originals/` and `*.md` are excluded by `.vercelignore`, so they cost no
deployment storage.

The CSS lives in `css/` on purpose: upstream writes its font URLs as
`url(../webfonts/…)`, so this layout needs no URL rewriting and a newer
`pro.min.css` can be dropped in as-is.

## Which variants are shipped

Only the four the prototypes actually render:

| Variant       | Weight | Subsets |
| ------------- | ------ | ------- |
| solid         | 900    | 26      |
| regular       | 400    | 26      |
| light         | 300    | 26      |
| brands        | 400    | 4       |

`fa.css` is upstream `pro.min.css` with the `@font-face` blocks for every other
variant removed (446 of 604 blocks), because their webfonts are not shipped.
Shipping all of them would cost roughly 3.5 MB per deployment for icons nobody
uses, and this repo has already hit the Vercel 10 GB storage cap once.

**So `fa-thin`, `fa-duotone`, `fa-sharp-duotone` and the `fa-sharp-*` duotone
variants will not render.** Add a variant before using it — see below.

### `fa-sharp` is deliberately aliased to classic Pro

Hlídačky's kit never included a Sharp family, so `fa-sharp fa-solid fa-star` has
always fallen back to classic Pro in these prototypes — about 40 elements across
`mobile-app-redesign-v2` alone. Upstream `pro.min.css` *does* define Sharp, so
vendoring it unchanged would have silently restyled those icons. `fa.css` ends
with:

```css
:root{--fa-family-sharp:"Font Awesome 7 Pro"}
```

which reproduces the kit's rendering exactly. Remove that line and ship the
`pro-fa-sharp-*` subsets if sharp icons are ever actually wanted.

## Regenerating

To add a variant, or to move to a newer Font Awesome:

1. Download upstream CSS over `originals/pro.min.css`. The kit token is what
   authorises this, and the request needs it:

   ```bash
   curl -o vendor/font-awesome/originals/pro.min.css \
     'https://ka-p.fontawesome.com/releases/v7.3.0/css/pro.min.css?token=b14551ac05'
   ```

2. Edit the `keep` set in the generator below, then rebuild `css/fa.css` and
   fetch any webfonts it newly references:

   ```bash
   python3 - <<'PY'
   import re
   keep = {'pro-fa-solid-900', 'pro-fa-regular-400',
           'pro-fa-light-300', 'pro-fa-brands-400'}
   css = open('vendor/font-awesome/originals/pro.min.css', encoding='utf-8').read()
   for b in re.findall(r'@font-face\{[^{}]*\}', css):
       u = re.findall(r'\.\./webfonts/([a-z0-9-]+?)-\d+\.woff2', b)
       if u and not all(x in keep for x in u):
           css = css.replace(b, '', 1)
   css += '\n:root{--fa-family-sharp:"Font Awesome 7 Pro"}\n'
   open('vendor/font-awesome/css/fa.css', 'w', encoding='utf-8').write(css)
   PY

   cd vendor/font-awesome
   grep -oE '\.\./webfonts/[a-z0-9-]+-[0-9]+\.woff2' css/fa.css \
     | sed 's#\.\./webfonts/##' | sort -u \
     | while read f; do
         [ -f "webfonts/$f" ] || curl -sfS -o "webfonts/$f" \
           "https://ka-p.fontawesome.com/releases/v7.3.0/webfonts/$f" || echo "FAIL $f"
       done
   ```

   The webfont URLs take no token.

3. Verify every file is a real font and not an error page — this is the exact
   failure mode that caused the outage:

   ```bash
   cd vendor/font-awesome/webfonts
   for f in *.woff2; do [ "$(head -c 4 "$f")" = "wOF2" ] || echo "BAD $f"; done
   ```

4. Open each of the four prototypes and confirm no icon renders empty:

   ```js
   [...document.querySelectorAll('i,span')]
     .filter(el => /\bfa-/.test(el.getAttribute('class') || '')
                && el.getBoundingClientRect().width > 0
                && el.getBoundingClientRect().width < 2).length   // want 0
   ```

Keep the license header in `css/fa.css`. Font Awesome Pro is commercially
licensed to Hlídačky; self-hosting is allowed for the licensee, and the kit was
already serving these same files publicly.
