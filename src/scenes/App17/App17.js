import React, {useEffect, useMemo, useState} from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stats } from 'drei';
import Loading from '../../components/Loading';
import InstancedMesh from '../../drei-espinaco/InstancedMesh';

export function Map({args=[]}) {
    const instancedMeshes = useMemo(()=>{
        const res = [];
        args.forEach( (mesh) => {
            const instancedMesh = <InstancedMesh 
                                        geometry={mesh.geometry}
                                        material={mesh.material}
                                        objects={mesh.objects}
                                    />;
            res.push(instancedMesh);
        });
        return res;
    },[args])
    
    return instancedMeshes;
}

export function randomMapCreation(){
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
    for(let i=0; i < 50; i++){
        const object = Object.assign({},objectTemp);
        object.position = [Math.random()*5,Math.random()*5,Math.random()*5];
        meshedTemp.objects.push(object);
    }
    map.push(meshedTemp);

    return map;
}

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

]

export function Scene() {

    const [map, setMap] = useState([]);
    useEffect(()=>{
        setMap(randomMapCreation());
    },[mapSimple]);

    return(
        <>
        {/* <ambientLight /> */}
        <pointLight />
        <Loading />
        <Map args={map} />
        <OrbitControls />
        </>
    );
}

export default function App17(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Stats />
        <Scene />
    </Canvas>
    );
}



/** 
   ----- Getting Started -----

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
]

export function Scene() {

    const [map, setMap] = useState([]);
    useEffect(()=>{
        setMap(mapSimple);
    },[mapSimple]);

    return(
        <>
        <ambientLight />
        <Map args={map} />
        </>
    );
}

*/