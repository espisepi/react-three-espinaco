import React, { Suspense, useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, useGLTF, useAnimations } from 'drei';
import Loading from '../../components/Loading';
import Game from './Game';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function Environmnet() {
    const texture = useLoader(THREE.TextureLoader, 'assets/env/360jpg/heaven.jpg');
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;

    return(
        <mesh visible={true}>
            <sphereBufferGeometry args={[100, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
    );
}

function Animal({src, ...props}){
    const model = useGLTF(src);
    const mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach(clip => {
        const action = mixer.clipAction(clip);
        action.play();
    });
    useFrame((state, delta) => {
        if(mixer){
            mixer.update(delta);
        }
    })
    return (
        <primitive object={model.scene} {...props} />
    );
}

function Animals({state}){
    
    return (
        <>
        <Animal name='horse' src='assets/obj/animals/horse/scene.gltf' position={[0,0,-3]} visible={true} />
        <Animal name='fish' src='assets/obj/animals/fish/scene.gltf' position={[-3,0,-3]} />
        </>
    );
}

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
    console.log(scene)
    const game = useMemo(()=>{
        return new Game(state, scene, camera, gl);
    },[]);

    useFrame(({clock})=> game.update(clock.getDelta()));

    return(
        <>
        <ambientLight />
        <Animals />
        <Environmnet />
        {/* <Loading /> */}
        <OrbitControls />
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