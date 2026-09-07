import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-background font-body text-foreground">{children}</body>
    </html>
  );
}
