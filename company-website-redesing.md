# Zovio Technologies, website redesign brief

Target: zoviotech.com
Owner: Aamir Khan, founder
Reference bar: Awwwards Site of the Day / FWA tier. Top 0.1% of agency sites, not a good template.

Paste everything below this line into a coding agent (Claude Code, Cursor) as the opening prompt. It is written to be executed, not discussed.

---

## 0. How to work with me

- Do not ask me questions. Make the call, build it, show me. If something is truly ambiguous, pick the bolder option and note the assumption in one line.
- Surprise me. I have seen the ordinary version of every agency site. If a section could appear on a $49 template, redesign it until it cannot.
- Show, do not tell. Every claim about quality has to be visible on screen.
- Verify in a real browser before you report done. Desktop 1440, mobile 390, dark and light. Screenshots, console clean, `npm run build` clean.
- Keep every fact from the current site unless I say otherwise. Rewrite the wording, never the numbers or the offer.

## 1. What Zovio is (content inventory, keep all of it)

Company: Zovio Technologies. AI automation agency. Founded by Aamir Khan. Remote first, serving US, UK, Europe and Australia with cover for EST, PST, GMT, CET and AEDT.

Promise: eliminate repetitive work with AI systems. Current headline: "Save 20+ hours weekly by automating repetitive tasks. Focus on growth."

Services (four):
1. AI Lead Qualification. Capture, score and qualify leads automatically.
2. RAG Knowledge Bases. Company documents become a searchable AI assistant.
3. AI Customer Support Agents. WhatsApp, chat and voice agents running 24/7.
4. Workflow Automation. CRM updates, email sorting, invoice processing, built on n8n and Make.

Proof (three case studies, real numbers):
- Recruitment agency: 15+ hours saved per week.
- Real estate team: 80% fewer manual follow-ups.
- E-commerce brand: response time from 6 hours to 5 minutes.

Process (four steps): Free discovery call. Workflow review and ROI calculation. Free MVP or strategy plan. Full system build and handoff.

Offer: Free AI MVP program. Three qualified businesses selected each month, prototype in 2 to 3 weeks. Free AI audit. Reply within 24 hours.

Pricing: projects start at $1,000. Quick automations $1k to $3k. Custom RAG $3k to $10k. Complex AI systems $10k+.

Stack logos: OpenAI, Anthropic, LangChain, Pinecone, Make.com, n8n, Zapier, HubSpot, Slack, WhatsApp.

FAQ (six): What do you do that ChatGPT cannot. How long does a project take. What if I know nothing about AI. Do you offer ongoing support. How much does it cost. What is the Free AI MVP program.

Contact: contact@zovio.tech. Calendly, 30 minute call: https://calendly.com/aamirdev/1-in-1-meeting

Current site structure to replace: numbered nav (01 Home ... 08 Contact), hero with amber particle stream, before/after table, services cards, locations grid, results, process steps, MVP block, reviews, FAQ accordion, contact form. All of it is a competent dark template. None of it is memorable. Everything below replaces it.

## 2. The concept: "Busywork in, growth out"

Zovio's own motto is already the idea: INPUT: BUSYWORK / OUTPUT: GROWTH. The site is a machine you can watch working. Messy input on the left of the story becomes clean output on the right, and the visitor drives it.

Three structural rules:
1. The hero is a physical object the visitor can touch, not a headline with decoration.
2. Every number on the site is animated from its real "before" state to its real "after" state. 6 hours becomes 5 minutes on screen. Never invent a number.
3. Every section flips between two registers, the way a great editorial site cuts from a full bleed image to a white page. Never five identical dark cards in a row.

## 3. The look (mix of three references)

Reference A, haoqi.design: full viewport WebGL hero, saturated cobalt field with soft diagonal light streaks, a glossy 3D word floating in it, HTML sticker collage with pointer parallax, mono instrument HUD (live clock, X/Y readout, theme toggle in brackets), one long index list with lime tags, faint grid with crosshair marks.

Reference B, noth.in: white and black brutalism, one giant word filling the viewport, hard cuts from white section to black section, huge staggered image cards at different heights, pill button, tiny mono labels, no decoration anywhere.

Reference C, aamir.zoviotech.com (my portfolio, already built, match its family): Manrope 800 caps for display, IBM Plex Mono for every label and number, cobalt `#1B2AF0` hero field, lime `#C6FF3D` tags, graphite `#0F1111` dark ground, paper `#FFFFFF` light ground, liquid chrome 3D letters with spring physics, ticked custom cursor with words inside it, theme toggle `Theme[D]` / `Theme[L]`, menu takeover `Menu[::]`, footer marquee.

Zovio should read as the company that the portfolio owner runs. Same family, more confident, more product.

## 4. Design tokens

Colors. Dark is default.

| Token | Dark | Light | Job |
|---|---|---|---|
| `--bg` | `#0F1111` | `#FFFFFF` | Page ground |
| `--bg-2` | `#191B1B` | `#F2F2EE` | Raised rows, hover fills |
| `--fg` | `#F2F2EE` | `#000000` | Text |
| `--line` | fg at 14% | fg at 14% | Hairlines |
| `--field-a` | `#070D4A` | `#A9C8F2` | Hero field, deep end |
| `--field-b` | `#1B2AF0` | `#DBE9FB` | Hero field, light end |
| `--lime` | `#C6FF3D` | `#C6FF3D` | Tags, live status, one accent only |
| `--cobalt` | `#1B2AF0` | `#1B2AF0` | Menu takeover, veils, links on light |

Forbidden: the current amber `#F5A623` family, purple to blue gradients, cream paper, any serif, glassmorphism cards, drop shadows on cards, emoji anywhere. Icons come from lucide-react only.

Type. Manrope (variable, 500 for body, 800 for display, caps with -0.045em tracking, 0.9 line height). IBM Plex Mono 400 and 500 at 11 to 12px, uppercase, 0.04em tracking, tabular numbers, for every label, tag, timestamp, price and metric caption. Body 17px. No third face.

Layout. 12 columns. Gutter `clamp(20px, 4.5vw, 72px)`. Faint fixed grid: two gutter rails, verticals at thirds, horizontals at thirds, 12px crosshairs at the intersections, fg at 12%. Left aligned, ragged right, never centered paragraphs.

Motion. Lenis smooth scroll driving GSAP ScrollTrigger. Reveals are masked line splits (SplitText), 0.9 to 1.2s, expo.out, once. Section paddings 28 to 40 viewport heights of air, no cramped stacks. `prefers-reduced-motion` gets native scroll, no WebGL, no custom cursor, static final states.

## 5. Chrome (persistent UI)

Top HUD, fixed: wordmark `ZOVIO.TECH` (Manrope 800, 15px) left. Right, in mono: `Work`, `Services`, `Theme[D]`, `Menu[::]`. Header text flips color automatically when a light section scrolls under it (ScrollTrigger on every `.invert-scope` element, toggle a `data-hud-top-invert` attribute on `html`). Over the open menu the header turns white.

Bottom HUD, fixed: left `EST NYC 09:41 · GMT LDN 14:41 · AEDT SYD 01:41` cycling every 4s through the four served zones with a real clock (this is the "remote team, your hours" pitch made functional). Center, mono pointer readout `0720 X 0450 Y`, desktop only. Right, a lime dot plus `Reply within 24h`.

Menu takeover: full viewport cobalt, items in Manrope 800 caps at `clamp(2.6rem, 9vw, 8.5rem)`, hover turns lime, mono numbers right, socials and email bottom left, clock bottom right. Wipes down in 0.7s expo.inOut, items masked-rise with 0.06s stagger. Use `gsap.fromTo` with explicit end values and `clearProps` before opening (a `from` tween on elements left at their start state captures the wrong end value).

Custom cursor: fine pointers only. A 5px dot that tracks tight and a 30px ticked ring that lags 0.5s and spins slowly. Over any link the ring opens to 44px and spins faster. Over anything with `data-cursor="Word"` the ring opens to 84px and shows the word inside in mono. Press squashes to 0.82 and springs back. Everything in `mix-blend-mode: difference` so it survives cobalt, black, white and photos. Default labels: cards `View`, case studies `Read`, the MVP block `Apply`, Calendly `Book`.

Preloader on first visit of a session only: cobalt veil, wordmark, a counter 000 to 100 in 1.1s, the word `ZOVIO` masked-rise, wipe up. Session storage flag. 4s fail-safe that removes the veil no matter what.

Route transitions: cobalt veil wipes up, route change, scroll reset, veil exits. 2.2s watchdog.

Theme toggle: stored in localStorage, applied by an inline head script before first paint so there is no flash.

## 6. Pages and sections

### 6.1 Home

**Hero (the object).** Full viewport. WebGL canvas with a cobalt shader field (diagonal light streaks through fbm noise, pointer glow, grain). Floating in it: the words `busy work` set as liquid chrome letters, one `TextGeometry` per glyph in Poppins Black, pillow bevel, `MeshPhysicalMaterial` metalness 1, roughness 0.16, clearcoat 0.6, iridescence 0.55, environment from `RoomEnvironment` PMREM (no network fetch). Each glyph is a spring body: the pointer pushes it aside, it tilts with velocity and settles. The surface dents under the pointer (`onBeforeCompile` vertex displacement along the normal, strength scales with pointer speed). A point light rides the cursor.

The twist that makes it Zovio's and not a copy: hold the pointer still on the word for 1.2s or click anywhere, and the letters of `busy work` scatter, then reassemble as `growth`. Same chrome, same physics, new glyph set. Release and it drifts back to `busy work` after 6s of no interaction. This is the motto, INPUT: BUSYWORK / OUTPUT: GROWTH, as a thing you do with your hand.

HTML over the canvas, all mono unless stated:
- Top left, Manrope 500 at `clamp(1.4rem, 2vw, 1.9rem)`: `AI automation` / `for operators`.
- Top center: `Thinking in systems.` / `Shipping the whole thing.`
- Top right, mono paragraph: `Zovio builds the AI systems that close leads, answer customers and move data while you sleep. Founded by Aamir Khan. Remote team across US, UK, Europe and Australia.`
- Bottom left, Manrope 800 caps at `clamp(2.6rem, 7.6vw, 7.4rem)`, three lines: `WE AUTOMATE` / `THE BUSYWORK.` / `YOU GROW.`
- Stickers with pointer parallax at different depths, hidden below md: a rotating cream stamp ring reading `ZOVIO TECHNOLOGIES • AI AUTOMATION • EST PST GMT CET AEDT •` with a small orbit mark in the middle; a lime tag `● 3 free MVP slots this month`; a pixel arrow cursor sticker in cobalt with white outline; a bordered chip `Leads / RAG / Support / Workflows ↗`.
- Fallback when WebGL is missing or reduced motion is on: the CSS gradient of the field, no letters, everything else intact.

**Statement (white cut, noth.in register).** `.invert-scope`: paper ground in dark theme, ink ground in light theme. Top left, Manrope 500 two lines: `Not another chatbot.` / `A system that does the work.` Under it a pill `Book a 30 minute call →` (Calendly). Middle, the word `ZOVIO` set to exactly the container width with a fit-text measure, chars masked-rise on enter, slight upward parallax on scroll. Bottom row: `Projects from $1,000. Reply within 24 hours.` left, `LinkedIn ↗ / Email ↗` right in mono.

**Before / After (the machine, scroll driven).** Full viewport pinned for 200vh. Left column titled `WITHOUT AI` in mono, right column `WITH ZOVIO`. As the visitor scrolls, six rows morph from the left state to the right state one at a time with a masked line swap and a counter:
- `Leads answered in 6 hours` becomes `Leads answered in 5 minutes` (counter 6h to 5m).
- `Manual follow-ups: 100%` becomes `Manual follow-ups: 20%` (counter 100 to 20).
- `15 hours a week on admin` becomes `0 hours a week on admin`.
- `Answers buried in PDFs` becomes `Answers in one question`.
- `Support 9 to 5, one timezone` becomes `Support 24/7, every timezone`.
- `Data typed into the CRM by hand` becomes `Data in the CRM before the call ends`.
A thin lime progress line runs between the columns and fills with scroll. This replaces the current before/after table.

**Services (routing diagram, not cards).** Black register. Heading `WHAT WE AUTOMATE` left, statement right in Manrope 500 at `clamp(1.6rem, 3.4vw, 3.4rem)`: `One request in. The right system answers.` Below: an SVG diagram. `REQUEST` node left, four service nodes in the middle (Leads, Knowledge, Support, Workflows), `RESULT` node right, cubic paths between them. Hovering or focusing a service lights its two paths in lime and sends a small dot travelling along them; the description and the stack (`n8n / Make / HubSpot`) swap in below the list. Auto-cycles every 3.4s when idle and in view, pauses on hover or focus. The list of four is the keyboard-accessible control, the SVG is `aria-hidden`.

**Results (noth.in staggered cards).** Heading `RESULTS`, statement `Real numbers. Real businesses. Every one of them traceable.` Three cards at different heights across the 12 column grid (col 1 to 7 / col 8 to 12 offset 22vh / col 3 to 10). Each card: mono label (sector), Manrope 500 one-line outcome, a 4:3 or 4:5 image frame with a lime tag in the corner (`RECRUITMENT`, `REAL ESTATE`, `E-COMMERCE`), and the metric as a GSAP counter from real before to real after (`15+ hrs/week`, `100% → 20%`, `6h → 5min`). Image zooms 1.04 on hover, parallaxes 6% on scroll. Cards link to `/work/[slug]` case study pages with the full story.

**Process (index list, haoqi register).** Heading `HOW IT RUNS`. Four rows, each `tag / title / right meta`: `STEP 01 · Free discovery call · 30 min`, `STEP 02 · Workflow review and ROI calculation · 3 to 5 days`, `STEP 03 · Free MVP or strategy plan · 2 to 3 weeks`, `STEP 04 · Full build and handoff · scoped`. Rows fill with `--bg-2` on hover from the top. Under it a small mono line: `Free MVP program: 3 businesses selected each month.`

**Free MVP (the offer, one loud block).** Cobalt register, full width. Manrope 800 caps `TEST OUR ENGINEERING` / `RISK FREE.` Mono paragraph explaining the three slots and the 2 to 3 week prototype. A live counter in a lime tag: `3 slots left · resets 1 Oct`. This number must come from a single constant in content, not hardcoded in markup. Pill `Apply for the free MVP →` with `data-cursor="Apply"`.

**Reviews (quiet).** Paper register in dark theme. Testimonials as large Manrope 500 quotes, one at a time, horizontal drag on desktop and swipe on mobile, mono name and role under each, a mono index `01 / 04` bottom right. No stars, no avatars in circles, no cards.

**FAQ (index rows).** Six rows in the same index list component, tag `Q.01`, question as title, answer expands with a masked height tween. Only one open at a time. Keyboard operable, `aria-expanded` correct.

**Contact.** Calmest section on the site. Mono `Let's automate your biggest bottleneck`. Manrope 800 caps `ONE CALL.` / `ONE BOTTLENECK GONE.` Email `contact@zovio.tech` large with a copy button (pill, shows `Copied` for 2s). Pill `Book on Calendly →`. Below, the footer marquee: `ZOVIO TECHNOLOGIES` repeated in Manrope 800 caps at 14vw, fg at 10%, scrolling slowly. Bottom row in mono: legal name and `Remote · US · UK · EU · AU · Founded by Aamir Khan`.

### 6.2 Work case studies (`/work/[slug]`)

Three pages, one per result. Mono tag and index, title in Manrope 800 caps at `clamp(3rem, 12vw, 13rem)` masked-rise on load, one-line outcome, meta grid (sector, scope, stack, timeline), hero image at its declared ratio, metrics as counters, then `Problem`, `Approach`, `Outcome` as mono label left and paragraph right, each with a source marker (a small `<button>` with a tooltip: `Verified` with a lime dot when there is a public artifact, `Self-reported` with a hollow ring otherwise). Next project link at the bottom in giant type.

### 6.3 Services and Blog

`/services`: the routing diagram at full height plus four long-form rows, each with a problem, what gets built, typical timeline and price band from Section 1. `/blog`: index list of posts with `NOTE` tags and dates, post pages in the same type system with a mono meta row and a 16:9 cover. Keep the existing posts and slugs.

## 7. Content and copy rules

- Keep all numbers, prices, tools, locations, the founder line, the email and the Calendly link exactly as they are.
- Rewrite headlines to be short, declarative, in the voice of someone who ships. No "unlock", "elevate", "seamless", "cutting-edge", "leverage", "empower".
- Never use an em dash. Use a period or a comma.
- Labels name what the visitor sees, not internal system names.
- One idea per sentence. Read every headline aloud once.
- Every stat carries a source note. If a number cannot be sourced, cut it.

## 8. Tech

- Next.js 16 App Router, static export, `trailingSlash: true`. Tailwind 3 with CSS variable tokens. TypeScript strict.
- GSAP 3.15 with ScrollTrigger and SplitText, Lenis wired into GSAP's ticker. `useSectionAnimation` pattern: one `gsap.context` per section, waits for `document.fonts.ready`, skipped entirely under reduced motion.
- three + @react-three/fiber + @react-three/drei for the hero only, loaded through `next/dynamic` with `ssr: false`, frameloop set to `never` when the hero leaves the viewport. Typeface JSON generated offline from a TTF with opentype.js (script in `scripts/typeface.mjs`), never fetched at runtime from a CDN.
- `reactStrictMode: false`. React 19 StrictMode double-mounts the Canvas in dev and R3F force-loses the shared WebGL context 500ms after the simulated unmount; the hero appears blank. Production is unaffected but dev must match prod.
- Fonts via `next/font/google`: Manrope, IBM Plex Mono. Poppins Black only as the converted 3D typeface.
- Icons: lucide-react. No emoji anywhere in the UI.
- All copy, numbers, prices, slot counts, FAQ, stack logos, time zones live in `src/content/*.ts`, typed, one source of truth. Images route through `src/content/images.ts` with exact widths and heights; frames use those ratios; ship an `IMAGES.md` listing every slot, exact pixel size, ratio and what to put in it.

## 9. Accessibility and performance

- Skip link, landmarks, one h1 per page, visible focus rings (`outline: 2px solid var(--fg)`), `aria-expanded` on FAQ and menu, `role="dialog"` on the menu, tooltips reachable by keyboard, SVG diagram controlled by a real list of buttons.
- Reduced motion: no Lenis, no GSAP states, no boot veil, no WebGL, no sticker animation, no custom cursor, counters show final values, before/after shows the after state.
- LCP is text. Hero canvas mounts after hydration. Images lazy except the first card. Target Lighthouse 90+ performance on the deployed static build, 100 accessibility.
- Absolutely positioned tooltips must not widen the page on mobile: clip `main` and `footer` horizontally and align notes toward the viewport center.

## 10. Build order

1. Tokens, fonts, theme script, HUD, grid, cursor, menu, preloader, transitions. Strip everything amber.
2. Hero: field shader, chrome letters, spring physics, dent, `busy work` to `growth` swap, stickers, fallback.
3. Statement, Results cards, Process rows, Contact and marquee.
4. Before/After pinned machine, Services routing diagram, Free MVP block, Reviews, FAQ.
5. Case study pages, Services page, Blog restyle, sitemap, JSON-LD (Organization, Service, FAQPage, Article).
6. Verification pass: 1440 and 390, dark and light, keyboard only, reduced motion, console clean, `npm run build` clean, screenshots of every section.

## 11. Definition of done

- A stranger can describe the hero from memory after one visit: chrome words you push around that turn busywork into growth.
- No two sections use the same layout.
- Every number animates from a real before to a real after and has a source.
- Dark and light are both finished designs, not one design with inverted colors.
- Nothing on the page could be mistaken for a template.
