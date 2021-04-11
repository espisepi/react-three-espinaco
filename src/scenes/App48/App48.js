import React, { Suspense, useRef, useState, useCallback, useMemo } from 'react';
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
            model: undefined,
            modelAtt:{
                position:[0,0,0],
                rotation:[0,0,0],
                scale:[1,1,1]
            }
        },
        {
            word:'fish',
            modelSrc:'assets/obj/animals/fish/scene.gltf',
            model: undefined,
            modelAtt:{
                position:[0,0,0],
                rotation:[0,Math.PI/2,Math.PI/2],
                scale:[1,1,1]
            }
        }
    ];

    // load models and save into state
    const srcModels = state.map( c => c.modelSrc );
    const animals = useLoader(GLTFLoader, srcModels)
    state.forEach( (c,i) => c.model = animals[i] );

    const { scene, camera, gl } = useThree();

    const game = useMemo(()=>{
        return new Game(state, scene, camera, gl);
    },[]);

    useFrame(({clock})=> game.update(clock.getDelta()));

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

// TIPS
/**
    boton UI -> sonido de pronunciacion de la palabra
    sonido del animal al comenzar una nueva palabra

    escenario 3d con r3f
    sonidos, cambiar animales, mecanicas... con vanilla js

 */