# Skill Authoring Guide

Detailed patterns for writing effective skills. Read this when writing or reviewing SKILL.md content.

## Frontmatter: The Description Field

The `description` is the **only thing Claude sees before deciding to trigger a skill**. It must answer two questions:

1. **What** does this skill do?
2. **When** should it be used?

```yaml
# BAD — too vague
description: Handles documents

# GOOD — actionable with triggers
description: >
  Comprehensive document creation, editing, and analysis with support for
  tracked changes, comments, and formatting preservation. Use when working
  with .docx files for creating, modifying, or analyzing documents.
```

Include trigger keywords in the description (both English and German if applicable). Do NOT put "When to Use" sections in the body — by the time the body loads, the trigger decision is already made.

## Body: Progressive Disclosure Patterns

### Pattern 1: High-level guide with references

Keep core workflow in SKILL.md, split details into reference files:

```markdown
# PDF Processing

## Quick start
Extract text with pdfplumber:
[code example]

## Advanced features
- **Form filling**: See `references/forms.md`
- **API reference**: See `references/api.md`
```

Claude loads reference files only when needed.

### Pattern 2: Domain-specific organization

For skills covering multiple domains, organize by domain to avoid loading irrelevant context:

```
bigquery-skill/
├── SKILL.md (overview + navigation)
└── references/
    ├── finance.md (revenue, billing metrics)
    ├── sales.md (opportunities, pipeline)
    └── product.md (API usage, features)
```

User asks about sales → Claude only reads `sales.md`.

Similarly for multi-framework skills:

```
cloud-deploy/
├── SKILL.md (workflow + provider selection)
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```

### Pattern 3: Conditional details

Show basic content inline, link to advanced content:

```markdown
## Editing documents
For simple edits, modify the XML directly.
**For tracked changes**: See `references/redlining.md`
**For OOXML details**: See `references/ooxml.md`
```

### Key guidelines

- **One level deep** — all reference files link directly from SKILL.md, no nested references
- **Table of contents** — for reference files >100 lines, add a TOC at the top
- **Grep hints** — for large reference files (>10k words), include search patterns in SKILL.md so Claude can grep instead of reading the whole file

## Resource Types: When to Use What

### Scripts (`scripts/`)
- Same code rewritten repeatedly → make it a script
- Deterministic reliability needed → script over instructions
- Test by running before committing
- Scripts can be executed without loading into context (token-efficient)

### References (`references/`)
- Domain knowledge Claude needs to discover each time
- API docs, schemas, business rules, detailed examples
- Information lives in **either** SKILL.md **or** references, never both
- Prefer references for detailed info — keeps SKILL.md lean

### Assets (`assets/`)
- Files used in **output**, not loaded into context
- Logos, templates, boilerplate code, fonts, icons
- Claude copies/modifies these without reading them fully

## Writing Style

- **Imperative form**: "Extract text" not "Extracts text"
- **Examples over explanations**: Show, don't tell
- **Token-conscious**: Every line must justify its context cost
- **No auxiliary docs**: No README, CHANGELOG, QUICK_REFERENCE
- **No duplicate info**: Same fact should exist in exactly one place
