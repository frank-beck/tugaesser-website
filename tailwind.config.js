// Farben sind PROVISORISCH: aus images/tugaesser-rathaus-hero-1600x900.png
// abgetastet (Bierdeckel, Nachthimmel, Bier) und um das warme Nachtlicht
// korrigiert. Sobald echte Brand-Assets in brand_assets/ liegen, hier durch die
// verbindlichen Werte ersetzen. Siehe CLAUDE.md → Brand Assets.
module.exports = {
  content: ['./index.html'],
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
      fontFamily: {
        // Ebenfalls provisorisch – Hausschriften stehen noch aus.
        // Anführungszeichen zwingend: ein Familienname mit Ziffer ist unquoted
        // CSS-ungültig, sonst verwirft der Browser die ganze Deklaration.
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['Figtree', 'system-ui', 'sans-serif'],
      },
    },
  },
};
