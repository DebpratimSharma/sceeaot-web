"use client";

import {
  LinksFooter,
  LinksGrid,
  LinksHeader,
  LinksNavbar,
  socialMediaLinks,
  websiteLinks,
} from "@/components/links";
import Headlines from "@/components/ui/Headlines";
import SectionDivider from "@/components/ui/SectionDivider";

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#1c1d20] selection:text-white">
      {/* Sticky Clean Navbar */}
      <LinksNavbar />

      {/* Main Content Container */}
      <main className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Editorial Hero Header */}
        <LinksHeader />

        {/* Section Divider */}
        <SectionDivider />

        {/* Section 1: Official Hubs */}
        <section className="py-4 sm:py-6">
          <Headlines
            tag="01 / PLATFORMS & HUBS"
            headLine="Official Hubs"
            description="Our primary chapter websites, flagship hackathon guides, and media archives."
          />
          <div className="mt-4 sm:mt-6">
            <LinksGrid links={websiteLinks} columns={2} featured={true} />
          </div>
        </section>

        {/* Section Divider */}
        <SectionDivider />

        {/* Section 2: Social Media & Channels */}
        <section className="py-4 sm:py-6">
          <Headlines
            tag="02 / COMMUNITY & NETWORKS"
            headLine="Social Spaces"
            description="Join conversations, follow announcements, and connect with engineers across our network."
          />
          <div className="mt-4 sm:mt-6">
            <LinksGrid links={socialMediaLinks} columns={2} />
          </div>
        </section>

        {/* Footer */}
        <LinksFooter />
      </main>
    </div>
  );
}
