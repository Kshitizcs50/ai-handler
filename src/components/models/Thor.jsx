import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
export function Thor(props) {
  const { nodes, materials } = useGLTF('/models/thor-transformed.glb')
   const modelRef = useRef();
          useFrame((state) => {
              if (modelRef.current) {
                modelRef.current.rotation.y = state.clock.elapsedTime*0.3; // Rotates on Y-axis
              }
            });
      return (
         <group {...props} ref={modelRef} scale={[1.69, 1.99, 1.89]} rotation={[0.60, 1.50, 0]} position={[0,- 1.7, 0]} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.MFF_iOS_HER_TOD_AVE_B}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_3.geometry}
        material={materials.MFF_iOS_HER_TOD_AVE_W}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/thor-transformed.glb')