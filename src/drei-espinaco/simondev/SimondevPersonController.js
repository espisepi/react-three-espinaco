import React, { useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import {BasicCharacterController, ThirdPersonCamera} from './simondevClasses';

export default function SimondevPersonController({visible=true, zoomType=0}) {

    const {camera, scene} = useThree();

    const [controls] = useState(()=>{
        const params = {
            camera: camera,
            scene: scene,
          }
        return new BasicCharacterController(params);
    });

    const [thirdPersonCamera] = useState(()=>{
        return new ThirdPersonCamera({
            camera: camera,
            target: controls,
        });
    });

    useFrame((state, delta)=>{
        if(controls) { controls.Update(delta) }
        if(thirdPersonCamera){ thirdPersonCamera.Update(delta, zoomType) }
    });

    useFrame(()=>{
        if(controls._target) { controls._target.visible = visible }
    })

    return null;

}