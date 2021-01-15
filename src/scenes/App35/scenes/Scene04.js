import React from 'react';
import * as THREE from 'three';
import { useGLTF } from 'drei';

export default function Scene04() {
    const modelUrl = 'assets/obj/gallery_house/scene.gltf';
    const { scene } = useGLTF(modelUrl);
    scene.traverse( function ( child ) {
        if ( child.isMesh ) {
            // console.log(child.material.map)
            // child.castShadow = true;
            // child.receiveShadow = true;
            // child.material = new THREE.MeshPhongMaterial();
            // child.material.side = THREE.DoubleSide;
            // child.material.normalMap = normal;
            // child.material.map = texture;
            // child.material.metalness = 0;
            // child.material.roughness = 1;
        }
    });

    return (
        <>
        {/* <InstancedPhysics objects={objects} visible={false} /> */}
        <primitive 
                    position={[0,-3,0]}
                    scale={[10,10,10]}                  
                    object={scene}
                    dispose={null}
                /> 
        </>
    );
}