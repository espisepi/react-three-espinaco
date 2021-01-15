import React from 'react';
import Plane from '../../../drei-espinaco/Plane';

export default function Scene02() {
    return(
        <>
        <ambientLight />
        <group scale={[10,10,10]}>
        <Plane args={[50,50,50,50]}/>
        <Plane args={[50,50,50,50]} rotation={[0, -Math.PI / 2, 0]} position={[20,0,0]}/>
        <Plane args={[50,50,50,50]} rotation={[0, -Math.PI / 2, 0]} position={[-20,0,0]}/>
        </group>
        </>
    );
}