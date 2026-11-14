import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-6 py-12 text-center text-[var(--foreground)]">
      {/* Top Header Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <Image
          src="/scee_logo.png"
          alt="SCEE Logo"
          width={36}
          height={36}
          className="size-8 object-contain"
        />
        <span className="text-[13px] font-semibold tracking-[-0.02em] uppercase">
          SCEE AOT
        </span>
      </Link>

      {/* Main 404 Message */}
      <div className="max-w-md my-auto py-12">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--ink-muted)] block mb-2">
          ERROR 404
        </span>
        <h1 className="text-[clamp(72px,12vw,120px)] font-normal leading-none tracking-[-0.05em] text-[var(--foreground)]">
          404
        </h1>
        <h2 className="mt-3 text-[22px] sm:text-[26px] font-medium tracking-[-0.02em] text-[var(--foreground)]">
          Page not found
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-muted)]">
          The link you followed may have been updated, moved, or no longer exists.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#1c1d20] text-white hover:bg-black px-6 py-2.5 text-[12px] font-medium tracking-[0.05em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to directory</span>
          </Link>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-[11px] font-mono tracking-wider uppercase text-[var(--ink-muted)]">
        WE CONNECT. WE EXPLORE. WE CREATE. WE GROW.
      </p>
    </div>
  );
}
