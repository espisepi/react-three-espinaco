/**------ Boilerplate of App-X ---------*/
import React, { useEffect, useState } from 'react';
import { Canvas, useLoader, useThree } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';
import { Suspense } from 'react';
import { combineBuffer } from './combineBuffer';
import { createMesh } from './createMesh';
import { useSphere } from 'use-cannon';

function Person({}) {
    const obj = useLoader(OBJLoader, 'assets/obj/male02/male02.obj');
    return <primitive object={obj} />;
}



function Persons({}) {
    const obj = useLoader(OBJLoader, 'assets/obj/male02/male02.obj');

    const { scene } = useThree();
    useEffect(()=>{
        const positions = combineBuffer( obj, 'position' );
        const mesh = createMesh( {positions:positions, scale:1.0,x:0,y:0,z:0,color:0xff7744 });
        scene.add(mesh);
    });
    return null;
}

export function Scene() {
    return(
        <>
        <ambientLight />
        <Suspense fallback={<Loading />}>
            <Persons />
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