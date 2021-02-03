import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { Sky, useFBX, useGLTF } from 'drei';
import Ocean from '../../../drei-espinaco/Ocean';
import PicturesDisplay from '../displays/PicturesDisplay';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';
import MeshTransformControls from '../../../drei-espinaco/MeshTransformControls';
import { AudioComponents } from '../MediaPointsShader';

function Person({}) {
    const { scene } = useThree();
    const mtl = useLoader(MTLLoader, 'assets/obj/googleEarth/catedral/untitled.mtl');
    // const obj = useLoader(OBJLoader, 'assets/obj/googleEarth/catedral/untitled.obj');
    useEffect(()=>{
        mtl.preload();
        const loaderObj = new OBJLoader();
        loaderObj.load('assets/obj/googleEarth/catedral/untitled.obj', obj => {
            scene.add(obj);
            console.log(obj);
        });
    });

    return null;
    // return <primitive position={[0,-10,0]} object={obj} />;
}

function Catedral({}) {
    const gltf = useLoader(GLTFLoader, 'assets/obj/googleEarth/catedral/untitled.glb');
    return <primitive position={[50,-34,-50]} object={gltf.scene} />;
}

function Train() {
    const gltf = useLoader(GLTFLoader, 'assets/obj/train/scene.gltf');
    const group = useRef();
    // decal
    const decalMap = useLoader(THREE.TextureLoader, 'assets/img/highkili.png');
    const {scene, camera} = useThree();
    const [decal,setDecal] = useState();
    useEffect(()=>{
        if(group.current){
            console.log(gltf);
            const decalMaterial = new THREE.MeshPhongMaterial({
                specular: 0x444444,
                // color:0xff0000,
                map: decalMap,
                shininess: 30,
                transparent: true,
                depthTest: true,
                depthWrite: false,
                polygonOffset: true,
                // polygonOffsetFactor: - 4,
                wireframe: false
            });
            const position = new THREE.Vector3(-18,0,15);
            const rotation = new THREE.Euler(0,0,0);
            const scale = new THREE.Vector3(1,35,35);
            const mesh = group.current.children[0].children[0].children[0].children[0].children[0].children[0];
            const decal = new THREE.Mesh( new DecalGeometry( mesh, position, rotation, scale ), decalMaterial );
            scene.add(decal);
            const box = new THREE.BoxHelper( decal, 0xffff00 );
            scene.add( box );
        }
    },[group.current]);
    // useFrame(()=>{
    //     console.log(camera.position)
    // })
    return (
    <>
    <primitive ref={group} position={[0,-15,0]} scale={[0.1,0.1,0.1]} object={gltf.scene} />
    </>
    );
}

function Pla({}) {
    const gltf = useGLTF('assets/obj/googleEarth/pla/untitled.glb');
    // const { scene } = useThree();
    // console.log(scene)
    // useEffect(()=>{
    //     scene.add(gltf.scene);
    // })
    // return null;
    return <primitive object={gltf.scene} position={[1000,-40,-1000]} scale={[20,20,20]} dispose={null} />;
}

function Jaguar(){
    const gltf = useGLTF('assets/obj/googleEarth/isla-magica/jaguar/untitled.glb');
    return <primitive object={gltf.scene} scale={[20,20,20]} />
}

export default function Scene05(){
    return(
        <>
        <ambientLight />
        {/* <Pla /> */}
        <Catedral />
        {/* <AudioComponents position={[300,0,300]} scale={[0.1,0.1,0.1]} audioSrc='assets/musica/04-homeboy.mp3' videoSrc='assets/musica/04-homeboy.mp4' type='VideoPointsShader'/> */}
        {/* <Jaguar /> */}
        {/* <Train /> */}
        {/* <Ocean geometry={new THREE.PlaneBufferGeometry( 500, 500, 1, 1 )} position={[0,1,0]} rotation={[Math.PI/2,0,0]} />
        <Sky
            distance={450000} // Camera distance (default=450000)
            inclination={0.65} // Sun elevation angle from 0 to 1 (default=0)
            azimuth={0.50} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        /> */}
        {/* <Person /> */}
        {/* <Catedral /> */}
        {/* <PicturesDisplay /> */}
        </>
    );
}