"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

// Entrance easing per spec: fade + rise, cubic-bezier(.22,.61,.36,1).
const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Stagger container — animates its <StaggerItem> children in sequence
 * (~0.1s apart) on mount. Respects prefers-reduced-motion (renders instantly,
 * no movement).
 */
export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: EASE },
    },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
