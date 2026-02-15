'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Navbar from '../components/Navbar';
import ScriptureCard from '../components/ScriptureCard';
import ThirdEyeDialog from '../components/ThirdEyeDialog';

// Type for the book data
interface Book {
    _id: string;
    sanskrit_name: string;
    english_name: string;
    position: number;
    sampradaaya: string[];
    image: string;
    category: string;
    publication: string[];
    details: string;
}

// Type declaration for model-viewer custom element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    src?: string;
                    alt?: string;
                    'camera-controls'?: boolean;
                    'disable-zoom'?: boolean;
                    'disable-pan'?: boolean;
                    'camera-orbit'?: string;
                    'auto-rotate'?: boolean;
                    'interaction-prompt'?: string;
                    'environment-image'?: string;
                    'skybox-image'?: string;
                    'exposure'?: string;
                    'shadow-intensity'?: string;
                    'shadow-softness'?: string;
                    'tone-mapping'?: string;
                    'scale'?: string;
                    'orientation'?: string;
                    'field-of-view'?: string;
                    'min-field-of-view'?: string;
                    'max-field-of-view'?: string;
                    style?: React.CSSProperties;
                },
                HTMLElement
            >;
        }
    }
}

// Planet positions around the sun (in percentage from center) - positioned over 3D model planets
const planetPositions = [
    { top: '20%', left: '50%', angle: 0 },
    { top: '28%', left: '68%', angle: 45 },
    { top: '50%', left: '75%', angle: 90 },
    { top: '72%', left: '68%', angle: 135 },
    { top: '80%', left: '50%', angle: 180 },
    { top: '72%', left: '32%', angle: 225 },
    { top: '50%', left: '25%', angle: 270 },
    { top: '28%', left: '32%', angle: 315 },
];

export default function SuryaLib() {
    const [showModel, setShowModel] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(1);
    const video1Ref = useRef<HTMLVideoElement | null>(null);
    const video2Ref = useRef<HTMLVideoElement | null>(null);

    const [rotationY, setRotationY] = useState(0);
    const [rotationSpeed, setRotationSpeed] = useState(0);
    const stopRotationTimer = useRef<NodeJS.Timeout | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [hoveredBook, setHoveredBook] = useState<Book | null>(null);
    const [pinnedBook, setPinnedBook] = useState<Book | null>(null);
    const [currentBookIndex, setCurrentBookIndex] = useState(0);
    const [showTitles, setShowTitles] = useState(true);
    const [showSearchDialog, setShowSearchDialog] = useState(false);

    // Fetch books based on sampradaaya
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Fetch books for Saura and Smaartha traditions, and those marked as 'All'
                const response = await fetch('/api/books?sampradaaya=Saura,Smaartha,All');
                if (response.ok) {
                    const data = await response.json();
                    // Filter to only include books that have:
                    // 1. BOTH 'Saura' AND 'Smaartha' in sampradaaya array
                    // 2. OR have 'All' in sampradaaya array
                    const filteredBooks = (data.books || []).filter((book: Book) => {
                        const hasSaura = book.sampradaaya.includes('Saura');
                        const hasSmaartha = book.sampradaaya.includes('Smaartha');
                        const hasAll = book.sampradaaya.includes('All');

                        // Accept if: (Saura AND Smaartha) OR All
                        return (hasSaura && hasSmaartha) || hasAll;
                    });
                    setBooks(filteredBooks);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    // Show navbar after 5 seconds and model after 7 seconds
    useEffect(() => {
        const navTimer = setTimeout(() => {
            setShowNavbar(true);
        }, 5000);

        const modelTimer = setTimeout(() => {
            setShowModel(true);
        }, 7000);

        return () => {
            clearTimeout(navTimer);
            clearTimeout(modelTimer);
        };
    }, []);

    // Handle 'w' and 's' keys for rotation animation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();

            if (key === 'w' || key === 's') {
                // Hide titles during rotation
                setShowTitles(false);

                // Clear existing timer if any
                if (stopRotationTimer.current) {
                    clearTimeout(stopRotationTimer.current);
                }

                if (key === 'w') {
                    // Clockwise animation - Move forward in books
                    setRotationSpeed(-8.0);
                    setCurrentBookIndex((prev) => {
                        const nextIndex = prev + 8;
                        return nextIndex >= books.length ? 0 : nextIndex;
                    });
                } else if (key === 's') {
                    // Anti-Clockwise animation - Move backward in books
                    setRotationSpeed(8.0);
                    setCurrentBookIndex((prev) => {
                        const nextIndex = prev - 8;
                        return nextIndex < 0 ? Math.max(0, books.length - 8) : nextIndex;
                    });
                }

                // Stop animation after 1 second and show titles again
                stopRotationTimer.current = setTimeout(() => {
                    setRotationSpeed(0);
                    setShowTitles(true);
                }, 1000);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (stopRotationTimer.current) {
                clearTimeout(stopRotationTimer.current);
            }
        };
    }, [books]);

    // Animation loop
    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            if (rotationSpeed !== 0) {
                setRotationY((prev) => (prev + rotationSpeed) % 360);
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [rotationSpeed]);

    // Handle video transitions
    useEffect(() => {
        const video1 = video1Ref.current;
        const video2 = video2Ref.current;

        if (!video1 || !video2) return;

        // Set initial state
        video1.muted = isMuted;
        video2.muted = isMuted;

        const handleVideo1Ended = () => {
            setCurrentVideo(2);
            video2.currentTime = 0;
            video2.play();
        };

        const handleVideo2Ended = () => {
            setCurrentVideo(1);
            video1.currentTime = 0;
            video1.play();
        };

        video1.addEventListener('ended', handleVideo1Ended);
        video2.addEventListener('ended', handleVideo2Ended);

        // Start playing the first video
        video1.play().catch(err => console.log('Autoplay prevented:', err));

        return () => {
            video1.removeEventListener('ended', handleVideo1Ended);
            video2.removeEventListener('ended', handleVideo2Ended);
        };
    }, []);

    // Update mute state for both videos
    useEffect(() => {
        if (video1Ref.current) video1Ref.current.muted = isMuted;
        if (video2Ref.current) video2Ref.current.muted = isMuted;
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* Background Videos */}
            <div className="fixed inset-0 w-full h-full">
                <video
                    ref={video1Ref}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${currentVideo === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    playsInline
                    preload="auto"
                >
                    <source src="/surya_1.mp4" type="video/mp4" />
                </video>
                <video
                    ref={video2Ref}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${currentVideo === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    playsInline
                    preload="auto"
                >
                    <source src="/surya_2.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Mute Button */}
            <button
                onClick={toggleMute}
                className="fixed bottom-4 right-4 p-2 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-full transition-all z-50"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
                {isMuted ? (
                    <VolumeX className="w-4 h-4 text-zinc-400" />
                ) : (
                    <Volume2 className="w-4 h-4 text-zinc-400" />
                )}
            </button>

            {/* Navbar with delayed appearance */}
            <div
                className={`relative z-30 transition-all duration-1000 ${showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                    }`}
            >
                <Navbar />
            </div>

            {/* 3D Model Container */}
            <div className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${showModel ? 'opacity-100' : 'opacity-0'}`}>
                {/* Golden Glow Background */}
                <div className="absolute w-[800px] h-[800px] golden-glow rounded-full mix-blend-screen z-0"></div>
                {/* Golden Rays */}
                <div className="absolute w-[1200px] h-[1200px] golden-rays rounded-full mix-blend-screen z-0"></div>
                {/* Glowing Ring in Center - Brighter & More Vibrant */}
                <div
                    className="absolute w-[400px] h-[400px] rounded-full border-4 animate-pulse-ring z-5"
                    style={{
                        borderColor: 'rgba(255, 215, 0, 0.8)',
                        boxShadow: '0 0 30px rgba(255, 191, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.4)'
                    }}
                ></div>
                <div
                    className="absolute w-[450px] h-[450px] rounded-full border-2 animate-pulse-ring-slow z-5"
                    style={{
                        borderColor: 'rgba(255, 223, 0, 0.6)',
                        boxShadow: '0 0 40px rgba(255, 191, 0, 0.6), 0 0 80px rgba(255, 215, 0, 0.4)'
                    }}
                ></div>

                {/* Glowing Circle Button in Center */}
                <button
                    onClick={() => setShowSearchDialog(true)}
                    className="absolute pointer-events-auto z-20 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(196, 164, 74, 0.4))',
                        border: '3px solid rgba(255, 215, 0, 0.9)',
                        boxShadow: '0 0 25px rgba(255, 191, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.5), inset 0 0 15px rgba(255, 215, 0, 0.3)',
                        backdropFilter: 'blur(10px)',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15)';
                        e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 191, 0, 1), 0 0 80px rgba(255, 215, 0, 0.7), inset 0 0 20px rgba(255, 215, 0, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 191, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.5), inset 0 0 15px rgba(255, 215, 0, 0.3)';
                    }}
                >
                    {/* Inner Circle */}
                    <div
                        className="w-8 h-8 rounded-full"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 100, 0.6), rgba(255, 215, 0, 0.6))',
                            boxShadow: '0 0 15px rgba(255, 215, 0, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.4)',
                            border: '1px solid rgba(255, 255, 150, 0.6)'
                        }}
                    ></div>
                </button>

                <div className="relative z-10 w-[110%] h-[110%] animate-spin-z border-0 outline-none" suppressHydrationWarning>
                    {React.createElement('model-viewer', {
                        src: '/golden+sun+sculpture+3d+model.glb',
                        alt: 'Golden Sun Sculpture',
                        'camera-orbit': '-90deg 87deg 4m',
                        'field-of-view': '30deg',
                        'min-field-of-view': '30deg',
                        'max-field-of-view': '30deg',
                        'interaction-prompt': 'none',
                        'disable-zoom': true,
                        'scale': '1.5 1.5 1.5',
                        // Lighting setup for golden appearance
                        'environment-image': 'neutral',
                        'exposure': '2',
                        'shadow-intensity': '0',
                        'shadow-softness': '0.8',
                        'tone-mapping': 'commerce',
                        'orientation': `0deg ${rotationY}deg 0deg`,
                        style: {
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            border: 'none',
                            outline: 'none',
                            // Golden lighting filter
                            filter: 'sepia(0.3) saturate(1.8) hue-rotate(5deg) brightness(1.1)',
                        },
                    })}
                </div>

                {/* Interactive Book Titles over 3D Model Planets */}
                {showTitles && books.slice(currentBookIndex, currentBookIndex + 8).map((book, index) => {
                    const position = planetPositions[index] || planetPositions[0];
                    const isHovered = hoveredBook?._id === book._id;
                    const isPinned = pinnedBook?._id === book._id;
                    const showCard = !pinnedBook && isHovered; // Show hover card only if no card is pinned

                    return (
                        <div
                            key={book._id}
                            className="absolute pointer-events-auto"
                            style={{
                                top: position.top,
                                left: position.left,
                                transform: 'translate(-50%, -50%)',
                                zIndex: 30, // Above 3D model (z-10)
                            }}
                            onMouseEnter={() => !pinnedBook && setHoveredBook(book)}
                            onMouseLeave={() => !pinnedBook && setHoveredBook(null)}
                        >
                            {/* Sanskrit Name Label Only - No CSS Planet */}
                            <div className="relative group cursor-pointer">
                                <div
                                    className="whitespace-nowrap"
                                    onClick={() => setPinnedBook(book)}
                                >
                                    <p
                                        className="text-yellow-200 font-bold text-base drop-shadow-[0_0_12px_rgba(255,191,0,1)] px-3 py-1.5 bg-black/60 rounded-lg backdrop-blur-sm border-2 border-yellow-400/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/80 group-hover:border-yellow-300 group-hover:shadow-[0_0_25px_rgba(255,191,0,0.8)]"
                                        style={{
                                            fontFamily: 'var(--font-jaini-purva)',
                                        }}
                                    >
                                        {book.sanskrit_name}
                                    </p>
                                </div>

                                {/* Hover Card (only when not pinned) */}
                                {showCard && (
                                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
                                        <div style={{ width: '600px', maxWidth: '90vw' }}>
                                            <ScriptureCard
                                                name={book.sanskrit_name}
                                                description={book.details}
                                                publisher={book.publication[0] || ''}
                                                publishers={book.publication}
                                                category={book.category}
                                                image={book.image}
                                                tone="black"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* Pinned Scripture Card - Centered on Screen (Outside 3D Container) */}
            {pinnedBook && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setPinnedBook(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            zIndex: 19000,
                            backdropFilter: 'blur(5px)',
                            animation: 'fadeIn 0.3s ease',
                        }}
                    />

                    {/* Centered Card */}
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 20000,
                            pointerEvents: 'auto',
                            animation: 'fadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
                            name={pinnedBook.sanskrit_name}
                            description={pinnedBook.details}
                            publisher={pinnedBook.publication[0] || ''}
                            publishers={pinnedBook.publication}
                            category={pinnedBook.category}
                            image={pinnedBook.image}
                            tone="black"
                            showCloseButton={true}
                            onClose={() => setPinnedBook(null)}
                        />
                    </div>
                </>
            )}


            {/* ThirdEyeDialog for Search */}
            {showSearchDialog && (
                <ThirdEyeDialog
                    onClose={() => setShowSearchDialog(false)}
                    onBookSelect={(selectedBook) => {
                        // Map the selected book to our Book type
                        const book: Book = {
                            _id: selectedBook._id || '',
                            sanskrit_name: selectedBook.sanskrit_name || '',
                            english_name: selectedBook.english_name || '',
                            position: selectedBook.position || 0,
                            sampradaaya: Array.isArray(selectedBook.sampradaaya)
                                ? selectedBook.sampradaaya
                                : selectedBook.sampradaaya
                                    ? [selectedBook.sampradaaya]
                                    : [],
                            image: selectedBook.image || '',
                            category: selectedBook.category || '',
                            publication: Array.isArray(selectedBook.publication)
                                ? selectedBook.publication
                                : selectedBook.publication
                                    ? [selectedBook.publication]
                                    : [],
                            details: selectedBook.details || '',
                        };
                        setPinnedBook(book);
                        setShowSearchDialog(false);
                    }}
                    books={books.map(b => ({
                        _id: b._id,
                        sanskrit_name: b.sanskrit_name,
                        english_name: b.english_name,
                        position: b.position,
                        sampradaaya: b.sampradaaya.join(', '),
                        image: b.image,
                        category: b.category,
                        publication: b.publication,
                        details: b.details,
                    }))}
                />
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                
                @keyframes pulseRing {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.4;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.6;
                    }
                }
                
                @keyframes pulseRingSlow {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.2;
                    }
                    50% {
                        transform: scale(1.15);
                        opacity: 0.4;
                    }
                }
                
                .animate-pulse-ring {
                    animation: pulseRing 3s ease-in-out infinite;
                }
                
                .animate-pulse-ring-slow {
                    animation: pulseRingSlow 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
