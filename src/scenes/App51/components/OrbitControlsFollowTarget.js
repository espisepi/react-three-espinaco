import React, { useEffect, useState, useRef } from 'react'
import { useThree, useFrame } from 'react-three-fiber'
import { OrbitControls } from 'drei'
import * as THREE from 'three'

// nameTarget : String
export default function OrbitControlsFollowTarget({nameTarget}) {

    const { scene } = useThree();
    const [boxCurve, setBoxCurve] = useState(null)
    useEffect(()=>{
        if(!boxCurve) {
            const mesh = scene.getObjectByName('groupCurve_boxCurve');
            if(mesh) {
                setBoxCurve(mesh);
            }
        }
    },[scene.children.length]);

    const orbitControl = useRef();
    let newPosition = new THREE.Vector3(0,0,0)
    let prevPosition = new THREE.Vector3(newPosition.x,newPosition.y,newPosition.z)
    useFrame(()=>{
        if (orbitControl.current) {
            newPosition = boxCurve.position.clone();
            orbitControl.current.target = newPosition;

            if (newPosition.x !== prevPosition.x || newPosition.y !== prevPosition.y || newPosition.z !== prevPosition.z) {
                // Se ha movido el objeto target al que se esta mirando

                const deltaX = newPosition.x - prevPosition.x;
                const deltaY = newPosition.y - prevPosition.y;
                const deltaZ = newPosition.z - prevPosition.z;
                
                const camera = orbitControl.current.object;
                camera.position.x += deltaX;
                camera.position.y += deltaY;
                camera.position.z += deltaZ;

                prevPosition = newPosition.clone() // Important

            }
        }
    })

    return <OrbitControls ref={orbitControl} />
}