"use client";

import { motion, type Variants } from "framer-motion";

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.05 + i * 0.07,
    },
  }),
};

export function RevealText({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const MotionTag = motion.create(Tag as any);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.08em]"
          style={{ marginRight: "0.28em" }}
        >
          <motion.span
            className="inline-block"
            custom={i + delay * 10}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 16,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
