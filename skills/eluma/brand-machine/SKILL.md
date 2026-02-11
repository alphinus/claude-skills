---
name: eluma:brand-machine
description: "Generate brand images, logos, and visual assets using AI. Create logo variants (light/dark/icon), social media headers, and branded visuals via inference.sh CLI."
triggers:
  - "generate brand images"
  - "create logo"
  - "brand assets"
  - "brand machine"
  - "generate logo"
  - "brand visuals"
---

# Brand Machine — AI Image Generation

Generate professional brand assets using AI image generation models.

## Workflow

### 1. Generate Logo Variants
Run the logo generation script:
```bash
~/claude-skills/skills/brand-machine/scripts/generate-logo.sh <brand-slug> <type>
```

**Types available:**
- `logo-light` — Logo on white/light background
- `logo-dark` — Logo on dark background
- `icon` — App icon / favicon format

### 2. Custom Generation
For custom assets, use the inference.sh CLI directly:
```bash
infsh app run falai/flux-dev-lora --prompt "<prompt>" --output "<output-path>"
```

### 3. Asset Types
See `references/prompt-templates.md` for curated prompts covering:
- Logos (light/dark/icon)
- Social media headers
- App store screenshots
- OG images / favicons

## Brand Token Integration
The script reads brand tokens from `~/claude-skills/brands/<slug>/tokens.json` to incorporate:
- Brand name
- Primary color
- Design motif/style
- Brand domain

## Output Location
Generated images are saved to `~/claude-skills/brands/<slug>/logos/`
