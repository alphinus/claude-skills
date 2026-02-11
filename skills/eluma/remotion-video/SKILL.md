---
name: eluma:remotion-video
description: Create and render videos programmatically using Remotion. Works from ANY project or directory. Use when the user says "create a video", "render a video", "make a video", "Remotion video", "erstelle ein Video", "Video erstellen", or anything related to programmatic video creation.
---

# Remotion Video Creator 2.0

You create videos programmatically using the Remotion project located at:

**`/Users/developer/Remotion for Claude Code/`**

This skill works from ANY directory. All video work happens in the Remotion project above.

---

## Step 1: Template Routing — Match Prompt to Template

Analyze the user's prompt and select the best template. If no template fits, build a custom composition.

| User says... | Template | Composition ID |
|---|---|---|
| "Chart", "Bar-Chart", "Linien-Diagramm", "Pie-Chart", "Umsatzzahlen", "Statistik", "Daten visualisieren" | `ChartVideo` | `ChartVideo` |
| "3D Logo", "Logo Animation", "Logo Reveal", "Chrome-Effekt", "Metallic", "Logo drehen" | `LogoReveal3D` | `LogoReveal3D` |
| "Instagram Story", "Instagram Reel", "TikTok", "YouTube Short", "Slides", "Social Media Story" | `SocialStory` | `SocialStory` |
| "Screenshot", "Highlight", "Markieren", "Annotieren", "Hervorheben in Bild" | `ScreenshotHighlight` | `ScreenshotHighlight` |
| "Karte", "Map", "Route", "Reiseroute", "Strava", "GPX", "Weltkarte", "Pins" | `MapRoute` | `MapRoute` |
| "Ranking", "Top 10", "Top 5", "Liste", "Rangliste", "Bestenliste" | `DataRanking` | `DataRanking` |
| "Product Demo", "Feature-Video", "SaaS Demo", "App vorstellen", "Launch-Video" | `ProductDemo` | `ProductDemo` |
| "Brand Promo", "Firmen-Video", "Unternehmens-Video", "Brand Video", "Services vorstellen" | `BrandPromo` | `BrandPromo` |
| Nothing matches | **Custom Composition** | User-defined |

**Decision logic:**
1. Check for explicit template keywords first
2. If data/numbers are mentioned → `ChartVideo`
3. If logo/brand file is provided → `LogoReveal3D` or `BrandPromo`
4. If vertical format mentioned (Story/Reel/TikTok/Short) → `SocialStory`
5. If image/screenshot provided → `ScreenshotHighlight`
6. If locations/coordinates mentioned → `MapRoute`
7. If list/ranking mentioned → `DataRanking`
8. If product/features mentioned → `ProductDemo`
9. **Fallback**: Build a custom composition using the component library

---

## Step 2: Format Detection — Match Platform to Dimensions

Detect the target format from the user's prompt keywords:

| Keywords | Format | Dimensions | Orientation |
|---|---|---|---|
| "YouTube", "Landscape" (default) | `youtube` | 1920x1080 | Horizontal |
| "YouTube Short", "YT Short" | `youtubeShort` | 1080x1920 | Vertical |
| "Instagram Story" | `instagramStory` | 1080x1920 | Vertical |
| "Instagram Post", "Quadrat" | `instagramPost` | 1080x1080 | Square |
| "Instagram Reel" | `instagramReel` | 1080x1920 | Vertical |
| "TikTok" | `tiktok` | 1080x1920 | Vertical |
| "Twitter", "X" | `twitter` | 1920x1080 | Horizontal |
| "LinkedIn" | `linkedin` | 1920x1080 | Horizontal |
| "Thumbnail", "Vorschaubild" | `thumbnail` | 1280x720 | Still image |
| "Transparent", "After Effects", "ProRes" | `transparent` | 1920x1080 | ProRes 4444 |
| "GIF" | `gif` | 1920x1080 | Animated GIF |

**Default**: `youtube` (1920x1080, 30fps) if no format is mentioned.

When a vertical format is detected and using `SocialStory`, set the Composition dimensions to 1080x1920.

---

## Step 3: Input Pipeline — Handle Assets & Data

### 3a. Image/Logo Files
When the user provides an image or logo file (path like `~/logo.svg`, `~/screenshot.png`):
```bash
cp "/path/to/user/file" "/Users/developer/Remotion for Claude Code/public/"
```
Then reference it in code with `staticFile('filename.ext')`.

### 3b. Data Files (CSV/JSON)
When the user provides data files:
```bash
# Create data/ directory if needed
mkdir -p "/Users/developer/Remotion for Claude Code/data"
cp "/path/to/data.csv" "/Users/developer/Remotion for Claude Code/public/data/"
```
Use the data loaders in the component:
```tsx
import { loadCSV, loadJSON, loadGPX } from '../utils/data-loaders';
// In a calculateMetadata function or via staticFile
```

### 3c. GPX Files (Fitness/Travel)
```bash
cp "/path/to/activity.gpx" "/Users/developer/Remotion for Claude Code/public/"
```
Use `loadGPX('activity.gpx')` in the MapRoute template.

### 3d. Inline Data
When the user provides data directly in the prompt (e.g., "Jan 8k, Feb 12k, Mar 15k"):
- Parse the values and pass them as `defaultProps` to the Composition
- No file copying needed

### 3e. URL Handling
When the user mentions a website for a ProductDemo:
- Use the product name, features, and description from the URL context
- Do NOT actually scrape — extract info from user's description or prompt

---

## Step 4: Build the Video

### 4a. Read Context First
```
Read: /Users/developer/Remotion for Claude Code/CLAUDE.md
Read: /Users/developer/Remotion for Claude Code/src/Root.tsx
```

### 4b. Create or Modify the Component

**Using a Template (preferred):**
- Modify `defaultProps` in Root.tsx for the matching template Composition
- OR create a new Composition entry with the template and custom props

**Custom Composition:**
- Create a new `.tsx` file in `src/`
- Use components from the library:
  ```tsx
  // Text animations
  import { TypewriterText, WordByWord, GlitchText, CountUp, HighlightText } from './components/text-animations';
  // Charts
  import { AnimatedBarChart, AnimatedLineChart, AnimatedPieChart, RankingList, ComboChart } from './components/charts';
  // Overlays
  import { LowerThird, CallToAction, ProgressBar, Watermark } from './components/overlays';
  // Logo reveals
  import { LogoFadeScale, Logo3DExtrude, LogoParticles, LogoGlitch } from './components/logo-reveals';
  // Maps
  import { WorldMapComp, RouteAnimation, GPXRoute } from './components/maps';
  // Transitions
  import { GlitchTransition, ZoomTransition, WipeReveal, MorphTransition } from './components/transitions';
  // Utilities
  import { PALETTES, createPalette, linearGrad, radialGrad, withAlpha } from './utils/colors';
  import { SPRINGS, stagger, fadeIn, fadeOut, slideIn, scaleIn } from './utils/easings';
  import { FORMATS, getFormat, isVertical } from './utils/format-presets';
  import { FONTS, loadGoogleFont, loadFontPairing } from './utils/typography';
  import { centerContent, gridLayout, safeZone, safeZonePadding, usableArea } from './utils/layout';
  ```
- Register in Root.tsx

### 4c. Register Composition in Root.tsx
```tsx
<Composition
  id="UniqueId"
  component={MyComponent}
  durationInFrames={300}  // 10 sec at 30fps
  width={1920}
  height={1080}
  fps={30}
  defaultProps={{ /* ... */ }}
/>
```

---

## Step 5: Render the Video

### Render Commands by Format

| Format | Command |
|---|---|
| **MP4** (default) | `cd "/Users/developer/Remotion for Claude Code" && npx remotion render [CompId]` |
| **MP4 custom path** | `... && npx remotion render [CompId] --output=~/Desktop/video.mp4` |
| **ProRes 4444** (transparent) | `... && npx remotion render [CompId] --codec=prores --prores-profile=4444` |
| **GIF** | `... && npx remotion render [CompId] --image-format=png --every-nth-frame=2` |
| **PNG Still** | `... && npx remotion still [CompId]` |
| **PNG Still at frame** | `... && npx remotion still [CompId] --frame=60` |
| **Thumbnail** | `... && npx remotion still [CompId] --output=~/Desktop/thumb.png` |

### Auto Codec Selection
- Format is `transparent` or user says "After Effects" / "ProRes" → add `--codec=prores --prores-profile=4444`
- User says "GIF" → add `--image-format=png --every-nth-frame=2`
- Format is `thumbnail` → use `npx remotion still` instead of `render`
- Otherwise → default MP4 (H.264)

### Output Path Logic
- Default: `out/[CompositionId].mp4`
- If user specifies Desktop: `--output=~/Desktop/[name].mp4`
- If user specifies path: `--output=[path]`
- For ProRes: `.mov` extension
- For GIF: `.gif` extension
- For stills: `.png` extension

### Multi-Format Rendering
If user wants multiple formats (e.g., "YouTube + Instagram Story"):
1. Create separate Compositions with matching dimensions
2. Render each one sequentially:
```bash
cd "/Users/developer/Remotion for Claude Code" && npx remotion render CompYouTube && npx remotion render CompInstagram
```

### Three.js Compositions
For `LogoReveal3D` or any Three.js-based composition, add timeout flags:
```bash
npx remotion render LogoReveal3D --timeout=120000 --concurrency=1
```

---

## Template Quick Reference — Props

### ChartVideo
```tsx
defaultProps={{
  title: 'Q4 Revenue Growth',
  subtitle: 'Monthly performance overview',
  chartType: 'bar' as const,           // 'bar' | 'line' | 'pie'
  data: [
    { label: 'Oct', value: 45000 },
    { label: 'Nov', value: 52000 },
  ],
  insight: '+102% growth',             // Key insight text at end
  palette: 'dark' as const,            // 'dark' | 'light' | 'brand' | 'eluma'
  chartColors: ['#E94560', '#6366F1'], // Optional custom colors
  fontFamily: 'Inter',
}}
```

### LogoReveal3D
```tsx
defaultProps={{
  text: 'BRAND',                        // 3D extruded text
  logoSrc: 'logo.png',                  // Optional image in public/
  material: 'metallic' as const,        // 'metallic' | 'glass' | 'matte'
  color: '#6366F1',                     // 3D object color
  effects: ['glitch', 'glow'],          // Post-processing
  tagline: 'THE FUTURE IS NOW',
  palette: 'dark' as const,
}}
// IMPORTANT: Render with --timeout=120000 --concurrency=1
```

### SocialStory
```tsx
defaultProps={{
  slides: [
    { text: 'Did you know?', emoji: '🤔', subtext: 'Swipe for facts' },
    { text: '90% of startups fail', emoji: '📉' },
    { text: 'But the ones that succeed...', emoji: '🚀' },
    { text: 'Change the world.', emoji: '🌍', subtext: 'Be one of them.' },
  ],
  format: 'instagram' as const,        // 'instagram' | 'tiktok' | 'youtube-short'
  palette: 'dark' as const,
  textStyle: 'word-by-word' as const,   // 'word-by-word' | 'typewriter'
  showProgress: true,
  accentColor: '#E94560',
}}
// Composition: width=1080, height=1920 (vertical!)
```

### ScreenshotHighlight
```tsx
defaultProps={{
  imagePath: 'screenshot.png',          // Image in public/
  highlights: [
    { text: 'Important feature', annotation: 'This changes everything' },
    { text: 'Key metric', annotation: 'Up 200% this quarter' },
  ],
  zoomTarget: { x: 0.5, y: 0.3 },     // 0-1 relative coords
  zoomScale: 2.0,
  palette: 'dark' as const,
  highlightColor: '#FBBF24',
}}
```

### MapRoute
```tsx
defaultProps={{
  waypoints: [
    { lat: 47.37, lon: 8.54, label: 'Zurich' },
    { lat: 48.85, lon: 2.35, label: 'Paris' },
    { lat: 51.50, lon: -0.12, label: 'London' },
  ],
  style: 'travel' as const,            // 'travel' | 'delivery' | 'fitness'
  title: 'World Tour 2026',
  palette: 'dark' as const,
  routeColor: '#E94560',
  highlightCountries: ['CHE', 'FRA', 'GBR'],  // ISO 3166-1 alpha-3
}}
```

### DataRanking
```tsx
defaultProps={{
  title: 'Top 5 Programming Languages',
  subtitle: '2026 Developer Survey',
  items: [
    { label: 'Python', value: '68%', icon: '🐍' },
    { label: 'JavaScript', value: '62%', icon: '⚡' },
    { label: 'TypeScript', value: '48%', icon: '🔷' },
  ],
  style: 'vertical' as const,          // 'vertical' | 'horizontal'
  palette: 'dark' as const,
  accentColor: '#6366F1',
}}
```

### ProductDemo
```tsx
defaultProps={{
  productName: 'Acme App',
  tagline: 'The all-in-one platform for modern teams',
  features: [
    { title: 'Lightning Fast', description: 'Built for speed.', icon: '⚡' },
    { title: 'Team Collaboration', description: 'Real-time editing.', icon: '👥' },
    { title: 'AI-Powered', description: 'Smart suggestions.', icon: '🤖' },
  ],
  ctaText: 'Start free trial',
  ctaUrl: 'acme.app',
  logoSrc: 'logo.png',                 // Optional, in public/
  brandColor: '#6366F1',               // Auto-generates palette
  palette: 'dark' as const,
}}
```

### BrandPromo
```tsx
defaultProps={{
  brand: {
    name: 'Acme',
    primaryColor: '#6366F1',            // Generates full palette
    logoSrc: 'logo.png',               // Optional
    url: 'acme.com',
  },
  tagline: 'Building the future, one pixel at a time.',
  services: [
    { title: 'Web Development', description: 'Modern websites', icon: '🌐' },
    { title: 'Mobile Apps', description: 'Native experiences', icon: '📱' },
  ],
  trustSignals: [
    { label: '500+ Clients', sublabel: 'Worldwide', icon: '🌍' },
    { label: '99.9% Uptime', sublabel: 'Enterprise SLA', icon: '⚡' },
  ],
  ctaText: "Let's build something great.",
  palette: 'dark' as const,
}}
```

---

## Prompt Patterns — Examples the User Might Say

### Charts & Data
- "Erstelle ein Bar-Chart Video mit: Jan 8k, Feb 12k, Mar 15k, Apr 22k"
- "Visualisiere diese CSV als animiertes Linien-Diagramm: ~/data.csv"
- "Animated pie chart: React 40%, Vue 25%, Svelte 15%, Angular 20%"
- "Umsatz-Statistik Q4 als YouTube-Video mit dunklem Theme"

### 3D Logo
- "Animiere mein Logo in 3D mit Metallic-Effekt: ~/logo.svg"
- "Erstelle ein spinnendes 3D Logo mit Glitch fuer After Effects (transparent)"
- "3D Logo Reveal in Chrome mit Tagline 'Innovation First'"
- "Glass-Effekt Logo Animation fuer Instagram"

### Social Media Stories
- "Erstelle eine Instagram Story mit 5 Slides ueber Produktivitaetstipps"
- "Mach ein TikTok-Video mit Countdown und Text-Animation"
- "YouTube Short: 3 Fakten ueber KI in 15 Sekunden"
- "Instagram Reel mit Swipe-Slides fuer unser neues Feature"

### Maps & Routes
- "Zeige eine animierte Reiseroute: Zuerich -> Berlin -> London"
- "Visualisiere meinen Strava-Lauf als Instagram Story: ~/run.gpx"
- "Weltkarte mit unseren 5 Standorten animiert"
- "Delivery-Route von Lager zu 3 Kunden auf einer Karte"

### Product Demos
- "Erstelle eine Product-Demo fuer unsere App mit 3 Features"
- "Mach ein Launch-Video fuer mein SaaS: Name 'FlowSync', Features: Echtzeit-Sync, KI-Assistent, Team-Dashboards"
- "Product Demo von unserem Tool mit CTA 'Jetzt testen' am Ende"

### Screenshots & Highlights
- "Highlighte 'important text' in diesem Screenshot: ~/screenshot.png"
- "Zeig diesen Screenshot mit Zoom auf den Button oben rechts: ~/ui.png"
- "Annotiere 3 Bereiche in meinem App-Screenshot"

### Rankings
- "Ranking-Video: Top 5 Programming Languages 2026"
- "Erstelle eine animierte Bestenliste mit unseren Top-Kunden"
- "Top 10 Games aller Zeiten als TikTok-Video"

### Brand Promos
- "Brand-Promo fuer eluma.ch mit allen Services, 30 Sekunden, YouTube"
- "Firmen-Video fuer unsere Agentur: 4 Services, 3 Trust-Signals"
- "Erstelle ein Promo-Video: Firma 'TechCorp', Farbe #FF6B35, Services: Cloud, AI, Security"

---

## Error Handling & Fallbacks

### Pre-flight Checks
Before using any template, verify the project is ready:
```bash
cd "/Users/developer/Remotion for Claude Code" && node -e "require('remotion')" 2>&1
```
If this fails, run:
```bash
cd "/Users/developer/Remotion for Claude Code" && npm install
```

### Dependency Check for Specific Templates

| Template | Required Package | Check |
|---|---|---|
| `LogoReveal3D` | `@remotion/three`, `three` | `node -e "require('three')"` |
| `ChartVideo` | `d3` | `node -e "require('d3')"` |
| `MapRoute` | `react-simple-maps` | `node -e "require('react-simple-maps')"` |
| `ScreenshotHighlight` | (no extra deps) | Always available |
| `SocialStory` | (no extra deps) | Always available |
| `DataRanking` | (no extra deps) | Always available |
| `ProductDemo` | (no extra deps) | Always available |
| `BrandPromo` | (no extra deps) | Always available |

If a dependency is missing:
```bash
cd "/Users/developer/Remotion for Claude Code" && npm install [package-name]
```

### Render Failures
- **Timeout on Three.js**: Add `--timeout=120000 --concurrency=1`
- **Missing asset**: Check if file exists in `public/` before rendering
- **TypeScript error**: Fix the component, then retry render
- **Out of memory**: Reduce `--concurrency` or video duration

### Template Fallback
If NO template matches the user's request:
1. Build a custom composition using the component library
2. Combine components from `src/components/` (text-animations, charts, overlays, etc.)
3. Use utilities from `src/utils/` (colors, easings, format-presets, typography, layout)
4. Register in Root.tsx and render

---

## Available Utilities Reference

### Colors (`src/utils/colors.ts`)
- `PALETTES.dark` / `.light` / `.brand` / `.eluma` — predefined color sets
- `createPalette('#hex')` — auto-generate palette from primary color
- `linearGrad(angle, ...stops)` — CSS gradient string
- `radialGrad(shape, ...stops)` — CSS radial gradient
- `withAlpha('#hex', 0.5)` — add alpha channel

### Easings (`src/utils/easings.ts`)
- `SPRINGS.gentle` / `.bouncy` / `.snappy` / `.heavy` / `.button`
- `stagger(count, delay)` — array of frame offsets
- `fadeIn(frame, start, duration)` / `fadeOut(...)` — opacity helpers
- `slideIn(frame, fps, delay, distance, springName)` — Y-axis slide
- `scaleIn(frame, fps, delay, springName)` — scale animation

### Format Presets (`src/utils/format-presets.ts`)
- `FORMATS.youtube` / `.youtubeShort` / `.instagramStory` / `.tiktok` / etc.
- `getFormat(name)` — returns `{ width, height, fps }`
- `isVertical(name)` — boolean
- `getAspectRatio(name)` — string like "16:9"

### Typography (`src/utils/typography.ts`)
- `FONTS.modern` / `.editorial` / `.tech` / `.elegant` / `.bold`
- `loadGoogleFont('Inter')` — loads font, returns fontFamily string
- `loadFontPairing('tech')` — loads display + body fonts

### Layout (`src/utils/layout.ts`)
- `centerContent(direction)` — flexbox centering CSS
- `gridLayout(cols, rows, gap)` — CSS grid properties
- `safeZone(format)` — platform-safe padding values
- `safeZonePadding(format)` — CSS padding properties
- `usableArea(format)` — content area after safe zones

### Data Loaders (`src/utils/data-loaders.ts`)
- `loadCSV(path)` — CSV to array of objects
- `loadJSON(path)` — JSON file loader
- `loadGPX(path)` — GPX to coordinates + metrics
- `loadSVG(path)` — SVG as string for Three.js

---

## Critical Remotion Rules (ALWAYS follow)

- **NEVER** use `Math.random()` — use `random('seed')` from `remotion`
- **ALWAYS** add `extrapolateLeft: 'clamp'` and `extrapolateRight: 'clamp'` to `interpolate()`
- All code must be **deterministic** React + TypeScript
- Default: **1920x1080, 30fps** unless format says otherwise
- Assets from `public/` must use `staticFile('filename')`
- `useCurrentFrame()` inside a `<Sequence>` resets to 0
- Always `cd "/Users/developer/Remotion for Claude Code"` before CLI commands

## After Rendering

Always tell the user:
1. The exact file path of the rendered video
2. The format/dimensions/duration
3. How to open it (e.g., "open /Users/developer/Remotion\ for\ Claude\ Code/out/ChartVideo.mp4")
