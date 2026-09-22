# DyrenesBeskyttelse

## SoMe Guide

A single-scroll social media brand & style guide, built as a static multi-page site with a sticky left-hand nav that tracks scroll position. Plain HTML/CSS/JS — no build step, no npm dependency in the shipped site — so it can be hosted directly on GitHub Pages.

### Architecture

```
index.html            shell: sidebar mount point + #content mount point + module script tag
styles/
  variables.css        brand colours, type scale, spacing (CSS custom properties)
  base.css              reset, base typography, #app flex layout
  sidebar.css            sticky sidebar, nav link states, active indicator, mobile collapse
  pages.css               shared section/page styling (cards, tables, mockups, dividers)
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
pages/                 one file per section, 27 files total. Each file is a
                        ready-to-inject <section id="…" class="page-section">,
                        including the 13 divider "pages" between chapters
assets/images/         logo (full lockup + icon mark), platform icon SVGs
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
for Dyrenes Beskyttelse. It's plain HTML/CSS/JS — no npm dependency ships in
the site itself — deployed as-is to GitHub Pages, so never introduce a
bundler, framework, or npm package that the shipped index.html would need
at runtime.

Architecture:
- Each content section lives in its own file in /pages, as a ready-to-inject
  <section id="…" class="page-section">. /scripts/config.js is the single
  source of truth listing every section (id, file, navLabel, group,
  isDivider) — pageLoader.js and sidebar.js both read from it. To add a
  page: create the file in /pages, then add one entry to config.js.
- Colours, type scale and spacing are CSS custom properties in
  styles/variables.css — never hardcode a hex colour in a page or in
  pages.css; add or reuse a variable instead.
- The sidebar nav, scroll-based active-section highlighting, and Motion.js
  scroll animations are already built (scripts/sidebar.js,
  scripts/animations.js). Motion.js is loaded from a CDN as an ES module
  and imported dynamically so the site still works if that CDN is blocked
  — keep that fallback intact if you touch animations.js.
- Brand assets (logo, platform icons) are in assets/images/. The real
  Dyrenes Beskyttelse logo is logo-full.png (lockup) and logo-mark.png
  (icon only, used for the favicon and small spaces).

Before treating any UI change as done, actually serve the site (`npx serve .`
or similar — file:// won't work because of fetch()) and check it in a
browser, including scrolling behaviour and the active nav highlight.
```

## Gitflow Flow
<img width="530" height="339" alt="image" src="https://github.com/user-attachments/assets/a7f4ef50-6a00-44e1-b5a5-6f0a91579b56" />

