# DyrenesBeskyttelse

## SoMe Guide

A single-scroll social media brand & style guide for Dyrenes Beskyttelse,
Roskilde Internat (in Danish), built as a static multi-page site with a
sticky left-hand nav that tracks scroll position. Plain HTML/CSS/JS — no
build step, no npm dependency in the shipped site — so it can be hosted
directly on GitHub Pages.

Visual language: Karla (uppercase headings, no separate display face),
the brand red/cream palette, and fully square corners — `--radius-md` and
`--radius-lg` in `styles/variables.css` are both `0`, matching the flat,
sharp-edged look of dyrenesbeskyttelse.dk. Don't reintroduce rounded
corners on cards/tags/buttons without being asked; circular elements
(avatar dots, the donut chart) are the one intentional exception.

### Architecture

```
index.html            shell: sidebar mount point + #content mount point + module script tag
styles/
  variables.css        brand colours, type scale, spacing, radii (all 0 — see above)
  base.css              reset, base typography, #app flex layout
  sidebar.css            sticky sidebar, nav link states, active indicator;
                        on mobile the nav becomes a horizontally-scrollable
                        single row instead of a vertical list (no hamburger —
                        keep it that way unless asked)
  pages.css               shared section/page styling: cards, tables, mockups,
                        dividers, plus the two-col layout, dummy chart
                        components (donut/bar charts, chart-card) and the
                        avoid-list (pink row + ✕) used on page 3
scripts/
  config.js            single source of truth: ordered list of all 27 sections
                        { id, file, navLabel, group, isDivider }
  pageLoader.js         fetches every pages/*.html (in parallel) and injects them
                        into #content, in config order
  sidebar.js             builds the nav from config (skips dividers), tracks the
                        active section with one IntersectionObserver
  animations.js           Motion.js scroll-reveal + animated nav indicator,
                        dynamically imported so a blocked/offline CDN only
                        disables animation — it never breaks navigation
  main.js               entry point: loads the sidebar shell + all pages, then
                        wires up nav, scrollspy and animations in that order
components/
  sidebar.html          static sidebar shell (brand mark + <nav> container);
                        nav links themselves are generated from config.js
pages/                 one file per section, 27 files total, numbered
                        sequentially (01–27). Each file is a ready-to-inject
                        <section id="…" class="page-section">, including the
                        13 divider "pages" between chapters. Chapters 1–2 are
                        split divider+content pairs (02/03, 04/05), same
                        pattern as every later chapter — keep new chapters
                        numbered that way, and update config.js to match
                        whenever you add, remove or renumber a file
assets/images/         logo-full.png (lockup), logo-mark.png (icon, used as
                        favicon + sidebar mark), logo-a-full.png (hero logo).
                        Known gap: the Facebook/Instagram/LinkedIn platform
                        mockups reference assets/images/icon-*.svg files that
                        no longer exist in this folder (404 in the console) —
                        restore those SVGs or point the mockups at new ones
```

**How it fits together:** `main.js` fetches the sidebar shell and all 27 page
partials in parallel, injects them in the order `config.js` defines, then
builds the sidebar nav from that same config (dividers are excluded — only
the 14 real content sections get a nav entry). A single `IntersectionObserver`
tracks which section is centred in the viewport and toggles the active nav
link. Motion.js (loaded from a CDN as an ES module, not via npm) adds a
scroll-linked fade/slide reveal per section and an animated pill behind the
active nav link; it's imported dynamically in `main.js`, so if the CDN is
unreachable the site still works, just without the animation flourish.

`config.js` is the single manifest both the loader and the sidebar read from
— to add, remove or reorder a section, that's the only list you edit (plus
adding/removing the matching file in `pages/`).

### Running locally

Browsers block `fetch()` of local files opened directly (`file://`), so you
need any static file server, for example:

```bash
npx serve .
# or: VS Code's "Live Server" extension
```

Then open the printed local URL in a browser.

### Deploying

No build step. Push to GitHub and enable **Settings → Pages → Deploy from
branch** on this branch, serving from the repo root. `index.html` uses only
relative paths, so it works both locally and under a GitHub Pages project
subpath.

### Prompt for extending this project

Copy‑paste this to brief an AI assistant (or hand to a new developer) picking
up this project cold:

```
You're working on a static, no-build-step multi-page website ("SoMe Guide")
for Dyrenes Beskyttelse, Roskilde Internat. Content is in Danish. It's plain
HTML/CSS/JS — no npm dependency ships in the site itself — deployed as-is to
GitHub Pages, so never introduce a bundler, framework, or npm package that
the shipped index.html would need at runtime.

Architecture:
- Each content section lives in its own file in /pages, numbered
  sequentially (01-heading.html, 02-divider.html, 03-introduction.html, …),
  as a ready-to-inject <section id="…" class="page-section">.
  /scripts/config.js is the single source of truth listing every section
  (id, file, navLabel, group, isDivider) — pageLoader.js and sidebar.js both
  read from it. To add a page: create the file in /pages with the next
  sequential number, then add one entry to config.js. Every chapter after
  the hero is a divider+content pair (e.g. 02-divider.html +
  03-introduction.html) — keep that pattern, don't merge a divider's
  title/subtitle into the content page itself.
- Colours, type scale, spacing and border radius are CSS custom properties
  in styles/variables.css — never hardcode a hex colour in a page or in
  pages.css; add or reuse a variable instead. `--radius-md` and
  `--radius-lg` are intentionally `0` (flat, square design matching
  dyrenesbeskyttelse.dk) — don't add rounded corners to cards/tags/buttons
  without being asked; circles (avatars, the donut chart) are the exception.
- The sidebar nav, scroll-based active-section highlighting, and Motion.js
  scroll animations are already built (scripts/sidebar.js,
  scripts/animations.js). On mobile the nav is a horizontally-scrollable
  single row, not a hamburger menu — keep it that way unless asked
  otherwise. Motion.js is loaded from a CDN as an ES module and imported
  dynamically so the site still works if that CDN is blocked — keep that
  fallback intact if you touch animations.js.
- Brand assets are in assets/images/: logo-full.png (lockup), logo-mark.png
  (icon, used for the favicon, sidebar mark and small spaces), and
  logo-a-full.png (hero logo). The Facebook/Instagram/LinkedIn mockups on
  the platform guideline pages still reference assets/images/icon-*.svg
  files that don't exist in this folder — that's a known broken image, not
  something to silently "fix" by inventing new icons; ask first or flag it.

Before treating any UI change as done, actually serve the site (`npx serve .`
or similar — file:// won't work because of fetch()) and check it in a
browser at both a phone width (~375px) and desktop — this guide has broken
its mobile layout more than once from things that looked fine on desktop
(e.g. a table cell with one long unbreakable Danish compound word forcing
horizontal overflow), so don't skip the phone-width check.
```

## Gitflow Flow
<img width="530" height="339" alt="image" src="https://github.com/user-attachments/assets/a7f4ef50-6a00-44e1-b5a5-6f0a91579b56" />

