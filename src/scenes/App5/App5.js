import React, {Suspense} from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';



import useYScroll from '../../helpers/useYScroll';
import { a as aDom } from '@react-spring/web';
import { a } from '@react-spring/three';

function FixImage() {
    const {camera} = useThree();
    camera.position.x = 0.01;
    camera.lookAt(new THREE.Vector3(0,3,0));
    return null;
}

export function Scene({y=0}) {
    return(
        <>
        <ambientLight />
        <Suspense fallback={<Loading/>}>
            <Background url='assets/musica/elane-low.mp4' />
            {/* <Ocean geometry={new THREE.BoxBufferGeometry( 100, 500, 100 )} position={[0, 49, 0 ]}  /> */}
        </Suspense>
        <a.group position-z={y.to((y) => (y / 500) * 50)}>
            {/* <mesh>
                <boxBufferGeometry attach='geometry' args={[2,2,2]} />
                <meshBasicMaterial attach='material' color='red' />
            </mesh> */}
            <Ocean geometry={new THREE.BoxBufferGeometry( 100, 500, 100 )} position={[0, 49, 0 ]}  />
        </a.group>
        <FixImage />
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App5(props) {
    const [y] = useYScroll([-100, 2400], { domTarget: window })
    
    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene y={y}/>
    </Canvas>
    <aDom.div className="bar" style={{ height: y.interpolate([-100, 2400], ['0%', '100%']) }} />
    </>
    );
}


/* ---------------- WASD Controls -------------------- */
// import { Physics } from 'use-cannon';
// import { Ground } from '../../components/Ground';
// import { Player } from '../../components/Player';
// import { OrbitControls, PointerLockControls } from 'drei';

// export default function App5(props) {

//     return (
//     <Canvas className="canvas" style={{backgroundColor:'#000000'}} camera-rotation={[0,Math.PI/2,0]}>
//         <directionalLight args={[ 0xffffff, 0.54 ]} castShadow={true} shadow-mapSize={new THREE.Vector2( 1024, 1024 )} />
//         <hemisphereLight args={[0xffffff, 0xffffff, 0.61]} />

//         <Background url='assets/musica/elane-low.mp4' />
//         <Ocean geometry={new THREE.BoxBufferGeometry( 100, 500, 100 )} position={[0,49,0]} />

//         <Physics gravity={[0, -30, 0]}>
// 			<Ground position={[0,-1,0]} visible={false} />
// 			<Player position={[0, 50, -100]} />
// 		</Physics>
//         <PointerLockControls />

//         {/* <OrbitControls /> */}
        
//     </Canvas>
//     );
// }

/* Instrucciones para que funcione el efecto visual del oceano (de chiste churra)
* Most important:
*   gl.toneMapping = 0;
*   gl.outputEncoding = 3000;
* Rotar [0,Math.PI/2,0] tanto la camara como el mesh del oceano
* <Player position={[0, 50, 20]} /> (para que la escena empiece en la cuspide del cubo y se renderice el video dentro del cubo)
* Moverse un poquito por el escenario
*/