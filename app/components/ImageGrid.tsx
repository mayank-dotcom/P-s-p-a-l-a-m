'use client';

import { useState, useEffect } from 'react';

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
  const [loadedImages, setLoadedImages] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const imageData: ImageInfo[] = images.length === 7
    ? images.map((src, index) => ({
      src,
      title: defaultImageData[index]?.title || `Image ${index + 1}`,
      description: defaultImageData[index]?.description || 'A beautiful image from the collection.',
      link: defaultImageData[index]?.link || '/library',
    }))
    : defaultImageData;

  useEffect(() => {
    // Stagger the image loading animation
    imageData.forEach((_, index: number) => {
      setTimeout(() => {
        setLoadedImages(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 200); // 200ms delay between each image
    });
  }, [imageData]);

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* Grid Item 1 */}

      <div
        className={`relative h-full overflow-hidden border-r border-black bg-white transition-all duration-700 group ${loadedImages[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{
          transform: 'skewX(-15deg)',
          width: 'calc(16.666% + 250px)',
          marginLeft: '-80px'
        }}
        onMouseEnter={() => {
          setHoveredIndex(0);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      ><a href={imageData[0].link}>
          <div
            className="h-full w-full transition-all duration-500"
            style={{ transform: 'skewX(15deg) scale(1.3)' }}
          >

            <img
              src={imageData[0].src}
              alt={imageData[0].title}
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
            />

          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 0 ? 'opacity-100' : 'opacity-0'
              }`}
          />
          {/* Description Overlay */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${hoveredIndex === 0 ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transform: 'skewX(-15deg)', width: "210px", marginLeft: "11px", marginTop: '-12rem' }}
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
        className={`relative h-full overflow-hidden border-r border-black bg-white transition-all duration-700 group ${loadedImages[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{
          transform: 'skewX(-15deg)',
          width: 'calc(16.666% + 250px)',
          marginLeft: '-110px'
        }}
        onMouseEnter={() => {
          setHoveredIndex(1);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      ><a href={imageData[1].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
          <div
            className="h-full w-full transition-all duration-500"
            style={{ transform: 'skewX(15deg) scale(1.7)' }}
          >
            <img
              src={imageData[1].src}
              alt={imageData[1].title}
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
            />
          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 1 ? 'opacity-100' : 'opacity-0'
              }`}
          />
          {/* Description Overlay */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${hoveredIndex === 1 ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transform: 'skewX(-15deg)', marginRight: "100px" }}
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
        className={`relative h-full overflow-hidden border-r border-black bg-white transition-all duration-700 group ${loadedImages[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{
          transform: 'skewX(-15deg)',
          width: 'calc(16.666% + 250px)',
          marginLeft: '-110px'
        }}
        onMouseEnter={() => {
          setHoveredIndex(2);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      ><a href={imageData[2].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
          <div
            className="h-full w-full transition-all duration-500"
            style={{ transform: 'skewX(15deg) scale(1.7)' }}
          >
            <img
              src={imageData[2].src}
              alt={imageData[2].title}
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
            />
          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 2 ? 'opacity-100' : 'opacity-0'
              }`}
          />
          {/* Description Overlay */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${hoveredIndex === 2 ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transform: 'skewX(-15deg)', marginRight: "100px" }}
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
        className={`relative h-full overflow-hidden border-r border-black bg-white transition-all duration-700 group ${loadedImages[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{
          transform: 'skewX(-15deg)',
          width: 'calc(16.666% + 250px)',
          marginLeft: '-110px'
        }}
        onMouseEnter={() => {
          setHoveredIndex(3);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      ><a href={imageData[3].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
        <div
          className="h-full w-full transition-all duration-500"
          style={{ transform: 'skewX(15deg) scale(1.7)' }}
        >
          <img
            src={imageData[3].src}
            alt={imageData[3].title}
            className="h-full w-full object-cover object-[center_80%] transition-transform duration-500 hover:scale-110"
          />
        </div>
        {/* Shadow Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 3 ? 'opacity-100' : 'opacity-0'
            }`}
        />
        {/* Description Overlay */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${hoveredIndex === 3 ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ transform: 'skewX(-15deg)', marginRight: "100px" }}
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
        className={`relative h-full overflow-hidden border-r border-black bg-white transition-all duration-700 group ${loadedImages[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{
          transform: 'skewX(-15deg)',
          width: 'calc(16.666% + 320px)',
          marginLeft: '-110px'
        }}
        onMouseEnter={() => {
          setHoveredIndex(4);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      ><a href={imageData[4].link} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
          <div
            className="h-full w-full transition-all duration-500"
            style={{ transform: 'skewX(15deg) scale(1.6) translateY(5%)' }}
          >
            <img
              src={imageData[4].src}
              alt={imageData[4].title}
              className="h-full w-full object-cover object-[center_50%] transition-transform duration-500 hover:scale-110"
            />
          </div>
          {/* Shadow Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 4 ? 'opacity-100' : 'opacity-0'
              }`}
          />
          {/* Description Overlay */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${hoveredIndex === 4 ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transform: 'skewX(-15deg)', marginRight: "100px" }}
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
        className={`relative h-full overflow-hidden border-r border-black bg-white transition-all duration-700 group ${loadedImages[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{
          transform: 'skewX(-15deg)',
          width: 'calc(16.666% + 250px)',
          marginLeft: '-110px'
        }}
        onMouseEnter={() => {
          setHoveredIndex(5);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div
          className="h-full w-full transition-all duration-500"
          style={{ transform: 'skewX(15deg) scale(1.7)' }}
        >
          <img
            src={imageData[5].src}
            alt={imageData[5].title}
            className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
          />
        </div>
        {/* Shadow Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 5 ? 'opacity-100' : 'opacity-0'
            }`}
        />
        {/* Description Overlay */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${hoveredIndex === 5 ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ transform: 'skewX(-15deg)', marginRight: "100px" }}
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
      </div>

      {/* Grid Item 7 */}
      <div
        className={`relative h-full overflow-hidden bg-white transition-all duration-700 group ${loadedImages[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{
          transform: 'skewX(-15deg)',
          width: 'calc(16.666% + 180px)',
          marginLeft: '-110px',
          marginRight: '-80px'
        }}
        onMouseEnter={() => {
          setHoveredIndex(6);
          onSegmentHover?.();
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div
          className="h-full w-full transition-all duration-500"
          style={{ transform: 'skewX(15deg) scale(1.7)' }}
        >
          <img
            src={imageData[6].src}
            alt={imageData[6].title}
            className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
          />
        </div>
        {/* Shadow Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 6 ? 'opacity-100' : 'opacity-0'
            }`}
        />
        {/* Description Overlay */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 ${hoveredIndex === 6 ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ transform: 'skewX(-15deg)', marginRight: "200px", width: "220px" }}
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
      </div>
    </div>
  );
}