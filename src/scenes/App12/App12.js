import React, {useEffect, useState, useCallback} from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';
import Stars from '../../drei-espinaco/Stars';

import SimondevPersonController from '../../drei-espinaco/simondev/SimondevPersonController';

// https://loopmode.github.io/react-nipple/
// https://codepen.io/YoannM/pen/gapmMG
import ReactNipple from 'react-nipple';

export function Scene() {

    return(
        <>
        <ambientLight />
        <Stars />
        <SimondevPersonController />

        </>
    );
}

export default function App12(props) {

    const handleEvent = useCallback((evt, data)=>{

        if (data?.direction?.y === 'up') {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'w', keyCode: '87' }));
        } else {
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'w', keyCode: '87' }));
        }
        if (data?.direction?.y === 'down') {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 's', keyCode: '83' }));
        } else {
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 's', keyCode: '83' }));
        }
        if (data?.direction?.x === 'left' && ( data?.angle?.degree >= 135.0 && data?.angle?.degree <= 225.0 ) ) {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', keyCode: '65' }));
        } else {
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'a', keyCode: '65' }));
        }
        if (data?.direction?.x === 'right'  && ( data?.angle?.degree <= 45.0 || data?.angle?.degree >= 315.0 ) ) {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', keyCode: '68' }));
        } else {
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'd', keyCode: '68' }));
        }
        if (data?.force >= 1.0) {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'shift', keyCode: '16' }));
        } else {
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'shift', keyCode: '16' }));
        }

    },[])

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position: 'absolute'}}>
        <Scene />
    </Canvas>

    <div>
        <ReactNipple
            options={{mode: 'dynamic', position: {top: '0', left: '0'}}}
            style={{
                // outline: `1px dashed red`,
                width: '100%',
                height: '100vh',
                position: `absolute`,
                zIndex: 10,
            }}

            onStart={handleEvent}
            onEnd={handleEvent}
            onMove={handleEvent}
            onDir={handleEvent}
            onPlain={handleEvent}
            onShown={handleEvent}
            onHidden={handleEvent}
            onPressure={handleEvent}
        />
    </div>
    
    </>
    );
}