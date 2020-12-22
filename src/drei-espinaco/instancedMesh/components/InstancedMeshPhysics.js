import React, {useMemo, useCallback} from 'react';
import * as THREE from 'three';
import {useBox} from 'use-cannon';
import InstancedMesh from './InstancedMesh';

export function CreatePhysicBox({props, visible}) {
    const [ref] = useBox(() => ({...props}));
    return (
    <mesh ref={ref}>
            <boxBufferGeometry args={[...props.args]} />
            <meshBasicMaterial color='green' wireframe={true} visible={visible} />
    </mesh>
    );
}


export function CreatePhysicBoxes({objects, visible = true}) {
    const physicMeshes = [];
    objects.forEach((object) => {
       object.propsPhysics.forEach((props) => {
        props.position = props.position || object.position;
        props.rotation = props.rotation || object.rotation;
        const physicMesh = <CreatePhysicBox props={props} visible={visible} />
        physicMeshes.push(physicMesh);
       });
    });
    return physicMeshes ? physicMeshes : null;
}

export default function InstancedMeshPhysics({geometry=new THREE.BoxBufferGeometry(1,1,1), material=new THREE.MeshBasicMaterial({color:'red'}), objects=[], visible = true}){
    for(let i = 0; i< 5; i++){
        for(let j = 0; j < 5; j++){
            objects.push({
                position:[j * 1,i*1,0],
                scale: [1,1,1],
                propsPhysics: [
                    {
                        mass: 1,
                        args: [1,1,1]
                    }
                ]
            });
        }
    }
    
    const uuid = useMemo(()=>THREE.MathUtils.generateUUID(),[]);
    const createObjectsMod = useCallback((state)=>{
        const objectsMod = [];
        state.scene.children.forEach(object => {
            if(object.uuid === uuid) {
                object.children.forEach( (meshPhysic,id) => {
                    objectsMod.push({
                        ids: [id],
                        object: {
                            position: [meshPhysic.position.x,meshPhysic.position.y,meshPhysic.position.z],
                            rotation: [meshPhysic.rotation.x,meshPhysic.rotation.y,meshPhysic.rotation.z]
                        }
                    });
                });
            }
        });
      return objectsMod;
    });
    
    return (
    <>
    <group uuid={uuid}>
        <CreatePhysicBoxes objects={objects} visible={visible} />
    </group>
    <InstancedMesh
        geometry={geometry}
        material={material}
        objects={objects}
        createObjectsMod={createObjectsMod}
    />
    </>
    );
}