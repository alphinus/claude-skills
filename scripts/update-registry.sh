#!/bin/bash
# ============================================
# Registry Generator
# Walks skills/*/*/SKILL.md to regenerate registry.json
# ============================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="$REPO_DIR/skills"
BRANDS_DIR="$REPO_DIR/brands"
REGISTRY="$REPO_DIR/registry.json"

python3 - "$SKILLS_DIR" "$BRANDS_DIR" "$REGISTRY" << 'PYEOF'
import json, sys, os, re
from datetime import datetime, timezone

skills_dir = sys.argv[1]
brands_dir = sys.argv[2]
registry_path = sys.argv[3]

brands = {}
skills = []

for brand_name in sorted(os.listdir(skills_dir)):
    brand_path = os.path.join(skills_dir, brand_name)
    if not os.path.isdir(brand_path) or brand_name.startswith('.'):
        continue

    brand_skills = []

    for skill_slug in sorted(os.listdir(brand_path)):
        skill_path = os.path.join(brand_path, skill_slug)
        skill_md = os.path.join(skill_path, "SKILL.md")
        if not os.path.isfile(skill_md):
            continue

        # Parse YAML frontmatter
        with open(skill_md) as f:
            content = f.read()

        name = f"{brand_name}:{skill_slug}"
        description = ""

        # Extract name from frontmatter
        m = re.search(r'^name:\s*(.+)$', content, re.MULTILINE)
        if m:
            name = m.group(1).strip().strip('"').strip("'")

        # Extract description from frontmatter
        m = re.search(r'^description:\s*[>|]?\s*\n\s+(.+?)(?:\n\S|\n---)', content, re.MULTILINE | re.DOTALL)
        if m:
            description = re.sub(r'\s+', ' ', m.group(1)).strip()
        else:
            m = re.search(r'^description:\s*["\']?(.+?)["\']?\s*$', content, re.MULTILINE)
            if m:
                description = m.group(1).strip()

        # Determine type: built (has brand config in brands/) or authored
        brand_config = os.path.join(brands_dir, brand_name)
        skill_type = "built" if os.path.isdir(brand_config) and skill_slug == "brand-system" else "authored"

        # Auto-detect tags from subdirectories
        tags = []
        for subdir in ("scripts", "references", "assets", "templates", "actions"):
            if os.path.isdir(os.path.join(skill_path, subdir)):
                tags.append(subdir)

        skills.append({
            "name": name,
            "brand": brand_name,
            "slug": skill_slug,
            "path": f"skills/{brand_name}/{skill_slug}",
            "type": skill_type,
            "description": description[:200] if len(description) > 200 else description,
            "tags": tags
        })
        brand_skills.append(skill_slug)

    if brand_skills:
        # Try to read domain from brand tokens
        domain = None
        tokens_file = os.path.join(brands_dir, brand_name, "tokens.json")
        if os.path.isfile(tokens_file):
            with open(tokens_file) as f:
                tokens = json.load(f)
            domain = tokens.get("brand", {}).get("domain")

        brands[brand_name] = {
            "displayName": brand_name.capitalize(),
            "domain": domain,
            "skillCount": len(brand_skills)
        }

registry = {
    "version": "1.0.0",
    "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    "brands": brands,
    "skills": skills
}

with open(registry_path, 'w') as f:
    json.dump(registry, f, indent=2, ensure_ascii=False)
    f.write('\n')

print(f"Registry updated: {len(skills)} skill(s) across {len(brands)} brand(s)")
PYEOF
