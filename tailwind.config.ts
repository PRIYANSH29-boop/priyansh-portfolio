import type { Config } from "tailwindcss";

/**
 * Lean, editorial design system.
 * - Near-black background, graphite neutral ramp, ONE subtle accent.
 * - Restrained type scale. No mesh gradients, noise, or decorative animation.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm editorial "paper" palette.
        paper: "#F5EFE6", // page background
        surface: "#FFFFFF", // card surface
        wash: "#ECE3D6", // faint inset (code blocks, placeholders)
        line: "rgba(74,55,40,0.14)", // hairline borders
        ink: {
          DEFAULT: "#2E2622", // primary text
          muted: "#6B5D52", // secondary text
          faint: "#8A7A6C", // labels / tertiary
        },
        // Brown is INK, not fill. The single accent: terracotta — links, focus
        // rings, featured card border. Used sparingly.
        accent: "#9A5B33",
        // Primary button fill (dark roast brown).
        espresso: "#4A372A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5.5vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 2.6vw, 2.25rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "overline": ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        shell: "72rem", // page content width
        prose: "65ch", // readable measure for project writeups
      },
      spacing: {
        section: "6rem",
        "section-lg": "9rem",
      },
      borderColor: {
        DEFAULT: "rgba(74,55,40,0.14)",
      },
      boxShadow: {
        // Warm, low shadows — brown-tinted, never black.
        card: "0 1px 2px rgba(74,55,40,0.05), 0 10px 24px -14px rgba(74,55,40,0.20)",
        lift: "0 1px 2px rgba(74,55,40,0.05), 0 22px 40px -18px rgba(74,55,40,0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
