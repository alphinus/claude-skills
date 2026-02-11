#!/bin/bash
# Setup a repository with eluma:github-pimper templates.
# Usage: setup-repo.sh <repo-path> <repo-name> <one-liner> [tag1] [tag2] [tag3] [tag4]

set -e

REPO_PATH="${1:-.}"
REPO_NAME="${2:-$(basename "$REPO_PATH")}"
ONE_LINER="${3:-A project by alphinus}"
TAG_1="${4:-TypeScript}"
TAG_2="${5:-Open Source}"
TAG_3="${6:-MIT License}"
TAG_4="${7:-Production}"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
GITHUB_USER="alphinus"
PRIMARY="#4fd1c5"
PRIMARY_DARK="#38b2ac"
YEAR=$(date +%Y)

echo "Setting up $REPO_NAME at $REPO_PATH..."
echo "  Tags: $TAG_1 | $TAG_2 | $TAG_3 | $TAG_4"

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

# Banners (with all placeholders including tags)
for variant in dark light; do
  if [ -f "$SKILL_DIR/templates/banner-$variant.svg" ]; then
    sed -e "s/{{REPO_NAME}}/$REPO_NAME/g" \
        -e "s/{{ONE_LINER}}/$ONE_LINER/g" \
        -e "s/{{PRIMARY}}/$PRIMARY/g" \
        -e "s/{{PRIMARY_DARK}}/$PRIMARY_DARK/g" \
        -e "s/{{TAG_1}}/$TAG_1/g" \
        -e "s/{{TAG_2}}/$TAG_2/g" \
        -e "s/{{TAG_3}}/$TAG_3/g" \
        -e "s/{{TAG_4}}/$TAG_4/g" \
        "$SKILL_DIR/templates/banner-$variant.svg" > "$REPO_PATH/.github/assets/banner-$variant.svg"
  fi
done

# Social preview
if [ -f "$SKILL_DIR/templates/social-preview.html" ]; then
  sed -e "s/{{REPO_NAME}}/$REPO_NAME/g" \
      -e "s/{{ONE_LINER}}/$ONE_LINER/g" \
      -e "s/{{PRIMARY}}/$PRIMARY/g" \
      -e "s/{{PRIMARY_DARK}}/$PRIMARY_DARK/g" \
      -e "s/{{TAG_1}}/$TAG_1/g" \
      -e "s/{{TAG_2}}/$TAG_2/g" \
      -e "s/{{TAG_3}}/$TAG_3/g" \
      -e "s/{{TAG_4}}/$TAG_4/g" \
      -e "s/{{BADGES_HTML}}//g" \
      "$SKILL_DIR/templates/social-preview.html" > "$REPO_PATH/.github/assets/social-preview.html"
fi

echo ""
echo "Done! Files created:"
find "$REPO_PATH/.github" -type f | sort
echo ""
echo "Next steps:"
echo "  1. Customize README.md using templates/README.md.template"
echo "  2. Run: node $SKILL_DIR/scripts/generate-social-preview.js $REPO_PATH"
echo "  3. Upload social-preview.png to GitHub repo settings"
