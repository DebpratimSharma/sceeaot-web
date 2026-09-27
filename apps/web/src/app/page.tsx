"use client";

import { useState } from "react";
import { EventsSection } from "@/components/home/EventsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { StatementSection } from "@/components/home/StatementSection";
import { TeamSection } from "@/components/home/TeamSection";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="site-shell overflow-x-clip">
      <HeroSection>
        <StatementSection />
      </HeroSection>
      <TeamSection />
      <EventsSection />
      <FaqSection
        openFaq={openFaq}
        onToggle={(index) => setOpenFaq(openFaq === index ? null : index)}
      />
    </main>
  );
}
