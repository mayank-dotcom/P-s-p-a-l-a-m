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
      className={`absolute inset-0 flex flex-col justify-center items-center p-4 transition-opacity duration-500 z-40 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
        className="relative w-[450px] max-w-[92vw] aspect-[0.74] sm:aspect-[0.76]"
      >
        {/* Blur element - scaled down behind the card (z-0) */}
        <div className="absolute inset-x-10 top-24 bottom-12 rounded-[24px] backdrop-blur-md scale-90 pointer-events-none z-0" />

        {/* Card element - rendered on top of the blur (z-10) with sharp card.png */}
        <div
          style={{
            backgroundImage: "url('/card.png')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-center items-center text-center shadow-2xl z-10"
        >
          {/* Card Content */}
          <div className="w-full flex flex-col items-center justify-center my-auto px-4 sm:px-6">
            {/* Title */}
            <h3 className="text-[#FFE5A3] text-2xl sm:text-3xl font-bold tracking-wide font-[family-name:var(--font-jaini-purva)] drop-shadow-[0_2px_8px_rgba(200,147,62,0.35)] mb-3">
              {title}
            </h3>

            {/* Description */}
            <p className="text-[#FFE5A3]/90 text-[13px] sm:text-[13.5px] leading-relaxed font-sans px-2">
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

  // Default images with comprehensive spiritual & philosophical descriptions (~80+ words each)
  const defaultImageData: ImageInfo[] = [
    {
      src: '/Ganpati.png',
      link: '/Ganesha_lib',
      title: 'Gāṇapatya',
      description: 'Follow the revered path of the Gāṇapatya sect who venerate Lord Gaṇeśa not merely as a deity of auspicious beginnings, but as the supreme Unmanifest Absolute (Param-Brahman) and primeval cause of all existence. Grounded in sacred texts like the Ganesha Purana, Mudgala Purana, and Ganapati Atharvashirsha Upanishad, this tradition guides seekers to transcend material obstacles (Vighna), awaken the root Muladhara chakra, refine intellect (Buddhi), and attain supreme auspicious liberation (Siddhi) through meditation on the divine sound Om.'
    },
    {
      src: '/Shiv.png',
      title: 'Śaiva',
      link: '/Shiva_lib',
      description: 'Follow the ancient Śaiva tradition that reveres Lord Śiva as Paramaśiva—the ultimate, self-luminous cosmic consciousness transcending form, time, and illusion. Grounded in the sacred Śaiva Āgamas, Upanishads, and devotional hymns like Śivamahimna Stotram, this lineage emphasizes inner yoga, profound meditation, non-dual wisdom (Advaita), and detachment. Seekers surrender to the grace of Natarāja, the infinite cosmic dancer who gracefully orchestrates the eternal cycles of creation (Sṛṣṭi), preservation (Sthiti), and ultimate dissolution (Saṃhāra).'
    },
    {
      src: '/Vishnu.png',
      title: 'Vaiṣṇava',
      link: '/Vishnu_lib',
      description: 'Adhere to the Vaiṣṇava dharma centered on Lord Viṣṇu as the eternal preserver, cosmic protector, and supreme source of universal harmony. Grounded in the divine teachings of the Śrīmad Bhagavad Gītā, Viṣṇu Purāṇa, and Bhāgavata Purāṇa, this tradition champions the path of unconditional loving devotion (Bhakti-yoga), righteous action, and total self-surrender (Prapatti). Meditate upon the ten sacred descents (Daśāvatāra) of the Supreme Being, who manifests across cosmic epochs to subdue adharma and uphold divine truth.'
    },
    {
      src: '/Devi.png',
      title: 'Śākta',
      link: '/Devi_lib',
      description: 'Honor the supreme Devī as the primordial cosmic power (Ādyā Śakti) and divine mother of creation in the Śākta tradition. Drawing wisdom from sacred texts like the Devī Māhātmya, Lalitā Sahasranāma, and Devī Bhāgavata Purāṇa, this lineage reveres the divine feminine as the active energy animating all consciousness. Meditate upon the infinite flow of maternal grace, the awakening of Kundalini energy, and Her fierce protection against ignorance, surrendering to the cosmic force that sustains and liberates all living beings.'
    },
    {
      src: '/Surya.png',
      title: 'Saurā',
      link: '/Surya_lib',
      description: 'Follow the ancient Saurā tradition exalting Lord Sūrya as Pratyakṣa Devatā—the visible, radiant manifestation of the Supreme Brahman and soul of the cosmos (Sūryātmā). Drawing deep illumination from Rigvedic solar hymns and the Āditya Hṛdayam Stotram, this sacred path aligns human vitality with divine solar energy. Through morning Sandhyāvandanam, Gayatri japa, and solar contemplation, seekers cultivate vibrant physical health, mental clarity, spiritual radiance, and the awakening of supreme inner consciousness.'
    },
    {
      src: '/Kartikeya.png',
      title: 'Kaumāra',
      link: '/library',
      description: 'Connect with the noble Kaumāra lineage dedicated to Lord Kumāra, also revered as Murugan, Skanda, or Kārtikeya. Exalted in Tamil Sangam literature and the Skanda Purāṇa, Kumāra is the supreme celestial commander representing divine wisdom (Jnāna), eternal youth, courage, and spiritual purity. Seekers invoke His divine spear (Vel) to pierce through spiritual ignorance, master self-discipline, eradicate egoic impurities, and achieve victorious liberation of light over dark forces in cosmic harmony.'
    },
    {
      src: '/Smartha.png',
      title: 'Smārta',
      link: '/library',
      description: 'Embrace the comprehensive Smārta tradition synthesized by Ādi Śankarācārya, advocating a non-sectarian, balanced Pañcāyatana approach to divine worship. Grounded in Vedic Sruti, Smriti, and Advaita Vedānta philosophy, this lineage recognizes that the singular Supreme Consciousness (Brahman) manifests harmoniously through five personal deities—Śiva, Viṣṇu, Devī, Sūrya, and Gaṇeśa. Guided by self-inquiry (Jñāna Yoga) and scriptural contemplation, seekers transcend external boundaries to realize the non-dual unity of the Self (Ātman) with the cosmos.'
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