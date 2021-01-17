import React, { useCallback, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls, TransformControls } from 'drei';


export default function MeshTransformControls() {
    const orbit = useRef()
    const transform = useRef()
    const [mode, setMode] = useState('translate');
    useEffect(() => {
      if (transform.current) {
        const controls = transform.current
        controls.setMode(mode)
        const callback = event => (orbit.current.enabled = !event.value)
        controls.addEventListener("dragging-changed", callback)
        return () => controls.removeEventListener("dragging-changed", callback)
      }
    },[mode]);
    const handleKeyDown = useCallback((e)=>{
        if(e.code === "KeyT") {
            setMode('translate');
        }
        else if(e.code === "KeyR") {
            setMode('rotate');
        }
        else if(e.code === "KeyS") {
            setMode('scale');
        }
    })
    useEffect(()=>{
        document.addEventListener("keydown", handleKeyDown);
        return () => { document.removeEventListener("keydown", handleKeyDown) }
    });
    useEffect(()=>{
        if(transform.current){
            console.log('-------- position, rotation, scale ----------')
            console.log(transform.current.object?.position)
            console.log(transform.current.object?.rotation)
            console.log(transform.current.object?.scale)
        }
    },[mode])
    return (
      <>
        <TransformControls ref={transform}>
            <mesh material={new THREE.MeshBasicMaterial({color:'green', wireframe:true})} geometry={new THREE.BoxBufferGeometry(1,1,1)} />
        </TransformControls>
        <OrbitControls ref={orbit} />
      </>
    )
  }