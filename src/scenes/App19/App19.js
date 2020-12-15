import React, {useEffect, useMemo, useState, useRef, Suspense} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls, Stats } from 'drei';
import Loading from '../../components/Loading';

import Map from '../../drei-espinaco/Map';
import MapPhysics from '../../drei-espinaco/map-creator/physics/MapPhysics';
import useFullmapGallery from '../../drei-espinaco/map-creator/fullmaps/useFullmapGallery';

import { Physics } from 'use-cannon';
import Ground from '../../the-gallery/components/Ground/Ground';
import Player from '../../the-gallery/components/Player/Player';
import Joystick from '../../drei-espinaco/Joystick';
import FullScreen from '../../drei-espinaco/Fullscreen';

import Vehicle from '../../drei-espinaco/Vehicle';

import Wall from '../../the-gallery/components/Wall/Wall.js';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';
import InstancedMesh from '../../drei-espinaco/InstancedMesh';
// import Lights from '../../the-gallery/components/Lights/Lights';

function Lights() {
    return(
        <>
        <ambientLight intensity={0.07} />
        <directionalLight
                position={[29, 50, -60]}
                intensity={0.2}
                color="skyblue"            
        />
        <pointLight />
        </>
    )
}

function Cubes() {
    const ref = useRef();
    const geometry = new THREE.BoxBufferGeometry(5,5,5);
    const material = new THREE.MeshBasicMaterial({color:'green', wireframe: true});
    const objects = [
        {
            position:[0,0,0]
        },
        {
            position:[7,0,0]
        },
    ];

    
    return <InstancedMesh geometry={geometry} material={material} objects={objects} />;
}

export function Scene() {

    return(
        <>
        <Lights />
        <Physics gravity={[0, -30, 0]}>
          <Cubes />
          <Wall 
            position={[0, 0, -13.5]}
            modelUrl={"assets/3D/Wall/scene.gltf"}
            mapUrl={"assets/3D/Wall/Textures/White_Wall.jpg"}
            normalMapUrl={"assets/3D/Wall/Textures/White_Wall_NORMAL.jpg"}
          />
          <Ground /> 
          <Player />       
        </Physics>
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App19(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}
        onCreated={({ gl }) => { 
        gl.shadowMap.enabled = true
        gl.shadowMap.type = THREE.PCFSoftShadowMap
    }}>
        <Stats />
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
    </Canvas>
    <Joystick />
    </>
    );
}