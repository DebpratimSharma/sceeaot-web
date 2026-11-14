"use client";

import { RedirectView } from "@/components/links/RedirectView";

export default function TwitterPage() {
  return (
    <RedirectView
      platform="X (Twitter)"
      url="https://x.com/sceeaot"
      iconImage="/icons/twitter.svg"
      description="Redirecting you to @sceeaot on X."
    />
  );
}
