#!/bin/bash
# ============================================
# Claude Skills Builder
# Builds a brand-specific skill from core + brand tokens
# Usage: ./build.sh <brand-name>
# Example: ./build.sh eluma
# ============================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CORE_DIR="$SCRIPT_DIR/core"
BRANDS_DIR="$SCRIPT_DIR/brands"
SKILLS_DIR="$SCRIPT_DIR/skills"

if [ $# -eq 0 ]; then
  echo "Usage: ./build.sh <brand-name>"
  echo ""
  echo "Available brands:"
  for dir in "$BRANDS_DIR"/*/; do
    [ -d "$dir" ] && echo "  - $(basename "$dir")"
  done
  exit 1
fi

BRAND="$1"
BRAND_DIR="$BRANDS_DIR/$BRAND"
TOKENS_FILE="$BRAND_DIR/tokens.json"

if [ ! -f "$TOKENS_FILE" ]; then
  echo "Error: Brand '$BRAND' not found. Missing $TOKENS_FILE"
  exit 1
fi

# Read all tokens at once using Python → temp file → source
TMPVARS=$(mktemp)
python3 - "$TOKENS_FILE" > "$TMPVARS" << 'PYEOF'
import json, sys, shlex
with open(sys.argv[1]) as f:
    d = json.load(f)
b = d["brand"]
c = d["colors"]
for k in ("name","domain","tagline","description"):
    key = "BRAND_" + k.upper()
    print(f'{key}={shlex.quote(b[k])}')
print(f'SKILL_SLUG={shlex.quote(b["slug"])}')
for k, v in c.items():
    print(f'{k}={shlex.quote(str(v))}')
PYEOF
source "$TMPVARS"
rm -f "$TMPVARS"

BRAND_NAME_LOWER=$(echo "$BRAND_NAME" | tr '[:upper:]' '[:lower:]')
BRAND_TAGLINE_LOWER=$(echo "$BRAND_TAGLINE" | tr '[:upper:]' '[:lower:]')

# Nested output: skills/<brand>/brand-system/
OUTPUT_DIR="$SKILLS_DIR/$BRAND/brand-system"

echo "Building skill: $SKILL_SLUG ($BRAND_NAME)"
echo "  Primary: $PRIMARY"
echo "  Background: $BG"
echo ""

# Clean and create output
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR/references" "$OUTPUT_DIR/assets"

# Function to replace all placeholders in a file
replace_placeholders() {
  local file="$1"
  sed -i '' \
    -e "s|{{BRAND_NAME}}|$BRAND_NAME|g" \
    -e "s|{{BRAND_NAME_LOWER}}|$BRAND_NAME_LOWER|g" \
    -e "s|{{brand_name}}|$BRAND_NAME_LOWER|g" \
    -e "s|{{SKILL_SLUG}}|$SKILL_SLUG|g" \
    -e "s|{{BRAND_DOMAIN}}|$BRAND_DOMAIN|g" \
    -e "s|{{BRAND_TAGLINE}}|$BRAND_TAGLINE|g" \
    -e "s|{{brand_tagline}}|$BRAND_TAGLINE_LOWER|g" \
    -e "s|{{BRAND_DESCRIPTION}}|$BRAND_DESCRIPTION|g" \
    -e "s|{{PRIMARY}}|$PRIMARY|g" \
    -e "s|{{PRIMARY_DARK}}|$PRIMARY_DARK|g" \
    -e "s|{{PRIMARY_RGB}}|$PRIMARY_RGB|g" \
    -e "s|{{BG}}|$BG|g" \
    -e "s|{{SURFACE}}|$SURFACE|g" \
    -e "s|{{SIDEBAR_BG}}|$SIDEBAR_BG|g" \
    -e "s|{{TEXT}}|$TEXT|g" \
    -e "s|{{MUTED}}|$MUTED|g" \
    -e "s|{{SUCCESS}}|$SUCCESS|g" \
    -e "s|{{SUCCESS_RGB}}|$SUCCESS_RGB|g" \
    -e "s|{{WARNING}}|$WARNING|g" \
    -e "s|{{WARNING_RGB}}|$WARNING_RGB|g" \
    -e "s|{{ERROR}}|$ERROR|g" \
    -e "s|{{ERROR_RGB}}|$ERROR_RGB|g" \
    -e "s|{{INFO}}|$INFO|g" \
    -e "s|{{INFO_RGB}}|$INFO_RGB|g" \
    "$file"
}

# Copy and process SKILL.md
cp "$CORE_DIR/SKILL.md.template" "$OUTPUT_DIR/SKILL.md"
replace_placeholders "$OUTPUT_DIR/SKILL.md"

# Copy and process reference files
for ref in components.md animations.md layouts.md; do
  if [ -f "$CORE_DIR/references/$ref" ]; then
    cp "$CORE_DIR/references/$ref" "$OUTPUT_DIR/references/$ref"
    replace_placeholders "$OUTPUT_DIR/references/$ref"
  fi
done

# Copy brand logos
if [ -d "$BRAND_DIR/logos" ]; then
  cp "$BRAND_DIR/logos/"* "$OUTPUT_DIR/assets/" 2>/dev/null || true
fi

# Generate design-tokens.css from brand colors
cat > "$OUTPUT_DIR/assets/design-tokens.css" << CSSEOF
/* Auto-generated design tokens for $BRAND_NAME */
/* Built from: brands/$BRAND/tokens.json */

:root, [data-theme="dark"] {
  --brand-primary: $PRIMARY;
  --brand-primary-dark: $PRIMARY_DARK;
  --brand-bg: $BG;
  --brand-surface: $SURFACE;
  --brand-sidebar-bg: $SIDEBAR_BG;
  --brand-text: $TEXT;
  --brand-muted: $MUTED;
  --brand-success: $SUCCESS;
  --brand-warning: $WARNING;
  --brand-error: $ERROR;
  --brand-info: $INFO;
  --brand-border: rgba(255,255,255,0.06);
  --brand-border-hover: rgba(255,255,255,0.12);
  --brand-gradient: linear-gradient(135deg, $PRIMARY, $PRIMARY_DARK);
  --brand-shadow-glow: 0 0 20px rgba($PRIMARY_RGB,0.15);
}

[data-theme="light"] {
  --brand-bg: #f1f5f9;
  --brand-surface: #ffffff;
  --brand-sidebar-bg: #ffffff;
  --brand-text: #1a202c;
  --brand-muted: #718096;
  --brand-border: rgba(0,0,0,0.08);
  --brand-border-hover: rgba(0,0,0,0.15);
}
CSSEOF

# Copy design-tokens.json
cp "$TOKENS_FILE" "$OUTPUT_DIR/assets/design-tokens.json"

echo "Skill built: $OUTPUT_DIR"
echo ""
echo "Files:"
find "$OUTPUT_DIR" -type f | sort | while read -r f; do
  echo "  $(echo "$f" | sed "s|$OUTPUT_DIR/||")"
done
echo ""
# Update registry
if [ -x "$SCRIPT_DIR/scripts/update-registry.sh" ]; then
  "$SCRIPT_DIR/scripts/update-registry.sh"
fi

echo "Run './sync.sh' to deploy to ~/.claude/skills/"
