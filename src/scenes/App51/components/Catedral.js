import React from 'react'
import { useGLTF } from 'drei'

export default function Catedral(props) {
    const {nodes} = useGLTF('assets/obj/googleEarth/catedral/untitled.glb');
    return (
    <group {...props} >
        <primitive object={nodes.Scene} />
    </group>
    );
}