import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

export function Scene() {
    return(
        <>
        <ambientLight />
        <Loading />
        <OrbitControls />
        </>
    );
}

export default function App13(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    );
}