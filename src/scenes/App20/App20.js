import React, {useEffect, useMemo, useState, useRef, Suspense} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
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

import PictureLow from '../../the-gallery/components/Picture/PictureLow';
import Display from '../../the-gallery/components/Display/Display';

function Lights() {
    return(
        <>
        <ambientLight intensity={1.5} />
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

function createPointsRecursive(numPoints=50, initialPoint=[0,0,0], spaceBetween=[10,0,0]) {
    const pointsList = [];
    for(let i = 0; i < numPoints; i++) {
        pointsList.push([
            initialPoint[0] + i * spaceBetween[0],
            initialPoint[1] + i * spaceBetween[1],
            initialPoint[2] + i * spaceBetween[2]
        ]);
    }
    return pointsList;
}

function transformPointsToObjects(pointsList=[], rotation=[0,0,0], scale=[1,1,1]) {
    const objects = [];
    pointsList.forEach((point) => {
        objects.push({
            position: point,
            rotation: rotation,
            scale: scale
        })
    });
    return objects;
}

function Art() {
    const objects = useMemo(()=>{

        const pointsList = createPointsRecursive(50);
        const objects = transformPointsToObjects(pointsList, [0,0,0], [1, 18, 11]);
        
        return objects;
    });


    const map = useLoader(THREE.TextureLoader,'assets/img/jipis/charls/doggy3.jpeg');

    // scale={[12, 6, 1]}

    
    
    return (
    <>
    <mesh scale={[60, 90, 1]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1,1,1000,1000]} />
        <meshStandardMaterial attach="material" map={map} side={THREE.DoubleSide} displacementMap={map} displacementScale={20.5} />
    </mesh>
    {/* <Display position={[20, 5, 0]} size={[1, 18, 11]} objects={displayObjects} /> */}
    <InstancedMesh geometry={new THREE.BoxBufferGeometry(1,1,1)} material={new THREE.MeshBasicMaterial({color:'green', wireframe:true})} objects={objects} /> 
    </>);
}

export function Scene() {

    return(
        <>
        <Lights />
        <Physics gravity={[0, -30, 0]}>
          {/* <Cubes /> */}
          {/* <Wall 
            position={[0, 0, -13.5]}
            modelUrl={"assets/3D/Wall/scene.gltf"}
            mapUrl={"assets/3D/Wall/Textures/White_Wall.jpg"}
            normalMapUrl={"assets/3D/Wall/Textures/White_Wall_NORMAL.jpg"}
          /> */}
          <Art />
          <GroundPhysic />
          <Player />       
        </Physics>
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App20(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}
        onCreated={({ gl }) => { 
        gl.shadowMap.enabled = true
        gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
    >
        <Stats />
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
    </Canvas>
    <Joystick />
    </>
    );
}