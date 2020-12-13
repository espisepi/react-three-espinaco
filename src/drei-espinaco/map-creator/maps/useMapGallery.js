import React, {useMemo} from 'react';
import * as THREE from 'three';

export default function useMapGallery(){
    /** -------- Common Attributes ---------- */
    const map = [];
    
    const imesh = {
        geometry: new THREE.BoxBufferGeometry(1,1,1),
        material: new THREE.MeshBasicMaterial({color:'red'}),
        objects: []
    }
    const object = {
        position: [0,0,0],
        rotation: [0,0,0],
        scale: [1,1,1]
    }
    let imeshTemp, objectTemp;

    /** ------- Add first meshed to map array -------- */
    
    imeshTemp = Object.assign({},imesh);
    imeshTemp.geometry = new THREE.BoxBufferGeometry(12,1,1);
    imeshTemp.material = new THREE.MeshPhysicalMaterial({color:'red', clearcoat:0.9});
    for(let i=0; i < 50000; i++){
        objectTemp = Object.assign({},objectTemp);
        objectTemp.position = [Math.random()*50,Math.random()*50,Math.random()*50];
        imeshTemp.objects.push(objectTemp);
    }
    map.push(imeshTemp);
    imesh.objects = [];
    

    /** ---------- Add Grass plane ---------- */
    
    imeshTemp = Object.assign({},imesh);
    imeshTemp.geometry = new THREE.PlaneBufferGeometry(1,1,1,1);

    const grassMap = useMemo(() => new THREE.TextureLoader().load("assets/Textures/Grass/GrassGreenTexture0002.jpg"), []);
    grassMap.wrapS = THREE.RepeatWrapping;
    grassMap.wrapT = THREE.RepeatWrapping;
    grassMap.repeat.set(70, 70);
    
    imeshTemp.material = new THREE.MeshStandardMaterial({map:grassMap});

    objectTemp = Object.assign({},object);
    objectTemp.scale = [5,5,5];
    imeshTemp.objects.push(objectTemp);
    
    map.push(imeshTemp);
    imesh.objects = [];
    
    

    return map;
}