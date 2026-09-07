"use client";

import { useState } from "react";
import { EventsSection } from "@/components/home/EventsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { StatementSection } from "@/components/home/StatementSection";
import { TeamSection } from "@/components/home/TeamSection";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="site-shell">
      <HeroSection
        menuOpen={menuOpen}
        muted={muted}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        onMuteToggle={() => setMuted(!muted)}
        onNavigate={() => setMenuOpen(false)}
      />
      <StatementSection />
      <TeamSection />
      <EventsSection />
      <FaqSection
        openFaq={openFaq}
        onToggle={(index) => setOpenFaq(openFaq === index ? null : index)}
      />
    </main>
  );
}
