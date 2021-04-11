import React, { Suspense, useRef, useState, useCallback } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';
import Game from './Game';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Scene() {

    const state = [
        {
            word:'horse',
            modelSrc:'assets/obj/animals/horse/scene.gltf',
            model: undefined

        },
        {
            word:'fish',
            modelSrc:'assets/obj/animals/fish/scene.gltf',
            model: undefined
        }
    ];

    // load models and save into state
    const srcModels = state.map( c => c.modelSrc );
    const animals = useLoader(GLTFLoader, srcModels)
    state.forEach( (c,i) => c.model = animals[i] );

    const { scene, camera, gl } = useThree();
    const game = new Game(state, scene, camera, gl);

    return(
        <>
        <ambientLight />
        {/* <Loading /> */}
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App48(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
    </Canvas>
    );
}