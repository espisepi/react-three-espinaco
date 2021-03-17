import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';


import Joystick from '../../drei-espinaco/Joystick';
import { Physics } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import Ocean from '../../drei-espinaco/Ocean';

import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    useEffect(()=>{
        const box = boxRef.current;
        gsap.registerPlugin(ScrollTrigger);
        // ScrollTrigger.defaults({
        //     immediateRender: false,
        //     ease: "power1.inOut",
        //   });
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-one",
                start: 'top top',
                endTrigger: ".section-three",
                end: 'bottom bottom',
                scrub: 1,
                // markers:{color: 'white' }
            }
        });
        tl
        .to(box.rotation, { y: 4.79 })
        .to(box.position, { x: -0.1 }) 
        .to(box.rotation, { z: 1.6 })
        .to(box.rotation, { z: 0.02, y: 3.1 }, "simultaneously")
        .to(box.position, { x: 0.16 }, "simultaneously")
        .to(".canvas", { opacity: 0, scale: 0 }, "simultaneously")
    },[boxRef.current]);
    return(
        <>
        <ambientLight />
        {/* <Ocean geometry={new THREE.PlaneBufferGeometry( 500, 500, 1, 1 )} position={[0,1,0]} rotation={[Math.PI/2,0,0]} /> */}
        <Box ref={boxRef} position={[-1.2, 0, 0]} />
        {/* <Physics>
        <Suspense fallback={<Loading />}>
            <Player mass={200.0}/>
            <GroundPhysic />
        </Suspense>
        </Physics> */}
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
    <section className="section-two" style={{ ...section, ...sectionTwo }}></section>
    <section className="section-three" style={{ ...section, ...sectionThree }}></section>
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
