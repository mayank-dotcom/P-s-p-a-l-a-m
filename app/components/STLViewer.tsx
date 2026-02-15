'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

function STLModel({ url }: { url: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(
      url,
      (geometry) => {
        // Center the geometry
        geometry.center();
        // Compute bounding box for better scaling
        const positionAttribute = geometry.attributes.position;
        const box = new THREE.Box3().setFromBufferAttribute(
          positionAttribute as THREE.BufferAttribute
        );
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1 / maxDim;
        geometry.scale(scale, scale, scale);
        
        setGeometry(geometry);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading STL:', error);
        setLoading(false);
      }
    );
  }, [url]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Optional: Add subtle rotation
      // meshRef.current.rotation.y += delta * 0.1;
    }
  });

  if (loading) {
    return null;
  }

  if (!geometry) {
    return null;
  }

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#8B7355"
        metalness={0.6}
        roughness={0}
      />
    </mesh>
  );
}

export default function STLViewer({ stlPath }: { stlPath: string }) {
  return (
    <div className="w-full h-screen bg-linear-to-br from-gray-900 to-gray-800">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[0, 0, 10]} intensity={0.5} />
        <STLModel url={stlPath} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}

