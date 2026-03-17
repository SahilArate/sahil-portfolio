import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Sahil Arate — Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, TypeScript and cloud computing. Building digital experiences that inspire and innovate.",
  keywords: [
    "Sahil Arate",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Cloud Computing",
    "Belgaum",
    "Karnataka",
    "India",
  ],
  authors: [{ name: "Sahil Arate" }],
  openGraph: {
    title: "Sahil Arate — Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript and cloud computing.",
    type: "website",
  },
};

// Runs before first paint — prevents theme flash
const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('sahil-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = saved || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}