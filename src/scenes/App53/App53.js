import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';
import GameComponent from './components/GameComponent';

export function Scene() {
    return(
        <>
        { /* Basic */ }
        <ambientLight />
        {/* <Loading /> */}
        <OrbitControls />

        <Suspense fallback={<Loading />}>
            <GameComponent />
        </Suspense>
        </>
    );
}

export default function App53(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    );
}