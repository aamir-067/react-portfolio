# Image spec

Every image on the site is a slot in `src/content/images.ts`. The layout frames
use the exact ratio declared there, and `object-fit: cover` crops anything that
does not match. Export each file at the pixel size below, save it at the path
below with the same name, and nothing else needs to change.

Format: WebP, quality 80 to 85. sRGB. No rounded corners or drop shadows baked in
(the frame draws its own edges). Keep important content away from the outer 6%
of the frame so nothing important sits under the lime tag in the top right corner.

## Slots

| Key               | File                          | Exact size   | Ratio | Where it shows                                             | What to put in it                                                                                                                              |
| ----------------- | ----------------------------- | ------------ | ----- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `aboutPortrait`   | `public/profile.webp`         | 1200 × 1500  | 4:5   | About section, right column, max 260px wide                | Portrait photo, chest up, plain or softly lit background. Face in the upper half.                                                              |
| `workCleartraced` | `public/portfolio/cleartraced.webp` | 1600 × 1200  | 4:3   | Works card 1 (wide, left), case study page hero full width | Dashboard on a neutral or dark backdrop. One clear screen, not a collage.                                                                       |
| `workLookatlas`   | `public/portfolio/lookatlas.webp`   | 1200 × 1500  | 4:5   | Works card 2 (tall, right, offset down), case study hero   | Editorial composition: a generated product shot or the studio UI on a poster-like ground. Portrait framing matters, this card reads like a print. |
| `workMorphai`     | `public/portfolio/morphAi.webp`     | 1200 × 1500  | 4:5   | Works card 3 (tall, centre-left), case study hero          | Phone screen placed on a coloured ground, phone centred, ~70% of the frame height. Flat screenshot in a device frame is fine.                   |
| `workFitdyz`      | `public/portfolio/fitdyz.webp`      | 1200 × 1500  | 4:5   | Works card 4 (tall, right), case study hero                | Same treatment as Morph AI so the two mobile cards match. Different ground colour.                                                             |
| `workHiredswift`  | `public/portfolio/hiredswift.webp`  | 1600 × 1000  | 16:10 | Works card 5 (wide, centred), case study hero full width   | Dashboard or landing page, wide crop, on a neutral ground.                                                                                     |

## Other assets

| Asset        | File                                   | Exact size  | Notes                                                         |
| ------------ | -------------------------------------- | ----------- | ------------------------------------------------------------- |
| Social card  | `public/og.png`                        | 1200 × 630  | PNG or JPG only. Name, role, one line. Crawlers ignore SVG.    |
| Blog covers  | `public/blogs/<slug>-cover.webp`       | 1600 × 900  | 16:9. Referenced from each post's front matter `coverImage`.  |
| Icons        | `public/icon-192.png`, `icon-512.png`  | 192, 512    | Square, opaque background.                                    |

## Changing a slot

- Different ratio wanted: change `width` and `height` for that key in
  `src/content/images.ts`. Frames update automatically. Keep the file at the
  new size.
- Different file name: change `src` for that key. Nothing else references the path.
- Alt text lives next to each slot. Update it when the picture changes.

## Quick check

Open a card at 1440px wide. The image should fill its frame with no letterboxing
and no important element cut off at the edges. If it looks cropped, the exported
file is not at the ratio above.
