'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import ScriptureCard from '../components/ScriptureCard';
import ThirdEyeFlareRed from '../components/ThirdEyeFlareRed';
import ThirdEyeDialog from '../components/ThirdEyeDialog';
import './library.css';
interface Book {
  _id?: string;
  sanskrit_name?: string;
  english_name?: string;
  sampradaaya?: string;
  position?: number;
  image?: string;
  details?: string;
  category?: string;
  publication?: string | string[];
}

export default function LibraryPage() {
  const [showBooks, setShowBooks] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrollingClockwise, setIsScrollingClockwise] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [rotationOffset, setRotationOffset] = useState(0); // Offset for rotating through 9 books
  const [hoveredBook, setHoveredBook] = useState<Book | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [permanentCard, setPermanentCard] = useState<Book | null>(null);
  const [cloudsAnimationComplete, setCloudsAnimationComplete] = useState(false);
  const [showThirdEyeFlare, setShowThirdEyeFlare] = useState(false);
  const [showThirdEyeDialog, setShowThirdEyeDialog] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // Autoplay might be blocked by the browser; silently ignore
        });
      }
    }
  }, []);

  useEffect(() => {
    // Fetch books from MongoDB
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched books:', data.books);
          console.log('First book details:', data.books?.[0]);
          const filteredBooks = (data.books || []).filter((b: any) => {
            const sp = b?.sampradaaya ?? [];
            if (Array.isArray(sp)) {
              const set = new Set(sp.map((x: string) => (typeof x === 'string' ? x.trim() : x)));
              return set.has('All') || (set.has('Ganpatya') && set.has('Smaartha'));
            }
            if (typeof sp === 'string') {
              const t = sp.trim();
              return t === 'All';
            }
            return false;
          });
          setBooks(filteredBooks);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Failed to fetch books:', errorData.error || 'Unknown error');
          // If error is about missing MongoDB URI, show helpful message
          if (errorData.error?.includes('MONGODB_URI')) {
            console.warn('MongoDB connection string not configured. Please set MONGODB_URI in .env.local');
          }
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Wait for clouds animation (1.5s) + hands animation (2s) + small buffer
    const timer = setTimeout(() => {
      setCloudsAnimationComplete(true);
    }, 1500); // Cloud animation duration

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Wait for clouds animation to complete, then hands animation (2s) + small buffer
    if (cloudsAnimationComplete) {
      const timer = setTimeout(() => {
        setShowBooks(true);
        // Show third eye flare after books appear
        setTimeout(() => {
          setShowThirdEyeFlare(true);
        }, 500);
      }, 2100); // 2s hands animation + 100ms buffer

      return () => clearTimeout(timer);
    }
  }, [cloudsAnimationComplete]);

  // Handle third eye click
  const handleThirdEyeClick = () => {
    setShowThirdEyeDialog(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setShowThirdEyeDialog(false);
  };

  // Handle book select from dialog
  const handleBookSelect = (book: Book) => {
    setPermanentCard(book);
    setHoveredBook(null);
  };

  // Helper function to get book name by position with rotation
  const getBookName = (displayPosition: number): string => {
    if (books.length === 0) return '';
    
    // Calculate which book to show at this display position (1-6)
    // With rotation offset, we cycle through all 9 books
    const totalBooks = books.length;
    const bookIndex = ((displayPosition - 1 + rotationOffset) % totalBooks);
    const book = books[bookIndex];
    
    return book?.sanskrit_name || book?.english_name || '';
  };

  // Helper function to get full book object by display position
  const getBookByPosition = (displayPosition: number): Book | null => {
    if (books.length === 0) {
      console.log('Books array is empty!');
      return null;
    }
    
    const totalBooks = books.length;
    const bookIndex = ((displayPosition - 1 + rotationOffset) % totalBooks);
    const book = books[bookIndex];
    console.log(`Position ${displayPosition}: index=${bookIndex}, book=`, book);
    return book || null;
  };

  // Handle mouse enter for tooltip
  const handleBookHover = (displayPosition: number, e: React.MouseEvent) => {
    console.log('=== HOVER EVENT ===');
    console.log('Position:', displayPosition);
    console.log('Books array length:', books.length);
    console.log('Rotation offset:', rotationOffset);
    
    const book = getBookByPosition(displayPosition);
    console.log('Book found:', book);
    
    if (book) {
      console.log('Book name:', book.sanskrit_name || book.english_name || '');
      console.log('Book category:', book.category);
      console.log('Book publication:', book.publication);
      console.log('Book image:', book.image);
      console.log('Book details:', book.details);
      console.log('Setting hovered book state...');
      setHoveredBook(book);
      setTooltipPosition({ x: e.clientX, y: e.clientY });
      console.log('Tooltip position set to:', { x: e.clientX, y: e.clientY });
    } else {
      console.log('❌ No book found for position:', displayPosition);
    }
  };

  // Handle mouse leave
  const handleBookLeave = () => {
    console.log('Mouse left book, hiding tooltip');
    setHoveredBook(null);
  };

  // Handle book click for permanent card
  const handleBookClick = (displayPosition: number) => {
    const book = getBookByPosition(displayPosition);
    if (book) {
      setPermanentCard(book);
      setHoveredBook(null); // Hide tooltip when permanent card is shown
    }
  };

  // Handle close permanent card
  const handleClosePermanentCard = () => {
    setPermanentCard(null);
  };

  // Debug: Log when hoveredBook changes
  useEffect(() => {
    console.log('🔄 hoveredBook state changed:', hoveredBook);
    if (hoveredBook) {
      console.log('✅ Tooltip should be visible now!');
      console.log('Tooltip position:', tooltipPosition);
    } else {
      console.log('❌ Tooltip hidden');
    }
  }, [hoveredBook, tooltipPosition]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 's' || e.key === 'S') {
        setIsScrolling(true);
        // Reset animation after it completes (1.5s)
        setTimeout(() => {
          setIsScrolling(false);
          // Update book names AFTER animation completes
          setRotationOffset((prev) => (prev + 1) % (books.length || 9));
        }, 1500);
      }
      if (e.key === 'w' || e.key === 'W') {
        setIsScrollingClockwise(true);
        // Reset animation after it completes (1.5s)
        setTimeout(() => {
          setIsScrollingClockwise(false);
          // Update book names backward AFTER animation completes
          const totalBooks = books.length || 9;
          setRotationOffset((prev) => (prev - 1 + totalBooks) % totalBooks);
        }, 1500);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [books.length]);

  return (
    <div className="w-full min-h-screen overflow-x-hidden overflow-y-auto relative bg-black" onMouseMove={(e) => console.log('Mouse move on page:', e.clientX, e.clientY)}>
      <audio ref={audioRef} src="/Ganesh_theme.webm" preload="aumkoto" style={{ display: 'none' }} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12 z-20">
        {/* Left Side Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center">
          <img 
            src="/Ganesha/clean_ganesha.png" 
            alt="Clean Ganesha" 
            className="max-h-[85vh] w-auto object-contain drop-shadow-2xl"
          />
        </div>
        {/* Right Side - Blank background as requested */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
        </div>
      </section>

      {/* Secondary Section (Original Interactive Ganesha Section) */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Background Image */}
        <img 
          src="/Ganesha_background.jpg" 
          alt="Ganesh background" 
          className="w-full h-auto object-contain"
        />
      
      {/* Ganesh Body - Center (Behind hands) */}
      <img 
        src="/deity2 (1).png" 
        alt="Ganesh body" 
        className="absolute top-[-5%] left-5 w-full h-full object-contain"
        style={{ scale: "90%", zIndex: 5, pointerEvents: 'none' }}
      />

      {/* Left Cloud - Starts centered, moves to left */}
      <img 
        src="/left_clouds.png" 
        alt="Left clouds" 
        className="cloud-left"
        style={{ 
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 6,
          pointerEvents: 'none',
          width: '45%',
          height: 'auto',
          objectFit: 'contain'
        }}
      />

      {/* Right Cloud - Starts centered, moves to right */}
      <img 
        src="/rightclouds.png" 
        alt="Right clouds" 
        className="cloud-right"
        style={{ 
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 6,
          pointerEvents: 'none',
          width: '45%',
          height: 'auto',
          objectFit: 'contain'
        }}
      />

      {/* Left Hands - Counter Clockwise from center */}
      {/* Left Hand 1 - Starts from center, revolves to top-left */}
      <div 
        className={cloudsAnimationComplete ? "hand-orbit-left-1" : ""}
        style={{
          position: 'absolute',
          top: '49%',
          left :'54%',
          zIndex: 3,
          opacity: cloudsAnimationComplete ? 1 : 0,
          visibility: cloudsAnimationComplete ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-in, visibility 0.3s ease-in'
        }}
      >
        <img 
          src="/hand.png" 
          alt="Ganesh left hand 1" 
          style={{ scale:"175%", objectFit: 'contain',transform: "rotate(-25deg)" }}
        />
      </div>
      
      {/* Left Hand 2 - Middle left */}
      <div 
        className={cloudsAnimationComplete ? "hand-orbit-left-2" : ""}
        style={{
          position: 'absolute',
          top: '37%',
          left :'63%',
          zIndex: 3,
          opacity: cloudsAnimationComplete ? 1 : 0,
          visibility: cloudsAnimationComplete ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-in, visibility 0.3s ease-in'
        }}
      >
        <img 
          src="/hand.png" 
          alt="Ganesh left hand 2" 
          style={{  objectFit: 'contain' ,transform: "rotate(-60deg)" ,scale:"200%"}}

        />
      </div>
      
      {/* Left Hand 3 - Bottom left */}
      <div 
        className={cloudsAnimationComplete ? "hand-orbit-left-3" : ""}
        style={{
          position: 'absolute',
          top: '22%',
          left :'50%',
          zIndex: 3,
          opacity: cloudsAnimationComplete ? 1 : 0,
          visibility: cloudsAnimationComplete ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-in, visibility 0.3s ease-in'
        }}
      >
        <img 
          src="/hand.png" 
          alt="Ganesh left hand 3" 
          style={{scale:"140%", objectFit: 'contain' ,transform: "rotate(-85deg)" }}
        />
      </div>

      {/* Right Hands - Clockwise from center */}
      {/* Right Hand 1 - Top right */}
      <div 
        className={cloudsAnimationComplete ? "hand-orbit-right-1" : ""}
        style={{
          position: 'absolute',
          top: '25%',
          left :'49.5%',
          zIndex: 3,
          opacity: cloudsAnimationComplete ? 1 : 0,
          visibility: cloudsAnimationComplete ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-in, visibility 0.3s ease-in'
        }}
      >
        <img 
          src="/hand.png" 
          alt="Ganesh right hand 1" 
          style={{ scale:"120%", objectFit: 'contain', transform: 'scaleX(-1)rotate(-80deg)' }}
        />
      </div>
      
      {/* Right Hand 2 - Middle right */}
      <div 
        className={cloudsAnimationComplete ? "hand-orbit-right-2" : ""}
        style={{
          position: 'absolute',
          top: '35%',
          left :'34%',
          zIndex: 3,
          opacity: cloudsAnimationComplete ? 1 : 0,
          visibility: cloudsAnimationComplete ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-in, visibility 0.3s ease-in'
        }}
      >
        <img 
          src="/hand.png" 
          alt="Ganesh right hand 2" 
          style={{  objectFit: 'contain', transform: 'scaleX(-1) rotate(-60deg)',scale:"120%" }}
        />
      </div>
      
      {/* Right Hand 3 - Bottom right */}
      <div 
        className={cloudsAnimationComplete ? "hand-orbit-right-3" : ""}
        style={{
          position: 'absolute',
          top: '50%',
          left :'45%',
          zIndex: 3,
          opacity: cloudsAnimationComplete ? 1 : 0,
          visibility: cloudsAnimationComplete ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-in, visibility 0.3s ease-in'
        }}
      >
        <img 
          src="/hand.png" 
          alt="Ganesh right hand 3" 
          style={{  objectFit: 'contain', transform: 'scaleX(-1) rotate(-24deg)',scale:"130%" }}
        />
      </div>

      {/* Books - Appear after hands animation completes */}
      {/* Book near Left Hand 1 */}
      <div
        className={`book book-left-1 ${showBooks ? 'book-visible' : ''} ${isScrolling ? 'move-to-right-1' : ''} ${isScrollingClockwise ? 'move-clockwise-from-left-1' : ''}`}
        style={{
          position: 'absolute',
          top: '50%',
          left: '22%',
          zIndex: 10,
          scale:'180.5%',
          opacity: showBooks ? undefined : 0,
          visibility: showBooks ? undefined : 'hidden',
          pointerEvents: showBooks ? 'auto' : 'none',
          cursor: showBooks ? 'pointer' : 'default',
        }}
        onClick={() => handleBookClick(1)}
        onMouseEnter={(e) => {
          if (!permanentCard) {
          console.log('🖱️ Mouse entered book 1');
          handleBookHover(1, e);
          }
        }}
        onMouseLeave={() => {
          if (!permanentCard) {
          console.log('🖱️ Mouse left book 1');
          handleBookLeave();
          }
        }}
        onMouseMove={(e) => {
          if (!permanentCard) {
            setTooltipPosition({ x: e.clientX, y: e.clientY });
          }
        }}
      >
        <img 
          id="books"
          src="/book.webp" 
          alt="Book" 
          style={{ width: '90px', height: '120px', objectFit: 'contain' }}
        />
        <div 
          className="scripture-name"
          style={{
            position: 'absolute',
            top: '50%',
            left: '49%',
            transform: 'translate(-50%, -50%) rotate(-15deg)',
            fontFamily: 'var(--font-jaini-purva)',
            fontSize: '12px',
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            whiteSpace: 'normal',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            lineHeight: '1.05',
            width: '64px',
          }}
        >
          {loading ? '' : getBookName(1)}
        </div>
      </div>

      {/* Book near Left Hand 2 */}
      <div
        className={`book book-left-2 ${showBooks ? 'book-visible' : ''} ${isScrolling ? 'move-to-left-1' : ''} ${isScrollingClockwise ? 'move-clockwise-from-left-2' : ''}`}
        style={{
          position: 'absolute',
          top: '26%',
          left: '21%',
          scale:'180.5%',
          zIndex: 4,
          opacity: showBooks ? undefined : 0,
          visibility: showBooks ? undefined : 'hidden',
          pointerEvents: showBooks ? 'auto' : 'none',
          cursor: showBooks ? 'pointer' : 'default',
        }}
        onClick={() => handleBookClick(2)}
        onMouseEnter={(e) => {
          if (!permanentCard) handleBookHover(2, e);
        }}
        onMouseLeave={() => {
          if (!permanentCard) handleBookLeave();
        }}
        onMouseMove={(e) => {
          if (!permanentCard) setTooltipPosition({ x: e.clientX, y: e.clientY });
        }}
      >
        <img 
          id="books"
          src="/book.webp" 
          alt="Book" 
          style={{ width: '90px', height: '120px', objectFit: 'contain' }}
        />
        <div 
          className="scripture-name"
          style={{
            position: 'absolute',
            top: '50%',
            left: '48%',
            transform: 'translate(-50%, -50%) rotate(-15deg)',
            fontFamily: 'var(--font-jaini-purva)',
            fontSize: '12px',
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            whiteSpace: 'normal',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            lineHeight: '1.05',
            width: '64px',
          }}
        >
          {loading ? '' : getBookName(2)}
        </div>
      </div>

      {/* Book near Left Hand 3 */}
      <div
        className={`book book-left-3 ${showBooks ? 'book-visible' : ''} ${isScrolling ? 'move-to-left-2' : ''} ${isScrollingClockwise ? 'move-clockwise-from-left-3' : ''}`}
        style={{
          position: 'absolute',
          top: '1%',
          left: '26%',
          scale:'180.5%',
          zIndex: 4,
          opacity: showBooks ? undefined : 0,
          visibility: showBooks ? undefined : 'hidden',
          pointerEvents: showBooks ? 'auto' : 'none',
          cursor: showBooks ? 'pointer' : 'default',
        }}
        onClick={() => handleBookClick(3)}
        onMouseEnter={(e) => {
          if (!permanentCard) handleBookHover(3, e);
        }}
        onMouseLeave={() => {
          if (!permanentCard) handleBookLeave();
        }}
        onMouseMove={(e) => {
          if (!permanentCard) setTooltipPosition({ x: e.clientX, y: e.clientY });
        }}
      >
        <img 
          id="books"
          src="/book.webp" 
          alt="Book" 
          style={{ width: '90px', height: '120px', objectFit: 'contain' }}
        />
        <div 
          className="scripture-name"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-15deg)',
            fontFamily: 'var(--font-jaini-purva)',
            fontSize: '14px',
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            whiteSpace: 'normal',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            lineHeight: '1.05',
            width: '64px',
          }}
        >
          {loading ? '' : getBookName(3)}
        </div>
      </div>

      {/* Book near Right Hand 1 */}
      <div
        className={`book book-right-1 ${showBooks ? 'book-visible' : ''} ${isScrolling ? 'move-to-right-2' : ''} ${isScrollingClockwise ? 'move-clockwise-from-right-1' : ''}`}
        style={{
          position: 'absolute',
          top: '46%',
          left: '68%',
          scale:'180.5%',
          transform: 'rotate(-165deg)',
          zIndex: 4,
          opacity: showBooks ? undefined : 0,
          visibility: showBooks ? undefined : 'hidden',
          pointerEvents: showBooks ? 'auto' : 'none',
          cursor: showBooks ? 'pointer' : 'default',
        }}
        onClick={() => handleBookClick(4)}
        onMouseEnter={(e) => {
          if (!permanentCard) handleBookHover(4, e);
        }}
        onMouseLeave={() => {
          if (!permanentCard) handleBookLeave();
        }}
        onMouseMove={(e) => {
          if (!permanentCard) setTooltipPosition({ x: e.clientX, y: e.clientY });
        }}
      >
        <img 
          id="books"
          src="/book.webp" 
          alt="Book" 
          style={{ width: '90px', height: '120px', objectFit: 'contain' }}
        />
        <div 
          className="scripture-name"
          style={{
            position: 'absolute',
            top: '50%',
            left: '49%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-jaini-purva)',
            fontSize: '14px',
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            whiteSpace: 'normal',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            lineHeight: '1.05',
            width: '64px',
          }}
        >
          {loading ? '' : getBookName(4)}
        </div>
      </div>

      {/* Book near Right Hand 2 */}
      <div
        className={`book book-right-2 ${showBooks ? 'book-visible' : ''} ${isScrolling ? 'move-to-right-3' : ''} ${isScrollingClockwise ? 'move-clockwise-from-right-2' : ''}`}
        style={{
          position: 'absolute',
          top: '25%',
          scale:'180.5%',
          transform: 'rotate(-165deg)',
          left: '70%',
          zIndex: 4,
          opacity: showBooks ? undefined : 0,
          visibility: showBooks ? undefined : 'hidden',
          pointerEvents: showBooks ? 'auto' : 'none',
          cursor: showBooks ? 'pointer' : 'default',
        }}
        onClick={() => handleBookClick(5)}
        onMouseEnter={(e) => {
          if (!permanentCard) handleBookHover(5, e);
        }}
        onMouseLeave={() => {
          if (!permanentCard) handleBookLeave();
        }}
        onMouseMove={(e) => {
          if (!permanentCard) setTooltipPosition({ x: e.clientX, y: e.clientY });
        }}
      >
        <img 
          id="books"
          src="/book.webp" 
          alt="Book" 
          style={{ width: '90px', height: '120px', objectFit: 'contain' }}
        />
        <div 
          className="scripture-name"
          style={{
            position: 'absolute',
            top: '50%',
            left: '48%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-jaini-purva)',
            fontSize: '14px',
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            whiteSpace: 'normal',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            lineHeight: '1.05',
            width: '64px',
          }}
        >
          {loading ? '' : getBookName(5)}
        </div>
      </div>

      {/* Book near Right Hand 3 */}
      <div
        className={`book book-right-3 ${showBooks ? 'book-visible' : ''} ${isScrolling ? 'move-to-left-3' : ''} ${isScrollingClockwise ? 'move-clockwise-from-right-3' : ''}`}
        style={{
          position: 'absolute',
          top: '1%',
          scale:'180.5%',
          transform: 'rotate(-165deg)',
          left: '63%',
          zIndex: 4,
          opacity: showBooks ? undefined : 0,
          visibility: showBooks ? undefined : 'hidden',
          pointerEvents: showBooks ? 'auto' : 'none',
          cursor: showBooks ? 'pointer' : 'default',
        }}
        onClick={() => handleBookClick(6)}
        onMouseEnter={(e) => {
          if (!permanentCard) handleBookHover(6, e);
        }}
        onMouseLeave={() => {
          if (!permanentCard) handleBookLeave();
        }}
        onMouseMove={(e) => {
          if (!permanentCard) setTooltipPosition({ x: e.clientX, y: e.clientY });
        }}
      >
        <img 
          id="books"
          src="/book.webp" 
          alt="Book" 
          style={{ width: '90px', height: '120px', objectFit: 'contain' }}
        />
        <div 
          className="scripture-name"
          style={{
            position: 'absolute',
            top: '50%',
            left: '48%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-jaini-purva)',
            fontSize: '12px',
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            whiteSpace: 'normal',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            lineHeight: '1.05',
            width: '64px',
          }}
        >
          {loading ? '' : getBookName(6)}
        </div>
      </div>
      </section>

      <style jsx>{`
        /* Cloud Animations */
        @keyframes cloud-left-move {
          0% {
            left: 50%;
            transform: translateX(-50%);
            opacity: 1;
          }
          100% {
            left: 5%;
            transform: translateX(-50%);
            opacity: 1;
          }
        }

        @keyframes cloud-right-move {
          0% {
            left: 50%;
            transform: translateX(-50%);
            opacity: 1;
          }
          100% {
            left: 95%;
            transform: translateX(-50%);
            opacity: 1;
          }
        }

        .cloud-left {
          animation: cloud-left-move 1.5s ease-out forwards;
        }

        .cloud-right {
          animation: cloud-right-move 1.5s ease-out forwards;
        }

        /* Left hands - Counter clockwise */
        @keyframes orbit-left-1 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg) translateX(0px) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(-120deg) translateX(250px) rotate(120deg);
          }
        }

        @keyframes orbit-left-2 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg) translateX(0px) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(-180deg) translateX(280px) rotate(180deg);
          }
        }

        @keyframes orbit-left-3 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg) translateX(0px) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(-240deg) translateX(250px) rotate(240deg);
          }
        }

        /* Right hands - Clockwise */
        @keyframes orbit-right-1 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg) translateX(0px) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(60deg) translateX(250px) rotate(-60deg);
          }
        }

        @keyframes orbit-right-2 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg) translateX(0px) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(0deg) translateX(280px) rotate(0deg);
          }
        }

        @keyframes orbit-right-3 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg) translateX(0px) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(-60deg) translateX(250px) rotate(60deg);
          }
        }

        .hand-orbit-left-1 {
          animation: orbit-left-1 2s ease-out forwards;
        }

        .hand-orbit-left-2 {
          animation: orbit-left-2 2s ease-out forwards;
        }

        .hand-orbit-left-3 {
          animation: orbit-left-3 2s ease-out forwards;
        }

        .hand-orbit-right-1 {
          animation: orbit-right-1 2s ease-out forwards;
        }

        .hand-orbit-right-2 {
          animation: orbit-right-2 2s ease-out forwards;
        }

        .hand-orbit-right-3 {
          animation: orbit-right-3 2s ease-out forwards;
        }

        /* Book Styles - Using book.webp image */
        .book {
          width: 90px;
          height: 120px;
          opacity: 0;
          visibility: hidden;
          transform: scale(0) rotate(-15deg);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out, visibility 0s linear 0.5s;
          pointer-events: none;
          position: relative;
        }
        
        /* Ensure book-visible overrides pointer-events */
        .book.book-visible {
          pointer-events: auto !important;
        }
        
        .book img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .book-visible {
          opacity: 1;
          visibility: visible;
          transform: scale(1) rotate(-15deg);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out, visibility 0s;
          pointer-events: auto !important;
          cursor: pointer !important;
        }

        /* Stagger book appearance */
        .book-left-1 {
          transition-delay: 0.1s;
        }
        .book-left-2 {
          transition-delay: 0.2s;
        }
        .book-left-3 {
          transition-delay: 0.3s;
        }
        .book-right-1 {
          transition-delay: 0.4s;
        }
        .book-right-2 {
          transition-delay: 0.5s;
        }
        .book-right-3 {
          transition-delay: 0.6s;
        }

        /* Circular orbital motion animations */
        /* Left-3 (top: 1%, left: 26%) → Left-2 (top: 26%, left: 21%) */
        @keyframes move-left-3-to-left-2 {
          0% {
            top: 1%;
            left: 26%;
            transform: rotate(-15deg) scale(1);
          }
          50% {
            transform: rotate(-15deg) scale(1.1);
          }
          100% {
            top: 26%;
            left: 21%;
            transform: rotate(-15deg) scale(1);
          }
        }

        /* Left-2 (top: 26%, left: 21%) → Left-1 (top: 50%, left: 22%) */
        @keyframes move-left-2-to-left-1 {
          0% {
            top: 26%;
            left: 21%;
            transform: rotate(-15deg) scale(1);
          }
          50% {
            transform: rotate(-15deg) scale(1.1);
          }
          100% {
            top: 50%;
            left: 22%;
            transform: rotate(-15deg) scale(1);
          }
        }

        /* Left-1 (top: 50%, left: 22%) → Right-1 (top: 46%, left: 68%) */
        @keyframes move-left-1-to-right-1 {
          0% {
            top: 50%;
            left: 22%;
            transform: rotate(-15deg) scale(1);
          }
          50% {
            top: 48%;
            left: 45%;
            transform: rotate(-90deg) scale(1.15);
          }
          100% {
            top: 46%;
            left: 68%;
            transform: rotate(-165deg) scale(1);
          }
        }

        /* Right-3 (top: 1%, left: 63%) → Left-3 (top: 1%, left: 26%) */
        @keyframes move-right-3-to-left-3 {
          0% {
            top: 1%;
            left: 63%;
            transform: rotate(-165deg) scale(1);
          }
          50% {
            top: 1%;
            left: 44.5%;
            transform: rotate(-90deg) scale(1.15);
          }
          100% {
            top: 1%;
            left: 26%;
            transform: rotate(-15deg) scale(1);
          }
        }

        /* Right-2 (top: 25%, left: 70%) → Right-3 (top: 1%, left: 63%) */
        @keyframes move-right-2-to-right-3 {
          0% {
            top: 25%;
            left: 70%;
            transform: rotate(-165deg) scale(1);
          }
          50% {
            transform: rotate(-165deg) scale(1.1);
          }
          100% {
            top: 1%;
            left: 63%;
            transform: rotate(-165deg) scale(1);
          }
        }

        /* Right-1 (top: 46%, left: 68%) → Right-2 (top: 25%, left: 70%) */
        @keyframes move-right-1-to-right-2 {
          0% {
            top: 46%;
            left: 68%;
            transform: rotate(-165deg) scale(1);
          }
          50% {
            transform: rotate(-165deg) scale(1.1);
          }
          100% {
            top: 25%;
            left: 70%;
            transform: rotate(-165deg) scale(1);
          }
        }

        .book-left-3.move-to-left-2 {
          animation: move-left-3-to-left-2 1.5s ease-in-out forwards;
        }

        .book-left-2.move-to-left-1 {
          animation: move-left-2-to-left-1 1.5s ease-in-out forwards;
        }

        .book-left-1.move-to-right-1 {
          animation: move-left-1-to-right-1 1.5s ease-in-out forwards;
        }

        .book-right-3.move-to-left-3 {
          animation: move-right-3-to-left-3 1.5s ease-in-out forwards;
        }

        .book-right-2.move-to-right-3 {
          animation: move-right-2-to-right-3 1.5s ease-in-out forwards;
        }

        .book-right-1.move-to-right-2 {
          animation: move-right-1-to-right-2 1.5s ease-in-out forwards;
        }

        /* Clockwise animations (reverse direction) */
        /* Right-3 (top: 1%, left: 63%) → Right-2 (top: 25%, left: 70%) */
        @keyframes move-clockwise-right-3-to-right-2 {
          0% {
            top: 1%;
            left: 63%;
            transform: rotate(-165deg) scale(1);
          }
          50% {
            transform: rotate(-165deg) scale(1.1);
          }
          100% {
            top: 25%;
            left: 70%;
            transform: rotate(-165deg) scale(1);
          }
        }

        /* Right-2 (top: 25%, left: 70%) → Right-1 (top: 46%, left: 68%) */
        @keyframes move-clockwise-right-2-to-right-1 {
          0% {
            top: 25%;
            left: 70%;
            transform: rotate(-165deg) scale(1);
          }
          50% {
            transform: rotate(-165deg) scale(1.1);
          }
          100% {
            top: 46%;
            left: 68%;
            transform: rotate(-165deg) scale(1);
          }
        }

        /* Right-1 (top: 46%, left: 68%) → Left-1 (top: 50%, left: 22%) */
        @keyframes move-clockwise-right-1-to-left-1 {
          0% {
            top: 46%;
            left: 68%;
            transform: rotate(-165deg) scale(1);
          }
          50% {
            top: 48%;
            left: 45%;
            transform: rotate(-90deg) scale(1.15);
          }
          100% {
            top: 50%;
            left: 22%;
            transform: rotate(-15deg) scale(1);
          }
        }

        /* Left-1 (top: 50%, left: 22%) → Left-2 (top: 26%, left: 21%) */
        @keyframes move-clockwise-left-1-to-left-2 {
          0% {
            top: 50%;
            left: 22%;
            transform: rotate(-15deg) scale(1);
          }
          50% {
            transform: rotate(-15deg) scale(1.1);
          }
          100% {
            top: 26%;
            left: 21%;
            transform: rotate(-15deg) scale(1);
          }
        }

        /* Left-2 (top: 26%, left: 21%) → Left-3 (top: 1%, left: 26%) */
        @keyframes move-clockwise-left-2-to-left-3 {
          0% {
            top: 26%;
            left: 21%;
            transform: rotate(-15deg) scale(1);
          }
          50% {
            transform: rotate(-15deg) scale(1.1);
          }
          100% {
            top: 1%;
            left: 26%;
            transform: rotate(-15deg) scale(1);
          }
        }

        /* Left-3 (top: 1%, left: 26%) → Right-3 (top: 1%, left: 63%) */
        @keyframes move-clockwise-left-3-to-right-3 {
          0% {
            top: 1%;
            left: 26%;
            transform: rotate(-15deg) scale(1);
          }
          50% {
            top: 1%;
            left: 44.5%;
            transform: rotate(-90deg) scale(1.15);
          }
          100% {
            top: 1%;
            left: 63%;
            transform: rotate(-165deg) scale(1);
          }
        }

        .book-right-3.move-clockwise-from-right-3 {
          animation: move-clockwise-right-3-to-right-2 1.5s ease-in-out forwards;
        }

        .book-right-2.move-clockwise-from-right-2 {
          animation: move-clockwise-right-2-to-right-1 1.5s ease-in-out forwards;
        }

        .book-right-1.move-clockwise-from-right-1 {
          animation: move-clockwise-right-1-to-left-1 1.5s ease-in-out forwards;
        }

        .book-left-1.move-clockwise-from-left-1 {
          animation: move-clockwise-left-1-to-left-2 1.5s ease-in-out forwards;
        }

        .book-left-2.move-clockwise-from-left-2 {
          animation: move-clockwise-left-2-to-left-3 1.5s ease-in-out forwards;
        }

        .book-left-3.move-clockwise-from-left-3 {
          animation: move-clockwise-left-3-to-right-3 1.5s ease-in-out forwards;
        }

        /* Tooltip Animations */
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) scale(0.92) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) scale(1) rotateX(0deg);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes borderGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes meshMove {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(10px, -10px) scale(1.02);
          }
          66% {
            transform: translate(-10px, 10px) scale(0.98);
          }
        }

        @keyframes floatRotate {
          0%, 100% {
            transform: translateY(0) rotate(-45deg);
          }
          50% {
            transform: translateY(-5px) rotate(-40deg);
          }
        }

        @keyframes holographicPulse {
          0%, 100% {
            opacity: 0.3;
            filter: blur(15px) hue-rotate(0deg);
          }
          50% {
            opacity: 0.5;
            filter: blur(20px) hue-rotate(10deg);
          }
        }

        @keyframes neonPulse {
          0%, 100% {
            opacity: 0.8;
            box-shadow: 0 0 10px rgba(255, 229, 153, 0.5), 0 0 20px rgba(255, 191, 0, 0.3);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 15px rgba(255, 229, 153, 0.8), 0 0 30px rgba(255, 191, 0, 0.5);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes scanLine {
          0% {
            top: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes orbitPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        @keyframes rotateGlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(0, 217, 255, 0.5), 0 0 20px rgba(255, 229, 153, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.8), 0 0 40px rgba(255, 229, 153, 0.5);
          }
        }

      `}</style>

      {/* Book Tooltip - Using ScriptureCard Component */}
      {hoveredBook && !permanentCard && (
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
            backgroundImage: 'url(/Ganesha_background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
              borderRadius: '20px',
            padding: '4px',
          }}
        >
          <ScriptureCard
            name={hoveredBook.sanskrit_name || hoveredBook.english_name || ''}
            description={hoveredBook.details || 'No details available'}
            publisher={Array.isArray(hoveredBook.publication) ? hoveredBook.publication[0] || '' : (hoveredBook.publication || '')}
            category={hoveredBook.category || ''}
            publishers={Array.isArray(hoveredBook.publication) ? hoveredBook.publication : (hoveredBook.publication ? [hoveredBook.publication] : [])}
            tone={'black'}
            onRead={() => {
              // Handle read action
              console.log('Read book:', hoveredBook.sanskrit_name || hoveredBook.english_name || '');
            }}
            onLivePodcast={() => {
              // Handle live podcast action
              console.log('Live podcast for book:', hoveredBook.sanskrit_name || hoveredBook.english_name || '');
                    }}
                  />
                </div>
              )}
              
      {/* Permanent Card - Shown on Book Click */}
      {permanentCard && (
        <>
          {/* Backdrop Overlay */}
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
          {/* Permanent Card */}
              <div
                style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20000,
              pointerEvents: 'auto',
              animation: 'tooltipFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <ScriptureCard
              name={permanentCard.sanskrit_name || permanentCard.english_name || ''}
              description={permanentCard.details || 'No details available'}
              publisher={Array.isArray(permanentCard.publication) ? permanentCard.publication[0] || '' : (permanentCard.publication || '')}
              category={permanentCard.category || ''}
              publishers={Array.isArray(permanentCard.publication) ? permanentCard.publication : (permanentCard.publication ? [permanentCard.publication] : [])}
              showCloseButton={true}
              onClose={handleClosePermanentCard}
              tone={'black'}
              onRead={() => {
                // Handle read action
                console.log('Read book:', permanentCard.sanskrit_name || permanentCard.english_name || '');
              }}
              onLivePodcast={() => {
                // Handle live podcast action
                console.log('Live podcast for book:', permanentCard.sanskrit_name || permanentCard.english_name || '');
              }}
            />
              </div>
        </>
      )}

      {/* Third Eye Flare - Show after books appear */}
      {showBooks && showThirdEyeFlare && !showThirdEyeDialog && (
        <ThirdEyeFlareRed onClick={handleThirdEyeClick} />
      )}

      {/* Third Eye Dialog */}
      {showThirdEyeDialog && (
        <ThirdEyeDialog
          onClose={handleDialogClose}
          onBookSelect={handleBookSelect}
          books={books}
        />
      )}
    </div>
  );
}