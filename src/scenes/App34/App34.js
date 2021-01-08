// https://codesandbox.io/s/r3f-sky-dome-forked-rj0tn?file=/src/index.js:633-1162 (L)

import React, {useEffect, useCallback, useState, useRef} from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
// import Loading from '../../components/Loading';

import { proxy, useProxy } from "valtio";
import { Suspense } from 'react';

const hotspot0 = {
    position: [0,2,0],
    img: '',
    location: null
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
        next: location0
});

const animationState = proxy({run:false});

const texturesState = proxy({
    current: null,
    old: null,
    new: null
})

export function Scene() {
    const snapHotspots = useProxy(hotspotsState);
    const snapAnimation = useProxy(animationState);
    // const snapTextures = useProxy(texturesState);
    const envSrc = snapHotspots.current.env;
    const texture = useLoader(THREE.TextureLoader, envSrc);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;
    texturesState.new = texture;

    // equirectangular background
    const {scene, camera} = useThree();
    useEffect(()=>{
        scene.background = texture;
    },[texture]);

    const handleOnClick = useCallback(({location})=>{
        hotspotsState.next = location;
        animationState.run = true;
    },[]);

    // Sphere coincide con background
    const meshLoading = useRef();
    useEffect(()=>{
        if(meshLoading.current){
            camera.add(meshLoading.current)
        }
    },[meshLoading.current]);
    
    // console.log(snapTextures)
    return(
        <>
        <ambientLight />
        <group>
        <mesh ref={meshLoading} visible={snapAnimation.run}>
            <sphereBufferGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={snapHotspots.current.children[0].position} onClick={()=>handleOnClick(snapHotspots.current.children[0])}>
            <sphereGeometry args={[1.25, 32, 32]} />
            <meshBasicMaterial envMap={texture} side={THREE.FrontSide}/>
        </mesh>
        </group>
        </>
    );
}

// function Loading() {
//     useEffect(()=>{
//         animationState.run = true;
//     },[]);
//     return null;
// }

function RunAnimation() {
    // console.log(controls)
    const animationSnap = useProxy(animationState);
    const texturesSnap = useProxy(texturesState);
    const [iTime, setITime] = useState(0);
    

    const [texture, setTexture] = useState(texturesSnap.old);

    // const mesh = useRef();
    useFrame(({camera})=>{
        if(animationSnap.run){
            setITime( iTime => iTime += 0.06 );
            camera.zoom = 1.0 + ( ( (1.0 + Math.cos(3.14 +iTime) ) / 2.0 ) * 10.0 );
            camera.updateProjectionMatrix();
            if(iTime <= 3.14){
                // console.log(texturesSnap.old.clone())
                // console.log(mesh.current.material)
                // const textureTemp = texturesSnap.old.clone();
                // texturesState.current = texturesState.old;
                // mesh.current.material.envMap = textureTemp.clone();
                // textureTemp.mapping = THREE.EquirectangularReflectionMapping;
                // textureTemp.encoding = THREE.sRGBEncoding;
                // setTexture(textureTemp);
            }else{
                hotspotsState.current = hotspotsState.next;
                // texturesState.current = texturesState.new;
                // setTexture(texturesSnap.new);
            }

            if(iTime >= 3.14 * 2.0) {
                setITime( 0 );
                animationState.run = false;
                camera.zoom = 1.0;
                camera.updateProjectionMatrix();
            }
        }

    });
    
    return (
        null
    );
}

export default function AppDirty(props) {

    const controls = useRef(null);

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Suspense fallback={null}>
            <OrbitControls />
            <Scene />
        </Suspense>
        <RunAnimation controls={controls.current} />
    </Canvas>
    );
}