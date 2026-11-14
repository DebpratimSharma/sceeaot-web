import type { Metadata } from "next";
import { Familjen_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Links Directory | SCEE AOT",
    template: "%s | SCEE AOT",
  },
  description:
    "Official directory of initiatives, event portals, resources, and social channels for the Students’ Chapter of Electrical Engineering at Academy of Technology.",
  keywords: [
    "SCEE AOT",
    "Students Chapter Electrical Engineering",
    "Academy of Technology",
    "AOT Links",
    "SCEE Directory",
    "IoTRICITY",
  ],
  authors: [{ name: "SCEE AOT" }],
  creator: "SCEE AOT",
  publisher:
    "Students Chapter of Electrical Engineering, Academy of Technology",
  alternates: {
    canonical: "https://sceeaot-links.vercel.app",
  },
  icons: {
    icon: "/scee_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={familjenGrotesk.variable}>
      <body
        className={`${familjenGrotesk.className} min-h-screen bg-[var(--background)] font-body text-[var(--foreground)] antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
