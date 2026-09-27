"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AnimatedButtonTheme = "dark" | "light";

export interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  arrow?: React.ReactNode;
  arrowClassName?: string;
  /**
   * Theme preset:
   * - "dark": for dark backgrounds (default): light text, white active underline, white/25 base track
   * - "light": for white/light backgrounds: dark text, dark active underline, dark/20 base track
   */
  theme?: AnimatedButtonTheme;
  /**
   * Custom class for the base subtle track (overrides theme preset)
   */
  underlineClassName?: string;
  /**
   * Custom class for the active underline bar (overrides theme preset)
   */
  activeUnderlineClassName?: string;
  as?: "a" | "button";
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  id?: string;
  "aria-label"?: string;
}

export function AnimatedButton({
  children,
  href,
  onClick,
  className,
  arrow = "→",
  arrowClassName,
  theme = "dark",
  underlineClassName,
  activeUnderlineClassName,
  as,
  type = "button",
  target,
  rel,
  id,
  "aria-label": ariaLabel,
}: AnimatedButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [travelDistance, setTravelDistance] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [sweepCount, setSweepCount] = useState(0);

  // Theme-aware default styles
  const isLight = theme === "light";

  const defaultTextColor = isLight
    ? "text-[var(--foreground,#0a0a0a)] hover:text-black focus-visible:ring-black/50"
    : "text-[#f0efed] hover:text-white focus-visible:ring-white/50";

  const defaultBaseTrack = isLight
    ? "bg-[var(--foreground,#0a0a0a)]/20"
    : "bg-white/25";

  const defaultActiveLine = isLight
    ? "bg-[var(--foreground,#0a0a0a)]"
    : "bg-white";

  const finalBaseTrack = cn(defaultBaseTrack, underlineClassName);
  const finalActiveLine = cn(defaultActiveLine, activeUnderlineClassName);

  // Dynamically calculate the horizontal distance the text needs to glide to reach the right edge
  const measure = useCallback(() => {
    if (containerRef.current && textRef.current) {
      const cWidth = containerRef.current.getBoundingClientRect().width;
      const tWidth = textRef.current.getBoundingClientRect().width;
      setTravelDistance(Math.max(0, cWidth - tWidth));
    }
  }, []);

  useEffect(() => {
    measure();

    if (typeof window === "undefined") return;

    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    if (textRef.current) ro.observe(textRef.current);

    if (document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, children]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setSweepCount((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setSweepCount((prev) => prev + 1);
  };

  const handleFocus = () => {
    setIsHovered(true);
    setSweepCount((prev) => prev + 1);
  };

  const handleBlur = () => {
    setIsHovered(false);
    setSweepCount((prev) => prev + 1);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    // Default smooth scroll support for in-page anchors
    if (!e.defaultPrevented && href && href.startsWith("#")) {
      e.preventDefault();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const content = (
    <>
      {/* Interactive content row */}
      <div ref={containerRef} className="relative flex w-full items-center">
        {/* Left Arrow: slides in from off-screen left into view on hover */}
        <div className="pointer-events-none absolute left-0 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-start overflow-hidden">
          <motion.span
            className={cn("inline-block text-sm leading-none", arrowClassName)}
            initial={{ x: -18, opacity: 0 }}
            animate={isHovered ? { x: 0, opacity: 1 } : { x: -18, opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            {arrow}
          </motion.span>
        </div>

        {/* Text: slides from the left edge across to the right edge on hover */}
        <motion.span
          ref={textRef}
          className="inline-block whitespace-nowrap will-change-transform"
          animate={{ x: isHovered ? travelDistance : 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.span>

        {/* Right Arrow: slides out to the right and fades out on hover */}
        <div className="pointer-events-none absolute right-0 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-end overflow-hidden">
          <motion.span
            className={cn("inline-block text-sm leading-none", arrowClassName)}
            initial={{ x: 0, opacity: 1 }}
            animate={isHovered ? { x: 18, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            {arrow}
          </motion.span>
        </div>
      </div>

      {/* Base subtle underline track */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[1px] transition-opacity",
          finalBaseTrack
        )}
      />

      {/* Active underline bar: Initially present and visible; sweeps left-to-right on interaction */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
        {sweepCount === 0 ? (
          // Initial resting active underline (fully visible on load)
          <div className={cn("absolute inset-0 h-full w-full", finalActiveLine)} />
        ) : (
          // Sweep animation on hover/unhover: current line sweeps out right, fresh line sweeps in from left
          <>
            <motion.div
              key={`exit-${sweepCount}`}
              className={cn("absolute inset-0 h-full w-full will-change-transform", finalActiveLine)}
              initial={{ x: "0%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              key={`enter-${sweepCount}`}
              className={cn("absolute inset-0 h-full w-full will-change-transform", finalActiveLine)}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            />
          </>
        )}
      </div>
    </>
  );

  const sharedClassName = cn(
    "group relative inline-flex w-[220px] md:w-[260px] cursor-pointer select-none items-center pb-2.5 pt-1 text-[11px] md:text-[12px] font-medium tracking-[0.16em] uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1",
    defaultTextColor,
    className
  );

  // Render as link or button
  const isLink = as === "a" || (href !== undefined && as !== "button");

  if (isLink) {
    return (
      <a
        id={id}
        href={href}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={sharedClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      className={sharedClassName}
    >
      {content}
    </button>
  );
}
