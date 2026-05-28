# Portfolio-23

Static HTML portfolio site. No build pipeline beyond Gulp.

## Build

- `gulp` — default: compiles SCSS, minifies CSS/JS, copies vendor files
- `gulp dev` — watches SCSS/CSS/JS, serves via browserSync on port 3000
- `gulp sass` — compile SCSS only

## Style pipeline

SCSS source: `scss/resume.scss` → outputs to `css/` (compiled + minified)

## No package.json

No `package.json` exists — Gulp is the only task runner. If adding deps, create one.

## Assets

- Images: `img/`
- Icons: `font-awesome/` (local), `css/devicons/`, `css/simple-line-icons/`
- JS: vanilla jQuery — `js/custom.js` + vendor libs in `js/` subdirs
- Google Fonts loaded via CDN in `index.html`