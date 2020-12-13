import * as THREE from 'three';

export default function randomMapCreation(){
    /** -------- Common Attributes ---------- */
    const map = [];
    const meshedTemp = {
        geometry: new THREE.BoxBufferGeometry(1,1,1),
        material: new THREE.MeshBasicMaterial({color:'red'}),
        objects: []
    }
    const objectTemp = {
        position: [0,0,0],
        rotation: [0,0,0],
        scale: [1,1,1]
    }

    /** ------- Add first meshed to map array -------- */
    meshedTemp.geometry = new THREE.BoxBufferGeometry(1,1,1);
    meshedTemp.material = new THREE.MeshPhysicalMaterial({color:'red', clearcoat:0.9});
    for(let i=0; i < 50000; i++){
        const object = Object.assign({},objectTemp);
        object.position = [Math.random()*50,Math.random()*50,Math.random()*50];
        meshedTemp.objects.push(object);
    }
    map.push(meshedTemp);

    return map;
}