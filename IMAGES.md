# Image Manifest

Every image slot on the site routes through `src/content/images.ts`. To swap a placeholder, drop the final asset into `/public` (any folder) and change the matching `src` line in that file. One line per swap, nothing else to touch.

Placeholders live in `/public/placeholders` as labeled SVGs at the correct aspect ratios. Final assets should be optimized JPG or WebP at the dimensions below (2x of rendered size is already accounted for).

## Slots

| Key (images.ts)   | Placeholder file                          | Final size  | What the final asset should depict                                                                |
| ----------------- | ----------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `aboutPortrait`   | `/placeholders/about-portrait-1200x1500.svg` | 1200 x 1500 | Portrait photo of Aamir, natural light, plain warm background. Existing `/profile_white.png` or `/profile_dark.png` can stand in if recropped to 4:5. |
| `workCleartraced` | `/placeholders/work-cleartraced-1600x1000.svg` | 1600 x 1000 | Cleartraced product UI: extraction dashboard or datapoint view with confidence scores and source links. Screenshot on neutral background. |
| `workLookatlas`   | `/placeholders/work-lookatlas-1600x1000.svg` | 1600 x 1000 | LookAtlas studio UI: an uploaded product photo next to generated studio shots. |
| `workMorphai`     | `/placeholders/work-morphai-900x1800.svg` | 900 x 1800  | Morph AI app screen (phone, portrait): chat or model-routing view. Clean device frame or flat screenshot. |
| `workFitdyz`      | `/placeholders/work-fitdyz-900x1800.svg`  | 900 x 1800  | Fitdyz AI app screen (phone, portrait): workout/diet plan or FitBot conversation. |
| `workHiredswift`  | `/placeholders/work-hiredswift-1600x1000.svg` | 1600 x 1000 | HiredSwift dashboard: application tracking view. |
| OG image          | `/placeholders/og-image-1200x630.svg`     | 1200 x 630  | Designed social card: name, role, paper/ink/orange palette. Must be PNG or JPG (crawlers ignore SVG). Currently `/profile_white.png` is wired as a temporary OG image in `src/app/layout.tsx`. |

## Notes

- Blog covers in `/public/blogs/` are real assets already in use, untouched.
- The OG slot is referenced directly in `src/app/layout.tsx` metadata (search for the `TODO`), not via `images.ts`, because metadata needs a static raster path.
- Alt text for every slot is defined next to its entry in `src/content/images.ts`. Update alt text when swapping in real screenshots.
