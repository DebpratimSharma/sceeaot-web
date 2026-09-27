"use client";

import { motion } from "framer-motion";
import { homeAssets, teamYears } from "./content";

export function TeamSection() {
  return (
    <section className="min-h-[100svh] pb-[100px] overflow-hidden" id="team">
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

      <div className="flex justify-center gap-2 max-[700px]:gap-[5px] max-[700px]:px-[18px]">
        {homeAssets.team.map((image, index) => (
          <motion.figure
            key={image}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative m-0 aspect-[.8] w-[min(220px,28vw)] overflow-hidden rounded bg-[#d7d4d0] shadow-md transition-shadow hover:shadow-xl after:absolute after:inset-[45%_0_0] after:bg-gradient-to-b after:from-transparent after:to-[rgba(28,29,32,.8)] max-[700px]:w-[31%]"
          >
            <img
              className="block size-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={image}
              alt={`SCEE team ${index + 1}`}
            />
            <figcaption className="absolute bottom-3 left-3 z-[1] text-[9px] text-[#f0efed]">
              {teamYears[index]}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
