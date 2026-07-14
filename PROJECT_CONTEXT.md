# Project Context: Game Engine Website

Last updated: 2026-07-07

This document is the handoff source for future Codex sessions. It summarizes the current website state, design requirements, completed work, known caveats, and the structure of the project.

## Project Goal

Build a modern, premium, responsive homepage and game detail experience for Game Engine, an international iGaming game provider. The site should preserve the Game Engine brand identity and provided artwork while improving UI/UX to feel comparable to modern game providers such as Games Global, Evolution, Pragmatic Play, Relax Gaming, EveryMatrix, and Spribe.

Primary expectations:

- Premium casino/iGaming visual style.
- Modern responsive UI for desktop, tablet, and mobile.
- Preserve original Game Engine logo and all game logo artwork.
- Use provided assets without redesigning, recoloring, stretching, or cropping logos.
- Smooth animations and hover states.
- Fast static-site implementation with clean HTML, CSS, and JavaScript.

## Workspace

Project root:

```text
C:\Users\L-User\Documents\website design
```

Main files:

```text
index.html
styles.css
script.js
game-detail.html
game-detail.js
PROJECT_CONTEXT.md
assets/
```

Local server used during development:

```text
http://127.0.0.1:4173/
```

The user has also opened the site directly through:

```text
file:///C:/Users/L-User/Documents/website%20design/index.html
```

## Current File Structure

```text
assets/
  ge-logo.png
  banana-craze-banner.png
  lucky-color-combo-banner.png
  - Replaced with `LUCKY COLOR NEW HOMEBANNER.png` supplied on July 8, 2026.
  partnership-banner.png
  banana-craze-logo.png
  lucky-color-combo-logo.png
  pikapika-detail-logo.png
  game-section-background.png
  game-logos/
    innovation/
      blazing-7s.webp
      banana-craze.webp
      pikapika.webp
      ginto-match.webp
      lucky-color.webp
      bingo-flux.webp
      fortune-ocean.webp
      lucky-color-combo.webp
    classic/
      go-bananas.webp
      red-hot-7s.webp
      bingo-card.webp
      instant-keno.webp
      lucky-number.webp
      in-between.webp
      lucky-color.webp
      ginto-scratch.webp
      pika-pika.webp
  game-backgrounds/
    innovation/
      banana-craze-bg.png
      bingo-flux-bg.png
      blazing-7s-bg.png
      fortune-ocean-bg.png
      ginto-match-bg.png
      lucky-color-bg.png
      lucky-color-combo-bg.png
      pikapika-bg.png
    classic/
      bingo-card-bg.png
      ginto-scratch-bg.png
      go-bananas-bg.png
      halo-halo-bg.png
      in-between-bg.png
      instant-keno-bg.png
      lucky-color-bg.png
      lucky-number-bg.png
      pika-pika-bg.png
      red-hot-7s-bg.png
  game-videos/
    banana-craze-video.mp4
    bingo-flux-video.mp4
    blazing-7s-video.mp4
    ginto-match-video.mp4
    lucky-color-video.mp4
    lucky-color-combo-video.mp4
    pikapika-video.mp4
```

Additional generated screenshot/contact-sheet artifacts exist in the project root from earlier visual checks:

```text
homepage-desktop.png
homepage-desktop-slide2.png
homepage-desktop-slide3.png
homepage-hero-banana.png
homepage-hero-lucky.png
homepage-hero-partner.png
homepage-mobile.png
games-innovation.png
games-classic.png
logo-contact-sheet.png
```

There is also an accidental zero-byte file in the root named:

```text
!keys.includes(x))
```

It appears to be from a failed PowerShell quoting attempt and is not used by the site. Do not delete it unless the user asks or approves cleanup.

## Source Assets Provided By User

Important asset sources used:

```text
C:\Users\L-User\Downloads\Social Media\website asset\GE logo.png
C:\Users\L-User\Downloads\Social Media\website asset\483a305d-46c7-48d9-972c-cdfa1b35c148.png
C:\Users\L-User\Downloads\Social Media\website asset\cc562ed9-8fa7-40cb-b608-af31e7dc8dfc.png
C:\Users\L-User\Downloads\Social Media\ChatGPT Image Jul 7, 2026, 01_24_56 PM.png
C:\Users\L-User\Downloads\background game section.png
C:\Users\L-User\Downloads\Social Media\website asset\innovation games logo\
C:\Users\L-User\Downloads\Social Media\website asset\CLASSIC GAMES LOGO\
C:\Users\L-User\Downloads\Design website.pdf
```

Notes:

- `Design website.pdf` is the source of truth for game profile content.
- The PDF has profile copy for all current Innovation titles and most Classic titles, including Halo-Halo content. Halo-Halo is not displayed because no Halo-Halo logo asset was found in the provided Classic Games logo folder.
- PyMuPDF (`fitz`) is available locally and was used to extract PDF text.

## Homepage Structure

`index.html` currently contains:

1. Fixed header/navigation.
2. Hero carousel with three slides.
3. Shared Games showcase with Innovation and Classic sections.
4. Company section.
5. News section.
6. Contact section.
7. Footer.

The old proof/stat band with `Global / Fast / Fresh / Trusted` was removed at the user's request.

## Header

Requirements implemented:

- Fixed transparent header that becomes solid when scrolling.
- Game Engine logo on the left, preserving original colors.
- Navigation links:
  - Home
  - Innovation Games
  - Classic Games
  - Company
  - News
  - Contact
- Active page indicator and hover animation.
- `Sign In / Join` button linking to `#contact`.

## Hero Carousel

Slides:

1. Banana Craze
   - Image: `assets/banana-craze-banner.png`
   - Logo title asset: `assets/banana-craze-logo.png`
   - CTA: `Play Demo` links to `game-detail.html?game=banana-craze`
2. Lucky Color Combo
   - Image: `assets/lucky-color-combo-banner.png`
   - Logo title asset: `assets/lucky-color-combo-logo.png`
   - CTA: `Play Demo` links to `game-detail.html?game=lucky-color-combo`
3. Partnership
   - Image: `assets/partnership-banner.png`
   - Headline: `POWERING GROWTH THROUGH PREMIUM GAMING SOLUTIONS`
   - Supporting text: `Partner with us to access innovative games, certified solutions, and scalable gaming products designed to drive player engagement and business growth.`
   - Buttons:
     - `CONTACT US` links to `#contact`, opens in another tab.
     - `SCHEDULE A DEMO` links to `https://calendar.app.google/fy8Lhbc4J5BswETo8`, opens in another tab.
     - `BECOME A PARTNER` links to `https://gameengine.sg.larksuite.com/share/base/form/shrlgPGlr3hPkco6EyRMV9ejKHf`, opens in another tab.

Hero behavior:

- Autoplay every 5 seconds.
- Manual previous/next arrows.
- Pagination dots.
- Pointer drag/swipe support for mouse, touch, and pen.
- Text fade-in animations.
- Hero images use `object-fit: contain` for provided banner art so artwork is not cropped or stretched.
- Hero CTA buttons share a 280ms hover animation with slight scale and brand glow.

Important historical instruction from user:

- Do not crop hero artwork.
- Keep original provided hero backgrounds clean.
- Do not add overlays, gradients, particles, glows, blur effects, lighting effects, or additional effects to the hero background artwork itself.

## Games Showcase

The Games area is wrapped by:

```html
<section class="games-showcase" aria-label="Game Engine game catalog">
```

Important requirement:

- Innovation Games and Classic Games must share one continuous animated background.
- Do not use separate backgrounds per section.
- Background must not reset between sections.

Current implementation:

- One `.games-background` inside `.games-showcase`.
- Background image: `assets/game-section-background.png`.
- The background is duplicated inside the same layer and animated upward via `@keyframes gamesBackgroundRise`.
- Both `.game-section` and `.classic-section` are transparent inside `.games-showcase`.
- Scoped CSS override is required because generic `.section:nth-of-type(odd)` otherwise paints the Innovation section:

```css
.games-showcase .game-section,
.games-showcase .classic-section {
  background: transparent;
}
```

## Games Carousel

Current behavior:

- Innovation and Classic each have a horizontal infinite carousel.
- Game logos are static by default; there is no auto-scroll loop.
- Users browse manually with mouse drag, touch swipe, or left/right keyboard arrows.
- Swipe/drag is enabled directly on logo cards and images, not only empty carousel space.
- Uses clone-based marquee logic in `script.js`.
- Supports mouse drag and touch swipe.
- Uses a single curved arch effect by dynamically setting CSS variables:
  - `--carousel-x`
  - `--arch-y`
  - `--logo-scale`

Important implementation details in `script.js`:

- `buildLogoMarquees()` clones logo cards for seamless looping.
- No `requestAnimationFrame` auto-scroll is started for the game logo carousels.
- `startLogoCarousels()` only renders the current static carousel position.
- `handleLogoPointerDown`, `handleLogoPointerMove`, and `endLogoDrag` support drag/swipe.
- Normal click/tap on a logo routes to its detail page.
- Dragging suppresses accidental click navigation briefly.

## Game Logo Routing

Every game card is an anchor:

```html
<a class="game-logo-item" href="game-detail.html?game=...">
```

The homepage currently displays 17 game logos:

Innovation:

- BLAZING 7S -> `game-detail.html?game=blazing-7s`
- BANANA CRAZE -> `game-detail.html?game=banana-craze`
- PIKAPIKA -> `game-detail.html?game=pikapika`
- GINTO MATCH -> `game-detail.html?game=ginto-match`
- LUCKY COLOR -> `game-detail.html?game=lucky-color`
- BINGO FLUX -> `game-detail.html?game=bingo-flux`
- FORTUNE OCEAN -> `game-detail.html?game=fortune-ocean`
- LUCKY COLOR COMBO -> `game-detail.html?game=lucky-color-combo`

Classic:

- GO BANANAS -> `game-detail.html?game=go-bananas`
- RED HOT 7'S -> `game-detail.html?game=red-hot-7s`
- BINGO CARD -> `game-detail.html?game=bingo-card`
- INSTANT KENO -> `game-detail.html?game=instant-keno`
- LUCKY NUMBER -> `game-detail.html?game=lucky-number`
- IN BETWEEN -> `game-detail.html?game=in-between`
- LUCKY COLOR -> `game-detail.html?game=classic-lucky-color`
- GINTO SCRATCH -> `game-detail.html?game=ginto-scratch`
- PIKA-PIKA -> `game-detail.html?game=pika-pika`

Verification previously run:

- 17 homepage links.
- 17 unique links.
- 17 matching game data keys in `game-detail.js`.
- No missing link/data mappings.

## Game Detail Pages

The dedicated detail experience uses:

```text
game-detail.html
game-detail.js
```

It is query-parameter based:

```text
game-detail.html?game=pikapika
game-detail.html?game=instant-keno
```

This satisfies the "each game has its own detail page" requirement through unique URLs and unique data-driven page states.

`game-detail.js` contains the `GAME_DETAILS` object. Each profile has:

- `type`: `innovation` or `classic`
- `title`
- `logo`
- `tagline`
- `demoPrize`
- `overview`
- `howToPlay`
- Innovation games also have:
  - `stats`
  - `features`

Innovation detail layout follows the first reference image:

- One sticky topbar Back to Games link.
- Logo and game title/CTA message.
- Play Now button.
- Demo Video card.
- Stats row:
  - Active Players
  - Total Game Rounds
  - Maximum Prize Up To
  - Max Multiplier
- Three-column info panel:
  - Game Overview
  - Features
  - How To Play

Classic detail layout follows the second reference image:

- Larger logo/profile treatment.
- CTA message.
- Play Now button.
- Demo Video card.
- Two lower panels:
  - Game Overview
  - How To Play

Banana Craze, PIKAPIKA, Bingo Flux, Ginto Match, Blazing 7S, Lucky Color, Fortune Ocean, and Lucky Color Combo use real autoplaying, looping, muted `<video>` assets. Other detail pages still use the styled placeholder preview until video files are supplied.

Latest supplied demo videos copied into `assets/game-videos/`:

- PIKAPIKA -> `pikapika-video.mp4`
- LUCKY COLOR -> `lucky-color-video.mp4`
- LUCKY COLOR COMBO -> `lucky-color-combo-video.mp4`
- FORTUNE OCEAN -> `fortune-ocean-video.mp4`
- BINGO FLUX -> `bingo-flux-video.mp4`
- BLAZING 7S -> `blazing-7s-video.mp4`

Current detail video behavior:

- The visible "Demo Video" heading has been removed.
- Native and custom video controls are not displayed.
- Videos autoplay muted, loop continuously, and are shown with `object-fit: contain` so the full frame remains visible.
- Playback skips a short head/tail boundary in `game-detail.js` (`DEMO_VIDEO_TRIM_START` and `DEMO_VIDEO_END_PADDING`) to avoid blank/white frames because `ffmpeg` is not installed locally for physical MP4 trimming.
- The Back to Games link is in the sticky topbar on the left side and still routes to either Innovation Games or Classic Games depending on the current profile.

## Current Game Detail Data Notes

PDF-derived profiles implemented:

Innovation:

- PIKAPIKA
- BANANA CRAZE
- GINTO MATCH
- LUCKY COLOR
- BLAZING 7S
- BINGO FLUX
- FORTUNE OCEAN
- LUCKY COLOR COMBO

Classic:

- INSTANT KENO
- LUCKY COLOR
- IN BETWEEN
- GINTO SCRATCH
- PIKA-PIKA
- LUCKY NUMBER
- GO BANANAS
- RED HOT 7'S
- BINGO CARD

Classic Halo-Halo:

- The PDF includes Halo-Halo content.
- No Halo-Halo logo asset was found in the provided Classic Games logo folder.
- Halo-Halo is not currently displayed or routed.

Classic game detail pages do not have stats because the second reference layout and PDF content for Classic titles did not include the same stats row as Innovation.

## UI/UX Decisions

General:

- Keep a dark premium casino/iGaming visual system.
- Preserve Game Engine colors:
  - red/orange/yellow/blue/cyan accents.
- Use large artwork and generous whitespace.
- Use rounded panels and subtle glows.
- Avoid redesigning or recoloring logos.

Hero:

- Use provided full banner images.
- Keep text supportive and not competing with art.
- The user previously emphasized desktop focus.

Games section:

- The background is intentionally shared and continuous between Innovation and Classic.
- The shared Games background uses `assets/game-section-background.png`; this was replaced with the latest supplied `game section bg.png` image while keeping the same animation behavior.
- The logo carousel uses large logos and soft glow.
- The arch is dynamic and follows the visible position of logos.
- Logos remain static until the user manually drags, swipes, or uses arrow keys.
- Drag/swipe and click behavior have to coexist carefully.

Game detail:

- Uses dark/purple neon casino styling based on the provided reference screenshots.
- Detail demo video uses a real autoplaying/looping muted `<video>` for the supplied Innovation demo videos.
- Detail demo video frame was reverted to the original responsive wide container using `min-height: clamp(260px, 28vw, 380px)`.
- Detail videos use `object-fit: contain`.
- Detail game logos use the original game-card logo assets and original sizing, with soft rounded corners.
- Detail pages keep only one Back to Games control in the sticky topbar; the skip link and duplicate inline back link were removed.
- Other game detail pages keep the styled demo placeholder.
- Data comes from `Design website.pdf`.
- Each existing game detail profile has a `background` asset path.
- The page-level background is applied through `--game-detail-background` on `body.game-detail-page`.
- `styles.css` renders the background behind the full page with a fixed pseudo-element and a dark overlay `rgba(0, 0, 0, 0.54)`.

## Completed Work Summary

Completed:

- Built modern static homepage.
- Added fixed responsive header.
- Added hero carousel with three slides.
- Updated hero assets to user-provided resized images.
- Replaced Banana Craze and Lucky Color Combo hero text headings with provided logo images.
- Routed Banana Craze and Lucky Color Combo hero `Play Demo` buttons to their game detail pages.
- Updated hero carousel autoplay to 5 seconds and added pointer drag/swipe support.
- Applied the shared hero CTA hover animation to Play Demo, Contact Us, Schedule a Demo, and Become a Partner.
- Updated partnership banner image.
- Updated hero typography to match game themes.
- Configured partnership CTAs:
  - Contact Us
  - Schedule a Demo
  - Become a Partner
- Updated Become a Partner link to the latest Lark form URL:
  - `https://gameengine.sg.larksuite.com/share/base/form/shrlgPGlr3hPkco6EyRMV9ejKHf`
- Removed old proof/stat band.
- Added shared animated Games background.
- Replaced the shared Games background image with the latest supplied `game section bg.png`.
- Added Innovation and Classic game sections.
- Imported game logo assets.
- Built horizontal game logo carousels with manual swipe/drag/keyboard browsing and no auto-scroll.
- Made all displayed game logos route to detail pages.
- Created reusable game detail page and data renderer.
- Added page-wide per-game background images for existing game detail profiles.
- Added real looping autoplay demo videos for Banana Craze, PIKAPIKA, Bingo Flux, Ginto Match, Blazing 7S, Lucky Color, and Lucky Color Combo.
- Reverted detail logo assets/sizes to the original game-card versions and added rounded corners.
- Reverted the detail demo video frame to its original responsive wide size and kept videos fully visible.
- Removed duplicate game detail navigation links.
- Added PDF-based game profile content.
- Added responsive styling for homepage and detail pages.

## Pending Tasks / Possible Next Steps

Recommended next tasks:

1. Real browser click verification
   - The in-app browser automation timed out during some previous pointer tests.
   - Manually verify that clicking each logo routes to the correct detail page in the browser.

2. Add remaining real demo videos
   - Banana Craze, PIKAPIKA, Bingo Flux, Ginto Match, Blazing 7S, Lucky Color, and Lucky Color Combo already use real videos.
   - Other game detail pages still use styled demo placeholders until video assets are supplied.

3. Add missing Halo-Halo if asset is provided
   - PDF content exists.
   - Need logo asset before adding to Classic carousel and detail data.

4. Clean accidental root file
   - `!keys.includes(x))` is a zero-byte accidental file.
   - Delete only after user approval.

5. Improve game detail imagery
   - Detail pages currently use game logos and generated CSS demo posters.
   - If game banners/screenshots are provided, add them to each detail page.

6. News article pages
   - PDF includes News/Updates content and example requirements.
   - Current News section is still a static homepage section, not full article routing.

7. Certification/partnership section
   - PDF mentions GLI certification update, remove Scratch It logo, and add "Trusted by Multiple Operators Worldwide".
   - Not yet implemented.

8. Client inquiry chat feature
   - Mentioned in PDF.
   - Not implemented.

9. Production cleanup
   - Remove generated screenshots from repo root if not needed.
   - Minify/optimize large images if performance becomes a priority.

## Verification Commands

Useful checks:

```powershell
node --check .\script.js
node --check .\game-detail.js
Invoke-WebRequest -UseBasicParsing -Uri http://127.0.0.1:4173/ | Select-Object -ExpandProperty StatusCode
Invoke-WebRequest -UseBasicParsing -Uri http://127.0.0.1:4173/game-detail.html?game=pikapika | Select-Object -ExpandProperty StatusCode
```

Check homepage game links against `game-detail.js` data:

```powershell
@'
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const detail = fs.readFileSync('game-detail.js', 'utf8');
const links = [...html.matchAll(/href="game-detail\.html\?game=([a-z0-9-]+)"/g)].map((match) => match[1]);
const keys = [...detail.matchAll(/^  "([^"]+)": \{/gm)].map((match) => match[1]);
const uniqueLinks = [...new Set(links)];
const missingData = uniqueLinks.filter((slug) => !keys.includes(slug));
const missingLinks = keys.filter((slug) => !uniqueLinks.includes(slug));
console.log(JSON.stringify({ linkCount: links.length, uniqueLinks: uniqueLinks.length, dataKeys: keys.length, missingData, missingLinks }, null, 2));
if (missingData.length || missingLinks.length) process.exit(1);
'@ | node -
```

## Developer Notes

- Use `apply_patch` for manual edits.
- Do not use destructive git commands unless explicitly requested.
- This workspace may contain untracked generated files.
- The project is a static HTML/CSS/JS site; no build step is currently required.
- If viewing locally through `file://`, query-param detail routes should still work because `game-detail.html?game=...` is relative.
- The local HTTP server route is generally better for browser verification.
- The in-app browser may block direct `file://` navigation for automation; use `http://127.0.0.1:4173/` for automated checks.

## Current Known Links

Partnership CTAs:

```text
Contact Us: index.html#contact
Schedule Demo: https://calendar.app.google/fy8Lhbc4J5BswETo8
Become a Partner: https://gameengine.sg.larksuite.com/share/base/form/shrlgPGlr3hPkco6EyRMV9ejKHf
```

Main page anchors:

```text
#home
#innovation-games
#classic-games
#company
#news
#contact
```

## Important User Preferences From This Session

- Focus strongly on desktop quality, but keep responsive support.
- Preserve all provided artwork as-is.
- Do not crop hero character/artwork.
- Do not redesign the Game Engine logo.
- Keep the Games section background as one shared continuous animation.
- Game logos must be clickable and route to the corresponding detail page.
- Detail pages should follow the provided Innovation/Classic reference layouts and PDF content.
- Game detail backgrounds should remain page-wide, artwork-preserving, and secondary to the cards/content.
