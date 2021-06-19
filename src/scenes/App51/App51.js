import React, { Suspense, useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, Stars } from 'drei';


import Joystick from '../../drei-espinaco/Joystick';
import { Physics } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import Ocean from '../../drei-espinaco/Ocean';

import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";

import ScrollAnimations from './animations/ScrollAnimations';

import FullScreen from '../../drei-espinaco/Fullscreen';

import Catedral from './components/Catedral'

export function Scene() {
    
    // useEffect( () => {

    //     THREE.DefaultLoadingManager.onStart = () => console.log('start loading');
    //     THREE.DefaultLoadingManager.onLoad = () => console.log(' Loading complete ');
    //     THREE.DefaultLoadingManager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
    //         console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    //     };

    // }, [] );

    const { scene } = useThree();
    const [boxCurve, setBoxCurve] = useState(null)
    useEffect(()=>{
        if(!boxCurve) {
            const mesh = scene.getObjectByName('groupCurve_boxCurve');
            if(mesh) {
                setBoxCurve(mesh);
            }
        }
    },[scene.children.length]);

    const orbitControl = useRef();
    let newPosition = new THREE.Vector3(0,0,0)
    let prevPosition = new THREE.Vector3(newPosition.x,newPosition.y,newPosition.z)
    useFrame(()=>{
        if (orbitControl.current) {
            newPosition = boxCurve.position.clone();
            orbitControl.current.target = newPosition;

            if (newPosition.x !== prevPosition.x || newPosition.y !== prevPosition.y || newPosition.z !== prevPosition.z) {
                // Se ha movido el objeto target al que se esta mirando

                const deltaX = newPosition.x - prevPosition.x;
                const deltaY = newPosition.y - prevPosition.y;
                const deltaZ = newPosition.z - prevPosition.z;
                
                const camera = orbitControl.current.object;
                camera.position.x += deltaX;
                camera.position.y += deltaY;
                camera.position.z += deltaZ;

                prevPosition = newPosition.clone() // Important

            }
        }
    })

    return(
        <>
        <ambientLight />
        <pointLight position={[0,-3,5]}  />
        <Stars radius={200} />
        <Suspense fallback={null}>
            <group name="cubeWireframe" position={[0,0,8]}>
                <mesh>
                    <boxBufferGeometry args={[1,1,1]} />
                    <meshBasicMaterial wireframe={true} />
                </mesh>
            </group>
            <group name="cubeWireframe" position={[0,0,-8]}>
                <mesh>
                    <boxBufferGeometry args={[1,1,1]} />
                    <meshBasicMaterial wireframe={true} color='green' />
                </mesh>
            </group>
            <Catedral />
        </Suspense>
        <OrbitControls ref={orbitControl} />
        <ScrollAnimations />
        </>
    );
}

export default function App51(props) {

    return (
    <>
    <div style={{overflow:'hidden'}}>
    <Canvas gl={{antialias: true}} onCreated={ ({gl}) => gl.toneMapping = 0 } className="canvas" style={{ backgroundColor:'#000', position:'fixed', width:'100%', height:'100vh', zIndex:'5'}} colorManagement>
        <Scene />
    </Canvas>
    <SectionsHtml />
    <FullScreen width='30px' position='fixed' height='30px' backgroundImage={'url("assets/img/icon/fullscreen64.png")'} backgroundSize={'cover'} borderStyle={'none'} WebkitFilter={'invert(100%)'} opacity={0.6} />  
    </div>
    </>
    );
}

/* To see background debug, comment line "backgroundColor:'#000'" in <Canvas> element above*/
function SectionsHtml(){
    return (
        <>
        <section className="section-one" style={{ ...section, ...tomatoColor }}></section>
        <section className="section-two" style={{ ...section, ...steelblueColor }}></section>
        <section className="section-three" style={{ ...section, ...limeColor }}></section>
        <section className="section-four" style={{ ...section, ...tomatoColor }}></section>
        <section className="section-five" style={{ ...section, ...limeColor }}></section>
        <section className="section-six" style={{ ...section, ...tomatoColor }}></section>
        <section className="section-sevent" style={{ ...section, ...limeColor }}></section>
        <section className="section-eight" style={{ ...section, ...tomatoColor }}></section>
        </>
    );
}

const section = {
    width: '100%',
    height: '100vh',
    position: 'relative'
}

const tomatoColor = {
    backgroundColor: 'tomato'
}

const steelblueColor = {
    backgroundColor: 'steelblue'
}

const limeColor = {
    backgroundColor: 'lime'
}

