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
                    args:[126.61,1.01,175.16],
                    position:[20.62, -2.92, -45.10]
                },
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
                    args:[2.15,11.0,63.42],
                    position:[88.0, 2.55, 0.83]
                },
                {
                    args:[51.0,11.0,3.2],
                    position:[59.53, 2.55, -30.18]
                },
                {
                    args:[35.12,11.0,3.2],
                    position:[50.27, 2.55, 31.58]
                },
                {
                    args:[68,34,8.77],
                    position:[-43.51, 8.5, -53.21]
                },
                {
                    args:[21.26,30.43,1.0],
                    position:[-22.35, 8.2, -39.1]
                },
                {
                    args:[3.25,29.0,15.74],
                    position:[-13.12, 10.85, -47.44]
                },
                {
                    args:[3.18,23.44,19.45],
                    position:[-33.21, 10, -41.57]
                },
                {
                    args:[3.18,23.44,50.04],
                    position:[-75.66, 4.82, -28.35]
                },
                {
                    args:[42.58,25.0,3.77],
                    position:[-56.10, 5.91, -5.39]
                },
                {
                    args:[17.20,24.98,1.90],
                    position:[-67.42, 5.91, -31.46]
                },
                {
                    args:[104,36.8,1.81],
                    position:[-0.21, 7.12, -124.83]
                },
                {
                    args:[4.0,26.8,70.65],
                    position:[-49.47, 7.12, -91.16]
                },
                {
                    args:[4.0,26.8,70.65],
                    position:[51.0, 7.12, -91.16]
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