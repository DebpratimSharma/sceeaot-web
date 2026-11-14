"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { Projector, X } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import { cn } from "@/lib/utils";

interface EventItem {
  id: string;
  title: string;
  imageSrc: string;
  status: string;
  date?: string;
  description: string;
  registrationLink?: string;
  detailsLink?: string;
}

interface PublicEventsData {
  ongoingEvents: EventItem[];
  pastEvents: EventItem[];
}

const FALLBACK_EVENTS: EventItem[] = [
  {
    id: "iotricitys3",
    title: "IoTRICITY S3",
    status: "Open",
    imageSrc: "/images/iotricitys3.jpeg",
    description: "It is our IoT ideathon where students turn innovative ideas into real-world solutions.",
    registrationLink: "https://forms.gle/GNrYWHxSsFScuGir5",
    detailsLink: "https://iotricitys3.notion.site/IoTRICITY-Season-3-Hackers-Guide-3dfb2a0148308038b7bacbba80dd2fff",
  },
  {
    id: "devora26",
    title: "DEVORA’26",
    status: "Open",
    imageSrc: "https://bywh0yntxo.ufs.sh/f/k4bR25DaT9Rhztpj5Y3Dl6Uym4bapcM3Yt0wOosHeCi1Z5XB",
    description: "An AI-focused offline workshop organized by SCEE, Academy of Technology, dedicated to exploring the future of Artificial Intelligence.",
    registrationLink: "https://unstop.com/o/HhkN3w9?lb=wxAAm5Pv",
  },
  {
    id: "escaypes1",
    title: "Escaype",
    status: "Closed",
    imageSrc: "https://bywh0yntxo.ufs.sh/f/k4bR25DaT9RhKBQQQMrBGWo9EQCLMp63kYul72d5sezfFiTH",
    description: "A completely virtual eSports event organized by IEI Students' Chapter EE featuring Valorant, BGMI, and Free Fire.",
    registrationLink: "https://forms.gle/XK3H3s4NUWfBhsD69",
    detailsLink: "https://escaype.sceeaot.in",
  },
  {
    id: "iotricitys2",
    title: "IOTricity Season 2",
    status: "Open",
    imageSrc: "https://bywh0yntxo.ufs.sh/f/k4bR25DaT9RhIKZ7WY8XBiE7hCZo24eUpHdkmLYfMlFRqOc8",
    description: "The season 2 of hybrid hackathon event, the first of its kind at AOT campus focusing on IoT.",
    registrationLink: "https://unstop.com/o/jlaz2pf",
    detailsLink: "https://iotricity.sceeaot.vercel.app",
  },
  {
    id: "hoverx",
    title: "HoverX",
    status: "Closed",
    imageSrc: "https://bywh0yntxo.ufs.sh/f/k4bR25DaT9RhkKCM9xaT9Rhqgw3ZutmXcDyl4e7WBaNEs6G8",
    description: "From concept to flight! Our hands-on drone-making workshop exploring the mechanics of drone fabrication.",
    detailsLink: "https://hoverx.sceeaot.vercel.app",
  },
  {
    id: "pujopixel",
    title: "Pujo Pixel",
    status: "Closed",
    imageSrc: "https://bywh0yntxo.ufs.sh/f/k4bR25DaT9Rh89dOaGSxEsPRyQ2pufkncJYveINZTb753qa4",
    description: "A completely virtual photography event organized by IEI Students' Chapter EE to celebrate Durga Puja.",
    registrationLink: "https://unstop.com/o/pujopixel",
    detailsLink: "https://pujopixel.sceeaot.vercel.app",
  },
  {
    id: "iotricity",
    title: "IOTricity",
    status: "Closed",
    imageSrc: "https://bywh0yntxo.ufs.sh/f/k4bR25DaT9Rh1mcbfh7QV5tB8ivhMZbY4dapLFmDuzfUgolI",
    description: "A hardware ideathon event, the first of its kind at AOT campus focused on Internet of Things.",
    registrationLink: "https://unstop.com/o/iotricity-s1",
    detailsLink: "https://iotricity-s1.sceeaot.vercel.app",
  },
  {
    id: "electroforge",
    title: "Electroforge",
    status: "Closed",
    imageSrc: "https://bywh0yntxo.ufs.sh/f/k4bR25DaT9RhpqaeNIZjznN5BJOI3c2QGrxkFXCaWiqtdVfK",
    description: "An invited talk and hands-on workshop on printed circuit boards featuring design, fabrication, and application of PCBs.",
    detailsLink: "https://electroforge.sceeaot.vercel.app",
  },
];

function formatTitle(title: string): string {
  const trimmed = title.trim();
  if (/^iotricity\s*s3$/i.test(trimmed)) {
    return "Iotricity\nS3";
  }
  if (/^devora[’']?26$/i.test(trimmed)) {
    return "DEVORA\n'26";
  }
  if (/^pujo\s*pixel$/i.test(trimmed)) {
    return "Pujo\nPixel";
  }
  if (/^iotricity\s*season\s*2$/i.test(trimmed)) {
    return "IOTricity\nSeason 2";
  }
  if (/^iotricity$/i.test(trimmed)) {
    return "IOTricity\nS1";
  }
  const words = trimmed.split(" ");
  if (words.length === 2) {
    return `${words[0]}\n${words[1]}`;
  }
  return trimmed;
}

function EventCard({ event }: { event: EventItem; index: number }) {
  const defaultImg =
    event.id === "iotricitys3"
      ? "/images/iotricitys3.jpeg"
      : event.imageSrc || "/images/iotricitys3.jpeg";

  const [imgSrc, setImgSrc] = useState(defaultImg);

  useEffect(() => {
    if (event.id === "iotricitys3") {
      setImgSrc("/images/iotricitys3.jpeg");
    } else if (event.imageSrc) {
      setImgSrc(event.imageSrc);
    }
  }, [event.id, event.imageSrc]);

  const actionLink = event.registrationLink || event.detailsLink || "#";
  const actionLabel =
    event.status === "Open" && event.registrationLink
      ? "REGISTER NOW"
      : event.detailsLink
        ? "EXPLORE EVENT"
        : "VIEW DETAILS";

  const description =
    event.id === "iotricitys3"
      ? "It is our IoT ideathon where students turn innovative ideas into real-world solutions."
      : event.description;

  return (
    <div className="w-[min(540px,78vw)] md:w-[460px] lg:w-[530px] shrink-0 select-none">
      {/* Event Image */}
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#d7d4d0] shadow-sm">
        <img
          src={imgSrc}
          alt={event.title}
          onError={() => {
            setImgSrc("/images/iotricitys3.jpeg");
          }}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Info Row: Title on Left, Description & Action on Right */}
      <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
        {/* Title */}
        <div className="shrink-0 max-w-[200px]">
          <h3 className="m-0 text-[32px] sm:text-[38px] lg:text-[44px] font-normal leading-[0.95] tracking-[-0.04em] text-[var(--foreground)] whitespace-pre-line">
            {formatTitle(event.title)}
          </h3>
        </div>

        {/* Description & Action Link */}
        <div className="flex flex-col items-start max-w-[280px]">
          <p className="m-0 text-[11px] sm:text-[12px] leading-[1.5] text-[var(--ink-muted)]">
            {description}
          </p>
          <AnimatedButton
            theme="light"
            href={actionLink}
            target={actionLink.startsWith("http") ? "_blank" : undefined}
            rel={actionLink.startsWith("http") ? "noopener noreferrer" : undefined}
            className="mt-4 w-full max-w-[200px] text-[10px] sm:text-[11px] font-mono tracking-[0.12em] uppercase"
          >
            {actionLabel}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}

export function EventsSection() {
  const [events, setEvents] = useState<EventItem[]>(FALLBACK_EVENTS);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Load live data from /data/public-events.json
  useEffect(() => {
    let isMounted = true;
    async function loadEvents() {
      try {
        const res = await fetch("/data/public-events.json");
        if (!res.ok) return;
        const data: PublicEventsData = await res.json();
        if (!isMounted) return;
        const combined = [...(data.ongoingEvents || []), ...(data.pastEvents || [])];
        if (combined.length > 0) {
          setEvents(combined);
        }
      } catch (err) {
        console.error("Failed to load events data:", err);
      }
    }
    loadEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute horizontal scroll range based on track width vs container width
  useEffect(() => {
    function updateScrollRange() {
      if (!trackRef.current) return;
      const parent = trackRef.current.parentElement;
      const parentWidth = parent ? parent.clientWidth : (typeof window !== "undefined" && window.innerWidth >= 768 ? window.innerWidth * 0.52 : 360);
      const totalWidth = trackRef.current.scrollWidth;
      const range = Math.max(0, totalWidth - parentWidth + 60);
      setScrollRange(range);
    }

    updateScrollRange();
    const timer = setTimeout(updateScrollRange, 400);
    window.addEventListener("resize", updateScrollRange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScrollRange);
    };
  }, [events]);

  // Helper to notify navbar about showreel video state
  const updateNavbarState = (active: boolean) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("showreel-toggle", {
          detail: { active },
        })
      );
    }
  };

  useEffect(() => {
    updateNavbarState(isVideoActive);
    return () => updateNavbarState(false);
  }, [isVideoActive]);

  // Handle toggling showreel video background
  const toggleShowreel = () => {
    if (!isVideoActive) {
      setIsVideoActive(true);
      updateNavbarState(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // If browser restricts unmuted autoplay, play muted as fallback
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    } else {
      setIsVideoActive(false);
      updateNavbarState(false);
      videoRef.current?.pause();
    }
  };

  // Close showreel video on Escape key
  useEffect(() => {
    if (!isVideoActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoActive(false);
        updateNavbarState(false);
        videoRef.current?.pause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVideoActive]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Automatically pause video and update navbar when scrolled away from the showreel view
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const inShowreelView = latest >= 0.62 && latest <= 0.98;
    if (!inShowreelView) {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
      if (isVideoActive) {
        updateNavbarState(false);
      }
    } else if (isVideoActive) {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
      updateNavbarState(true);
    }
  });

  // 1. Horizontal events track translation: scrolls events across the right column until all are revealed
  const trackX = useTransform(smoothProgress, [0, 0.62, 1], [0, -scrollRange, -scrollRange]);

  // 2. Events Stage horizontal translation: slides left out of view as the next full screen enters
  const stageX = useTransform(smoothProgress, [0, 0.62, 0.88, 1], ["0%", "0%", "-100%", "-100%"]);

  // 3. Next Experience full screen horizontal translation: slides from 100% to 0% in the exact same motion
  const nextScreenX = useTransform(smoothProgress, [0, 0.62, 0.88, 1], ["100%", "100%", "0%", "0%"]);

  // Pointer events toggling to prevent interactions with off-screen panels
  const stagePointerEvents = useTransform(smoothProgress, (v) => (v < 0.86 ? "auto" : "none"));
  const nextScreenPointerEvents = useTransform(smoothProgress, (v) => (v > 0.60 ? "auto" : "none"));

  return (
    <section ref={containerRef} className="relative h-[550vh] w-full" id="events">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-[var(--background)] to-[#d1d1c7]">
        {/* PANEL 1: Events Section Stage (Left Pinned Column + Right Sliding Events Track) */}
        <motion.div
          style={{ x: stageX, pointerEvents: stagePointerEvents }}
          className="absolute inset-0 size-full flex flex-col bg-gradient-to-b from-[var(--background)] to-[#d1d1c7] z-10 will-change-transform"
        >
          {/* Gap partition: Top Horizontal Line with rotating plus icon right at the vertical divider intersection */}
          <div className="relative w-full border-t border-[var(--line)]">
            <div
              className="absolute top-0 -translate-y-1/2 -translate-x-1/2 bg-[var(--background)] px-2.5 py-0.5 text-[15px] font-light leading-none text-[var(--foreground)] select-none z-30 left-1/2 md:left-[48%]"
            >
              <motion.span
                className="inline-block cursor-pointer"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.3, rotate: 450, transition: { duration: 0.4 } }}
                aria-hidden="true"
              >
                +
              </motion.span>
            </div>
          </div>

          {/* Content Area: Left pinned column and Right horizontally sliding track */}
          <div className="flex-1 w-full h-full flex flex-col md:flex-row relative overflow-hidden">
            {/* Left Column: Fixed / Pinned Heading & View All Events */}
            <div className="w-full md:w-[48%] h-auto md:h-full flex flex-col justify-center px-8 md:px-14 lg:px-24 py-8 md:py-0 border-b md:border-b-0 md:border-r border-[var(--line)] shrink-0 z-20">
              <div className="max-w-[360px]">
                <h2 className="m-0 text-[clamp(42px,5.4vw,76px)] font-normal leading-[0.92] tracking-[-0.05em] text-[var(--foreground)]">
                  Discover<br />Our Events
                </h2>

                <AnimatedButton
                  theme="light"
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 ml-3 w-full max-w-[200px] text-[10px] sm:text-[11px] font-mono tracking-[0.12em] uppercase"
                >
                  VIEW ALL EVENTS
                </AnimatedButton>
              </div>
            </div>

            {/* Right Column: Horizontally Sliding Events Track */}
            <div className="w-full md:w-[52%] flex-1 h-full overflow-hidden flex items-center relative">
              <motion.div
                ref={trackRef}
                style={{ x: trackX }}
                className="flex items-center gap-10 md:gap-14 lg:gap-16 pl-8 md:pl-12 lg:pl-16 pr-16 md:pr-32 will-change-transform"
              >
                {events.map((event, index) => (
                  <EventCard key={event.id || index} event={event} index={index} />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* PANEL 2: Full Screen Experience Screen (covers 100vw, glides in horizontally) */}
        <motion.div
          style={{ x: nextScreenX, pointerEvents: nextScreenPointerEvents }}
          className={cn(
            "absolute inset-0 size-full flex items-center justify-center px-6 md:px-12 z-20 border-l border-[var(--line)] will-change-transform select-none overflow-hidden transition-colors duration-1000 ease-in-out",
            isVideoActive ? "bg-black" : "bg-white"
          )}
        >
          {/* Smooth Video Background Layer */}
          <div
            className={cn(
              "absolute inset-0 size-full overflow-hidden transition-opacity duration-1000 ease-in-out pointer-events-none z-0",
              isVideoActive ? "opacity-100" : "opacity-0"
            )}
          >
            <video
              ref={videoRef}
              src="/videos/showreel.mp4"
              loop
              playsInline
              muted={isMuted}
              preload="auto"
              className="size-full object-cover"
              style={{
                transform: isVideoActive ? "scale(1)" : "scale(1.06)",
                transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
            {/* Cinematic dark overlay to make whitish text stunningly legible */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
          </div>

          {/* Centered Large Typography: Perfectly centered vertically & horizontally */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl my-auto select-none">
            <h2
              className={cn(
                "m-0 text-[clamp(44px,7.5vw,108px)] font-normal leading-[0.88] sm:leading-[0.90] tracking-[-0.04em] uppercase transition-colors duration-700 ease-in-out font-display",
                isVideoActive
                  ? "text-[#ffffff] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                  : "text-[var(--foreground)]"
              )}
            >
              READY<br />
              FOR YOUR NEXT<br />
              EXPERIENCE?
            </h2>
          </div>

          {/* Bottom Center Pill Button: VIEW / CLOSE SHOWREEL */}
          <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-0 right-0 flex items-center justify-center z-20">
            <button
              type="button"
              onClick={toggleShowreel}
              className={cn(
                "group inline-flex items-center gap-2.5 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border transition-all duration-700 ease-in-out text-[10px] sm:text-[11px] font-mono tracking-[0.14em] uppercase cursor-pointer active:scale-95",
                isVideoActive
                  ? "border-white/50 text-white bg-black/40 hover:bg-white/20 hover:border-white shadow-xl backdrop-blur-md"
                  : "border-[var(--foreground)]/30 hover:border-[var(--foreground)] text-[var(--foreground)] bg-transparent hover:bg-black/[0.04]"
              )}
              aria-label={isVideoActive ? "Close Showreel" : "View Showreel"}
            >
              {isVideoActive ? (
                <>
                  <X className="size-3.5 sm:size-4 stroke-[1.8] transition-transform duration-200 group-hover:rotate-90" />
                  <span className="font-medium">CLOSE SHOWREEL</span>
                </>
              ) : (
                <>
                  <Projector className="size-3.5 sm:size-4 stroke-[1.6] transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium">VIEW SHOWREEL</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
