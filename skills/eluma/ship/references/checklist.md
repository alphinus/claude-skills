# Ship Checklist

## 1. Brand Audit

Verify Eluma design tokens in the project's CSS entry point (usually `index.css` or `globals.css`):

| Token | Expected Value |
|-------|---------------|
| `--color-cc-primary` or equivalent | `#4fd1c5` |
| `--color-cc-primary-hover` | `#38b2ac` |
| Dark mode bg | `#0f172a` |
| Dark mode card | `rgba(20,30,51,*)` or `#141e33` |
| Dark mode sidebar | `#0b1120` |
| Success | `#10b981` |
| Error | `#ef4444` |
| Warning | `#f59e0b` |

Also check for:
- `.eluma-glass` or `backdrop-filter: blur` utility
- `.eluma-gradient-text` utility
- Gradient primary buttons (`from-[#4fd1c5] to-[#38b2ac]`)
- No residual old brand colors (`#ae5630`, `#2b2a27`, `#c4643a`)

## 2. Build Verification

Run the project's build command and confirm zero errors:
- `bun run build` or `npm run build`
- Check output for warnings (acceptable) vs errors (blocker)

## 3. GitHub Pimper Checklist

All files must exist and contain correct branding:

### Required Files
- [ ] `.github/assets/banner-dark.svg` — contains repo name
- [ ] `.github/assets/banner-light.svg` — contains repo name
- [ ] `.github/assets/social-preview.html` — customized for repo
- [ ] `.github/ISSUE_TEMPLATE/bug-report.yml`
- [ ] `.github/ISSUE_TEMPLATE/feature-request.yml`
- [ ] `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] `CONTRIBUTING.md`
- [ ] `CODE_OF_CONDUCT.md`
- [ ] `LICENSE`
- [ ] `docs/shorts/script.md`
- [ ] `docs/shorts/scenes.json`

### README.md Checks
- [ ] Dark/light banner `<picture>` block at top
- [ ] Badges (version, license, language/platform)
- [ ] Features section
- [ ] Quick Start with install command
- [ ] Tech Stack table
- [ ] Cross-repo footer linking alphinus repos

### Screenshot Embedding (web apps — REQUIRED)
- [ ] `.github/assets/screenshot-1.png` (light mode, 1280x720)
- [ ] `.github/assets/screenshot-2.png` (dark mode, 1280x720)
- [ ] README.md contains `## Screenshots` section with `<picture>` blocks referencing above files
- [ ] Screenshots are captured BEFORE commit, embedded in README BEFORE commit

### Optional (enhance if missing)
- [ ] `.github/assets/social-preview.png` (generated from HTML)
- [ ] `.github/workflows/changelog.yml` (auto-release notes)

## 4. Git Verification

Before committing:
- No secrets staged (`.env`, credentials, API keys)
- No large binaries (>1MB) staged accidentally
- `.gitignore` covers: `node_modules/`, `dist/`, `.env`, `.env.*`, `*.pyc`, `__pycache__/`, `.DS_Store`

## 5. Post-Push Verification

After push completes:
- Open repo in browser for visual confirmation
- Verify banner renders correctly in README
- Check that badges resolve (may take a moment)
