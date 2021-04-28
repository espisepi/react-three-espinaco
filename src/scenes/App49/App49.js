import React, { Suspense, useEffect, useRef, useState } from 'react';
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

function ScrollAnimations(){

    /* ------------------ Get Objects3D that we use to animate ---------- */

    const [groupPrincipal, setGroupPrincipal] = useState();
    const { scene } = useThree();
    useEffect(()=>{
        if( !groupPrincipal && scene.getObjectByName('groupPrincipal') ) {
            setGroupPrincipal( scene.getObjectByName('groupPrincipal') );
        }
    },[scene.children.length]);

    /* ----------------- Final Get Objects3D ----------- */

    /* ----------------- Animate Objects3D --------- */

    useEffect(()=>{

        gsap.registerPlugin(ScrollTrigger);

        if(groupPrincipal) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-one",
                    start: 'top top',
                    endTrigger: ".section-three",
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });
            tl.to(groupPrincipal.position, { y: 5.0 });
        }

    }, [scene.children.length]);

    /* ----------------- Final Animate Objects3D ---------- */

    
    return null;
}

export function Scene() {
    const boxRef = useRef();
    const { scene } = useThree();
    
    return(
        <>
        <ambientLight />
        <Stars />
        <group name="groupPrincipal">
            <GridFloor />
        </group>
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
        <section className="section-one" style={{ ...section, ...sectionOne }}></section>
        <section id="section-two" className="section-two" style={{ ...section, ...sectionTwo }}></section>
        <section className="section-three" style={{ ...section, ...sectionThree }}>
            <h1 id="h1-title" style={{margin:0,padding:0, opacity:0.0}}>Bienvenido</h1>
            <div id="bar-title" style={{width:'0px', height:'5px', backgroundColor:'white'}}></div>
        </section>
        </>
    );
}

const section = {
    width: '100%',
    height: '100vh',
    position: 'relative'
}

const sectionOne = {
    backgroundColor: 'tomato'
}

const sectionTwo = {
    backgroundColor: 'steelblue'
}

const sectionThree = {
    backgroundColor: 'lime'
}
