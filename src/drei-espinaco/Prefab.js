import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from 'drei';

export function Pla({}) {
    const gltf = useGLTF('assets/obj/googleEarth/pla/untitled.glb');
    return (
    <>
    <primitive object={gltf.scene} position={[1000,-40,-1000]} scale={[20,20,20]} dispose={null} />
    </>
    );
}