#!/bin/bash
# generate-collection.sh
# CLI tool: Generate a brand collection from templates
# Usage: ./scripts/generate-collection.sh <brand-slug>

set -e

BRAND_SLUG="$1"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATES_DIR="$REPO_ROOT/collection-templates"
TOKENS_FILE="$REPO_ROOT/brands/$BRAND_SLUG/tokens.json"
OUTPUT_DIR="$REPO_ROOT/brands/$BRAND_SLUG/collection"

if [ -z "$BRAND_SLUG" ]; then
  echo "Usage: $0 <brand-slug>"
  echo "Example: $0 eluma"
  exit 1
fi

if [ ! -f "$TOKENS_FILE" ]; then
  echo "ERROR: tokens.json not found for brand: $BRAND_SLUG"
  echo "Expected: $TOKENS_FILE"
  exit 1
fi

if [ ! -d "$TEMPLATES_DIR" ]; then
  echo "ERROR: Collection templates not found."
  echo "Run scripts/templatize-collection.sh first."
  exit 1
fi

echo "=== Generating Collection for $BRAND_SLUG ==="

# Extract tokens via Python
BRAND_NAME=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['brand']['name'])")
BRAND_DOMAIN=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['brand'].get('domain',''))")
BRAND_TAGLINE=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['brand'].get('tagline',''))")
BRAND_SLUG_VAL=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['brand']['slug'])")
BRAND_NAME_LOWER=$(echo "$BRAND_NAME" | tr '[:upper:]' '[:lower:]')

# Colors
PRIMARY=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['PRIMARY'])")
PRIMARY_DARK=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['PRIMARY_DARK'])")
PRIMARY_RGB=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['PRIMARY_RGB'])")
BG=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['BG'])")
SURFACE=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['SURFACE'])")
SIDEBAR_BG=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['SIDEBAR_BG'])")
TEXT=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['TEXT'])")
MUTED=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['MUTED'])")
SUCCESS=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['SUCCESS'])")
SUCCESS_RGB=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors'].get('SUCCESS_RGB','16,185,129'))")
WARNING=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['WARNING'])")
WARNING_RGB=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors'].get('WARNING_RGB','245,158,11'))")
ERROR=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['ERROR'])")
ERROR_RGB=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors'].get('ERROR_RGB','239,68,68'))")
INFO=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['INFO'])")
INFO_RGB=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors'].get('INFO_RGB','59,130,246'))")

# Clean and recreate output
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Copy template structure
cp -r "$TEMPLATES_DIR"/* "$OUTPUT_DIR/" 2>/dev/null || true

# Replace all placeholders
COUNT=0
find "$OUTPUT_DIR" -name "*.html" -type f | while read -r file; do
  sed -i '' "s|{{BRAND_NAME}}|$BRAND_NAME|g" "$file"
  sed -i '' "s|{{BRAND_NAME_LOWER}}|$BRAND_NAME_LOWER|g" "$file"
  sed -i '' "s|{{BRAND_DOMAIN}}|$BRAND_DOMAIN|g" "$file"
  sed -i '' "s|{{BRAND_TAGLINE}}|$BRAND_TAGLINE|g" "$file"
  sed -i '' "s|{{BRAND_SLUG}}|$BRAND_SLUG_VAL|g" "$file"
  sed -i '' "s|{{PRIMARY}}|$PRIMARY|g" "$file"
  sed -i '' "s|{{PRIMARY_DARK}}|$PRIMARY_DARK|g" "$file"
  sed -i '' "s|{{PRIMARY_RGB}}|$PRIMARY_RGB|g" "$file"
  sed -i '' "s|{{BG}}|$BG|g" "$file"
  sed -i '' "s|{{SURFACE}}|$SURFACE|g" "$file"
  sed -i '' "s|{{SIDEBAR_BG}}|$SIDEBAR_BG|g" "$file"
  sed -i '' "s|{{TEXT}}|$TEXT|g" "$file"
  sed -i '' "s|{{MUTED}}|$MUTED|g" "$file"
  sed -i '' "s|{{SUCCESS}}|$SUCCESS|g" "$file"
  sed -i '' "s|{{SUCCESS_RGB}}|$SUCCESS_RGB|g" "$file"
  sed -i '' "s|{{WARNING}}|$WARNING|g" "$file"
  sed -i '' "s|{{WARNING_RGB}}|$WARNING_RGB|g" "$file"
  sed -i '' "s|{{ERROR}}|$ERROR|g" "$file"
  sed -i '' "s|{{ERROR_RGB}}|$ERROR_RGB|g" "$file"
  sed -i '' "s|{{INFO}}|$INFO|g" "$file"
  sed -i '' "s|{{INFO_RGB}}|$INFO_RGB|g" "$file"
  COUNT=$((COUNT + 1))
done

FINAL_COUNT=$(find "$OUTPUT_DIR" -name "*.html" | wc -l | tr -d ' ')
echo "Generated $FINAL_COUNT HTML pages in $OUTPUT_DIR"
echo "=== Collection Generation Complete ==="
