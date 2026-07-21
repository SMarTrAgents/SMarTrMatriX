#!/usr/bin/env bash
# Rebuilds matrix.exe / matrix.scr from ../matrix.js after edits.
# Run on any machine with Node + npx (works on Linux, macOS, Windows via WSL/git-bash).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

npx --yes pkg matrix.js -t node18-win-x64 -o windows/matrix.exe
cp windows/matrix.exe windows/matrix.scr

echo "Neu gebaut: windows/matrix.exe und windows/matrix.scr"
