'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import ScriptureCard from '../components/ScriptureCard';
import ThirdEyeFlare from '../components/ThirdEyeFlare';
import ThirdEyeDialog from '../components/ThirdEyeDialog';

const ROTATION_DURATION_MS = 5000;

const styles = `
  @keyframes particleForm {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    100% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
  }
  
  @keyframes particleFade {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  
  @keyframes shimmer {
    0%, 100% {
      filter: brightness(1.1) saturate(1.3);
    }
    50% {
      filter: brightness(1.35) saturate(1.6);
    }
  }
  
  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: translateY(-50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }
`;

function SnowOverlay({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = targetRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number | null = null;
    let width = 0;
    let height = 0;

    const setSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w !== width || h !== height) {
        width = w;
        height = h;
        canvas.width = width;
        canvas.height = height;
      }
    };

    setSize();

    const ro = new ResizeObserver(() => {
      setSize();
    });
    ro.observe(container);

    const count = Math.max(32, Math.floor((width * height) / 90000));
    const flakes: { x: number; y: number; vx: number; vy: number; len: number; t: number; drift: number; p: number }[] = [];

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const spawn = () => {
      const spawnType = Math.random();
      
      if (spawnType < 0.35) {
        return {
          x: rand(-width * 0.2, width * 0.12),
          y: rand(-60, height * 0.28),
          vx: rand(4.0, 8.0),
          vy: rand(2.0, 4.4),
          len: rand(60, 130),
          t: rand(0.5, 1.0),
          drift: rand(0.2, 0.9),
          p: rand(0, Math.PI * 2),
        };
      }
      else if (spawnType < 0.65) {
        return {
          x: rand(-40, width * 0.6),
          y: rand(-90, -20),
          vx: rand(5.0, 9.0),
          vy: rand(3.5, 6.5),
          len: rand(70, 150),
          t: rand(0.5, 1.0),
          drift: rand(0.2, 0.9),
          p: rand(0, Math.PI * 2),
        };
      }
      else {
        return {
          x: rand(-width * 0.15, width * 0.08),
          y: rand(height * 0.7, height * 1.1),
          vx: rand(4.5, 8.5),
          vy: rand(2.5, 5.0),
          len: rand(65, 140),
          t: rand(0.5, 1.0),
          drift: rand(0.2, 0.9),
          p: rand(0, Math.PI * 2),
        };
      }
    };
    for (let i = 0; i < count; i++) flakes.push(spawn());

    let time = 0;
    const step = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        const pulse = 1.15 + Math.max(0, Math.sin(time * 0.10) * 1.2);
        const burst = (time % 240) < 26 ? 1.5 : 1.0;
        const mul = pulse * burst;
        const gust = Math.sin(time * 0.018 + f.p) * 0.6;
        const speedScale = 0.55;
        f.x += (f.vx * mul + gust * 0.5 + Math.sin(time * 0.01 + f.p) * 0.12 * f.drift) * speedScale;
        f.y += (f.vy * mul + Math.cos(time * 0.01 + f.p) * 0.07 * f.drift) * speedScale;

        if (f.x > width + 60 || f.y > height + 60) flakes[i] = spawn();

        const rBase = Math.max(0.8, f.t * 1.6);
        const r = rBase * (1 + Math.sin(time * 0.05 + f.p) * 0.25);
        ctx.shadowColor = 'rgba(230, 160, 20, 0.4)';
        ctx.shadowBlur = r * 1.8;
        const rg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r);
        rg.addColorStop(0, 'rgba(250, 225, 170, 0.95)');
        rg.addColorStop(0.35, 'rgba(215, 160, 40, 0.8)');
        rg.addColorStop(0.7, 'rgba(160, 110, 20, 0.35)');
        rg.addColorStop(1, 'rgba(160, 110, 20, 0)');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, [targetRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

interface Book {
  _id?: string;
  sanskrit_name?: string;
  english_name?: string;
  sampradaaya?: string;
  details?: string;
  category?: string;
  publication?: string | string[];
  image?: string;
  position?: number;
}

const DEFAULT_SHAIVA_BOOKS: Book[] = [
  { _id: '1', sanskrit_name: 'शिवमहिम्न', english_name: 'Shiva Mahimna Stotra', category: 'Stotra', details: 'A glorious hymn dedicated to Lord Shiva by Pushpadanta.' },
  { _id: '2', sanskrit_name: 'रुद्राक्ष', english_name: 'Rudraksha Mahatmya', category: 'Purana', details: 'Significance and glory of holy Rudraksha beads.' },
  { _id: '3', sanskrit_name: 'लिंग पुराण', english_name: 'Linga Purana', category: 'Purana', details: 'One of the eighteen Mahapuranas detailing the Linga manifestation.' },
  { _id: '4', sanskrit_name: 'शिव तंत्र', english_name: 'Shiva Tantra', category: 'Tantra', details: 'Esoteric traditions and meditative practices of Shaivism.' },
  { _id: '5', sanskrit_name: 'महादेव कथा', english_name: 'Mahadeva Katha', category: 'Katha', details: 'Sacred legends and stories of Mahadeva.' },
  { _id: '6', sanskrit_name: 'नटराज', english_name: 'Nataraja Stuti', category: 'Stotra', details: 'Praise of the Cosmic Dancer Nataraja.' },
  { _id: '7', sanskrit_name: 'त्रिपुर भैरव', english_name: 'Tripura Bhairava', category: 'Agama', details: 'Agamic worship and cosmic principles of Shiva.' },
];

export default function ShivaLibraryPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reverseIntervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const timeUpdateHandlerRef = useRef<((evt: Event) => void) | null>(null);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [bookRotation, setBookRotation] = useState(0);
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [hoveredBookData, setHoveredBookData] = useState<Book | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [permanentCard, setPermanentCard] = useState<Book | null>(null);
  const [showBookAnimation, setShowBookAnimation] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [startParticleForm, setStartParticleForm] = useState(false);
  const [showThirdEyeFlare, setShowThirdEyeFlare] = useState(false);
  const [showThirdEyeDialog, setShowThirdEyeDialog] = useState(false);
  // Delay controls for 'S' key clockwise rotation
  const rotationDelayTimeoutRef = useRef<number | null>(null);
  const rotationDelayActiveRef = useRef(false);
  const [allBooks, setAllBooks] = useState<Book[]>(DEFAULT_SHAIVA_BOOKS);
  const [visibleOffset, setVisibleOffset] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const allBooksRef = useRef<Book[]>(DEFAULT_SHAIVA_BOOKS);
  useEffect(() => { allBooksRef.current = allBooks; }, [allBooks]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (response.ok) {
          const data = await response.json();
          const filteredBooks = (data.books || []).filter((b: any) => {
            const sp = b?.sampradaaya ?? [];
            if (Array.isArray(sp)) {
              const set = new Set(sp.map((x: string) => (typeof x === 'string' ? x.trim() : x)));
              return set.has('All') || (set.has('Shaiva') && set.has('Smaartha'));
            }
            if (typeof sp === 'string') {
              const t = sp.trim();
              return t === 'All';
            }
            return false;
          });
          if (filteredBooks.length > 0) {
            setAllBooks(filteredBooks);
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Failed to fetch books:', errorData.error || 'Unknown error');
          if (errorData.error?.includes('MONGODB_URI')) {
            console.warn('MongoDB connection string not configured. Please set MONGODB_URI in .env.local');
          }
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Calculate visible books based on offset
  const visibleBooks = useMemo(() => {
    const list = allBooks.length > 0 ? allBooks : DEFAULT_SHAIVA_BOOKS;
    const total = list.length;
    const result = [];
    for (let i = 0; i < 7; i++) {
      result.push(list[(visibleOffset + i) % total]);
    }
    return result;
  }, [allBooks, visibleOffset]);

  useEffect(() => {
    const introVid = introVideoRef.current;
    const audio = introAudioRef.current;
    if (!introVid || !showIntro) return;

    let fallbackTimer: NodeJS.Timeout | null = null;
    let isEnded = false;

    const handleIntroEnd = () => {
      if (isEnded) return;
      isEnded = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (audio) {
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch {}
      }
      setShowIntro(false);
      // Start the book animation sequence
      setTimeout(() => {
        setShowBookAnimation(true);
        setStartParticleForm(false);
        requestAnimationFrame(() => setStartParticleForm(true));
        // Show books after animation completes (2 seconds)
        setTimeout(() => {
          setShowBookAnimation(false);
          setStartParticleForm(false);
          setShowBooks(true);
          // Show third eye flare after books appear
          setTimeout(() => {
            setShowThirdEyeFlare(true);
          }, 500);
        }, 3300);
      }, 100);
    };

    const handleIntroPlay = () => {
      if (audio) {
        try {
          audio.currentTime = 0;
          audio.volume = 0.7;
          audio.play().catch(() => {});
        } catch {}
      }
    };

    const handleIntroPause = () => {
      if (audio) {
        try { audio.pause(); } catch {}
      }
    };

    // Safety fallback: intro video mo_untain.mp4 is ~5.5 seconds long
    // If video fails or stalls, automatically transition after 6.5s
    fallbackTimer = setTimeout(() => {
      handleIntroEnd();
    }, 6500);

    introVid.addEventListener('ended', handleIntroEnd);
    introVid.addEventListener('play', handleIntroPlay);
    introVid.addEventListener('pause', handleIntroPause);
    
    // Attempt playback
    introVid.play().catch(err => {
      console.warn('Intro video autoplay warning:', err);
    });

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      introVid.removeEventListener('ended', handleIntroEnd);
      introVid.removeEventListener('play', handleIntroPlay);
      introVid.removeEventListener('pause', handleIntroPause);
      if (audio) {
        try { audio.pause(); } catch {}
      }
    };
  }, [showIntro]);

  // ... existing code ...

  // Rotation helpers
  const rotateForward = () => {
    const v = videoRef.current;
    const len = allBooksRef.current.length || 7;
    if (isRotating) return;

    if (reverseIntervalRef.current) {
      clearInterval(reverseIntervalRef.current as NodeJS.Timeout);
      reverseIntervalRef.current = null;
    }

    setIsRotating(true);
    setBookRotation(prev => prev - 360);
    setTimeout(() => {
      setVisibleOffset(prev => (prev + 1) % len);
      setIsRotating(false);
    }, ROTATION_DURATION_MS);

    if (v) {
      v.pause();
      if (!v.src.endsWith('/finfin.mp4')) {
        v.src = '/finfin.mp4';
      }
      v.currentTime = 0;
      v.play().catch(err => console.warn('Video play warning:', err));
    }
  };

  const rotateBackward = () => {
    const v = videoRef.current;
    const len = allBooksRef.current.length || 7;
    if (isRotating) return;

    if (reverseIntervalRef.current) {
      clearInterval(reverseIntervalRef.current as NodeJS.Timeout);
      reverseIntervalRef.current = null;
    }

    setIsRotating(true);
    setBookRotation(prev => prev + 360);
    setTimeout(() => {
      setVisibleOffset(prev => (prev - 1 + len) % len);
      setIsRotating(false);
    }, ROTATION_DURATION_MS);

    if (v) {
      if (!v.src.endsWith('/finfin.mp4')) {
        v.src = '/finfin.mp4';
      }
      v.pause();

      const startPos = !isNaN(v.duration) && v.duration > 0 ? v.duration : 5;
      if (v.currentTime <= 0.1 || v.currentTime >= startPos) {
        v.currentTime = startPos;
      }

      let lastTime = performance.now();
      reverseIntervalRef.current = setInterval(() => {
        const now = performance.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        if (v && v.currentTime > 0.05) {
          v.currentTime = Math.max(0, v.currentTime - delta);
        } else {
          if (v) v.currentTime = 0;
          if (reverseIntervalRef.current) {
            clearInterval(reverseIntervalRef.current as NodeJS.Timeout);
            reverseIntervalRef.current = null;
          }
        }
      }, 30);
    }
  };

  // S and W key handlers for main video and book rotation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === 'w') {
        if (isRotating) return;
        rotateForward();
        return;
      }

      if (key === 's') {
        if (isRotating) return;
        rotateBackward();
        return;
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      if (reverseIntervalRef.current) {
        clearInterval(reverseIntervalRef.current as NodeJS.Timeout);
        reverseIntervalRef.current = null;
      }
    };
  }, [isRotating]);

  // Book interaction handlers
  const handleBookHover = (idx: number, e: React.MouseEvent) => {
    setHoveredBook(idx);
    setHoveredBookData(visibleBooks[idx] || null);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleBookLeave = () => {
    setHoveredBook(null);
    setHoveredBookData(null);
  };

  const handleBookClick = (idx: number) => {
    const book = visibleBooks[idx];
    if (book) {
      setPermanentCard(book);
    }
  };

  const handleThirdEyeClick = () => {
    setShowThirdEyeDialog(true);
  };

  const handleDialogClose = () => {
    setShowThirdEyeDialog(false);
  };

  const handleBookSelect = (book: Book) => {
    setShowThirdEyeDialog(false);
    setPermanentCard(book);
  };

  const handleClosePermanentCard = () => {
    setPermanentCard(null);
  };

  return (
    <div className="w-full min-h-screen overflow-hidden relative bg-black">
      <style>{styles}</style>
      {showIntro && (
        <div className="fixed inset-0 z-50 bg-black">
          <video
            ref={introVideoRef}
            src="/mo_untain.mp4"
            autoPlay
            muted
            playsInline
          className="w-full h-full object-cover"
          />
          <audio ref={introAudioRef} src="/shiva-damura-sound-359599.mp3" preload="auto" />
        </div>
      )}
      <Navbar />
      <div ref={containerRef} className="relative w-full">
        <video
          ref={videoRef}
          src="/finfin.mp4"
          
          playsInline
          className="w-full h-auto object-contain block"
        />
        <SnowOverlay targetRef={containerRef} />
        
        {/* Particle Formation Animation - Shows before books */}
        {!showIntro && showBookAnimation && (
          <div className="absolute inset-0" style={{ zIndex: 50 }}>
            {[
              { top: '80%', left: '67%', rotate: 112 },
              { top: '84%', left: '67%', rotate: 100 },
              { top: '68%', left: '65%', rotate: 62 },
              { top: '57%', left: '62%', rotate: 28 },
              { top: '59%', left: '46%', rotate: -28 },
              { top: '58%', left: '46%', rotate: -48 },
              { top: '45%', left: '50%', rotate: -52 },
            ].map((p, idx) => (
              <div
                key={idx}
                className="absolute"
                style={{
                  top: p.top,
                  left: p.left,
                  transform: `translate(-50%, -50%) rotate(${p.rotate}deg)`,
                }}
              >
                <div className="relative" style={{ 
                  width: 'clamp(40px, 5vw, 80px)', 
                  height: 'clamp(55px, 6.875vw, 110px)',
                  transform: 'translateY(490%) scale(2.5)'
                }}>
                  {/* Generate particles in book shape */}
                  {Array.from({ length: 150 }).map((_, i) => {
                    let targetX = 0;
                    let targetY = 0;
                    
                    // Define book rectangle dimensions
                    const bookWidth = 44;
                    const bookHeight = 56;
                    
                    // Distribute particles more evenly on all edges
                    const edgeRandom = Math.random();
                    
                    if (edgeRandom < 0.25) {
                      // Top edge
                      targetX = (Math.random() - 0.5) * bookWidth;
                      targetY = -bookHeight / 2;
                    } else if (edgeRandom < 0.5) {
                      // Bottom edge
                      targetX = (Math.random() - 0.5) * bookWidth;
                      targetY = bookHeight / 2;
                    } else if (edgeRandom < 0.75) {
                      // Left edge
                      targetX = -bookWidth / 2;
                      targetY = (Math.random() - 0.5) * bookHeight;
                    } else {
                      // Right edge
                      targetX = bookWidth / 2;
                      targetY = (Math.random() - 0.5) * bookHeight;
                    }
                    
                    // Add more corner emphasis
                    if (Math.random() > 0.75) {
                      const corner = Math.floor(Math.random() * 4);
                      if (corner === 0) {
                        targetX = -bookWidth / 2;
                        targetY = -bookHeight / 2;
                      } else if (corner === 1) {
                        targetX = bookWidth / 2;
                        targetY = -bookHeight / 2;
                      } else if (corner === 2) {
                        targetX = -bookWidth / 2;
                        targetY = bookHeight / 2;
                      } else {
                        targetX = bookWidth / 2;
                        targetY = bookHeight / 2;
                      }
                    }
                    
                    // Add fill particles
                    if (Math.random() > 0.85) {
                      targetX = (Math.random() - 0.5) * (bookWidth - 4);
                      targetY = (Math.random() - 0.5) * (bookHeight - 4);
                    }
                    
                    // Starting position (scattered around)
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 80 + Math.random() * 120;
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance;
                    
                    const delay = Math.random() * 0.8;
                    const size = 1 + Math.random() * 2;
                    const formDur = 1.8 + Math.random() * 0.6;
                    const shimmerDur = 0.8 + Math.random() * 0.5;
                    const fadeAt = 2.2 + delay;
                    
                    return (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: `${size}px`,
                          height: `${size}px`,
                          background: `
                            radial-gradient(
                              circle at 40% 40%,
                              rgba(235, 220, 190, 1) 0%,
                              rgba(214, 168, 48, 1) 25%,
                              rgba(170, 120, 20, 0.95) 50%,
                              rgba(120, 80, 10, 0.85) 75%,
                              rgba(90, 60, 10, 0.6) 100%
                            )
                          `,
                          borderRadius: '50%',
                          boxShadow: `
                            0 0 ${size * 2.2}px rgba(200, 150, 40, 0.5),
                            0 0 ${size * 1.1}px rgba(170, 130, 80, 0.4),
                            inset ${size * 0.4}px ${size * 0.4}px ${size * 0.6}px rgba(140, 100, 40, 0.35),
                            0 ${size * 0.2}px ${size}px rgba(160, 110, 20, 0.3)
                          `,
                          animation: `
                            particleFade 0.35s ease ${fadeAt}s forwards,
                            shimmer ${shimmerDur}s ease-in-out infinite ${delay}s
                          `,
                          transition: `transform ${formDur}s cubic-bezier(0.25, 0.8, 0.25, 1) ${delay}s, opacity ${Math.max(0.6, formDur * 0.4)}s ease ${delay}s, filter ${formDur}s ease ${delay}s`,
                          opacity: startParticleForm ? 1 : 0,
                          transform: startParticleForm ? `translate(${targetX}px, ${targetY}px) scale(1)` : `translate(${tx}px, ${ty}px) scale(0.6)`,
                          filter: `brightness(0.9) contrast(1.15) saturate(1.15) blur(${size < 1.6 ? 0.45 : 0.2}px)`,
                          mixBlendMode: 'screen',
                          willChange: 'transform, opacity, filter',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Third Eye Flare - Show after books appear */}
        {!showIntro && showBooks && showThirdEyeFlare && !showThirdEyeDialog && (
          <ThirdEyeFlare onClick={handleThirdEyeClick} />
        )}

        {/* Books - Only show after intro and animation */}
        {!showIntro && showBooks && (
          <div className="absolute inset-0" style={{ zIndex: 50}}>
            {[
              { top: '80%', left: '67%', rotate: 112, name: 'शिवमहिम्न' },
              { top: '84%', left: '67%', rotate: 100, name: 'रुद्राक्ष ' },
              { top: '68%', left: '65%', rotate: 62, name: 'लिंग पुराण' },
              { top: '57%', left: '62%', rotate: 28, name: 'शिव तंत्र' },
              { top: '59%', left: '46%', rotate: -28, name: 'महादेव कथा' },
              { top: '58%', left: '46%', rotate: -48, name: 'नटराज ' },
              { top: '45%', left: '50%', rotate: -52, name: 'त्रिपुर भैरव' },
           
            ].map((p, idx) => (
              <div
                key={idx}
                className="absolute cursor-pointer"
                style={{
                  top: p.top,
                  left: p.left,
                  transform: `translate(-50%, -50%) rotate(${p.rotate + bookRotation}deg) scale(${hoveredBook === idx ? 1.2 : 1})`,
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
                  transition: `transform ${ROTATION_DURATION_MS}ms ease-in-out`,
                }}
                onMouseEnter={(e) => handleBookHover(idx, e)}
                onMouseLeave={handleBookLeave}
                onMouseMove={(e) => setTooltipPosition({ x: e.clientX, y: e.clientY })}
                onClick={() => handleBookClick(idx)}
              >
                <div className="relative" style={{ 
                  width: 'clamp(40px, 5vw, 80px)', 
                  height: 'clamp(55px, 6.875vw, 110px)',
                  transform: 'translateY(490%) scale(2.5)'
                }}>
                  <img
                    src="/book.webp"
                    alt="book"
                    className="w-full h-full object-contain"
                    style={{ opacity: 0.1 }}
                  />
                  <img
                    src="/shiv_cover.png"
                    alt="cover"
                    className="absolute rounded"
                    style={{
                      top: '22%',
                      left: '50%',
                      transform: 'translateX(-50%) skewY(-6deg)',
                      width: '64%',
                      height: '60%',
                      objectFit: 'cover',
                      opacity: 0.8,
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      top: '52%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '70%',
                      textAlign: 'center',
                      fontFamily: 'var(--font-jaini-purva)',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      whiteSpace: 'normal',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                      lineHeight: '1.05',
                      backgroundImage: 'url(/gold.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.5px',
                      filter: 'drop-shadow(0 0 6px rgba(255, 229, 153, 0.6))',
                      pointerEvents: 'none',
                    }}
                  >
                    {visibleBooks[idx]?.sanskrit_name || visibleBooks[idx]?.english_name || p.name || ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {hoveredBookData && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPosition.x + 15}px`,
            top: `${tooltipPosition.y}px`,
            zIndex: 10000,
            pointerEvents: 'none',
            transform: 'translateY(-50%)',
            opacity: 1,
            display: 'block',
            visibility: 'visible',
            animation: 'tooltipFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            padding: '2px',
            border: '1px solid rgba(196, 164, 74, 0.9)',
            borderRadius: '20px',
            background: 'rgba(0, 0, 0, 0.18)',
            boxShadow: `
              0 8px 24px rgba(0, 0, 0, 0.35),
              0 0 12px rgba(255, 191, 0, 0.35),
              inset 0 1px 0 rgba(255, 255, 255, 0.06)
            `,
          }}
        >
          <ScriptureCard
            name={hoveredBookData?.sanskrit_name || hoveredBookData?.english_name || ''}
            description={hoveredBookData.details || 'विवरण उपलब्ध नहीं है'}
            publisher={Array.isArray(hoveredBookData.publication) ? hoveredBookData.publication[0] || '' : (hoveredBookData.publication || '')}
            category={hoveredBookData.category || ''}
            publishers={Array.isArray(hoveredBookData.publication) ? hoveredBookData.publication : (hoveredBookData.publication ? [hoveredBookData.publication] : [])}
            tone={'black'}
            onRead={() => {}}
            onLivePodcast={() => {}}
          />
        </div>
      )}

      {permanentCard && (
        <>
          <div
            onClick={handleClosePermanentCard}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 19000,
              backdropFilter: 'blur(5px)',
              animation: 'tooltipFadeIn 0.3s ease',
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20000,
              pointerEvents: 'auto',
              animation: 'tooltipFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              padding: '2px',
              border: '1px solid rgba(196, 164, 74, 0.9)',
              borderRadius: '20px',
              background: 'rgba(0, 0, 0, 0.18)',
              boxShadow: `
                0 8px 24px rgba(0, 0, 0, 0.35),
                0 0 12px rgba(255, 191, 0, 0.35),
                inset 0 1px 0 rgba(255, 255, 255, 0.06)
              `,
            }}
          >
            <ScriptureCard
              name={permanentCard?.sanskrit_name || permanentCard?.english_name || ''}
              description={permanentCard.details || 'विवरण उपलब्ध नहीं है'}
              publisher={Array.isArray(permanentCard.publication) ? permanentCard.publication[0] || '' : (permanentCard.publication || '')}
              category={permanentCard.category || ''}
              publishers={Array.isArray(permanentCard.publication) ? permanentCard.publication : (permanentCard.publication ? [permanentCard.publication] : [])}
              showCloseButton={true}
              onClose={handleClosePermanentCard}
              tone={'black'}
              onRead={() => {}}
              onLivePodcast={() => {}}
            />
          </div>
        </>
      )}

      {/* Third Eye Dialog */}
      {showThirdEyeDialog && (
        <ThirdEyeDialog
          onClose={handleDialogClose}
          onBookSelect={handleBookSelect}
          books={allBooks}
        />
      )}
    </div>
  );
}