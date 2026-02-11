---
name: github-repo-pimper
description: "Transform any GitHub repository into a professional, conversion-optimized showcase. Generates branded READMEs, animated SVG banners (dense hex grid, circuit animations, floating particles), social preview images, GitHub Actions, issue templates, and YouTube Shorts content foundations. Consistent Eluma design language with terminal-style monospace typography across all repos by alphinus / Eluma Developments."
triggers:
  - "pimp repo"
  - "setup github"
  - "new repo setup"
  - "github repo pimper"
  - "pimp readme"
  - "repo showcase"
  - "professional readme"
  - "readme template"
  - "github branding"
---

# GitHub Repo Pimper

Transform any repository into a star-worthy, professional showcase with consistent Eluma branding.

## Quick Start

When triggered, follow this workflow:

### Step 1: Gather Repo Context
Ask or detect:
- **Repo name** (e.g., `claude-skills`)
- **One-liner** — What does it do? (max 80 chars, fits banner subtitle)
- **4 feature tags** — Short labels for banner pills (max 12 chars each, e.g., "Color Picker", "110 Pages", "AI Logos", "Live Preview")
- **Category** — CLI Tool / Web App / Library / Framework / API / Bot
- **Primary language** — TypeScript, Python, Rust, Go, etc.
- **Key features** — 3-6 bullet points for README
- **Demo URL** (if deployed)
- **Brand colors** — PRIMARY (default: #4fd1c5), PRIMARY_DARK (default: #38b2ac)

### Step 2: Generate Assets

Run in this order:

#### 2a. Banner SVGs (dark + light mode)
Customize the banner templates from `templates/banner-dark.svg` and `templates/banner-light.svg`:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{REPO_NAME}}` | Repository name | `claude-skills` |
| `{{ONE_LINER}}` | Tagline (max 80 chars) | `Brand Machine — Claude Code Skill Builder` |
| `{{PRIMARY}}` | Brand primary color | `#4fd1c5` |
| `{{PRIMARY_DARK}}` | Darker variant | `#38b2ac` |
| `{{TAG_1}}` | Feature pill 1 | `Color Picker` |
| `{{TAG_2}}` | Feature pill 2 | `110 Pages` |
| `{{TAG_3}}` | Feature pill 3 | `AI Logos` |
| `{{TAG_4}}` | Feature pill 4 | `Live Preview` |

Place at `.github/assets/banner-dark.svg` and `.github/assets/banner-light.svg`.

**Banner design features (do NOT modify structure):**
- Dense 7-row hexagonal grid (right half, ~65 hexagons)
- 3 pulsating radial glow fields + 3 ambient orbs with drift
- Circuit-like dashed connection lines between nodes
- 5 animated pulsing node dots at intersections
- 10 floating particles with drift animations
- Scanning line effect
- Gradient title text with glow filter (monospace font)
- 4 feature tag pills
- Left vertical accent line + top/bottom accent bars
- ALPHINUS / Eluma Developments branding

#### 2b. Social Preview Image
- Copy `templates/social-preview.html` to temporary location
- Replace placeholders: `{{REPO_NAME}}`, `{{ONE_LINER}}`, `{{PRIMARY}}`, `{{PRIMARY_DARK}}`, `{{TAG_1-4}}`, `{{BADGES_HTML}}`
- Generate PNG via: `node scripts/generate-social-preview.js <repo-path>`
- Output: `.github/assets/social-preview.png` (1280x640)
- Upload to GitHub repo settings as social preview

#### 2c. README.md
Use `templates/README.md.template` as base. Replace all `{{PLACEHOLDERS}}`:

| Placeholder | Source |
|-------------|--------|
| `{{REPO_NAME}}` | Repository name |
| `{{ONE_LINER}}` | Short description |
| `{{DESCRIPTION}}` | Detailed description (2-3 sentences) |
| `{{QUICK_START}}` | Installation + first command |
| `{{FEATURES}}` | Feature list with icons |
| `{{TECH_STACK}}` | Languages/frameworks badges |
| `{{API_TABLE}}` | API endpoints (if applicable) |
| `{{ARCHITECTURE}}` | Architecture description or diagram |
| `{{SCREENSHOTS}}` | Screenshot section |
| `{{LICENSE}}` | License type |
| `{{GITHUB_USER}}` | GitHub username (alphinus) |
| `{{PRIMARY}}` | Brand primary color |
| `{{YEAR}}` | Current year |

#### 2d. GitHub Config Files
Copy from templates:
- `.github/ISSUE_TEMPLATE/bug-report.yml`
- `.github/ISSUE_TEMPLATE/feature-request.yml`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`

#### 2e. GitHub Actions
Copy relevant action workflows from `actions/`:
- `auto-changelog.yml` → `.github/workflows/changelog.yml`
- `auto-screenshot.yml` → `.github/workflows/screenshots.yml` (if web app)

### Step 3: Take Screenshots
If the repo has a web UI:
- Use Playwright/Puppeteer to capture 3-4 screenshots at 1280x720
- Wait 3 seconds for data to load before capture
- Save to `.github/assets/screenshot-*.png`

### Step 4: YouTube Shorts Prep
Generate `docs/shorts/` directory:
- `script.md` — 60-second script template covering the repo
- `scenes.json` — Remotion-compatible scene definitions
- `hooks.md` — 5 scroll-stopping opener lines

### Step 5: Final Polish
- Verify all links work
- Check dark/light mode banner rendering in browser
- Validate badge URLs
- Run through launch-checklist.md

## Design System

All assets follow the Eluma design language:

### Colors
- **Dark BG:** `#060d1f` → `#0b1120` → `#111b33` (3-stop gradient)
- **Light BG:** `#f8fafc` → `#f1f5f9` → `#e8edf5` (3-stop gradient)
- **Primary:** `#4fd1c5` (or brand-specific)
- **Primary Dark:** `#38b2ac` (or brand-specific)
- **Text Dark:** `#f8fafc` | **Text Light:** `#0f172a`
- **Muted Dark:** `#94a3b8` / `#475569` | **Muted Light:** `#64748b` / `#94a3b8`

### Typography
**All text is monospace** for terminal/techy aesthetic:
```
font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', 'Source Code Pro', Consolas, monospace;
```
- **Title:** 48px, weight 800, gradient fill + glow filter
- **Subtitle:** 14px, weight 400
- **Tags:** 10px, weight 600
- **Branding:** 10px, letter-spacing 0.12em

### Visual Elements
- **Hex Grid:** 7 rows, ~65 hexagons, right half of banner
- **Glass Effect:** `rgba(255,255,255,0.02)` bg + `rgba(255,255,255,0.06)` border
- **Animations:** pulse (glow), drift (orbs/particles), scanline, nodePulse, lineGrow
- **Border-Radius:** 12px (cards), 11px (tag pills), 8px (badges)

## Badge Strategy (in order)
1. Build Status (CI green = trust)
2. Version/Release (actively maintained)
3. License (legal clarity)
4. TypeScript/Language (tech signal)
5. Stars (social proof, only if > 10)

## Cross-Repo Linking
Every README footer links to other alphinus repos. Update `references/repo-registry.md` when adding new repos.

## References
- `references/readme-patterns.md` — README best practices with examples
- `references/badge-catalog.md` — All available badges with URLs
- `references/shorts-playbook.md` — YouTube Shorts strategy
- `references/launch-checklist.md` — HackerNews/ProductHunt launch guide
- `references/repo-registry.md` — Registry of all alphinus repos for cross-linking
