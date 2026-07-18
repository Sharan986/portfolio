import type { Metadata } from "next";
import { Inter, Kanit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Gursharan Singh | Software Developer",
  description: "Portfolio of Gursharan Singh, a Next.js / MERN Stack Developer building scalable web apps and systems.",
};

import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { PostHogProvider } from "@/components/layout/PostHogProvider";
import ResumeModal from "@/components/ui/ResumeModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", inter.variable, kanit.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <PostHogProvider>
          <SmoothCursor />
          {children}
          <ResumeModal />
        </PostHogProvider>
      </body>
    </html>
  );
}
