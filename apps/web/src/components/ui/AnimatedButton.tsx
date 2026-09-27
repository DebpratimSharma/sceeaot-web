"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  arrow?: React.ReactNode;
  arrowClassName?: string;
  underlineClassName?: string;
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
  underlineClassName = "bg-white/25",
  activeUnderlineClassName = "bg-white",
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
  const [underlinePhase, setUnderlinePhase] = useState<"idle" | "entering" | "exiting">("idle");

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
    setUnderlinePhase("entering");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setUnderlinePhase("exiting");
  };

  const handleFocus = () => {
    setIsHovered(true);
    setUnderlinePhase("entering");
  };

  const handleBlur = () => {
    setIsHovered(false);
    setUnderlinePhase("exiting");
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.span>

        {/* Right Arrow: slides out to the right and fades out on hover */}
        <div className="pointer-events-none absolute right-0 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-end overflow-hidden">
          <motion.span
            className={cn("inline-block text-sm leading-none", arrowClassName)}
            initial={{ x: 0, opacity: 1 }}
            animate={isHovered ? { x: 18, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            {arrow}
          </motion.span>
        </div>
      </div>

      {/* Base underline track */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[1px] transition-opacity",
          underlineClassName
        )}
      />

      {/* Active underline bar: sweeps left-to-right on hover in, and sweeps out to right on hover out */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          className={cn("h-full w-full will-change-transform", activeUnderlineClassName)}
          initial={{ x: "-100%" }}
          animate={
            underlinePhase === "entering"
              ? { x: "0%" }
              : underlinePhase === "exiting"
              ? { x: "100%" }
              : { x: "-100%" }
          }
          transition={
            underlinePhase === "idle"
              ? { duration: 0 }
              : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
          }
          onAnimationComplete={() => {
            setUnderlinePhase((prev) => (prev === "exiting" ? "idle" : prev));
          }}
        />
      </div>
    </>
  );

  const sharedClassName = cn(
    "group relative inline-flex w-[220px] md:w-[260px] cursor-pointer select-none items-center pb-2.5 pt-1 text-[11px] md:text-[12px] font-medium tracking-[0.16em] uppercase text-[#f0efed] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50",
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
