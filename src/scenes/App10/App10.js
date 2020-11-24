import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { OrbitControls, Stats, PointerLockControls } from 'drei';
import Loading from '../../components/Loading';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

import { Physics } from 'use-cannon';
import { Ground } from '../../components/Ground';
import { Player } from '../../components/Player';

import Stars from '../../drei-espinaco/Stars';

export function Scene() {
    const gltf = useLoader(GLTFLoader, 'assets/obj/cabezaPiedra.glb');
    const group = useRef();

    return(
        <>
        <Stats />
        <Stars />
        <group position={[0,-5,0]} scale={[10,10,10]} >
            <primitive object={gltf.scene} />
        </group>
        <Physics gravity={[0, -30, 0]}>
			<Ground position={[0,-1,0]} visible={false} />
			<Player position={[0, 1, 20]} godMode={false} />
		</Physics>
        <PointerLockControls />
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App10(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}} shadowMap >
        <ambientLight />
        <Suspense fallback={<Loading />}>
        <Scene />
        </Suspense>
    </Canvas>
    );
}