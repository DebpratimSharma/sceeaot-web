"use client";

import { motion } from "framer-motion";
import { AnimatedButton } from "./AnimatedButton";

export function StatementSection() {
  return (
    <section className="flex min-h-full flex-col justify-between px-7 pt-20 pb-8 md:px-12 md:pt-24 md:pb-10 lg:px-16 lg:pt-28 lg:pb-12 max-[700px]:px-[18px] max-[700px]:pt-20 max-[700px]:pb-6">
      {/* Upper Horizontal Section */}
      <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-[160px_1fr] md:gap-10 lg:grid-cols-[220px_1fr] md:pt-4">
        {/* Left: About Label */}
        <div className="pt-2 text-[10px] font-medium tracking-[0.1em] text-[var(--ink-muted)] uppercase md:text-[11px]">
          ABOUT
        </div>

        {/* Right: Longer Statement Heading */}
        <div className="max-w-[980px]">
          <h2 className="m-0 text-[clamp(36px,5.2vw,72px)] font-normal leading-[1.0] tracking-[-0.045em] text-[var(--foreground)]">
            We are a community where people, ideas, and experiences come together to create something more.
          </h2>
        </div>
      </div>

      {/* Animated Divider with Rotating Plus Icon in the Middle */}
      <div className="relative my-8 flex w-full items-center justify-center md:my-12">
        {/* Horizontal Line animating from center */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-full origin-center bg-[var(--line)]"
        />

        {/* Rotating Plus Icon Container */}
        <motion.div
          className="absolute bg-[var(--background)] px-3 text-[14px] leading-none text-[var(--foreground)] select-none"
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

      {/* Lower Horizontal Section: Left & Right */}
      <div className="grid grid-cols-1 items-start gap-8 pb-4 md:grid-cols-2 md:gap-16 md:pb-6">
        {/* Lower Left: Slogan */}
        <div>
          <p className="m-0 text-[9px] font-semibold leading-[1.6] tracking-[0.08em] text-[var(--foreground)] md:text-[10px]">
            WE CONNECT. WE EXPLORE.
            <br />
            WE CREATE. WE GROW.
          </p>
        </div>

        {/* Lower Right: Description & Underlined View Events Link */}
        <div className="flex flex-col items-start md:pl-8 lg:pl-48">
          <p className="m-0 max-w-[420px] text-[12px] leading-[1.55] text-[var(--ink-muted)] md:text-[13px]">
            Our mission is to make every initiative count, as a chance to learn something new, meet someone different, or experience something memorable.
          </p>

          <AnimatedButton
            href="#events"
            className="mt-6 w-full max-w-[210px] pb-1.5 text-[10px] md:text-[11px] font-medium tracking-[0.08em] text-[var(--foreground)] hover:text-[var(--foreground)]"
            underlineClassName="bg-[var(--foreground)]/25"
            activeUnderlineClassName="bg-[var(--foreground)]"
          >
            VIEW EVENTS
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
