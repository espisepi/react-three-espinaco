import React, { Suspense, useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, Stars } from 'drei';
import Loading from '../../components/Loading';


import Joystick from '../../drei-espinaco/Joystick';
import { Physics } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import Ocean from '../../drei-espinaco/Ocean';

import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GridFloor from './components/GridFloor';
import TitleText from './components/TitleText';
import PlanesApp from './components/PlanesApp';

import ScrollAnimations from './animations/ScrollAnimations';

export function Scene() {

    const { scene } = useThree();
    console.log(scene)

    useEffect( () => {

        THREE.DefaultLoadingManager.onStart = () => console.log('start loading');
        THREE.DefaultLoadingManager.onLoad = () => console.log(' Loading complete ');
        THREE.DefaultLoadingManager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };

    }, [] );

    return(
        <>
        <ambientLight />
        <Stars radius={200} />
        <Suspense fallback={<Loading />}>
            <group name="groupPrincipal">
                <TitleText />
                <GridFloor />
            </group>
            <group name="groupPlanesApp" position={[0,0,3]}>
                <PlanesApp />
            </group>
        </Suspense>
        <ScrollAnimations />
        </>
    );
}

export default function App49(props) {

    return (
    <>
    <div style={{overflow:'hidden'}}>
    <Canvas className="canvas" style={{ backgroundColor:'#000', position:'fixed', width:'100%', height:'100%', zIndex:'999'}} colorManagement>
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

