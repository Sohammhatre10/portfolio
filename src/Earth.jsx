import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

const Earth = () => {
  const { scene } = useGLTF('/galaxy.glb');
  const earthRef = useRef();

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += (2 * Math.PI / 1800) * delta;
    }
  });

  return (
    <primitive 
      ref={earthRef}
      object={scene} 
      scale={30}
      position={[110, -60, 0]}
    />
  );
};

export default Earth;
