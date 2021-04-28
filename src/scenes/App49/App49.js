import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
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
    const { scene } = useThree();
    useEffect(()=>{
        
        gsap.registerPlugin(ScrollTrigger);
        // ScrollTrigger.defaults({
        //     immediateRender: false,
        //     ease: "power1.inOut",
        //   });

        // Modificamos la primera caja
        const box = boxRef.current;
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
        .to(box.scale, { x: 0 }, "simultaneously")
        // .to(".canvas", { opacity: 0, scale: 0 }, "simultaneously")

        // Creamos la segunda caja
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-two",
                start: 'top top',
                endTrigger: ".section-three",
                end: 'bottom bottom',
                scrub: 1,
                // markers:{color: 'white' }
            }
        });
        const boxGreen = new THREE.Mesh(new THREE.BoxBufferGeometry(1,1,1), new THREE.MeshBasicMaterial({color:'red'}));
        boxGreen.material.opacity = 0.0;
        scene.add(boxGreen);
        tl2.to( boxGreen.material, { opacity: 1.0 } )
        tl2.to(boxGreen.rotation, { y: 5.0 });


        // modificamos el css
        const h1Title = document.getElementById('h1-title');
        const barTitle = document.getElementById('bar-title')
        tl2.to( h1Title.style , {duration:0.5, opacity: 1.0 }, "simultaneously");
        tl2.to( barTitle.style , { width: 20 + '%' }, "simultaneously");


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

export default function App49(props) {

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
