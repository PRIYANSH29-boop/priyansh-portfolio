import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorGlow } from "@/components/CursorGlow";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BootSequence } from "@/components/BootSequence";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Priyansh — AI/ML Engineer · Intelligent Systems",
  description:
    "Building intelligent systems. Machine learning, deep learning, LLMs, RAG, fraud detection, and stock intelligence research.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Priyansh — AI/ML Engineer",
    description: "ML · DL · LLM · RAG · Quant Systems · AI Research",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="bg-ink-950 text-ink-100 antialiased cursor-glow-bg">
        <BootSequence />
        <AmbientBackground />
        <CursorGlow />
        <SmoothScroll>
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
