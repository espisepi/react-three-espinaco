import React, { useMemo } from 'react';
import InstancedMesh from './InstancedMesh';

export default function Map({args=[]}) {
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