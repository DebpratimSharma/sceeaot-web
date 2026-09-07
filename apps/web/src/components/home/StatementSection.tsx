import { TextLink } from "./TextLink";

export function StatementSection() {
  return (
    <section className="grid min-h-[100svh] grid-cols-[1fr_3fr] border-b border-[var(--line)] py-[42px] pb-[50px] max-[700px]:block" id="about">
      <div className="px-6 pt-[30px] text-[9px] text-[var(--ink-muted)] max-[700px]:pb-0">ABOUT</div>
      <div className="pr-[clamp(24px,8vw,120px)] max-[700px]:px-5">
        <h2 className="mb-[70px] mt-[60px] max-w-[690px] text-[clamp(42px,5.2vw,76px)] leading-[.96] tracking-[-.055em] max-[700px]:mb-[55px] max-[700px]:mt-[45px]">We are a community where people, ideas, and experiences come together to create something more.</h2>
        <div className="relative h-px bg-[var(--line)] after:absolute after:left-1/2 after:top-[-9px] after:bg-[var(--background)] after:px-1 after:text-xs after:content-['+']" />
        <div className="mt-12 grid grid-cols-3 gap-6 text-[10px] leading-[1.35] text-[var(--ink-muted)] max-[700px]:grid-cols-2">
          <p className="m-0 text-[8px] leading-[1.3] tracking-[0.06em] text-[var(--foreground)]">WE CONNECT. WE EXPLORE.<br />WE CREATE. WE GROW.</p>
          <p className="m-0">Our mission is to make every initiative feel real, to share knowledge beyond the classroom, and to create experiences that stay with you.</p>
          <TextLink href="#team">VIEW OUR STORY</TextLink>
        </div>
      </div>
    </section>
  );
}
