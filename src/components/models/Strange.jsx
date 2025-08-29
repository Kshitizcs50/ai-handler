
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export function Strange(props) {
  const { nodes, materials } = useGLTF('/models/strange-transformed.glb')
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
        geometry={nodes.Object_482.geometry}
        material={materials.material_0}
        skeleton={nodes.Object_482.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <skinnedMesh
        geometry={nodes.Object_483.geometry}
        material={materials.material_1}
        skeleton={nodes.Object_483.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <skinnedMesh
        geometry={nodes.Object_484.geometry}
        material={materials.material_2}
        skeleton={nodes.Object_484.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <skinnedMesh
        geometry={nodes.Object_485.geometry}
        material={materials.material_3}
        skeleton={nodes.Object_485.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <skinnedMesh
        geometry={nodes.Object_486.geometry}
        material={materials.material_4}
        skeleton={nodes.Object_486.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <skinnedMesh
        geometry={nodes.Object_487.geometry}
        material={materials.material_5}
        skeleton={nodes.Object_487.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <skinnedMesh
        geometry={nodes.Object_488.geometry}
        material={materials.material_6}
        skeleton={nodes.Object_488.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <skinnedMesh
        geometry={nodes.Object_489.geometry}
        material={materials.material_7}
        skeleton={nodes.Object_489.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <skinnedMesh
        geometry={nodes.Object_490.geometry}
        material={materials.material_8}
        skeleton={nodes.Object_490.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <skinnedMesh
        geometry={nodes.Object_491.geometry}
        material={materials.material_9}
        skeleton={nodes.Object_491.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <skinnedMesh
        geometry={nodes.Object_492.geometry}
        material={materials.material_10}
        skeleton={nodes.Object_492.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
    </group>
  )
}

useGLTF.preload('/models/strange-transformed.glb')