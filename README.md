# Claude Skills Repository

Personal backup and build system for Claude Code skills.

## Structure

```
claude-skills/
├── app/                     # Brand Machine Web-App (Vite + React + Express)
│   ├── server/              # Express API (brands CRUD, build, collection, images)
│   └── src/                 # React Frontend (Eluma-design UI)
├── collection-templates/    # 110 templatized HTML pages (brand-agnostic)
├── scripts/                 # Utility scripts
│   ├── templatize-collection.sh  # Eluma HTML → Templates (one-time)
│   └── generate-collection.sh   # Templates → Brand Collection (CLI)
├── core/                    # Brand-agnostic design system templates
│   ├── SKILL.md.template    # SKILL.md with {{PLACEHOLDERS}}
│   └── references/          # Component, animation, layout patterns
│       ├── components.md
│       ├── animations.md
│       └── layouts.md
├── brands/                  # Brand-specific configurations
│   └── eluma/
│       ├── tokens.json      # Colors, name, domain, tagline
│       ├── brand.md         # Brand documentation
│       ├── logos/            # SVG logos
│       └── collection/      # Generated 110 HTML pages (brand-colored)
├── skills/                  # Built skills (generated, ready to deploy)
│   ├── eluma-brand-system/  # Generated from core + brands/eluma
│   └── brand-machine/       # AI image generation skill
├── plugins/                 # Plugin documentation (reference only)
│   └── REGISTRY.md
├── build.sh                 # core + brand → skill
├── sync.sh                  # skill → ~/.claude/skills/
└── README.md
```

## Brand Machine (Web-App)

A web UI for creating and managing brands with live preview, color picker, and automatic skill generation.

### Quick Start

```bash
cd app
npm install
npm run dev          # Starts Express API + Vite frontend
```

Opens at **http://localhost:5173** with API on port 3001.

### Features

- **Brand CRUD** — Create, edit, delete brands via web UI
- **Color Picker** — Canvas-based HSL color wheel with hex/RGB sync
- **Live Preview** — Real-time preview of brand colors (sidebar, cards, buttons, badges)
- **Smart Defaults** — Dark-first/light-first auto-populates BG, surface, text colors
- **Build + Deploy** — One-click build.sh + sync.sh execution
- **Collection Generator** — 110 HTML design pages per brand from templates
- **Collection Gallery** — Browse generated pages with iframe thumbnails
- **AI Logo Generation** — Generate logos via inference.sh (FLUX models)
- **Preset Palettes** — Quick-start with curated brand color schemes
- **Brand Comparison** — Side-by-side preview of two brands
- **Brand Duplication** — Clone existing brands as starting point

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/brands` | List all brands |
| GET | `/api/brands/:slug` | Get single brand |
| POST | `/api/brands` | Create brand |
| PUT | `/api/brands/:slug` | Update brand |
| DELETE | `/api/brands/:slug` | Delete brand |
| POST | `/api/brands/:slug/duplicate` | Duplicate brand |
| POST | `/api/build/:slug` | Run build.sh |
| POST | `/api/build/:slug/sync` | Run sync.sh |
| POST | `/api/collection/:slug/generate` | Generate collection |
| GET | `/api/collection/:slug` | List collection files |
| POST | `/api/images/:slug/generate` | Generate AI logos |
| GET | `/api/images/:slug` | List brand images |

## CLI Usage

### Build a brand skill
```bash
./build.sh eluma
```

### Deploy to Claude Code
```bash
./sync.sh                    # Deploy all built skills
./sync.sh eluma-brand-system # Deploy one skill
```

### Create a new brand (manual)
1. Create `brands/<name>/tokens.json` (copy from eluma, change colors)
2. Add logos to `brands/<name>/logos/`
3. Run `./build.sh <name>`
4. Run `./sync.sh`

### Generate collection (CLI)
```bash
./scripts/templatize-collection.sh    # One-time: Eluma → Templates
./scripts/generate-collection.sh test # Generate for brand "test"
```

## tokens.json Format

```json
{
  "brand": {
    "name": "Brand Name",
    "slug": "brand-design-system",
    "domain": "example.com",
    "tagline": "YOUR TAGLINE",
    "description": "Skill description for Claude Code...",
    "triggers": ["brand name", "brand style"]
  },
  "colors": {
    "PRIMARY": "#hex",
    "PRIMARY_DARK": "#hex (auto-calculated if omitted)",
    "PRIMARY_RGB": "r,g,b (auto-calculated if omitted)",
    "BG": "#hex",
    "SURFACE": "#hex",
    "SIDEBAR_BG": "#hex",
    "TEXT": "#hex",
    "MUTED": "#hex",
    "SUCCESS": "#10b981",
    "WARNING": "#f59e0b",
    "ERROR": "#ef4444",
    "INFO": "#3b82f6"
  },
  "theme": {
    "style": "dark-first",
    "glassmorphism": true,
    "motif": "hexagonal"
  }
}
```

## Tech Stack

- **Frontend:** Vite 6 + React 19 + TypeScript + react-router-dom v7
- **Backend:** Express 5 + TypeScript (tsx)
- **Styling:** Custom CSS with Eluma Design Tokens
- **Color Picker:** Canvas-based HSL wheel (no library)
- **Image Gen:** infsh CLI (FLUX/Gemini models)
- **No Database:** Filesystem is the datastore (brands/ directory = git-tracked)
