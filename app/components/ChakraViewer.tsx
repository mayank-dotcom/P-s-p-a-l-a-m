'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function ChakraModel() {
  const { scene } = useGLTF('/chakra.glb');
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spinning, setSpinning] = useState<{ active: boolean; direction: number; duration: number }>({
    active: false,
    direction: 1,
    duration: 0
  });

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W') {
        setSpinning({ active: true, direction: 1, duration: 1 });
      } else if (e.key === 's' || e.key === 'S') {
        setSpinning({ active: true, direction: -1, duration: 1 });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Animation frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Handle spinning animation
      if (spinning.active) {
        // Fast spin along X-axis
        meshRef.current.rotation.x += spinning.direction * delta * 2; // 8 rad/sec for fast spin
        
        // Update duration
        setSpinning(prev => {
          const newDuration = prev.duration - delta;
          if (newDuration <= 0) {
            return { active: false, direction: 1, duration: 0 };
          }
          return { ...prev, duration: newDuration };
        });
      } else {
        // Smooth tilt animation on hover
        const targetRotationX = hovered ? mousePos.y * 0.15 : 0;
        const targetRotationY = hovered ? Math.PI / 0.5 + mousePos.x * 0.15 : Math.PI / 0.5;
        
        // Smooth interpolation
        meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.1;
        meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
      }
    }
  });

  const handlePointerMove = (event: any) => {
    // Normalize mouse position to -1 to 1 range
    const x = (event.point.x / 3) * 2;
    const y = (event.point.y / 3) * 2;
    setMousePos({ x, y });
  };
  
  return (
    <group
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <primitive 
        object={scene} 
        scale={0.25}
        position={[0, 0, 0]}
      />
    </group>
  );
}

export default function ChakraViewer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start fade-in animation at 7 seconds (5s navbar + 2s delay)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="absolute top-4.5 left-0 right-0 h-[690px] z-10 transition-opacity duration-1000" 
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <Canvas
        camera={{ 
          position: [3, 0, 0], // Camera positioned on the left side
          fov: 50,
        }}
        gl={{ 
          alpha: true, // Enable transparency
          antialias: true 
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[55, 5, 7]} intensity={1} />
          <directionalLight position={[-5, -45, -5]} intensity={15} />
          <ChakraModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/chakra.glb');