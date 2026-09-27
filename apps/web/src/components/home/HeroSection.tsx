"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Globe } from "lucide-react";
import { homeAssets } from "./content";
import { StatementSection } from "./StatementSection";
import { AnimatedButton } from "./AnimatedButton";

interface HeroSectionProps {
  children?: React.ReactNode;
  menuOpen?: boolean;
  muted?: boolean;
  onMenuToggle?: () => void;
  onMuteToggle?: () => void;
  onNavigate?: () => void;
}

export function HeroSection({
  children,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    restDelta: 0.001,
  });

  // Slow zoom: zooms into the white door
  const bgScale = useTransform(smoothProgress, [0, 0.68], [1, 28]);

  // Fade & slide out hero UI content (0 to 0.20)
  const contentOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const contentY = useTransform(smoothProgress, [0, 0.2], [0, -25]);

  // Pointer events toggling
  const heroPointerEvents = useTransform(smoothProgress, (v) => (v < 0.2 ? "auto" : "none"));
  const statementPointerEvents = useTransform(smoothProgress, (v) => (v > 0.45 ? "auto" : "none"));

  // Statement Section layer: smoothly fades in over the hero from opacity 0 to 1
  const statementOpacity = useTransform(smoothProgress, [0.35, 0.68], [0, 1]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div ref={containerRef} className="relative h-[220vh] w-full" id="top">
      {/* Target anchor for direct navigation to About */}
      <div id="about" className="pointer-events-none absolute top-[90vh] h-px w-px" />

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1c1d20]">
        {/* Background Image with Zoom on White Door */}
        <motion.div
          className="absolute inset-0 size-full bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${homeAssets.hero})`,
            scale: bgScale,
            transformOrigin: "50% 50.8%",
          }}
        />

        {/* Initial Vignette/Gradient overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/60"
          style={{ opacity: contentOpacity }}
        />

        {/* Hero Section Interactive Content */}
        <motion.div
          className="relative z-[3] flex h-full flex-col justify-between px-7 pt-24 pb-8 md:px-12 md:pt-28 md:pb-10 lg:px-16 lg:pt-32 lg:pb-12 text-[#f0efed] max-[700px]:px-5 max-[700px]:pt-20 max-[700px]:pb-6"
          style={{
            pointerEvents: heroPointerEvents,
          }}
        >
          {/* Middle Row: Main Headline on Left, Direct Links on Right */}
          <motion.div
            className="relative z-[1] flex flex-col md:flex-row md:items-start md:justify-between gap-8 pt-4 md:pt-6"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            {/* Left: Main Hero Headline */}
            <div className="max-w-[460px] lg:max-w-[560px]">
              <h1 className="m-0 text-[clamp(34px,5.2vw,68px)] font-normal leading-[1.02] tracking-[-0.04em] text-[#f0efed]">
                We are more than a
                <br />
                Students’ Chapter
              </h1>
              <p className="mt-4 max-w-[340px] text-[12px] md:text-[13px] leading-[1.5] text-[#b0afa9]">
                We create a space where people connect, ideas flourish, and experiences become lasting memories.
              </p>
            </div>

            {/* Right: Quick Links */}
            <div className="flex flex-col gap-5 pt-2 md:pt-4">
              <AnimatedButton href="#about">
                ABOUT US
              </AnimatedButton>
              <AnimatedButton href="#events">
                VIEW EVENTS
              </AnimatedButton>
            </div>
          </motion.div>

          {/* Bottom Row: Join Our Community on Left, Est 2022 on Right */}
          <motion.div
            className="relative z-[1] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-2"
            style={{ opacity: contentOpacity }}
          >
            {/* Bottom Left: Socials */}
            <div>
              <p className="m-0 text-[9px] font-semibold tracking-[0.14em] text-[#9c9b96] uppercase mb-2.5">
                JOIN OUR COMMUNITY
              </p>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="size-10 rounded-full bg-[#1c1d20]/80 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-black hover:scale-110 transition-all cursor-pointer"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="size-10 rounded-full bg-[#1c1d20]/80 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-black hover:scale-110 transition-all cursor-pointer"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.65A1.66 1.66 0 0 0 6.46 5.46a1.66 1.66 0 0 0-1.66 1.65 1.65 1.65 0 0 0 1.66 1.65m1.39 9.94v-8.37H5.07v8.37h2.78z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="size-10 rounded-full bg-[#1c1d20]/80 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-black hover:scale-110 transition-all cursor-pointer"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                {/* X */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  className="size-10 rounded-full bg-[#1c1d20]/80 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-black hover:scale-110 transition-all cursor-pointer"
                >
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Bottom Right: EST 2022 Card + Subtext */}
            <div className="flex flex-col items-start sm:items-end">
              <div className="flex items-center gap-3.5 rounded-lg border border-white/15 bg-black/30 px-3.5 py-2.5 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <Globe className="size-4 text-white/90" strokeWidth={1.5} />
                  <span className="mt-0.5 text-[8px] font-medium tracking-[0.14em] text-[#9c9b96] uppercase">
                    EST. 2022
                  </span>
                </div>
                <div className="h-7 w-px bg-white/20" />
                <p className="m-0 text-[9px] font-bold leading-tight tracking-[0.06em] text-white uppercase text-left">
                  4+ YEARS OF COMMUNITY
                  <br />
                  DRIVEN INNOVATION.
                </p>
              </div>
              <p className="m-0 mt-2 max-w-[260px] text-[11px] leading-[1.4] text-[#9c9b96] text-left sm:text-right">
                Events, innovation, and experiences curated to inspire, connect, and empower students.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Statement Section Layer: Smoothly fades in over Hero */}
        <motion.div
          className="absolute inset-0 z-[10] size-full overflow-y-auto bg-[var(--background)] text-[var(--foreground)]"
          style={{
            opacity: statementOpacity,
            pointerEvents: statementPointerEvents,
          }}
        >
          {children ?? <StatementSection />}
        </motion.div>
      </div>
    </div>
  );
}
