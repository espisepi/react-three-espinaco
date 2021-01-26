import React, {Suspense, useEffect, useState, useCallback} from 'react';
import { Canvas, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF, Sky } from 'drei';
import Loading from '../../components/Loading';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';

import { AudioComponents } from '../App35/MediaPointsShader';
import Ocean from '../../drei-espinaco/Ocean';

export default function Scene1({link, webcam, muted}) {

    const { camera } = useThree();
    useEffect(()=>{
        camera.position.z = 20;
    });

    const texture = useLoader(THREE.TextureLoader, 'assets/env/360jpg/umhlanga_sunrise.jpg');
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;
    const {scene} = useThree();
    useEffect(()=>{
        scene.background = texture;
        return () => scene.background = null;
    },[texture]);

    return(
        <>
        <ambientLight args={[0x443333, 0.5]} />
        <directionalLight args={[0xffddcc, 0.2]} position={[1, 0.75, 0.5]} />
        <directionalLight args={[0xccccff, 0.2]} position={[-1, 0.75, 0.5]} />
        <Suspense fallback={<Loading />} >
            <Ocean geometry={new THREE.PlaneBufferGeometry( 3000, 3000, 1, 1 )} position={[0,-10,0]} rotation={[Math.PI/2,0,0]} />
            <AudioComponents videoSrc={link} audioSrc={link} webcam={webcam} muted={muted} type='VideoPointsShader'/>
        </Suspense>
        {/* <Picture /> */}
        <OrbitControls />
        </>
    );
}
