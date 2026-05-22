"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type Variant = "primary" | "ghost";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
};

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  // Raw cursor offset from button center, in px
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-smoothed transform on the outer element
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  // Inner content drifts less than the shell — gives a soft parallax
  const cx = useTransform(sx, (v) => v * 0.5);
  const cy = useTransform(sy, (v) => v * 0.5);

  // Local cursor coords for the inner shine (% of button box)
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);

  const shineColor =
    variant === "primary"
      ? "rgba(255,255,255,0.28)"
      : "rgba(91,140,255,0.22)";

  const shineBg = useTransform(
    [shineX, shineY] as any,
    ([px, py]: [number, number]) =>
      `radial-gradient(140px circle at ${px}% ${py}%, ${shineColor}, transparent 60%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - (rect.left + rect.width / 2);
    const py = e.clientY - (rect.top + rect.height / 2);
    x.set(px * strength);
    y.set(py * strength);
    shineX.set(((e.clientX - rect.left) / rect.width) * 100);
    shineY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    shineX.set(50);
    shineY.set(50);
  };

  const base = `${variantClass[variant]} ${className} group relative overflow-hidden`;

  const inner = (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: shineBg }}
      />
      <motion.span
        className="relative inline-flex items-center gap-2"
        style={{ x: cx, y: cy }}
      >
        {children}
      </motion.span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: sx, y: sy }}
        className={base}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={base}
    >
      {inner}
    </motion.button>
  );
}
