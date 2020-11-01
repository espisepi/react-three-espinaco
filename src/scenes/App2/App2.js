import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

export default function App2(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <ambientLight />
        <Loading />
        <OrbitControls />
    </Canvas>
    );
}