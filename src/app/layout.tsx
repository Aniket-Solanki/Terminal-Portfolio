import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Terminal Portfolio | Interactive CLI Experience",
  description: "An interactive terminal-style portfolio website. Type commands to explore my work, skills, and projects. Built with Next.js and React.",
  keywords: ["portfolio", "terminal", "developer", "interactive", "CLI", "Next.js"],
  authors: [{ name: "Developer" }],
  openGraph: {
    title: "Terminal Portfolio | Interactive CLI Experience",
    description: "Explore my portfolio through an interactive terminal interface",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaCode.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
