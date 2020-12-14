import React, {useMemo} from 'react';
import * as THREE from 'three';

export default function useFullmapGallery() {

    /** ------------ Load Resources ------------- */


    /** ------------ Create Scenario ------------- */
    const { map, mapPhysics } = useMemo(()=>{
        const map = [];
        const mapPhysics = [];

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


