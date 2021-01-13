import React, { Suspense, useMemo, useCallback, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { Stats, OrbitControls, Sky } from 'drei';
import Loading from '../../components/Loading';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import {InstancedMesh, InstancedMeshPhysics, InstancedMeshes, InstancedFBX, InstancedGLTF, InstancedGLTFPhysics, InstancedPhysics} from '../../drei-espinaco/instancedMesh/';
import { createMapsPoints, createMapPoints, transformPointsToObjects } from '../../drei-espinaco/points-creator/';

import PicturesDisplay from './PicturesDisplay';

import Ocean from '../../drei-espinaco/Ocean';
import Plane from '../../drei-espinaco/Plane';

import { proxy, useProxy } from "valtio";

const state = proxy({index: 0});

function Scene02() {
    return(
        <>
        <ambientLight />
        <Plane args={[50,50,50,50]}/>
        <Plane args={[50,50,50,50]} rotation={[0, -Math.PI / 2, 0]} position={[20,0,0]}/>
        <Plane args={[50,50,50,50]} rotation={[0, -Math.PI / 2, 0]} position={[-20,0,0]}/>
        </>
    );
}

function Scene01(){
    return(
        <>
        <ambientLight />
        <Ocean geometry={new THREE.PlaneBufferGeometry( 500, 500, 1, 1 )} position={[0,1,0]} rotation={[Math.PI/2,0,0]} />
        <Sky
            distance={450000} // Camera distance (default=450000)
            inclination={0.65} // Sun elevation angle from 0 to 1 (default=0)
            azimuth={0.50} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        />
        </>
    );
}

export function ScenePrincipal() {

    const snapState = useProxy(state);
    const [current, setCurrent] = useState();
    
    useEffect(()=>{
        const lengthScenarios = 2;
        const indexFix = snapState.index % lengthScenarios;
        if(indexFix === 0){
            setCurrent(<Scene01 />);
        } 
        else if(indexFix === 1) {
            setCurrent(<Scene02 />);
        }
    },[snapState]);
    return(
        <>
        <Physics>
        <Suspense fallback={<Loading />}>
            
            {current}

            <PicturesDisplay />
            <Player mass={200.0}/>
            <GroundPhysic />
        </Suspense>
        </Physics>
        {/* <OrbitControls /> */}
        </>
    );
}

export default function AppDirty(props) {

    const changeScene = useCallback(()=>{
        state.index++;        
    },[]);

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Stats />
        <ScenePrincipal />
    </Canvas>
    <Joystick />
    <div onClick={changeScene} style={{ position:'absolute', width:'20px', height:'20px', bottom: 40, borderStyle: 'dashed', color: '#e60005', zIndex: 20 }}></div>
    </>
    );
}