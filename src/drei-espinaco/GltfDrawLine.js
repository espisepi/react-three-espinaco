import React, { Suspense, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export default function GltfDrawLine({url, velocity}) {
    url = url || 'assets/obj/LeePerrySmith/LeePerrySmith.glb';
    velocity = velocity || 1;
    const gltf = useLoader(GLTFLoader, url)
    let mesh;
    gltf.scene.traverse((child) => {
        if(child.isMesh){
            mesh = child;
            mesh.material.wireframe = true;
        }
    });
    const gltfPositionArray = mesh.geometry.attributes.position.array;
    mesh.geometry.attributes.position.needsUpdate = true;
    let contador = 0;
    useFrame(()=>{
        if(mesh){
            mesh.geometry.attributes.position.array = gltfPositionArray.slice(0,contador);
            if(contador < gltfPositionArray.length) contador += velocity;
            mesh.geometry.computeVertexNormals();
            mesh.geometry.computeFaceNormals();
        }
    })
    
    return <primitive object={mesh} dispose={null} />
}