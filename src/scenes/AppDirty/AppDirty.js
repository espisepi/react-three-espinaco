import React, {Suspense, useEffect} from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls, Box } from 'drei';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';
import MusicPoints,{AudioComponents} from '../../drei-espinaco/MusicPoints';
import Camera from '../../components/Camera';

import {Physics, useBox, useSphere} from 'use-cannon';

function Ground() {
    const [ref, api] = useBox( ()=> ( { args:[100,1,100] }) );
    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach='geometry' args={[100,1,100]}/>
            <meshStandardMaterial attach='material' color='red' />
        </mesh>
    );
}

function Ball() {
    const [ref, api] = useSphere( () => ( { mass: 0.5, position:[0,2,0],args:[1.0], onCollide: e => {
        api.applyForce(1,[-100,4,0]);
    } } ) );
    return (
        <mesh ref={ref}>
            <sphereBufferGeometry attach='geometry'  args={[1.0]} />
            <meshStandardMaterial attach='material' color='blue' />
        </mesh>
    );
}


export function Scene({y=0}) {
    
    return(
        <>
        <ambientLight />
        <Suspense fallback={<Loading/>}>
        </Suspense>
        <Physics gravity={[0,-100,0]}>
            <Ball />
            <Ground />
        </Physics>
        <OrbitControls />
        </>
    );
}

export default function AppDirty(props) {
    // const [y] = useYScroll([-100, 2400], { domTarget: window })
    
    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    {/* <aDom.div className="bar" style={{ height: y.interpolate([-100, 2400], ['0%', '100%']) }} /> */}
    </>
    );
}