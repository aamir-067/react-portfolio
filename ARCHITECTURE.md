# Architecture

Personal portfolio for Muhammad Aamir Khan, Sr. Fullstack AI Engineer. One design concept drives everything: **signal from noise**. Raw, unstructured points resolve into structured, traceable data, the same story as the AI systems in the case studies.

## Stack

- Next.js 16, App Router, static export (`output: "export"`, `distDir: "build"`, `trailingSlash: true`)
- GSAP 3.15 (ScrollTrigger, SplitText) + Lenis smooth scroll
- Tailwind 3 with CSS-variable design tokens
- TypeScript strict, path alias `@/* -> src/*`

No WebGL: an earlier hero used a three.js particle field, removed because it read as decoration. Typography, structure and motion carry the design; the bundle is dramatically lighter for it.

`trailingSlash` is required: the `/blogs` route must export as `blogs/index.html` because `public/blogs/` (markdown + covers) already occupies that directory on static hosts.

## Directory map

```
src/
  app/                 routes, layout, metadata, icon
  components/
    chrome/            site furniture: Header, Footer, Cursor, Grain,
                       Preloader (boot veil), ScrollFX (progress + shear)
    providers/         SmoothScroll (Lenis<->GSAP), TransitionProvider
                       (route veil + TransitionLink)
    sections/          home page sections, barrel export
    ui/                Magnetic, SectionHeading, PlaceholderImage, icons
  content/             ALL copy and facts, typed; single source of truth
  hooks/               useSectionAnimation (fonts-ready + gsap.context)
  lib/
    animations.ts      element-level reveals: lines, fadeUp, parallax, skew
    motion/            page-level systems: boot, charRepel
    gsap.ts            plugin registration singleton
    scroll.ts          Lenis singleton + scrollToTarget
    device.ts          reduced-motion / pointer / webgl / save-data guards
    blogs.ts           markdown loader (build-time fs)
```

## Systems

### Scoped section themes (`globals.css`)

`--bg-rgb` / `--fg-rgb` live on `:root` (paper); Tailwind exposes them as `surface`, `fg`, and `line` (fg at 14%). Ink sections (Work, Contact) apply the static `.theme-ink` class plus `bg-surface`, which re-scopes both variables for everything inside. No runtime mutation, by design: an earlier scroll-tweened version could strand the whole page dark mid-scroll or mid-navigation. Components never hardcode section colors; static `paper`/`ink`/`accent` classes are reserved for physical artifacts (veils, frames, fallbacks).

### Boot sequence (`chrome/Preloader.tsx` + `lib/motion/boot.ts`)

An inline head script flags `html[data-boot]` for fresh sessions before first paint (no content flash). The veil plays a 2s pipeline log + counter, then wipes; `signalBootReveal()` releases the hero entrance timeline, which waits via `onBootReveal()`. Reduced-motion sessions and revisits skip it entirely through CSS, and the hero plays immediately.

### Route transitions (`providers/TransitionProvider.tsx`)

`TransitionLink` intercepts internal navigation: ink veil wipes up, `router.push`, scroll reset, `ScrollTrigger.refresh()`, veil exits, pending `#hash` scrolls via Lenis. Same-path links (compared with trailing slashes stripped) scroll without a veil. Modified-click and reduced-motion fall through to default navigation. A 2.2s watchdog force-lifts the veil if the route never resolves; the boot veil carries an equivalent 4.5s fail-safe. Overlays must never be able to strand the page dark.

### Hero specimen (`sections/Hero.tsx` + `lib/motion/typeWave.ts`)

The hero is a living type specimen. The role is set as a four-line oversized sentence with manuscript line numbers and a drawn baseline caption. Every glyph is double-layered (roman base, italic accent twin); the cursor sweeps a falloff wave that crossfades glyphs into orange italic with a slight lift, while the word "signal" inverts (italic to upright ink). `pulse()` runs one autonomous pass after the entrance, and coarse-pointer devices get an ambient pass every 7s. A rotating press stamp (name and role circling the dot-grid brand mark) is a magnetic button that scrolls to Selected Work. The entrance timeline waits for the boot veil via `onBootReveal`; line masks are removed after the reveal so glyph lifts never clip.

### Scroll instruments (`chrome/ScrollFX.tsx`)

Reading-progress hairline plus a velocity shear (skewX, clamped 1.4deg) on `[data-shear]` display headings. Re-bound per route via `usePathname`.

### Reveal conventions (`lib/animations.ts` + `hooks/useSectionAnimation.ts`)

Sections own their animation in one `useSectionAnimation` callback: waits for `document.fonts.ready`, wraps in `gsap.context`, skips entirely under reduced motion (content stays visible because all states are `.from()` tweens). Data attributes are the contract: `data-lines` (masked SplitText lines), `data-fade`, `data-frame` (clip reveal + parallax), `data-skew` (velocity skew), `data-shear`, `data-case` (rail tracking).

## Content pipeline

Facts come only from `my-information/` and live in `src/content/*.ts`, typed. Images route through `src/content/images.ts`; swap slots per `IMAGES.md`. Blog posts are markdown in `public/blogs/` registered in `src/blogs/index.ts`, loaded with `fs` at build time, rendered with react-markdown + rehype-highlight.

## SEO

Per-page metadata + canonicals (trailing slash), OG/Twitter cards (per-post covers), JSON-LD: Person + WebSite (layout), Article + BreadcrumbList (posts). `public/sitemap.xml` is maintained by hand; add new posts there and in `src/blogs/index.ts`.

## Accessibility

Skip link, semantic landmarks, sr-only h1 prefix, focus-visible accent outlines, aria-labels on icon links and the rail, `aria-live` on the copy button, decorative layers `aria-hidden`. Reduced motion: no Lenis, no GSAP states, no boot veil, no canvas, designed static fallback.

## Budgets

- No layout shift: media has explicit aspect ratios; overlays are fixed-position.
- Main thread: pointer-driven work (char repel, cursor, magnetic) goes through gsap quickTo and refs, never React state per frame.
- No heavy runtime dependencies in the hero path; LCP is the h1 text.
