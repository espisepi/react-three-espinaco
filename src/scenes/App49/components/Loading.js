import React, { useEffect, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Text } from 'drei';
import { wellcomeSound, playAudio, stopAudio } from '../audios/index';

export default function Loading() {
    
    const mesh = useRef(null);

    useFrame(() => {
        if( mesh ) {
            mesh.current.rotation.y += 0.05;
        }
    })

    // Audio not work if user not interactue (iphone error)
    // useEffect(()=>{
    //     playAudio(wellcomeSound, 1, true);
    //     return () => {
    //         stopAudio(wellcomeSound);
    //     }
    // },[])

    return (
        <group >
            <mesh ref={mesh}>
                <boxBufferGeometry attach='geometry' args={[1,1,1]} />
                <meshStandardMaterial attach='material' color='hotpink' />
            </mesh>
            <Text position={[0,-2,0]} fontSize={ 1.0 }>
                Loading...
            </Text>
        </group>
    );
}