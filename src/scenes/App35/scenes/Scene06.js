import React, {useEffect, useMemo} from 'react';
import { useFrame, useThree } from 'react-three-fiber';

import { useGLTF, PositionalAudio } from 'drei';

import * as THREE from 'three';
import Ocean from '../../../drei-espinaco/Ocean';

function CharlesScene() {

    const gltf = useGLTF('assets/obj/charlesScene.glb');

    const sphere = useMemo(()=>{
        return gltf.scene.children[1];
    },[]);

    useFrame((state, dt)=>{
         sphere.rotation.y -= dt * 0.05;
         const t = state.clock.getElapsedTime();
         sphere.position.y = (1 + Math.sin(t / 1.5)) / 10
    })

    return <primitive object={gltf.scene} />;
    
}

export default function Scene06() {

    const {scene} = useThree();
    useEffect(()=>{
        scene.background = null;
    },[]);

    return(
        <>
        <ambientLight intensity={0.15} />
        <directionalLight intensity={0.7} position={[0,500,500]} />
        <directionalLight intensity={0.7} position={[0,500,-500]} />
        <group scale={[100,100,100]} position={[0,0,-300]}>
            <CharlesScene />
        </group>
        <Ocean geometry={new THREE.PlaneBufferGeometry( 3000, 3000, 1, 1 )} position={[0,-10,0]} rotation={[Math.PI/2,0,0]} />
        <mesh name="meshPositionalAudio2" position={[0,5,-280]} visible={false}>
            <boxBufferGeometry args={[1,1,1]} />
            <meshBasicMaterial color='green' wireframe={true} />
            <PositionalAudio url='assets/sounds/waterbird.mp3' distance={15} />
        </mesh>
        </>
    );
}