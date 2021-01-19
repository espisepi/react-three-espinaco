import React, { Suspense, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { Stats, OrbitControls, TransformControls } from 'drei';
import Loading from '../../components/Loading';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics, useBox } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
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

import MeshTransformControls from '../../drei-espinaco/MeshTransformControls';
import { AudioComponents } from './MediaPointsShader';


const state = proxy({index: 0});

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
        <mesh name='trigger0' position={[0,0,-90]} visible={visible} geometry={new THREE.BoxBufferGeometry(24.72,5.0,20.89)} material={new THREE.MeshBasicMaterial({color:'green', wireframe:true})} />
        </group>
    );
}

export function ScenePrincipal() {

    const snapState = useProxy(state);
    const [current, setCurrent] = useState();
    const [triggers, setTriggers] = useState({
        trigger0: false
    });

    const changeEnvironment = useCallback((triggerMesh)=>{
        if(triggerMesh && triggerMesh.name === 'trigger0'){
            setTriggers({
                trigger0: true
            });
        }else{
            setTriggers({
                trigger0: false
            });
        }
    });
    useEffect(()=>{
        if(triggers.trigger0){
            setCurrent(<Scene02 />);
        }else{
            setCurrent(<Scene04 />);
        }
    },[triggers.trigger0]);
    
    useEffect(()=>{
        const lengthScenarios = 4;
        const indexFix = snapState.index % lengthScenarios;
        if(indexFix === 0){
            setCurrent(<Scene04 />);
        }else if(indexFix === 1) {
            setCurrent(<Scene02 />);
        }else if(indexFix === 2) {
            setCurrent(<Scene03 />);
        }else if(indexFix === 3) {
            setCurrent(<Scene01 />);
        }
    },[snapState]);
    return(
        <>
        <Physics gravity={[0, -100, 0]} >
        {/* <MeshTransformControls /> */}
        <Suspense fallback={<Loading />}>
            
            {current}
            <AudioComponents />

            <Triggers changeEnvironment={changeEnvironment} visible={false} />
            <Player mass={200.0} height={4.0}/>
            <GroundPhysic />
        </Suspense>
        </Physics>
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