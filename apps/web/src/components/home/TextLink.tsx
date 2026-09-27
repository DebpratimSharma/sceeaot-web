"use client";

import { motion } from "framer-motion";

interface TextLinkProps {
  children: React.ReactNode;
  href: string;
}

export function TextLink({ children, href }: TextLinkProps) {
  return (
    <motion.a
      whileHover="hover"
      className="group inline-flex items-center text-[10px] tracking-[0.03em] font-medium hover:underline cursor-pointer"
      href={href}
    >
      <span>{children}</span>
      <motion.span
        variants={{
          hover: { x: 3, y: -3 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="ml-2 inline-block text-[11px]"
        aria-hidden="true"
      >
        ↗
      </motion.span>
    </motion.a>
  );
}
