
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
export function Thanos(props) {
  const { nodes, materials } = useGLTF('/models/thanos-transformed.glb')
  const modelRef = useRef();
        useFrame((state) => {
            if (modelRef.current) {
              modelRef.current.rotation.y = state.clock.elapsedTime*0.3; // Rotates on Y-axis
            }
          });
    return (
       <group {...props} ref={modelRef} scale={[6.39, 6.39, 6.39]} rotation={[0.60, 1.50, 0]} position={[0,- 1.7, 0]} dispose={null}>
      <primitive object={nodes._rootJoint} />
      <skinnedMesh
        name="Object_6"
        geometry={nodes.Object_6.geometry}
        material={materials.group_0}
        skeleton={nodes.Object_6.skeleton}
        scale={0.0254}
      />
      <skinnedMesh
        name="Object_7"
        geometry={nodes.Object_7.geometry}
        material={materials.group_0}
        skeleton={nodes.Object_7.skeleton}
        scale={0.0254}
      />
      <skinnedMesh
        name="Object_8"
        geometry={nodes.Object_8.geometry}
        material={materials.group_0}
        skeleton={nodes.Object_8.skeleton}
        scale={0.0254}
      />
    </group>
  )
}

useGLTF.preload('/models/thanos-transformed.glb')