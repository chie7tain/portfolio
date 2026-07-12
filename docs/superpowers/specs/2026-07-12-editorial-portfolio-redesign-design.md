# Editorial Portfolio Redesign — Design Spec

**Date:** 2026-07-12
**Owner:** Ifeanyi Okwuobi
**Scope:** Visual redesign of the public-facing `portfolio/` React frontend.

## Concept

The portfolio reimagined as a **printed publication** — a magazine masthead, colophon,
numbered indexes, drop caps, hairline rules, and a single confident vermilion accent on
warm paper. The goal (per brainstorming): make the site **distinctive** — a real editorial
point of view that reads as taste and seniority, replacing the current generic dark
dev-portfolio template.

Decisions locked during brainstorming:
- Goal: **be more distinctive**
- Aesthetic world: **editorial / print**
- Canvas: **light "paper"** (warm cream, ink text)
- Accent: **deep vermilion red**

## Scope

**In scope** (public presentation only):
- Shell: `Nav`, `Footer`
- Pages: `HomePage`, `ProjectsPage`, `ArticlesPage`, `ArticlePage`, `MediaPage`, `ContactPage`
- Cards + skeletons: `ProjectCard`, `ArticleCard`, `MediaCard`, and the three `*Skeleton`s
- Theme foundation: `src/index.css`, font loading in `index.html`

**Out of scope:**
- `/admin/*` pages (private CMS) — left functionally and visually as-is
- API, data model, routing logic, auth — unchanged. This is presentation only.
- Dynamic content (Projects/Articles/Media records) — unchanged; only static copy is rewritten.

## Typography

Three-voice system, all Google Fonts (free), replacing Inter entirely:

| Role | Font | Usage |
|---|---|---|
| Display serif | **Fraunces** | Headlines, masthead wordmark, drop caps, big CTAs. High-contrast old-style serif with character; italic used for emphasis. |
| Body / UI | **Libre Franklin** | Body copy, navigation, buttons, general UI. Franklin-Gothic-lineage grotesque. |
| Mono / metadata | **Spline Sans Mono** | Section numbers (§01), dates, reading times, tech tags, eyebrows, type labels. |

## Color & texture

```
--paper       #F5F1E8   warm ivory background
--ink         #1C1A17   warm near-black text
--vermilion   #C43D2E   accent: rules, drop caps, links, markers, availability dot
--faded-ink   #6B6459   secondary text / metadata
--hairline    rgba(28,26,23,0.14)   thin editorial rules
```

One accent, used sparingly and deliberately. Retune the existing SVG noise overlay into a
very faint **paper grain** on the light canvas (low opacity). No heavy textures.

## Layout & composition

- **Masthead nav:** Fraunces wordmark (name) with issue-style mono metadata
  (`PORTFOLIO · LAGOS, NG · MMXXVI`), a vermilion hairline rule, small-caps mono nav links.
  Sticky, paper-toned, with a working mobile menu (preserve current toggle behavior).
- **Home / cover:** magazine-cover treatment — eyebrow (`◦ OPEN TO WORK` with live dot),
  an oversized Fraunces *statement* line (draft 2–3 options; not just the name), a byline
  deck, and metadata. Asymmetric, generous whitespace. About section opens with a **drop cap**,
  two-column editorial setting; skills as a numbered mono index (not pills).
- **Content Feeds as numbered indexes:** Projects and Articles render as numbered editorial
  index rows — `01 —— Title · role/meta · year ↗` — big serif titles, mono metadata,
  hairline between rows, hover fills/slides with accent + thumbnail peek (Projects keep an
  image via the hover peek so screenshots are still shown). Media: refined cards with
  `PODCAST` / `VIDEO` mono type labels.
- **Article detail:** reading page — Fraunces headline, drop cap, measure ~68ch, mono
  byline/date/reading-time, `@tailwindcss/typography` prose retuned to the palette.
- **Contact:** editorial form — large Fraunces heading, generous fields set on paper,
  vermilion submit. Preserve existing submit/validation behavior.
- **Footer / colophon:** magazine back-matter — big Fraunces CTA, contact + socials, and a
  typographic colophon line (e.g. "Set in Fraunces & Libre Franklin. Built with React.").

## Motion

Editorial restraint — confident, not busy:
- One staged page load: masthead rule draws in, headline words rise-and-fade in stagger,
  sections fade up on scroll.
- Index rows: crisp hover (accent slide + marker + thumbnail peek).
- Motion is **CSS-driven**, orchestrated by a small in-house `Reveal` component: an
  IntersectionObserver toggles a class and the animation itself is pure CSS. No motion
  library (see Dependencies).
- All motion respects `prefers-reduced-motion`.

## Dependencies

- Fonts via `<link>` in `index.html`. **No new npm dependencies** — reveals use a
  small in-house `Reveal` component (IntersectionObserver + CSS), chosen over the
  `motion` library to keep the bundle lean and avoid install risk.

## Constraints & guardrails

- Keep all existing tests green (Vitest + Testing Library + MSW). Selectors/roles/labels that
  tests rely on must be preserved; update tests only where markup legitimately changes.
- Preserve accessibility: focus states, aria-labels, keyboard nav, reduced-motion.
- Run `snyk_code_scan` on generated first-party code (per repo policy) and address findings.

## Resolved during build

1. Projects render as **index rows with a hover thumbnail peek** (not a card grid).
2. Hero statement line: **"I build the systems / behind the screen."** (alternatives easy
   to swap in `HomePage.tsx`).
3. Reveals use an in-house `Reveal` component instead of the `motion` library.
4. Fixed pre-existing test-harness breakage discovered while verifying (unrelated to the
   redesign): page tests lacked a `QueryClientProvider`; `.env` pointed the test API base
   at `127.0.0.1` while MSW intercepts `localhost` (added `.env.test`); `Footer` now uses a
   router `<Link>` so its test wraps in `MemoryRouter`. Full suite: **23/23 green**.
