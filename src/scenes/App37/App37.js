/**------ Boilerplate of App-X ---------*/
import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

function Persons({}) {
    return null;
}

export function Scene() {
    return(
        <>
        <ambientLight />
        <Persons />
        <Loading />
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