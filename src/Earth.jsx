import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';

const Earth = () => {
  const { scene } = useGLTF('/galaxy.glb');
  const earthRef = useRef();

  useFrame((state, delta) => {
    if (earthRef.current) {
      // Rotate around Y-axis (spinning)
      earthRef.current.rotation.y += (2 * Math.PI / 1800) * delta;
      // Add slight rotation around X and Z for more dynamic movement
      earthRef.current.rotation.x = Math.sin(state.clock.elapsedTime / 4) * 0.1;
      earthRef.current.rotation.z = Math.cos(state.clock.elapsedTime / 4) * 0.1;
    }
  });

  // Set color to white
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set('#ffffff');
        }
      });
    }
  }, [scene]);

  return (
      <primitive 
        ref={earthRef}
        object={scene} 
        scale={30}
        position={[30, -20, 0]}
      />
  );
};

export default Earth;
