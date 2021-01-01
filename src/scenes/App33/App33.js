import React, {useEffect, useMemo, useState, useRef, Suspense} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls, Stats, useGLTF } from 'drei';
import Loading from '../../components/Loading';

import Map from '../../drei-espinaco/Map';
import MapPhysics from '../../drei-espinaco/map-creator/physics/MapPhysics';
import useFullmapGallery from '../../drei-espinaco/map-creator/fullmaps/useFullmapGallery';

import { Physics } from 'use-cannon';
import Ground from '../../the-gallery/components/Ground/Ground';
import Player from '../../the-gallery/components/Player/Player';
import Joystick from '../../drei-espinaco/Joystick';
import FullScreen from '../../drei-espinaco/Fullscreen';

// import Vehicle from '../../drei-espinaco/Vehicle';

// import Wall from '../../the-gallery/components/Wall/Wall.js';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import {InstancedMesh, InstancedMeshPhysics, InstancedMeshes, InstancedFBX, InstancedGLTF, InstancedGLTFPhysics, InstancedPhysics} from '../../drei-espinaco/instancedMesh/';
// import Lights from '../../the-gallery/components/Lights/Lights';

function Lights() {
    return(
        <>
        <ambientLight intensity={0.07} />
        {/* <directionalLight
                position={[29, 50, -60]}
                intensity={0.2}
                color="skyblue"            
        /> */}
        <pointLight />
        </>
    )
}

function Cesped({}) {

    const grassMap = useMemo(() => new THREE.TextureLoader().load("assets/Textures/Grass/GrassGreenTexture0002.jpg"), []);
    grassMap.wrapS = THREE.RepeatWrapping;
    grassMap.wrapT = THREE.RepeatWrapping;
    grassMap.repeat.set(70, 70);

    return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, -150]} visible={true} >
                <planeBufferGeometry attach="geometry" args={[500, 500]} />
                <meshLambertMaterial attach="material">
                    <primitive attach="map" object={grassMap} />
                </meshLambertMaterial>
    </mesh>
    );
}

function Wall({
    scale,
    position,
    rotation,
    modelUrl,
    mapUrl,
    normalMapUrl 
}) {
    const objects=[
        {
            position:position,
            scale:scale,
            propsPhysics: [
                {
                    // mass: 1,
                    args:[1,50,107],
                    position:[position[0] + 71, position[1], position[2] + 53]
                },
                {
                    // mass: 1,
                    args:[1,50,107],
                    position:[position[0] - 71, position[1], position[2] + 53]
                },
                {
                    // mass: 1,
                    args:[140,50,1],
                    position:[position[0], position[1], position[2] + 110 ]
                },
                {
                    // mass: 1,
                    args:[45,50,1],
                    position:[position[0] + 46, position[1], position[2] ]
                },
                {
                    // mass: 1,
                    args:[45,50,1],
                    position:[position[0] - 46, position[1], position[2] ]
                },
                {
                    // mass: 1,
                    args:[4,50,1],
                    position:[position[0], position[1], position[2] ]
                },
            ]
        }
    ];

    const size = 20;
    const texture = useMemo(() => new THREE.TextureLoader().load(mapUrl), [mapUrl]);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(size, size);

    const normal = useMemo(() => new THREE.TextureLoader().load(normalMapUrl), [normalMapUrl]);
    normal.wrapS = THREE.RepeatWrapping;
    normal.wrapT = THREE.RepeatWrapping;
    normal.repeat.set(size, size);

    const { scene } = useGLTF(modelUrl);
    scene.traverse( function ( child ) {
        if ( child.isMesh ) {
            // child.castShadow = true;
            // child.receiveShadow = true;
            child.material = new THREE.MeshPhongMaterial();
            child.material.side = THREE.DoubleSide;
            child.material.normalMap = normal;
            child.material.map = texture;
            // child.material.metalness = 0;
            // child.material.roughness = 1;
        }
    });

    return (
        <>
        <InstancedPhysics objects={objects} visible={false} />
        <primitive                   
                    position={position}
                    scale={scale}
                    object={scene}
                    dispose={null}
                /> 
        </>
    );
}

export function Scene() {

    return(
        <>
        <Lights />
        <Physics gravity={[0, -30, 0]}>
          <Wall 
            position={[0, 0, -13.5]}
            scale={[2,1,2]}
            modelUrl={"assets/3D/Wall/scene.gltf"}
            mapUrl={"assets/3D/Wall/Textures/White_Wall.jpg"}
            normalMapUrl={"assets/3D/Wall/Textures/White_Wall_NORMAL.jpg"}
          />
          <GroundPhysic /> 
          <Player />       
        </Physics>
        <Cesped />
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App33(props) {

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