# SMarTrMatriX

Matrix-Regen von [smartragents.ai](https://www.smartragents.ai) — mit
gelegentlichem "smartragents.ai"-Glitch und einem roten "Agent", der wie im
Film durch den Code läuft. Ein Skript (`matrix.js`), drei Ziele:
Linux-CLI-Befehl, Windows-Bildschirmschoner und Web-Embed (`web/`).
Live zu sehen auf [smartragents.ai/matrix](https://smartragents.ai/matrix).

## Linux: als CLI-Befehl installieren

```bash
./install.sh
```

Installiert `matrix` nach `~/.local/bin` (kein sudo nötig). Danach einfach:

```bash
matrix        # läuft endlos (Endlosschleife), Ctrl+C zum Beenden
matrix 300    # läuft stattdessen genau 300 Sekunden und beendet sich dann selbst
```

## Windows: als Bildschirmschoner installieren

Im Ordner `windows/` liegt bereits eine fertig gebaute `matrix.scr`
(Cross-Compile via `pkg`, Node-Runtime eingebettet — keine separate
Node-Installation auf dem Windows-Rechner nötig).

**Einfachster Weg:** Rechtsklick auf `windows/matrix.scr` → **Installieren**.
Windows setzt den Bildschirmschoner automatisch, ganz ohne Admin-Rechte oder
Kopieren nach `System32`.

**Per Skript (z. B. für mehrere Rechner):**

```powershell
cd windows
.\install-screensaver.ps1
```

Setzt die Registry-Werte unter `HKCU\Control Panel\Desktop` direkt (ebenfalls
ohne Admin-Rechte).

### Bekannte Einschränkungen des Screensavers

- **Beenden nur per Taste**, nicht per Mausbewegung — eine Konsolen-App kann
  ohne native Windows-Bindings keine globale Mausbewegung abfangen. Jede
  Taste beendet ihn zuverlässig, ein winziger Mausruck aktuell nicht.
- **Kein Konfigurationsdialog** (`/c`) und **keine Live-Vorschau** (`/p`) im
  Windows-Einstellungsfenster — beide Aufrufe beenden sich sofort sauber,
  statt abzustürzen oder hängen zu bleiben.
- Ich konnte `matrix.scr` nicht auf einem echten Windows-Rechner testen (hier
  läuft nur Linux) — Cross-Compile und Registry-Logik folgen der
  dokumentierten Windows-Screensaver-Konvention, aber bitte einmal kurz
  gegenprüfen, bevor es breiter verteilt wird.

### Nach Änderungen an matrix.js neu bauen

```bash
windows/build.sh
```

## Effekte

- Grünregen in drei Helligkeitsstufen (statt Einheitsgrün)
- Gelegentlicher cyanfarbener Glitch — abwechselnd "smartragents.ai" oder
  "₳K₳ŦØŇǤƗɆ" — an zufälliger Stelle
- Bis zu drei rote "Agenten"-Spalten gleichzeitig, die durchs Bild laufen und
  sich wieder auflösen
- Läuft standardmäßig endlos; alle 4 Minuten wird der Regen intern sanft neu
  gestreut (kein Aussetzer, nur Auffrischung), damit es auch über Stunden
  hinweg nicht optisch "einfriert"
- Reagiert live auf Terminal-Resize
