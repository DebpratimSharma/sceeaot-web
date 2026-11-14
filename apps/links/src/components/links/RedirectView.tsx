"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

interface RedirectViewProps {
  platform: string;
  url: string;
  iconImage?: string;
  description?: string;
}

export const RedirectView = ({
  platform,
  url,
  iconImage,
  description = "Redirecting you to our official space",
}: RedirectViewProps) => {
  useEffect(() => {
    // Attempt instant client-side redirection
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 150);

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-6 py-10 sm:py-14 text-center text-[var(--foreground)] selection:bg-[#1c1d20] selection:text-white">
      {/* Top Header Logo */}
      <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-102">
        <Image
          src="/scee_logo.png"
          alt="SCEE Logo"
          width={36}
          height={36}
          className="size-8 object-contain"
        />
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold tracking-[-0.02em] uppercase">
            SCEE AOT
          </span>
          <span className="rounded-full border border-[var(--line)] bg-white/60 px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase text-[var(--ink-muted)]">
            DIRECTORY
          </span>
        </div>
      </Link>

      {/* Main Card */}
      <div className="my-auto w-full max-w-md py-8">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-sm">
          {/* Platform Icon */}
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--background)] p-3">
            {iconImage ? (
              <Image
                src={iconImage}
                alt={`${platform} icon`}
                width={32}
                height={32}
                className="size-8 object-contain"
              />
            ) : (
              <div className="size-6 rounded-full bg-[#1c1d20]" />
            )}
          </div>

          {/* Status Spinner */}
          <div className="mx-auto mb-4 size-6 rounded-full border-2 border-[var(--line)] border-t-[#1c1d20] animate-spin" />

          <h1 className="text-[22px] font-medium tracking-[-0.02em] text-[var(--foreground)]">
            Connecting to {platform}...
          </h1>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-muted)]">
            {description}
          </p>

          <div className="mt-7 pt-6 border-t border-[var(--line)]">
            <p className="text-[11px] font-mono tracking-wider uppercase text-[var(--ink-muted)] mb-3">
              Not redirected automatically?
            </p>
            <a
              href={url}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1c1d20] text-white hover:bg-black px-5 py-2.5 text-[12px] font-medium tracking-[0.05em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-sm"
            >
              <span>Continue to {platform}</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--ink-muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="size-3" />
            <span>Back to directory</span>
          </Link>
        </div>
      </div>

      {/* Footer Slogan */}
      <p className="text-[10px] font-mono tracking-wider uppercase text-[var(--ink-muted)]/70">
        WE CONNECT. WE EXPLORE. WE CREATE. WE GROW.
      </p>
    </div>
  );
};

export default RedirectView;
