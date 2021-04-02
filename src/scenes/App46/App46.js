import React, { Suspense, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { OrbitControls, PointerLockControls, Stats } from 'drei';
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

import { VRCanvas, Hands, DefaultXRControllers } from '@react-three/xr';

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

    const [audioSrc, setAudioSrc] = useState('assets/musica/masnaisraelb.mp3');
    return(
        <>
        <ambientLight />
        {/* <Ocean geometry={new THREE.PlaneBufferGeometry( 500, 500, 1, 1 )} position={[0,-1,0]} rotation={[Math.PI/2,0,0]} /> */}
        <Background/>
        <Ocean geometry={new THREE.BoxBufferGeometry( 500, 500, 500 )} position={[0,240,70]} />

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

export default function App46(props) {

    return (
    <>
    <VRCanvas>
      {/* <ambientLight /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      <Scene />
      <DefaultXRControllers />
      <Hands />
    </VRCanvas>
    </>
    );
}