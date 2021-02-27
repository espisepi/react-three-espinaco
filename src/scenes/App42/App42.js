import React, { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls, useGLTF } from 'drei';
import Loading from '../../components/Loading';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics, useBox } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

const picturesGame = [
    {
        img: 'assets/img/gallery/lion.jpg',
        answer: ['lion','Lion'],
        soundAnimal: '',
        soundVocabulary: ''
    },
    {
        img: 'assets/img/gallery/lion.jpg',
        answer: ['tiger','Tiger'],
        soundAnimal: '',
        soundVocabulary: ''
    }
];

export function Gallery(props) {
    const {nodes} = useGLTF('assets/obj/vr_gallery_round/scene.gltf');
    const images = picturesGame.map((p)=>
        p.img
    )
    // console.log(images);

    const textures = useLoader(THREE.TextureLoader, images);
    console.log(textures)
    useEffect(()=>{
        nodes.root.traverse((o)=>{
            if(o.name === 'mesh_7'){
                o.material.map = textures[0];
                o.material.emissiveMap = null;
                o.material.emissive = new THREE.Color(0,0,0);
            }
            console.log(o);
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
    </>
    );
}