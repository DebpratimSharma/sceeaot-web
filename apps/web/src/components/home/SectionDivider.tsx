"use client";

import { motion } from "framer-motion";

export interface SectionDividerProps {
  className?: string;
  lineClassName?: string;
  badgeClassName?: string;
}

export function SectionDivider({
  className = "",
  lineClassName = "",
  badgeClassName = "",
}: SectionDividerProps) {
  return (
    <div
      className={`relative my-8 flex w-full items-center justify-center md:my-12 ${className}`}
    >
      {/* Horizontal Line animating from center */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`h-px w-full origin-center bg-[var(--line)] ${lineClassName}`}
      />

      {/* Rotating Plus Icon Container */}
      <motion.div
        className={`absolute bg-[var(--background)] px-3 text-[14px] leading-none text-[var(--foreground)] select-none ${badgeClassName}`}
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="inline-block cursor-pointer font-light"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          whileHover={{ scale: 1.3, rotate: 450, transition: { duration: 0.4 } }}
          aria-hidden="true"
        >
          +
        </motion.span>
      </motion.div>
    </div>
  );
}
