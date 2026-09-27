"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Member {
  name: string;
  designation: string;
  imagePath: string;
  links?: string[];
}

interface Department {
  name: string;
  gridCols?: string;
  members: Member[];
}

interface PreviousConvenor {
  name: string;
  designation: string;
  imagePath: string;
  links?: string[];
}

interface YearTeam {
  year: string;
  departments?: Department[];
}

interface TeamDataFile {
  teams: YearTeam[];
  previousConvenors?: PreviousConvenor[];
}

interface TeamSlide {
  image: string;
  name: string;
  role: string;
  department?: string;
}

const CACHE_NAME = "scee-team-images-v1";
let memoryTeamData: YearTeam[] | null = null;
let memoryPreloaded = false;

// Preload into browser Image memory and CacheStorage
async function cacheAndPreloadImages(urls: string[]): Promise<void> {
  if (!urls.length) return;

  // 1. Save in CacheStorage if available
  if (typeof window !== "undefined" && "caches" in window) {
    try {
      const cache = await window.caches.open(CACHE_NAME);
      await Promise.allSettled(
        urls.map(async (url) => {
          try {
            const match = await cache.match(url);
            if (!match) {
              const res = await fetch(url, { mode: "cors" });
              if (res.ok) {
                await cache.put(url, res);
              }
            }
          } catch {
            // Ignore individual fetch failure in CacheStorage
          }
        })
      );
    } catch {
      // Ignore cache storage error
    }
  }

  // 2. Preload into browser image memory cache
  const preloadPromises = urls.map(
    (url) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      })
  );

  // Allow up to 3.5 seconds maximum so slow network won't block rendering
  await Promise.race([
    Promise.allSettled(preloadPromises),
    new Promise((resolve) => setTimeout(resolve, 3500)),
  ]);
}

function extractSlidesFromYear(team: YearTeam): TeamSlide[] {
  const slides: TeamSlide[] = [];

  if (team.departments) {
    for (const dept of team.departments) {
      for (const member of dept.members) {
        if (member.imagePath) {
          slides.push({
            image: member.imagePath,
            name: member.name,
            role: member.designation || dept.name,
            department: dept.name,
          });
        }
      }
    }
  }

  return slides;
}

interface TeamSlideshowCardProps {
  team: YearTeam;
  slides: TeamSlide[];
  index: number;
}

function TeamSlideshowCard({ team, slides, index }: TeamSlideshowCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2200);

    return () => {
      clearInterval(interval);
    };
  }, [isHovered, slides.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (!slides.length) return null;

  const currentSlide = slides[currentIndex];

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative m-0 aspect-[.8] w-[min(260px,42vw)] max-[700px]:w-[45vw] overflow-hidden rounded-xl bg-[#d7d4d0] shadow-md  select-none cursor-pointer"
    >
      {/* Slideshow image with smooth fade transition */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.name}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 size-full object-cover transition-transform duration-500"
        />
      </AnimatePresence>

      {/* Top subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent z-10" />

      {/* Bottom rich gradient overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10" />

      {/* Year badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className="inline-flex items-center rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-md border border-white/15 shadow-sm">
          {team.year}
        </span>
      </div>

      {/* Slide counter */}
      <div className="absolute top-3 right-3 z-20">
        <span className="inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-mono text-white/80 backdrop-blur-md border border-white/10">
          {currentIndex + 1} / {slides.length}
        </span>
      </div>

      {/* Prev / Next controls on hover */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous member"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 size-7 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10"
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next member"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 size-7 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10"
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Member information caption */}
      <figcaption className="absolute bottom-3 left-3 right-3 z-20 text-[#f0efed]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.name}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col"
          >
            <span className="text-[12px] sm:text-[13px] font-semibold text-white tracking-tight drop-shadow-sm truncate">
              {currentSlide.name}
            </span>
            <span className="text-[9.5px] sm:text-[10px] text-white/75 truncate mt-0.5">
              {currentSlide.role}
              {currentSlide.department && currentSlide.department !== currentSlide.role && (
                <span className="text-white/50"> • {currentSlide.department}</span>
              )}
            </span>
          </motion.div>
        </AnimatePresence>
      </figcaption>

      {/* Progress line */}
      <div className="absolute bottom-0 inset-x-0 z-20 h-[2.5px] bg-white/15">
        <div
          className="h-full bg-white/80 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
        />
      </div>
    </motion.figure>
  );
}

export function TeamSection() {
  const [teams, setTeams] = useState<YearTeam[]>(memoryTeamData || []);
  const [isReady, setIsReady] = useState(memoryPreloaded);

  useEffect(() => {
    let isMounted = true;

    async function loadTeamDataAndCache() {
      if (memoryTeamData && memoryPreloaded) {
        setTeams(memoryTeamData);
        setIsReady(true);
        return;
      }

      try {
        const res = await fetch("/data/team.json");
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data: TeamDataFile = await res.json();

        if (!isMounted) return;
        setTeams(data.teams);
        memoryTeamData = data.teams;

        // Collect all image URLs across all years and departments
        const allUrls: string[] = [];
        for (const t of data.teams) {
          if (t.departments) {
            for (const d of t.departments) {
              for (const m of d.members) {
                if (m.imagePath) allUrls.push(m.imagePath);
              }
            }
          }
        }
        if (data.previousConvenors) {
          for (const pc of data.previousConvenors) {
            if (pc.imagePath) allUrls.push(pc.imagePath);
          }
        }

        // Cache and preload images first before revealing slideshows
        await cacheAndPreloadImages(allUrls);

        if (isMounted) {
          memoryPreloaded = true;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Failed to load team data or cache images:", err);
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    loadTeamDataAndCache();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="pb-14 md:pb-20 overflow-hidden" id="team">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="px-5 pb-[30px] pt-[100px] text-center"
      >
        <h2 className="m-0 text-[clamp(36px,4vw,58px)] tracking-[-.055em]">Meet the Team</h2>
        <p className="m-0 mt-[3px] text-[10px] text-[var(--ink-muted)]">The people who bring it all together</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-[700px]:gap-[10px] px-4 max-[700px]:px-[14px]">
        {!isReady ? (
          // Elegant skeleton placeholders while preloading and caching images
          [0, 1].map((idx) => (
            <div
              key={idx}
              className="relative aspect-[.8] w-[min(260px,42vw)] max-[700px]:w-[45vw] overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse shadow-md flex flex-col justify-between p-3.5"
            >
              <div className="flex justify-between items-center">
                <div className="h-5 w-16 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="h-4 w-10 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>
              <div className="space-y-1.5">
                <div className="h-4 w-3/4 rounded bg-neutral-300 dark:bg-neutral-700" />
                <div className="h-3 w-1/2 rounded bg-neutral-300 dark:bg-neutral-700" />
              </div>
            </div>
          ))
        ) : (
          // Render each corresponding year's team container slideshow
          teams.map((team, index) => {
            const slides = extractSlidesFromYear(team);
            return (
              <TeamSlideshowCard
                key={team.year}
                team={team}
                slides={slides}
                index={index}
              />
            );
          })
        )}
      </div>
    </section>
  );
}
