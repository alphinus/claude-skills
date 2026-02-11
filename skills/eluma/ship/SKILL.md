---
name: "eluma:ship"
description: "Ship an Eluma project to GitHub with full quality assurance. Chains brand audit, production build, GitHub Pimper verification, screenshot capture, commit, push, and browser verification into a single gated pipeline. Use when the user says 'ship', 'deploy', 'push', 'commit and push', 'alles committen und pushen', 'veröffentlichen', or any variation of shipping/deploying an Eluma-branded project. Also use PROACTIVELY after completing significant work on any Eluma project when the user asks to commit/push."
---

# Eluma Ship Pipeline

Sequential, gated pipeline. Each step must pass before the next runs. On failure, stop and report.

## Pipeline

### Step 1: Brand Audit

Read the project's CSS entry point (`index.css`, `globals.css`, or equivalent). Verify:
- Primary color is `#4fd1c5` (not `#ae5630` or other non-Eluma colors)
- Dark mode bg is `#0f172a`
- Glassmorphism utilities exist (`.eluma-glass`, `.eluma-gradient-text`)
- No residual pre-Eluma brand colors

If `eluma:brand-system` was never applied, warn user and offer to apply it first.

Full token table: `references/checklist.md` Section 1.

### Step 2: Production Build

Run project build (`bun run build` or `npm run build`).

- **Pass**: Zero errors, output files generated
- **Fail**: Fix errors, do NOT proceed with broken build

### Step 3: GitHub Pimper Verification

Verify all GitHub Pimper assets exist. Check `references/checklist.md` Section 3 for the full list.

Required:
- `.github/assets/banner-dark.svg` + `banner-light.svg` (contain repo name)
- `.github/ISSUE_TEMPLATE/bug-report.yml` + `feature-request.yml`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE`
- `README.md` with banner `<picture>` block, badges, features, quick start, cross-repo footer

If files are missing, invoke `eluma:github-pimper` skill to generate them before continuing.

### Step 4: Screenshots (web apps only)

If project has a web UI:
1. Check if server responds (`curl -s -o /dev/null -w "%{http_code}" http://localhost:<port>`)
2. Start server if needed
3. Capture screenshots using Playwright, Puppeteer, or `browser-use` skill:
   - `screenshot-1.png` — light mode (1280x720)
   - `screenshot-2.png` — dark mode (1280x720, `--color-scheme=dark`)
4. Save to `.github/assets/screenshot-{n}.png`
5. **CRITICAL — Embed in README.md**: Verify README contains a `## Screenshots` section with `<picture>` blocks referencing the captured files. If missing, add it after the Features section:
   ```markdown
   ## Screenshots
   <div align="center">
   <picture>
     <source media="(prefers-color-scheme: dark)" srcset=".github/assets/screenshot-2.png">
     <source media="(prefers-color-scheme: light)" srcset=".github/assets/screenshot-1.png">
     <img alt="{repo-name} UI" src=".github/assets/screenshot-1.png" width="90%">
   </picture>
   </div>
   ```

Screenshots must be both captured AND embedded before proceeding to commit.
If no screenshot tools available, warn and continue (optional step).

### Step 5: Commit

1. `git status` — review all changes
2. `git diff --stat` — review scope
3. Refuse to commit `.env`, credentials, or API keys
4. Stage files explicitly (not `git add -A`)
5. Write descriptive commit message following repo convention
6. Append `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`

### Step 6: Push

1. `git push origin <branch>`
2. On auth failure (e.g., workflow scope), remove blocking file from tracking and retry
3. Report commit hash on success

### Step 7: Verify

1. Open repo in browser (`gh browse` or `open https://github.com/...`)
2. Print ship report

## Failure Handling

| Step | On Failure |
|------|-----------|
| Brand Audit | Offer to run `eluma:brand-system` |
| Build | Fix errors, rebuild |
| GitHub Pimper | Run `eluma:github-pimper` to fill gaps |
| Screenshots | Warn, continue |
| Commit | Resolve issues |
| Push | Handle auth, retry |
| Verify | Report for manual check |

## Ship Report

Print after completion:

```
Ship Report — {repo-name}
─────────────────────────────
 1. Brand Audit      ✓ pass
 2. Build            ✓ pass (Xs)
 3. GitHub Pimper    ✓ 12/12 files
 4. Screenshots      ⚠ skipped
 5. Commit           ✓ abc1234
 6. Push             ✓ origin/main
 7. Verify           ✓ opened
─────────────────────────────
```
