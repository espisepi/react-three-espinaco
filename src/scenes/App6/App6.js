/** CLIP GataCattana (L) */

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import { OrbitControls, PointerLockControls } from 'drei';
import * as THREE from 'three';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { Physics } from 'use-cannon';
import { Ground } from '../../components/Ground';
import { Player } from '../../components/Player';

function AssetGltf({ url, speed = 1 }) {
    const { nodes, materials, animations } = useLoader(GLTFLoader, url);
    const [ mixer ] = useState(() => new THREE.AnimationMixer());
    const group = useRef();
    useEffect(()=> void mixer.clipAction(animations[0], group.current).play(),[]);
    useFrame((state, delta) => {
        mixer.update(delta * speed);
    });
    return (
        <group ref={group} dispose={null} scale={[0.1,0.1,0.1]} position={[0,-7,0]} rotation={[0,Math.PI / 2, 0]}>
            <primitive object={nodes.mesh_0} />
        </group>
    );
}

export default function App6(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}} camera-rotation={[0,Math.PI/2,0]}>
        <directionalLight args={[ 0xffffff, 0.54 ]} castShadow={true} shadow-mapSize={new THREE.Vector2( 1024, 1024 )} />
        <hemisphereLight args={[0xffffff, 0xffffff, 0.61]} />

        <Background url='assets/musica/gotham.mp4' />
        <Ocean geometry={new THREE.BoxBufferGeometry( 500, 500, 500 )} position={[0,240,0]} />

        <Suspense fallback={<Loading />}>
            <AssetGltf url="assets/obj/Horse.glb" />
        </Suspense>

        <Physics gravity={[0, -30, 0]}>
			<Ground position={[0,-1,0]} visible={false} />
			<Player position={[0, 50, -100]} />
		</Physics>
        <PointerLockControls />

        {/* <OrbitControls /> */}
        
    </Canvas>
    );
}

/* Instrucciones para que funcione el efecto visual del oceano (de chiste churra)
* Rotar [0,Math.PI/2,0] tanto la camara como el mesh del oceano
* <Player position={[0, 50, 20]} /> (para que la escena empiece en la cuspide del cubo y se renderice el video dentro del cubo)
* Moverse un poquito por el escenario
*/