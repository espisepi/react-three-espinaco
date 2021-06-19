import React, { useEffect } from 'react'
import { useGLTF, useAnimations, PositionalAudio } from 'drei'

export function Catedral(props) {
    const {nodes} = useGLTF('assets/obj/googleEarth/catedral/untitled.glb');
    return (
    <group {...props} >
        <primitive object={nodes.Scene} />
    </group>
    );
}

export function Helicopter(props) {

    // { nodes, materials, animations }
    const {nodes, animations} = useGLTF('assets/obj/helicopter/scene.gltf');
    // { ref, mixer, names, actions, clips } 
    const { ref, actions } = useAnimations(animations)

    useEffect(() => {
        actions.CINEMA_4D_Main.play()
    })

    return (
    <group {...props} >
        <primitive ref={ref} object={nodes.RootNode} rotation={[0,Math.PI/2,0]} >
            {/* <PositionalAudio url='assets/obj/helicopter/sound/helicopter.mp3' /> */}
        </primitive>
    </group>
    );
}