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
    "Generate a complete, realistic fake identity — name, age, SSN, address, and more. Free, instant, no account required.",
  keywords: ["fake identity", "identity generator", "test data", "fake name", "SSN generator", "developer tools"],
  openGraph: {
    title: "Altame - Generate a New Identity",
    description: "A complete fake persona, generated instantly. For testing, privacy, and development.",
    type: "website",
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
