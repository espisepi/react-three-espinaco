import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stats } from 'drei';
import { AudioComponents } from '../drei-espinaco/VideoPointsShader';
import Loading from '../components/Loading';
import Stars from '../drei-espinaco/Stars';

import SimondevPersonController from '../drei-espinaco/simondev/SimondevPersonController';
import Joystick from '../drei-espinaco/Joystick';
import Fullscreen from '../drei-espinaco/Fullscreen';

export default function App1(props) {

    const [muted, setMuted] = useState(0);
    const changeMuted = useCallback(() => {
        setMuted(m => !m)
    });

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position: 'absolute'}}>
        <Stats />
        <ambientLight />
        <Suspense fallback={<Loading />}>
            <AudioComponents scale={[1.0,1.0,1.0]} muted={muted} />
        </Suspense>
        <Stars />
        <SimondevPersonController />
        {/* <OrbitControls /> */}
    </Canvas>
    <Joystick />
    <Fullscreen />
    <div onClick={changeMuted} style={{ position:'absolute', width:'20px', height:'20px', bottom: 120, borderStyle: 'dashed', color: '#e60005', zIndex: 20 }}></div>
    </>
    );
}