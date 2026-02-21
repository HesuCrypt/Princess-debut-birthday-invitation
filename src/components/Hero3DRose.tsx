import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars, Sparkles, Center } from '@react-three/drei';
import * as THREE from 'three';

function Petal({ position, rotation, scale, color, index, total }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  // Store initial rotation to animate relative to it
  const initialRotationX = rotation[0];

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      
      // Gentle blooming animation
      // Outer petals (higher index) move more than inner ones
      const nIndex = index / (total || 1);
      
      // Initial Bloom Effect: Start closed and open up over time
      // Use a smoothstep-like curve for the initial opening
      const bloomDuration = 4; // Seconds to fully bloom
      const bloomProgress = Math.min(Math.max((t - 0.5) / bloomDuration, 0), 1);
      const easeBloom = 1 - Math.pow(1 - bloomProgress, 3); // Cubic ease out
      
      // Breathing motion (only after blooming starts)
      const breathing = Math.sin(t * 0.3 + nIndex * 2) * 0.05 * easeBloom;
      
      // Base rotation (Closed state -> Open state)
      // When t=0 (easeBloom=0), we want the petals to be more closed (higher X rotation)
      // When t=end (easeBloom=1), we want them to be at their natural position
      const closedOffset = 1.5 * (1 - nIndex); // Inner petals are more closed
      const currentBaseRotation = initialRotationX + (closedOffset * (1 - easeBloom));

      // Apply rotation
      meshRef.current.rotation.x = currentBaseRotation - breathing;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
      <MeshDistortMaterial
        color={color}
        emissive="#550000"
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.3}
        distort={0.2}
        speed={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ProceduralRose(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  const petals = useMemo(() => {
    const items = [];
    // Inner bud
    items.push({ position: [0, 0, 0], rotation: [Math.PI / 2, 0, 0], scale: 0.4, color: "#5C0011" });
    items.push({ position: [0, 0.1, 0], rotation: [Math.PI / 2 + 0.2, 0, 1], scale: 0.45, color: "#7B0000" });
    items.push({ position: [0, 0.1, 0], rotation: [Math.PI / 2 - 0.2, 0, 2], scale: 0.45, color: "#7B0000" });

    // Middle layers
    for (let i = 0; i < 5; i++) {
      items.push({
        position: [Math.sin(i * 1.2) * 0.2, Math.cos(i * 1.2) * 0.1, Math.cos(i * 1.2) * 0.2],
        rotation: [Math.PI / 2 + 0.3, 0, (i / 5) * Math.PI * 2],
        scale: 0.6,
        color: "#8B0000"
      });
    }

    // Outer layers
    for (let i = 0; i < 8; i++) {
      items.push({
        position: [Math.sin(i * 0.8) * 0.4, Math.cos(i * 0.8) * 0.2 - 0.2, Math.cos(i * 0.8) * 0.4],
        rotation: [Math.PI / 2 + 0.6, 0, (i / 8) * Math.PI * 2],
        scale: 0.8,
        color: "#7B0000"
      });
    }
    
    return items;
  }, []);

  return (
    <group {...props}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={groupRef}>
          <Center>
            {petals.map((p, i) => (
              <Petal key={i} {...p} index={i} total={petals.length} />
            ))}
            {/* Stem/Base */}
             <mesh position={[0, -1, 0]} rotation={[0,0,0]}>
                <cylinderGeometry args={[0.05, 0.1, 1.5, 8]} />
                <meshStandardMaterial color="#1a3300" roughness={0.8} />
             </mesh>
          </Center>
        </group>
      </Float>
      
      {/* Floating Petals */}
      <FloatingPetals />
    </group>
  );
}

function FloatingPetals() {
  const count = 40;
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 15,
        z: (Math.random() - 0.5) * 10,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.15 + 0.05
      });
    }
    return pos;
  }, []);

  return (
    <group>
      {positions.map((props, i) => (
        <FloatingPetal key={i} {...props} />
      ))}
    </group>
  );
}

function FloatingPetal({ x, y, z, rotation, scale }: any) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y -= 0.01;
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.005;
      
      if (ref.current.position.y < -8) {
        ref.current.position.y = 8;
      }
    }
  });

  return (
    <mesh ref={ref} position={[x, y, z]} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color="#8B0000" 
        side={THREE.DoubleSide} 
        transparent 
        opacity={0.6} 
        roughness={0.5}
      />
    </mesh>
  );
}

export default function Hero3DRose() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <spotLight position={[5, 5, 5]} angle={0.25} penumbra={1} intensity={4} color="#D4AF37" castShadow />
      <pointLight position={[-5, -5, -5]} intensity={2} color="#8B0000" />
      <directionalLight position={[0, 10, 0]} intensity={1.5} color="#fff" />
      <pointLight position={[5, -5, -5]} intensity={1} color="#ffcccc" />
      
      <ProceduralRose position={[0, 0, 0]} />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <Sparkles count={150} scale={12} size={3} speed={0.2} opacity={0.4} color="#D4AF37" />
    </>
  );
}
