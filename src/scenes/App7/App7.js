/** CLIP GataCattana (L) */

import React, { Suspense, useState, useCallback } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
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


export function Scene({top = 0}) {

    /* Normalizamos la variable top */
    const { size } = useThree();
    const scrollMax = size.height * 4;
    const topNormalized = top / scrollMax;

    return (
        <>
        <directionalLight args={[ 0xffffff, 0.54 ]} castShadow={true} shadow-mapSize={new THREE.Vector2( 1024, 1024 )} />
        <hemisphereLight args={[0xffffff, 0xffffff, 0.61]} />
        <Suspense fallback={Loading} >
        <AudioComponents />
        </Suspense>
        {/* <Stars /> */}

        {/* <Physics gravity={[0, -30, 0]}>
			<Ground position={[0,-1,0]} visible={false} />
			<Player position={[0, 20, 20]} />
		</Physics>
        <PointerLockControls /> */}

        <OrbitControls />
        </>
    );
}

export default function App7(props) {
    // const pages = 4;
    const [ top, setTop ] = useState(0);
    // const onScroll = useCallback(e => setTop(e.target.scrollTop), [])

    return (
    <>
        <Canvas className="canvas" style={{backgroundColor:'#000000'}} >
            <Scene top={top} />
        </Canvas>
        {/* <div className="scroll-container" onScroll={onScroll}>
            <div style={{ height: `${pages * 100}vh` }} />
        </div> */}
    </>
    );
}




/* --------------- WASD FPS CONTROLS ----------------- */
// export default function App7(props) {

//     return (
//     <Canvas className="canvas" style={{backgroundColor:'#000000'}} >
//         <directionalLight args={[ 0xffffff, 0.54 ]} castShadow={true} shadow-mapSize={new THREE.Vector2( 1024, 1024 )} />
//         <hemisphereLight args={[0xffffff, 0xffffff, 0.61]} />
//         <Suspense fallback={Loading} >
//         <AudioComponents />
//         </Suspense>
//         <Stars />

//         <Physics gravity={[0, -30, 0]}>
// 			<Ground position={[0,-1,0]} visible={false} />
// 			<Player position={[0, 20, 20]} />
// 		</Physics>
//         <PointerLockControls />

//         {/* <OrbitControls /> */}
        
//     </Canvas>
//     );
// }