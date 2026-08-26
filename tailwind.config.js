// Farben sind PROVISORISCH: aus images/tugaesser-rathaus-hero-1600x900.png
// abgetastet (Bierdeckel, Nachthimmel, Bier) und um das warme Nachtlicht
// korrigiert. Sobald echte Brand-Assets in brand_assets/ liegen, hier durch die
// verbindlichen Werte ersetzen. Siehe CLAUDE.md → Brand Assets.
module.exports = {
  content: ['./index.html'],
  // Hover-Zustaende nur dort, wo es einen Zeiger gibt. Ohne das haengt auf
  // Touch-Geraeten nach dem Antippen der Hover-Zustand fest, bis woanders
  // getippt wird — der "Mach mit"-Knopf bliebe also cremefarben stehen.
  //
  // Unbedenklich, weil kein Hover auf dieser Seite Information traegt: Es gibt
  // kein Element, das erst beim Zeigen erscheint. Alle Hover-Zustaende sind
  // Farbe, Rahmen oder ein 4-px-Versatz des Pfeils. Faellt das auf dem Handy
  // weg, fehlt nichts.
  //
  // **Vor dem Ergaenzen eines Hovers, der etwas ein- oder ausblendet, hier
  // zurueckdenken** — der waere auf Touch dann unerreichbar.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // Signalrot vom Bierdeckel ("Bier")
        brand: {
          50: '#FDF3F2',
          100: '#FBE3E1',
          200: '#F6C5C1',
          300: '#EE9A93',
          400: '#E06359',
          500: '#C8322A',
          600: '#A82720',
          700: '#8A201A',
          800: '#6B1914',
          900: '#4D120F',
        },
        // Tiefblau vom Bierdeckel ("Heilbronn")
        navy: {
          50: '#F0F4FB',
          100: '#DCE6F5',
          200: '#B9CCEB',
          300: '#8AA9DA',
          400: '#4E77B4',
          500: '#1B3F80',
          600: '#16346B',
          700: '#122A57',
          800: '#0E2143',
          900: '#0A1730',
        },
        cream: '#F4EFE7', // Bierdeckel-Papier
        night: '#0A0D14', // Nachthimmel überm Rathaus
        gold: '#C89A3C', // Bier im Glas
        sandstone: '#A08A63', // Rathaus-Fassade
      },
      // Scroll-Hinweis: sinkt leicht ab und wird dabei heller. Bewusst nur
      // opacity und transform, damit es auf jeder Karte flüssig läuft.
      keyframes: {
        nudge: {
          '0%, 100%': { opacity: '0.22', transform: 'translateY(-2px)' },
          '50%': { opacity: '0.75', transform: 'translateY(2px)' },
        },
      },
      animation: {
        nudge: 'nudge 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        // Ebenfalls provisorisch – Hausschriften stehen noch aus.
        // Grotesk für Display und Fließtext, Mono für Labels und Messwerte:
        // die Trennung trägt hier die Mono, nicht ein Serif/Sans-Kontrast.
        display: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
};
