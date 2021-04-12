import React, { Suspense, useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, useGLTF, useAnimations, Plane } from 'drei';
import Loading from '../../components/Loading';
import Game from './Game';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import * as audio from './audio';

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
            <Animal name='spider' src='assets/obj/animals/spider/scene.gltf' position={[3,-1,2]} rotation={[0,-1.0,0]} scale={[0.05,0.05,0.05]} visible={true} onPointerDown={(e)=>{
                if(e.eventObject.visible){
                    playAudio(audio.spider);
                }
            }}/>
            <Animal name='wolf' src='assets/obj/animals/wolf/scene.gltf' position={[3,-1,2]} rotation={[0,-1.0,0]} visible={false} onPointerDown={(e)=>{
                if(e.eventObject.visible){
                    playAudio(audio.wolf);
                }
            }}/>
            <Animal name='bat' src='assets/obj/animals/bat/scene.gltf' position={[3,0,2]} rotation={[0,-2.5,0]}  scale={[0.05,0.05,0.05]} visible={false}/>
            <Animal name='butterfly' src='assets/obj/animals/butterfly/scene.gltf' position={[3,0,2]}   scale={[0.03,0.03,0.03]} visible={false}/>
        </group>
        </>
    );
}

export function Scene() {

    const state = [
        {
            word:'spider',
        },
        {
            word:'wolf',
        },
        {
            word:'bat'
        },
        {
            word:'butterfly'
        }
    ];

    const { scene, camera, gl } = useThree();
    const game = useMemo(()=>{
        return new Game(state, scene, camera, gl);
    },[]);

    useFrame(()=>game.update());

    const [orbit, setOrbit] = useState(true)
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

        <Plane position={[3,0,0]} onPointerDown={changeControl} material-color='white' material-side={THREE.DoubleSide} />
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

export function playAudio(audio, volume = 1, loop = false) {
    if(audio){
        audio.currentTime = 0;
        audio.volume = volume;
        audio.loop = loop;
        audio.play();
    } else {
        console.log('there is no audio to play');
    }
}

// TIPS
/**
    boton UI -> sonido de pronunciacion de la palabra HECHO
    sonido del animal al comenzar una nueva palabra
    sonido al encajar la letra con el huevo


    escenario 3d con r3f
    sonidos, cambiar animales, mecanicas... con vanilla js

 */