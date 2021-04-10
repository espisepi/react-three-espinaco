import React, { Suspense, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { OrbitControls, PointerLockControls, Stats, PositionalAudio } from 'drei';
import * as THREE from 'three';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


import Joystick from '../../drei-espinaco/Joystick';
import { Physics } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import { AudioComponents } from '../App35/MediaPointsShader';

import { VRCanvas, Hands, DefaultXRControllers, useXR, useController } from '@react-three/xr';

import Scene02 from '../App38/scenes/Scene02';

import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, SMAA } from '@react-three/postprocessing';

import Effects from './Effects';

const Box = React.forwardRef( (props, ref) => {
    // This reference will give us direct access to the mesh
    const mesh = ref;
  
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
  
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
    //   mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })
  
    return (
      <mesh
        {...props}
        ref={ref}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
}) 
  

export function Scene() {
    const boxRef = useRef();
    const { scene } = useThree();

    const { controllers, player, isPresenting } = useXR();
    const rightController = useController('right');
    const gamepad = rightController?.inputSource?.gamepad;
    console.log(gamepad);
    useFrame(()=>{
        
        if(gamepad?.axes){
            // console.log(gamepad?.axes);
            // axes = [ 0, 0, 0, 0]
            // left:[ 0, 0, -1.0 , 0 ] right:[0, 0, 1.0 , 0 ] up:[ 0, 0, 0, -1.0 ] down:[ 0, 0, 0 , 1.0]
            const posX = gamepad?.axes[2]; // invertimos los ejes
            const posY = gamepad?.axes[3]; 
            player.position.set(posX * 10.0, posY * 10.0 );
        }
        
    })
    return(
        <>
        <ambientLight />
        {/* <Ocean geometry={new THREE.PlaneBufferGeometry( 500, 500, 1, 1 )} position={[0,-1,0]} rotation={[Math.PI/2,0,0]} /> */}
        <Background url='assets/musica/mc-pi-paranoia-prod-lasio.mp4' />
        <PositionalAudio
            url="assets/musica/mc-pi-paranoia-prod-lasio.mp3" // Url of the sound file
            distance={10} // Camera distance (default=1)
            loop
        />
        <Ocean geometry={new THREE.BoxBufferGeometry( 500, 500, 500 )} position={[0,240,70]} />
        {/* <AudioComponents audioSrc='assets/musica/coronil.mp4' type='MusicShader' position={[0,0,-20]}/> */}
        {/* <Suspense fallback={<Loading />}>
            <AssetGltf url="assets/obj/Horse.glb" />
        </Suspense> */}
        {/* <group ref={boxRef}>
            <Suspense fallback={<Box position={[0, 0, 0]} />}>
                <AudioComponents audioSrc={audioSrc} type='MusicShader' position={[0,0,0]}/>
            </Suspense>
            <Text
                position={[0.0,1.0,0]}
                color={'#EC2D2D'}
                fontSize={0.4}
                maxWidth={10}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign={'left'}
                >
                hello world!
            </Text>
        </group> */}
        </>
    );
}

function ResizeCanvas(){
    const { gl } = useThree();
    gl.xr.setFramebufferScaleFactor(2.0);
    return null;
}

export function RunApp46(props) {
    return (
    <>
    <VRCanvas gl={{ antialias: true }}>
      <ambientLight />
      <ResizeCanvas />
      <Suspense fallback={<Loading />}>
        {/* <Scene02 /> */}
        <Scene />

      {/* <EffectComposer> */}
        {/* <SMAA /> */}
      {/* </EffectComposer> */}
      {/* <Effects /> */}

      </Suspense>

      <DefaultXRControllers />
      <Hands />
    </VRCanvas>
    </>
    );
}

export default function App46(props) {
    const [click, setClick] = useState(false);
    const handleClick = useCallback((e)=>{
        e.preventDefault();
        setClick(true);
    });
    return(
        click ? <RunApp46 /> :
                <div onPointerDown={handleClick} 
                    style={{position:'absolute', width:'100vw', height:'100vh', color:'#101010', backgroundColor:'#343a40', textAlign:'center'}}>
                        <h1>Click on Screen To Start</h1>
                        <br></br>
                        <h1>MC Pi - PARANOIA // PROD. LASIO</h1>
                </div>
    );
}