import React, {useEffect, useMemo} from 'react';
import * as THREE from 'three';
import { useLoader, useThree } from 'react-three-fiber';
import { useGLTF } from 'drei';
import Ocean from '../../../drei-espinaco/Ocean';

import {InstancedPhysics} from '../../../drei-espinaco/instancedMesh/';

function GalleryModel(){
    const modelUrl = 'assets/obj/gallery_house/scene.gltf';
    const { scene } = useGLTF(modelUrl);
    scene.traverse( function ( child ) {
        if ( child.isMesh ) {
            // desactivate sky of the blender model
            if(child.material.name === 'material'){
                child.visible = false;
            }
        }
    });

    const objects = useMemo(()=>([
        {
            propsPhysics: [
                {
                    args:[2.69,20.11,49.59],
                    position:[-32.78, 1.77, 15.45]
                },
                {
                    args:[66.58,28.85,1],
                    position:[0, 7.0, 39.2]
                },
                {
                    args:[2.76,46.0,26.7],
                    position:[33.94, 13.0, 28.13]
                },
                {
                    args:[2.76,46.0,26.7],
                    position:[33.94, 13.0, -26.89]
                },
                {
                    args:[42.61,36.41,18.04],
                    position:[31.42, 14.33, -47.56]
                },
                {
                    args:[126.61,1.01,175.16],
                    position:[20.62, -2.92, -45.10]
                }
            ]
        }
    ]));

    return (
        <>
        <InstancedPhysics objects={objects} visible={true} />
        <primitive 
                    position={[0,-3,0]}
                    scale={[10,10,10]}                  
                    object={scene}
                    dispose={null}
                /> 
        </>
    );
}

export default function Scene04() {
    const texture = useLoader(THREE.TextureLoader, 'assets/env/360jpg/umhlanga_sunrise.jpg');
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;
    const {scene} = useThree();
    useEffect(()=>{
        scene.background = texture;
    },[texture]);
    return(
        <>
        <Ocean geometry={new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 )} position={[0,-10,0]} rotation={[Math.PI/2,0,0]} />
        <GalleryModel />
        </>
    );
}