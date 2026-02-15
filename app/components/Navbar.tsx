'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fade in animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Pill-shaped Floating Navbar */}
      <nav
        className={`fixed top-12 left-1/2 -translate-x-1/2 z-100 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          scrolled 
            ? 'backdrop-blur-xl bg-white/10 shadow-2xl shadow-black/20' 
            : 'backdrop-blur-lg bg-white/5 shadow-xl shadow-black/10'
        }`}
        style={{
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="px-6 py-3">
          <div className="flex items-center justify-between gap-8">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="relative group" style={{scale:"160%"}}>
                <Link href="/">  <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-9 h-9 transition-all duration-300"
                /></Link>
               
              </div>
              
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              <a
                href="#about"
                className="px-4 py-2 rounded-full text-white/80 hover:text-white transition-all duration-200 font-medium text-sm border border-transparent hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30"
              >
                About
              </a>
              <a
                href="register"
                className="px-4 py-2 rounded-full text-white/80 hover:text-white transition-all duration-200 font-medium text-sm border border-transparent hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30"
              >
                Register
              </a>
              <a
                href="#login"
                className="px-4 py-2 rounded-full text-white/80 hover:text-white transition-all duration-200 font-medium text-sm border border-transparent hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30"
              >
                Login
              </a>
             
            </div>

           

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Floating Pill */}
      {mobileMenuOpen && (
        <div
          className="fixed top-28 left-1/2 -translate-x-1/2 z-40 md:hidden backdrop-blur-xl bg-white/10 shadow-2xl shadow-black/20 animate-in fade-in slide-in-from-top-5 duration-300"
          style={{
            borderRadius: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="px-6 py-4 flex flex-col space-y-2 min-w-[200px]">
            <a
              href="#about"
              className="px-4 py-2 rounded-full text-white/80 hover:text-white transition-all duration-200 font-medium text-sm border border-transparent hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="register"
              className="px-4 py-2 rounded-full text-white/80 hover:text-white transition-all duration-200 font-medium text-sm border border-transparent hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </a>
            <a
              href="#login"
              className="px-4 py-2 rounded-full text-white/80 hover:text-white transition-all duration-200 font-medium text-sm border border-transparent hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </a>
          </div>
        </div>
      )}
    </>
  );
}

