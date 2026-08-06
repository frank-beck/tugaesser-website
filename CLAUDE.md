# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Website für **Tugässer Bräu** — eine neue Biermarke in Heilbronn („Ein neues Bier
belebt Heilbronn"). Neubau von Grund auf, kein Altbestand, der überführt wird.

Aufgebaut nach dem Vorbild des Schwesterprojekts `../knoedelstube-website`
(statische Single-Page-Site, lokal gebautes Tailwind, Screenshot-getriebene
Design-Schleife).

## Aktueller Stand

**Teaser-Seite**: `index.html` besteht aus einem einzigen Hero — Foto, Claim
„Tugässer, schaffen wir's." / „Man wird ja wohl noch träumen dürfen." und einem
Instagram-CTA auf [@tugaesser](https://www.instagram.com/tugaesser/). Keine
Navigation, keine Unterseiten, kein Impressum.

Das Foto soll bewusst **gut sichtbar** bleiben — es ist der einzige Inhalt.
Deshalb: ab `lg` liegt der Text im Bild, aber die Scrims sind schwach gehalten
und die Lesbarkeit kommt aus `text-shadow` an den Überschriften. Darunter stehen
Bild und Text gestapelt, das Foto bleibt dort völlig unverdeckt. Wer die Scrims
verstärkt, nimmt der beleuchteten Rathaus-Fassade genau die Wirkung, wegen der
das Bild ausgewählt wurde.

Ebenfalls offen und für jede Design-Arbeit relevant:

- `brand_assets/` ist **leer** — kein Logo, kein Styleguide, keine Hausschriften.
- Farben und Fonts in `tailwind.config.js` sind deshalb **provisorisch**: die
  Farben aus `images/tugaesser-rathaus-hero-1600x900.png` abgetastet
  (Bierdeckel-Rot `brand`, Bierdeckel-Blau `navy`, Nachthimmel `night`,
  Bier `gold`, Rathaus-Sandstein `sandstone`), die Schriften frei gewählt.
  Sobald echte Assets vorliegen: dort ersetzen und den Hinweis entfernen.

## Befehle

```bash
npm install                       # einmalig
npm run build:css                 # Tailwind bauen (+ Cache-Bust in index.html)
npm run watch:css                 # Tailwind im Watch-Modus
node serve.mjs                    # Dev-Server auf http://localhost:3000
PORT=3001 node serve.mjs          # bei Portkollision
node screenshot.mjs http://localhost:3000 [label]        # Desktop, 1440×900
WIDTH=390 HEIGHT=844 node screenshot.mjs http://localhost:3000 mobile
```

Es gibt **keine Tests** und keinen Linter in diesem Projekt.

**`npm run build:css` nach jeder Klassenänderung in `index.html` ausführen** —
Tailwind ist lokal gebaut, nicht per CDN, und `tailwind.css` ist committed. Der
`postbuild:css`-Hook setzt automatisch `tailwind.css?v=<hash>` in `index.html`,
damit die geänderte CSS live frisch geladen wird.

## Lokaler Server & Screenshot-Workflow

- **Immer über localhost arbeiten** — niemals eine `file:///`-URL screenshotten.
- Server vor jedem Screenshot im Hintergrund starten. Läuft er schon, keine
  zweite Instanz starten.
- `node screenshot.mjs <url> [label]` speichert nach
  `./temporary screenshots/screenshot-N[-label].png` (fortlaufend nummeriert,
  überschreibt nie). Die PNG danach mit dem Read-Tool öffnen und auswerten.
- Beim Vergleichen konkret werden: „Überschrift ist 32px, Referenz zeigt ~24px",
  „Card-Gap 16px, sollte 24px sein". Prüfen: Spacing/Padding, Schriftgröße/
  -gewicht/Zeilenhöhe, Farben (exakter Hex), Ausrichtung, Border-Radius,
  Schatten, Bildgrößen.
- Mindestens **2 Vergleichsrunden**, nicht nach dem ersten Screenshot aufhören.
- Das Layout wechselt bei `lg` von gestapelt auf Overlay — **immer beide
  Breiten screenshotten** (`WIDTH=390` und Default), sonst bleiben Umbrüche im
  jeweils anderen Modus unbemerkt.

## Fallstricke

- **Port 3000 ist häufig durch `../knoedelstube-website` belegt.** `serve.mjs`
  bricht dann mit einer Meldung ab — aber ein Screenshot auf `:3000` liefert
  trotzdem ein Bild, nämlich das *falsche Projekt*. Nach dem Start immer
  gegenprüfen, z. B. `curl -s http://localhost:3000 | grep -o '<title>[^<]*'`,
  oder gleich auf `PORT=3001` ausweichen.
- **Schriftfamilien mit Ziffer im Namen in `tailwind.config.js` quoten**
  (`'"Source Serif 4"'`). Unquoted ist die Deklaration CSS-ungültig, der Browser
  verwirft sie stillschweigend und fällt auf die Body-Schrift zurück.

## Referenzbilder

- Liegt ein Referenzbild vor: Layout, Spacing, Typografie und Farbe **exakt**
  nachbauen. Inhalte durch Platzhalter ersetzen (Bilder via
  `https://placehold.co/BREITExHÖHE`, generische Texte). Das Design nicht
  „verbessern" und nichts hinzufügen.
- Ohne Referenzbild: von Grund auf entwerfen, mit hohem handwerklichem Anspruch
  (siehe Guardrails).

## Output-Defaults

- Eine einzelne `index.html`, sofern nicht anders gewünscht.
- Tailwind lokal gebaut: `<link rel="stylesheet" href="tailwind.css?v=…" />`.
  Theme-Konfiguration (Markenfarben, Fonts) lebt in `tailwind.config.js`, nicht
  inline im HTML.
- Mobile-first responsive.
- Platzhalterbilder: `https://placehold.co/BREITExHÖHE`.

## Anti-Generic Guardrails

- **Farben:** Nie die Tailwind-Standardpalette (`indigo-500`, `blue-600` …).
  Die Marken-Scales aus `tailwind.config.js` verwenden und daraus ableiten.
- **Schatten:** Kein flaches `shadow-md`. Geschichtete, farbig getönte Schatten
  mit geringer Deckkraft.
- **Typografie:** Nie dieselbe Schrift für Überschriften und Fließtext. Display/
  Serif mit klarer Sans paaren. Enges Tracking (`-0.03em`) bei großen
  Überschriften, großzügige Zeilenhöhe (`1.7`) im Fließtext.
- **Verläufe:** Mehrere radiale Gradients schichten. Für Tiefe Grain/Textur über
  einen SVG-Noise-Filter ergänzen.
- **Animationen:** Nur `transform` und `opacity` animieren. Nie `transition-all`.
  Spring-artiges Easing.
- **Interaktive Zustände:** Jedes klickbare Element braucht `hover`,
  `focus-visible` und `active` — ausnahmslos.
- **Bilder:** Gradient-Overlay (`bg-gradient-to-t from-night/70`) plus
  Farbebene mit `mix-blend-multiply`.
- **Spacing:** Bewusste, konsistente Abstands-Tokens statt zufälliger
  Tailwind-Stufen.
- **Tiefe:** Flächen brauchen ein Layering-System (base → elevated → floating),
  nicht alles auf derselben z-Ebene.

## Hard Rules

- Keine Abschnitte, Features oder Inhalte ergänzen, die nicht in der Referenz stehen
- Ein Referenz-Design nicht „verbessern" — nachbauen
- Nicht nach einem einzigen Screenshot-Durchgang aufhören
- Kein `transition-all`
- Kein Tailwind-Standard-Blau/-Indigo als Primärfarbe
- Keine Markenfarben erfinden, wenn `brand_assets/` welche vorgibt
