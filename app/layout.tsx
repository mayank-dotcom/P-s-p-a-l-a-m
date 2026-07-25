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
  title: "Saṃgraha",
  description: "Saṃgraha is an immersive digital library exploring Hindu deities through interactive 3D models, ancient scriptures, and celestial storytelling.",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jainiPurva.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
