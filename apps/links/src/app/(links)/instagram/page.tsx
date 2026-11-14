"use client";

import { RedirectView } from "@/components/links/RedirectView";

export default function InstagramPage() {
  return (
    <RedirectView
      platform="Instagram"
      url="https://instagram.com/sceeaot"
      iconImage="/icons/instagram.svg"
      description="Redirecting you to @sceeaot on Instagram."
    />
  );
}
