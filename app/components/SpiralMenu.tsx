'use client';

import { useState, useEffect, useMemo } from 'react';
import ScriptureCard from './ScriptureCard';
import ThirdEyeDialog from './ThirdEyeDialog';

interface Book {
  sanskrit_name?: string;
  english_name?: string;
  sampradaaya?: string | string[];
  details?: string;
  category?: string;
  publication?: string | string[];
  image?: string;
  position?: number;
}

export default function SpiralMenu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredBookData, setHoveredBookData] = useState<Book | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [permanentCard, setPermanentCard] = useState<Book | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [visibleOffset, setVisibleOffset] = useState(0);
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  // Animation states
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const [animatedGrids, setAnimatedGrids] = useState<number[]>([]);

  // Initial animation sequence
  useEffect(() => {
    // Start menu animation after 3D model appears (at 7 seconds)
    const menuTimer = setTimeout(() => {
      setShowMenu(true);

      // Animate grids appearing one by one in spiral order (0-7)
      const gridAnimationDelay = 150; // ms between each grid
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          setAnimatedGrids(prev => [...prev, i]);
        }, i * gridAnimationDelay);
      }
    }, 7000);

    // Show search icon after all grids have animated
    // 7000ms (menu start) + 8 grids × 150ms = 8200ms
    const searchIconTimer = setTimeout(() => {
      setShowSearchIcon(true);
    }, 8200);

    return () => {
      clearTimeout(menuTimer);
      clearTimeout(searchIconTimer);
    };
  }, []);

  // Fetch books from database
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (response.ok) {
          const data = await response.json();
          // Filter for books with sampradaaya ['Vaishnava', 'Smaartha'] or ['All']
          const filteredBooks = (data.books || []).filter((b: any) => {
            const sp = b?.sampradaaya ?? [];
            if (Array.isArray(sp)) {
              const set = new Set(sp.map((x: string) => (typeof x === 'string' ? x.trim() : x)));
              // Check if it has 'All' OR (has both 'Vaishnava' AND 'Smaartha')
              return set.has('All') || (set.has('Vaishnava') && set.has('Smaartha'));
            }
            if (typeof sp === 'string') {
              const t = sp.trim();
              return t === 'All';
            }
            return false;
          });
          setAllBooks(filteredBooks);
        } else {
          console.error('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Calculate visible books based on offset
  const visibleBooks = useMemo(() => {
    if (!allBooks || allBooks.length === 0) return [];
    const total = allBooks.length;
    const result = [];
    for (let i = 0; i < 8; i++) {
      result.push(allBooks[(visibleOffset + i) % total]);
    }
    return result;
  }, [allBooks, visibleOffset]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isAnimating || allBooks.length === 0) return; // Prevent multiple animations at once

      if (e.key === 'w' || e.key === 'W') {
        // Anti-clockwise rotation - go to previous books
        setIsAnimating(true);
        const startRotation = rotation;
        const targetRotation = rotation - 360;
        const startTime = Date.now();
        const duration = 2000; // 2 seconds

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

          setRotation(startRotation + (targetRotation - startRotation) * easeProgress);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsAnimating(false);
            setRotation(targetRotation);
            // Update book offset - go backward (previous books)
            setVisibleOffset((prev) => (prev - 1 + allBooks.length) % allBooks.length);
          }
        };
        animate();
      } else if (e.key === 's' || e.key === 'S') {
        // Clockwise rotation - go to next books
        setIsAnimating(true);
        const startRotation = rotation;
        const targetRotation = rotation + 360;
        const startTime = Date.now();
        const duration = 2000; // 2 seconds

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

          setRotation(startRotation + (targetRotation - startRotation) * easeProgress);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsAnimating(false);
            setRotation(targetRotation);
            // Update book offset - go forward (next books)
            setVisibleOffset((prev) => (prev + 1) % allBooks.length);
          }
        };
        animate();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [rotation, isAnimating, allBooks]);

  // Calculate position for each book between spokes (wheel design)
  const getWheelPosition = (index: number, total: number) => {
    // Place books BETWEEN spokes, so offset by half the angle
    const angleOffset = (Math.PI * 2) / total / 2; // Half angle between spokes
    const angle = ((index * Math.PI * 2) / total) + angleOffset - Math.PI / 2; // Start from top
    const radius = 110; // Distance from center (reduced)
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle: angle + Math.PI }; // Rotate so end points towards center
  };

  // Calculate spoke angles
  const getSpokeAngle = (index: number, total: number) => {
    return ((index * Math.PI * 2) / total) - Math.PI / 2; // Start from top
  };

  const handleBookHover = (idx: number, e: React.MouseEvent) => {
    setHoveredIndex(idx);
    setHoveredBookData(visibleBooks[idx] || null);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleBookLeave = () => {
    setHoveredIndex(null);
    setHoveredBookData(null);
  };

  const handleBookClick = (idx: number) => {
    const book = visibleBooks[idx];
    if (book) {
      setPermanentCard(book);
    }
  };

  const handleClosePermanentCard = () => {
    setPermanentCard(null);
  };

  const handleSearchClick = () => {
    setShowSearchDialog(true);
  };

  const handleDialogClose = () => {
    setShowSearchDialog(false);
  };

  const handleBookSelect = (book: Book) => {
    setShowSearchDialog(false);
    setPermanentCard(book);
  };

  // Don't render if not showing yet
  if (!showMenu) {
    return null;
  }

  return (
    <>
      <div className="absolute top-46.5 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div
          className="relative w-[350px] h-[350px] bg-transparent rounded-full pointer-events-auto transition-transform duration-100"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {/* Blurred ring (donut shape) - hollow center */}
          <div
            className="absolute inset-0 rounded-full backdrop-blur-lg pointer-events-none transition-opacity duration-500"
            style={{
              maskImage: 'radial-gradient(circle at center, transparent 0%, transparent 60px, black 60px)',
              WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, transparent 60px, black 60px)',
              opacity: animatedGrids.length > 0 ? 1 : 0,
            }}
          />

          {/* Golden wedge sectors for each book - appears on hover */}
          {visibleBooks.map((book, index) => {
            const startAngle = getSpokeAngle(index, 8);
            const endAngle = getSpokeAngle((index + 1) % 8, 8);
            const isHovered = hoveredIndex === index;

            // Convert angles to degrees for conic-gradient
            let startDeg = (startAngle * 180 / Math.PI) + 90; // +90 to align with CSS coordinate system
            let endDeg = (endAngle * 180 / Math.PI) + 90;

            // Handle wrap-around for the last wedge
            if (endDeg < startDeg) {
              endDeg += 360;
            }

            const isVisible = animatedGrids.includes(index);

            return (
              <div
                key={`wedge-${visibleOffset}-${index}`}
                className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: isHovered && isVisible ? 1 : 0,
                  background: `conic-gradient(from 0deg at center, transparent ${startDeg}deg, rgba(255, 215, 0, 0.3) ${startDeg}deg, rgba(255, 215, 0, 0.3) ${endDeg}deg, transparent ${endDeg}deg)`,
                  maskImage: 'radial-gradient(circle at center, transparent 0%, transparent 60px, black 60px, black 100%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, transparent 60px, black 60px, black 100%)',
                }}
              />
            );
          })}
          {/* 8 Spokes radiating from center to circumference - visible only in outer ring */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              maskImage: 'radial-gradient(circle at center, transparent 0%, transparent 60px, black 60px)',
              WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, transparent 60px, black 60px)',
            }}
          >
            {Array.from({ length: 8 }).map((_, index) => {
              const angle = getSpokeAngle(index, 8);
              const spokeLength = 175; // Extended to reach circumference
              const isVisible = animatedGrids.includes(index);

              return (
                <div
                  key={`spoke-${index}`}
                  className="absolute top-1/2 left-1/2 origin-left pointer-events-none transition-all duration-500"
                  style={{
                    width: `${spokeLength}px`,
                    height: '2px',
                    background: 'linear-gradient(to right, rgba(255, 215, 0, 0.4), rgba(255, 165, 0, 0.1))',
                    transform: `translateY(-50%) rotate(${angle}rad)`,
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
                    opacity: isVisible ? 1 : 0,
                    transformOrigin: 'left center',
                  }}
                />
              );
            })}
          </div>

          {/* Center Search Icon */}
          {showSearchIcon && (
            <div
              onClick={handleSearchClick}
              className="absolute cursor-pointer pointer-events-auto"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 100,
                animation: 'searchIconAppear 0.5s ease-out forwards',
              }}
            >
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.1) 70%, transparent 100%)',
                  boxShadow: '0 0 25px rgba(255, 215, 0, 0.45), inset 0 0 18px rgba(255, 215, 0, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(255, 215, 0, 0.65), inset 0 0 25px rgba(255, 215, 0, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.45), inset 0 0 18px rgba(255, 215, 0, 0.25)';
                }}
              >
                {/* Vaishnava Tilak SVG */}
                <svg
                  width="36"
                  height="48"
                  viewBox="0 0 24 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.9))' }}
                >
                  {/* U-shape (Chandan) */}
                  <path
                    d="M4 2V22C4 26.4183 7.58172 30 12 30C16.4183 30 20 26.4183 20 22V2"
                    stroke="#FFD700"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Center Line (Kumkum/Red) */}
                  <path
                    d="M12 25V10"
                    stroke="#FF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Book items between spokes - rotated to align radially */}
          {visibleBooks.map((book, index) => {
            const { x, y, angle } = getWheelPosition(index, 8);
            const isHovered = hoveredIndex === index;
            const rotationDegrees = (angle * 180) / Math.PI;
            const displayName = book?.sanskrit_name || book?.english_name || '';
            const isVisible = animatedGrids.includes(index);

            return (
              <div
                key={`book-${visibleOffset}-${index}`}
                className="absolute top-1/2 left-1/2 group cursor-pointer pointer-events-auto transition-all duration-500"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotationDegrees}deg)`,
                  transformOrigin: 'center',
                  width: '80px',
                  opacity: isVisible ? 1 : 0,
                }}
                onMouseEnter={(e) => handleBookHover(index, e)}
                onMouseLeave={handleBookLeave}
                onMouseMove={(e) => setTooltipPosition({ x: e.clientX, y: e.clientY })}
                onClick={() => handleBookClick(index)}
              >
                <span
                  className={`block text-center font-semibold transition-all duration-300 leading-tight ${isHovered
                    ? 'text-yellow-200 drop-shadow-[0_0_10px_rgba(255,215,0,0.9)] scale-125 text-base'
                    : 'text-yellow-300/90 text-sm'
                    }`}
                  style={{
                    fontFamily: "'Jaini Purva', serif",
                  }}
                >
                  {displayName}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* Hover Tooltip with Scripture Card */}
      {hoveredBookData && !permanentCard && (
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
            onRead={() => { }}
            onLivePodcast={() => { }}
          />
        </div>
      )}

      {/* Permanent Card on Click */}
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
              onRead={() => { }}
              onLivePodcast={() => { }}
            />
          </div>
        </>
      )}

      {/* Search Dialog */}
      {showSearchDialog && (
        <ThirdEyeDialog
          onClose={handleDialogClose}
          onBookSelect={handleBookSelect}
          books={allBooks.map(b => ({
            ...b,
            sampradaaya: Array.isArray(b.sampradaaya) ? b.sampradaaya.join(', ') : b.sampradaaya
          }))}
        />
      )}

      {/* Animations */}
      <style>{`
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

      @keyframes searchIconAppear {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `}</style>
    </>
  );
}