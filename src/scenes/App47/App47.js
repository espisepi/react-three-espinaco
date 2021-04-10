import React, { Suspense, useRef, useState, useCallback } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { PositionalAudio } from 'drei';
import * as THREE from 'three';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';

import { VRCanvas, Hands, DefaultXRControllers, useXR, useController } from '@react-three/xr';

import Scene02 from '../App38/scenes/Scene02';

function ResizeCanvas(){
    const { gl } = useThree();
    gl.xr.setFramebufferScaleFactor(2.0);
    return null;
}

export function RunApp47(props) {
    return (
    <>
    <VRCanvas gl={{ antialias: true }}>
      <ambientLight />
      <ResizeCanvas />
      <Suspense fallback={<Loading />}>
        <Scene02 />
      </Suspense>

      <DefaultXRControllers />
      <Hands />
    </VRCanvas>
    </>
    );
}

export default function App47(props) {
    const [click, setClick] = useState(false);
    const handleClick = useCallback((e)=>{
        e.preventDefault();
        setClick(true);
    });
    return(
        click ? <RunApp47 /> :
                <div onPointerDown={handleClick} 
                    style={{position:'absolute', width:'100vw', height:'100vh', color:'#101010', backgroundColor:'#343a40', textAlign:'center'}}>
                        <h1>Click on Screen To Start</h1>
                        <br></br>
                        <h1>NAUGHTY SWAIN - U DON´T KNOW (PROD. JAY CAS)</h1>
                </div>
    );
}