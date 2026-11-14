"use client";

interface HeadlinesProps {
  headLine?: string;
  tag?: string;
  description?: string;
  className?: string;
}

export const Headlines = ({
  headLine = "Section",
  tag,
  description,
  className = "",
}: HeadlinesProps) => {
  return (
    <div className={`py-4 md:py-6 ${className}`}>
      {tag && (
        <span className="text-[10px] md:text-[11px] font-medium tracking-[0.12em] text-[var(--ink-muted)] uppercase block mb-1.5">
          {tag}
        </span>
      )}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <h2 className="text-[clamp(28px,3.8vw,48px)] font-normal leading-[1.05] tracking-[-0.04em] text-[var(--foreground)]">
          {headLine}
        </h2>
        {description && (
          <p className="max-w-[360px] text-[12px] md:text-[13px] leading-[1.5] text-[var(--ink-muted)]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Headlines;
