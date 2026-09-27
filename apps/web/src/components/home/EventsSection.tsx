"use client";

import { motion } from "framer-motion";
import { homeAssets } from "./content";
import { TextLink } from "./TextLink";

export function EventsSection() {
  return (
    <section className="grid min-h-[100svh] grid-cols-[1fr_3fr] items-center bg-[#e5e3e0] overflow-hidden max-[700px]:block" id="events">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="px-[clamp(24px,8vw,120px)] py-10 max-[700px]:pb-[30px]"
      >
        <h2 className="mb-8 text-[clamp(42px,5vw,72px)] leading-[.9] tracking-[-.055em]">
          Discover<br />Our Events
        </h2>
        <TextLink href="#faq">VIEW ALL EVENTS</TextLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="flex items-center gap-[26px] border-l border-[var(--line)] px-[clamp(24px,7vw,100px)] py-[60px] max-[700px]:border-l-0 max-[700px]:border-t max-[700px]:py-[30px]"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-md shadow-md"
        >
          <img
            className="aspect-[1.25] w-[min(260px,100%)] object-cover transition-transform duration-500 hover:scale-105"
            src={homeAssets.events[0]}
            alt="IOTricity S3 event"
          />
        </motion.div>
        <div>
          <h3 className="mb-[10px] text-[clamp(30px,4vw,50px)] leading-[.9] tracking-[-.055em]">
            IoTricity<br />S3
          </h3>
          <p className="mb-[25px] max-w-[170px] text-[10px] leading-[1.4] text-[var(--ink-muted)]">
            In our flagship hardware and innovation event, ideas become real.
          </p>
          <TextLink href="#faq">REGISTER NOW</TextLink>
        </div>
      </motion.div>
    </section>
  );
}
