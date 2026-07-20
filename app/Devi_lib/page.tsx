"use client";

import { useEffect, useCallback, useMemo, useState, useRef } from "react";
import Navbar from '../components/Navbar';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const NEBULA_BG = "https://customer-assets.emergentagent.com/job_9a8c7235-cd44-47f5-89ec-2821b1cd1cd7/artifacts/oxir3xes_task_01knf7bp44eb08pxqr8wm6e8kf_1775406349_img_1.webp";
const DEITY_IMG = "https://customer-assets.emergentagent.com/job_9a8c7235-cd44-47f5-89ec-2821b1cd1cd7/artifacts/50sf7jtp_ce989154-bb5c-4279-8dd6-20a92124f0cf-ezremove.png";

const FloatingParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.5 + 0.2,
      color: ["#ffffff", "#E6C998", "#6495ED", "#9370DB"][Math.floor(Math.random() * 4)],
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function ParallaxScene() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll();

  const bgX = useTransform(smoothMouseX, [-1, 1], [15, -15]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [15, -15]);

  const textX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const images = [NEBULA_BG, DEITY_IMG];
    let loadedCount = 0;

    images.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });

    const timeout = setTimeout(() => {
      setImagesLoaded(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;

    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 bg-[#030305] flex items-center justify-center z-[9999]">
        <motion.div
          className="text-2xl text-[#E6C998]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Cosmos...
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Navbar />
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center"
          style={{
            x: bgX,
            y: bgY,
          }}
        >
          <img
            src={NEBULA_BG}
            alt="Cosmic Nebula Background"
            className="w-full h-full object-contain scale-[1.35]"
            style={{ filter: "hue-rotate(160deg) saturate(1.4) brightness(0.75)" }}
          />
        </motion.div>

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#030305]/80 to-transparent z-[5]" />

        <div className="absolute inset-0 z-10">
          <FloatingParticles />
        </div>

        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          style={{
            x: textX,
            y: textY,
          }}
        >
          <motion.p
            className="italic text-[#A0AAB2] text-lg md:text-xl mb-4 tracking-[0.5em] font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            अनन्त शक्ति
          </motion.p>

          <motion.h1
            className="tracking-[0.3em] uppercase text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold text-white/90"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              textShadow: "0 0 30px rgba(230, 201, 152, 0.4), 0 0 60px rgba(230, 201, 152, 0.2)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.2 }}
          >
            Devī
          </motion.h1>

          <motion.h1
            className="tracking-[0.3em] uppercase text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-[#E6C998]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              textShadow: "0 0 30px rgba(230, 201, 152, 0.4), 0 0 60px rgba(100, 149, 237, 0.2)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2 }}
          >
            Bhagavatī
          </motion.h1>

          <motion.p
            className="text-[#A0AAB2] text-sm md:text-base mt-6 tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता।
            नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥
          </motion.p>
        </motion.div>

        <div className="absolute inset-0 z-40 pointer-events-none">
          <div className="absolute top-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[#030305]/90 to-transparent" />

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ opacity: textOpacity }}
          >
            <span
              className="text-xs text-[#A0AAB2] tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-[#E6C998]" />
            </motion.div>
          </motion.div>

          <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/20" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-white/20" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-white/20" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-white/20" />
        </div>
      </div>
    </div>
  );
}
