import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useGLTF } from 'drei';
import {InstancedPhysics} from '../../drei-espinaco/instancedMesh/';

export function Pla(...props) {
    const {nodes} = useGLTF('assets/obj/googleEarth/pla/untitled.glb');
    console.log(nodes);
    const objects = useMemo(()=>([
        {
            propsPhysics: [
                {
                    args:[nodes.Cube.scale.x,nodes.Cube.scale.y,nodes.Cube.scale.z],
                    position:[nodes.Cube.position.x,nodes.Cube.position.y,nodes.Cube.position.z],
                    rotation:[nodes.Cube.rotation.x,nodes.Cube.rotation.y,nodes.Cube.rotation.z]
                },
                {
                    args:[nodes.Cube002.scale.x,nodes.Cube002.scale.y,nodes.Cube002.scale.z],
                    position:[nodes.Cube002.position.x,nodes.Cube002.position.y,nodes.Cube002.position.z],
                    rotation:[nodes.Cube002.rotation.x,nodes.Cube002.rotation.y,nodes.Cube002.rotation.z]
                }
            ]
        }
    ]));
    return (
    <>
    <group position={[0,-20,0]} scale={[20,20,20]}>
        <InstancedPhysics objects={objects} visible={true} />
        <primitive object={nodes.skatepark} dispose={null} />
    </group>
    </>
    );
}