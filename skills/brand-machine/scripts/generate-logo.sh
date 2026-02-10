#!/bin/bash
# generate-logo.sh — Generate brand logos via infsh (inference.sh)
# Usage: generate-logo.sh <brand-slug> [type]
# Types: logo-light, logo-dark, icon (default: all three)

set -e

BRAND_SLUG="$1"
TYPE="${2:-all}"
REPO_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
TOKENS_FILE="$REPO_ROOT/brands/$BRAND_SLUG/tokens.json"
OUTPUT_DIR="$REPO_ROOT/brands/$BRAND_SLUG/logos"
INFSH="${HOME}/.local/bin/infsh"

if [ -z "$BRAND_SLUG" ]; then
  echo "Usage: $0 <brand-slug> [logo-light|logo-dark|icon|all]"
  exit 1
fi

if [ ! -f "$TOKENS_FILE" ]; then
  echo "ERROR: Brand not found: $BRAND_SLUG"
  echo "Expected: $TOKENS_FILE"
  exit 1
fi

if [ ! -f "$INFSH" ]; then
  echo "ERROR: infsh CLI not found at $INFSH"
  echo "Install inference.sh first: https://inference.sh"
  exit 1
fi

# Read brand tokens
BRAND_NAME=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['brand']['name'])")
PRIMARY=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['colors']['PRIMARY'])")
MOTIF=$(python3 -c "import json; d=json.load(open('$TOKENS_FILE')); print(d['theme'].get('motif','geometric'))")

mkdir -p "$OUTPUT_DIR"

generate() {
  local type="$1"
  local prompt="$2"
  local output="$OUTPUT_DIR/$type.png"

  echo "Generating $type for $BRAND_NAME..."
  echo "Prompt: $prompt"
  echo "Output: $output"

  "$INFSH" app run falai/flux-dev-lora \
    --prompt "$prompt" \
    --output "$output" \
    2>&1

  if [ -f "$output" ]; then
    echo "Generated: $output"
  else
    echo "WARNING: Generation may have failed for $type"
  fi
  echo ""
}

if [ "$TYPE" = "all" ] || [ "$TYPE" = "logo-light" ]; then
  generate "logo-light" "Minimalist modern logo for '$BRAND_NAME' tech company, $PRIMARY accent color on white background, clean vector style, professional, $MOTIF design elements, high quality, centered composition"
fi

if [ "$TYPE" = "all" ] || [ "$TYPE" = "logo-dark" ]; then
  generate "logo-dark" "Minimalist modern logo for '$BRAND_NAME' tech company, $PRIMARY accent color on dark navy #0f172a background, clean vector style, professional, $MOTIF design elements, high quality, centered composition"
fi

if [ "$TYPE" = "all" ] || [ "$TYPE" = "icon" ]; then
  generate "icon" "App icon for '$BRAND_NAME', $PRIMARY gradient, minimalist $MOTIF symbol, rounded corners, modern tech aesthetic, high quality, 1024x1024"
fi

echo "=== Logo Generation Complete ==="
ls -la "$OUTPUT_DIR"/*.png 2>/dev/null || echo "No PNG files generated"
