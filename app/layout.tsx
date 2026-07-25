import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Jaini_Purva } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jainiPurva = Jaini_Purva({
  variable: "--font-jaini-purva",
  subsets: ["latin", "devanagari"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Saṃgraha | Sanātana Knowledge & Sacred Sanskrit Literature Sanctuary",
  description: "Explore Saṃgraha, a dedicated digital sanctuary preserving classical Sanskrit scriptures, Vedic mantras, ancient manuscripts, and Sanātana philosophical traditions through interactive design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
        ></script>
        {/* Preload Hero Section Images for instant first load */}
        <link rel="preload" href="/Ganpati.png" as="image" />
        <link rel="preload" href="/Shiv.png" as="image" />
        <link rel="preload" href="/Vishnu.png" as="image" />
        <link rel="preload" href="/Devi.png" as="image" />
        <link rel="preload" href="/Surya.png" as="image" />
        <link rel="preload" href="/Kartikeya.png" as="image" />
        <link rel="preload" href="/Smartha.png" as="image" />
        <link rel="preload" href="/card.png" as="image" />
        <link rel="preload" href="/logo.png" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jainiPurva.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
