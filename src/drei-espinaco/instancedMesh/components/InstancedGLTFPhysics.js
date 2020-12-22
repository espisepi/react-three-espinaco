import React, {useMemo} from 'react';
import {useGLTF} from 'drei';
import InstancedMeshesPhysics from './InstancedMeshesPhysics';


export default function InstancedGLTFPhysics({src='', objects=[], createObjectsModBoolean, visible}) {
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
    return <InstancedMeshesPhysics meshes={meshes} objects={objects} createObjectsModBoolean={createObjectsModBoolean} visible={visible}/>;
}