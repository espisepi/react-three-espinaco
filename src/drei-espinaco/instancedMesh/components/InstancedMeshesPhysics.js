import React, {useMemo} from 'react';
import InstancedMeshPhysics from './InstancedMeshPhysics';

export default function InstancedMeshesPhysics({meshes=[], objects=[], createObjectsModBoolean, visible}){
    const imeshes = useMemo(()=>{
        const imeshes = [];
        meshes.forEach(mesh => {
            if(mesh.geometry && mesh.material){
                const imesh = <InstancedMeshPhysics geometry={mesh.geometry} material={mesh.material} objects={objects} createObjectsModBoolean={createObjectsModBoolean} visible={visible} />;
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
