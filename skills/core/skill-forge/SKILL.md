---
name: core:skill-forge
description: >
  Meta-skill for scaffolding new skills in the claude-skills ecosystem. Creates correctly namespaced skill directories, SKILL.md files, and updates the central registry. Use when asked to create a new skill, scaffold a skill, or when the user says "new skill", "create skill", "scaffold skill", "skill-forge", "neuen skill erstellen".
triggers:
  - "new skill"
  - "create skill"
  - "scaffold skill"
  - "skill-forge"
  - "neuen skill"
  - "skill erstellen"
---

# Skill Forge — Scaffold New Skills

Create new skills in the `~/claude-skills/` ecosystem with correct namespace, directory structure, and registry integration.

## Design Principles

**Conciseness is key.** The context window is a shared resource. Claude is already smart — only add knowledge Claude doesn't have. Challenge every paragraph: "Does this justify its token cost?"

**Set appropriate degrees of freedom:**
- **High freedom** (text instructions): Multiple valid approaches, context-dependent decisions
- **Medium freedom** (pseudocode/scripts with params): Preferred pattern exists, some variation OK
- **Low freedom** (exact scripts): Fragile operations, consistency critical, specific sequence required

**Progressive disclosure:** Skills load in 3 levels:
1. **Metadata** (name + description) — always in context (~100 words)
2. **SKILL.md body** — loaded when skill triggers (target <500 lines)
3. **Bundled resources** — loaded as needed by Claude (unlimited)

**No clutter.** Never create README.md, CHANGELOG.md, INSTALLATION_GUIDE.md, or other auxiliary docs. A skill contains only what an AI agent needs to do the job.

## Workflow

### Step 1: Discover — Understand the Skill

Before scaffolding, understand what the skill should do with concrete examples:

- "What should this skill support? Can you give usage examples?"
- "What would a user say that should trigger this skill?"
- "What does success look like?"

Avoid asking too many questions at once. Start with the most important, follow up as needed.

### Step 2: Plan — Identify Reusable Contents

For each usage example, analyze:
1. What would you do from scratch to solve this?
2. What parts are repetitive and should be bundled?

Map findings to resource types:

| Repeated Pattern | Resource Type | Example |
|---|---|---|
| Same code rewritten each time | `scripts/` | `scripts/rotate_pdf.py` |
| Same boilerplate/templates needed | `assets/` or `templates/` | `assets/hello-world/` |
| Domain knowledge rediscovered each time | `references/` | `references/schema.md` |

### Step 3: Determine Brand Namespace

Ask the user which brand this skill belongs to. Check existing brands:

```bash
ls ~/claude-skills/skills/
```

**Rules:**
- Brand name: `^[a-z][a-z0-9]*$` (lowercase alphanumeric, no hyphens)
- `core` is reserved for brand-agnostic utility skills
- `eluma` is the primary brand (eluma.ch)
- New brands can be created at any time

### Step 4: Determine Skill Slug

Ask the user for the skill name/purpose, then derive the slug.

**Rules:**
- Slug: kebab-case (`^[a-z0-9][a-z0-9-]*$`)
- Must be descriptive: what the skill DOES, not what it IS
- Max 3-4 words separated by hyphens
- Fully qualified name: `<brand>:<slug>` (e.g., `eluma:github-pimper`)

**Examples:**
| Good | Bad | Why |
|------|-----|-----|
| `github-pimper` | `gh-tool` | Too vague |
| `brand-system` | `design` | Too generic |
| `naming` | `name-checker-v2` | No version suffixes |

### Step 5: Scaffold

Create the directory structure:

```bash
BRAND="<brand>"
SLUG="<slug>"
SKILL_DIR="$HOME/claude-skills/skills/$BRAND/$SLUG"

mkdir -p "$SKILL_DIR"
```

Create `SKILL.md` using the appropriate template from `references/skill-template.md`.

Create subdirectories based on Step 2 findings:
- `references/` — reference docs the skill reads on demand
- `scripts/` — executable scripts (test before committing!)
- `assets/` — static files used in output (images, CSS, JSON)
- `templates/` — file templates the skill generates from
- `actions/` — GitHub Actions workflows

### Step 6: Write the SKILL.md

**Frontmatter rules:**
- `name:` MUST be `<brand>:<slug>` format
- `description:` is the **primary trigger mechanism** — include what the skill does AND when to use it. All "when to use" info belongs here, not in the body (body loads only after triggering).
- `triggers:` list 3-6 natural language phrases
- Keep description under 500 characters

**Body rules:**
- Use imperative form ("Extract text", not "Extracts text")
- Prefer concise examples over verbose explanations
- Keep under 500 lines — split into `references/` files when approaching this limit
- Reference files must be mentioned in SKILL.md with clear "when to read" guidance

For detailed authoring patterns (progressive disclosure, multi-domain organization, conditional details), see `references/authoring-guide.md`.

### Step 7: Update Registry

```bash
~/claude-skills/scripts/update-registry.sh
```

### Step 8: Deploy

```bash
~/claude-skills/sync.sh <brand>:<slug>
```

### Step 9: Verify

```bash
ls ~/.claude/skills/<brand>:<slug>/
```

The skill should appear in Claude Code's skill listing.

## Validation Checklist

Before completing, verify:

- [ ] Directory: `skills/<brand>/<slug>/SKILL.md` exists
- [ ] Name field: `name: <brand>:<slug>` in SKILL.md frontmatter
- [ ] Description: Clear, actionable, includes trigger phrases, under 500 chars
- [ ] Description contains all "when to use" info (not in body)
- [ ] Body: Under 500 lines, imperative form
- [ ] References: Large content split into `references/`, linked from SKILL.md
- [ ] No clutter: No README, CHANGELOG, or auxiliary docs
- [ ] Scripts: Tested by running them
- [ ] Brand: Valid brand namespace
- [ ] Slug: kebab-case, descriptive, no version suffixes
- [ ] Registry: `registry.json` updated
- [ ] Deploy: Skill synced to `~/.claude/skills/<brand>:<slug>/`

## Naming Conventions Reference

| Context | Format | Example |
|---------|--------|---------|
| SKILL.md `name:` | `<brand>:<slug>` | `eluma:github-pimper` |
| Repo directory | `skills/<brand>/<slug>/` | `skills/eluma/github-pimper/` |
| Deploy directory | `<brand>:<slug>/` | `~/.claude/skills/eluma:github-pimper/` |
| Brand name | `^[a-z][a-z0-9]*$` | `eluma`, `giam`, `core` |
| Skill slug | kebab-case | `brand-system`, `github-pimper` |
| Fully qualified | `^[a-z][a-z0-9]*:[a-z0-9][a-z0-9-]*$` | `eluma:brand-system` |
