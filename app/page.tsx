'use client';

import { useEffect, useState, useRef } from 'react';
import ImageGrid from './components/ImageGrid';
import Navbar from './components/Navbar';
import TextMorph from './components/TextMorph';
import { Volume2, VolumeX } from 'lucide-react';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/sitar_final.mp3');
    audioRef.current = audio;

    // Preload the audio
    audio.load();

    // Loop functionality - when song ends, restart from 5 seconds
    const handleEnded = () => {
      audio.currentTime = 5;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Loop playback failed:', err);
      });
    };

    audio.addEventListener('ended', handleEnded);

    // Try to start on any VALID user interaction (click, touch, keyboard)
    const startOnInteraction = (e: Event) => {
      if (hasStartedRef.current) return;
      
      hasStartedRef.current = true;
      
      const playFromTimestamp = () => {
        audio.currentTime = 5;
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error('Playback failed:', err);
          hasStartedRef.current = false;
        });
      };

      if (audio.readyState >= 1) {
        playFromTimestamp();
      } else {
        audio.addEventListener('loadedmetadata', playFromTimestamp, { once: true });
      }

      // Remove listeners after first play
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('touchstart', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
    };

    // Only listen for click, touch, and keyboard - these are valid interactions
    document.addEventListener('click', startOnInteraction);
    document.addEventListener('touchstart', startOnInteraction);
    document.addEventListener('keydown', startOnInteraction);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('ended', handleEnded);
      cleanup();
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback failed:', err);
      });
    }
  };

  // Handle hover on segments - start audio if not already playing
  const handleSegmentHover = () => {
    if (hasStartedRef.current) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    hasStartedRef.current = true;
    
    const playFromTimestamp = () => {
      audio.currentTime = 5;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Hover playback failed:', err);
        hasStartedRef.current = false;
      });
    };

    if (audio.readyState >= 1) {
      playFromTimestamp();
    } else {
      audio.addEventListener('loadedmetadata', playFromTimestamp, { once: true });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Small speaker button - always visible */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-4 right-4 p-2 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-full transition-all z-50"
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-zinc-400" />
        ) : (
          <VolumeX className="w-4 h-4 text-zinc-400" />
        )}
      </button>

      <Navbar />
      <TextMorph />
      <ImageGrid onSegmentHover={handleSegmentHover} />
    </div>
  );
}