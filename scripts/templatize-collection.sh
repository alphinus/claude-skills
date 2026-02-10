#!/bin/bash
# templatize-collection.sh
# Converts Eluma collection HTML files into brand-agnostic templates
# Replaces Eluma-specific values with {{PLACEHOLDER}} tokens
# Source: ~/eluma/logo/collection/ → Target: ~/claude-skills/collection-templates/

set -e

SOURCE_DIR="$HOME/eluma/logo/collection"
TARGET_DIR="$HOME/claude-skills/collection-templates"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "ERROR: Source directory not found: $SOURCE_DIR"
  exit 1
fi

echo "=== Templatizing Eluma Collection ==="
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_DIR"

# Clean and recreate target
rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"

# Copy all files first
cp -r "$SOURCE_DIR"/* "$TARGET_DIR/" 2>/dev/null || true

# Count HTML files
HTML_COUNT=$(find "$TARGET_DIR" -name "*.html" | wc -l | tr -d ' ')
echo "Found $HTML_COUNT HTML files to templatize"

# Replace Eluma-specific values with placeholders
# IMPORTANT: Longer strings first to prevent partial replacements

find "$TARGET_DIR" -name "*.html" -type f | while read -r file; do
  # Brand text replacements (longer first)
  sed -i '' 's/eluma\.ch/{{BRAND_DOMAIN}}/g' "$file"
  sed -i '' 's/EVENT-DRIVEN ECOSYSTEM/{{BRAND_TAGLINE}}/g' "$file"
  sed -i '' 's/Event-Driven Ecosystem/{{BRAND_TAGLINE}}/g' "$file"
  sed -i '' 's/eluma-brand-system/{{BRAND_SLUG}}/g' "$file"

  # Case-sensitive brand name replacements
  sed -i '' 's/Eluma/{{BRAND_NAME}}/g' "$file"
  sed -i '' 's/ELUMA/{{BRAND_NAME}}/g' "$file"
  # Lowercase 'eluma' in contexts like CSS classes/IDs - careful replacement
  sed -i '' 's/eluma/{{BRAND_NAME_LOWER}}/g' "$file"

  # Color replacements - RGB tuples first (to avoid partial hex matches)
  sed -i '' 's/79,209,197/{{PRIMARY_RGB}}/g' "$file"
  sed -i '' 's/79, 209, 197/{{PRIMARY_RGB}}/g' "$file"
  sed -i '' 's/16,185,129/{{SUCCESS_RGB}}/g' "$file"
  sed -i '' 's/16, 185, 129/{{SUCCESS_RGB}}/g' "$file"
  sed -i '' 's/245,158,11/{{WARNING_RGB}}/g' "$file"
  sed -i '' 's/245, 158, 11/{{WARNING_RGB}}/g' "$file"
  sed -i '' 's/239,68,68/{{ERROR_RGB}}/g' "$file"
  sed -i '' 's/239, 68, 68/{{ERROR_RGB}}/g' "$file"
  sed -i '' 's/59,130,246/{{INFO_RGB}}/g' "$file"
  sed -i '' 's/59, 130, 246/{{INFO_RGB}}/g' "$file"

  # Hex color replacements (case-insensitive)
  sed -i '' 's/#4fd1c5/{{PRIMARY}}/gi' "$file"
  sed -i '' 's/#38b2ac/{{PRIMARY_DARK}}/gi' "$file"
  sed -i '' 's/#0f172a/{{BG}}/gi' "$file"
  sed -i '' 's/#141e33/{{SURFACE}}/gi' "$file"
  sed -i '' 's/#0b1120/{{SIDEBAR_BG}}/gi' "$file"
  sed -i '' 's/#f8fafc/{{TEXT}}/gi' "$file"
  sed -i '' 's/#718096/{{MUTED}}/gi' "$file"
  sed -i '' 's/#10b981/{{SUCCESS}}/gi' "$file"
  sed -i '' 's/#f59e0b/{{WARNING}}/gi' "$file"
  sed -i '' 's/#ef4444/{{ERROR}}/gi' "$file"
  sed -i '' 's/#3b82f6/{{INFO}}/gi' "$file"

  # Additional Eluma-specific colors
  sed -i '' 's/#1e3a5f/{{SURFACE}}/gi' "$file"
done

echo ""
echo "=== Templatization Complete ==="
echo "Processed $HTML_COUNT HTML files"

# Verification: check for remaining Eluma references
REMAINING=$(grep -ril "eluma" "$TARGET_DIR" --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
if [ "$REMAINING" -gt 0 ]; then
  echo "WARNING: $REMAINING files still contain 'eluma' references"
  grep -ril "eluma" "$TARGET_DIR" --include="*.html" 2>/dev/null | head -5
else
  echo "All Eluma references replaced successfully"
fi

echo ""
echo "Templates ready at: $TARGET_DIR"
