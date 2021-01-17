import React, {useEffect} from 'react';
import * as THREE from 'three';
import { useLoader, useThree } from 'react-three-fiber';
import { useGLTF } from 'drei';
import Ocean from '../../../drei-espinaco/Ocean';

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
        <Ocean geometry={new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 )} position={[0,-5,0]} rotation={[Math.PI/2,0,0]} />
        <GalleryModel />
        </>
    );
}