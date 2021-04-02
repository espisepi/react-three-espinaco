import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, Text } from 'drei';
import Loading from '../../components/Loading';


import Joystick from '../../drei-espinaco/Joystick';
import { Physics } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import Ocean from '../../drei-espinaco/Ocean';

import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { AudioComponents } from '../App35/MediaPointsShader';

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
    useEffect(()=>{
        
        gsap.registerPlugin(ScrollTrigger);
        // ScrollTrigger.defaults({
        //     immediateRender: false,
        //     ease: "power1.inOut",
        //   });

        // Modificamos nuestro music mesh
        const enterFunc = () => {
            console.log('start')
        }
        const leaveFunc = () => {
            console.log('completado')
        }
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-one",
                start: 'top top',
                endTrigger: ".section-three",
                end: 'top top',
                scrub: 1,
                // markers:{color: 'white' }
                onEnter: enterFunc, onLeave: leaveFunc, onEnterBack: enterFunc, onLeaveBack: leaveFunc
            }
        });
        
        const box = boxRef.current;
        tl
        .from(box.position, { y: -5})
        .to(box.position, { y: 5 })

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-three",
                start: 'top top',
                endTrigger: ".section-five",
                end: 'top top',
                scrub: 1,
                // markers:{color: 'white' }
            }
        });
        tl2
        .from(box.position, { y: -5})
        .to(box.position, { y: 5 })

    },[boxRef.current]);

    const [audioSrc, setAudioSrc] = useState('assets/musica/masnaisraelb.mp3');
    return(
        <>
        <ambientLight />
        {/* <Ocean geometry={new THREE.PlaneBufferGeometry( 500, 500, 1, 1 )} position={[0,1,0]} rotation={[Math.PI/2,0,0]} /> */}
        <group ref={boxRef}>
            {/* <Box position={[0, 0, 0]} /> */}
            <Suspense fallback={<Box position={[0, 0, 0]} />}>
                <AudioComponents audioSrc={audioSrc} type='MusicShader' position={[0,0,0]}/>
            </Suspense>
            <Text
                // ref={ref}
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
        </group>
        </>
    );
}

export default function App44(props) {

    return (
    <>
    <div style={{overflow:'hidden'}}>
    <Canvas className="canvas" style={{ /*backgroundColor:'#f00',*/ position:'fixed', width:'100%', height:'100%', zIndex:'999'}}>
        <Scene />
    </Canvas>
    <section className="section-one" style={{ ...section, ...sectionOne }}></section>
    <section id="section-two" className="section-two" style={{ ...section, ...sectionTwo }}></section>
    <section className="section-three" style={{ ...section, ...sectionThree }}>
        <h1 id="h1-title" style={{margin:0,padding:0, opacity:0.0}}>Bienvenido</h1>
        <div id="bar-title" style={{width:'0px', height:'5px', backgroundColor:'white'}}></div>
    </section>
    <section id="section-four" className="section-four" style={{ ...section, ...sectionOne }}></section>
    <section id="section-five" className="section-five" style={{ ...section, ...sectionTwo }}></section>
    {/* <Joystick /> */}
    </div>
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
