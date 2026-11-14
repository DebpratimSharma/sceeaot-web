"use client";

import { RedirectView } from "@/components/links/RedirectView";

export default function WhatsAppPage() {
  return (
    <RedirectView
      platform="WhatsApp"
      url="https://chat.whatsapp.com/DuI1NQ4y1hpGp33mL0lWp8?mode=ac_t"
      iconImage="/icons/whatsapp.svg"
      description="Redirecting you to our official WhatsApp broadcast community."
    />
  );
}
