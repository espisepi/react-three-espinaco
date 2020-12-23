// https://3dtextures.me/
// https://threejsfundamentals.org/threejs/lessons/threejs-textures.html

import React, { Suspense, useMemo, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, Reflector, Sky, Stats } from 'drei';
import Loading from '../../components/Loading';

import {InstancedMesh, InstancedMeshPhysics, InstancedMeshes, InstancedFBX, InstancedGLTF, InstancedGLTFPhysics, InstancedPhysics} from '../../drei-espinaco/instancedMesh/';
import { createMapsPoints, createMapPoints, transformPointsToObjects } from '../../drei-espinaco/points-creator/';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import Ocean from '../../drei-espinaco/Ocean';

import {useBox} from 'use-cannon';

function Horse() {
    const objects = [];
    for(let i = 1; i< 10; i++){
        objects.push(
            {
                position:[i*100,0,0],
                scale:[1,1,1],
                propsPhysics: [{
                    mass: 1,
                    position:[i*100,100,0],
                    args:[100,200,100]
                }]
            }
        )
    }
    // return null;
    return <InstancedGLTFPhysics src='assets/obj/Horse.glb' objects={objects} createObjectsModBoolean={true} visible={true} />
}

function BreakWall() {
    const geometry = new THREE.BoxBufferGeometry(1,1,1);
    const [map, normalMap] = useLoader(THREE.TextureLoader, [
        'assets/3D/Wall/Textures/White_Wall.jpg',
        'assets/3D/Wall/Textures/White_Wall_NORMAL.jpg'
    ]);
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(10, 10);
    const material = new THREE.MeshStandardMaterial({color:'white', map:map, normalMap:normalMap });
    const objects = [
        {
            position:[-15,0,0],
            scale:[1,25,50],
            propsPhysics: [
                {
                    args: [1,25,50]
                }
            ]
        }
    ];
    const scale = [5,2,1];
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            objects.push({
                position:[j * 5+0.2,i*2+1.0,0],
                scale: scale,
                propsPhysics: [
                    {
                        mass: 1,
                        args: scale
                    }
                ]
            });
        }
    }
    return <InstancedMeshPhysics geometry={geometry} material={material} objects={objects} createObjectsModBoolean={true} visible={false} />;
}

function Gallery() {
    const position = [-100,0,-100];
    const objects=[
        {
            position:position,
            scale:[6,6,6],
            propsPhysics: [
                {
                    // mass: 1,
                    args:[1,100,200],
                    position:[position[0], position[1], position[2]]
                },
                {
                    // mass: 1,
                    args:[1,100,200],
                    position:[position[0] + 55, position[1], position[2]]
                },
                {
                    // mass: 1,
                    args:[1,100,200],
                    position:[position[0] - 55, position[1], position[2]]
                },
            ]
        }
    ];
    return (
    <>
        <InstancedGLTF src='assets/obj/gallery_chapel_baked/scene.gltf' objects={objects} />
        <InstancedPhysics objects={objects} visible={true} />
    </>
    );
}

export function Scene() {
    return(
        <>
        <Ocean geometry={new THREE.PlaneBufferGeometry( 500, 500, 1, 1 )} position={[0,1,0]} rotation={[Math.PI/2,0,0]} />
        <Physics>
        <Suspense fallback={<Loading />}>
            {/* <Horse /> */}
            <BreakWall />
            {/* <Gallery /> */}
            <Player mass={200.0}/>
            <GroundPhysic />
        </Suspense>
        </Physics>
        </>
    );
}

export default function App24(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Stats />
        <ambientLight intensity={0.4}/>
        <pointLight intensity={0.5} position={[1000,10,0]}/>
        <Sky
            distance={450000} // Camera distance (default=450000)
            
            inclination={0.65} // Sun elevation angle from 0 to 1 (default=0)
            azimuth={0.50} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
            {...props} // All three/examples/jsm/objects/Sky props are valid
        />
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
        {/* <OrbitControls /> */}
    </Canvas>
    <Joystick />
    </>
    );
}