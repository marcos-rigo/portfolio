# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `gulp` — compile SCSS, minify CSS/JS, copy vendor files (one-shot build)
- `gulp dev` — watch SCSS/CSS/JS with live-reload via browserSync on port 3000
- `gulp sass` — compile SCSS only

Gulp 3 syntax is used (array-style task dependencies, not `gulp.series`/`gulp.parallel`).

## Architecture

Single-page portfolio: one `index.html` with all sections as `<section id="...">` elements. No routing, no framework.

**Layout pattern:** fixed sidebar nav (`#sideNav`) on desktop (≥992px, `$sidebar-base-width: 17rem`) that collapses to a top navbar on mobile. Content area is `padding-left: $sidebar-base-width` on desktop. Each section uses `.resume-section` and fills `min-height: 100vh` on tablet+.

**Scroll behavior:** `js/custom.js` wires up jQuery smooth-scroll (`js-scroll-trigger` class) and Bootstrap scrollspy targeting `#sideNav`. Nav links map to section IDs (`#about`, `#awards`, `#experience`, `#portfolio`, `#contact`).

**SCSS structure:**

```
scss/resume.scss        ← entry point, imports everything
scss/_variables.scss    ← colors, $sidebar-base-width; $primary = $orange (#ff003f)
scss/_mixins.scss       ← body-font (Open Sans), heading-font (Saira Extra Condensed)
scss/_global.scss       ← body, headings, .subheading, social/icon lists
scss/_nav.scss          ← #sideNav fixed sidebar + responsive collapse
scss/_resume-item.scss  ← .resume-section, .resume-item, .resume-date
scss/_bootstrap-overrides.scss
```

Compiled output: `css/resume.css` (and `css/resume.min.css`). The HTML loads `css/style.css` — if that file doesn't exist after a build, the gulp `sass` task output name and the HTML `<link>` are out of sync.

**Vendor assets (checked in, not from node_modules):**
- `css/bootstrap/`, `font-awesome/`, `css/devicons/`, `css/simple-line-icons/` — all local copies
- `js/jquery/`, `js/bootstrap/`, `js/counter/`, `js/jquery-easing/`

**Images:** `img/` (profile, logo variants, portfolio screenshots in `img/portfolio/`). The public copies live under `public/img/`.
