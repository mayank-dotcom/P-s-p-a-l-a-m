'use client';

import Link from 'next/link';
import {
  Mail,
  ArrowRight,
  Shield,
  Instagram,
  Facebook,
} from 'lucide-react';
import YoutubeIcon from '@iconify-react/mdi/youtube';
import XTwitterIcon from '@iconify-react/fa6-brands/x-twitter';

const PeacockFeatherIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C12 22 19 16 19 9.5C19 5.35817 15.866 2 12 2C8.13401 2 5 5.35817 5 9.5C5 16 12 22 12 22Z" />
    <circle cx="12" cy="8.5" r="2.5" />
    <path d="M12 11V22" />
    <path d="M9 14L12 16L15 14" />
  </svg>
);

const RedditIcon = ({ className, height }: { className?: string; height?: string }) => (
  <svg className={className} style={{ height: height || '1.1em', width: 'auto' }} viewBox="0 0 512 512" fill="currentColor">
    <path d="M440.3 203.7c-15.8 0-29.4 8.5-36.5 21.2-34.5-24-81.4-39.6-133.7-41.6l28.6-134.4 93.7 22c.1 20.4 16.7 36.9 37.1 36.9 20.5 0 37.1-16.6 37.1-37.1s-16.6-37.1-37.1-37.1c-14.7 0-27.4 8.6-33.4 21L292.5 30.6c-4.4-1-8.9 1.7-10 6.1L249.2 189c-53.5 1.7-101.4 17.3-136.2 41.6-7.1-12.6-20.7-21.1-36.5-21.1-22.9 0-41.5 18.6-41.5 41.5 0 17 10.2 31.6 24.8 38-1.2 5.5-1.9 11.2-1.9 16.9 0 78.4 90.7 142 202.5 142s202.5-63.6 202.5-142c0-5.6-.6-11.2-1.8-16.6 14.8-6.3 25.2-21 25.2-38.1 0-22.8-18.6-41.5-41.5-41.5zM155.8 300.9c0-14.7 11.9-26.6 26.6-26.6s26.6 11.9 26.6 26.6c0 14.7-11.9 26.6-26.6 26.6s-26.6-11.9-26.6-26.6zm170 87.7c-24 23.9-69.2 25.3-69.8 25.3-.6 0-45.9-1.4-69.8-25.3-3.1-3.1-3.1-8.2 0-11.3 3.1-3.1 8.2-3.1 11.3 0 17.5 17.5 50.1 20 58.5 20s41-2.5 58.5-20c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.3zm.4-61.1c-14.7 0-26.6-11.9-26.6-26.6 0-14.7 11.9-26.6 26.6-26.6s26.6 11.9 26.6 26.6c0 14.7-11.9 26.6-26.6 26.6z" />
  </svg>
);

export default function Footer() {

  return (
    <footer className="relative w-full text-neutral-200 z-30 font-sans">

      {/* Hidden SVG Gradient Defs for Heading Icons */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="headingIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d8b4fe" />
            <stop offset="50%" stopColor="#f9a8d4" />
            <stop offset="100%" stopColor="#d8b4fe" />
          </linearGradient>
          <linearGradient id="goldenBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5C158" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#E5C158" />
          </linearGradient>
          <linearGradient id="listIconGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d4708a" />
            <stop offset="60%" stopColor="#c06080" />
            <stop offset="100%" stopColor="#c8906a" />
          </linearGradient>
        </defs>
      </svg>
      {/* Footer Main Content Body with full-width combined background image */}
      <div
        className="bg-[#08070D] bg-cover bg-center bg-no-repeat w-full relative overflow-visible border-t border-[#D4AF37]/30"
        style={{ backgroundImage: 'url("/combined.png")' }}
      >
        {/* Golden Lotus emblem centered right on top border of footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[58%] z-20 pointer-events-none">
          <img
            src="/goldenlotus.png"
            alt="Golden Lotus Emblem"
            className="w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 object-contain drop-shadow-[0_0_20px_rgba(229,193,88,0.85)]"
          />
        </div>
        {/* Global dark overlay for legibility */}
        <div className="absolute inset-0 bg-[#08070D]/80 pointer-events-none z-0" />

        {/* Global SVG Gradients for cross-referencing */}
        <svg className="sr-only" aria-hidden="true" width="0" height="0">
          <defs>
            <linearGradient id="goldenArrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFE5A3" />
              <stop offset="50%" stopColor="#E5C158" />
              <stop offset="100%" stopColor="#C8933E" />
            </linearGradient>
          </defs>
        </svg>

        {/* Main 4-Column Grid Container */}
        <div className="w-full max-w-[96%] xl:max-w-[94%] 2xl:max-w-[92%] mx-auto px-4 md:px-8 lg:px-12 pt-6 md:pt-8 pb-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 pb-12 border-b border-[#D4AF37]/15">

            {/* Column 1 (Saṃgraha) & Column 2 (Company) */}
            <div className="lg:col-span-5 grid grid-cols-1 lg:grid-cols-2 lg:border-r border-[#D4AF37]/15">

              {/* Column 1: Identity & Crest */}
              <div className="-ml-4 md:-ml-8 lg:-ml-10 xl:-ml-12 lg:pr-8 lg:border-r border-[#D4AF37]/15 flex flex-col justify-between">
                <div>
                  {/* Logo & Title */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <img
                      src="/logo.png"
                      alt="Saṃgraha Logo"
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-24 xl:h-24 shrink-0 -ml-2 sm:-ml-3"
                      style={{
                        filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.6))',
                      }}
                    />
                    <h2
                      className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent tracking-wide whitespace-nowrap"
                      style={{
                        fontFamily: 'serif',
                        WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
                        filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.8)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.9))',
                      }}
                    >
                      Saṃgraha
                    </h2>
                  </div>

                  {/* Subtitle */}
                  <p className="text-[11px] md:text-xs xl:text-sm 2xl:text-base font-bold tracking-[0.22em] uppercase mb-4 leading-tight">
                    {'SANĀTANA KNOWLEDGE & LITERATURE PLATFORM'.split('').map((char, i) => (
                      <span key={i} className="bg-gradient-to-b from-[#E5C158] via-[#e8a060] to-[#d4908a] bg-clip-text text-transparent">
                        {char}
                      </span>
                    ))}
                  </p>

                  {/* Description */}
                  <p className="text-neutral-300 text-xs md:text-xs xl:text-sm 2xl:text-base leading-relaxed mb-6 font-normal">
                    Saṃgraha is a dedicated digital sanctuary preserving classical Sanskrit scriptures, Vedic mantras, palm-leaf manuscripts, and philosophical lineages of India through modern interactive design, high-fidelity audio recitations, and authentic reverence. Our mission is to bridge ancient wisdom with modern technology, providing scholars, seekers, and devotees worldwide with unhindered access to authentic commentaries, original Devanagari texts, Sanskrit grammar tools, and rare stotram traditions preserved across centuries of Sanātana Dharma.
                  </p>

                  {/* Stacked Devanagari Mantra with Ornamental Lines */}
                  <div className="pt-2 text-center w-full">
                    <div className="flex items-center justify-center gap-2 mb-2 w-full">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
                      <span className="text-[#E5C158] text-[10px] xl:text-xs">❁</span>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
                    </div>

                    <div className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-[#E5C158] font-[family-name:var(--font-jaini-purva)] leading-relaxed space-y-3 tracking-wide drop-shadow-[0_2px_8px_rgba(229,193,88,0.3)] font-semibold">
                      <p>न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ।</p>
                      <p>तत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति ॥</p>
                    </div>

                    {/* Philosophical English Translation */}
                    <p className="text-[#E5C158] text-[11px] sm:text-xs italic mt-2.5 leading-relaxed px-2 drop-shadow-[0_1px_4px_rgba(229,193,88,0.25)] font-medium">
                      &quot;In this world, there is nothing as purifying as transcendental knowledge. One who has attained perfection through yoga discovers this divine truth naturally within the Self in due course of time.&quot; — Śrīmad Bhagavad Gītā (4.38)
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-2 w-full">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
                      <span className="text-[#E5C158] text-[10px]">❁</span>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Company */}
              <div className="lg:px-8 flex flex-col justify-between lg:pt-8">
                <div>
                  <h4 className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2 -ml-2" style={{ fontFamily: '"Kameron", serif' }}>
                    <div className="relative w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 shrink-0 -ml-1 flex items-center justify-center">
                      {/* Broken Circle Border with 4 Golden Dots in line breaks */}
                      <svg className="absolute inset-0 w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 pointer-events-none" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#D4AF37"
                          strokeOpacity="0.6"
                          strokeWidth="1.2"
                          strokeDasharray="18.06 5.5"
                          strokeDashoffset="2.75"
                        />
                        <circle cx="18" cy="3" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                        <circle cx="33" cy="18" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                        <circle cx="18" cy="33" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                        <circle cx="3" cy="18" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                      </svg>

                      <svg className="w-4 h-4 md:w-4.5 md:h-4.5 xl:w-5 xl:h-5 2xl:w-5.5 2xl:h-5.5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="url(#headingIconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                        <path d="M10 6h4" />
                        <path d="M10 10h4" />
                        <path d="M10 14h4" />
                        <path d="M10 18h4" />
                      </svg>
                    </div>
                    <span className="tracking-widest">
                      {'COMPANY'.split('').map((char, i) => (
                        <span key={i} className="bg-gradient-to-b from-[#E5C158] via-[#e8a060] to-[#d4908a] bg-clip-text text-transparent">
                          {char}
                        </span>
                      ))}
                    </span>
                  </h4>

                  <div className="space-y-0.5 mb-5 -ml-3">
                    {[
                      { name: 'About Us', path: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="8" r="3" /><path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" /></> },
                      { name: 'FAQ', path: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></> },
                      { name: 'Privacy Policy', path: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="M12 22V2" /></> },
                      { name: 'Terms of Service', path: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></> },
                      { name: 'Refund Policy', path: <><polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" /></> },
                    ].map((item, idx, arr) => (
                      <div key={idx} className="w-full">
                        <Link
                          href="#"
                          className="group flex items-center justify-between py-3 px-3 rounded-xl hover:bg-white/8 transition-all text-xs text-neutral-300 hover:text-white"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 md:w-8 md:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 rounded-xl bg-[#181324]/80 backdrop-blur-sm border border-[#d4708a]/25 shadow-[0_0_8px_rgba(212,112,138,0.2)] flex items-center justify-center shrink-0 group-hover:border-[#d4708a]/50 group-hover:shadow-[0_0_12px_rgba(212,112,138,0.35)] transition-all">
                              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 xl:w-4.5 xl:h-4.5 2xl:w-5 2xl:h-5" viewBox="0 0 24 24" fill="none" stroke="url(#listIconGradient)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                                {item.path}
                              </svg>
                            </div>
                            <span className="font-normal text-[15px] xl:text-base 2xl:text-lg text-neutral-200 group-hover:text-amber-200 transition-colors">{item.name}</span>
                          </div>
                          <svg
                            className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="url(#goldenArrowGradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </Link>
                        {idx < arr.length - 1 && (
                          <div className="relative flex items-center my-2.5 px-0.5">
                            {/* Left Arrowhead */}
                            <svg className="w-2 h-2 text-[#D4AF37]/45 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M4,12 L20,6 L15,12 L20,18 Z" />
                            </svg>

                            {/* Left line */}
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-[#D4AF37]/35 to-[#D4AF37]/10 mx-1" />

                            {/* Center Golden Lotus */}
                            <img
                              src="/goldenlotus.png"
                              alt="Golden Lotus Divider Emblem"
                              className="w-6 h-6 shrink-0 object-contain drop-shadow-[0_0_6px_rgba(229,193,88,0.6)]"
                            />

                            {/* Right line */}
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-[#D4AF37]/35 to-[#D4AF37]/10 mx-1" />

                            {/* Right Arrowhead */}
                            <svg className="w-2 h-2 text-[#D4AF37]/45 shrink-0 rotate-180" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M4,12 L20,6 L15,12 L20,18 Z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Circle of Wisdom & Mantra (4 cols) */}
            <div className="lg:col-span-4 lg:px-8 lg:border-r border-[#D4AF37]/15 flex flex-col justify-between lg:pt-8">
              <div>
                <h4 className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ fontFamily: '"Kameron", serif' }}>
                  <div className="relative w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 shrink-0 flex items-center justify-center">
                    {/* Broken Circle Border with 4 Golden Dots in line breaks */}
                    <svg className="absolute inset-0 w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 pointer-events-none" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="#D4AF37"
                        strokeOpacity="0.6"
                        strokeWidth="1.2"
                        strokeDasharray="18.06 5.5"
                        strokeDashoffset="2.75"
                      />
                      <circle cx="18" cy="3" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                      <circle cx="33" cy="18" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                      <circle cx="18" cy="33" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                      <circle cx="3" cy="18" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                    </svg>

                    <svg className="w-4 h-4 md:w-4.5 md:h-4.5 xl:w-5 xl:h-5 2xl:w-5.5 2xl:h-5.5 relative z-10" viewBox="0 0 512 512" fill="url(#headingIconGradient)">
                      <path d="M66.89 18L128 128L18 117v32.5L96 208l-78 39v35l110 22l-3.6 16c-12.6 12.1-21.9 26.5-28.46 42.5c-14.43 35.2-16.64 85.7-16.9 131.5h18.1c.34-44.1 2.78-93.8 15.46-124.7c8.9-21.9 22.4-39.6 44.6-52.1c-4.1-22-6.2-43.5-6.2-61.2v-14.6l13 6.6c9.6 4.7 16.5 6.2 23.1 5.7c-5.2-14-8.1-29.6-8.1-45.7c0-29.1 9.1-55.2 23.3-73.7S235.4 105 256 105s39.5 10.8 53.7 29.3S333 178.9 333 208c0 16.1-2.9 31.7-8.1 45.7c6.6.5 13.6-1 23.1-5.7l13-6.6V256c0 17.7-2.1 39.2-6.2 61.2c22.2 12.5 35.7 30.2 44.6 52.1c12.7 30.9 15.1 80.6 15.5 124.7H433c-.3-45.8-2.5-96.3-16.9-131.5c-6.6-16-15.9-30.5-28.6-42.6L384 304l110-22v-35l-78-39l78-58.5V117l-110 11l61.1-110h-37.8L304 80l-18.6-62h-58.8L208 80L104.7 18zM208 215v18h32v-18zm64 0v18h32v-18zm-33.6 36.1c-12.7 6.7-23.7 13.5-35.6 17.4c-10 3.4-21.1 4.1-33.3.8c.5 8 1.3 16.7 2.4 25.7c27.2-.4 51.7-3.3 77.7-29.4l1.7-1.6zm35.2 0L260.7 264l1.7 1.6c26 26.1 50.5 29 77.7 29.4c1.1-9 1.9-17.7 2.4-25.7c-12.2 3.3-23.3 2.6-33.3-.8c-11.9-3.9-22.9-10.7-35.6-17.4M256 284.3c-27 23.7-55.2 27.8-81.3 28.5c1.7 9 3.6 18 6 26.9c2.2 8.3 4.8 16.3 7.6 23.9C193.9 353.1 201 343 208 336c0 21-6.9 35-11.6 46.8c3.8 7.6 7.8 14.4 12.1 20l24.5-24.5V400c0 14.5 2.8 19.1 7.4 23.6c3.4 3.5 9.1 6.9 15.6 12.3c6.5-5.4 12.2-8.8 15.6-12.3c4.6-4.5 7.4-9.1 7.4-23.6v-21.7l24.5 24.5c4.3-5.6 8.3-12.4 12.1-20C310.9 371 304 357 304 336c7 7 14.1 17.1 19.7 27.6c2.8-7.6 5.4-15.6 7.6-23.9c2.4-8.9 4.3-17.9 6-26.9c-26.1-.7-54.3-4.8-81.3-28.5" />
                    </svg>
                  </div>
                  <span className="tracking-widest">
                    {'WISDOM'.split('').map((char, i) => (
                      <span key={i} className="bg-gradient-to-b from-[#E5C158] via-[#e8a060] to-[#d4908a] bg-clip-text text-transparent">
                        {char}
                      </span>
                    ))}
                  </span>
                </h4>

                <p className="text-neutral-300 text-xs md:text-xs xl:text-sm 2xl:text-base leading-relaxed mb-4">
                  Subscribe to our sacred circle of wisdom to receive authentic English translations of rare stotrams, Vedic astronomical Panchanga calendar updates, festival lore, Sanskrit linguistic insights, and monthly manuscript release notes delivered directly to your inbox.
                </p>

                {/* Contact Image with Overlayed Email Input & Button */}
                <div className="relative w-full mb-6 rounded-xl overflow-hidden">
                  <img 
                    src="/contact.png" 
                    alt="Contact Art" 
                    className="w-full h-auto object-contain rounded-xl scale-115 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center -translate-y-3 px-4 py-3 space-y-2.5">
                    <form onSubmit={(e) => e.preventDefault()} className="w-[55%] mx-auto space-y-2.5">
                      <div className="relative w-full flex items-center justify-center rounded-lg overflow-hidden scale-110 transition-transform">
                        <img 
                          src="/connect.png" 
                          alt="Connect Email Bar" 
                          className="w-full h-auto object-contain pointer-events-none" 
                        />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          style={{ WebkitTextFillColor: '#76283B' }}
                          className="absolute inset-0 w-full h-full pl-3.5 pr-9 pt-[11px] pb-1 bg-transparent text-[#76283B] placeholder:text-[#76283B] text-xs md:text-xs xl:text-sm focus:outline-none font-medium"
                        />
                      </div>

                      <button
                        type="submit"
                        className="relative w-full flex items-center justify-center rounded-lg overflow-hidden transition-all duration-150 ease-out hover:scale-115 scale-110 -translate-x-2 active:scale-100 active:translate-y-1 active:brightness-90 group cursor-pointer select-none"
                      >
                        <img 
                          src="/subscribe.png" 
                          alt="Subscribe Button" 
                          className="w-full h-auto object-contain pointer-events-none" 
                        />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Connect With Us & Yogi Art (3 cols) */}
            <div className="lg:col-span-3 lg:pl-8 flex flex-col justify-between lg:pt-8">
              <div>
                <h4 className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: '"Kameron", serif' }}>
                  <div className="relative w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 shrink-0 flex items-center justify-center">
                    {/* Broken Circle Border with 4 Golden Dots in line breaks */}
                    <svg className="absolute inset-0 w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 pointer-events-none" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="#D4AF37"
                        strokeOpacity="0.6"
                        strokeWidth="1.2"
                        strokeDasharray="18.06 5.5"
                        strokeDashoffset="2.75"
                      />
                      <circle cx="18" cy="3" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                      <circle cx="33" cy="18" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                      <circle cx="18" cy="33" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                      <circle cx="3" cy="18" r="1.5" fill="#E5C158" className="drop-shadow-[0_0_4px_rgba(229,193,88,0.9)]" />
                    </svg>

                    <svg className="w-4 h-4 md:w-4.5 md:h-4.5 xl:w-5 xl:h-5 2xl:w-5.5 2xl:h-5.5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="url(#headingIconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m19 5 3-3" />
                      <path d="m2 22 3-3" />
                      <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" />
                      <path d="M7.5 13.5 10 11" />
                      <path d="M10.5 16.5 13 14" />
                      <path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" />
                    </svg>
                  </div>
                  <span className="tracking-widest">
                    {'CONNECT WITH US'.split('').map((char, i) => (
                      <span key={i} className="bg-gradient-to-b from-[#E5C158] via-[#e8a060] to-[#d4908a] bg-clip-text text-transparent">
                        {char}
                      </span>
                    ))}
                  </span>
                </h4>

                <p className="text-neutral-300 text-xs md:text-xs xl:text-sm 2xl:text-base leading-relaxed mb-3">
                  Connect with our global digital sanctuary across community channels for daily stotram verses, ancient manuscript revelations, interactive Sanskrit learning sessions, Vedic wisdom updates, and spiritual discourses with traditional scholars.
                </p>

                {/* Yogi Image Container with Centered Vertical Social Icons */}
                <div className="mt-20 relative w-full max-w-[420px] mx-auto rounded-xl overflow-visible flex items-center justify-center social-ray-container group min-h-[300px]">
                  <img
                    src="/yogi.png"
                    alt="Yogi Art"
                    style={{
                      filter: 'drop-shadow(0 0 25px rgba(229, 193, 88, 0.35)) drop-shadow(0 8px 25px rgba(0, 0, 0, 0.85))',
                      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 88%)',
                      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 88%)',
                    }}
                    className="w-full h-[280px] md:h-[310px] object-fill scale-y-105 translate-y-3 transition-all duration-300 pointer-events-none"
                  />
                  
                  {/* Centered Circular Social Icons Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <a 
                        href="#" 
                        style={{ transform: 'rotate(0deg) translateY(-155px) rotate(0deg)' }}
                        className="absolute z-10"
                        aria-label="YouTube"
                      >
                        <div className="social-ray-icon-1 w-11 h-11 rounded-full border border-purple-400/40 flex items-center justify-center shadow-xl shadow-black/60 transition-transform duration-300 hover:scale-130 cursor-pointer">
                          <YoutubeIcon height="1.3em" />
                        </div>
                      </a>
                      <a 
                        href="#" 
                        style={{ transform: 'rotate(72deg) translateY(-132px) rotate(-72deg)' }}
                        className="absolute z-10"
                        aria-label="X (Twitter)"
                      >
                        <div className="social-ray-icon-2 w-11 h-11 rounded-full border border-purple-400/40 flex items-center justify-center shadow-xl shadow-black/60 transition-transform duration-300 hover:scale-130 cursor-pointer">
                          <XTwitterIcon height="1.3em" />
                        </div>
                      </a>
                      <a 
                        href="#" 
                        style={{ transform: 'rotate(120deg) translateY(-155px) rotate(-120deg) translateX(-6px)' }}
                        className="absolute z-10"
                        aria-label="Instagram"
                      >
                        <div className="social-ray-icon-3 w-11 h-11 rounded-full border border-purple-400/40 flex items-center justify-center shadow-xl shadow-black/60 transition-transform duration-300 hover:scale-130 cursor-pointer">
                          <Instagram className="w-5 h-5" />
                        </div>
                      </a>
                      <a 
                        href="#" 
                        style={{ transform: 'rotate(180deg) translateY(-180px) rotate(-180deg)' }}
                        className="absolute z-10"
                        aria-label="Facebook"
                      >
                        <div className="social-ray-icon-4 w-11 h-11 rounded-full border border-purple-400/40 flex items-center justify-center shadow-xl shadow-black/60 transition-transform duration-300 hover:scale-130 cursor-pointer">
                          <Facebook className="w-5 h-5" />
                        </div>
                      </a>
                      <a 
                        href="#" 
                        style={{ transform: 'rotate(240deg) translateY(-155px) rotate(-240deg) translateX(6px)' }}
                        className="absolute z-10"
                        aria-label="Reddit"
                      >
                        <div className="social-ray-icon-5 w-11 h-11 rounded-full border border-purple-400/40 flex items-center justify-center shadow-xl shadow-black/60 transition-transform duration-300 hover:scale-130 cursor-pointer">
                          <RedditIcon height="1.3em" />
                        </div>
                      </a>
                      <a 
                        href="#" 
                        style={{ transform: 'rotate(288deg) translateY(-132px) rotate(-288deg)' }}
                        className="absolute z-10"
                        aria-label="Contact Email"
                      >
                        <div className="social-ray-icon-6 w-11 h-11 rounded-full border border-purple-400/40 flex items-center justify-center shadow-xl shadow-black/60 transition-transform duration-300 hover:scale-130 cursor-pointer">
                          <Mail className="w-5 h-5" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}
