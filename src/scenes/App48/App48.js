import React, { Suspense, useRef, useState, useCallback } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';
import Game from './Game';

export function Scene() {
    const { scene, camera, gl } = useThree();
    const game = new Game(scene, camera, gl);
    return(
        <>
        <ambientLight />
        {/* <Loading /> */}
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App48(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    );
}