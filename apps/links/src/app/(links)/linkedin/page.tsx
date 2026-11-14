"use client";

import { RedirectView } from "@/components/links/RedirectView";

export default function LinkedInPage() {
  return (
    <RedirectView
      platform="LinkedIn"
      url="https://www.linkedin.com/company/iei-students-chapter-of-ee-academy-of-technology"
      iconImage="/icons/linkedin.svg"
      description="Redirecting you to our official LinkedIn chapter page."
    />
  );
}
