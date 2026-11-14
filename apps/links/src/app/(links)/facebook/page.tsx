"use client";

import { RedirectView } from "@/components/links/RedirectView";

export default function FacebookPage() {
  return (
    <RedirectView
      platform="Facebook"
      url="https://www.facebook.com/profile.php?id=61552070552351"
      iconImage="/icons/facebook.svg"
      description="Redirecting you to our official Facebook page."
    />
  );
}
