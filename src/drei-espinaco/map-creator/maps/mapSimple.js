import * as THREE from 'three';

const mapSimple = [
    {
        geometry: new THREE.BoxBufferGeometry(1,1,1),
        material: new THREE.MeshStandardMaterial({color:'red'}),
        objects: [
            {
                position: [0,0,5],
                rotation: [0,0,0],
                scale: [1,1,1]
            },
            {
                position: [0,0,-5],
                rotation: [0,0,0],
                scale: [1,1,1]
            }
        ]
    },

];

export default mapSimple;