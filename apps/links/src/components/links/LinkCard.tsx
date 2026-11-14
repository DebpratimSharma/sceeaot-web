"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LinkItem } from "@/types/types";

interface LinkCardProps {
  link: LinkItem;
  featured?: boolean;
}

export const LinkCard = ({ link, featured = false }: LinkCardProps) => {
  const isInternal = link.url.startsWith("/");

  const CardInner = (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--line)] bg-white/70 p-5 sm:p-6 transition-all duration-300 hover:border-[#1c1d20]/30 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 ${
        featured ? "md:p-7" : ""
      }`}
    >
      {/* Top Header: Badge / Category & Arrow Action */}
      <div className="flex items-center justify-between gap-3 mb-4">
        {link.badge ? (
          <span className="rounded-full border border-[var(--line)] bg-[var(--background)] px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase text-[var(--ink-muted)]">
            {link.badge}
          </span>
        ) : (
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink-muted)]">
            {link.handle || "DIRECT LINK"}
          </span>
        )}

        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-transparent text-[var(--foreground)] transition-all duration-300 group-hover:border-[#1c1d20] group-hover:bg-[#1c1d20] group-hover:text-white group-hover:scale-105">
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-start gap-4">
        {link.iconImage && (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--background)] p-2 transition-transform duration-300 group-hover:scale-105">
            <Image
              src={link.iconImage}
              alt={`${link.title} icon`}
              width={24}
              height={24}
              className="size-6 object-contain"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] sm:text-[19px] font-medium tracking-[-0.02em] text-[var(--foreground)] transition-colors group-hover:text-black">
            {link.title}
          </h3>
          {link.description && (
            <p className="mt-1 text-[13px] sm:text-[14px] leading-[1.5] text-[var(--ink-muted)]">
              {link.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer Info / Handle */}
      {link.handle && link.badge && (
        <div className="mt-4 pt-3 border-t border-[var(--line)]/60 flex items-center justify-between text-[11px] font-mono tracking-wider text-[var(--ink-muted)] uppercase">
          <span>{link.handle}</span>
          <span className="text-[10px] font-sans opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-[var(--foreground)]">
            Open Link →
          </span>
        </div>
      )}
    </div>
  );

  if (isInternal) {
    return (
      <Link href={link.url} className="block w-full">
        {CardInner}
      </Link>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      {CardInner}
    </a>
  );
};

export default LinkCard;
