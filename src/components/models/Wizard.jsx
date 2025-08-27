"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/wizard-transformed.glb')
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.elapsedTime*0.6; // Rotates on Y-axis
    }
  });
  
  return (
    <group {...props} dispose={null}
    ref={modelRef}
    position={[0,0.25,0]}
    scale={[0.02,0.02,0.02]}
    rotation={[0, -0.50, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.TT_checker_4096x4096_UV_GRID}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  )
}

useGLTF.preload('/models/wizard-transformed.glb')