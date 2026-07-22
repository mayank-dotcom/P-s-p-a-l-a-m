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
      description: 'Members of the Gaṇapatya sect who venerate Gaṇeśa as the supreme.'
    },
    {
      src: '/Shiv.png',
      title: 'Śaiva',
      link: '/Shiva_lib',
      description: 'Followers of Śaiva tradition who revere Śiva as the supreme cosmic principle.'
    },
    {
      src: '/Vishnu.png',
      title: 'Vaiṣṇava',
      link: '/Vishnu_lib',
      description: 'Adherents of Vaiṣṇava dharma centered on Vishnu as the ultimate divinity.'
    },
    {
      src: '/Devi.png',
      title: 'Śākta',
      link: '/Devi_lib',
      description: 'Practitioners of Śākta worship who honor the Devī as the primordial power.'
    },
    {
      src: '/Surya.png',
      title: 'Saurā',
      link: '/Surya_lib',
      description: 'Followers of the Saurā tradition that exalts Sūrya, the solar lord.'
    },
    {
      src: '/Kartikeya.jpg',
      title: 'Kaumāra',
      link: '/library',
      description: 'Devotees of Kaumāra lineage dedicated to Kumāra / Kārtikeya as their chief deity.'
    },
    {
      src: '/Smartha.png',
      title: 'Smārta',
      link: '/library',
      description: 'Practitioners of Smārta philosophy who embrace a pancha-devatā (five-deity) balanced approach.'
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
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${
              hoveredIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: 'skewX(-15deg)', width: hoveredIndex === 0 ? '360px' : '210px', marginLeft: '11px', marginTop: '-12rem', transition: 'width 0.5s ease-out' }}
          >
            <div
              style={{
                transform: hoveredIndex === 0 ? 'skewX(15deg) translateX(0)' : 'skewX(15deg) translateX(100%)',
                transition: 'transform 0.5s ease-out'
              }}
              className="text-center max-w-full px-4"
            >
              <img src="/icon.png" alt="Icon" className="w-15 h-15 mx-auto mb-3" />
              <h3 className="text-white text-2xl font-bold mb-2 underline decoration-white decoration-2 break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[0].title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[0].description}
              </p>
            </div>
          </div>
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
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${
              hoveredIndex === 1 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: 'skewX(-15deg)', width: hoveredIndex === 1 ? '360px' : '210px', transition: 'width 0.5s ease-out' }}
          >
            <div
              style={{
                transform: hoveredIndex === 1 ? 'skewX(15deg) translateX(0)' : 'skewX(15deg) translateX(100%)',
                transition: 'transform 0.5s ease-out'
              }}
              className="text-center max-w-full px-4"
            >
              <img src="/icon.png" alt="Icon" className="w-15 h-15 mx-auto mb-3" />
              <h3 className="text-white text-2xl font-bold mb-2 underline decoration-white decoration-2 break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[1].title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[1].description}
              </p>
            </div>
          </div>
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
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${
              hoveredIndex === 2 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: 'skewX(-15deg)', width: hoveredIndex === 2 ? '360px' : '210px', transition: 'width 0.5s ease-out' }}
          >
            <div
              style={{
                transform: hoveredIndex === 2 ? 'skewX(15deg) translateX(0)' : 'skewX(15deg) translateX(100%)',
                transition: 'transform 0.5s ease-out'
              }}
              className="text-center max-w-full px-4"
            >
              <img src="/icon.png" alt="Icon" className="w-15 h-15 mx-auto mb-3" />
              <h3 className="text-white text-2xl font-bold mb-2 underline decoration-white decoration-2 break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[2].title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[2].description}
              </p>
            </div>
          </div>
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
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${
              hoveredIndex === 3 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: 'skewX(-15deg)', width: hoveredIndex === 3 ? '360px' : '210px', transition: 'width 0.5s ease-out' }}
          >
            <div
              style={{
                transform: hoveredIndex === 3 ? 'skewX(15deg) translateX(0)' : 'skewX(15deg) translateX(100%)',
                transition: 'transform 0.5s ease-out'
              }}
              className="text-center max-w-full px-4"
            >
              <img src="/icon.png" alt="Icon" className="w-15 h-15 mx-auto mb-3" />
              <h3 className="text-white text-2xl font-bold mb-2 underline decoration-white decoration-2 break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[3].title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[3].description}
              </p>
            </div>
          </div>
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
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${
              hoveredIndex === 4 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: 'skewX(-15deg)', width: hoveredIndex === 4 ? '360px' : '210px', transition: 'width 0.5s ease-out' }}
          >
            <div
              style={{
                transform: hoveredIndex === 4 ? 'skewX(15deg) translateX(0)' : 'skewX(15deg) translateX(100%)',
                transition: 'transform 0.5s ease-out'
              }}
              className="text-center max-w-full px-4"
            >
              <img src="/icon.png" alt="Icon" className="w-15 h-15 mx-auto mb-3" />
              <h3 className="text-white text-2xl font-bold mb-2 underline decoration-white decoration-2 break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[4].title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[4].description}
              </p>
            </div>
          </div>
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
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${
              hoveredIndex === 5 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: 'skewX(-15deg)', width: hoveredIndex === 5 ? '360px' : '210px', transition: 'width 0.5s ease-out' }}
          >
            <div
              style={{
                transform: hoveredIndex === 5 ? 'skewX(15deg) translateX(0)' : 'skewX(15deg) translateX(100%)',
                transition: 'transform 0.5s ease-out'
              }}
              className="text-center max-w-full px-4"
            >
              <img src="/icon.png" alt="Icon" className="w-15 h-15 mx-auto mb-3" />
              <h3 className="text-white text-2xl font-bold mb-2 underline decoration-white decoration-2 break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[5].title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[5].description}
              </p>
            </div>
          </div>
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
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${
              hoveredIndex === 6 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: 'skewX(-15deg)', width: hoveredIndex === 6 ? '360px' : '220px', transition: 'width 0.5s ease-out' }}
          >
            <div
              style={{
                transform: hoveredIndex === 6 ? 'skewX(15deg) translateX(0)' : 'skewX(15deg) translateX(100%)',
                transition: 'transform 0.5s ease-out'
              }}
              className="text-center max-w-full px-4"
            >
              <img src="/icon.png" alt="Icon" className="w-15 h-15 mx-auto mb-3" />
              <h3 className="text-white text-2xl font-bold mb-2 underline decoration-white decoration-2 break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[6].title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed break-words font-[family-name:var(--font-jaini-purva)]">
                {imageData[6].description}
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}