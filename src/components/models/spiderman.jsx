
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
export function Spiderman(props) {
  const { nodes, materials } = useGLTF('/models/spiderman-transformed.glb')
   const modelRef = useRef();
      useFrame((state) => {
          if (modelRef.current) {
            modelRef.current.rotation.y = state.clock.elapsedTime*0.3; // Rotates on Y-axis
          }
        });
  return (
     <group {...props} ref={modelRef} scale={[2.39, 2.39, 2.39]} rotation={[0.60, 1.50, 0]} position={[0,- 1.7, 0]} dispose={null}>
      <primitive object={nodes._rootJoint} />
      <skinnedMesh
        name="Object_447"
        geometry={nodes.Object_447.geometry}
        material={materials.MI_Punches_2_005}
        skeleton={nodes.Object_447.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <skinnedMesh
        name="Object_448"
        geometry={nodes.Object_448.geometry}
        material={materials.MI_1036001_Body}
        skeleton={nodes.Object_448.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <skinnedMesh
        name="Object_449"
        geometry={nodes.Object_449.geometry}
        material={materials.MI_1036001_Head}
        skeleton={nodes.Object_449.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <skinnedMesh
        name="Object_450"
        geometry={nodes.Object_450.geometry}
        material={materials.MI_1036001_Equip_02}
        skeleton={nodes.Object_450.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <skinnedMesh
        name="Object_451"
        geometry={nodes.Object_451.geometry}
        material={materials.MI_1036001_Equip}
        skeleton={nodes.Object_451.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/spiderman-transformed.glb')