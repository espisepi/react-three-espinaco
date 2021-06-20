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
                },
                {
                    args:[11.50, 48.44, 18.37],
                    position:[-122.92, 3.16, 98.97],
                    rotation: [0,0.18,0]
                },
                {
                    args:[63.51, 27.22, 45.71],
                    position:[-64.42, 10.16, -18.16],
                    rotation: [0,0.11,0]
                },
                {
                    args:[46.56, 14.31, 40.65],
                    position:[34.18, 6.04, -4.23],
                    rotation: [0,0.13,0]
                },
                {
                    args:[33.25, 14.31, 113.04],
                    position:[41.35, 6.04, 79.13],
                    rotation: [0,0.05,-0.03]
                },
                {
                    args:[116.62, 29.29, 70.65],
                    position:[-42.30, 6.94, 149.97],
                    rotation: [0,0.06,0]
                },
                {
                    args:[26.86, 13.35, 37.28],
                    position:[46.77, 5.49, 162.0],
                    rotation: [0,0.12,0]
                },
                {
                    args:[17.81, 13.35, 21.7],
                    position:[48.67, 5.16, 196.59],
                    rotation: [0,0.04,0]
                },
                {
                    args:[60.36, 13.35, 9.54],
                    position:[-6.78, 5.16, 203.8],
                    rotation: [0,0.04,0]
                },
                {
                    args:[20.70, 11.47, 5.15],
                    position:[-52.30, 5.16, 204.30],
                    rotation: [0,0.02,0]
                },
                {
                    args:[25.79, 11.47, 3.09],
                    position:[-83.88, 5.16, 205.15],
                    rotation: [0,0.05,0]
                },
                {
                    args:[70.61, 25.09, 19.11],
                    position:[-162.77, 3.99, -5.22],
                    rotation: [0,0.62,0]
                },
                {
                    args:[59.50, 38.72, 89.57],
                    position:[-187.77, 2.34, 74.14],
                    rotation: [0,0.52,0]
                },
                {
                    args:[65.56, 38.06, 52.71],
                    position:[-151.53, 12.62, 180.87],
                    rotation: [0,0,0]
                },
                {   // Fuente
                    args:[15.15, 8.23, 6.91],
                    position:[-120.57, 7.08, 10.22],
                    rotation: [0,0.31,0]
                },
                {
                    args:[23.27, 8.23, 6.91],
                    position:[-132.22, 7.08, -1.67],
                    rotation: [0,0.44,0]
                },
                {
                    args:[23.27, 8.23, 22.94],
                    position:[-151.25, 7.08, 20.45],
                    rotation: [-3.14,1.04,-3.14]
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