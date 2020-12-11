import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { draco, OrbitControls, Stats } from 'drei';
import Loading from '../../components/Loading';
import InstancedMesh from '../../drei-espinaco/InstancedMesh';

export function Scene() {

    const modelUrl="assets/3D/WindowNoGlassR/scene.gltf";
    const mapUrl="assets/3D/WindowNoGlassR/Textures/Material_49_baseColor.png";
    const { scene } = useLoader(GLTFLoader, modelUrl, draco("https://www.gstatic.com/draco/versioned/decoders/1.4.0/"));
    const map = useMemo(() => new THREE.TextureLoader().load(mapUrl), [mapUrl]);
    map.flipY=false;

    const { geometry, material } = useMemo(() => {
      let geometry;
      let material;
      scene.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.material = new THREE.MeshStandardMaterial();
            child.material.metalness = 0.9;
            child.material.roughness = 0.9;
            child.material.map = map;
            geometry = child.geometry;
            material = child.material;
        }
      });
      return { geometry, material };
    },[scene]);

    const scale = [ 0.008, 0.008, 0.008 ];
    const rotation = [0, Math.PI / 3, 0];
    const windowFrameObjects = [
        {position: [27, 0, 0], scale: scale, rotation: rotation},
        {position: [5, 0, 0], scale: scale, rotation: rotation},
        {position: [10, 0, 0], scale: scale, rotation: rotation}
      ];

    return(
        <>
        <InstancedMesh geometry={geometry} material={material} objects={windowFrameObjects} />
        <ambientLight />
        <pointLight />
        <OrbitControls />
        </>
    );
}

export default function AppDirty(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Stats />
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
    </Canvas>
    );
}