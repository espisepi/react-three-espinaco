import React, {useMemo} from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from 'drei';

export default function useFullmapGallery() {

    /** ------------ Load Resources ------------- */
    const [wallMap, wallNormalMap] = useLoader(THREE.TextureLoader,['assets/3D/Wall/Textures/White_Wall.jpg','assets/3D/Wall/Textures/White_Wall_NORMAL.jpg']);
    const { scene: wallScene  } = useGLTF('assets/3D/Wall/scene.gltf');
    console.log(wallScene)


    /** ------------ Create Scenario ------------- */
    const { map, mapPhysics } = useMemo(()=>{
        const map = [];
        const mapPhysics = [];

        /** Hello World */
        const imesh0 = {
            geometry: new THREE.BoxBufferGeometry(1,1,1),
            material: new THREE.MeshBasicMaterial({color:'red'}),
            objects: [
                {
                    position: [0,0,0],
                    rotation: [0,0,0],
                    scale: [5,5,5]
                }
            ]
        }     
        const physicMesh0 = {
            type:'box',
            objects:[
                {
                    position: imesh0.objects[0].position,
                    rotation: imesh0.objects[0].rotation,
                    args: imesh0.objects[0].scale
                }
            ]
        }
        map.push(imesh0);
        mapPhysics.push(physicMesh0);

        /** Wall */
        const imeshWall = {
            geometry: wallScene.children[0].geometry,
            material:  wallScene.children[0].material,
            objects:[
                {
                    position: [0,0,0],
                    rotation: [0,0,0],
                    scale: [1,1,1]
                }
            ]
        }
        map.push(imeshWall);


        return {
            map:map,
            mapPhysics:mapPhysics
        }

    },[]);

    return {
        map:map,
        mapPhysics: mapPhysics
    }
    
}


