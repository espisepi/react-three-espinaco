import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Text, Html } from 'drei';

export default function Loading() {
    
    const mesh = useRef(null);

    useFrame(({camera, scene}) => {
        camera.position.set(0,0,-5);
        if( mesh ) {
            mesh.current.rotation.y += 0.05;
        }
    })

    return (
        <>
        <ambientLight />
        <group position={[0,0,-10]}>
            <mesh ref={mesh}>
                <boxBufferGeometry attach='geometry' args={[1,1,1]} />
                <meshStandardMaterial attach='material' color='red' wireframe={true} />
            </mesh>
            <Text position={[0,-2,0]} fontSize={ 1.0 }>
                Loading...
            </Text>
        </group>
        </>
    );
}