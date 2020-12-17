import React, {useMemo} from 'react';
import {useGLTF} from 'drei';
import InstancedMeshes from './InstancedMeshes';


export default function InstancedGLTF({src='', objects=[], createObjectsMod}) {
    const {scene} = useGLTF(src);
    const meshes = useMemo(()=>{
        const meshes = [];
        scene.traverse((object) => {
            if(object.isMesh){
                meshes.push(object)
            }
        });
        return meshes;
    },[src]);
    return <InstancedMeshes meshes={meshes} objects={objects} createObjectsMod={createObjectsMod} />;
}