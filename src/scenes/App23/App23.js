// https://3dtextures.me/
// https://threejsfundamentals.org/threejs/lessons/threejs-textures.html

import React, { Suspense, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { OrbitControls, Stats } from 'drei';
import Loading from '../../components/Loading';

import {InstancedMesh, InstancedMeshes, InstancedFBX, InstancedGLTF} from '../../drei-espinaco/instancedMesh/';
import { createMapsPoints, createMapPoints, transformPointsToObjects } from '../../drei-espinaco/points-creator/';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import {useBox} from 'use-cannon';

function Cesped() {
    const objects = useMemo(()=>{
        const numPoints = 20;
        const initialPoint = [0,-1,0];
        const initialPoint2 = [150,-1,0];
        const spaceBetweenPoint = [6, 0, 0];
        const numGroups = 20;
        const spaceBetweenGroup = [0,0,6];

        const pointsList = createMapsPoints(numPoints, [initialPoint, initialPoint2], spaceBetweenPoint, numGroups, spaceBetweenGroup);
        const objects = transformPointsToObjects(pointsList, [-Math.PI/2,0,0], [6, 6, 6]);
   
        return objects;
    });

    const geometry = useMemo(() => new THREE.PlaneBufferGeometry(1,1,1,1), []);

    const [grassMap, grassDisplacementMap, grassNormalMap] = useLoader(THREE.TextureLoader, [
        'assets/img/jipis/charls/doggy.jpeg',
        'assets/Textures/forrest_ground/forrest_ground_01_disp_1k.jpg',
        'assets/Textures/forrest_ground/forrest_ground_01_nor_1k.jpg'
    ]);
    grassMap.encoding = THREE.sRGBEncoding;
    grassMap.wrapS = THREE.RepeatWrapping;
    const material = useMemo(() => new THREE.MeshPhongMaterial({
                                                  map:grassMap,
                                                  normalMap: grassNormalMap,
                                                  side: THREE.DoubleSide
                                                }), []);

    return <InstancedMesh geometry={geometry} material={material} objects={objects} />;
}

function Horse() {
    const objects = [];
    for(let i = 0; i< 10; i++){
        objects.push({position:[i*100,0,0]})
    }
    return <InstancedGLTF src='assets/obj/Horse.glb' objects={objects} />
}

function createTileMap(initialPoints=[[0,0,0]],size=[1,1], row=5, column=5){
    const numPoints = row;
    const spaceBetweenPoint = [size[0], 0, 0];
    const numGroups = column;
    const spaceBetweenGroup = [0,0,size[1]];

    const pointsList = Array.isArray(initialPoints[0]) ? 
                                        (createMapsPoints(numPoints, initialPoints, spaceBetweenPoint, numGroups, spaceBetweenGroup))
                                        : (createMapPoints(numPoints, initialPoints, spaceBetweenPoint, numGroups, spaceBetweenGroup));
    return pointsList;
}

function Horse2() {
    const objects = useMemo(()=>{
        const pointsList = createTileMap([[0,0,200]],[20,30],5,5);
        const objects = transformPointsToObjects(pointsList, [0,0,0], [0.1, 0.1, 0.1]);
        return objects;
    });
    return <InstancedGLTF src='assets/obj/Horse.glb' objects={objects} />
}

function Horse3() {
    const objects = useMemo(()=>{
        const pointsList = createMapPoints(5, [200,0,200], [20,0,0], 5, [0,20,0]);
        const objects = transformPointsToObjects(pointsList, [0,0,0], [0.1, 0.1, 0.1]);
        return objects;
    });
    return <InstancedGLTF src='assets/obj/Horse.glb' objects={objects} />
}

function Horse4() {
    const objects = useMemo(()=>{
        const pointsList = createMapPoints(5, [200,0,300], [20,0,0], 5, [0,20,20]);
        const objects = transformPointsToObjects(pointsList, [0,0,0], [0.1, 0.1, 0.1]);
        return objects;
    });
    return <InstancedGLTF src='assets/obj/Horse.glb' objects={objects} />
}

function Gallery() {
    const objects=[{position:[0,0,-100],scale:[6,6,6]},{position:[200,0,-100],rotation:[Math.PI,0,0],scale:[6,6,6]}];
    return <InstancedGLTF src='assets/obj/gallery_chapel_baked/scene.gltf' objects={objects} />
}

function InstancedPhysics(){

    const [ref] = useBox(() => ({
        mass:1,
        args: [1,1,1],
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 10, 22],
    }));

    const objects = [
        {
            position: [0,0,0],
        },
        {
            position: [5,0,0],
        }
    ]

    const createObjectsMod = useCallback((state)=>{
      const objectsMod = [
        {
          ids: [0],
          object: {
            position: [ref.current.position.x,ref.current.position.y,ref.current.position.z],
            rotation: [ref.current.rotation.x,ref.current.rotation.y,ref.current.rotation.z]
          }
        }
      ];
      return objectsMod;
    });


    return (
    <>
    <mesh ref={ref} 
        geometry={new THREE.BoxBufferGeometry(1,1,1)}
        material={new THREE.MeshBasicMaterial({color:'green', wireframe:true})}
    />
    <InstancedMesh 
        geometry={new THREE.BoxBufferGeometry(1,1,1)}
        material={new THREE.MeshBasicMaterial({color:'ref'})}
        objects={objects}
        createObjectsMod={createObjectsMod}
    />
    </>
    );
}

export function Scene() {
    return(
        <>
        <Cesped />
        <Horse />
        {/* <Horse2 />
        <Horse3 />
        <Horse4 />
        <Gallery /> */}
        <Physics>
            <Player />
            <GroundPhysic />
            <InstancedPhysics />
        </Physics>
        </>
    );
}

export default function App23(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Stats />
        <ambientLight intensity={0.4}/>
        <pointLight />
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
        {/* <OrbitControls /> */}
    </Canvas>
    <Joystick />
    </>
    );
}