"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { homeAssets } from "@/components/home/content";

export interface NavbarProps {
  className?: string;
  menuOpen?: boolean;
  onMenuToggle?: () => void;
  muted?: boolean;
  onMuteToggle?: () => void;
}

export function Navbar({
  className = "",
  menuOpen: controlledMenuOpen,
  onMenuToggle,
  muted: controlledMuted,
  onMuteToggle,
}: NavbarProps) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [internalMuted, setInternalMuted] = useState(false);
  const [isLightHeader, setIsLightHeader] = useState(false);

  const isMenuOpen = controlledMenuOpen !== undefined ? controlledMenuOpen : internalMenuOpen;
  const isMuted = controlledMuted !== undefined ? controlledMuted : internalMuted;

  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Synchronize logo vanishing with hero section elements
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 95,
    damping: 24,
    restDelta: 0.001,
  });

  // Fades and slides out the logo as you scroll past hero start
  const logoOpacity = useTransform(smoothScrollY, [0, 180], [1, 0]);
  const logoY = useTransform(smoothScrollY, [0, 180], [0, -25]);
  const logoPointerEvents = useTransform(smoothScrollY, (v) => (v < 180 ? "auto" : "none"));

  // Track when the hero image fades out into the light section
  useMotionValueEvent(smoothScrollY, "change", (latest) => {
    setIsLightHeader(latest > 140);
  });

  useEffect(() => {
    const handleCheck = () => {
      setIsLightHeader(window.scrollY > 140);
    };
    handleCheck();
    window.addEventListener("scroll", handleCheck, { passive: true });
    return () => window.removeEventListener("scroll", handleCheck);
  }, []);

  const handleToggleMenu = () => {
    if (onMenuToggle) {
      onMenuToggle();
    } else {
      setInternalMenuOpen((prev) => !prev);
    }
  };

  const handleToggleMute = () => {
    if (onMuteToggle) {
      onMuteToggle();
    } else {
      setInternalMuted((prev) => !prev);
    }
  };

  const closeMenu = () => {
    if (onMenuToggle && isMenuOpen) {
      onMenuToggle();
    } else {
      setInternalMenuOpen(false);
    }
  };

  // Close menu on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Smooth scroll handler for anchor links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none px-7 pt-7 pb-4 md:px-12 md:pt-8 lg:px-16 max-[700px]:p-[18px] ${className}`}
    >
      <div className="relative flex items-center justify-between w-full">
        {/* Brand Logo - vanishes as hero elements fade out */}
        <motion.a
          className="brand pointer-events-auto"
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          aria-label="SCEE AOT home"
          style={{
            opacity: logoOpacity,
            y: logoY,
            pointerEvents: logoPointerEvents,
          }}
        >
          <img
            className="block h-7 md:h-8 w-auto transition-transform hover:scale-105"
            src={homeAssets.logo}
            alt="SCEE Logo"
          />
        </motion.a>

        {/* Permanent Action Controls */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Sound Toggle (Circular Icon Button) */}
          <button
            type="button"
            className={`size-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border ${
              isLightHeader
                ? "bg-[#1c1d20] text-white border-transparent hover:bg-black"
                : "bg-[#1c1d20]/80 border-white/20 text-white/90 hover:bg-black hover:border-white/40"
            }`}
            onClick={handleToggleMute}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? (
              <VolumeX className="size-4" strokeWidth={1.8} />
            ) : (
              <Volume2 className="size-4" strokeWidth={1.8} />
            )}
          </button>

          {/* WRITE TO US (Pill Button: white on dark hero, #1c1d20 on light background) */}
          <a
            href="mailto:sceeaot@gmail.com"
            className={`rounded-full font-semibold text-[11px] tracking-[0.05em] px-4 md:px-5 py-2 uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm inline-flex items-center ${
              isLightHeader
                ? "bg-[#1c1d20] text-white hover:bg-black"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            WRITE TO US
          </a>

          {/* MENU = (Transparent Pill Button: white border & text on hero, #1c1d20 border & text on light background) */}
          <button
            type="button"
            className={`rounded-full px-3.5 md:px-4 py-2 text-[11px] font-medium tracking-[0.05em] flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border ${
              isLightHeader
                ? "text-[#1c1d20] border-[#1c1d20]/30 hover:bg-[#1c1d20]/5 hover:border-[#1c1d20]/60"
                : "text-white border-white/20 hover:bg-black hover:border-white/40"
            }`}
            onClick={handleToggleMenu}
            aria-expanded={isMenuOpen}
          >
            <span>MENU</span>
            {isMenuOpen ? (
              <span className="text-sm leading-none font-light">×</span>
            ) : (
              <span className="flex flex-col gap-[3px] w-3 justify-center">
                <span
                  className={`h-[1.5px] w-full block rounded-full transition-colors duration-300 ${
                    isLightHeader ? "bg-[#1c1d20]" : "bg-white"
                  }`}
                />
                <span
                  className={`h-[1.5px] w-full block rounded-full transition-colors duration-300 ${
                    isLightHeader ? "bg-[#1c1d20]" : "bg-white"
                  }`}
                />
              </span>
            )}
          </button>
        </div>

        {/* Permanent Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              ref={menuRef}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 0.95, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto absolute right-0 top-[52px] z-50 flex flex-col gap-2 rounded-xl border border-white/10 bg-[#1c1d20]/95 p-4 backdrop-blur-md min-w-[210px] shadow-2xl"
              aria-label="Main navigation"
            >
              <a
                className="text-[10px] tracking-[0.04em] text-white transition-colors hover:text-white/70 hover:underline py-1"
                href="#about"
                onClick={(e) => handleNavClick(e, "#about")}
              >
                ABOUT US <span>↗</span>
              </a>
              <a
                className="text-[10px] tracking-[0.04em] text-white transition-colors hover:text-white/70 hover:underline py-1"
                href="#events"
                onClick={(e) => handleNavClick(e, "#events")}
              >
                VIEW EVENTS <span>↗</span>
              </a>
              <a
                className="text-[10px] tracking-[0.04em] text-white transition-colors hover:text-white/70 hover:underline py-1"
                href="#team"
                onClick={(e) => handleNavClick(e, "#team")}
              >
                MEET THE TEAM <span>↗</span>
              </a>
              <a
                className="text-[10px] tracking-[0.04em] text-white transition-colors hover:text-white/70 hover:underline py-1"
                href="#faq"
                onClick={(e) => handleNavClick(e, "#faq")}
              >
                FAQ <span>↗</span>
              </a>
              <a
                className="text-[10px] tracking-[0.04em] text-white/80 transition-colors hover:text-white hover:underline py-1 border-t border-white/10 pt-2 mt-1"
                href="mailto:sceeaot@gmail.com"
              >
                WRITE TO US <span>↗</span>
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export const Header = Navbar;
