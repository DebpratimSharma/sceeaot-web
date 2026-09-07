import { homeAssets, teamYears } from "./content";

export function TeamSection() {
  return (
    <section className="min-h-[100svh] pb-[100px]" id="team">
      <div className="px-5 pb-[30px] pt-[100px] text-center">
        <h2 className="m-0 text-[clamp(36px,4vw,58px)] tracking-[-.055em]">Meet the Team</h2>
        <p className="m-0 mt-[3px] text-[10px] text-[var(--ink-muted)]">The people who bring it all together</p>
      </div>
      <div className="flex justify-center gap-2 max-[700px]:gap-[5px] max-[700px]:px-[18px]">
        {homeAssets.team.map((image, index) => (
          <figure className="relative m-0 aspect-[.8] w-[min(220px,28vw)] overflow-hidden rounded bg-[#d7d4d0] after:absolute after:inset-[45%_0_0] after:bg-gradient-to-b after:from-transparent after:to-[rgba(28,29,32,.8)] max-[700px]:w-[31%]" key={image}>
            <img className="block size-full object-cover" src={image} alt={`SCEE team ${index + 1}`} />
            <figcaption className="absolute bottom-3 left-3 z-[1] text-[9px] text-[#f0efed]">{teamYears[index]}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
