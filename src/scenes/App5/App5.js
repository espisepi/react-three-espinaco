import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Sky, Box } from 'drei';
import * as THREE from 'three';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';

export default function App5(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        {/* <ambientLight /> */}
        <directionalLight args={[ 0xffffff, 0.54 ]} castShadow={true} shadow-mapSize={new THREE.Vector2( 1024, 1024 )} />
        <hemisphereLight args={[0xffffff, 0xffffff, 0.61]} />
        {/* <Loading /> */}
        <OrbitControls />
        <Background />
        {/* <Sky /> */}
        <Ocean geometry={new THREE.BoxBufferGeometry( 1000, 1000, 1000 )} position={[0,499,0]} />
        
    </Canvas>
    );
}