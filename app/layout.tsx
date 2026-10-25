import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { PageTransition } from "@/components/page-transition/page-transition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tia - Rencontres Intelligentes avec l'IA | App de Dating",
  description: "Tia révolutionne les rencontres avec l'IA. Swipes immersifs, matchs intelligents, messages suggérés. Téléchargez gratuitement sur iOS et Android.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
