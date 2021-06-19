import React, { useEffect, useState, useRef } from 'react'
import { useThree, useFrame } from 'react-three-fiber'
import { OrbitControls } from 'drei'
import * as THREE from 'three'

// nameTarget : String
export default function OrbitControlsFollowObject({nameFollowObject, nameLookAtObject}) {

    const { scene } = useThree();

    const [followObject, setFollowObject] = useState(null)
    useEffect(()=>{

        if(!followObject) {
            const mesh = scene.getObjectByName(nameFollowObject);
            if(mesh) {
                setFollowObject(mesh);
                console.log('Follow Object Finded correctly!')
            } else {
                console.log('Follow Object not finded')
            }
        }

    },[followObject, nameFollowObject, scene]);

    const [lookAtObject, setLookAtObject] = useState(null)
    useEffect(()=>{

        if (!lookAtObject) {
            const mesh = scene.getObjectByName(nameLookAtObject);
            if(mesh) {
                setLookAtObject(mesh);
                console.log('Look At Object Finded correctly!')
            } else {
                console.log('Look At Object not finded')
            } 
        }

    },[lookAtObject, nameLookAtObject, scene])

    const orbitControl = useRef();
    useEffect(()=>{
        if(lookAtObject && orbitControl.current) {
            orbitControl.current.enabled = false
            console.log('OrbitControls disabled because there is lookAtObject')
        }
    },[lookAtObject, orbitControl])

    let newPosition = new THREE.Vector3(0,0,0)
    let prevPosition = new THREE.Vector3(newPosition.x,newPosition.y,newPosition.z)
    useFrame(()=>{

        // Follow Object
        if (orbitControl.current && followObject) {

            newPosition = followObject.position.clone();

            // orbitControl target is follow object 
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

        // Look At Object
        if (lookAtObject && orbitControl.current) {
            orbitControl.current.object.lookAt(lookAtObject.position)
        }
    })

    return <OrbitControls ref={orbitControl} />
}