# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Website für **Tugässer Bräu** — eine neue Biermarke in Heilbronn („Ein neues Bier
belebt Heilbronn"). Neubau von Grund auf, kein Altbestand, der überführt wird.

Aufgebaut nach dem Vorbild des Schwesterprojekts `../knoedelstube-website`
(statische Single-Page-Site, lokal gebautes Tailwind, Screenshot-getriebene
Design-Schleife).

## Aktueller Stand

**Teaser-Seite**: `index.html`, eine Bildschirmhöhe, Claim „Tugässer, schaffen
wir's." / „Man wird ja wohl noch träumen dürfen." plus Instagram-CTA auf
[@tugaesser](https://www.instagram.com/tugaesser/). Keine Navigation, keine
Unterseiten, kein Impressum.

## Design-Richtung

**Stark, editorial, Swiss-industrial** — die Referenz sind Entwickler-Werkzeuge
wie Linear oder Vercel, nicht Gastro-Websites. Konkret heißt das hier:

- **Das Foto ist eine eigene Fläche, kein Hintergrund.** Es liegt nie Text
  darüber und wird nicht abgedunkelt. Das war eine ausdrückliche Korrektur —
  nicht zurückdrehen.
- **Micro-Borders statt Flächen:** 1px `cream/10` als Raster, Ecken-Ticks am
  Bild. Keine Karten, keine Radien, keine Schatten.
- **Typo trägt die Hierarchie:** Grotesk-Display sehr groß mit `-0.045em`
  Tracking und `leading-[0.94]`, alles Kleinteilige in Mono, uppercase,
  `tracking-[0.16em]`–`[0.22em]`.
- **Rot ist der einzige Akzent** und wird sparsam gesetzt (Statuspunkt,
  Fortschritt, Label). Alles andere ist `night`/`cream`.

### Die Scroll-Sequenz

Das Herzstück. `#scrolly` liefert nur den Scrollweg (300vh, ab `lg` 420vh), das
`sticky` Kind bleibt stehen. Der Fortschritt 0…1 fährt das Bild durch vier
Stationen: **Rathaus → die Frau tritt ins Bild → die Gedankenblase → Totale.**
Danach fährt der Textblock ein. Das Skript steht inline, ohne Abhängigkeiten.

Beim Anfassen zu beachten:

- **`transform` statt `object-position`**, und das Bild muss **über den Rahmen
  hinausragen** (`h-full w-auto min-w-full max-w-none shrink-0`). `object-cover`
  auf voller Breite beschneidet *vor* der Transformation — der überstehende
  Bildteil ist dann weg und Schwenks laufen ins Leere. **`shrink-0` ist
  zwingend**, sonst staucht Flexbox das Bild wieder auf Containerbreite.
- **Grenze für die Stationen:** `|tx| ≤ 100·(s−1)/(2s)`, bezogen auf die
  *Bildbreite* (nicht die Containerbreite — das Bild ist breiter). Darüber
  schiebt man den Bildrand ins Bild. Im Querformat heißt das bei `s = 1`
  zwingend `tx = 0`.
- **Zwei Stationssätze.** `STOPS_LG` zoomt aus bis zur Totale. `STOPS_SM` kann
  das nicht: ein 16:9-Bild füllt einen Hochformat-Schirm nur als Ausschnitt, die
  Totale ist dort unmöglich. Dafür gibt es seitlich viel Spielraum — mobil
  schwenkt die Sequenz quer und endet auf Frau plus Gedankenblase. Der Wechsel
  hängt an `matchMedia('(min-width: 1024px)')` und wird bei Drehung neu gesetzt.
- **Der Zoom ist auf ~2× gedeckelt**, weil die Vorlage nur 1600×900 hat. Mit
  einem höher aufgelösten Original darf `s` deutlich größer werden — dann wird
  der Einstieg wieder dramatischer.
- **`prefers-reduced-motion`**: `#scrolly` schrumpft per `motion-reduce:h-screen`
  auf eine Bildschirmhöhe und die Sequenz springt auf den Endzustand — sonst
  scrollte man durch drei leere Bildschirme, ohne dass etwas passiert. Der
  Text-Reveal startet nur unter `motion-safe:`, ist also ohne Animation sofort
  lesbar.
- **Ortszeit Heilbronn** in der Kopfleiste über `Intl.DateTimeFormat` mit
  `timeZone: 'Europe/Berlin'` — echte Zeitzone, kein fester Offset.

Ebenfalls offen und für jede Design-Arbeit relevant:

- `brand_assets/` ist **leer** — kein Logo, kein Styleguide, keine Hausschriften.
- Farben und Fonts in `tailwind.config.js` sind deshalb **provisorisch**: die
  Farben aus `images/tugaesser-rathaus-hero-1600x900.png` abgetastet
  (Bierdeckel-Rot `brand`, Bierdeckel-Blau `navy`, Nachthimmel `night`,
  Bier `gold`, Rathaus-Sandstein `sandstone`), die Schriften frei gewählt
  (Inter Tight / Inter / JetBrains Mono). Sobald echte Assets vorliegen: dort
  ersetzen und den Hinweis entfernen.
- „01 Traumphase" im Kopf der Textspalte ist ein **Wortspiel zum Claim, keine
  Statusangabe** zum Unternehmen. Nicht durch etwas wie „In Gründung" ersetzen —
  das wäre eine Tatsachenbehauptung, die niemand geprüft hat.

## Deployment

**GitHub Pages, direkt vom Branch** — `main`, Repo-Root, kein Build-Schritt auf
GitHub-Seite. Ein Push auf `main` geht live. Repo:
[frank-beck/tugaesser-website](https://github.com/frank-beck/tugaesser-website)
(öffentlich, weil Pages bei GitHub Free keine privaten Repos ausliefert).

Domain: **tugässer.de**, im DNS `xn--tugsser-7wa.de`, Registrar INWX.
`tugaesser.de` (ASCII, ebenfalls INWX) leitet per 301 darauf weiter.

Daraus folgt für die tägliche Arbeit:

- **`tailwind.css` muss committed und aktuell sein.** Niemand baut auf dem
  Server. Wer Klassen in `index.html` ändert und `npm run build:css` vergisst,
  pusht eine Seite, die live anders aussieht als lokal. Das ist der
  wahrscheinlichste Weg, diese Seite kaputtzumachen.
- **`CNAME` und `.nojekyll` nicht löschen.** Ohne `CNAME` verliert Pages die
  Custom Domain und liefert wieder unter `github.io` aus; ohne `.nojekyll`
  schickt Pages die Dateien durch Jekyll.
- **Das Repo-Root ist das Webroot.** `package.json`, `serve.mjs` und diese Datei
  liegen mit im Netz. Harmlos, aber bewusst so. Wer das ändern will, stellt
  Pages auf einen `docs/`-Ordner um und legt nur die vier Web-Dateien dorthin.
- Es gab einmal einen Actions-Workflow dafür. Der ist bewusst wieder raus:
  Für eine Seite ohne Build-Schritt war er nur eine zusätzliche Fehlerquelle —
  und ist prompt einer GitHub-Störung zum Opfer gefallen.
- **„Page build failed." mit `duration: 0` heißt fast nie, dass etwas am Repo
  kaputt ist.** Erst [githubstatus.com](https://www.githubstatus.com/) prüfen,
  bevor man Dateien verdächtigt — am 6.8.2026 lagen Actions und Pages stundenlang
  im major outage und alle Builds brachen sofort ab.

### Link-Vorschau (Open Graph)

`images/og-image.jpg` (1200×630, ~88 KB) entsteht aus `og-template.html` per
`PORT=3001 node generate-og.mjs` — Dev-Server muss laufen. Das Hero-PNG direkt zu
verlinken funktioniert nicht: 2 MB im 16:9-Format, WhatsApp lädt das oft gar
nicht erst. Unter 300 KB bleiben, sonst fällt die Vorschau still aus.

- **Nach Änderungen an Claim, Marke oder Bild das OG-Bild neu erzeugen** — es ist
  eine Kopie, die sonst stillschweigend veraltet.
- Die Domain steht in allen Meta-Tags als **Punycode** (`xn--tugsser-7wa.de`).
  Die Umlautform ist hübscher, aber manche Crawler stolpern darüber, und das
  Vorschaubild muss zuverlässig laden.
- **WhatsApp und Facebook cachen die Vorschau lange.** Nach Änderungen über den
  [Sharing Debugger](https://developers.facebook.com/tools/debug/) „Scrape Again"
  auslösen, sonst sieht man tagelang den alten Stand.

## Schriften

**Liegen lokal in `fonts/`, nicht bei Google.** Ein Einbinden über
`fonts.googleapis.com` überträgt die IP-Adresse jedes Besuchers an Google — in
Deutschland ein bekanntes Abmahnrisiko. Die Seite lädt nichts von fremden Hosts;
das lässt sich mit einem Puppeteer-Lauf gegenprüfen, der alle Requests
mitschreibt.

`node fetch-fonts.mjs` erzeugt `fonts/` samt `fonts.css` neu. Enthalten sind
**nur die tatsächlich verwendeten Schnitte** (Inter Tight 700, Inter 400,
JetBrains Mono 400/500, zusammen ~107 KB, nur Subset `latin`).

- **Wer eine neue Gewichtung einsetzt** — etwa `font-semibold` — **muss sie in
  `FAMILIES` in `fetch-fonts.mjs` ergänzen und das Skript laufen lassen.** Sonst
  rechnet der Browser den Schnitt selbst hoch und die Schrift wirkt verzerrt,
  ohne dass eine Fehlermeldung darauf hinweist.
- `og-template.html` nutzt dieselben Dateien. Dort steht Inter Tight nur auf der
  Überschrift, weil lokal ausschließlich der 700er vorliegt.

## Offen

- **Kein Impressum, keine Datenschutzerklärung.** Bewusst offen: Für eine
  ladungsfähige Anschrift käme sonst die Privatadresse infrage, das ist nicht
  gewollt. Zu klären, sobald eine Geschäftsadresse existiert. Die Einschätzung,
  die Seite sei mangels Produkt rein privat, trägt nur bedingt — sie bewirbt eine
  Marke samt Instagram-Auftritt.

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
- **Immer beide Breiten screenshotten** (`WIDTH=390` und Default). Quer- und
  Hochformat fahren verschiedene Stationssätze — ein Fehler in einem Satz ist im
  anderen unsichtbar.
- **Ein Screenshot der Startposition sagt nichts über die Sequenz.** Für die
  Scroll-Fahrt ein Puppeteer-Skript schreiben, das auf `p = 0 / 0.33 / 0.62 /
  0.85 / 1` scrollt und je ein Bild plus `#hero.style.transform` festhält.
  Schwarze Ränder im Bild bedeuten immer: `tx`/`ty` überschreiten die Grenze
  oben, oder das Bild wurde wieder auf Containerbreite gestaucht.

## Fallstricke

- **Port 3000 ist häufig durch `../knoedelstube-website` belegt.** `serve.mjs`
  bricht dann mit einer Meldung ab — aber ein Screenshot auf `:3000` liefert
  trotzdem ein Bild, nämlich das *falsche Projekt*. Nach dem Start immer
  gegenprüfen, z. B. `curl -s http://localhost:3000 | grep -o '<title>[^<]*'`,
  oder gleich auf `PORT=3001` ausweichen.
- **Schriftfamilien mit Ziffer oder Leerzeichen im Namen in `tailwind.config.js`
  quoten** (`'"Inter Tight"'`, `'"JetBrains Mono"'`). Unquoted ist die
  Deklaration CSS-ungültig, der Browser verwirft sie stillschweigend und fällt
  auf die nächste Familie zurück — im Screenshot sieht man nur „irgendwie falsche
  Schrift", nicht die Ursache.
- **`text-current/60` funktioniert nicht.** Tailwind kann `currentColor` nicht
  mit Deckkraft mischen; die Klasse fällt wirkungslos aus. Stattdessen
  `opacity-60` auf das Element.
- **Kein `h-screen` für bildschirmfüllende Flächen — `h-dvh` nehmen.** iOS
  Safari rechnet `100vh` ohne seine Toolbars; alles, was per `bottom-0` am
  unteren Rand sitzt, verschwindet dort hinter der Adressleiste. Auf dem Desktop
  fällt das nie auf, deshalb: **Änderungen am Vollbild-Layout immer auf einem
  echten iPhone gegenprüfen**, ein schmaler Puppeteer-Viewport zeigt den Fehler
  nicht. Der Scrollweg von `#scrolly` bleibt dagegen bewusst in `vh` — `dvh`
  würde sich beim Ein- und Ausfahren der Toolbar mitverändern und die Sequenz
  springen lassen.

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
- **Keine generischen Karten.** Kein `rounded-*` + `shadow-*` + `bg-white/5`.
  Struktur entsteht aus Hairlines und Rasterkanten, nicht aus Boxen.
- **Flach statt geschichtet.** Keine Schlagschatten, keine radialen
  Gradient-Stapel, keine „elevated/floating"-Ebenen. Tiefe kommt aus dem Foto,
  alles andere liegt in einer Ebene.
- **Typografie:** Zwei Familien im Einsatz — Grotesk (`font-display` für
  Überschriften, `font-body` für Fließtext) und `font-mono` für Labels, Werte
  und Statuszeilen. Die Mono trägt den Kontrast; Serifen passen nicht mehr.
  Große Überschriften eng (`-0.045em`, `leading-[0.94]`), Fließtext ruhig
  (`leading-[1.65]`).
- **Bilder nicht behandeln.** Kein Gradient-Overlay, kein `mix-blend-multiply`,
  keine Abdunklung. Das Foto steht für sich.
- **Animationen:** `transform` und `opacity` bevorzugen, `transition-colors` ist
  für Hover-Zustände erlaubt. Nie `transition-all`. Bewegung respektiert
  `prefers-reduced-motion` (`motion-safe:`).
- **Interaktive Zustände:** Jedes klickbare Element braucht `hover`,
  `focus-visible` und `active` — ausnahmslos.
- **Spacing:** Bewusste, konsistente Abstands-Tokens statt zufälliger
  Tailwind-Stufen.

## Hard Rules

- Keine Abschnitte, Features oder Inhalte ergänzen, die nicht in der Referenz stehen
- Ein Referenz-Design nicht „verbessern" — nachbauen
- Nicht nach einem einzigen Screenshot-Durchgang aufhören
- Kein `transition-all`
- Kein Tailwind-Standard-Blau/-Indigo als Primärfarbe
- Keine Markenfarben erfinden, wenn `brand_assets/` welche vorgibt
- **Den KI-Transparenzhinweis im Footer nicht entfernen und nicht unauffälliger
  machen.** Die Person im Hero-Foto ist KI-generiert (das Foto selbst nicht);
  Art. 50 Abs. 4 EU AI Act verlangt eine klar erkennbare Offenlegung. Der
  Hinweis steht doppelt: sichtbar im Footer und im Alt-Text des Bildes. Wird das
  Bild ausgetauscht, muss der Hinweis mitgeführt oder bewusst gestrichen werden.
