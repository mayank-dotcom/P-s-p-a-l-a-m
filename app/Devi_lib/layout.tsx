import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devi - Cosmic Goddess",
  description: "Explore Devi, the Cosmic Goddess — her infinite power, eternal grace, sacred stories, and divine presence brought to life through immersive 3D.",
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
