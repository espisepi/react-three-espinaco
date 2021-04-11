import React, { Suspense, useRef, useState, useCallback } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';
import Game from './Game';

export function Scene() {
    const { scene, camera, gl } = useThree();
    const game = new Game(scene, camera, gl);

    // cargamos los animales con useloader, los pasamos por parametros a Game y los añadimos a un group y ese group lo movemos al acertar la palabra
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