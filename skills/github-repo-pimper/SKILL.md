---
name: github-repo-pimper
description: "Transform any GitHub repository into a professional, conversion-optimized showcase. Generates branded READMEs, animated SVG banners, social preview images, GitHub Actions, issue templates, and YouTube Shorts content foundations. Consistent Eluma design language across all repos by alphinus / Eluma Developments."
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
- **One-liner** — What does it do? (max 120 chars)
- **Category** — CLI Tool / Web App / Library / Framework / API / Bot
- **Primary language** — TypeScript, Python, Rust, Go, etc.
- **Key features** — 3-6 bullet points
- **Demo URL** (if deployed)
- **Is this an Eluma project?** — Uses Eluma color scheme (#4fd1c5 primary)

### Step 2: Generate Assets

Run in this order:

#### 2a. Banner SVGs (dark + light mode)
Customize the banner templates from `templates/banner-dark.svg` and `templates/banner-light.svg`:
- Replace `{{REPO_NAME}}` with repo name
- Replace `{{ONE_LINER}}` with tagline
- Replace `{{PRIMARY}}` with brand primary color (default: #4fd1c5)
- Replace `{{PRIMARY_DARK}}` with darker variant
- Place at `.github/assets/banner-dark.svg` and `.github/assets/banner-light.svg`

#### 2b. Social Preview Image
- Copy `templates/social-preview.html` to temporary location
- Replace placeholders with repo data
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

### Step 3: YouTube Shorts Prep
Generate `docs/shorts/` directory:
- `script.md` — 60-second script template covering the repo
- `scenes.json` — Remotion-compatible scene definitions
- `hooks.md` — 5 scroll-stopping opener lines

### Step 4: Final Polish
- Verify all links work
- Check dark/light mode banner rendering
- Validate badge URLs
- Run through launch-checklist.md

## Design System

All assets follow the Eluma design language:
- **Dark BG:** #0f172a
- **Surface:** #141e33
- **Primary:** #4fd1c5 (or brand-specific)
- **Text:** #f8fafc
- **Muted:** #718096
- **Font:** system-ui, -apple-system (body), SF Mono, Fira Code (code)
- **Border-Radius:** 12px (cards), 8px (badges)
- **Glass Effect:** rgba(255,255,255,0.02) bg + rgba(255,255,255,0.06) border

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
