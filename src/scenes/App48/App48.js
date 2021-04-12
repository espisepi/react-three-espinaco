import React, { Suspense, useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, useGLTF, useAnimations, Plane } from 'drei';
import Loading from '../../components/Loading';
import Game from './Game';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function Environmnet() {
    const texture = useLoader(THREE.TextureLoader, 'assets/env/360jpg/lilienstein.jpg');
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;

    const texturePlane = useLoader(THREE.TextureLoader, 'assets/Textures/Grass/GrassGreenTexture0002.jpg');
    texturePlane.wrapS = THREE.RepeatWrapping;
    texturePlane.wrapT = THREE.RepeatWrapping;
    texturePlane.repeat.set( 300, 300 );
    return(
        <group name="environment">
            <mesh visible={true} rotation={[0,Math.PI/2,0]}>
                <sphereBufferGeometry args={[100, 60, 40]} />
                <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
            </mesh>
            <mesh visible={true} rotation={[Math.PI/2,0,0]} position={[0,-1,0]}>
                <planeBufferGeometry args={[500, 500]} />
                <meshBasicMaterial map={texturePlane} side={THREE.BackSide} />
            </mesh>
        </group>
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
        <group name='animals' position={[0,0,0]}>
            <Animal name='spider' src='assets/obj/animals/spider/scene.gltf' position={[3,-1,2]} rotation={[0,-1.0,0]} scale={[0.05,0.05,0.05]} visible={true}/>
            <Animal name='wolf' src='assets/obj/animals/wolf/scene.gltf' position={[3,-1,2]} rotation={[0,-1.0,0]} visible={false} />
            <Animal name='eagle' src='assets/obj/animals/bat/scene.gltf' position={[6,0,-3]} scale={[0.1,0.1,0.1]} visible={false}/>
            <Animal name='eagle' src='assets/obj/animals/butterfly/scene.gltf' position={[6,0,-3]} scale={[0.05,0.05,0.05]} visible={false}/>
        </group>
        </>
    );
}

export function Scene() {

    const state = [
        {
            word:'spider',
            modelSrc:'assets/obj/animals/horse/scene.gltf',
            model: undefined,
            modelAtt:{
                position:[0,0,0],
                rotation:[0,0,0],
                scale:[1,1,1]
            }
        },
        {
            word:'wolf',
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

    useFrame(()=>game.update());

    const [orbit, setOrbit] = useState(false)
    const changeControl = useCallback(()=>{
        game.disposeControls();
        if(orbit){
            game.createOrbitControls();
        }else{
            camera.position.set(0,0,5);
            camera.rotation.set(0,0,0);
            game.createDragControls();
        }
        setOrbit(!orbit);
    })

    return(
        <>
        <ambientLight />
        <Animals />
        <Environmnet />

        <Plane position={[3,0,0]} onClick={changeControl} />
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