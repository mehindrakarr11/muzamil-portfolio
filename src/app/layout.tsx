import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { ExperienceProvider } from "@/components/experience-provider";

export const metadata: Metadata = {
  title: "Mohammad Muzamil A — Developer, Data Thinker, Builder",
  description: "Full Stack & Data Analytics Developer in Bengaluru. Explore Mohammad Muzamil A’s work with React, Node.js, Python, and predictive analytics.",
  authors: [{ name: "Mohammad Muzamil A" }],
  openGraph: {
    title: "Mohammad Muzamil A — Code with purpose.",
    description: "Full-stack development meets data intelligence. Selected work, skills, and the story behind the code.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b0b10" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <noscript><style>{`.reveal,.hero-kicker,.hero-intro,.hero-art{opacity:1!important;transform:none!important}.title-line>span{transform:none!important}.motion-toggle,.project-open,.menu-toggle,.chart-categories,.copy-email{display:none!important}`}</style></noscript>
        <ExperienceProvider>{children}</ExperienceProvider>
      </body>
    </html>
  );
}
