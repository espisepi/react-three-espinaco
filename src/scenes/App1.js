import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { AudioComponents } from '../drei-espinaco/VideoPoints';
import Loading from '../components/Loading';
import Stars from '../drei-espinaco/Stars';

import SimondevPersonController from '../drei-espinaco/simondev/SimondevPersonController';
import Joystick from '../drei-espinaco/Joystick';
import Fullscreen from '../drei-espinaco/Fullscreen';

export default function App1(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position: 'absolute'}}>
        <ambientLight />
        <Suspense fallback={<Loading />}>
            <AudioComponents scale={[1,1,1]}/>
        </Suspense>
        <Stars />
        <SimondevPersonController />
        {/* <OrbitControls /> */}
    </Canvas>
    <Joystick />
    <Fullscreen />
    </>
    );
}