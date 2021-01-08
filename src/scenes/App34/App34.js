// https://codesandbox.io/s/r3f-sky-dome-forked-rj0tn?file=/src/index.js:633-1162 (L)

import React, {useEffect, useCallback} from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useThree } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

import { proxy, useProxy } from "valtio";
import { Suspense } from 'react';

const hotspot0 = {
    position: [0,2,0],
    img: ''
}
const hotspot1 = {
    position: [0,2,0],
    img: ''
}

const location0 = {
    env:'assets/env/360jpg/cannon.jpg',
    children: [hotspot1]
}
const location1 = {
    env:'assets/env/360jpg/lilienstein.jpg',
    children: [hotspot0]
}
hotspot0.location = location0;
hotspot1.location = location1;


const hotspotsState = proxy({
        current: location0,
});

export function Scene() {
    const snapHotspots = useProxy(hotspotsState);
    const envSrc = snapHotspots.current.env;
    const texture = useLoader(THREE.TextureLoader, envSrc);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;

    // equirectangular background
    const {scene} = useThree();
    useEffect(()=>{
        scene.background = texture;
    },[texture]);


    const handleOnClick = useCallback(({location})=>{
        hotspotsState.current = location;
    },[]);
    return(
        <>
        <ambientLight />
        <OrbitControls />
        <group>
        <mesh position={snapHotspots.current.children[0].position} onClick={()=>handleOnClick(snapHotspots.current.children[0])}>
            <sphereGeometry args={[1.25, 32, 32]} />
            <meshBasicMaterial envMap={texture} side={THREE.FrontSide}/>
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