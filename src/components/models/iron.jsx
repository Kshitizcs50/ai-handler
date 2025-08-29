
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
export function Iron(props) {
  const { nodes, materials } = useGLTF('/models/iron-transformed.glb')
     const modelRef = useRef();
        useFrame((state) => {
            if (modelRef.current) {
              modelRef.current.rotation.y = state.clock.elapsedTime*0.3; // Rotates on Y-axis
            }
          });
    return (
       <group {...props} ref={modelRef} scale={[0.69, 0.59, 0.59]} rotation={[0.60, 1.50, 0]} position={[0,- 1.7, 0]} dispose={null}>
      <mesh
        name="M-COC_iOS_HERO_Tony_Stark_Iron_Man_Mark_VII_COC_iOS_HER_TST_VII_B001_0"
        castShadow
        receiveShadow
        geometry={
          nodes['M-COC_iOS_HERO_Tony_Stark_Iron_Man_Mark_VII_COC_iOS_HER_TST_VII_B001_0'].geometry
        }
        material={materials['COC_iOS_HER_TST_VII_B.001']}
        scale={3.434}
      />
      <mesh
        name="M-COC_iOS_HERO_Tony_Stark_Iron_Man_Mark_VII_Material001_0"
        castShadow
        receiveShadow
        geometry={nodes['M-COC_iOS_HERO_Tony_Stark_Iron_Man_Mark_VII_Material001_0'].geometry}
        material={materials['Material.001']}
        scale={3.434}
      />
    </group>
  )
}

useGLTF.preload('/models/iron-transformed.glb')