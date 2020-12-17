// https://codesandbox.io/s/react-three-fiber-gltf-camera-animation-forked-pecl6?file=/src/Model.js
import React, {useEffect, useMemo, useState, useRef, useCallback, Suspense} from 'react';
import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { OrbitControls, useFBX, useGLTF, useAnimations, Stats } from 'drei';
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
// import InstancedMesh from '../../drei-espinaco/InstancedMesh';
import {InstancedMesh, InstancedMeshes, InstancedFBX} from '../../drei-espinaco/instancedMesh/';
// import Lights from '../../the-gallery/components/Lights/Lights';

import PictureLow from '../../the-gallery/components/Picture/PictureLow';
import Display from '../../the-gallery/components/Display/Display';
import { MeshStandardMaterial } from 'three';

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

function createPointsRecursive(numPoints=50, initialPoint=[0,0,0], spaceBetweenPoint=[10,0,0]) {
    const pointsList = [];
    for(let i = 0; i < numPoints; i++) {
        pointsList.push([
            initialPoint[0] + i * spaceBetweenPoint[0], // x
            initialPoint[1] + i * spaceBetweenPoint[1], // y
            initialPoint[2] + i * spaceBetweenPoint[2]  // z
        ]);
    }
    return pointsList;
}

function createMapPoints(numPoints=50, initialPoint=[0,0,0], spaceBetweenPoint=[10,0,0], numGroups=10, spaceBetweenGroup=[0,0,20]){
    let pointsList = [];
        for(let i = 0; i < numGroups; i++){
            pointsList = pointsList.concat(createPointsRecursive(numPoints, initialPoint, spaceBetweenPoint));
            initialPoint[0] += spaceBetweenGroup[0];
            initialPoint[1] += spaceBetweenGroup[1];
            initialPoint[2] += spaceBetweenGroup[2];
        }
    return pointsList;
}

function Art() {

    const map = useLoader(THREE.TextureLoader,'assets/img/jipis/charls/doggy3.jpeg');

    const objects = useMemo(()=>{
        const numPoints = 50;
        const initialPoint = [0,0,0];
        const spaceBetweenPoint = [10, 0, 0];
        const numGroups = 10;
        const spaceBetweenGroup = [0,0,20];
        
        const pointsList = createMapPoints(numPoints, initialPoint, spaceBetweenPoint, numGroups, spaceBetweenGroup);
        const objects = transformPointsToObjects(pointsList, [0,0,0], [1, 18, 11]);  

        return objects;
    });

    return (
    <>
    {/* <mesh scale={[60, 90, 1]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1,1,1000,1000]} />
        <meshStandardMaterial attach="material" map={map} side={THREE.DoubleSide} displacementMap={map} displacementScale={20.5} />
    </mesh> */}
    <InstancedMesh geometry={new THREE.BoxBufferGeometry(1,1,1)} material={new THREE.MeshBasicMaterial({color:'green', wireframe:true})} objects={objects} /> 
    </>);
}







function People() {
    const fbx = useFBX('assets/obj/simondev/resources/zombie/mremireh_o_desbiens.fbx')
    const fbxWalk = useFBX('assets/obj/simondev/resources/zombie/walk.fbx');
    const mixer = new THREE.AnimationMixer( fbx );

    const action = mixer.clipAction( fbxWalk.animations[ 0 ] );
    action.play();
    useFrame(({clock})=>{
        mixer.update(clock.getDelta()*5.0);
    });

    const meshes = [];
    fbx.traverse((object) => {
        if(object.isMesh){
            meshes.push(object)
        }
    });

    const objects = [
        {
            position: [0,0,0],
            scale: [0.1,0.1,0.1]
        },
        {
            position: [100,0,0],
        }
    ]

    const createObjectsMod = useCallback((state)=>{
      const objectsMod = [
        {
          ids: [0,1],
          object: {
            rotation: [0,state.clock.getElapsedTime(),0]
          }
        }
      ];
      return objectsMod;
    });

    // const {scene} = useThree();
    // scene.add(fbx);
    // return <primitive object={fbx} dispose={null} />
    // return <InstancedMeshes meshes={meshes} objects={objects} />;
    return <InstancedFBX src='assets/obj/simondev/resources/zombie/mremireh_o_desbiens.fbx' objects={objects} createObjectsMod={createObjectsMod} />
    // return (
    // <>
    //     <InstancedMesh geometry={meshes[0].geometry} material={meshes[0].material} objects={objects} />
    //     <InstancedMesh geometry={meshes[1].geometry} material={meshes[1].material} objects={objects} />
    // </>
    // );
    // return (
    // <>
    //     <mesh geometry={meshes[0].geometry} material={meshes[0].material} />
    //     <mesh geometry={meshes[1].geometry} material={meshes[1].material} />
    // </>
    // );
}

function Trees() {
    const {scene} = useGLTF('assets/obj/city/tree/scene.gltf');
    const meshes = [];
    scene.traverse((object) => {
        if(object.isMesh){
            meshes.push(object);
        }
    });
    
    const numPoints = 2;
    const initialPoint = [0,0,0];
    const spaceBetweenPoint = [100, 0, 0];
    const numGroups = 2;
    const spaceBetweenGroup = [100,0,20];
    
    const pointsList = createMapPoints(numPoints, initialPoint, spaceBetweenPoint, numGroups, spaceBetweenGroup);
    const objects = transformPointsToObjects(pointsList, [-Math.PI / 2,0,0], [18,18,18]);

    return <InstancedGLTF src='assets/obj/city/tree/scene.gltf' objects={objects} />
    // return (
    //     <>
    //     <InstancedMesh geometry={meshes[0].geometry} material={meshes[0].material} objects={objects} />
    //     <InstancedMesh geometry={meshes[1].geometry} material={meshes[1].material} objects={objects} />
    //     </>
    // );
}

export function Scene() {

    return(
        <>
        <Lights />
        <Physics gravity={[0, -30, 0]}>
          <Art />
          <People />
          <Trees />
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