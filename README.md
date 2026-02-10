# Claude Skills Repository

Personal backup and build system for Claude Code skills.

## Structure

```
claude-skills/
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
│       └── logos/            # SVG logos
├── skills/                  # Built skills (generated, ready to deploy)
│   └── eluma-brand-system/  # Generated from core + brands/eluma
├── plugins/                 # Plugin documentation (reference only)
│   └── REGISTRY.md
├── build.sh                 # core + brand → skill
├── sync.sh                  # skill → ~/.claude/skills/
└── README.md
```

## Usage

### Build a brand skill
```bash
./build.sh eluma
```

### Deploy to Claude Code
```bash
./sync.sh                    # Deploy all built skills
./sync.sh eluma-brand-system # Deploy one skill
```

### Create a new brand
1. Create `brands/<name>/tokens.json` (copy from eluma, change colors)
2. Add logos to `brands/<name>/logos/`
3. Run `./build.sh <name>`
4. Run `./sync.sh`

### System migration
```bash
git clone <this-repo-url> ~/claude-skills
cd ~/claude-skills
./build.sh eluma        # Rebuild all brands
./sync.sh               # Deploy to Claude Code
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
    "PRIMARY_DARK": "#hex",
    "PRIMARY_RGB": "r,g,b",
    "BG": "#hex",
    "SURFACE": "#hex",
    "SIDEBAR_BG": "#hex",
    "TEXT": "#hex",
    "MUTED": "#hex",
    "SUCCESS": "#10b981",
    "SUCCESS_RGB": "16,185,129",
    "WARNING": "#f59e0b",
    "WARNING_RGB": "245,158,11",
    "ERROR": "#ef4444",
    "ERROR_RGB": "239,68,68",
    "INFO": "#3b82f6",
    "INFO_RGB": "59,130,246"
  }
}
```
