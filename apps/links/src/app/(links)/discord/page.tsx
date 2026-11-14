"use client";

import { RedirectView } from "@/components/links/RedirectView";

export default function DiscordPage() {
  return (
    <RedirectView
      platform="Discord"
      url="https://discord.gg/yYmhfC3Qdq"
      iconImage="/icons/discord.svg"
      description="Redirecting you to our official SCEE AOT community Discord server."
    />
  );
}
