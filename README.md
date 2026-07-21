# SMarTrMatriX

🇬🇧 English (below) · 🇩🇪 [Deutsch](#-deutsch)

Matrix rain by [smartragents.ai](https://www.smartragents.ai) — green code
rain with an occasional cyan "smartragents.ai" glitch and up to three red
"agents" running through the code like in the movie. One script
(`matrix.js`), three targets: Linux CLI command, Windows screensaver and web
embed (`web/`).

**▶ Live demo: [smartragents.ai/matrix](https://smartragents.ai/matrix)**

## Linux: install as a CLI command

```bash
./install.sh
```

Installs `matrix` to `~/.local/bin` (no sudo required). Then simply:

```bash
matrix        # runs forever, Ctrl+C to quit
matrix 300    # runs for exactly 300 seconds, then exits on its own
```

## Windows: install as a screensaver

The pre-built `matrix.scr` is available from the
[GitHub Releases](https://github.com/SMarTrAgents/SMarTrMatriX/releases)
(cross-compiled via `pkg` with an embedded Node runtime — no separate Node
installation needed on the Windows machine). Or build it yourself:
`windows/build.sh`.

**Easiest way:** right-click the downloaded `matrix.scr` → **Install**.
Windows sets the screensaver automatically — no admin rights, no copying to
`System32`.

**Via script (e.g. for multiple machines):**

```powershell
cd windows
.\install-screensaver.ps1
```

Sets the registry values under `HKCU\Control Panel\Desktop` directly (also
without admin rights).

### Known screensaver limitations

- **Exits on any key press, not on mouse movement** — a console app cannot
  capture global mouse movement without native Windows bindings. Any key
  quits reliably; a tiny mouse nudge currently does not.
- **No configuration dialog** (`/c`) and **no live preview** (`/p`) in the
  Windows settings window — both calls exit cleanly instead of crashing or
  hanging.
- Not yet verified on a real Windows machine — cross-compile and registry
  logic follow the documented Windows screensaver conventions; feedback
  welcome.

### Rebuild after changing matrix.js

```bash
windows/build.sh
```

## Web embed

`web/matrix-embed.js` is a dependency-free vanilla JS embed for any website —
see `web/EINBAU.md` and `web/example.html`.

## Effects

- Green rain in three brightness levels (instead of uniform green)
- Occasional cyan glitch — alternating "smartragents.ai" and "₳K₳ŦØŇǤƗɆ" —
  at a random position
- Up to three red "agent" columns at once, running through the screen and
  dissolving again
- Runs forever by default; every 4 minutes the rain is gently re-seeded
  internally (no visible pause, just a refresh) so it never "freezes"
  visually, even over hours
- Reacts live to terminal resize

## License

[MIT](LICENSE) — © 2026 SMarTrAgents (smartragents.ai)

[SMarTrAgents.ai](https://www.smartragents.ai) by **₳K₳ŦØŇǤƗɆ** with
**Fable 5** (Anthropic) — built in partnership.

---

## 🇩🇪 Deutsch

Matrix-Regen von [smartragents.ai](https://www.smartragents.ai) — grüner
Code-Regen mit gelegentlichem cyanfarbenem "smartragents.ai"-Glitch und bis
zu drei roten "Agenten", die wie im Film durch den Code laufen. Ein Skript
(`matrix.js`), drei Ziele: Linux-CLI-Befehl, Windows-Bildschirmschoner und
Web-Embed (`web/`).

**▶ Live-Demo: [smartragents.ai/matrix](https://smartragents.ai/matrix)**

### Linux: als CLI-Befehl installieren

```bash
./install.sh
```

Installiert `matrix` nach `~/.local/bin` (kein sudo nötig). Danach einfach:

```bash
matrix        # läuft endlos, Ctrl+C zum Beenden
matrix 300    # läuft genau 300 Sekunden und beendet sich dann selbst
```

### Windows: als Bildschirmschoner installieren

Die fertig gebaute `matrix.scr` liegt als Download bei den
[GitHub-Releases](https://github.com/SMarTrAgents/SMarTrMatriX/releases)
(Cross-Compile via `pkg`, Node-Runtime eingebettet — keine separate
Node-Installation auf dem Windows-Rechner nötig). Alternativ selbst bauen:
`windows/build.sh`.

**Einfachster Weg:** Rechtsklick auf die heruntergeladene `matrix.scr` →
**Installieren**. Windows setzt den Bildschirmschoner automatisch, ganz ohne
Admin-Rechte oder Kopieren nach `System32`.

**Per Skript (z. B. für mehrere Rechner):**

```powershell
cd windows
.\install-screensaver.ps1
```

Setzt die Registry-Werte unter `HKCU\Control Panel\Desktop` direkt (ebenfalls
ohne Admin-Rechte).

#### Bekannte Einschränkungen des Screensavers

- **Beenden nur per Taste**, nicht per Mausbewegung — eine Konsolen-App kann
  ohne native Windows-Bindings keine globale Mausbewegung abfangen. Jede
  Taste beendet ihn zuverlässig, ein winziger Mausruck aktuell nicht.
- **Kein Konfigurationsdialog** (`/c`) und **keine Live-Vorschau** (`/p`) im
  Windows-Einstellungsfenster — beide Aufrufe beenden sich sofort sauber,
  statt abzustürzen oder hängen zu bleiben.
- Noch nicht auf einem echten Windows-Rechner verifiziert — Cross-Compile und
  Registry-Logik folgen der dokumentierten Windows-Screensaver-Konvention;
  Rückmeldungen willkommen.

#### Nach Änderungen an matrix.js neu bauen

```bash
windows/build.sh
```

### Web-Embed

`web/matrix-embed.js` ist ein abhängigkeitsfreies Vanilla-JS-Embed für
beliebige Webseiten — siehe `web/EINBAU.md` und `web/example.html`.

### Effekte

- Grünregen in drei Helligkeitsstufen (statt Einheitsgrün)
- Gelegentlicher cyanfarbener Glitch — abwechselnd "smartragents.ai" oder
  "₳K₳ŦØŇǤƗɆ" — an zufälliger Stelle
- Bis zu drei rote "Agenten"-Spalten gleichzeitig, die durchs Bild laufen und
  sich wieder auflösen
- Läuft standardmäßig endlos; alle 4 Minuten wird der Regen intern sanft neu
  gestreut (kein Aussetzer, nur Auffrischung), damit es auch über Stunden
  hinweg nicht optisch "einfriert"
- Reagiert live auf Terminal-Resize

### Lizenz

[MIT](LICENSE) — © 2026 SMarTrAgents (smartragents.ai)

[SMarTrAgents.ai](https://www.smartragents.ai) von **₳K₳ŦØŇǤƗɆ** mit
**Fable 5** (Anthropic) — in Partnerschaft gebaut.
