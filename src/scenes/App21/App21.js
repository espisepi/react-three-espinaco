// https://3dtextures.me/
// https://threejsfundamentals.org/threejs/lessons/threejs-textures.html

import React, { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls, Stats } from 'drei';
import Loading from '../../components/Loading';

import {InstancedMesh, InstancedMeshes, InstancedFBX, InstancedGLTF} from '../../drei-espinaco/instancedMesh/';
import { createMapPoints, transformPointsToObjects } from '../../drei-espinaco/points-creator/';

function Trees() {
    const objects = useMemo(()=>{
        const numPoints = 50;
        const initialPoint = [0,0,0];
        const spaceBetweenPoint = [10, 0, 0];
        const numGroups = 10;
        const spaceBetweenGroup = [0,0,20];
        
        const pointsList = createMapPoints(numPoints, initialPoint, spaceBetweenPoint, numGroups, spaceBetweenGroup);
        const objects = transformPointsToObjects(pointsList, [-Math.PI/2,0,0], [6, 6, 6]);  

        return objects;
    });

    return <InstancedGLTF src='assets/obj/city/tree/scene.gltf' objects={objects} />;
}

function Cesped() {
    const objects = useMemo(()=>{
        const numPoints = 10;
        const initialPoint = [0,-1,0];
        const spaceBetweenPoint = [1, 0, 0];
        const numGroups = 10;
        const spaceBetweenGroup = [0,0,1];
        
        const pointsList = createMapPoints(numPoints, initialPoint, spaceBetweenPoint, numGroups, spaceBetweenGroup);
        const objects = transformPointsToObjects(pointsList, [-Math.PI/2,0,0], [1, 1, 1]);  

        const pointsList2 = createMapPoints(numPoints, [15,-1,0], spaceBetweenPoint, numGroups, spaceBetweenGroup);
        const objects2 = transformPointsToObjects(pointsList2, [-Math.PI/2,0,0], [1, 1, 1]);  
        
        const res = objects.concat(...objects2);
        return res;
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

export function Scene() {
    return(
        <>
        {/* <Trees /> */}
        <Cesped />
        </>
    );
}

export default function App21(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Stats />
        <ambientLight intensity={0.4}/>
        <pointLight />
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
        <OrbitControls />
    </Canvas>
    );
}