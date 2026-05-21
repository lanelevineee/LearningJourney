import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei'

function AnimatedSphere({ position, color, speed, distort }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * speed
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={1.5}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function AnimatedBox({ position, color, speed }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.2
    }
  })
  
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={0.8}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={3}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
    </Float>
  )
}

function AnimatedTorus({ position, color, speed }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.6
    }
  })
  
  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.8}>
      <Torus ref={meshRef} args={[0.8, 0.3, 32, 64]} position={position} scale={1}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2.5}
          roughness={0.25}
          metalness={0.75}
        />
      </Torus>
    </Float>
  )
}

function BackgroundParticles() {
  const particles = []
  for (let i = 0; i < 50; i++) {
    particles.push(
      <Sphere
        key={i}
        args={[0.05, 16, 16]}
        position={[
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20 - 10
        ]}
      >
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </Sphere>
    )
  }
  return <>{particles}</>
}

export default function Scene3D() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Main floating shapes */}
        <AnimatedSphere position={[-5, 3, -5]} color="#667eea" speed={0.3} distort={0.5} />
        <AnimatedSphere position={[5, -2, -8]} color="#764ba2" speed={0.4} distort={0.4} />
        <AnimatedBox position={[6, 4, -6]} color="#a8b5ff" speed={0.5} />
        <AnimatedBox position={[-6, -3, -7]} color="#c4b5fd" speed={0.4} />
        <AnimatedTorus position={[0, 5, -9]} color="#8b7fd4" speed={0.35} />
        <AnimatedTorus position={[-4, -4, -10]} color="#9d8df1" speed={0.45} />
        
        {/* Background particles */}
        <BackgroundParticles />
      </Canvas>
    </div>
  )
}
