import React, { Suspense, useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, useGLTF, useAnimations, Plane, useFBX, Text } from 'drei';
import Loading from './Loading';
import Game from './Game';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import * as Audio from './audio';

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

function WinnerModel({src, ...props}) {
    const model = useFBX(src);
    useEffect(()=>{
        model.traverse( o => {
            if(o.name === 'polySurface3_0'){
                o.rotation.set(0,0,0);
                o.visible = false;
            }
        })
    },[model])
    const mixer = new THREE.AnimationMixer(model);
    model.animations.forEach( (clip,i) => {
        if(i==0){
            const action = mixer.clipAction(clip);
            action.play();
        }
    });
    useFrame((state, delta) => {
        if(mixer){
            mixer.update(delta);
        }
    })
    return (
        <primitive object={model} {...props} />
    );
}

function Animals({state}){
    
    return (
        <>
        <group name='animals' position={[0,0,0]}>
            <Animal name='spider' src='assets/obj/animals/spider/scene.gltf' position={[3,-1,2]} rotation={[0,-1.0,0]} scale={[0.05,0.05,0.05]} visible={false} onPointerDown={(e)=>{
                if(e.eventObject.visible){
                    playAudio(Audio.spider);
                }
            }}/>
            <Animal name='wolf' src='assets/obj/animals/wolf/scene.gltf' position={[3,-1,2]} rotation={[0,-1.0,0]} visible={false} onPointerDown={(e)=>{
                if(e.eventObject.visible){
                    playAudio(Audio.wolf);
                }
            }}/>
            <Animal name='bat' src='assets/obj/animals/bat/scene.gltf' position={[3,0,2]} rotation={[0,-2.5,0]}  scale={[0.05,0.05,0.05]} visible={false} onPointerDown={(e)=>{
                if(e.eventObject.visible){
                    playAudio(Audio.bat);
                }
            }}/>
            <Animal name='butterfly' src='assets/obj/animals/butterfly/scene.gltf' position={[3,0,2]}   scale={[0.03,0.03,0.03]} visible={false} onPointerDown={(e)=>{
                if(e.eventObject.visible){
                    playAudio(Audio.butterfly);
                }
            }}/>
            <Animal name='cow' src='assets/obj/animals/cow/scene.gltf' position={[3,-1,2]} rotation={[0,0.5,0]} scale={[0.01,0.01,0.01]} visible={false} onPointerDown={(e)=>{
                if(e.eventObject.visible){
                    playAudio(Audio.cow);
                }
            }}/>
            <Animal name='cat' src='assets/obj/animals/cat/scene.gltf' position={[3,-1,2]} rotation={[0,-2.5,0]} scale={[0.05,0.05,0.05]} visible={false} onPointerDown={(e)=>{
                if(e.eventObject.visible){
                    playAudio(Audio.cat);
                }
            }}/>
            <Animal name='mouse' src='assets/obj/animals/mouse/scene.gltf' position={[3,-0.6,2]} rotation={[0,2.6,0]} scale={[0.01,0.01,0.01]} visible={false} onPointerDown={(e)=>{
                if(e.eventObject.visible){
                    playAudio(Audio.mouse);
                }
            }}/>
            <WinnerModel name='winner' src='assets/obj/animals/tigerSamba.fbx' position={[3,-1,2]} rotation={[0,0,0]} scale={[0.0022,0.0022,0.0022]} visible={false} onPointerDown={(e)=>{
                if(e.eventObject.visible){
                    playAudio(Audio.youwin);
                }
            }}/>
        </group>
        </>
    );
}

function GameReact({texture}) {
    const state = [
        {
            word:'spider',
        },
        {
            word:'bat'
        },
        {
            word:'cow'
        },
        {
            word:'wolf',
        },
        {
            word:'cat'
        },
        {
            word:'mouse'
        },
        {
            word:'butterfly'
        },
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
    });

    return (
        <Plane position={[3,0.5,0]} onPointerDown={changeControl} material-color='white' material-side={THREE.DoubleSide} material-map={texture} />
    );

}

export function Scene() {

    const [option, setOption] = useState(0);
    const changeOption = useCallback((numOption)=>{
        setOption(numOption);
    });

    useEffect(()=>{
        playAudio(Audio.lofiAmbient,1.0,true);
    },[]);

    const texture360 = useLoader( THREE.TextureLoader, 'assets/img/icon/360.jpg');

    return(
        <>
        <ambientLight />
        <Animals />
        <Environmnet />

        {
            option === 0 ? 
                (
                    <>
                        <group onPointerDown={()=>changeOption(1)}>
                            {/* <Plane material-color='#2d6a4f' position={[-2,0,0]}/> */}
                            <Text position={[0,0,1]} fontSize={ 1.0 }>
                                Start
                            </Text>
                        </group>
                    </>
                ) : null
        }
        {
            option === 1 ?
                (
                    <GameReact texture={texture360} />
                ) : null
        }

        {/* <Loading /> */}
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App48(props) {

    return (
    <Canvas id="canvas" className="canvas" style={{backgroundColor:'#000000'}}>
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
    </Canvas>
    );
}

export function playAudio(audio, volume = 1, loop = false) {
    Audio.playAudio(audio,volume,loop);
}

export function stopAudio(audio) {
    Audio.stopAudio(audio);
}

// TIPS
/**
    boton UI -> sonido de pronunciacion de la palabra HECHO
    sonido del animal al comenzar una nueva palabra
    sonido al encajar la letra con el huevo


    escenario 3d con r3f
    sonidos, cambiar animales, mecanicas... con vanilla js

 */