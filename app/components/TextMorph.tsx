'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function TextMorph() {
  const [displayText, setDisplayText] = useState<string>('Saṃgraha');
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const finalText = 'Saṃgraha';

  // Indian language character sets
  const languageChars = [
    'अआइईउऊएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह', // Devanagari
    'অআইঈউঊএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ', // Bengali
    'అఆఇఈఉఊఋఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరలవశషసహ', // Telugu
    'அஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரலவழளறன', // Tamil
    'അആഇഈഉഊഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതథദധനപഫബഭമയരലവശഷസഹ', // Malayalam
    'ಅಆಇಈಉಊಋಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಲವಶಷಸಹ', // Kannada
    'અઆઇઈઉઊએઐઓઔકખગઘઙચછજઝઞટઠડઢણતથદધનપફબભમયરલવશષસહ', // Gujarati
  ];

  const allChars = languageChars.join('');

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startDecryption();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated]);

  const startDecryption = () => {
    let iteration = 0;
    const maxIterations = 30;
    const speed = 100;

    const interval = setInterval(() => {
      setDisplayText(prev => {
        return finalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';

            // All characters decrypt simultaneously with increasing probability
            if (Math.random() < iteration / maxIterations) {
              return finalText[index];
            }

            // Scramble unrevealed characters with Indian language chars
            return allChars[Math.floor(Math.random() * allChars.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(finalText);
      }
    }, speed);
  };

  return (
    <div
      ref={containerRef}
      className="absolute top-32 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center gap-2"
      >
        {/* Logo */}
        <motion.img
          src="/logo.png"
          alt="Logo"
          className="w-24 h-24 md:w-32 md:h-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.6))',
          }}
        />

        {/* Main morphing text */}
        <h1
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
          style={{
            fontFamily: 'serif',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
            filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.8)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.9))',
          }}
        >
          {displayText}
        </h1>

        {/* Subtitle description in matching gradient */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm md:text-base max-w-md md:max-w-lg text-center font-medium tracking-wide bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mt-1 px-4"
          style={{
            filter: 'drop-shadow(0 2px 10px rgba(168, 85, 247, 0.5)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.9))',
          }}
        >
          A digital sanctuary preserving sacred Sanskrit scriptures, authentic Vedic recitations, and eternal Sanātana philosophical wisdom.
        </motion.p>

        {/* Glow effect */}
        <div
          className="absolute inset-0 text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent blur-2xl opacity-60 -z-10"
          aria-hidden="true"
        >
          {displayText}
        </div>
      </motion.div>
    </div>
  );
}

