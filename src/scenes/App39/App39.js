import React, { Suspense, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { Stats, OrbitControls, TransformControls } from 'drei';
import Loading from '../App38/Loading';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics, useBox } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import {InstancedMesh, InstancedMeshPhysics, InstancedMeshes, InstancedFBX, InstancedGLTF, InstancedGLTFPhysics, InstancedPhysics} from '../../drei-espinaco/instancedMesh/';
import { createMapsPoints, createMapPoints, transformPointsToObjects } from '../../drei-espinaco/points-creator/';

import Scene01 from '../App38/scenes/Scene01';
import Scene02 from '../App38/scenes/Scene02';

import { proxy, useProxy } from "valtio";

import Fullscreen from '../../drei-espinaco/Fullscreen';

import MeshTransformControls from '../../drei-espinaco/MeshTransformControls';



export function ScenePrincipal() {
    return(
        <>
        <Physics gravity={[0, -100, 0]} >
        <Suspense fallback={<Loading />}>
            {/* <MeshTransformControls /> */}
            <Scene02 />

            {/* <Player mass={200.0} height={4.0} acceleration={[300,0.25]} /> */}
            <Player mass={200.0} height={4.0} />
            <GroundPhysic />
        </Suspense>
        </Physics>
        </>
    );
}

export function RunApp38(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        {/* <Stats /> */}
        <ScenePrincipal />
    </Canvas>
    <Joystick />
    <Fullscreen />
    
    </>
    );
}

export default function App38(props) {
    const [click, setClick] = useState(false);
    const handleClick = useCallback((e)=>{
        e.preventDefault();
        setClick(true);
    });
    return(
        click ? <RunApp38 /> :
                <div onPointerDown={handleClick} 
                    style={{position:'absolute', width:'100vw', height:'100vh', color:'#101010', backgroundColor:'#343a40', textAlign:'center'}}>
                        <h1>Click on Screen To Start</h1>
                        <br></br>
                        <h1>NAUGHTY SWAIN - U DON´T KNOW (PROD. JAY CAS)</h1>
                </div>
    );
}