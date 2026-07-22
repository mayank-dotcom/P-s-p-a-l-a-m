'use client';

import { useState, useEffect, useMemo } from 'react';

interface ImageGridProps {
  images?: string[];
  onSegmentHover?: () => void;
}

interface ImageInfo {
  src: string;
  title: string;
  description: string;
  link: string;
}

interface DetailCardProps {
  isVisible: boolean;
  title: string;
  description: string;
}

function DetailCard({ isVisible, title, description }: DetailCardProps) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center items-center p-4 transition-opacity duration-500 z-40 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        marginTop: '3.5rem',
      }}
    >
      {/* Shared relative wrapper to sync animations and positioning */}
      <div
        style={{
          transform: isVisible ? 'skewX(15deg) scale(1)' : 'skewX(15deg) scale(0.95)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-[420px] max-w-[90vw] aspect-[1.05]"
      >
        {/* Blur element - positioned behind the card (z-0) with reduced height from top */}
        <div className="absolute inset-x-8 top-16 bottom-8 rounded-[24px] backdrop-blur-sm pointer-events-none z-0" />

        {/* Card element - rendered on top of the blur (z-10) with sharp card.png */}
        <div
          style={{
            backgroundImage: "url('/card.png')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="absolute inset-0 p-10 flex flex-col justify-center items-center text-center shadow-2xl z-10"
        >
          {/* Card Content */}
          <div className="w-full flex flex-col items-center justify-center my-auto px-6">
            {/* Title */}
            <h3 className="text-[#FFE5A3] text-3xl font-bold tracking-wide font-[family-name:var(--font-jaini-purva)] drop-shadow-[0_2px_8px_rgba(200,147,62,0.35)] mb-4">
              {title}
            </h3>

            {/* Description */}
            <p className="text-[#FFE5A3]/90 text-[15px] leading-relaxed font-sans px-4">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImageGrid({ images = [], onSegmentHover }: ImageGridProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // Single mount state trigger for CSS-based entrance transition
    setIsMounted(true);
  }, []);

  // Default images with descriptions
  const defaultImageData: ImageInfo[] = [
    {
      src: '/Ganpati.jpg',
      link: '/Ganesha_lib',
      title: 'Gāṇapatya',
      description: 'Follow the path of the Gāṇapatya sect who venerate Lord Gaṇeśa as the supreme deity. Embark on a sacred journey of wisdom, intellect, and spiritual growth, honoring the divine remover of obstacles and the benevolent giver of all auspicious beginnings in life.'
    },
    {
      src: '/Shiv.png',
      title: 'Śaiva',
      link: '/Shiva_lib',
      description: 'Follow the sacred Śaiva tradition that reveres Lord Śiva as the ultimate, supreme cosmic principle of the universe. Seek inner peace, ultimate detachment, and profound spiritual realization through the grace of the infinite cosmic dancer who orchestrates the cycles of creation, preservation, and dissolution.'
    },
    {
      src: '/Vishnu.png',
      title: 'Vaiṣṇava',
      link: '/Vishnu_lib',
      description: 'Adhere to the Vaiṣṇava dharma centered on Lord Viṣṇu as the ultimate source of preservation and divinity. Embrace the path of unconditional bhakti, righteous living, and cosmic harmony, meditating on the divine descents of the Lord who manifests age after age to protect the universe.'
    },
    {
      src: '/Devi.png',
      title: 'Śākta',
      link: '/Devi_lib',
      description: 'Honor the supreme Devī as the primordial power and cosmic creator in the Śākta tradition. Meditate upon the infinite flow of maternal grace, divine energy, and fierce protection, surrendering to the cosmic force of the Divine Mother who sustains and guides all living beings.'
    },
    {
      src: '/Surya.png',
      title: 'Saurā',
      link: '/Surya_lib',
      description: 'Follow the ancient Saurā tradition exalting Lord Sūrya, the supreme solar deity. Align your spirit with the eternal source of light, life-giving energy, physical health, and supreme cosmic consciousness that sustains all planetary life and dispels the dark shadows of spiritual ignorance.'
    },
    {
      src: '/Kartikeya.jpg',
      title: 'Kaumāra',
      link: '/library',
      description: 'Connect with the Kaumāra lineage dedicated to Lord Kumāra, also known as Murugan or Kārtikeya. Invoke the supreme commander of divine forces, who represents the peak of absolute courage, eternal youth, righteousness, and the ultimate spiritual victory of light over dark forces.'
    },
    {
      src: '/Smartha.png',
      title: 'Smārta',
      link: '/library',
      description: 'Embrace the Smārta philosophy, which advocates a non-sectarian, balanced pancha-devatā approach to worship. Meditate on the absolute unity of the singular divine consciousness manifest harmoniously through five major personal deities, guiding seekers along a path of pure wisdom and liberation.'
    },
  ];

  const imageData: ImageInfo[] = useMemo(() => {
    return images.length === 7
      ? images.map((src, index) => ({
          src,
          title: defaultImageData[index]?.title || `Image ${index + 1}`,
          description: defaultImageData[index]?.description || 'A beautiful image from the collection.',
          link: defaultImageData[index]?.link || '/library',
        }))
      : defaultImageData;
  }, [images]);

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* Grid Item 1 */}
      <div
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{
          transform: 'skewX(-15deg)',
          width: hoveredIndex === 0 ? 'calc(((100% / 7) + 250px) * 3)' : 'calc((100% / 7) + 250px)',
          marginLeft: '-110px',
          transitionDelay: '0ms',
          zIndex: hoveredIndex === 0 ? 30 : 1
        }}
        onMouseEnter={() => {
          setHoveredIndex(0);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <a href={imageData[0].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              width: 'calc(100% + 54vh)',
              marginLeft: '-27vh',
              transform: hoveredIndex === 0 ? 'skewX(15deg) scale(1.05)' : 'skewX(15deg) scale(1.5)'
            }}
          >
            <img
              src={imageData[0].src}
              alt={imageData[0].title}
              className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 hover:scale-110"
              loading="eager"
            />
          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              hoveredIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Description Overlay */}
          <DetailCard
            isVisible={hoveredIndex === 0}
            title={imageData[0].title}
            description={imageData[0].description}
          />
        </a>
      </div>

      {/* Grid Item 2 */}
      <div
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{
          transform: 'skewX(-15deg)',
          width: hoveredIndex === 1 ? 'calc(((100% / 7) + 250px) * 3)' : 'calc((100% / 7) + 250px)',
          marginLeft: '-110px',
          transitionDelay: '120ms',
          zIndex: hoveredIndex === 1 ? 30 : 1
        }}
        onMouseEnter={() => {
          setHoveredIndex(1);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <a href={imageData[1].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              width: 'calc(100% + 54vh)',
              marginLeft: '-27vh',
              transform: hoveredIndex === 1 ? 'skewX(15deg) scale(1.05)' : 'skewX(15deg) scale(1.7)'
            }}
          >
            <img
              src={imageData[1].src}
              alt={imageData[1].title}
              className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 hover:scale-110"
              loading="eager"
            />
          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              hoveredIndex === 1 ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Description Overlay */}
          <DetailCard
            isVisible={hoveredIndex === 1}
            title={imageData[1].title}
            description={imageData[1].description}
          />
        </a>
      </div>

      {/* Grid Item 3 */}
      <div
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{
          transform: 'skewX(-15deg)',
          width: hoveredIndex === 2 ? 'calc(((100% / 7) + 250px) * 3)' : 'calc((100% / 7) + 250px)',
          marginLeft: '-110px',
          transitionDelay: '240ms',
          zIndex: hoveredIndex === 2 ? 30 : 1
        }}
        onMouseEnter={() => {
          setHoveredIndex(2);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <a href={imageData[2].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              width: 'calc(100% + 54vh)',
              marginLeft: '-27vh',
              transform: hoveredIndex === 2 ? 'skewX(15deg) scale(1.05)' : 'skewX(15deg) scale(1.7)'
            }}
          >
            <img
              src={imageData[2].src}
              alt={imageData[2].title}
              className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 hover:scale-110"
              loading="eager"
            />
          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              hoveredIndex === 2 ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Description Overlay */}
          <DetailCard
            isVisible={hoveredIndex === 2}
            title={imageData[2].title}
            description={imageData[2].description}
          />
        </a>
      </div>

      {/* Grid Item 4 */}
      <div
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{
          transform: 'skewX(-15deg)',
          width: hoveredIndex === 3 ? 'calc(((100% / 7) + 250px) * 3)' : 'calc((100% / 7) + 250px)',
          marginLeft: '-110px',
          transitionDelay: '360ms',
          zIndex: hoveredIndex === 3 ? 30 : 1
        }}
        onMouseEnter={() => {
          setHoveredIndex(3);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <a href={imageData[3].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              width: 'calc(100% + 54vh)',
              marginLeft: '-27vh',
              transform: hoveredIndex === 3 ? 'skewX(15deg) scale(1.2) translateY(-8%)' : 'skewX(15deg) scale(1.7) translateY(-12%)'
            }}
          >
            <img
              src={imageData[3].src}
              alt={imageData[3].title}
              className="h-full w-full object-cover object-[center_30%] transition-transform duration-500 hover:scale-110"
              loading="eager"
            />
          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              hoveredIndex === 3 ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Description Overlay */}
          <DetailCard
            isVisible={hoveredIndex === 3}
            title={imageData[3].title}
            description={imageData[3].description}
          />
        </a>
      </div>

      {/* Grid Item 5 */}
      <div
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{
          transform: 'skewX(-15deg)',
          width: hoveredIndex === 4 ? 'calc(((100% / 7) + 250px) * 3)' : 'calc((100% / 7) + 250px)',
          marginLeft: '-110px',
          transitionDelay: '480ms',
          zIndex: hoveredIndex === 4 ? 30 : 1
        }}
        onMouseEnter={() => {
          setHoveredIndex(4);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <a href={imageData[4].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              width: 'calc(100% + 54vh)',
              marginLeft: '-27vh',
              transform: hoveredIndex === 4 ? 'skewX(15deg) scale(1.05)' : 'skewX(15deg) scale(1.6) translateY(12%)'
            }}
          >
            <img
              src={imageData[4].src}
              alt={imageData[4].title}
              className="h-full w-full object-cover object-[center_30%] transition-transform duration-500 hover:scale-110"
              loading="eager"
            />
          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              hoveredIndex === 4 ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Description Overlay */}
          <DetailCard
            isVisible={hoveredIndex === 4}
            title={imageData[4].title}
            description={imageData[4].description}
          />
        </a>
      </div>

      {/* Grid Item 6 */}
      <div
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{
          transform: 'skewX(-15deg)',
          width: hoveredIndex === 5 ? 'calc(((100% / 7) + 250px) * 3)' : 'calc((100% / 7) + 250px)',
          marginLeft: '-110px',
          transitionDelay: '600ms',
          zIndex: hoveredIndex === 5 ? 30 : 1
        }}
        onMouseEnter={() => {
          setHoveredIndex(5);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <a href={imageData[5].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              width: 'calc(100% + 54vh)',
              marginLeft: '-27vh',
              transform: hoveredIndex === 5 ? 'skewX(15deg) scale(1.05)' : 'skewX(15deg) scale(1.7)'
            }}
          >
            <img
              src={imageData[5].src}
              alt={imageData[5].title}
              className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 hover:scale-110"
              loading="eager"
            />
          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              hoveredIndex === 5 ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Description Overlay */}
          <DetailCard
            isVisible={hoveredIndex === 5}
            title={imageData[5].title}
            description={imageData[5].description}
          />
        </a>
      </div>

      {/* Grid Item 7 */}
      <div
        className={`relative h-full overflow-hidden bg-zinc-950 transition-all duration-700 ease-out group ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{
          transform: 'skewX(-15deg)',
          width: hoveredIndex === 6 ? 'calc(((100% / 7) + 250px) * 3)' : 'calc((100% / 7) + 250px)',
          marginLeft: '-110px',
          marginRight: '-110px',
          transitionDelay: '720ms',
          zIndex: hoveredIndex === 6 ? 30 : 1
        }}
        onMouseEnter={() => {
          setHoveredIndex(6);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <a href={imageData[6].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              width: 'calc(100% + 54vh)',
              marginLeft: '-27vh',
              transform: hoveredIndex === 6 ? 'skewX(15deg) scale(1.05)' : 'skewX(15deg) scale(1.7)'
            }}
          >
            <img
              src={imageData[6].src}
              alt={imageData[6].title}
              className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 hover:scale-110"
              loading="eager"
            />
          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              hoveredIndex === 6 ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Description Overlay */}
          <DetailCard
            isVisible={hoveredIndex === 6}
            title={imageData[6].title}
            description={imageData[6].description}
          />
        </a>
      </div>
    </div>
  );
}