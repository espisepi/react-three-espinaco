import React, { Suspense, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { Stars } from 'drei';
import * as THREE from 'three';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';

import { VRCanvas, Hands, DefaultXRControllers, useXR, useController } from '@react-three/xr';

import { Catedral } from '../App51/components/Prefab'
import ScrollAnimations from '../App51/animations/ScrollAnimations';


export function Scene() {
    const boxRef = useRef();
    const { scene } = useThree();

    const [followObject, setFollowObject] = useState(null)
    useEffect(()=>{

        if(!followObject) {
            const mesh = scene.getObjectByName('groupCurve_boxCurve');
            if(mesh) {
                setFollowObject(mesh);
                console.log('Follow Object Finded correctly!')
            } else {
                console.log('Follow Object not finded')
            }
        }

    },[followObject, scene]);

    const { controllers, player, isPresenting } = useXR();
    const rightController = useController('right');
    const gamepad = rightController?.inputSource?.gamepad;
    console.log(gamepad);
    useFrame(()=>{

        if(followObject){
            player.position.set(followObject.position.x - 5.0, followObject.position.y, followObject.position.z)
        }
        
        // if(gamepad?.axes){
        //     // console.log(gamepad?.axes);
        //     // axes = [ 0, 0, 0, 0]
        //     // left:[ 0, 0, -1.0 , 0 ] right:[0, 0, 1.0 , 0 ] up:[ 0, 0, 0, -1.0 ] down:[ 0, 0, 0 , 1.0]
        //     const posX = gamepad?.axes[2]; // invertimos los ejes
        //     const posY = gamepad?.axes[3]; 
        //     player.position.set(posX * 10.0, posY * 10.0 );
        // }
        
    })

    return(
        <>
        <ambientLight />
        <pointLight position={[0,-3,5]}  />
        <Stars radius={200} />

        {/* <Background url='assets/musica/mc-pi-paranoia-prod-lasio.mp4' /> */}

        <Suspense fallback={null}>
            <Catedral />
            <ScrollAnimations />
        </Suspense>

        {/* <Ocean geometry={new THREE.BoxBufferGeometry( 500, 500, 500 )} position={[0,240,70]} /> */}

        </>
    );
}

function ResizeCanvas(){
    const { gl } = useThree();
    gl.xr.setFramebufferScaleFactor(2.0);
    return null;
}

export function RunApp52(props) {
    return (
    <>
    <VRCanvas gl={{ antialias: true }}>
      <ambientLight />
      <ResizeCanvas />
      <Suspense fallback={<Loading />}>
        <Scene />
      </Suspense>

      <DefaultXRControllers />
      <Hands />
    </VRCanvas>
    </>
    );
}

export default function App52(props) {
    const [click, setClick] = useState(false);
    const handleClick = useCallback((e)=>{
        e.preventDefault();
        setClick(true);
    },[]);
    return(
        click ? <RunApp52 /> :
                <div onPointerDown={handleClick} 
                    style={{position:'absolute', width:'100vw', height:'100vh', color:'#101010', backgroundColor:'#343a40', textAlign:'center'}}>
                        <h1>Click on Screen To Start</h1>
                        <br></br>
                        <h1>Catedral Seville</h1>
                </div>
    );
}