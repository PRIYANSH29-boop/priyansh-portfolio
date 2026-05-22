import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050507",
          900: "#0a0a0d",
          800: "#101015",
          700: "#16161d",
          600: "#1d1d27",
          500: "#26262f",
          400: "#3a3a45",
          300: "#5a5a68",
          200: "#a0a0b0",
          100: "#dcdce4",
        },
        accent: {
          DEFAULT: "#5b8cff",
          electric: "#3d7bff",
          glow: "#7ba6ff",
          deep: "#1e3a8a",
          soft: "#a8c0ff",
        },
        signal: {
          green: "#3effc4",
          red: "#ff4d6d",
          amber: "#ffb84d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 9vw, 8.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 6.5vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
      },
      backgroundImage: {
        "mesh-radial":
          "radial-gradient(at 20% 10%, rgba(91,140,255,0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(62,255,196,0.08) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(91,140,255,0.12) 0px, transparent 50%)",
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(5,5,7,0.85) 70%, #050507)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "orbit": "orbit 20s linear infinite",
        "scan": "scan 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(0.5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "blur(20px)" },
          "50%": { opacity: "1", filter: "blur(30px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(40px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(40px) rotate(-360deg)" },
        },
        scan: {
          "0%, 100%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(100%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
