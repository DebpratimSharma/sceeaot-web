interface TextLinkProps {
  children: React.ReactNode;
  href: string;
}

export function TextLink({ children, href }: TextLinkProps) {
  return (
    <a className="text-[10px] tracking-[0.03em] hover:underline" href={href}>
      {children} <span className="ml-2 inline-block motion-safe:animate-arrow-slide" aria-hidden="true">↗</span>
    </a>
  );
}
