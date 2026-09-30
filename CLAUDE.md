# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Website für **Tugässer Bräu** — eine neue Biermarke in Heilbronn („Ein neues Bier
belebt Heilbronn"). Neubau von Grund auf, kein Altbestand, der überführt wird.

Aufgebaut nach dem Vorbild des Schwesterprojekts `../knoedelstube-website`
(statische Single-Page-Site, lokal gebautes Tailwind, Screenshot-getriebene
Design-Schleife).

## Redesign-Vorschlag (nur Branch `redesign-vorschlag`, 30.09.2026)

Ganze Seite im Design System, Anmutung nach stonebrewing.com. **Bricht bewusst
Regeln weiter unten** (Swiss-industrial, Mono, radiusfrei, keine Karten, Foto
unbehandelt, Text nie auf Foto) — gelten nur für main, bis entschieden ist.

| Was | Wo |
|---|---|
| Videos (s/w Zapfhahn, Zapfanlage; Hopfen-Wandbild als Pingpong-Schleife) | `video/*.mp4` + `.jpg` (Standbild) |
| Heilbronn-Fotos, 1400 px, ohne EXIF/GPS | `images/stadt/` |
| Galerie fährt waagerecht beim Scrollen | `.galerie*` in `src/input.css`, Höhe setzt das Skript |
| Bildmarke weiß für die blaue Leiste | `images/tugaesser-bildmarke-weiss.png` (aus der DS-Maske) |

- **Videos aus der Fotos-Mediathek sind HDR (HLG, BT.2020).** ffmpeg hier ohne
  zscale → erst `avconvert --preset Preset1920x1080` (macOS, mappt auf SDR),
  dann ffmpeg: `-an -map_metadata -1`, H.264 CRF 26, 720 px breit. Sonst
  flaue Farben und GPS im Container.
- **Quellen:** Originale in `~/Pictures/Fotos Library.photoslibrary/resources/renders/`
  (bearbeitete s/w-Fassung), Fotos aus `project_tugaesser/assets/heilbronn/reel*/`.
- `tg-tiefe` #001A33 und `tg-nacht` #0B0F14 **stehen nicht im DS** — abgeleitet.
- `serve.mjs` kennt jetzt `.mp4`. Ohne Range-Support: `networkidle0` hängt bei
  reduzierter Bewegung (Video lädt nie fertig) — in Tests `load` nehmen.
- Gemessen 30.09.2026: 320–1920 ohne Querlauf, Auftakt = Bildschirmhöhe;
  WebKit 26.6 fehlerfrei; Trace 390 px ganze Seite: Paint 110 ms, Style 126 ms,
  Raster 66 ms (534 Scrollschritte).

## Aktueller Stand

**Teaser-Seite**: `index.html` — Hero-Foto, Claim „Tugässer, schaffen wir's." /
„Man wird ja wohl noch träumen dürfen." plus Instagram-CTA auf
[@tugaesser](https://www.instagram.com/tugaesser/). Die Handlung der Seite ist
„Mach mit" auf [mitmachen.tugaesser.de](https://mitmachen.tugaesser.de), in der
Aktionsleiste unten. Keine Navigation, keine Unterseiten, kein Impressum.

### Der Auftakt sagt in Klartext, worum es geht (seit 26.08.2026)

Bis dahin stand im Abschnitt 01 nur der Claim und der Traumsatz daneben. Beides
ist Ton, keines nennt die Sache. Wer aus dem Zeitungsartikel kam, fand ein Foto,
ein Wortspiel und einen roten Knopf „Mach mit" — mitmachen wobei?

Die Auskunft steht deshalb jetzt an zwei Orten, in der Reihenfolge, in der man
sie liest. Sie folgt der Instagram-Bio, **absichtlich fast wortgleich**: Zeitung,
Profil und Seite sollen dieselbe Auskunft geben, sonst muss der Leser sie sich
zusammensuchen.

| Wo | Was |
|---|---|
| **Auf dem Auftaktbild** | Ein Bier aus Heilbronn. Für Heilbronn. |
| **Rechts im Auftakt** | Kein Konzern, kein Chef. — Wer mitmacht, entscheidet mit. Die Idee hat ihre Leute gefunden, das erste Rezept steht. Ob daraus ein Bier wird, liegt an dir. |

„Bisher gibt es nur die Idee“ stand dort bis 30.09.2026 und war seit den
Anmeldungen falsch.

- **Jeder Satz steht genau einmal.** Der Bildsatz stand zuerst zusätzlich im
  Textblock und in der Aktionsleiste — dreimal auf einem Bildschirm. Wer hier
  etwas ergänzt, prüft zuerst, wo es sonst noch steht.
- **Diese Sätze nicht durch Stimmung ersetzen.** Sie sind die einzige Stelle
  oberhalb der Bestandsaufnahme, an der die Seite in Klartext sagt, was Tugässer
  ist. Alles darunter erklärt, belegt und lädt ein — aber das liest niemand, der
  nach zehn Sekunden nicht weiß, worum es geht.
- **„liegt an dir", nicht „hängt an dieser Stadt".** „Hängt" klingt schwerfällig,
  und „diese Stadt" ist unpersönlich — der Satz ist ein Aufruf und spricht an,
  wen er meint. Die Du-Form ist ohnehin die Anrede der Seite und zugleich der
  geschlechtsneutrale Weg ohne Doppelnennung.
- **„Bisher gibt es nur die Idee", nicht „nur einen Traum"** — links steht schon
  „Traumphase" und „träumen dürfen"; ein drittes Mal Traum auf einem Bildschirm
  ist zu viel. Ebenso stand hier zuerst zweimal „entscheidet" in drei Sätzen.
- **Der Traumsatz steht links unter der H1**, nicht mehr in der rechten Spalte.
  Er gehört mit dem Claim zusammen (beide vom Bierdeckel), und rechts wird der
  Platz für den Klartext gebraucht.
- **Der Text darf aus derselben Typoskala nicht ausbrechen**: Leitsatz in der
  Größe der Leitfragen aus 02/03 (`clamp(1.35rem,2.2vw,1.8rem)`), Absatz in
  Fließtextgröße. Keine fünfte Größe.
- **Kein „Mach mit" im Auftakt** — begründet weiter unten; auf dem Handy stünden
  zwei rote Knöpfe knapp übereinander.

### Der Satz auf dem Auftaktbild

**Das ist die eine Ausnahme von „Text liegt nie auf dem Foto"** (26.08.2026, auf
Ansage des Auftraggebers: „Ich denke das ist der Spruch, der catcht"). Der Grund
ist messbar: Auf 1440×900 endet das Foto samt Bildunterschrift bei 803 px, der
Textblock beginnt bei 940 — wer nicht scrollt, sah **nur ein Foto**.

Alles andere an der Regel gilt weiter. **Das Foto selbst bleibt unbehandelt:**
kein Gradient über der Fläche, keine Abdunklung, kein Blend-Modus. Lesbar wird
der Text nur an sich selbst, über einen weichen `text-shadow` in Nachtblau — der
liegt im Text und kostet keinen Bildpunkt Helligkeit.

- **Oben links, weil dort in jedem Zuschnitt Nachthimmel liegt.** Die
  Gedankenblase steht rechts oben, die Frau rechts unten, das Rathaus mittig —
  das ist die einzige Ecke, die in allen Formaten frei bleibt. Hoch- und
  Querformat zeigen wegen `object-position` verschiedene Ausschnitte, also
  **beide prüfen**. Gemessen bleibt der Satz überall im Bild: bei 320 px am
  engsten (bis x=217 von 320, y=117 von 268).
- **Im 1600er-Raster, nicht am Fensterrand.** Der Overlay-Wrapper trägt
  `mx-auto max-w-[1600px] px-5 sm:px-8` wie Kopfleiste und Bildunterschrift.
  Ohne das begann der Satz auf 1920 bei 32 px, während alles andere bei 192 px
  steht — sichtbar schief.
- **Kleiner als die H1 darunter** (`clamp(1.25rem,3.1vw,2.5rem)`). Der Claim
  bleibt die größte Schrift der Seite, sonst kämpfen zwei Sätze um denselben
  Rang.
- **Der Ecken-Tick oben links ist dafür entfallen.** Er saß bei `top-20` und lag
  ab `sm` mitten im Satz. Verschieben half nicht: Auf 1440 reicht der Satz von 32
  bis 115 px, auf 390 von 20 bis 62 — in einem der Formate stand er immer im Weg.
  Diese Ecke markiert jetzt der Text; unten rechts bleibt der Tick.

Den anderen Weg (Hero-Höhe von 78dvh kappen, damit der Textblock anreißt)
**nicht gehen**: Bei 68dvh wären oben 55 px statt 30 px weggeschnitten, und dort
sitzt die Gedankenblase mit dem Bierdeckel.

### Phase 05 „Die Antwort“ seit 30.09.2026

Antwortet auf den Schluss von 04 („die vielleicht naive Hoffnung: dass sich genug
Heilbronner finden …“). Aufbau: Zahl als H2 („N Leute machen mit.“), rechts „Die
Hoffnung war nicht naiv.“, dann Vereine/Betriebe, „Seitdem“ (Stammtisch, Rezept,
Probesud), „Alles da. Nur kein Ort.“ als Spiegel der Inventur aus 03, Schluss
„Wo brauen wir?“ — jede Phase endet mit einer Frage an der Kante.

- **Zahl und Vereine kommen live** von `https://mitmachen.tugaesser.de/stand.json`
  (Endpunkt im Repo `tugaesser-mitmachen`, `src/routes/stand.json/+server.ts`).
  Das HTML trägt einen Fallback mit Datum; schlägt der Abruf fehl, bleibt der
  stehen. Die einzige Anfrage an einen anderen Host als tugaesser.de — eigene
  Subdomain, eigener Server.
- **Leute = alle Einträge minus genannte Vereine/Betriebe.** Ungenannte Betriebe
  zählen bei den Leuten mit; eine getrennte Zahl würde sie verraten.
- **Keine Personennamen.** Die Einwilligung lautet „Dieser Name darf unten
  öffentlich in der Liste stehen“ — gilt für die Mitmachseite, nicht für diese.
  Eine Kopie hier bekäme außerdem keine Löschung mit.
- **Veraltet nach dem 03.10.2026:** „Der erste Probesud ist für Anfang Oktober
  angesetzt“. Nach dem Brautag umschreiben.
- Die Instagram-Folgen 5.2–7 (32 → 36 → 50) fasst die Website zu dieser einen
  Phase zusammen — bewusste Abweichung von „dieselben Phasen“.

### Design System ab Phase 05 (seit 30.09.2026)

Ab der Wortmarke steht die Seite im **Tugässer Design System 2.1.3**
([design-system.tugaesser.de](https://design-system.tugaesser.de/)): Weiß,
`tg-blue` #013565, `tg-brick` #7A1618, Public Sans. **Davor bleibt alles alt**
(Nacht, Creme, Inter Tight, Mono) — der Bruch ist erzählt: oben der geträumte
Bierdeckel, hier die echte Marke, weil die Leute da sind.

| Was | Wo |
|---|---|
| Verlauf Seitengrund → Weiß, 75dvh, ohne Text | `[data-zeichen-verlauf]` vor `#phase-05` |
| Wortmarke (ohne „74 BIER“), **Vektor-Nachzeichnung** ohne Ä-Punkte | `images/tugaesser-wortmarke-ohne-punkte.svg`, Original in `brand_assets/` |
| Logo setzt sich zusammen: leer, Punkte fliegen ein, dann Zoom 36 → 1 (exponentiell) | `src/input.css`, „Das Logo setzt sich zusammen“ |
| Bildmarke in der Kopfleiste, erst am Ende sichtbar | `images/tugaesser-bildmarke.jpeg`, `.leiste-logo` |
| Stufenloser Wechsel beider Leisten | `src/input.css`, „Der Wechsel ins Design System“ |
| Public Sans 400/800/900 | `fonts/public-sans.css`, **von Hand gepflegt**, nicht von `fetch-fonts.mjs` |

- **Farbe fließt, Schrift springt** — in der Mitte des Verlaufs. Gesteuert über
  einen registrierten Wert `--neu`; Kopfleiste über `animation-range: exit`,
  Aktionsleiste über `entry`, damit jede die Farbe hat, die hinter ihr liegt.
- **Ohne Scroll-Timeline** (Firefox, ältere Safari, reduzierte Bewegung) setzt
  das Skript `data-neu` hart. Geprüft mit emulierter reduzierter Bewegung.
- **Im Verlauf steht kein Text** — auf halbem Weg ist der Grund mittelgrau, dort
  hätte keine Schriftfarbe Kontrast.
- **Das Logo auf der Seite ist nachgezeichnet** (Potrace, 30.09.2026): 1,56 %
  der Logofläche weichen an den Kanten vom JPEG ab. Das JPEG (984 px) wäre beim
  Zoom unscharf. **Sobald Ralf eine SVG liefert, ersetzen** — die Ä-Punkte sind
  dann aus ihr zu übernehmen (heute Kreise, Mittelpunkte 418/613 und 451/613,
  r 14,5 in 984×799).
- **Der Kopfleisten-Link „05“ springt auf `#phase-05-logo`**, einen Anker am
  Bühnenende — dort steht das Logo fertig. Der Bühnenanfang ist leer; wer dort
  landet, sieht Weiß und scrollt nicht weiter. `#phase-05` bleibt als Phase für
  die Markierung in der Leiste.
- **Die Logo-Bühne ist 220dvh hoch** (Bild klebt, ~120dvh Bewegung). Während
  der Animation fehlen kurz die Punkte und das Logo ragt über den Rand — mit
  dem Auftraggeber so abgestimmt, Endzustand regelkonform.
- **Logo-Regeln aus dem DS:** nur auf Weiß, nicht einfärben, nicht beschneiden.
  Das Siegel trägt „74 BIER“, dessen Status offen ist — deshalb die Wortmarke.
- **Bildunterschrift „Mitgebracht von einem, der mitmacht.“ nennt bewusst keinen
  Namen** — Nennung und Rechte mit dem Gestalter sind nicht schriftlich.
- **Kopfleiste bei 320–1920 gemessen, 55 px hoch in beiden Fassungen.** Unter
  640 px ersetzt die Bildmarke den Schriftzug, unter 360 px entfällt er ganz
  (lief sonst 5 px über). Bei jeder Änderung an Leiste oder Einträgen alle
  Breiten neu messen.
- In 05: nichts unter 1rem, `tg-muted` nie als Textfarbe (2,5:1), leiser Text
  `tg-blue/70` (5,1:1). Typo-Rollen im Kommentar über `<section id="antwort">`.
- **Flächen und Kästen in 05** (auf Wunsch, „wirkt sehr eintönig“): Antwort auf
  Logo-Blau, Vereine als Kästen wie auf der Mitmachseite, Inventur als vier
  Kacheln (✓/✕ plus Screenreader-Text), Ortsaufruf auf Ziegelrot. Blau → Weiß →
  Rot = Stadtflagge. Die Anti-Karten-Regel gilt nur für 01–04.
- **Die Typoskala weiter unten gilt nur bis 04.**

### Vier Phasen seit 26.08.2026

Traum → Bestandsaufnahme → Die Idee → Mitmachen. Bis dahin trug „03“ beides: die
Idee samt Inventur **und** den Aufruf zum Eintragen. Das war ein Abschnitt mit
zwei Themen und ohne Schluss — die Kopfleiste versprach „Die Idee“, der Text
endete beim Anmeldeformular.

**Die Trennung folgt der Instagram-Serie, nicht einer Layout-Laune.** Dort sind es
zwei Posts: das Idee-Reel (`tugaesser-reel-03-die-idee.mp4`, Inventur „Name ✓
Idee ✓ Stadt ✓ / Rezept ? Kessel ? Ort ? Leute ?“ plus offener Aufruf) und der
Mitmach-Post. Website und Profil erzählen dieselben Phasen in derselben
Reihenfolge; wer beides sieht, soll dieselbe Gliederung wiedererkennen. Wer die
Phasen der Seite ändert, prüft `social_media_postserie.md` im Schwesterrepo mit.

Die Naht lag schon im Text: **„Wie kommen wir zusammen?"** war die zweite
Zwischenpointe und ist jetzt der Kapitelschluss von 03 — in Kapitelsatz-Größe an
der linken Kante wie „Muss das so bleiben?" in Abschnitt 02, aber **ohne Antwort
darunter**. Die Antwort ist das Bild der Mannschaft, das unmittelbar folgt. Ein
erklärender Absatz dort würde ihm die Arbeit abnehmen.

- **Abschnitt 04 heißt „Was fehlt, bringst du mit."** — der Satz kommt aus dem
  Idee-Reel und antwortet Zeile für Zeile auf die Inventur, mit der 03 schließt
  (kein Rezept, kein Kessel, kein Ort, keine Mannschaft). Nicht gegen etwas
  Allgemeines tauschen, der Rückbezug ist der ganze Witz.
- **Das Gruppenbild ist von 03 nach 04 gewandert.** Über der Inventur war es ein
  Widerspruch: Der Text sagt dort „keine Mannschaft, die das zusammen macht“,
  während das Bild genau diese Mannschaft zeigt. Die Tageszeitfolge Nacht →
  Dämmerung → Vormittag bleibt dabei intakt.
- **03 ist die einzige Phase ohne eigenes Bild.** Das ist eine offene Stelle,
  keine Gestaltungsabsicht. Sobald ein Motiv vorliegt: `<figure id="phase-03"
  data-phase class="scroll-mt-[55px] …">` davorsetzen, `loading="lazy"` plus
  `width`/`height` nicht vergessen, und `data-phase` samt `scroll-mt` von der
  `<section id="idee">` dorthin verschieben — der Link in der Kopfleiste zeigt
  dann auf `#phase-03` statt auf `#idee`.
- **Das Skript braucht dafür keine Änderung.** Es sammelt alle `[data-phase]` in
  DOM-Reihenfolge ein; ob das Element eine `<figure>` oder eine `<section>` ist,
  spielt keine Rolle.

**Abschnitt „04 Mitmachen" spricht seit 25.08.2026 in der Gegenwart.** Solange die
Mitmachseite Ausblick war, hieß es dort „In den nächsten Wochen bekommt diese
Seite zwei Dinge" und „Bis die Anmeldung steht, läuft alles über Instagram". Beides
ist überholt — die Marginalie heißt jetzt „Was jetzt geht" statt „Was kommt".
Wenn sich an der Mitmachseite etwas ändert, gehört dieser Abschnitt mitgeprüft.

**Die Phase hieß am 26.08.2026 für ein paar Stunden „03 Mitmachen".** Das war der
Versuch, den Namenskonflikt durch Umbenennen zu lösen, statt den Abschnitt zu
teilen — und er hat ihn nur verschoben: Unter dem Kicker „Mitmachen" stand dann
die Herkunftsgeschichte. Die Trennung in zwei Phasen ist die Lösung, das
Umbenennen war es nicht.

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
| Phasen-Kicker | `text-[13px]` mono | „01 Traumphase“ … „04 Mitmachen“ |
| Rail-Label | `text-[12px]` mono | Marginalie links („Damals“, „Heute“, „Anderswo“) |
| Fließtext | `clamp(1.125rem,1.7vw,1.375rem)` | **jeder** Absatz, ausnahmslos |
| Zwischenpointe | `clamp(1.85rem,3.6vw,2.9rem)` | die Sätze zwischen den Blöcken |
| Kapitelsatz | `clamp(2.25rem,5.2vw,4rem)` | H2 oben und „Muss das so bleiben?“ |

### Mono-Label: zwei Größen nach Rolle

- **11px = Seitenrahmen.** Kopfzeile, Bildunterschrift, Footer. Das ist Chrome,
  es soll leise sein.
- **12–13px = Inhalt.** Phasen-Kicker und Rail-Label gehören zum Text und tragen
  die Gliederung der Seite.

Dazu die Deckkraft: **nichts Textliches unter `cream/55`.** Vorher standen
Rail-Label und die Ziffern „01“/„02“ auf `cream/35` — auf dem Nachtblau ein
Kontrast von 2,91 und damit unter dem WCAG-AA-Minimum von 4,5. `cream/55` liegt
bei 5,58. Kurios war vor allem, dass die *Ziffer* blasser war als das Wort
daneben: Das Zählende war das Unsichtbarste an der Aufzählung.

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

## Phasenreihenfolge und Kopfleiste

Die Seite erzählt die Phasen **chronologisch**, parallel zur Instagram-Postserie:
oben der Traum bei Nacht, darunter die Bestandsaufnahme in der Dämmerung. Neue
Phasen kommen unten dazu; der Auftakt bleibt der Auftakt.

**Die Reihenfolge nicht umdrehen.** Der Blog-Reflex „das Neueste nach oben“ ist
am 13.08.2026 geprüft und verworfen worden. Blogposts sind unabhängige
Einzelstücke, diese Phasen sind Kapitel eines Arguments:

- Dieselbe Frau träumt oben nachts und denkt unten in der Dämmerung nach.
  Umgedreht liefe die Figur rückwärts durch ihre eigene Geschichte — und die
  wiederkehrende Figur ist das stärkste Mittel der Seite.
- Abschnitt 02 beginnt mit „Nach dem Traum“ und verweist damit nach oben.
- Das `og:image` zeigt das Auftaktmotiv. Wer den Link aus WhatsApp oder der
  Instagram-Bio anklickt, bekommt den Traum versprochen.

**Stattdessen löst die Kopfleiste das Problem.** Sie ist der Phasenindex: links
die Marke, in der Mitte die Phasen als Sprungmarken, rechts Ort und Uhrzeit. Ein
Klick führt zum Neuesten, die Erzählung bleibt in ihrer Reihenfolge.

- **Jede neue Phase braucht dort einen Eintrag.** Sonst wächst die Seite nach
  unten, ohne dass man sie erreicht — genau das Problem, das die Leiste löst.
- **Die Namen stehen erst ab `lg`, die Uhr erst ab `xl`.** Mit vier Phasen messen
  Marke, Einträge und Knopf bei 1024 px zusammen rund 870 px; mit der Uhr wären
  es 1000 und die Zeile bräche um. Vorher standen beide ab `sm` — das ging mit
  drei Phasen gerade noch. Bei einer fünften Phase ist diese Rechnung erneut
  fällig.
- Sprungziel ist das **Bild**, das die Phase eröffnet (`id="phase-NN"` plus
  `data-phase` auf der `<figure>`), nicht der Textabschnitt. Sonst überspringt
  der Sprung das Motiv.
- `scroll-mt-[3.25rem]` auf den Zielen: Die Leiste ist fixiert und 46px hoch,
  ohne Versatz landet das Bild darunter. Gemessen kommt es 6px unter der Leiste
  an. Wird die Leiste höher, muss der Wert mit.
- Die Markierung der aktuellen Phase läuft über `aria-current="true"`, gesetzt
  vom Skript und zugleich Hook für die Einfärbung (`aria-[current=true]:`).
  Kein zweiter Zustand in einer CSS-Klasse, der auseinanderlaufen könnte.
- **Bewusst Scrollposition statt IntersectionObserver:** Die Phasen sind mehrere
  Bildschirme hoch, also sind oft zwei gleichzeitig im Blick, und ein Observer
  müsste raten. Die Regel ist stattdessen eindeutig — es gilt die letzte Phase,
  deren Oberkante die Unterkante der Leiste passiert hat.
- Unterhalb `sm` stehen nur die Ziffern, und die Uhr entfällt: „01 Traumphase
  02 Bestandsaufnahme“ plus Marke plus Uhr passt bei 390px nicht in eine Zeile.
  Die Uhr ist Dekor, die Navigation nicht.

## Wo „Mach mit" steht — an beiden Orten

Der Knopf steht **oben in der Kopfleiste und unten in der Aktionsleiste**, auf
allen Geräten. Nicht entweder/oder: Der obere ist die Absicherung für den
unteren.

**Warum es den oberen gibt** (26.08.2026): Auf dem iPhone verschwand die untere
Leiste beim Scrollen und blieb weg. Am Gerät gemessen:

```
innerHeight      749
visual.height    749     ← identisch, Safari meldet keinen verdeckten Bereich
Leiste unten bei 749     ← sitzt exakt am gemeldeten Viewport-Ende
```

Safari meldet einen Viewport, der höher ist als das, was es anzeigt, und gibt die
Differenz über keine Schnittstelle heraus. Eine `visualViewport`-Korrektur stand
hier und ist wieder entfernt — sie konnte per Konstruktion nicht greifen. **Was
das Gerät nicht herausgibt, kann kein Skript ausgleichen.**

`fixed top-0` ist davon nicht betroffen; die Kopfleiste saß auf jedem Gerätefoto
korrekt. Der untere Balken bleibt also samt seiner iOS-Schwäche, und der obere
Knopf sorgt dafür, dass die Anmeldung trotzdem jederzeit erreichbar ist.

### Was am unteren Balken schon geprüft und ausgeschlossen ist

Damit niemand dieselben Wege noch einmal geht:

| Versucht | Ergebnis |
|---|---|
| `visualViewport`-Korrektur per Skript | wirkungslos — Safari meldet keine Differenz |
| `viewport-fit=cover` ergänzt | behebt einen echten Fehler, **löst das Problem aber nicht** |

`viewport-fit=cover` war trotzdem nötig: **Ohne diesen Zusatz im Viewport-Meta
liefert jedes `env(safe-area-inset-*)` schlicht 0.** Das
`pb-[env(safe-area-inset-bottom)]` an der Leiste war bis dahin wirkungslos,
obwohl der Kommentar daneben das Gegenteil behauptete. Aufgefallen beim Vergleich
mit `../sobw-lager`, wo die untere Leiste funktioniert.

**Nächster offener Verdacht, falls das Thema wieder aufkommt:** Die Leiste hat
`bg-night/85 backdrop-blur-md`. sobw-lager hat einen **deckenden** Hintergrund und
im ganzen Frontend **kein einziges** `backdrop-filter`. Auf iOS ist die
Kombination `position: fixed` + `backdrop-filter` dafür bekannt, beim Scrollen
nicht korrekt neu gezeichnet zu werden — was dazu passt, dass die Messwerte
tadellos aussahen: Die Leiste *ist* an der richtigen Stelle, sie wird nur nicht
dorthin gezeichnet. Ein Umschalter zum Durchprobieren war gebaut, der Test steht
noch aus. Preis einer Lösung wäre der Weichzeichner unter der Leiste.

Ebenfalls aus sobw-lager, falls die Leiste je umgebaut wird: Dort wandert sie auf
breiten Bildschirmen per Media-Query nach **oben** (`position: sticky; top: 0`).

**Den oberen Knopf nicht entfernen**, ohne den unteren auf einem echten iPhone zu
prüfen. Puppeteer und schmale Viewports zeigen den Fehler nicht — dort sieht die
Seite tadellos aus. Genau deshalb blieb er lange unbemerkt.

**Zusammengehörige Werte:** Die Kopfleiste ist mit Knopf überall 55 px hoch
(vorher 46). `pt-[55px]` am Auftaktbild und die drei `scroll-mt-[55px]` hängen
daran und müssen mitwandern, sonst liegt die Leiste auf dem Foto.

## Knopfform

- **Leicht abgerundet** (`rounded`, 4 px), seit 26.08.2026. Die Seite war vorher
  vollständig radiusfrei; das gilt weiter für alle Flächen, Rahmen und Bilder —
  **nur die Knöpfe und das Instagram-Zeichen sind ausgenommen.**
- **Kein Pfeil.** Am „Mach mit" saß rechts ein Pfeil nach rechts. Er ist entfernt:
  Er zeigt in keine Richtung, die es auf der Seite gibt, und trägt keine Aussage.
- **Unten sind beide Knöpfe gleich breit.** „Mach mit" und „Folg uns" teilen sich
  die Zeile hälftig (`flex-1`), ab `md` beide `min-w-[190px]`. Auf 390 px bleiben
  rechnerisch 2 px Differenz durch Subpixel-Rundung — optisch nicht zu sehen.
  Damit „Mach mit" dort nicht über seinen Anteil hinauswächst, sind Innenabstand
  und Laufweite auf schmalen Bildschirmen kleiner (`px-3`, `tracking-[0.12em]`).
- **„Folg uns" trägt immer Text und Zeichen.** Vorher schrumpfte er unter `md`
  auf ein 52×52-Symbol. Das Instagram-Zeichen hat abgerundete Ecken
  (`rx="5.4"`) — ohne sie war es ein Kasten mit Kreis, nicht wiedererkennbar.

## Aktionsleiste unten

Das Gegenstück zur Kopfleiste: eine fixierte Leiste am unteren Rand mit der
Handlung. Vorher stand der Knopf nur in Abschnitt 01 und war ab der
Bestandsaufnahme aus dem Blick — wer den ganzen Text las, hätte zum Handeln
zurückscrollen müssen. Die Seite hat ein Ziel, und das gehört erreichbar.

**Seit 25.08.2026 heißt dieses Ziel „Mach mit", nicht mehr „Follower".** Die
Mitmachseite unter `mitmachen.tugaesser.de` steht; der Eintrag dort ist die
Handlung, um die es geht. Instagram ist die zweite Wahl und bleibt sichtbar,
tritt aber optisch zurück.

- **Gefüllt rot, nicht umrandet — und zwar „Mach mit".** Rot ist der einzige
  Akzent der Seite und wird sparsam gesetzt; die eine Handlung, um die es geht,
  ist genau der Platz dafür. Instagram steht daneben umrandet.
- **Plastisch, nicht flach.** Verlauf `from-brand-500 to-brand-700`, eine helle
  Kante innen oben und eine dunkle innen unten, dazu ein geworfener Schatten.
  Beim Drücken sinkt er ein. Ein Pfeil rechts macht sichtbar, dass es weitergeht.
  Das ist der **einzige** Knopf der Seite mit dieser Behandlung — sonst wäre es
  kein Signal mehr.
- **Der Verlauf beginnt bei brand-500, nicht bei brand-400.** Auf `brand-400`
  kommt cream nur auf 3,01:1 und fällt unter das WCAG-AA-Minimum von 4,5. Auch
  brand-500 liegt mit 4,65:1 nur knapp darüber — **die Fläche hat nach oben
  keinen Spielraum**, der Hover kann nicht über Aufhellen gehen.
- **Der Hover kehrt die Farben um** (seit 26.08.2026): Fläche wird `cream`,
  Schrift wird `brand-700`, 7,97:1. Der Knopf wird für den Moment zum
  Bierdeckel-Papier. Kein Weichzeichner, kein Hub — der Farbwechsel ist das
  Signal, und er schaltet hart um: Die Transition umfasst absichtlich nur
  `transform` und `box-shadow`.

  **Zwei verworfene Wege, damit sie nicht wiederkommen.** Erst hob sich der
  Knopf um 1 px und ein schwarzer Schlagschatten wuchs — auf `night` ist das
  dunkel auf dunkel, im Screenshot-Vergleich war praktisch **kein Unterschied**
  zu sehen. Dann ein weicher Schein in Markenrot: deutlich sichtbar, aber ein
  Fremdkörper. Auf einer Seite ohne einen einzigen Radius, mit harten Kanten und
  Mono-Versalien, gehört keine diffuse Leuchtwolke.

  **Die Lehre für den nächsten Effekt hier:** „deutlich" und „passend" sind zwei
  Prüfungen, nicht eine. Der Screenshot beantwortet nur die erste. Für die
  zweite hilft, die Kandidaten nebeneinanderzulegen — dort fällt sofort auf, was
  nicht dazugehört.
- **Hover und Tastaturfokus bleiben unterscheidbar.** Beim Hover wird die
  **Fläche** cream, beim Fokus nur ein abgesetzter Rahmen um die weiterhin rote
  Fläche. Am Screenshot geprüft.
- **Unter `md` schrumpft Instagram auf sein Symbol** (52×52). „Mach mit" und
  „Folg uns auf Instagram" nebeneinander passen bei 390px nicht in eine Zeile,
  und untereinander wäre die Leiste doppelt so hoch — dann deckt sie den Text
  zu, den sie überlagert.
- **Sie steht von Anfang an** (seit 25.08.2026). Vorher fuhr sie erst ein, wenn
  `#phase-01` durchgescrollt war — mit dem Argument, ein Handlungsaufruf habe
  keinen Zug, bevor jemand weiß, worum es geht. Seit der Zeitungsartikel Leute
  herschickt, stimmt die Annahme nicht mehr: Wer kommt, weiß es schon. Der Preis
  ist, dass sie den unteren Rand des Hero-Motivs überlagert; bewusst in Kauf
  genommen. Der IntersectionObserver ist ersatzlos entfallen.
- **In Abschnitt 01 steht nur noch Instagram.** Dort stand kurzzeitig auch ein
  „Mach mit" — als Ausgleich dafür, dass die Leiste erst später einfuhr. Seit sie
  von Anfang an steht, lägen auf dem Handy beide Knöpfe direkt übereinander.
  Nicht wieder einbauen, ohne vorher am 390px-Screenshot zu prüfen.
- **„Mach mit" steht an genau zwei Stellen: oben und unten, beide fixiert.**
  Ein dritter stand bis zum 26.08.2026 am Ende von Abschnitt 04, mit dem
  Argument, der Abschluss der Argumentation sei der stärkste Ort für die
  Handlung. Das stimmte — bis der Knopf zusätzlich in die Kopfleiste kam: Am
  Seitenende standen dann alle drei gleichzeitig im Bild. Dreimal dieselbe
  Handlung auf einem Bildschirm ist keine Betonung mehr, sondern Rauschen.
  Nicht wieder einbauen, ohne den Seitenschluss im Screenshot zu prüfen.
- **Zwei reichen, weil beide fixiert sind.** Der Daumen liegt am Handy mal oben,
  mal unten; erreichbar ist die Anmeldung dadurch auf jeder Scrollposition. Auf
  iOS rutscht die untere Leiste beim Scrollen weg (siehe oben) — der obere Knopf
  ist dort die Absicherung und damit noch wichtiger als vorher.
- **Der Footer hat `pb-32`, nicht `py-5`.** Sonst deckt die Leiste den
  KI-Transparenzhinweis zu — ausgerechnet den Text, der sichtbar sein muss. Bei
  52px Knopfhöhe plus `py-3` ist die Leiste 76px hoch, es bleiben 52px Luft.
  Wird sie höher, muss der Wert mit.
- **`pb-[env(safe-area-inset-bottom)]`**: Auf iPhones ohne Knopf läge die Leiste
  sonst unter dem Home-Indikator.
- Die Leiste braucht **kein JavaScript** mehr und steht auch ohne im HTML.

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

## Bewegung beim Scrollen

Seit 26.08.2026 hat die Seite drei scroll-gebundene Effekte. **Alle liegen in
`src/input.css` und sind dort ausführlich begründet** — mit Messwerten, mit den
Sackgassen, die davor standen, und mit den Grenzen, die nicht überschritten
werden dürfen. Wer daran arbeitet, liest zuerst dort.

| Was | Wo | Kurz |
|---|---|---|
| Der Satz auf dem Auftaktbild bleibt zurück | `[data-parallax-satz]` | 72 px über den Scrollweg |
| Zeilen großer Sätze richten sich aus | `[data-zeilen]` | gestaffelt bis 46 % der Zeilenbreite, endet bündig |
| Der Grund wird heller | `body::before` (nur `opacity`) | `#0A0D14` → `#0E2143` linear über die Seite |

Gemeinsame Bauweise, die für jeden weiteren Effekt gelten soll:

- **CSS-only über `animation-timeline`**, kein Scroll-Handler. Die Bewegung liegt
  im Compositor, es gibt kein Zurückrechnen pro Scroll-Ereignis.
- **`@supports (animation-timeline: …)` um jeden Effekt.** Wo der Browser das
  nicht kennt, steht die Seite still wie vorher — nicht kaputt, nur ruhig.
- **`prefers-reduced-motion: no-preference` um jeden Effekt**, die Aufhellung
  eingeschlossen.
- **`view()` misst gegen den nächsten Scrollport.** Ein `overflow: hidden` im
  Elternpfad hängt die Timeline still um — beim ersten Parallax-Versuch stand
  der Fortschritt darum messbar konstant bei 0,5. `clip` erzeugt keinen
  Scrollport und ist deshalb das Mittel der Wahl, wenn etwas abgefangen werden
  muss.
- **Kein `0%` in `animation-range`.** cssnano kürzt es zu `0`, und Chrome parst
  den Bereich dann nur halb.

### Die Fotos bewegen sich nicht, und das bleibt so

Der naheliegendste Parallax — das Bild langsamer als die Seite — ist gebaut,
gemessen und wieder entfernt worden. Bei ±15 % Ausschlag:

| Bild | Ruhelage | Endlage | Ergebnis |
|---|---|---|---|
| 01 Auftakt | 28 % | 43 % | Gedankenblase oben angeschnitten |
| 02 Dämmerung | 25 % | 40 % | „Tugässer“ auf der linken Fahne weg |
| 04 Gruppe | 62 % | 47/77 % | unkritisch |

Der sichere Weg beträgt rund vier Prozentpunkte, das sind bei 1440×900 etwa
5 px — unsichtbar. Mehr gäbe es nur über eine Überhöhung des Bildes, und weil
`object-cover` auf die Höhe skaliert, kostet die direkt Bildbreite. **Wer den
Effekt auf den Fotos will, braucht andere Bilder mit mehr Rand, nicht anderen
Code.**

### Die Aufhellung hat eine harte Grenze

Zielfarbe ist `#0E2143` (navy-800 aus der Markenpalette). Weiter geht es nicht,
ohne WCAG AA zu verlieren: Der limitierende Wert ist `cream/55` und liegt dort
bei 5,12:1, auf navy-700 bei 4,75, auf `#223454` nur noch bei 4,45. **Wer die
Zielfarbe aufhellt, rechnet cream/55 gegen den neuen Grund nach.**

Daraus folgt zweierlei:

- **`bg-night` am `<body>` ist nur noch Startwert und Fallback**, nicht mehr die
  Farbe der ganzen Seite.
- **Die Leisten wandern nicht mehr mit** — fester Mittelton `#0C172C` bei 70/85 %
  Deckkraft. Ihre eigene Farbanimation kostete die Hälfte der Style-Arbeit.

### Ruckeln — gemessen, nicht geschätzt (30.09.2026)

Chrome-Trace, 390 px, ganze Seite durchgescrollt, Live-Stand gegen neu:

| | vorher | nachher |
|---|---|---|
| Paint | 193 ms | 56 ms |
| Raster | 128 ms | 42 ms |
| Style (`UpdateLayoutTree`) | 111 ms | 209 ms (Leistenwechsel) |

- **Nie `background-color` scrollgebunden animieren** — malt jeden Frame die ganze
  Fläche neu. `opacity` auf einer eigenen Ebene läuft im Compositor.
- **Nie eine vererbte Custom Property am `<body>` animieren** — jeder Frame
  rechnet dann die Styles der ganzen Seite neu.
- Headless-Chrome deckelt auf 60 fps; Frame-Abstände sagen dort nichts. Trace
  lesen (`Paint`, `UpdateLayoutTree`, `RasterTask`).
- **Safari ist ungemessen.** Das Ruckeln fiel am Gerät auf; ob es dort weg ist,
  zeigt nur ein echtes iPhone/Safari.

## Design-Richtung

**Stark, editorial, Swiss-industrial** — die Referenz sind Entwickler-Werkzeuge
wie Linear oder Vercel, nicht Gastro-Websites. Konkret heißt das hier:

- **Das Foto ist eine eigene Fläche, kein Hintergrund.** Es wird nicht
  abgedunkelt, nicht überblendet, nicht behandelt — und es bewegt sich beim
  Scrollen nicht, siehe „Bewegung beim Scrollen“. Das war eine ausdrückliche
  Korrektur — nicht zurückdrehen. **Eine einzige Ausnahme:** der Satz „Ein Bier
  aus Heilbronn. Für Heilbronn." auf dem Auftaktbild, oben begründet. Er liegt
  auf dem Foto, aber das Foto bleibt darunter unverändert — der Text trägt seine
  Lesbarkeit selbst.
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

- **Logo und Styleguide gibt es seit September**: Design System 2.1.3, siehe
  „Design System ab Phase 05“. `brand_assets/` bleibt trotzdem leer.
- Farben und Fonts der Abschnitte 01–04 in `tailwind.config.js` sind weiter
  **provisorisch**: die
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

Kanonische Domain: **tugaesser.de**, Registrar INWX, DNS bei Cloudflare.
`tugässer.de` (im DNS `xn--tugsser-7wa.de`) leitet per dauerhaftem Redirect
darauf weiter. Der Markenname bleibt „Tugässer“.

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
- **OG-Bild seit 30.09.2026 wie der Auftakt:** Claim links auf Tiefblau,
  rechts Standbild `images/og-zapfanlage.jpg` (Sekunde 3 der Zapfanlage — ohne
  Lindr-Logo, ohne Kreideschrift fremder Biere). Keine Live-Zahl, weil gecacht.
  URL trägt `?v=` — bei neuem Bild hochzählen, sonst hält Facebook das alte.
- **`og:description` sagt seit 26.08.2026 die Sache, das OG-Bild bis 30.09.2026
  den Traum.** In der Beschreibung stand „Man wird ja wohl noch träumen dürfen." —
  schön, aber in einer WhatsApp-Vorschau erfährt so niemand, worum es geht. Jetzt
  steht dort der Dreisatz aus dem Auftakt. Das Bild trägt weiterhin den Claim;
  zusammen ergibt das Stimmung plus Auskunft. Wer beides gleichschaltet, verliert
  eins von beidem.
- Die Domain steht in allen Meta-Tags als **ASCII** (`tugaesser.de`). So ist sie
  leicht zu tippen und funktioniert zuverlässig in Vorschauen und Crawlern.
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

**Die Bildmarke, weiß auf Logo-Blau** (seit 30.09.2026). Quelle ist
`brand_assets/tugaesser-bildmarke-maske.png` (Alphamaske aus dem DS-Favicon);
`PORT=3001 node generate-icons.mjs` schreibt daraus `favicon.svg`,
`favicon-32.png` und `apple-touch-icon.png`. **`favicon.svg` nicht von Hand
bearbeiten.** Farben stehen oben im Skript.

- **Nicht rot auf blau.** War gewünscht; #7A1618 gegen #013565 hat ~1,15:1
  Kontrast, bei 16/32 px war das Zeichen in beiden Richtungen weg.
- Apple-Icon auf vollem Blau: iOS füllt transparente Ecken schwarz.
- Nach Änderung `?v=` an den drei `<link>`-Tags hochzählen — Favicons werden
  besonders lange gecacht.

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

## Social-Media-Produktion liegt nicht hier

Vorlagen und Generatoren für Instagram-Posts und Reels stehen im privaten
Schwesterrepo unter
`../its_my_life/projects/Ventures/project_tugaesser/instagram_produktion/`.

Dieses Repo ist öffentlich und wird über GitHub Pages ausgeliefert. Weder die
Heilbronn-Fotos noch das Produktionsmaterial gehören in ein öffentliches
Webverzeichnis — sie waren kurzzeitig hier und wurden am 14.08.2026 samt
Historie entfernt. Nicht zurückholen.

Die einzige verbleibende Verbindung zu Instagram ist der Link auf das Profil
(Abschnitt 01 und Aktionsleiste unten).

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
- **Hover-Zustände greifen nur mit Zeiger** (`future.hoverOnlyWhenSupported`,
  seit 26.08.2026). Ohne das bleibt auf Touch-Geräten der Hover nach dem
  Antippen kleben, bis woanders getippt wird — der „Mach mit"-Knopf stünde also
  cremefarben da. Unbedenklich, solange **kein Hover Information trägt**: Es
  gibt derzeit kein Element, das erst beim Zeigen erscheint; alle Hover-Zustände
  sind Farbe, Rahmen oder ein 4-px-Pfeilversatz. **Wer einen Hover ergänzt, der
  etwas ein- oder ausblendet, macht ihn auf dem Handy unerreichbar.** Gegen
  beide Gerätearten geprüft, indem `hover: none` und `pointer: coarse` emuliert
  wurden — ein schmaler Viewport allein prüft das nicht, der meldet weiterhin
  einen Zeiger.
- **Besuchte Links vertragen kein `color-mix(… var() …)`** (Chrome, gemessen
  30.09.2026). Wer schon auf der Mitmachseite war, sah „Mach mit“ blau auf
  Ziegelrot — die Schrift fiel auf die geerbte Farbe zurück. Das gilt für den
  Link **und alles darin**. Lösung: Mischung in die registrierte `<color>`-
  Eigenschaft `--lf` rechnen, `color: var(--lf)` am Kind. Am `<a>` selbst keine
  gemischten `color`/`background-color`/`border-color`/`outline-color`.
  **Puppeteer zeigt das nur mit `userDataDir` und wenn der Link von der Seite
  aus geklickt wurde** — sonst sieht alles richtig aus.
- **`overflow-clip-margin` kennt Safari nicht.** Wer mit `overflow: clip` etwas
  abfängt, kappt dort die Unterlängen — auf dem iPhone waren „gebrodelt.“ und
  „bringst du mit.“ unten abgeschnitten, während Chrome alles korrekt zeigte.
  Die Clip-Box stattdessen über `padding-bottom` plus negativen `margin-bottom`
  vergrößern: Das wirkt in jedem Browser und lässt das Layout unverändert.
  **Ein Puppeteer-Lauf beweist bei Clipping nichts über Safari** — Chrome füllt
  die Lücke mit einer Eigenschaft, die es dort nicht gibt.
- **`clip-path` ersetzt `overflow: clip` nicht.** Es schneidet nur die
  Darstellung; der Layout-Overflow bleibt und erzeugt weiter einen
  Querscrollbalken. Gemessen: 81 px bei 390, 226 px bei 1440.
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
