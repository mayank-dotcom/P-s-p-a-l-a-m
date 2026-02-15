'use client';

import { useRef, useState, useEffect } from 'react';
import NavBar from '@/app/components/Navbar';
import SpiralMenu from '@/app/components/SpiralMenu';
import ChakraViewer from '@/app/components/ChakraViewer';

export default function VishnuLibPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current && !hasInteracted) {
        videoRef.current.muted = false;
        setHasInteracted(true);
      }
    };

    // Listen to multiple interaction events
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('scroll', handleInteraction);
    document.addEventListener('mousemove', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('mousemove', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted]);

  return (
    <>
    <NavBar />
    <SpiralMenu />
    <ChakraViewer />
    <div 
      className="relative w-full min-h-screen overflow-y-auto"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Full-page video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto min-h-screen object-cover"
      >
        <source src="/FINAL_VISHNU.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    </>
  );
}