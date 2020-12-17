import React, {useMemo} from 'react';
import InstancedMesh from './InstancedMesh';

export default function InstancedMeshes({meshes=[], objects=[], createObjectsMod}){
    const imeshes = useMemo(()=>{
        const imeshes = [];
        meshes.forEach(mesh => {
            if(mesh.geometry && mesh.material){
                const imesh = <InstancedMesh geometry={mesh.geometry} material={mesh.material} objects={objects} createObjectsMod={createObjectsMod} />;
                imeshes.push(imesh);
            } else {
                console.log('InstancedMeshes log: mesh not have geometry or material, mesh is not created');
                console.log(mesh);
                console.log('---------------------------------------------------');
            }
        });
        return imeshes;
    },[meshes, objects]);
    return imeshes;
}