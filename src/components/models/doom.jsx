"use client";
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/doom-transformed.glb')
   const modelRef = useRef();
    useFrame((state) => {
        if (modelRef.current) {
          modelRef.current.rotation.y = state.clock.elapsedTime*0.3; // Rotates on Y-axis
        }
      });
  return (
    <group {...props} ref={modelRef} scale={[1.69, 1.69, 1.69]} rotation={[0.60, 1.50, 0]} position={[0,- 0.7, 0]} dispose={null}>
      <primitive object={nodes._rootJoint} />
      <skinnedMesh
        name="Object_610"
        geometry={nodes.Object_610.geometry}
        material={materials.MI_DoctorDoom2099_Body06}
        skeleton={nodes.Object_610.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <skinnedMesh
        name="Object_611"
        geometry={nodes.Object_611.geometry}
        material={materials.MI_DoctorDoom2099_Body05}
        skeleton={nodes.Object_611.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <skinnedMesh
        name="Object_612"
        geometry={nodes.Object_612.geometry}
        material={materials.MI_DoctorDoom2099_Body02}
        skeleton={nodes.Object_612.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <skinnedMesh
        name="Object_613"
        geometry={nodes.Object_613.geometry}
        material={materials.MI_DoctorDoom2099_Body03}
        skeleton={nodes.Object_613.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <skinnedMesh
        name="Object_614"
        geometry={nodes.Object_614.geometry}
        material={materials.MI_DoctorDoom2099_Body01}
        skeleton={nodes.Object_614.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <skinnedMesh
        name="Object_615"
        geometry={nodes.Object_615.geometry}
        material={materials.MI_DoctorDoom2099_Cape}
        skeleton={nodes.Object_615.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <skinnedMesh
        name="Object_616"
        geometry={nodes.Object_616.geometry}
        material={materials.MI_DoctorDoom2099_Body04}
        skeleton={nodes.Object_616.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/doom-transformed.glb')