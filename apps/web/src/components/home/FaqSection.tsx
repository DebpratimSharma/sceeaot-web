"use client";

import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "./content";

interface FaqSectionProps {
  openFaq: number | null;
  onToggle: (index: number) => void;
}

export function FaqSection({ openFaq, onToggle }: FaqSectionProps) {
  return (
    <section className="grid min-h-[100svh] grid-cols-[1fr_3fr] border-b-0 py-20 overflow-hidden max-[700px]:block max-[700px]:py-[55px]" id="faq">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="px-[clamp(24px,8vw,120px)]"
      >
        <h2 className="mb-5 text-[clamp(34px,4vw,56px)] leading-[.92] tracking-[-.055em]">
          Got Questions?<br />We&apos;ve Got Answers.
        </h2>
        <p className="max-w-[240px] text-[10px] leading-[1.4] text-[var(--ink-muted)]">
          Everything you need to know about our community, events, and experiences.
        </p>
      </motion.div>

      <div className="pr-[clamp(24px,8vw,120px)] max-[700px]:px-5 max-[700px]:pt-[30px]">
        {faqs.map((question, index) => {
          const isOpen = openFaq === index;
          return (
            <motion.div
              key={question}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`border-b border-[var(--line)] py-[13px] text-[10px] first:border-t ${isOpen ? "is-open" : ""}`}
            >
              <button
                className="flex w-full justify-between bg-transparent p-0 text-left text-[var(--foreground)] transition-colors hover:text-black"
                onClick={() => onToggle(index)}
                aria-expanded={isOpen}
              >
                <span className="font-medium">{question}</span>
                <span className="text-base text-[var(--ink-muted)]">{isOpen ? "−" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="m-[10px_0_0] max-w-[420px] leading-[1.4] text-[var(--ink-muted)]">
                      We&apos;re happy to help. Reach out to the chapter and we&apos;ll point you in the right direction.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
