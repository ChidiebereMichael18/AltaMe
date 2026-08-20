import type { Metadata } from "next";
import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Altame - Generate a New Identity",
  description:
    "Generate a complete, realistic fake identity - name, age, SSN, address, and more. Free, instant, no account required.",
  keywords: ["fake identity", "identity generator", "test data", "fake name", "SSN generator", "developer tools"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Altame - Generate a New Identity",
    description: "Generate realistic test data, personas & physical ID cards across 8 countries.",
    type: "website",
    url: "https://altame.vercel.app",
    siteName: "Altame",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altame - Generate a New Identity",
    description: "Generate realistic test data, personas & physical ID cards across 8 countries.",
  },
};



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
