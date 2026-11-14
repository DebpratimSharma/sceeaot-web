"use client";

import SectionDivider from "@/components/ui/SectionDivider";
import { ArrowUpRight } from "lucide-react";

export const LinksFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-4 pb-12 sm:pb-16 text-[var(--foreground)]">
      <SectionDivider />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 text-[12px] sm:text-[13px] text-[var(--ink-muted)]">
        <div>
          <p className="font-medium text-[var(--foreground)]">
            IEI Students’ Chapter of Electrical Engineering
          </p>
          <p className="mt-0.5 text-[11px] font-mono tracking-wider uppercase text-[var(--ink-muted)]">
            Academy of Technology · Adisaptagram, Hooghly
          </p>
          <p className="mt-2 text-[11px]">
            © {currentYear} SCEE AOT. Built with curiosity & purpose.
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-2 text-[11px] font-mono tracking-wider uppercase">
          <div className="flex items-center gap-4">
            <a
              href="https://www.sceeaot.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1"
            >
              Main Site <ArrowUpRight className="size-3" />
            </a>
            <a
              href="mailto:sceeaot@gmail.com"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Contact Us
            </a>
            <a
              href="https://drive.google.com/drive/folders/1RawkgELoOl6BvUNoYWbLbEe-VXSc-NbU"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1"
            >
              Gallery <ArrowUpRight className="size-3" />
            </a>
          </div>

          <span className="text-[10px] text-[var(--ink-muted)]/70">
            WE CONNECT. WE EXPLORE. WE CREATE. WE GROW.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default LinksFooter;
