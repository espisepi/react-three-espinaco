import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react';
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
    

    return(
        <>
        
        </>
    );
}

export default function AppDirty(props) {

    const controls = useRef(null);
    useEffect(()=>{
        if(controls.current){
            console.log('oyueee')
            console.log(controls)
            controls.current.target.y += 3.0;
            // controls.current.target.z += 2.0;
            // controls.current.position0.z = 0.0;
        }
    },[controls])

    const [muted, setMuted] = useState(0);
    const changeMuted = useCallback(() => {
        setMuted(m => !m)
    });

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Scene />
        {/* <Stats /> */}
        <ambientLight />
        <Background url='assets/musica/elane-low.mp4' muted={muted}  />
        {/* <Suspense fallback={<Loading/>}>
            <AudioComponents audioSrc='assets/musica/elane-low.mp4' videoSrc='assets/musica/elane-low.mp4' scale={[0.05,0.05,0.05]} position={[-20, 8, -30]} rotation={[Math.PI, Math.PI - 0.5, 0]}  />
        </Suspense> */}
        <Ocean geometry={new THREE.BoxBufferGeometry( 100, 500, 100 )} position={[0, 49, 0 ]}  />
        <FixImage />
        {/* <SimondevPersonController /> */}
        <OrbitControls ref={controls} rotateSpeed={0.5}/>
    </Canvas>
    {/* <Joystick /> */}
    <Fullscreen />
    <div onClick={changeMuted} style={{ position:'absolute', width:'20px', height:'20px', bottom: 120, borderStyle: 'dashed', color: '#e60005', zIndex: 20 }}></div>
    </>
    );
}