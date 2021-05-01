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

import Loading from './components/Loading';
import GridFloor from './components/GridFloor';
import TitleText from './components/TitleText';
import PlanesApp from './components/PlanesApp';
import Contact from './components/Contact';

import ScrollAnimations from './animations/ScrollAnimations';

import BlackPlane from './components/BlackPlane';
import FullScreen from './components/FullScreen';

function PostProcessing(){
    return(
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            height={1024}
          />
          {/* <Glitch active={true} delay={new THREE.Vector2(0,1)} /> */}
        </EffectComposer>
    );
}

export function Scene() {
    
    // useEffect( () => {

    //     THREE.DefaultLoadingManager.onStart = () => console.log('start loading');
    //     THREE.DefaultLoadingManager.onLoad = () => console.log(' Loading complete ');
    //     THREE.DefaultLoadingManager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
    //         console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    //     };

    // }, [] );

    return(
        <>
        <ambientLight />
        <pointLight position={[0,-3,5]}  />
        <Stars radius={200} />
        <Suspense fallback={<Loading />}>
            <BlackPlane position={[0,0,-5]} scale={[1,1,1]} />
            <FullScreen position={[0,2.5,0]} scale={[10,2,1]}/>
            <group name="groupPrincipal">
                <TitleText />
                <GridFloor />
            </group>
            <group name="floor" position={[0,0,0.01]}>
                <GridFloor />
            </group>
            <group name="groupPlanesApp" position={[0,-10,3]}>
                <PlanesApp />
            </group>
            <group name="cubeWireframe" position={[0,0,7]}>
                <mesh>
                    <boxBufferGeometry args={[1,1,1]} />
                    <meshBasicMaterial wireframe={true} />
                </mesh>
            </group>
            <group name="groupContact">
                <Contact />
            </group>
        </Suspense>
        <ScrollAnimations />
        <PostProcessing />
        </>
    );
}

export default function App49(props) {

    return (
    <>
    <div style={{overflow:'hidden'}}>
    <Canvas className="canvas" style={{ backgroundColor:'#000', position:'fixed', width:'100%', height:'100vh', zIndex:'5'}} colorManagement>
        <Scene />
    </Canvas>
    <SectionsHtml />
    {/* <Joystick /> */}
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

