import React, {useMemo, useCallback, useEffect} from 'react';
import * as THREE from 'three';
import {useBox} from 'use-cannon';
import {CreatePhysicBoxes} from './InstancedMeshPhysics';

export default function InstancedPhysics({objects=[], visible = false}){

    // if objects array is empty, initialize it with these default values
    if(objects.length === 0) {
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
    }
    
    const uuid = useMemo(()=>THREE.MathUtils.generateUUID(),[]);
    return (
    <group uuid={uuid}>
        <CreatePhysicBoxes objects={objects} visible={visible} />
    </group>
    );
}