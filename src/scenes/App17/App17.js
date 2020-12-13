import React, {useEffect, useMemo, useState} from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
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

export function Scene() {

    const map = useMemo(()=>([
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

    ]), []);

    return(
        <>
        <ambientLight />
        <Loading />
        <Map args={map} />
        <OrbitControls />
        </>
    );
}

export default function App17(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    );
}