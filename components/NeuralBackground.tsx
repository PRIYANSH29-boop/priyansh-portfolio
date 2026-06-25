"use client";

// Subtle ML-flavoured ambient background: a faint drifting "neural graph"
// (nodes + edges) with slowly floating ML symbols (∇, Σ, σ, argmax, …) layered
// over it. Deliberately low-contrast so it never competes with content. Fixed,
// behind everything, non-interactive. Honors prefers-reduced-motion (one static
// frame, no loop).

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };
type Glyph = { x: number; y: number; vx: number; vy: number; size: number; ch: string };

const SYMBOLS = [
  "∇", "Σ", "σ", "θ", "λ", "∂", "μ", "π", "∫", "≈", "α", "β", "√", "∈", "R²",
  "argmax", "softmax", "ReLU", "∇L", "P(y|x)", "w·x", "ŷ",
];

export function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let glyphs: Glyph[] = [];
    const LINK = 150;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nodeCount = Math.min(40, Math.round((w * h) / 32000));
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));

      const glyphCount = Math.min(16, Math.max(7, Math.round(w / 130)));
      glyphs = Array.from({ length: glyphCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: 15 + Math.random() * 26,
        ch: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(154,91,51,${0.28 * (1 - d / LINK)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = "rgba(74,55,40,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      // floating ML symbols
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const g of glyphs) {
        ctx.font = `italic ${g.size}px Georgia, 'Times New Roman', serif`;
        ctx.fillStyle = "rgba(74,55,40,0.26)";
        ctx.fillText(g.ch, g.x, g.y);
      }
    };

    const move = (p: { x: number; y: number; vx: number; vy: number }) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -40) p.x = w + 40;
      if (p.x > w + 40) p.x = -40;
      if (p.y < -40) p.y = h + 40;
      if (p.y > h + 40) p.y = -40;
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (const g of glyphs) move(g);
      draw();
      raf = requestAnimationFrame(step);
    };

    seed();
    if (reduce) draw();
    else raf = requestAnimationFrame(step);

    const onResize = () => {
      seed();
      if (reduce) draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-100"
    />
  );
}
