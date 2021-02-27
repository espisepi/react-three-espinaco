import React, { Suspense, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls, useGLTF } from 'drei';
import Loading from '../../components/Loading';

import Stars from '../../drei-espinaco/Stars';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics, useBox } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import { proxy, useProxy } from "valtio";

import create from 'zustand';

import * as audio from './audio';

const picturesGame = [
    {
        name: 'mesh_7',
        img: 'assets/img/gallery/lion.jpg',
        answer: ['lion','Lion'],
        soundAnimal: audio.lionSound,
        soundVocabulary: '',
        // mesh:{}
    },
    {
        name: 'mesh_4',
        img: 'assets/img/gallery/tiger.jpg',
        answer: ['tiger','Tiger'],
        soundAnimal: audio.tigerSound,
        soundVocabulary: '',
        // mesh:{}
    }
];

const useStore = create(set => ({
    current: picturesGame[0],
    index: 0,
    pictures: picturesGame,
    addMesh: (mesh,i) => set(state => {
        state.pictures[i].mesh = mesh;
        return state;
    }),
    addTexture: (texture,i) => set(state => {
        state.pictures[i].texture = texture;
        return state;
    }),
    setIndex: (num) => set(state => {
        if(num < state.pictures.length){
            state.index = num;
        } else {
            console.error('Indice es mayor que los elementos de la lista');
        }
        return state;
    }),
    setColor: (color) => set(state => {
        state.current.mesh.material.color = color;
    }),
    updateCurrent: () => set(state => {
        state.current = state.pictures[state.index];
    }),
    playSoundAnimal: () => set(state => {
        playAudio(state.current.soundAnimal);
    }),
    playAmbientSound: () => set(state => {
        playAudio(audio.ambient, 1, true);
    })
}));

function playAudio(audio, volume = 1, loop = false) {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.loop = loop;
    audio.play();
}

function GameInput(){

    const state = useStore(state => state)
    const setIndex = useStore(state => state.setIndex);
    const updateCurrent = useStore(state => state.updateCurrent);
    const setColor = useStore(state => state.setColor);
    const playSoundAnimal = useStore(state => state.playSoundAnimal);
    const playAmbientSound = useStore(state => state.playAmbientSound);
    useEffect(()=>playAmbientSound(),[]);
    
    const [input, setInput] = useState();
    const handleInput = useCallback((e)=>{
        setInput(e.target.value);
    })
    const handleSubmit = useCallback((e)=>{
        if(state.current.answer.includes(input)){
            /** Respuesta correcta */
            setColor(new THREE.Color(0,0.5,0));
            if(state.index >=  state.pictures.length - 1){
                /** Has ganado la partida */
                // animacionNave();
                alert('YOU WIN');
            } else {
                /** Continua la partida */
                setIndex(state.index + 1);
                updateCurrent();
                setColor(new THREE.Color(1,1,1));
                playSoundAnimal();
            }
        } else {
            /** respuesta incorrecta */
            setColor(new THREE.Color(0.5,0,0));
            playSoundAnimal();
        }
    })
    return (
        <>
        <input onChange={handleInput}
            style={{position:'absolute', bottom:'0px', width:'50vw', height:'30px', border:'none', backgroundColor:'#fb8500', zIndex:10000}}
            type="text"
            value={input}
        />
        <div onPointerDown={handleSubmit}
            style={{position:'absolute',
                    bottom:'0px',
                    right:'0px',
                    width:'70px', height:'20px',
                    textAlign: 'center',
                    opacity:1,
                    color:'#f1faee',
                    border:'none',
                    backgroundColor:'transparent',
                    zIndex:10000,
                    cursor:'pointer'}}
        > Enter </div>
        </>
    );
}


export function Gallery(props) {

    /** Load models */
    const {nodes} = useGLTF('assets/obj/vr_gallery_round/scene.gltf');

    /** Load textures */
    const images = picturesGame.map((p)=>
        p.img
    )
    const textures = useLoader(THREE.TextureLoader, images);

    /** Prepare zustand state */
    const pictures = useStore(state => state.pictures);
    const addMesh = useStore(state => state.addMesh);
    const addTexture = useStore(state => state.addTexture);

    useEffect(()=>{
        nodes.root.traverse((o)=>{

            pictures.forEach((p,i)=>{
                if(o.name === p.name){
                    addMesh(o,i);
                    addTexture(textures[i],i);
                    o.material.map = textures[i];
                    o.material.emissiveMap = null;
                    o.material.emissive = new THREE.Color(0,0,0);
                    if(i===0){
                        o.material.color = null;
                    }else{
                        o.material.color = new THREE.Color(0,0,0);
                    }
                } else {
                
                }
            });

            // if(o.name === 'mesh_7' || o.name === 'mesh_4' ){
                // o.material.map = textures[0];
                // o.material.emissiveMap = null;
                // o.material.emissive = new THREE.Color(0,0,0);
                // o.material.color = new THREE.Color(0,0,0);
            // }
            // console.log(o);
        })
    });
    return (
    <group {...props} >
        <primitive object={nodes.root} rotation={[-Math.PI / 2, 0 ,0 ]}/>
    </group>
    );
}

export function Scene() {
    return(
        <>
        <Stars />
        <ambientLight intensity={0.2} />
        <pointLight position={[0,10,0]} />
        <Physics gravity={[0, -100, 0]} >
            <Suspense fallback={<Loading />}>
                <Gallery scale={[20,20,20]} />
                <Player mass={200.0} height={20.0}/>
                <GroundPhysic />
            </Suspense>
        </Physics>
        {/* <OrbitControls /> */}
        </>
    );
}

export default function AppDirty(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Scene />
    </Canvas>
    <Joystick />
    <GameInput />
    </>
    );
}