import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Text, Html } from 'drei';

export default function Loading() {
    
    const { camera } = useThree();
    const [frozenPosition] = useState(camera.position);
    const mesh = useRef(null);
    const group = useRef();
    useFrame(({camera, scene}) => {
        camera.position.set(frozenPosition.x, frozenPosition.y, frozenPosition.z);
        if( group ) {
            group.current.position.set(frozenPosition.x,frozenPosition.y,frozenPosition.z - 10);
        }
        if( mesh ) {
            mesh.current.rotation.y += 0.05;
        }
    })

    useEffect(()=>{
        const element = document.getElementsByClassName('ReactNipple')[0]
        if(element) {
            element.style.pointerEvents = 'none';
        }
        return () => {
            // desbloquear el joystick
            if(element) {
                element.style.pointerEvents = 'auto';
            }
        }
    })

    return (
        <>
        <ambientLight />
        <group ref={group} position={[frozenPosition.x,frozenPosition.y,frozenPosition.z - 10]}>
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