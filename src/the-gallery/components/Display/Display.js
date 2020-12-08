import React, { useMemo } from 'react';
import { useBox } from "use-cannon";
import * as THREE from 'three';

const Display = ({ position, size }) => {

    const [ref] = useBox(() => ({ 
        type: "static",         
        args: [0.1, 16.5, 2],
        position  
    }));

    const alphaMap = useMemo(() => new THREE.TextureLoader().load("assets/Textures/BiancoMarble/BIANCO-ao.jpg"), []);

    const diffuseMap = useMemo(() => new THREE.TextureLoader().load("assets/Textures/BiancoMarble/BIANCO-diffuse.jpg"), []);

    const normalMap = useMemo(() => new THREE.TextureLoader().load("assets/Textures/BiancoMarble/BIANCO-normal.jpg"), []);

    return (
        <>
        <mesh
            ref={ref}
            receiveShadow
            castShadow
        >
            <boxBufferGeometry attach="geometry" args={size} />
            <meshStandardMaterial 
                attach="material" 
                // clearcoat={1}
                roughness={0.5}
            >
                <primitive attach="alphaMap" object={alphaMap} />
                <primitive attach="map" object={diffuseMap} />
                <primitive attach="normalMap" object={normalMap} />
            </meshStandardMaterial>
        </mesh>
        </>
    );
}

export default Display;

