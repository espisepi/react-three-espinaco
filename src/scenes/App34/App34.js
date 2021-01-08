// https://codesandbox.io/s/r3f-sky-dome-forked-rj0tn?file=/src/index.js:633-1162 (L)

import React, {useEffect} from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

import { proxy, useProxy } from "valtio";
import { Suspense } from 'react';

var hotspot0 = {
    location: location0,
    position: [0,2,0],
    img: ''
}

var location0 = {
    env:'assets/env/360jpg/cannon.jpg',
    children: [hotspot0]
}

var location1 = {
    env:'assets/env/360jpg/lilienstein.jpg',
    children: [hotspot0]
}



var hotspotsState = {
        current: location1,
};

export function Scene() {
    const envSrc = hotspotsState.current.env;
    const texture = useLoader(THREE.TextureLoader, envSrc);
    useEffect(()=>{
    
    },[])
    

    return(
        <>
        <ambientLight />
        <Loading />
        <OrbitControls />
        <group>
        <mesh>
            <sphereBufferGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        <mesh position={hotspotsState.current.children[0].position}>
            <sphereGeometry args={[1.25, 32, 32]} />
            <meshBasicMaterial color="white" />
        </mesh>
        </group>
        </>
    );
}

export default function AppDirty(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Suspense fallback={<Loading/>}>
            <Scene />
        </Suspense>
    </Canvas>
    );
}