#!/usr/bin/env node
//
// SMarTrMatriX — smartragents.ai matrix rain.
// Terminal CLI + Windows screensaver in one script.
// SMarTrAgents.ai by ₳K₳ŦØŇǤƗɆ with Fable 5 (Anthropic). MIT license.
//
// Usage:
//   matrix             endless loop, Ctrl+C to quit
//   matrix 300          exits automatically after 300 seconds
//   matrix.exe /s       Windows screensaver "show" mode — runs until any key is pressed
//   matrix.exe /c       Windows screensaver "configure" mode — no options, exits immediately
//   matrix.exe /p 123   Windows screensaver "preview" mode — not supported, exits immediately

const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~".split('');

const GLITCH_TEXTS = ["smartragents.ai", "₳K₳ŦØŇǤƗɆ"];
const RESET = '\x1b[0m';
const HEAD_COLOR = '\x1b[1;37m';
const AGENT_HEAD_COLOR = '\x1b[1;31m';
const AGENT_TRAIL_COLOR = '\x1b[0;31m';
const GLITCH_COLOR = '\x1b[1;36m';
const GREEN_SHADES = ['\x1b[2;32m', '\x1b[0;32m', '\x1b[1;32m']; // dim, normal, bright
const MAX_AGENTS = 3;
const LOOP_REFRESH_MS = 4 * 60 * 1000; // soft-reset the rain every 4 minutes

// --- Windows screensaver argument handling -------------------------------
// Windows invokes a .scr with /c (configure), /p <hwnd> (preview) or /s (show).
// We don't offer configuration and can't render into an arbitrary preview
// window from a console app, so both just exit immediately and cleanly.
const rawArg = process.argv[2] || '';
const flag = rawArg.toLowerCase();

if (flag.startsWith('/c') || flag === '-c') {
    process.exit(0);
}
if (flag.startsWith('/p') || flag === '-p') {
    process.exit(0);
}

const isScreensaverMode = flag.startsWith('/s') || flag === '-s';

// No argument (or a screensaver flag): run forever, Ctrl+C to quit. Pass
// seconds to auto-exit after a fixed time instead, e.g. `matrix 300`.
const durationArg = !flag.startsWith('/') ? parseInt(rawArg, 10) : NaN;
const EXIT_AFTER_MS = durationArg > 0 ? durationArg * 1000 : null;

let width = process.stdout.columns || 80;
let height = process.stdout.rows || 24;

let drops = [];
let tailLengths = [];
let colShade = [];

function initColumns() {
    drops = [];
    tailLengths = [];
    colShade = [];
    for (let i = 0; i < width; i++) {
        drops[i] = Math.floor(Math.random() * -height);
        tailLengths[i] = 10 + Math.floor(Math.random() * 20);
        colShade[i] = GREEN_SHADES[Math.floor(Math.random() * GREEN_SHADES.length)];
    }
}
initColumns();

// Brief brand/name reveal that flickers into the rain at a random spot.
let glitch = null;
// Red "agents" sweeping down columns, Matrix-film style. Several can run at once.
let agents = [];

process.stdout.write('\x1b[2J\x1b[H\x1B[?25l');

process.stdout.on('resize', () => {
    width = process.stdout.columns || 80;
    height = process.stdout.rows || 24;
    process.stdout.write('\x1b[2J\x1b[H');
    initColumns();
    glitch = null;
    agents = [];
});

function maybeSpawnGlitch() {
    if (glitch) return;
    const text = GLITCH_TEXTS[Math.floor(Math.random() * GLITCH_TEXTS.length)];
    if (width < text.length + 2) return;
    if (Math.random() < 0.0066) {
        glitch = {
            text,
            row: 1 + Math.floor(Math.random() * height),
            col: 1 + Math.floor(Math.random() * (width - text.length)),
            framesLeft: 14 + Math.floor(Math.random() * 7), // ≥1 s bei 75 ms/Frame
        };
    }
}

function maybeSpawnAgent() {
    if (agents.length >= MAX_AGENTS) return;
    if (Math.random() < 0.01) {
        const col = Math.floor(Math.random() * width);
        if (!agents.some(a => a.col === col)) {
            agents.push({ col });
        }
    }
}

const interval = setInterval(() => {
    let output = '';
    for (let i = 0; i < width; i++) {
        const y = drops[i];
        const isAgent = agents.some(a => a.col === i);

        if (y >= 0 && y < height) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            output += `\x1b[${y + 1};${i + 1}H${isAgent ? AGENT_HEAD_COLOR : HEAD_COLOR}${char}`;
        }

        if (y - 1 >= 0 && y - 1 < height) {
            const trailChar = chars[Math.floor(Math.random() * chars.length)];
            output += `\x1b[${y};${i + 1}H${isAgent ? AGENT_TRAIL_COLOR : colShade[i]}${trailChar}`;
        }

        const tailY = y - tailLengths[i];
        if (tailY >= 0 && tailY < height) {
            output += `\x1b[${tailY + 1};${i + 1}H `;
        }

        if (y > height + tailLengths[i] && Math.random() > 0.95) {
            drops[i] = 0;
            tailLengths[i] = 10 + Math.floor(Math.random() * 20);
            colShade[i] = GREEN_SHADES[Math.floor(Math.random() * GREEN_SHADES.length)];
            if (isAgent) agents = agents.filter(a => a.col !== i); // agent dissolves back into the rain
        } else {
            drops[i]++;
        }
    }

    maybeSpawnGlitch();
    maybeSpawnAgent();

    if (glitch) {
        output += `\x1b[${glitch.row};${glitch.col}H${GLITCH_COLOR}${glitch.text}${RESET}`;
        glitch.framesLeft--;
        if (glitch.framesLeft <= 0) {
            output += `\x1b[${glitch.row};${glitch.col}H${' '.repeat(glitch.text.length)}`;
            glitch = null;
        }
    }

    process.stdout.write(output);
}, 75);

// Soft reset so a very long-running session stays visually fresh — this
// does NOT stop the animation, it just re-seeds the columns and loops on.
function softReset() {
    initColumns();
    glitch = null;
    agents = [];
}
const loopTimer = setInterval(softReset, LOOP_REFRESH_MS);

// Cleanup on exit
const onExit = () => {
    clearInterval(interval);
    clearInterval(loopTimer);
    clearTimeout(autoExitTimer);
    process.stdout.write('\x1b[0m\x1B[?25h\x1b[2J\x1b[H'); // Show cursor and clear screen
    process.exit();
};

// Only exits on its own if a duration was explicitly passed; otherwise
// this runs forever (endless loop) until Ctrl+C — or, in screensaver
// mode, until any key is pressed.
const autoExitTimer = EXIT_AFTER_MS ? setTimeout(onExit, EXIT_AFTER_MS) : null;

process.on('SIGINT', onExit); // Handle Ctrl+C
process.on('SIGTERM', onExit);

// Screensaver mode: exit on any keypress, like every other Windows screensaver.
// NOTE: mouse-move-to-exit is NOT implemented — a console app can't hook global
// mouse input without native OS bindings. Keyboard input is enough for /s to
// be usable, but this is a known gap vs. a "real" compiled screensaver.
if (isScreensaverMode && process.stdin.isTTY) {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', onExit);
}
