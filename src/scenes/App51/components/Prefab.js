import React, { useEffect, useMemo } from 'react'
import { useGLTF, useAnimations, PositionalAudio } from 'drei'

import {InstancedPhysics} from '../../../drei-espinaco/instancedMesh/';

export function Catedral(props) {
    const {nodes} = useGLTF('assets/obj/googleEarth/catedral/untitled.glb');
    return (
    <group {...props} >
        <primitive object={nodes.Scene} />
    </group>
    );
}

// Conver degrees to radians
function degToRad(degrees)
{
  return degrees * (Math.PI/180);
}

export function CatedralPhysics({visible = true}) {
    const objects = useMemo(()=>([
        {
            propsPhysics: [
                {
                    args:[130.17, 46.5, 109.84],
                    position:[-59.10, 22.92, 81.93],
                    rotation: [0,0.11,0]
                }
                
            ]
        }
    ]));
    return <InstancedPhysics objects={objects} visible={visible} />
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
        <primitive ref={ref} object={nodes.RootNode} rotation={[0,Math.PI/2,0]} position={[0,-2,-4]} >
            <PositionalAudio url='assets/obj/helicopter/sound/helicopter.mp3' />
        </primitive>
    </group>
    );
}