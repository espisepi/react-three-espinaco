import React, {Suspense} from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

import MusicPoints,{AudioComponents} from '../../drei-espinaco/MusicPoints';

export function Scene() {
    return(
        <>
        <ambientLight />
        <Suspense fallback={<Loading/>}>
            <AudioComponents />
        </Suspense>
        <OrbitControls />
        </>
    );
}

export default function AppDirty(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    );
}