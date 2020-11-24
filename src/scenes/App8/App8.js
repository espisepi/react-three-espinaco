import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { OrbitControls, Stars, Stats, Plane } from 'drei';
import Loading from '../../components/Loading';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

function toRad(deg) {
    const pi = Math.PI;
    return deg * ( pi / 180 );
}

export function Scene() {
    console.error('joseangel says: Error caused by elimination of stl model from project, this app is not working now');
    const bufferGeometry = useLoader(STLLoader, 'assets/obj/louvre-antinous-mondragone.stl');
    const group = useRef();

    return(
        <>
        <Stats />
        <pointLight args={[0xffffff, 1, 0, 1]} castShadow />
        <Stars />
        <group ref={group} position={[0,-1,0]} rotation={[toRad(90),toRad(180), toRad(270) ]} scale={[0.01,0.01,0.01]}>
            <mesh
                geometry={bufferGeometry}
                material={new THREE.MeshStandardMaterial({})}
            />
        </group>
        <Plane castShadow scale={[10,10]} rotation={[-toRad(90),0,0]} position={[0,-1,0]} />
        <OrbitControls />
        </>
    );
}

export default function AppDirty(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}} shadowMap>
        <Suspense fallback={<Loading />}>
        <Scene />
        </Suspense>
    </Canvas>
    );
}