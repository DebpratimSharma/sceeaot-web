"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

export const LinksNavbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 sm:px-8 py-3.5 sm:py-4">
        {/* Brand */}
        <Link
          href="https://www.sceeaot.vercel.app"
          className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-102"
        >
          <Image
            src="/scee_logo.png"
            alt="SCEE Logo"
            width={34}
            height={34}
            className="size-8 object-contain"
            priority
          />
          <div className="flex items-center gap-2">
            <span className="text-[13px] sm:text-[14px] font-semibold tracking-[-0.02em] uppercase text-[var(--foreground)]">
              SCEE AOT
            </span>
            <span className="hidden sm:inline-block rounded-full border border-[var(--line)] bg-white/60 px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase text-[var(--ink-muted)]">
              DIRECTORY
            </span>
          </div>
        </Link>

        {/* Right CTA Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.sceeaot.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#1c1d20]/30 hover:border-[#1c1d20] px-3.5 py-1.5 text-[11px] font-medium tracking-[0.05em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 text-[#1c1d20] hover:bg-black/[0.04]"
          >
            <span>MAIN SITE</span>
            <ArrowUpRight className="size-3.5" />
          </a>

          <a
            href="mailto:sceeaot@gmail.com"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1c1d20] text-white hover:bg-black px-4 py-1.5 text-[11px] font-semibold tracking-[0.05em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
          >
            <Mail className="size-3 hidden xs:inline-block" />
            <span>WRITE TO US</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default LinksNavbar;
