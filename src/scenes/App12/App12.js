import React, {useEffect, useState} from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';
import Stars from '../../drei-espinaco/Stars';

import {BasicCharacterController, ThirdPersonCamera} from './simondevClasses';

export function Scene() {

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
        if(thirdPersonCamera){ thirdPersonCamera.Update(delta) }
    });

    return(
        <>
        <ambientLight />
        <Loading />
        <Stars />
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App12(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    );
}