#!/usr/bin/env bash
# Linux installer for the smartragents.ai matrix rain CLI.
# Installs a `matrix` command into ~/.local/bin — no sudo required.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="$HOME/.local/bin"
TARGET="$INSTALL_DIR/matrix"

if ! command -v node >/dev/null 2>&1; then
    echo "Node.js wurde nicht gefunden. Installiere es zuerst, z.B.:"
    echo "  sudo apt update && sudo apt install -y nodejs npm"
    echo "oder via nvm: https://github.com/nvm-sh/nvm"
    exit 1
fi

mkdir -p "$INSTALL_DIR"
cp "$SCRIPT_DIR/matrix.js" "$TARGET"
chmod +x "$TARGET"

echo "Installiert: $TARGET"

case ":$PATH:" in
    *":$INSTALL_DIR:"*)
        echo "Fertig. Starte die Animation einfach mit: matrix"
        ;;
    *)
        echo ""
        echo "$INSTALL_DIR ist noch nicht in deinem PATH."
        echo "Füge diese Zeile zu ~/.bashrc (oder ~/.zshrc) hinzu und öffne ein neues Terminal:"
        echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
        ;;
esac
