import React, {Suspense, useEffect, useState, useCallback, useRef} from 'react';
import { Canvas, useLoader, useThree, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF, Sky } from 'drei';
import Loading from '../../components/Loading';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';

import { AudioComponents } from '../App35/MediaPointsShader';
import Ocean from '../../drei-espinaco/Ocean';

import Background from '../../drei-espinaco/Background';

export default function Scene1({link, webcam, muted, autoRotate}) {

    // const { camera } = useThree();
    // useEffect(()=>{
    //     camera.position.z = 20;
    // });

    // const texture = useLoader(THREE.TextureLoader, 'assets/env/360jpg/umhlanga_sunrise.jpg');
    // texture.mapping = THREE.EquirectangularReflectionMapping;
    // texture.encoding = THREE.sRGBEncoding;
    // const {scene} = useThree();
    // useEffect(()=>{
    //     scene.background = texture;
    //     return () => scene.background = null;
    // },[texture]);

    const controls = useRef(null);
    useEffect(()=>{
        if(controls.current){
            controls.current.target.y += 3.0;
        }
    },[controls]);

    useFrame(()=>{
        if(controls.current){
            controls.current.autoRotate = autoRotate;
        }
    })

    return(
        <>
        <ambientLight args={[0x443333, 0.5]} />
        <Suspense fallback={<Loading />} >
            <Background url={link} muted={muted}  />
            <Ocean geometry={new THREE.BoxBufferGeometry( 1000, 1000, 1000 )} position={[0, 498, 0 ]} />
            {/* <AudioComponents videoSrc={link} audioSrc={link} webcam={webcam} muted={muted} type='VideoPointsShader'/> */}
        </Suspense>
        {/* <Picture /> */}
        <OrbitControls ref={controls} rotateSpeed={0.5} autoRotateSpeed={1.0}  />
        </>
    );
}
