import React, {Suspense, useEffect} from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls, Box } from 'drei';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';
import MusicPoints,{AudioComponents} from '../../drei-espinaco/MusicPoints';
import Camera from '../../components/Camera';

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
    useEffect(()=>{
        console.log(y.to((y) => (y / 500) * 25));
    },[y])
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

export default function AppDirty(props) {
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