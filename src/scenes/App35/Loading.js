import React, { useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Text, Html } from 'drei';

export default function Loading() {
    
    const { camera } = useThree();
    const [frozenPosition] = useState(camera.position);
    const mesh = useRef(null);
    useFrame(({camera, scene}) => {
        camera.position.set(frozenPosition.x, frozenPosition.y, frozenPosition.z);
        if( mesh ) {
            mesh.current.rotation.y += 0.05;
        }
    })

    return (
        <>
        <ambientLight />
        <group position={[frozenPosition.x,frozenPosition.y,frozenPosition.z - 10]}>
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