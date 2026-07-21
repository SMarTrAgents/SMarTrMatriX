# Einbau auf einer anderen Webseite

Drei Wege, je nach Aufwand. Alle sind rein statisch — kein Server-Prozess,
keine externen Dienste, Serverlast ≈ 0 (die Animation rechnet der Browser
des Besuchers).

## Weg 1: iframe (1 Zeile, jede Seite / jedes CMS)

Nutzt die fertige Live-Seite auf smartragents.ai:

```html
<iframe src="https://smartragents.ai/matrix"
        style="width:100%;height:100vh;border:0;background:#000"
        title="smartragents.ai Matrix"></iframe>
```

Einschränkung: Der Glitch-Klick navigiert das **iframe** zur
smartragents.ai-Startseite (nicht die umgebende Seite), und Vollbild aus
einem iframe braucht das Attribut `allowfullscreen`:

```html
<iframe src="https://smartragents.ai/matrix" allowfullscreen ...></iframe>
```

## Weg 2: Embed-Skript (empfohlen — volle Kontrolle)

Die Datei `matrix-embed.js` aus diesem Ordner auf die Zielseite kopieren
(oder von smartragents.ai laden, sobald sie dort mit deployt ist). Kein
Framework nötig, funktioniert in jedem HTML/CMS, das ein `<script>` erlaubt:

```html
<div id="matrix" style="width:100%;height:100vh"></div>
<script src="/pfad/zu/matrix-embed.js"></script>
<script>
  SmartrMatrix.mount('#matrix', {
    glitchTexts: ['smartragents.ai', '₳K₳ŦØŇǤƗɆ'], // eigene Texte möglich, ≥1 s sichtbar
    glitchLink: 'https://www.smartragents.ai',       // Ziel von Glitch- UND QR-Klick
    glitchFullscreen: true,                          // Vollbild beim Klick
    clickFullscreen: true,                           // Klick daneben = Vollbild-Toggle
    qrImage: 'https://www.smartragents.ai/qr/homepage-matrix.png', // false = QR aus
    qrEveryMs: 60000,                                // QR einmal pro Minute …
    qrVisibleMs: 10000,                              // … steht 10 s im Regen, …
    rabbitVisibleMs: 6000,                           // … Hase sitzt die ersten 6 s daneben
  });
</script>
```

- Der Container bestimmt die Größe — geht als Vollbild-Hintergrund
  (`position:fixed;inset:0`) genauso wie als kleines Fenster in einer Card.
- `mount()` gibt `{ destroy() }` zurück, falls die Animation dynamisch
  entfernt werden soll (SPA-Seitenwechsel).
- Mehrere Instanzen pro Seite sind möglich (mehrfach `mount()` aufrufen).
- Hinweis Browser-Regel: Vollbild geht NUR aus einer Klick-Geste heraus —
  automatisches Vollbild beim Laden blockiert jeder Browser.

Beispiel zum direkten Öffnen: `web/example.html` in diesem Ordner.

## Weg 3: React-Seite (wie auf der Homepage)

Für React-Projekte die fertige Komponente aus der Homepage übernehmen:
`$SMarTrAgents/Web/homepage/src/pages/MatrixPage.tsx` (nutzt nur
`react-router-dom` fürs Navigieren — bei anderem Router die zwei
`navigate('/')`-Stellen anpassen). Route registrieren, fertig.

## QR-Codes auf einer anderen Seite einbinden

Die QR-SVGs sind öffentlich und direkt verlinkbar — einfach als Bild einbetten:

```html
<img src="https://smartragents.ai/qr/homepage.svg" alt="QR: smartragents.ai" width="200">
```

Verfügbar: `homepage`, `matrix`, `shop`, `cloud`, `phone`
(je `/qr/<slug>.svg` = Druckqualität, `/qr/<slug>` = Anzeigeseite).

**Neuen QR-Code anlegen** (im Homepage-Repo `$SMarTrAgents/Web/homepage`):
1. Eintrag in `src/data/qr-codes.ts` ergänzen (slug, target, label).
2. `npm run gen:qr` → erzeugt `public/qr/<slug>.svg` offline.
3. `npm run build` und wie üblich deployen.
