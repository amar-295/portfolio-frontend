"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const reveal: Variants = {
  hidden: { opacity: 0.98, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function SectionReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      variants={reveal}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
