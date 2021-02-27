import React, { Suspense, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useThree } from 'react-three-fiber';
import { OrbitControls, useGLTF } from 'drei';
import Loading from '../../components/Loading';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics, useBox } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import { proxy, useProxy } from "valtio";

import create from 'zustand'

const picturesGame = [
    {
        name: 'mesh_7',
        img: 'assets/img/gallery/lion.jpg',
        answer: ['lion','Lion'],
        soundAnimal: '',
        soundVocabulary: '',
        // mesh:{}
    },
    {
        name: 'mesh_4',
        img: 'assets/img/gallery/lion.jpg',
        answer: ['tiger','Tiger'],
        soundAnimal: '',
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
    })
  }))

const stateRaw = {
    index: 0,
    current: picturesGame[0],
    array: picturesGame
};

const state = proxy(stateRaw);


function GameInput(){

    // const snapState = useProxy(state);

    const state = useStore(state => state)
    console.log(state);

    useEffect(()=>{
        if(state.current.mesh){
            state.current.mesh.material.map = state.current.texture;
        }
    },[state.current.mesh]);

    const [input, setInput] = useState();
    const handleInput = useCallback((e)=>{
        setInput(e.target.value);
    })
    const handleSubmit = useCallback((e)=>{
        if(state.current.answer.includes(input)){
            // respuesta correcta
            state.current.mesh.material.color = new THREE.Color(0,0.5,0);
        } else {
            // respuesta incorrecta
            state.current.mesh.material.color = new THREE.Color(0.5,0,0);
        }
    })
    return (
        <>
        <input onChange={handleInput}
            style={{position:'absolute', bottom:'0px', width:'50vw', height:'30px', border:'none', backgroundColor:'#111111', zIndex:10000}}
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
    textures.forEach((t,i)=>{
        state.array[i].texture = t;
    });

    /** load state */
    const snapState = useProxy(state);

    const addMesh = useStore(state => state.addMesh);
    const addTexture = useStore(state => state.addTexture);

    useEffect(()=>{
        nodes.root.traverse((o)=>{

            state.array.forEach((p,i)=>{
                if(o.name === p.name){
                    addMesh(o,i);
                    addTexture(textures[i],i);
                } else {
                
                }
            });

            if(o.name === 'mesh_7' || o.name === 'mesh_4' ){
                // o.material.map = textures[0];
                o.material.emissiveMap = null;
                o.material.emissive = new THREE.Color(0,0,0);
                o.material.color = new THREE.Color(0,0,0);
            }
            // console.log(o);
        })
    });
    // console.log(state.array);
    return (
    <group {...props} >
        <primitive object={nodes.root} rotation={[-Math.PI / 2, 0 ,0 ]}/>
    </group>
    );
}

export function Scene() {
    return(
        <>
        {/* <ambientLight /> */}
        <pointLight position={[0,2,0]} />
        <Physics gravity={[0, -100, 0]} >
            <Suspense fallback={<Loading />}>
                <Gallery scale={[10,10,10]} />
                <Player mass={200.0} height={4.0}/>
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