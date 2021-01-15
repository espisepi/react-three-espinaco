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

import PicturesDisplay from './displays/PicturesDisplay';
import Scene01 from './scenes/Scene01';
import Scene02 from './scenes/Scene02';

import Ocean from '../../drei-espinaco/Ocean';
import Plane from '../../drei-espinaco/Plane';

import { proxy, useProxy } from "valtio";

import {SceneApp33} from '../App33/App33';


const state = proxy({index: 0});

export function ScenePrincipal() {

    const snapState = useProxy(state);
    const [current, setCurrent] = useState();
    
    useEffect(()=>{
        const lengthScenarios = 3;
        const indexFix = snapState.index % lengthScenarios;
        if(indexFix === 0){
            setCurrent(<Scene01 />);
        } 
        else if(indexFix === 1) {
            setCurrent(<Scene02 />);
        }else if(indexFix === 2) {
            setCurrent(<SceneApp33 />);
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