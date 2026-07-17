# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This repo was migrated from a static Gulp/SCSS/Bootstrap site to a Next.js 16 App Router application (see `IMPLEMENTATION_PLAN.md` for the original migration brief, in Spanish). The legacy `gulpfile.js`, `scss/`, `css/`, `font-awesome/`, jQuery-based `js/`, and the static-site `index.html` have been removed — the app is entirely under `src/`.

## Commands

- `npm run dev` — start the Next.js dev server (Turbopack default in Next 16)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`, `eslint-config-next` core-web-vitals + typescript rulesets)

There is no test suite configured.

## Architecture

Single-page portfolio (`src/app/page.tsx`) composed of client components rendered in a fixed order inside one `<main>`: `CanvasBackground` → `Navbar` → `CommandMenu` → `Hero` → `AboutBento` → `ExperienceTimeline` → `SkillsGrid` → `PortfolioDeck` → `ContactForm`. All section text renders directly (no client-only loading gate), so it is present in the initial server-rendered HTML for crawlers/link previews. `CanvasBackground` and `QuantumSphere` (used inside `Hero`) are purely decorative and are lazy-loaded client-side via `next/dynamic` with `ssr: false`, and both no-op when the user has `prefers-reduced-motion` set (`hooks/use-reduced-motion.ts`) — they render zero `<canvas>` elements in that case. No routing beyond this single route; `robots.ts`, `sitemap.ts`, and `opengraph-image.tsx` are the only other app routes.

**Providers (`src/app/layout.tsx`):** `ThemeProvider` (next-themes, class-based dark/light, `defaultTheme="light"`, `enableSystem`) wraps `LanguageProvider` (`src/components/language-provider.tsx`), which wraps the page. Layout also injects `Person` JSON-LD structured data built from `personalInfo`.

**Content is centralized, not hardcoded in components:**
- `src/lib/data.ts` — typed content: `personalInfo`, experience items, skills, projects. Update this file (not individual components) when changing bio/project/skill copy.
- `src/lib/translations.ts` — `es`/`en` copy keyed by `TranslationSchema`, consumed via `useLanguage()` from `language-provider.tsx`. The language provider persists the chosen locale to `localStorage` (`marcosrigo-locale`) and falls back to `navigator.language`.

**Styling:** Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config.*` — theme tokens are defined inline in `src/app/globals.css` using `@theme` + CSS custom properties for light/dark color pairs: `--background`, `--foreground`, `--primary`, `--muted`, `--card`, `--border`, `--accent`, etc., consumed as `bg-background`, `text-foreground`, `bg-primary`, and so on). The palette follows a CV-inspired identity — white/cream surfaces, navy (`#16355C`) as the structural/text color, red (`#D81F2A`) as the primary accent for pills/buttons/links, and a small gold accent (`#F5C84C`) reserved for icons/details only. Dark mode swaps to a navy background (`#0E2440`) with cream text, same red/gold accents. Never hardcode colors from the old removed neon palette; always read from the CSS custom properties (or their Tailwind `bg-*`/`text-*` equivalents) so both themes stay in sync. Fonts are loaded via `next/font/google` in `layout.tsx`: Poppins for both body and headings (exposed as `--font-sans`/`--font-heading`), Geist Mono for monospace/data displays (`--font-mono`).

**`SectionHeading` (`src/components/section-heading.tsx`):** reusable red-pill section header (`tag` + `title` + optional `description`) used at the top of Experience, Skills, Portfolio, and Contact sections — reuse it rather than hand-rolling section headers.

**Interactive/visual components** worth knowing about before touching them: `canvas-background.tsx` (animated canvas backdrop), `quantum-sphere.tsx`, `command-menu.tsx` (⌘K/Ctrl+K palette, has a hidden retro-terminal mode with `/help`, `/about`, `/skills`, `/contact`, `/theme`, `/cv`, `/clear`, `/exit` commands), `magnetic.tsx` and `hooks/use-3d-tilt.ts` (pointer-driven hover/tilt effects used by cards across the timeline/portfolio sections).

**Public assets:** `public/` (images under `public/img/`, favicon, and `public/cv.pdf` — see TODO below).

## Known TODOs

- `public/cv.pdf` does not exist yet. `personalInfo.cvUrl` points to `/cv.pdf`; upload the actual resume there.
- `ProjectItem.repoUrl` is optional and currently unset for all projects; add real GitHub repo URLs to `src/lib/data.ts` to surface a "View Repository" link in the portfolio modal.
- `public/img/favicon.ico` still uses the old (pre-restyle) color palette and has not been regenerated.
