"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const LinksHeader = () => {
  return (
    <div className="pt-8 sm:pt-12 pb-4">
      {/* Category Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-4"
      >
        <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] text-[var(--ink-muted)] uppercase">
          IEI STUDENTS’ CHAPTER · ELECTRICAL ENGINEERING
        </span>
      </motion.div>

      {/* Main Title & Logo Badge */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-[620px]"
        >
          <h1 className="text-[clamp(34px,5.2vw,64px)] font-normal leading-[1.0] tracking-[-0.04em] text-[var(--foreground)]">
            Connect with our community & explore our spaces.
          </h1>

          <p className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] leading-[1.55] text-[var(--ink-muted)] max-w-[500px]">
            The official launchpad for SCEE AOT initiatives, flagship event guides,
            multimedia archives, and active community channels.
          </p>
        </motion.div>

        {/* Chapter Crest Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden sm:flex flex-col items-center justify-center rounded-2xl border border-[var(--line)] bg-white/60 p-5 min-w-[200px] text-center"
        >
          <Image
            src="/scee_logo.png"
            alt="SCEE Crest"
            width={72}
            height={72}
            className="size-16 object-contain mb-2.5"
            priority
          />
          <span className="text-[12px] font-semibold tracking-[-0.01em] uppercase text-[var(--foreground)]">
            SCEE AOT
          </span>
          <span className="text-[10px] font-mono tracking-wider text-[var(--ink-muted)] uppercase mt-0.5">
            EST. 2013 · AOT
          </span>
        </motion.div>
      </div>

      {/* Slogan Pills */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2"
      >
        <span className="rounded-full border border-[var(--line)] bg-white/50 px-3 py-1 text-[10px] font-mono tracking-wider text-[var(--foreground)] uppercase">
          CONNECT
        </span>
        <span className="text-[var(--ink-muted)] text-[12px]">·</span>
        <span className="rounded-full border border-[var(--line)] bg-white/50 px-3 py-1 text-[10px] font-mono tracking-wider text-[var(--foreground)] uppercase">
          EXPLORE
        </span>
        <span className="text-[var(--ink-muted)] text-[12px]">·</span>
        <span className="rounded-full border border-[var(--line)] bg-white/50 px-3 py-1 text-[10px] font-mono tracking-wider text-[var(--foreground)] uppercase">
          CREATE
        </span>
        <span className="text-[var(--ink-muted)] text-[12px]">·</span>
        <span className="rounded-full border border-[var(--line)] bg-white/50 px-3 py-1 text-[10px] font-mono tracking-wider text-[var(--foreground)] uppercase">
          GROW
        </span>
      </motion.div>
    </div>
  );
};

export default LinksHeader;
