"use client";

import { motion } from "framer-motion";
import { LinkItem } from "@/types/types";
import { LinkCard } from "./LinkCard";

interface LinksGridProps {
  links: LinkItem[];
  columns?: 1 | 2;
  featured?: boolean;
}

export const LinksGrid = ({
  links,
  columns = 2,
  featured = false,
}: LinksGridProps) => {
  return (
    <div
      className={`grid gap-4 sm:gap-5 ${
        columns === 1
          ? "grid-cols-1"
          : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {links.map((link, index) => (
        <motion.div
          key={`${link.title}-${index}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
        >
          <LinkCard link={link} featured={featured} />
        </motion.div>
      ))}
    </div>
  );
};

export default LinksGrid;
