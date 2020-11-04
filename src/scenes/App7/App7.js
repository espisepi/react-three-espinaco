/** CLIP GataCattana (L) */

import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, PointerLockControls } from 'drei';
import * as THREE from 'three';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';

import { Physics } from 'use-cannon';
import { Ground } from '../../components/Ground';
import { Player } from '../../components/Player';

import {AudioComponents } from '../../drei-espinaco/VideoPoints';
import Stars from '../../drei-espinaco/Stars';

export default function App7(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}} >
        <directionalLight args={[ 0xffffff, 0.54 ]} castShadow={true} shadow-mapSize={new THREE.Vector2( 1024, 1024 )} />
        <hemisphereLight args={[0xffffff, 0xffffff, 0.61]} />
        <Suspense fallback={Loading} >
        <AudioComponents />
        </Suspense>
        <Stars />

        <Physics gravity={[0, -30, 0]}>
			<Ground position={[0,-1,0]} visible={false} />
			<Player position={[0, 20, 20]} />
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