import React, {useMemo} from 'react';
import {useFBX} from 'drei';
import InstancedMeshes from './InstancedMeshes';

export default function InstancedFBX({ src='', objects=[], createObjectsMod }) {
    const fbx = useFBX(src);
    const meshes = useMemo(()=>{
        const meshes = [];
        fbx.traverse((object) => {
            if(object.isMesh){
                meshes.push(object)
            }
        });
        return meshes;
    },[src]);
    return <InstancedMeshes meshes={meshes} objects={objects} createObjectsMod={createObjectsMod} />;
}