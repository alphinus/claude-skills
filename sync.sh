#!/bin/bash
# ============================================
# Claude Skills Sync
# Deploys built skills to ~/.claude/skills/
# Supports nested brand/skill directory structure
#
# Usage:
#   ./sync.sh                    — sync all skills
#   ./sync.sh eluma              — sync all skills in brand "eluma"
#   ./sync.sh eluma:brand-system — sync single skill
# ============================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_DIR="$SCRIPT_DIR/skills"
TARGET_DIR="$HOME/.claude/skills"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Claude skills directory not found at $TARGET_DIR"
  exit 1
fi

sync_skill() {
  local brand="$1"
  local skill="$2"
  local source="$SKILLS_DIR/$brand/$skill"
  local deploy_name="${brand}:${skill}"
  local target="$TARGET_DIR/$deploy_name"

  if [ ! -d "$source" ]; then
    echo "Error: Skill '$deploy_name' not found at $source"
    return 1
  fi

  # Check if target is a symlink (external plugin) — don't overwrite
  if [ -L "$target" ]; then
    echo "SKIP: $deploy_name (is a plugin symlink, won't overwrite)"
    return 0
  fi

  # Sync
  rm -rf "$target"
  cp -r "$source" "$target"
  echo "  OK: $deploy_name → $target"
}

sync_brand() {
  local brand="$1"
  local brand_dir="$SKILLS_DIR/$brand"

  if [ ! -d "$brand_dir" ]; then
    echo "Error: Brand '$brand' not found in $SKILLS_DIR/"
    return 1
  fi

  local count=0
  for skill_dir in "$brand_dir"/*/; do
    [ -d "$skill_dir" ] || continue
    local skill
    skill=$(basename "$skill_dir")
    sync_skill "$brand" "$skill"
    count=$((count + 1))
  done

  echo ""
  echo "Synced $count skill(s) for brand '$brand'."
}

echo "Syncing skills to $TARGET_DIR"
echo ""

if [ $# -gt 0 ]; then
  ARG="$1"

  if [[ "$ARG" == *:* ]]; then
    # Single skill: brand:skill
    BRAND="${ARG%%:*}"
    SKILL="${ARG#*:}"
    sync_skill "$BRAND" "$SKILL"
  else
    # Entire brand
    sync_brand "$ARG"
  fi
else
  # Sync all brands and skills
  total=0
  for brand_dir in "$SKILLS_DIR"/*/; do
    [ -d "$brand_dir" ] || continue
    brand=$(basename "$brand_dir")
    for skill_dir in "$brand_dir"/*/; do
      [ -d "$skill_dir" ] || continue
      skill=$(basename "$skill_dir")
      sync_skill "$brand" "$skill"
      total=$((total + 1))
    done
  done

  if [ $total -eq 0 ]; then
    echo "No skills found. Run './build.sh <brand>' first or add skills to skills/<brand>/<skill>/."
  else
    echo ""
    echo "Synced $total skill(s) total."
  fi
fi

echo ""
echo "Done. Skills are ready in Claude Code."
