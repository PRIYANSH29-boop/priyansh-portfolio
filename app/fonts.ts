import localFont from "next/font/local";

// Body face — Inter, self-hosted variable.
export const sans = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

// ---- Display face A/B candidates (all map to --font-display) ----------------
// NOTE: next/font statically analyzes these options — every value must be an
// inline literal (no shared variables), hence the repeated fallback arrays.
const fraunces = localFont({
  src: "./fonts/Fraunces-Variable.woff2",
  variable: "--font-display",
  weight: "300 700",
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});

const newsreader = localFont({
  src: "./fonts/Newsreader-Variable.woff2",
  variable: "--font-display",
  weight: "300 700",
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});

const grotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-display",
  weight: "300 700",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const displayFonts = { fraunces, newsreader, grotesk } as const;

// A/B SWITCH — change this one value and reload to compare headings.
export const DISPLAY_FONT: keyof typeof displayFonts = "newsreader";

export const display = displayFonts[DISPLAY_FONT];
