<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset=".github/assets/banner-light.svg">
  <img alt="claude-skills" src=".github/assets/banner-dark.svg" width="100%">
</picture>

<br />
<br />

[![Build](https://img.shields.io/github/actions/workflow/status/alphinus/claude-skills/ci.yml?style=flat-square&color=4fd1c5&label=build)](https://github.com/alphinus/claude-skills/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![License](https://img.shields.io/github/license/alphinus/claude-skills?style=flat-square&color=38b2ac)](LICENSE)
[![Stars](https://img.shields.io/github/stars/alphinus/claude-skills?style=flat-square&color=4fd1c5)](https://github.com/alphinus/claude-skills/stargazers)

**Multi-brand skill ecosystem for Claude Code — namespaced registry, build pipeline, and Brand Machine web app.**

[Live Demo](https://claude-skills-beta.vercel.app) · [Quick Start](#quick-start) · [Skill Registry](#skill-registry) · [Features](#features) · [API Reference](#api-reference) · [Contributing](CONTRIBUTING.md)

</div>

---

## What is claude-skills?

A **multi-brand skill ecosystem** and **Brand Machine** web app for [Claude Code](https://docs.anthropic.com/en/docs/claude-code). Manages skills across brand namespaces (`eluma:`, `core:`, etc.) with a central registry, automated build pipeline, and a web UI for creating brand design systems.

> **How it works:** `skills/<brand>/<slug>/` → `registry.json` → `sync.sh` → `~/.claude/skills/<brand>:<slug>/` → Claude Code discovers it.

<div align="center">
  <br />
  <table>
    <tr>
      <td align="center"><strong>Dashboard</strong></td>
      <td align="center"><strong>Color Picker</strong></td>
    </tr>
    <tr>
      <td><img src=".github/assets/screenshot-dashboard.png" alt="Dashboard" width="400" /></td>
      <td><img src=".github/assets/screenshot-color-picker.png" alt="Color Picker" width="400" /></td>
    </tr>
    <tr>
      <td align="center"><strong>Live Preview</strong></td>
      <td align="center"><strong>Collection Gallery</strong></td>
    </tr>
    <tr>
      <td><img src=".github/assets/screenshot-preview.png" alt="Live Preview" width="400" /></td>
      <td><img src=".github/assets/screenshot-collection.png" alt="Collection" width="400" /></td>
    </tr>
  </table>
  <br />
</div>

## Skill Registry

All managed skills live in `skills/<brand>/<slug>/` and are tracked in `registry.json`:

| Skill | Type | Description |
|-------|------|-------------|
| `eluma:brand-system` | built | Complete Eluma design system (dark/light themes, 124 UI patterns) |
| `eluma:github-pimper` | authored | GitHub repo showcase generator (banners, READMEs, Actions) |
| `eluma:brand-machine` | authored | AI logo and brand asset generation via inference.sh |
| `eluma:naming` | authored | Naming consistency enforcement across repos and packages |
| `core:skill-forge` | authored | Meta-skill for scaffolding new skills with correct namespace |

### Naming Conventions

| Context | Format | Example |
|---------|--------|---------|
| Repo directory | `skills/<brand>/<slug>/` | `skills/eluma/github-pimper/` |
| SKILL.md name | `<brand>:<slug>` | `eluma:github-pimper` |
| Deploy directory | `~/.claude/skills/<brand>:<slug>/` | `~/.claude/skills/eluma:github-pimper/` |

Brand names: `^[a-z][a-z0-9]*$` — Slugs: `kebab-case` — `core` is reserved for brand-agnostic utilities.

## Features

### Skill Ecosystem
- **Namespaced Skills** — `<brand>:<slug>` convention for prefix-based discovery (`eluma:` shows all Eluma skills)
- **Central Registry** — `registry.json` with all skills, brands, types, and tags — one read = full overview
- **Skill Forge** — `core:skill-forge` meta-skill scaffolds new skills with correct structure and registry integration
- **Flexible Sync** — `./sync.sh` (all), `./sync.sh eluma` (brand), `./sync.sh eluma:github-pimper` (single)

### Brand Machine Web App
- **Canvas-Based Color Picker** — HSL color wheel with bidirectional hex/RGB sync, smart auto-calculation of dark variants and RGB values
- **Live Preview** — Real-time preview panel showing sidebar, cards, buttons, and badges in your brand colors as you edit
- **110-Page Design Collection** — Templatized from Eluma's design system: animations, app screens, branding, social media, print materials, and 15 more categories
- **AI Logo Generation** — Generate logo-light, logo-dark, and icon variants using FLUX models via [inference.sh](https://inference.sh)
- **One-Click Build + Deploy** — Execute `build.sh` and `sync.sh` from the UI to generate and deploy skills to `~/.claude/skills/`
- **Brand Comparison** — Side-by-side preview of two brands with color token diff table
- **Preset Palettes** — 10 curated color schemes as starting points
- **Brand Duplication** — Clone any brand as a starting point for variants
- **PNG Export** — Export collection pages as screenshots via Puppeteer
- **Vercel Deployment** — Read-only API on Vercel, full CRUD locally

## Quick Start

```bash
git clone https://github.com/alphinus/claude-skills.git
cd claude-skills/app && npm install
npm run dev
```

Opens at **http://localhost:5173** — API on port 3001.

### Create your first brand

1. Click **"New Brand"** in the sidebar
2. Enter name, domain, tagline
3. Pick colors with the color wheel or choose a preset palette
4. Watch the live preview update in real-time
5. Click **"Create Brand"** → `brands/<slug>/tokens.json` is written
6. Click **"Build + Deploy"** → Skill is generated and synced to Claude Code

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 · Vite 6 · TypeScript · react-router-dom v7 |
| Backend | Express 5 · TypeScript (tsx) |
| Styling | Custom CSS with design tokens (no Tailwind) |
| Color Picker | Canvas-based HSL wheel (zero dependencies) |
| Image Gen | [inference.sh](https://inference.sh) CLI (FLUX models) |
| Deploy | Vercel (frontend + read-only API) |
| Storage | Filesystem (git-tracked `brands/` directory) |

## Architecture

```
claude-skills/
├── skills/                       # ALL managed skills
│   ├── eluma/                    # Brand namespace
│   │   ├── brand-system/         # eluma:brand-system (built)
│   │   ├── github-pimper/        # eluma:github-pimper
│   │   ├── brand-machine/        # eluma:brand-machine
│   │   └── naming/               # eluma:naming
│   └── core/                     # Brand-agnostic skills
│       └── skill-forge/          # core:skill-forge
├── registry.json                 # Central skill registry (auto-generated)
├── app/                          # Brand Machine web app
│   ├── server/                   # Express API (brands CRUD, build, collection, images)
│   └── src/                      # React frontend (color picker, preview, dashboard)
├── core/                         # Brand-agnostic skill templates
│   ├── SKILL.md.template         # Skill manifest with {{PLACEHOLDERS}}
│   └── references/               # Components, animations, layouts (124 patterns)
├── brands/                       # Brand configurations (the datastore)
│   └── eluma/                    # Brand with tokens.json + collection
├── collection-templates/         # 110 templatized HTML pages
├── scripts/                      # CLI utilities
│   └── update-registry.sh        # Regenerates registry.json from filesystem
├── build.sh                      # core + brand → skills/<brand>/brand-system/
└── sync.sh                       # skills/<brand>/<slug>/ → ~/.claude/skills/<brand>:<slug>/
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/brands` | List all brands |
| `GET` | `/api/brands/:slug` | Get single brand |
| `POST` | `/api/brands` | Create brand |
| `PUT` | `/api/brands/:slug` | Update brand |
| `DELETE` | `/api/brands/:slug` | Delete brand |
| `POST` | `/api/brands/:slug/duplicate` | Duplicate brand |
| `POST` | `/api/build/:slug` | Run build.sh |
| `POST` | `/api/build/:slug/sync` | Run sync.sh |
| `POST` | `/api/collection/:slug/generate` | Generate 110-page collection |
| `GET` | `/api/collection/:slug` | List collection files |
| `POST` | `/api/collection/:slug/export` | Export collection as PNG |
| `POST` | `/api/images/:slug/generate` | Generate AI logos |
| `GET` | `/api/images/:slug` | List brand images |

## `tokens.json` Schema

```json
{
  "brand": {
    "name": "Your Brand",
    "slug": "yourbrand:brand-system",
    "domain": "yourbrand.com",
    "tagline": "YOUR TAGLINE",
    "description": "Claude Code skill description...",
    "triggers": ["your brand", "your style"]
  },
  "colors": {
    "PRIMARY": "#hex",
    "PRIMARY_DARK": "#hex (auto-calculated)",
    "PRIMARY_RGB": "r,g,b (auto-calculated)",
    "BG": "#0f172a",
    "SURFACE": "#141e33",
    "TEXT": "#f8fafc",
    "MUTED": "#718096"
  },
  "theme": {
    "style": "dark-first",
    "glassmorphism": true,
    "motif": "hexagonal"
  }
}
```

## CLI Usage

```bash
# Build a brand's design system skill
./build.sh eluma                    # → skills/eluma/brand-system/

# Sync all skills to Claude Code
./sync.sh                           # → ~/.claude/skills/<brand>:<slug>/

# Sync a single brand's skills
./sync.sh eluma                     # → all eluma:* skills

# Sync a single skill
./sync.sh eluma:github-pimper       # → just this one

# Regenerate the central registry
./scripts/update-registry.sh        # → registry.json

# Generate collection from templates (CLI)
./scripts/generate-collection.sh your-brand

# Export collection as PNG
node scripts/export-png.js your-brand
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
git clone https://github.com/alphinus/claude-skills.git
cd claude-skills/app && npm install
npm run dev
```

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built by [alphinus](https://github.com/alphinus) · [Eluma Developments](https://eluma.ch)**

<sub>

[claude-skills](https://github.com/alphinus/claude-skills)

</sub>

</div>
