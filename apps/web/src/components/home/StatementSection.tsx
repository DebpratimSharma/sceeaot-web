"use client";

import { AnimatedButton } from "./AnimatedButton";
import { SectionDivider } from "./SectionDivider";

export function StatementSection() {
  return (
    <section className="flex h-full w-full flex-col justify-between overflow-hidden px-7 pt-20 pb-8 md:px-12 md:pt-24 md:pb-10 lg:px-16 lg:pt-28 lg:pb-12 max-[700px]:px-[18px] max-[700px]:pt-16 max-[700px]:pb-5 [@media(max-height:850px)]:pt-16 [@media(max-height:850px)]:pb-5 md:[@media(max-height:850px)]:pt-20 md:[@media(max-height:850px)]:pb-6 lg:[@media(max-height:850px)]:pt-20 lg:[@media(max-height:850px)]:pb-6 [@media(max-height:720px)]:pt-14 [@media(max-height:720px)]:pb-3 md:[@media(max-height:720px)]:pt-16 md:[@media(max-height:720px)]:pb-4 lg:[@media(max-height:720px)]:pt-16 lg:[@media(max-height:720px)]:pb-4 [@media(max-height:620px)]:pt-12 [@media(max-height:620px)]:pb-2 md:[@media(max-height:620px)]:pt-14 md:[@media(max-height:620px)]:pb-3 lg:[@media(max-height:620px)]:pt-14 lg:[@media(max-height:620px)]:pb-3">
      {/* Upper Horizontal Section */}
      <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-[140px_1fr] md:gap-8 lg:grid-cols-[180px_1fr] lg:gap-10 xl:grid-cols-[220px_1fr] md:pt-4 [@media(max-height:850px)]:pt-0 [@media(max-height:850px)]:gap-4 md:[@media(max-height:850px)]:gap-6 [@media(max-height:720px)]:gap-3 md:[@media(max-height:720px)]:gap-4 [@media(max-height:720px)]:md:grid-cols-[110px_1fr] [@media(max-height:720px)]:lg:grid-cols-[140px_1fr]">
        {/* Left: About Label */}
        <div className="pt-2 text-[10px] font-medium tracking-[0.1em] text-[var(--ink-muted)] uppercase md:text-[11px] [@media(max-height:850px)]:pt-0.5">
          ABOUT
        </div>

        {/* Right: Longer Statement Heading */}
        <div className="max-w-[980px]">
          <h2 className="m-0 text-[clamp(32px,5.2vw,72px)] font-normal leading-[1.0] tracking-[-0.045em] text-[var(--foreground)] [@media(max-height:850px)]:text-[clamp(28px,4.5vw,56px)] [@media(max-height:850px)]:leading-[1.02] [@media(max-height:720px)]:text-[clamp(24px,3.8vw,42px)] [@media(max-height:720px)]:leading-[1.04] [@media(max-height:620px)]:text-[clamp(20px,3.2vw,32px)] [@media(max-height:620px)]:leading-[1.06]">
            We are a community where people, ideas, and experiences come together to create something more.
          </h2>
        </div>
      </div>

      {/* Animated Divider with Rotating Plus Icon in the Middle */}
      <SectionDivider
        className="my-5 md:my-8 lg:my-10 [@media(max-height:850px)]:my-3.5 md:[@media(max-height:850px)]:my-5 [@media(max-height:720px)]:my-2.5 md:[@media(max-height:720px)]:my-3 [@media(max-height:620px)]:my-1.5"
      />

      {/* Lower Horizontal Section: Left & Right */}
      <div className="grid grid-cols-1 items-start gap-6 pb-2 md:grid-cols-2 md:gap-12 md:pb-4 lg:gap-16 lg:pb-6 [@media(max-height:850px)]:gap-4 [@media(max-height:850px)]:pb-1 md:[@media(max-height:850px)]:gap-8 [@media(max-height:720px)]:gap-3 [@media(max-height:720px)]:pb-0 md:[@media(max-height:720px)]:gap-6">
        {/* Lower Left: Slogan */}
        <div>
          <p className="m-0 text-[9px] font-semibold leading-[1.6] tracking-[0.08em] text-[var(--foreground)] md:text-[10px] [@media(max-height:720px)]:text-[8.5px] [@media(max-height:620px)]:text-[8px]">
            WE CONNECT. WE EXPLORE.
            <br />
            WE CREATE. WE GROW.
          </p>
        </div>

        {/* Lower Right: Description & Underlined View Events Link */}
        <div className="flex flex-col items-start md:pl-6 lg:pl-28 xl:pl-44 [@media(max-height:720px)]:md:pl-4 [@media(max-height:720px)]:lg:pl-16">
          <p className="m-0 max-w-[420px] text-[12px] leading-[1.55] text-[var(--ink-muted)] md:text-[13px] [@media(max-height:850px)]:text-[11.5px] [@media(max-height:850px)]:leading-[1.45] [@media(max-height:720px)]:text-[11px] [@media(max-height:720px)]:leading-[1.35] [@media(max-height:620px)]:text-[10px]">
            Our mission is to make every initiative count, as a chance to learn something new, meet someone different, or experience something memorable.
          </p>

          <AnimatedButton
            theme="light"
            href="#events"
            className="mt-5 w-full max-w-[210px] pb-1.5 text-[10px] font-medium tracking-[0.08em] md:text-[11px] [@media(max-height:850px)]:mt-3 [@media(max-height:720px)]:mt-2 [@media(max-height:620px)]:mt-1.5 [@media(max-height:720px)]:pb-1"
          >
            VIEW EVENTS
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
