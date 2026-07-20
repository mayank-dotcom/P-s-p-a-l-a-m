import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devi - Cosmic Goddess",
  description: "Infinite Power • Eternal Grace",
};

export default function DeviLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#030305] min-h-screen">
      {children}
    </div>
  );
}
