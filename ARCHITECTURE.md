# Architecture

Personal portfolio for Muhammad Aamir Khan, Sr. Fullstack AI Engineer. The design
mixes two registers on purpose: an instrument-panel hero (WebGL field, mono HUD,
floating stickers, live clock and pointer readout) and a hard editorial body
(giant name, staggered image cards, one long index). Dark theme is the default;
light theme flips the whole site to paper white and ink black.

## Stack

- Next.js 16, App Router, static export (`output: "export"`, `distDir: "build"`, `trailingSlash: true`)
- GSAP 3.15 (ScrollTrigger, SplitText) + Lenis smooth scroll
- three.js + @react-three/fiber + @react-three/drei for the hero only, loaded with `next/dynamic` after hydration
- Tailwind 3 with CSS-variable design tokens
- TypeScript strict, path alias `@/* -> src/*`

`trailingSlash` is required: the `/blogs` route must export as `blogs/index.html` because `public/blogs/` (markdown + covers) already occupies that directory on static hosts.

`reactStrictMode` is off. React 19 StrictMode double-mounts `<Canvas>` in dev and
R3F force-loses the shared WebGL context 500ms after the simulated unmount, which
freezes the hero. Production builds were never affected.

## Directory map

```
src/
  app/                 routes, layout, metadata, icon; work/[slug] case study pages
  components/
    chrome/            Hud (top nav, theme toggle, bottom readouts), Menu (takeover),
                       GridLines, Grain, Preloader, ScrollFX, Footer
    hero/              Hero (HTML layer), HeroScene (R3F scene), Stickers (parallax layer)
    providers/         SmoothScroll (Lenis<->GSAP), TransitionProvider (route veil + TransitionLink)
    sections/          Statement, Works, About, Ledger; barrel export
    work/              CaseStudy (project detail body)
    ui/                Counter, TraceMark, PlaceholderImage, SectionHeading, Magnetic, icons
  content/             ALL copy and facts, typed; single source of truth
  hooks/               useSectionAnimation, useFitText
  lib/                 animations, gsap, scroll, device, theme, format, blogs, motion/boot
public/fonts/          poppins-black.typeface.json (three.js font for the hero word)
scripts/typeface.mjs   TTF/OTF → three typeface JSON converter
```

## Systems

### Theme (`lib/theme.ts`, `globals.css`)

`--bg`, `--bg-2`, `--fg` live on `:root` as RGB triplets; Tailwind exposes them as `bg`, `bg-2`, `fg`, `line`. `[data-theme="light"]` swaps them. An inline head script applies the stored theme before first paint. `.invert-scope` flips a section locally (the Statement section is paper in dark mode and ink in light mode, the way noth.in cuts white to black). The HUD is fixed, so `Hud` tracks `.invert-scope` elements with ScrollTrigger and flags `data-hud-top-invert` / `data-hud-bottom-invert` on `<html>` to keep its type legible.

### Hero (`components/hero/*`)

`Hero` renders the HTML layer and mounts `HeroScene` only when WebGL is available and reduced motion is off; otherwise the `.hero-fallback` CSS gradient stands in. The scene is a full-bleed shader backdrop (diagonal light streaks, fbm noise, pointer glow), a RoomEnvironment PMREM for reflections, and the greeting as liquid-chrome letters: one `TextGeometry` per glyph (Poppins Black, pillow bevel, UVs dropped and vertices merged for smooth normals), `MeshPhysicalMaterial` with metalness 1, clearcoat and iridescence, plus an `onBeforeCompile` vertex dent around the pointer. Each glyph is a damped spring body: the pointer pushes it (harder when moving fast), it tilts with velocity and settles; `pointerdown` on the canvas bursts the word apart. A point light rides the cursor so reflections travel. Palette lerps between theme targets every frame. The frameloop switches to `never` when the hero leaves the viewport. `Stickers` is an HTML layer with per-depth pointer parallax; hidden below `md`.

### Hero greeting (`content/site.ts` → `greetings`, `lib/greeting.ts`)

The 3D word is resolved on the client: IANA time zone first (`byTimeZone`), then `navigator.languages` (`byLanguage`), then `fallback`. Edit the maps to change words or add regions. The typeface is Poppins Black converted with `scripts/typeface.mjs` (opentype.js → three typeface JSON, Latin glyphs only), so keep greetings in Latin script.

### Cursor (`chrome/Cursor.tsx`)

Fine pointers only. A tight dot plus a lagging ticked ring in difference blend. Any `a`, `button` or `[data-cursor]` opens the ring; `data-cursor="View"` shows that word inside it. Disabled under reduced motion.

### Boot sequence (`chrome/Preloader.tsx` + `lib/motion/boot.ts`)

An inline head script flags `html[data-boot]` for fresh sessions before first paint. The veil counts to 100 over ~1.2s and wipes; `signalBootReveal()` releases hero entrance timelines waiting via `onBootReveal()`. Reduced-motion sessions and revisits skip it.

### Route transitions (`providers/TransitionProvider.tsx`)

`TransitionLink` intercepts internal navigation: cobalt veil wipes up, `router.push`, scroll reset, `ScrollTrigger.refresh()`, veil exits, pending `#hash` scrolls via Lenis. A 2.2s watchdog force-lifts the veil if the route never resolves.

### Reveal conventions (`lib/animations.ts` + `hooks/useSectionAnimation.ts`)

Sections own their animation in one `useSectionAnimation` callback: waits for `document.fonts.ready`, wraps in `gsap.context`, skips entirely under reduced motion (content stays visible because all states are `.from()` tweens). Data attributes are the contract: `data-lines` (masked SplitText lines), `data-fade`, `data-card` (card rise + image parallax in Works), `data-shear` (velocity skew on display headings).

### Fit text (`hooks/useFitText.ts`)

Measures the text with a Range at 100px and scales font-size so the name spans its container. Used by the Statement section.

## Content pipeline

Facts come only from `my-information/` and live in `src/content/*.ts`, typed. Images route through `src/content/images.ts`; `IMAGES.md` is the export spec (exact pixel sizes per slot, frames enforce the ratio). Every stat and metric carries a `source`/`trace` note rendered by `TraceMark` (verified vs self-reported). Blog posts are markdown in `public/blogs/` registered in `src/blogs/index.ts`, loaded with `fs` at build time.

## SEO

Per-page metadata + canonicals (trailing slash), OG/Twitter cards, JSON-LD: Person + WebSite + ProfilePage (layout), CreativeWork (work pages), BlogPosting + BreadcrumbList (posts). `sitemap.ts` includes work pages and posts.

## Accessibility

Skip link, semantic landmarks, sr-only name in the hero h1, focus-visible outlines, aria on menu dialog and trace markers, decorative layers `aria-hidden`. Reduced motion: no Lenis, no GSAP states, no boot veil, no WebGL, no sticker animation.
