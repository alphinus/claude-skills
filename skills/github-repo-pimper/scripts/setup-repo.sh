#!/bin/bash
# Setup a repository with github-repo-pimper templates.
# Usage: setup-repo.sh <repo-path> <repo-name> <one-liner>

set -e

REPO_PATH="${1:-.}"
REPO_NAME="${2:-$(basename "$REPO_PATH")}"
ONE_LINER="${3:-A project by alphinus}"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
GITHUB_USER="alphinus"
PRIMARY="#4fd1c5"
PRIMARY_DARK="#38b2ac"
YEAR=$(date +%Y)

echo "Setting up $REPO_NAME at $REPO_PATH..."

# Create directories
mkdir -p "$REPO_PATH/.github/assets"
mkdir -p "$REPO_PATH/.github/ISSUE_TEMPLATE"
mkdir -p "$REPO_PATH/.github/workflows"
mkdir -p "$REPO_PATH/docs/shorts"

# Copy and customize templates
for file in CONTRIBUTING.md CODE_OF_CONDUCT.md PULL_REQUEST_TEMPLATE.md; do
  if [ -f "$SKILL_DIR/templates/$file" ]; then
    sed -e "s/{{REPO_NAME}}/$REPO_NAME/g" \
        -e "s/{{GITHUB_USER}}/$GITHUB_USER/g" \
        -e "s/{{YEAR}}/$YEAR/g" \
        "$SKILL_DIR/templates/$file" > "$REPO_PATH/$file"
  fi
done

# Issue templates
for file in "$SKILL_DIR/templates/issue-templates/"*; do
  if [ -f "$file" ]; then
    cp "$file" "$REPO_PATH/.github/ISSUE_TEMPLATE/$(basename "$file")"
  fi
done

# Banners
for variant in dark light; do
  if [ -f "$SKILL_DIR/templates/banner-$variant.svg" ]; then
    sed -e "s/{{REPO_NAME}}/$REPO_NAME/g" \
        -e "s/{{ONE_LINER}}/$ONE_LINER/g" \
        -e "s/{{PRIMARY}}/$PRIMARY/g" \
        -e "s/{{PRIMARY_DARK}}/$PRIMARY_DARK/g" \
        "$SKILL_DIR/templates/banner-$variant.svg" > "$REPO_PATH/.github/assets/banner-$variant.svg"
  fi
done

# Social preview
if [ -f "$SKILL_DIR/templates/social-preview.html" ]; then
  sed -e "s/{{REPO_NAME}}/$REPO_NAME/g" \
      -e "s/{{ONE_LINER}}/$ONE_LINER/g" \
      -e "s/{{PRIMARY}}/$PRIMARY/g" \
      -e "s/{{PRIMARY_DARK}}/$PRIMARY_DARK/g" \
      -e "s/{{BADGES_HTML}}//g" \
      "$SKILL_DIR/templates/social-preview.html" > "$REPO_PATH/.github/assets/social-preview.html"
fi

echo "Done! Files created:"
find "$REPO_PATH/.github" -type f | sort
echo ""
echo "Next steps:"
echo "  1. Customize README.md"
echo "  2. Run: node $SKILL_DIR/scripts/generate-social-preview.js $REPO_PATH"
echo "  3. Upload social-preview.png to GitHub repo settings"
