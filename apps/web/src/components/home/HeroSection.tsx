import { homeAssets } from "./content";

interface HeroSectionProps {
  menuOpen: boolean;
  muted: boolean;
  onMenuToggle: () => void;
  onMuteToggle: () => void;
  onNavigate: () => void;
}

export function HeroSection({
  menuOpen,
  muted,
  onMenuToggle,
  onMuteToggle,
  onNavigate,
}: HeroSectionProps) {
  return (
    <section
      className="relative flex min-h-[min(836px,100svh)] flex-col bg-cover bg-center p-7 text-[#f0efed] max-[700px]:min-h-[720px] max-[700px]:p-[18px]"
      id="top"
      style={{ backgroundImage: `url(${homeAssets.hero})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/50" />
      <header className="relative z-[1] flex items-start justify-between">
        <a className="brand" href="#top" aria-label="SCEE AOT home">
          <img className="block w-12" src={homeAssets.logo} alt="SCEE" />
        </a>
        <div className="flex gap-2">
          <button className="rounded-full bg-[#1c1d20]/85 px-3 py-[5px] text-[10px] tracking-[0.02em] text-white" onClick={onMuteToggle} aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? "SOUND OFF" : "SOUND ON"}
          </button>
          <button className="rounded-full bg-[#1c1d20]/85 px-3 py-[5px] text-[10px] tracking-[0.02em] text-white" onClick={onMenuToggle} aria-expanded={menuOpen}>
            MENU <span className="ml-1 text-sm">{menuOpen ? "-" : "+"}</span>
          </button>
        </div>
      </header>
      <nav className={`absolute right-7 top-[86px] z-[1] flex flex-col gap-2 opacity-90 max-[700px]:right-[18px] max-[700px]:top-[70px] ${menuOpen ? "flex" : "max-[700px]:hidden"}`} aria-label="Main navigation">
        <a className="text-[10px] tracking-[0.03em] hover:underline" href="#about" onClick={onNavigate}>ABOUT US <span>↗</span></a>
        <a className="text-[10px] tracking-[0.03em] hover:underline" href="#events" onClick={onNavigate}>VIEW EVENTS <span>↗</span></a>
        <a className="text-[10px] tracking-[0.03em] hover:underline" href="#team" onClick={onNavigate}>MEET THE TEAM <span>↗</span></a>
      </nav>
      <div className="relative z-[1] mt-auto max-w-[380px] pb-[70px] max-[700px]:pb-[100px]">
        <p className="m-0 text-[clamp(28px,4vw,48px)] leading-[.95] tracking-[-.06em]">We are more than a</p>
        <h1 className="mb-[14px] text-[clamp(42px,7vw,72px)] leading-[.92] tracking-[-.055em]">Students&apos; Chapter</h1>
        <p className="m-0 max-w-[260px] text-[11px] leading-[1.35] text-[#d1d1cc]">
          We unite curious minds across disciplines, connecting students to experiences that make engineering personal.
        </p>
      </div>
      <div className="relative z-[1] flex items-end justify-between text-[10px]">
        <div>
          <p className="m-0 text-[8px] leading-[1.3] tracking-[0.06em] text-[#9c9b96]">JOIN OUR COMMUNITY</p>
          <div className="mt-2 flex gap-[5px]"><span className="grid size-[21px] place-items-center rounded-full border border-[#f0efed]/45 text-[8px]">ig</span><span className="grid size-[21px] place-items-center rounded-full border border-[#f0efed]/45 text-[8px]">in</span><span className="grid size-[21px] place-items-center rounded-full border border-[#f0efed]/45 text-[8px]">gh</span><span className="grid size-[21px] place-items-center rounded-full border border-[#f0efed]/45 text-[8px]">✉</span></div>
        </div>
        <div className="flex items-center gap-2 text-[#d1d1cc]"><span className="size-[6px] rounded-full bg-[#d1d1cc]" /> SCROLL TO EXPLORE</div>
      </div>
    </section>
  );
}
