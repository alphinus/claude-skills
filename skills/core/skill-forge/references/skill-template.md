# Skill Templates

Use the appropriate template when scaffolding a new skill via `core:skill-forge`.

## Minimal Template

For simple skills that are just a SKILL.md with instructions:

```yaml
---
name: <brand>:<slug>
description: >
  <One-line description of what this skill does. Include trigger phrases.>
---

# <Skill Title>

## When to Use

<Describe when Claude should activate this skill>

## Workflow

1. <Step 1>
2. <Step 2>
3. <Step 3>

## Rules

- <Rule 1>
- <Rule 2>
```

## Standard Template

For skills with references and/or scripts:

```yaml
---
name: <brand>:<slug>
description: >
  <Detailed description with trigger phrases and use cases.>
triggers:
  - "<trigger phrase 1>"
  - "<trigger phrase 2>"
  - "<trigger phrase 3>"
---

# <Skill Title>

## When to Use

<Describe activation conditions>

## Workflow

### Step 1: <Phase Name>
<Instructions>

### Step 2: <Phase Name>
<Instructions>

### Step 3: <Phase Name>
<Instructions>

## Reference Files

- `references/<file>.md` — <description>

## Scripts

- `scripts/<file>.sh` — <description>

## Validation Checklist

- [ ] <Check 1>
- [ ] <Check 2>
```

## Full Template

For complex skills with assets, templates, actions, and multiple references:

```yaml
---
name: <brand>:<slug>
description: >
  <Comprehensive description with all trigger phrases, supported stacks,
  and detailed use cases. This is what Claude Code sees in the skill listing.>
triggers:
  - "<trigger 1>"
  - "<trigger 2>"
  - "<trigger 3>"
  - "<trigger 4>"
---

# <Skill Title>

<One paragraph overview>

## When to Use

Use this skill PROACTIVELY when:
- <Condition 1>
- <Condition 2>
- <Condition 3>

## Workflow

### Step 1: <Analyze>
<Gather context, detect stack, understand requirements>

### Step 2: <Plan>
<Determine approach, select patterns>

### Step 3: <Execute>
<Apply changes, generate files>

### Step 4: <Verify>
<Validate output, run checks>

## Quick Reference

<Most commonly needed info, inline — avoid requiring reference file reads for common tasks>

## Detailed References

Read these files based on what you need:
- `references/<topic-1>.md` — <description>
- `references/<topic-2>.md` — <description>

## Assets

- `assets/<file>` — <description>

## Templates

- `templates/<file>` — <description>

## Scripts

- `scripts/<file>` — <description>

## Validation Checklist

- [ ] <Output check 1>
- [ ] <Output check 2>
- [ ] <Quality check>
```

## Frontmatter Rules

- `name:` MUST be `<brand>:<slug>` format
- `description:` MUST be a single paragraph, include trigger phrases
- `triggers:` SHOULD list 3-6 natural language phrases that activate the skill
- Keep description under 500 characters for clean listing display
