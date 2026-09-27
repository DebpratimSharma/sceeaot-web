import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "SCEE AOT",
  description: "Students Chapter of Electrical Engineering, Academy of Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background font-body text-foreground">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
