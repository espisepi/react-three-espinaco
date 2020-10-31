import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { AudioComponents } from '../drei-espinaco/VideoPoints';
import Loading from '../components/Loading';

export default function App1(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <ambientLight />
        <Suspense fallback={<Loading />}>
            <AudioComponents />
        </Suspense>
        <OrbitControls />
    </Canvas>
    );
}