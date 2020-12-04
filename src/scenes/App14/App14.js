import React, { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';
import {Stats} from 'drei';

import SimondevPersonController from '../../drei-espinaco/simondev/SimondevPersonController';
import Joystick from '../../drei-espinaco/Joystick';
import Fullscreen from '../../drei-espinaco/Fullscreen';

import { AudioComponents } from '../../drei-espinaco/VideoPointsShader';

function FixImage() {
    const {camera} = useThree();
    camera.position.x = 0.01;
    camera.position.z = 0.5;
    camera.lookAt(new THREE.Vector3(0,3,0));
    return null;
}

export function Scene() {
    const controls = useRef(null);
    useEffect(()=>{
        console.log(controls)
        console.log('oyeee')
        controls.current.target.y += 3.0;
        
        // controls.current.target.z += 2.0;
        // controls.current.position0.z = 0.0;
    },[controls])

    return(
        <>
        <Stats />
        <ambientLight />
        <Suspense fallback={<Loading/>}>
            <Background url='assets/musica/elane-low.mp4' />
            {/* <AudioComponents audioSrc='assets/musica/elane-low.mp4' videoSrc='assets/musica/elane-low.mp4' scale={[0.05,0.05,0.05]} position={[-20, 8, -30]} rotation={[Math.PI, Math.PI - 0.5, 0]}  /> */}
        </Suspense>
        <Ocean geometry={new THREE.BoxBufferGeometry( 100, 500, 100 )} position={[0, 49, 0 ]}  />
        <FixImage />
        {/* <SimondevPersonController /> */}
        <OrbitControls ref={controls} />
        </>
    );
}

export default function AppDirty(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Scene />
    </Canvas>
    {/* <Joystick /> */}
    <Fullscreen />
    </>
    );
}