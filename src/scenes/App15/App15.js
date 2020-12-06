import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

import App from '../../the-gallery/components/App/App';

export function Scene() {
    return(
        <>
        <ambientLight />
        <Loading />
        <OrbitControls />
        </>
    );
}

export default function AppDirty(props) {

    return (
        <App />
    // <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
    //     <Scene />
    // </Canvas>
    );
}