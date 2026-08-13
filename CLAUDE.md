# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Website für **Tugässer Bräu** — eine neue Biermarke in Heilbronn („Ein neues Bier
belebt Heilbronn"). Neubau von Grund auf, kein Altbestand, der überführt wird.

Aufgebaut nach dem Vorbild des Schwesterprojekts `../knoedelstube-website`
(statische Single-Page-Site, lokal gebautes Tailwind, Screenshot-getriebene
Design-Schleife).

## Aktueller Stand

**Teaser-Seite**: `index.html` — Hero-Foto, Claim „Tugässer, schaffen wir's." /
„Man wird ja wohl noch träumen dürfen." plus Instagram-CTA auf
[@tugaesser](https://www.instagram.com/tugaesser/). Keine Navigation, keine
Unterseiten, kein Impressum.

**Abschnitt „02 Bestandsaufnahme“** (`#bestand`, seit 13.08.2026): das Fahnenbild,
dann **nur Text**. Überschrift „Nach dem Traum schauen wir jetzt nüchtern ins
Glas.“ — ohne Komma, das nach einer vorangestellten Adverbialbestimmung nicht
gesetzt wird; die Pause macht der Zeilenumbruch. Leitfrage rechts daneben, drei
Textblöcke (Damals / Heute / Anderswo),
dazwischen zwei Zwischenpointen, am Ende die Frage „Muss das so bleiben?“.

Das „nur Text“ ist das Ergebnis von zwei verworfenen Fassungen und **keine
Lücke, die noch zu füllen wäre**:

1. Die erste zerlegte den Inhalt in Zeitleiste, Tabelle und Zahlenkacheln —
   faktisch korrekt und tonlos, vom Auftraggeber als „holprig und KI-mäßig“
   zurückgewiesen.
2. Die zweite hängte ein Karussell mit historischen Zeugnissen an (Cluss-Schild,
   Rosenau-Bierkasten, Schuchmann-Aktie). Urteil: „bringt nichts“, wieder raus.

Der Fließtext geht auf den Caption-Entwurf in `social_media_postserie.md`
zurück, der auch den Instagram-Post trägt. **Diesen Abschnitt nicht wieder in
Faktenraster zerlegen und nicht ungefragt bebildern.**

### Typoskala des Abschnitts — vier Größen, keine fünfte

| Rolle | Größe | Wo |
|---|---|---|
| Rail-Label | `text-[11px]` mono | Marginalie links („Damals“, „Heute“, „Anderswo“) |
| Fließtext | `clamp(1.125rem,1.7vw,1.375rem)` | **jeder** Absatz, ausnahmslos |
| Zwischenpointe | `clamp(1.85rem,3.6vw,2.9rem)` | die Sätze zwischen den Blöcken |
| Kapitelsatz | `clamp(2.25rem,5.2vw,4rem)` | H2 oben und „Muss das so bleiben?“ |

Der Grund für die Tabelle: Eine frühere Fassung setzte den Schlussabsatz auf
`text-lg`, weil er in einer Nebenspalte stand. Damit wurde der Text ausgerechnet
nach der stärksten Frage der Seite kleiner und las sich wie eine Fußnote. Beim
Auftraggeber ist das sofort aufgefallen. **Größenwechsel nur mit sichtbarem
Grund** — Fließtext ist überall gleich groß, auch im Schluss.

### Satzweise

Zwölfspaltiges Raster. Links eine schmale Rail (`lg:col-span-3`) mit dem
Zwischentitel, rechts der Text (`lg:col-span-8 lg:col-start-4`). Die
Zwischenpointen und die Schlussfrage brechen aus dem Einzug aus und stehen an
der linken Kante. Daraus entsteht die Rhythmik: an der Kante spricht die Marke,
eingerückt steht die Sachlage.

Alle Textspalten liegen auf derselben Achse (`col-start-4`) — auch die Antwort
im Schluss. Vorsicht bei `col-start` plus `col-span`: `col-start-6` mit
`col-span-8` läuft über zwölf Spalten hinaus und schert nach rechts aus.

Die Seite erzählt die Phasen **chronologisch**, parallel zur Instagram-Postserie:
oben der Traum bei Nacht, darunter die Bestandsaufnahme bei Tag. Neue Phasen
kommen unten dazu; der Auftakt bleibt der Auftakt.

Inhaltlicher Arbeitsstand und Bildmaterial liegen im Schwesterrepo unter
`../its_my_life/projects/Ventures/project_tugaesser/` — vor allem
`social_media_postserie.md`, `bildrecherche_historisches_material.md` und
`hero_motiv_bestandsaufnahme.md`.

Inhaltliche Leitplanken für diesen Abschnitt, nicht wegoptimieren:

- **Das Eröffnungsbild zeigt dieselbe Frau wie der Auftakt**, eine Phase weiter:
  oben träumt sie mit Gedankenblase in der Nacht, hier steht sie nachdenklich in
  der Dämmerung vor zwei Tugässer-Fahnen. Die Figur trägt die Serie — nicht
  gegen ein beliebiges anderes Motiv tauschen.
- **Keine fremden Brauereizeichen im Bild, auch keine erfundenen.** Eine frühere
  Fassung zeigte verwitterte Fahnen erfundener Brauereien; das aktuelle Bild
  kommt ganz ohne aus und ist damit unkritisch. Erst recht keine realen Logos
  ergänzen: Cluss und Kronenbräu sind lebende Marken, und das Bild wirbt für
  eine Marke, ist also Nutzung im geschäftlichen Verkehr.
- **Der Zuschnitt des Dämmerungsbildes ist eng.** Oben die Fahnen, unten die
  Frau; `sm:object-[center_25%]` opfert Boden und Fahnenspitzen, nicht den
  Schriftzug und nicht ihr Gesicht. Nach jeder Höhenänderung im Screenshot
  prüfen, ob „Tugässer Bräu“ noch vollständig lesbar ist.
- **Käthchen, Cluss und Kronenbräu werden nicht abgewertet.** Sie erhalten reale
  Heilbronner Markengeschichte. Der Abschnitt trennt Produktionsort und
  Markenherkunft sachlich; der Block „Heute“ sagt mit „Das ist kein Vorwurf“
  explizit, dass hier niemand angegriffen wird. Der Satz bleibt drin.
- **Cluss hat bis Ende 1995 in Heilbronn gebraut, nicht bis 1982.** 1982 ging nur
  die Aktienmehrheit an Dinkelacker; die Stilllegung beschloss eine
  außerordentliche Hauptversammlung im November 1995. Eine frühere Fassung des
  Textes hatte das falsch.
- **Das Ende der Adlerbrauerei Würzburger 1938 ist eine Enteignung**, keine
  gewöhnliche Übernahme: Die Eigentümerfamilie war jüdisch. Der Text benennt das
  in einem Satz. Entweder so stehen lassen oder die Brauerei ganz weglassen —
  eine bloße Jahreszahl „bis 1938“ in einer Aufzählung wäre die schlechteste
  Variante. Der damalige Erwerber (Cluss) wird bewusst nicht genannt; das wäre
  ein Angriff auf eine lebende Marke in einem Werbetext.
- **Die Brauereiliste ist unvollständig, und der Text sagt das.** „Fünf
  Brauereien sind namentlich belegt“ — die Oberamtsbeschreibung von 1865 nennt
  acht. Nicht zu „alle Heilbronner Brauereien“ verschärfen. Faktenbasis:
  `../its_my_life/projects/Ventures/project_tugaesser/brauereien_standorte_jahre.md`.
- **Die Aussage zur fehlenden Stadtbrauerei bleibt auf öffentlich auftretende
  Betriebe begrenzt** („keine öffentlich erkennbare Stadtbrauerei“). Nicht
  dokumentierte Klein- und Privatbrauer werden nicht pauschal ausgeschlossen.
- Die frühere Formulierung „jede Stadt dieser Größe hat eine Brauerei“ ist zu
  pauschal und wurde bewusst durch den belegbaren Vergleich mit Schwäbisch Hall
  und Eppingen ersetzt.
- **Bilder unterhalb des Auftakts bekommen `loading="lazy"` plus `width`/`height`.**
  Das reserviert den Platz und verhindert Layoutsprünge. Achtung beim Prüfen: Ein
  fullPage-Screenshot ohne vorheriges Scrollen zeigt lazy-Bilder als Leerfläche —
  das ist ein Artefakt, kein Fehler. Erst durchscrollen, dann screenshotten.

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

### Der Hero — statisch, seit die Scroll-Sequenz raus ist

Bis 12.08.2026 lief hier eine 420vh lange Scroll-Sequenz: `#scrolly` lieferte
den Scrollweg, ein `sticky` Kind blieb stehen, und der Fortschritt 0…1 fuhr das
Bild per `transform` durch vier Stationen (Rathaus → Frau → Gedankenblase →
Totale). **Sie ist bewusst entfernt.** Die Seite bekommt weitere Abschnitte, und
drei leere Bildschirme davor hätten jeden davon praktisch unerreichbar gemacht.
Wer sie zurückholen will, findet sie in der Git-Historie — aber der Grund für
die Entfernung gilt dann immer noch.

Was an ihre Stelle getreten ist:

- **Eine `<figure>` mit `object-cover`.** Darunter eine `<figcaption>` in Mono
  als Bildunterschrift („Heilbronn, Marktplatz“) — sie ersetzt die frühere
  Fortschrittsleiste und hält den industriellen Charakter der Seite.
- **Kein `aspect-[16/9]` zusammen mit `max-h`.** Das war der erste Versuch und
  ist falsch: aspect-ratio schrumpft bei gekappter Höhe auch die *Breite* mit,
  und rechts steht ein schwarzer Balken. Feste Höhe plus `w-full`.
- **Die Höhe ist gedeckelt, und das ist Absicht.** Bei vollem 16:9 ist das Bild
  auf 1440×900 ganze 810 px hoch und schiebt den Claim komplett unter die Falz;
  man sähe nur ein Foto. 78dvh lässt die Überschrift anreißen.
- **`object-[center_28%]` ab `sm`, nicht `center`.** `object-cover` schneidet
  oben und unten gleichmäßig ab — und oben sitzt die Gedankenblase mit dem
  Bierdeckel, also die eigentliche Botschaft. Der Fokus wandert nach oben, der
  Verlust fällt auf den Mantelsaum unten. **Wer die Höhe ändert, muss diesen
  Wert nachziehen und im Screenshot prüfen, ob die Blase noch ganz drin ist.**
### Bildhöhe: Orientierung, nicht Breite

**Die wichtigste Regel für beide Bilder.** Im Hochformat steht `aspect-[3/2]`,
im Querformat eine `dvh`-Höhe (`landscape:h-[78dvh]` bzw. `landscape:h-[62dvh]`).

Der Grund: `object-cover` skaliert ein Querformat-Bild auf die Containerhöhe,
also **schneidet jede zusätzliche Höhe seitlich Bild weg**. Die früheren festen
`62dvh` auf dem Handy ließen von 16:9 nur rund 40 Prozent der Bildbreite übrig —
das Rathaus war praktisch verschwunden, sichtbar blieb ein schmaler Ausschnitt.
Mit 3:2 sind es rund 84 Prozent.

- **Nicht auf einen Breiten-Breakpoint zurückbauen.** Mit `sm:` (640px) fiel ein
  hochkant gehaltenes Tablet zurück in die hohe Variante und zeigte wieder nur
  54 Prozent der Bildbreite. Nicht die Breite ist das Problem, die Orientierung
  ist es: Ein 768px-Tablet im Hochformat hat dieselbe Not wie ein Handy.
- **So misst man es**, statt zu schätzen: Für jedes Bild
  `Containerhöhe × (naturalWidth / naturalHeight)` rechnen — das ist die Breite
  nach dem Skalieren — und die Containerbreite dazu ins Verhältnis setzen.
  Erwartungswert im Hochformat rund 84 Prozent, im Querformat 96–100.
- **Prüfbreiten:** 320, 360, 390, 430, 768 hoch sowie 1024 quer, 1440 und 1920.
  Ein Handy im Querformat (844×390) gehört dazu, weil dort `landscape:` greift.

- **`object-position` im Hochformat sitzt rechts der Mitte** (`62%` bzw. `64%`),
  weil in beiden Bildern die Frau und das Markenzeichen — Gedankenblase hier,
  Fahnen dort — rechts stehen. Im Querformat gilt stattdessen die vertikale
  Justage (`center 28%` / `center 25%`).
- **`dvh`, nicht `vh`** — iOS Safari rechnet `vh` ohne seine Toolbars.
- **Ortszeit Heilbronn** in der Kopfleiste über `Intl.DateTimeFormat` mit
  `timeZone: 'Europe/Berlin'` — echte Zeitzone, kein fester Offset.
- **Der Text-Reveal in `#lead`** hängt weiterhin an einem IntersectionObserver
  und startet nur unter `motion-safe:`, ist also ohne Animation sofort lesbar.

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

## Favicon

`favicon.svg` ist die Quelle — der Bierdeckel aus dem Hero, reduziert auf helles
Quadrat, roten Rahmen und blaues T. Der Schriftzug des Originals ist bei 16 px
nicht darstellbar und würde nur vermatschen.

`PORT=3001 node generate-icons.mjs` rendert daraus `favicon-32.png` (Fallback für
Browser ohne SVG-Favicon) und `apple-touch-icon.png` (iOS-Homescreen, kann kein
SVG). **Nach Änderungen am SVG neu erzeugen** — die PNGs sind Kopien und
veralten sonst still.

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
  Hochformat nutzen verschiedene `object-position`-Werte — ein Fehler im einen
  ist im anderen unsichtbar. Bei Änderungen am Hero zusätzlich `WIDTH=1920
  HEIGHT=1080`: der Zuschnitt fällt je nach Fensterhöhe anders aus.
- **Ein schwarzer Balken neben dem Bild** heißt fast immer, dass eine
  `aspect-ratio` gegen eine Höhenbegrenzung arbeitet und die Breite mitschrumpft.
- Ein Puppeteer-Lauf, der `console`- und `pageerror`-Events sowie alle Requests
  mitschreibt, prüft in einem Rutsch JS-Fehler und die Zusage, dass die Seite
  nichts von fremden Hosts lädt. Das Skript muss **im Projektordner** liegen —
  `puppeteer` steckt in dessen `node_modules`, aus `/tmp` findet Node es nicht.

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
