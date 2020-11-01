import React, {useRef} from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

import * as THREE from 'three';

function Curve(props) {

    
    //Create a closed wavey loop
    const curve = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( -10, 0, 10 ),
        new THREE.Vector3( -5, 5, 5 ),
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 5, -5, 5 ),
        new THREE.Vector3( 10, 0, 10 )
    ] );

    const points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

    return (
        <line
            geometry={geometry}
            material={material}
        />
        
    );


}

export default function App2(props) {

    return (
    <Canvas className="canvas" >
        <ambientLight />
        {/* <Loading /> */}
        <Curve />
        <OrbitControls />
    </Canvas>
    );
}