"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { Images, Volume2, VolumeX } from "lucide-react";
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
  const [isDarkOverride, setIsDarkOverride] = useState(false);

  const isMenuOpen = controlledMenuOpen !== undefined ? controlledMenuOpen : internalMenuOpen;
  const isMuted = controlledMuted !== undefined ? controlledMuted : internalMuted;
  const effectiveIsLight = isLightHeader && !isDarkOverride;

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

  // Listen for showreel video section activation to invert navbar colors to initial dark-hero style
  useEffect(() => {
    const handleShowreel = (e: Event) => {
      const custom = e as CustomEvent<{ active: boolean }>;
      setIsDarkOverride(Boolean(custom.detail?.active));
    };
    window.addEventListener("showreel-toggle", handleShowreel);
    return () => window.removeEventListener("showreel-toggle", handleShowreel);
  }, []);

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

  // Prevent background scrolling when sidebar menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
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
              effectiveIsLight
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
              effectiveIsLight
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
              effectiveIsLight
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
                    effectiveIsLight ? "bg-[#1c1d20]" : "bg-white"
                  }`}
                />
                <span
                  className={`h-[1.5px] w-full block rounded-full transition-colors duration-300 ${
                    effectiveIsLight ? "bg-[#1c1d20]" : "bg-white"
                  }`}
                />
              </span>
            )}
          </button>
        </div>

      {/* Sidebar Navigation Drawer (Fullscreen on Mobile, Right Sidebar on Desktop) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop for Desktop */}
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[2px] pointer-events-auto"
              aria-hidden="true"
            />

            {/* Sidebar Drawer */}
            <motion.aside
              key="menu-sidebar"
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320, mass: 0.8 }}
              className="fixed top-0 right-0 bottom-0 z-[70] h-dvh w-full md:w-[460px] lg:w-[490px] bg-white text-[#1c1d20] shadow-2xl flex flex-col justify-between p-7 md:p-10 pointer-events-auto overflow-y-auto overflow-x-hidden border-l border-[var(--line)]"
              aria-label="Navigation Menu"
            >
              {/* Top Controls inside Sidebar */}
              <div className="flex items-center justify-end gap-2.5 w-full shrink-0">
                {/* Sound Toggle (Circular Icon Button) */}
                <button
                  type="button"
                  className="size-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border bg-[#1c1d20] text-white border-transparent hover:bg-black"
                  onClick={handleToggleMute}
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                >
                  {isMuted ? (
                    <VolumeX className="size-4" strokeWidth={1.8} />
                  ) : (
                    <Volume2 className="size-4" strokeWidth={1.8} />
                  )}
                </button>

                {/* WRITE TO US Button */}
                <a
                  href="mailto:sceeaot@gmail.com"
                  className="rounded-full font-semibold text-[11px] tracking-[0.05em] px-4 md:px-5 py-2 uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm inline-flex items-center bg-[#1c1d20] text-white hover:bg-black"
                >
                  WRITE TO US
                </a>

                {/* MENU × Button */}
                <button
                  type="button"
                  className="rounded-full px-3.5 md:px-4 py-2 text-[11px] font-medium tracking-[0.05em] flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border text-[#1c1d20] border-[#1c1d20]/30 hover:border-[#1c1d20] bg-transparent"
                  onClick={closeMenu}
                  aria-label="Close Menu"
                >
                  <span>MENU</span>
                  <span className="text-sm leading-none font-light">×</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="my-auto py-8 sm:py-10 flex flex-col items-start gap-3 sm:gap-4">
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, "#about")}
                  className="group text-[40px] sm:text-[46px] md:text-[52px] font-normal leading-[1.06] tracking-[-0.035em] text-[#1c1d20] hover:text-black transition-transform duration-200 hover:translate-x-1.5 inline-block"
                >
                  About Us
                </a>

                <a
                  href="#events"
                  onClick={(e) => handleNavClick(e, "#events")}
                  className="group text-[40px] sm:text-[46px] md:text-[52px] font-normal leading-[1.06] tracking-[-0.035em] text-[#1c1d20] hover:text-black transition-transform duration-200 hover:translate-x-1.5 inline-block"
                >
                  Events
                </a>

                <a
                  href="#team"
                  onClick={(e) => handleNavClick(e, "#team")}
                  className="group text-[40px] sm:text-[46px] md:text-[52px] font-normal leading-[1.06] tracking-[-0.035em] text-[#1c1d20] hover:text-black transition-transform duration-200 hover:translate-x-1.5 inline-block"
                >
                  The Team
                </a>

                {/* VIEW OUR GALLERY Pill Button */}
                <a
                  href="https://drive.google.com/drive/folders/1RawkgELoOl6BvUNoYWbLbEe-VXSc-NbU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 sm:mt-4 inline-flex items-center gap-2 rounded-full border border-[#1c1d20]/35 hover:border-[#1c1d20] px-4 py-2 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-[#1c1d20] hover:bg-black/[0.04] active:scale-95 transition-all duration-200"
                >
                  <Images className="size-3.5 sm:size-4 stroke-[1.6]" />
                  <span className="font-medium">VIEW OUR GALLERY</span>
                </a>
              </nav>

              {/* Bottom Info Section: Get In Touch & Social */}
              <div className="shrink-0 flex flex-col gap-5 pt-5 border-t border-[var(--line)]/60">
                {/* GET IN TOUCH */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">
                    GET IN TOUCH
                  </span>
                  <div className="flex flex-col gap-1 text-[13px] text-[#1c1d20]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#888888] font-mono text-[11px] w-4">E:</span>
                      <a
                        href="mailto:sceeaot@gmail.com"
                        className="hover:text-black hover:underline transition-colors"
                      >
                        sceeaot@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#888888] font-mono text-[11px] w-4">W:</span>
                      <a
                        href="https://chat.whatsapp.com/DuI1NQ4y1hpGp33mL0lWp8?mode=ac_t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black hover:underline transition-colors"
                      >
                        Join our WhatsApp Group
                      </a>
                    </div>
                  </div>
                </div>

                {/* SOCIAL */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">
                    SOCIAL
                  </span>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[13px] text-[#1c1d20]">
                    <a
                      href="https://www.linkedin.com/company/iei-students-chapter-of-ee-academy-of-technology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black hover:underline transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61552070552351"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black hover:underline transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://x.com/sceeaot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black hover:underline transition-colors"
                    >
                      X (Twitter)
                    </a>
                    <a
                      href="https://instagram.com/sceeaot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black hover:underline transition-colors"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
}

export const Header = Navbar;
