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
      className={`absolute inset-0 flex flex-col justify-center items-center p-2 sm:p-4 transition-opacity duration-500 z-40 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      style={{
        marginTop: '1.5rem',
      }}
    >
      {/* Shared relative wrapper to sync animations and positioning */}
      <div
        style={{
          transform: isVisible ? 'skewX(15deg) scale(1)' : 'skewX(15deg) scale(0.95)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-[340px] sm:w-[380px] md:w-[420px] lg:w-[450px] max-w-[92vw] aspect-[0.74] sm:aspect-[0.76]"
      >
        {/* Blur element - scaled down behind the card (z-0) */}
        <div className="absolute inset-x-6 sm:inset-x-10 top-16 sm:top-24 bottom-8 sm:bottom-12 rounded-[24px] backdrop-blur-md scale-90 pointer-events-none z-0" />

        {/* Card element - rendered on top of the blur (z-10) with sharp card.png */}
        <div
          style={{
            backgroundImage: "url('/card.png')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-center items-center text-center shadow-2xl z-10"
        >
          {/* Card Content */}
          <div className="w-full flex flex-col items-center justify-center my-auto px-2 sm:px-4 md:px-6">
            {/* Title */}
            <h3 className="text-[#FFE5A3] text-xl sm:text-2xl md:text-3xl font-bold tracking-wide font-[family-name:var(--font-jaini-purva)] drop-shadow-[0_2px_8px_rgba(200,147,62,0.35)] mb-2 sm:mb-3">
              {title}
            </h3>

            {/* Description */}
            <p className="text-[#FFE5A3]/90 text-[11.5px] sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] xl:text-[14px] leading-relaxed font-sans px-1 sm:px-2">
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
    let isCancelled = false;

    // Critical hero images to preload
    const imageSources = [
      '/Ganpati.png',
      '/Shiv.png',
      '/Vishnu.png',
      '/Devi.png',
      '/Surya.png',
      '/Kartikeya.png',
      '/Smartha.png',
      '/card.png'
    ];

    let loadedCount = 0;
    const totalImages = imageSources.length;

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages && !isCancelled) {
        setIsMounted(true);
      }
    };

    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete && img.naturalWidth !== 0) {
        checkLoaded();
      } else {
        img.onload = checkLoaded;
        img.onerror = checkLoaded;
      }
    });

    // Fallback timer: ensure smooth transition within max 400ms regardless of network speed
    const fallbackTimer = setTimeout(() => {
      if (!isCancelled) {
        setIsMounted(true);
      }
    }, 400);

    return () => {
      isCancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Default images with comprehensive spiritual & philosophical descriptions (~80+ words each)
  const defaultImageData: ImageInfo[] = [
    {
      src: '/Ganpati.png',
      link: '/Ganesha_lib',
      title: 'Gāṇapatya',
      description: 'Follow the revered path of the Gāṇapatya sect. This tradition venerates Lord Gaṇeśa as the supreme Unmanifest Absolute (Param-Brahman). He is the primeval cause of all existence. Sacred scriptures include the Ganesha Purana, Mudgala Purana, and Ganapati Atharvashirsha Upanishad. Seekers learn to transcend material obstacles (Vighna). Practice awakens the root Muladhara chakra and refines intellect (Buddhi). Meditation on the sacred sound Om leads to supreme auspicious liberation (Siddhi).'
    },
    {
      src: '/Shiv.png',
      title: 'Śaiva',
      link: '/Shiva_lib',
      description: 'Follow the ancient Śaiva tradition revering Lord Śiva as Paramaśiva. He is the ultimate, self-luminous cosmic consciousness. This tradition transcends form, time, and worldly illusion. Wisdom stems from the sacred Śaiva Āgamas, Upanishads, and Śivamahimna Stotram. Seekers emphasize inner yoga, meditation, and non-dual wisdom (Advaita). Detachment frees the mind from transient desires. Devotees surrender to Natarāja, the infinite cosmic dancer. He orchestrates creation (Sṛṣṭi), preservation (Sthiti), and dissolution (Saṃhāra).'
    },
    {
      src: '/Vishnu.png',
      title: 'Vaiṣṇava',
      link: '/Vishnu_lib',
      description: 'Adhere to the Vaiṣṇava dharma centered on Lord Viṣṇu. He is the eternal preserver and cosmic protector of universal harmony. Divine teachings originate from the Śrīmad Bhagavad Gītā, Viṣṇu Purāṇa, and Bhāgavata Purāṇa. This lineage champions unconditional devotion (Bhakti-yoga) and righteous living. Seekers practice total self-surrender (Prapatti). Devotees meditate upon the ten sacred descents (Daśāvatāra). The Supreme Being manifests across cosmic epochs to subdue adharma and protect divine truth.'
    },
    {
      src: '/Devi.png',
      title: 'Śākta',
      link: '/Devi_lib',
      description: 'Honor the supreme Devī in the Śākta tradition. She is the primordial cosmic power (Ādyā Śakti) and divine mother. Sacred texts include the Devī Māhātmya, Lalitā Sahasranāma, and Devī Bhāgavata Purāṇa. This lineage reveres the divine feminine as active cosmic energy. Her presence animates all living consciousness. Seekers receive the infinite flow of maternal grace. Devotion awakens Kundalini energy and grants fierce protection against ignorance. Her cosmic power sustains, nurtures, and liberates all beings.'
    },
    {
      src: '/Surya.png',
      title: 'Saurā',
      link: '/Surya_lib',
      description: 'Follow the ancient Saurā tradition exalting Lord Sūrya as Pratyakṣa Devatā. He is the visible, radiant manifestation of the Supreme Self (Sūryātmā). Illumination comes from Rigvedic solar hymns and the Āditya Hṛdayam Stotram. This sacred path aligns human vitality with solar energy. Morning Sandhyāvandanam and Gayatri japa purify the mind. Solar contemplation cultivates vibrant physical health and spiritual radiance. Daily devotion awakens supreme inner consciousness and dispels all dark ignorance.'
    },
    {
      src: '/Kartikeya.png',
      title: 'Kaumāra',
      link: '/library',
      description: 'Connect with the noble Kaumāra lineage dedicated to Lord Kumāra. He is also revered as Murugan, Skanda, or Kārtikeya. Exalted in Tamil Sangam literature and the Skanda Purāṇa, Kumāra leads celestial forces. He represents divine wisdom (Jnāna), courage, and eternal youth. Seekers invoke His divine spear (Vel) to pierce spiritual ignorance. Discipline helps master self-control and eradicate egoic impurities. Walking this righteous path leads to the victorious triumph of light over dark forces.'
    },
    {
      src: '/Smartha.png',
      title: 'Smārta',
      link: '/library',
      description: 'Embrace the comprehensive Smārta tradition synthesized by Ādi Śankarācārya. This philosophy advocates a balanced Pañcāyatana approach to worship. Grounded in Vedic Sruti, Smriti, and Advaita Vedānta, it honors one Supreme Consciousness (Brahman). Divine reality manifests harmoniously through five deities: Śiva, Viṣṇu, Devī, Sūrya, and Gaṇeśa. Guided by self-inquiry (Jñāna Yoga), seekers transcend external boundaries. Scriptural contemplation reveals the non-dual unity of the Self (Ātman) with the cosmos.'
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
    <div
      className="relative flex h-screen min-h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Grid Item 1 */}
      <div
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 0 ? 'opacity-100' : 'opacity-0'
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
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 1 ? 'opacity-100' : 'opacity-0'
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
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 2 ? 'opacity-100' : 'opacity-0'
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
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 3 ? 'opacity-100' : 'opacity-0'
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
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 4 ? 'opacity-100' : 'opacity-0'
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
        className={`relative h-full overflow-hidden border-r border-black bg-zinc-950 transition-all duration-700 ease-out group ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 5 ? 'opacity-100' : 'opacity-0'
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
        className={`relative h-full overflow-hidden bg-zinc-950 transition-all duration-700 ease-out group ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hoveredIndex === 6 ? 'opacity-100' : 'opacity-0'
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