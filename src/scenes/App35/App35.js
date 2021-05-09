import React, { Suspense, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { Stats, OrbitControls, TransformControls } from 'drei';
import Loading from './Loading';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics, useBox } from 'use-cannon';
import Player from './player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import {InstancedMesh, InstancedMeshPhysics, InstancedMeshes, InstancedFBX, InstancedGLTF, InstancedGLTFPhysics, InstancedPhysics} from '../../drei-espinaco/instancedMesh/';
import { createMapsPoints, createMapPoints, transformPointsToObjects } from '../../drei-espinaco/points-creator/';

import PicturesDisplay from './displays/PicturesDisplay';
import Scene01 from './scenes/Scene01';
import Scene02 from './scenes/Scene02';
import Scene03 from './scenes/Scene03';
import Scene04 from './scenes/Scene04';

import Ocean from '../../drei-espinaco/Ocean';
import Plane from '../../drei-espinaco/Plane';

import { proxy, useProxy } from "valtio";

import Fullscreen from '../../drei-espinaco/Fullscreen';
import { ActionState } from './State';

import MeshTransformControls from '../../drei-espinaco/MeshTransformControls';
import { AudioComponents } from './MediaPointsShader';


const state = proxy({index: 0, triggers:{trigger0:false}});

function Triggers({changeEnvironment, visible=true}){

    const ref = useRef(); // group of mesh triggers
    const {camera} = useThree();
    const raycaster = new THREE.Raycaster();
    useFrame(()=>{
        if(ref.current){
            raycaster.set( 
                           new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z),
                           new THREE.Vector3(0,-1.0,0)
                        );
            const intersects = raycaster.intersectObjects( ref.current.children );
            if(intersects.length !== 0){
                // console.log('oli')
                changeEnvironment(intersects[0].object)
            }else{
                // console.log('nanai')
                changeEnvironment();
            }
            // for ( let i = 0; i < intersects.length; i ++ ) {
            //     const triggerMesh = intersects[i].object;
            //     triggerMesh.userData.active = true;
            //     triggerMesh.material.color.set( 0xff0000 );
            // }
        }
    });

    return(
        <group ref={ref}>
        <mesh name='trigger0' position={[0,0,-160]} visible={visible} geometry={new THREE.BoxBufferGeometry(24.72,5.0,170.0)} material={new THREE.MeshBasicMaterial({color:'green', wireframe:true})} />
        </group>
    );
}

export function ScenePrincipal() {

    const snapState = useProxy(state);
    const [current, setCurrent] = useState();

    const changeEnvironment = useCallback((triggerMesh)=>{
        if(triggerMesh && triggerMesh.name === 'trigger0'){
            state.triggers.trigger0 = true;
        }else{
            state.triggers.trigger0 = false;
        }
    });
    useEffect(()=>{
        if(snapState.triggers.trigger0){
            setCurrent(<Scene02 />);
        }else{
            setCurrent(<Scene04 />);
        }
    },[snapState.triggers.trigger0]);
    
    // useEffect(()=>{
    //     const lengthScenarios = 4;
    //     const indexFix = snapState.index % lengthScenarios;
    //     if(indexFix === 0){
    //         setCurrent(<Scene04 />);
    //     }else if(indexFix === 1) {
    //         setCurrent(<Scene02 />);
    //     }else if(indexFix === 2) {
    //         setCurrent(<Scene03 />);
    //     }else if(indexFix === 3) {
    //         setCurrent(<Scene01 />);
    //     }
    // },[snapState]);
    return(
        <>
        <Physics gravity={[0, -100, 0]} >
        {/* <MeshTransformControls /> */}
        <Suspense fallback={<Loading />}>
            
            {current}

            <Triggers changeEnvironment={changeEnvironment} visible={false} />
            <Player mass={200.0} height={4.0}/>
            <GroundPhysic />
        </Suspense>
        </Physics>
        </>
    );
}

export default function AppDirty(props) {

    const snapAction = useProxy(ActionState);

    const divAction = useRef();
    useEffect(()=>{
        if(snapAction.current && divAction.current){
            // enable div
            divAction.current.style.display = 'block';
            // attach snapAction.current to pointerdown event in the div
            const action = snapAction.current;
            divAction.current.addEventListener('pointerdown', (e) => action());
            // add name to div
            divAction.current.innerHTML = `${snapAction.name}`;
        }else{
            // disable div
            if(divAction.current){
                divAction.current.style.display = 'none';
            }
        }
    },[snapAction.current]);

    // const changeScene = useCallback(()=>{
    //     state.index++;        
    // },[]);

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        {/* <Stats /> */}
        <ScenePrincipal />
    </Canvas>
    <Joystick />
    <Fullscreen />
    <div name='divAction' ref={divAction} style={{position:'absolute', top: '50px', width:'50px', height:'50px', backgroundColor:'red', zIndex:10000, cursor:'pointer'}} />
    {/* <div onClick={changeScene} style={{ position:'absolute', width:'20px', height:'20px', bottom: 40, borderStyle: 'dashed', color: '#e60005', zIndex: 20 }}></div> */}
    </>
    );
}