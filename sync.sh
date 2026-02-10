#!/bin/bash
# ============================================
# Claude Skills Sync
# Deploys built skills to ~/.claude/skills/
# Usage: ./sync.sh [skill-name]
#   No args: syncs all built skills
#   With arg: syncs only the specified skill
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
  local skill_name="$1"
  local source="$SKILLS_DIR/$skill_name"
  local target="$TARGET_DIR/$skill_name"

  if [ ! -d "$source" ]; then
    echo "Error: Skill '$skill_name' not found in $SKILLS_DIR/"
    return 1
  fi

  # Check if target is a symlink (plugin) - don't overwrite
  if [ -L "$target" ]; then
    echo "SKIP: $skill_name (is a plugin symlink, won't overwrite)"
    return 0
  fi

  # Sync
  rm -rf "$target"
  cp -r "$source" "$target"
  echo "  OK: $skill_name → $target"
}

echo "Syncing skills to $TARGET_DIR"
echo ""

if [ $# -gt 0 ]; then
  sync_skill "$1"
else
  count=0
  for dir in "$SKILLS_DIR"/*/; do
    [ -d "$dir" ] || continue
    skill_name=$(basename "$dir")
    sync_skill "$skill_name"
    count=$((count + 1))
  done

  if [ $count -eq 0 ]; then
    echo "No built skills found. Run './build.sh <brand>' first."
  else
    echo ""
    echo "Synced $count skill(s)."
  fi
fi

echo ""
echo "Done. Skills are ready in Claude Code."
