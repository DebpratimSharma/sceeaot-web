"use client";

import { motion, AnimatePresence } from "framer-motion";
import { faqs, type FaqItem } from "./content";

interface FaqSectionProps {
  openFaq: number | null;
  onToggle: (index: number) => void;
}

export function FaqSection({ openFaq, onToggle }: FaqSectionProps) {
  return (
    <section
      className="relative flex min-h-[100svh] w-full items-center justify-center py-20 md:py-28 lg:py-32 overflow-hidden"
      id="faq"
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[44%_56%] gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column: Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="m-0 text-[clamp(40px,5.2vw,72px)] font-normal leading-[0.94] tracking-[-0.045em] text-[var(--foreground)]">
              Got Questions?
              <br />
              We&apos;ve Got Answers.
            </h2>
            <p className="mt-5 sm:mt-6 max-w-[420px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.45] text-[var(--ink-muted)]">
              Everything you need to know about our community, events, and experiences, all in one place.
            </p>
          </motion.div>

          {/* Right Column: FAQ Accordion */}
          <div className="w-full">
            {faqs.map((item: string | FaqItem, index: number) => {
              const question = typeof item === "string" ? item : item.question;
              const answer = typeof item === "string" ? "" : item.answer;
              const isOpen = openFaq === index;

              return (
                <motion.div
                  key={question}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="border-b border-[var(--line)]"
                >
                  <button
                    type="button"
                    onClick={() => onToggle(index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between py-3.5 sm:py-4 text-left transition-colors cursor-pointer"
                  >
                    <span
                      className={`text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] transition-colors pr-4 ${
                        isOpen
                          ? "text-[var(--foreground)] font-medium"
                          : "text-[var(--ink-muted)] group-hover:text-[var(--foreground)] font-normal"
                      }`}
                    >
                      {question}
                    </span>
                    <span
                      className="shrink-0 text-lg sm:text-xl font-light text-[var(--ink-muted)] group-hover:text-[var(--foreground)] select-none transition-colors"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 sm:pb-5 text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-[1.38] text-[var(--foreground)]">
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
