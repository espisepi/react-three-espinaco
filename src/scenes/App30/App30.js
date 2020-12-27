import React, { Suspense, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

import Stars from '../../drei-espinaco/Stars';

import {InstancedMesh, InstancedMeshPhysics, InstancedMeshes, InstancedFBX, InstancedGLTF, InstancedGLTFPhysics, InstancedPhysics} from '../../drei-espinaco/instancedMesh/';

function Model3D({src}) {
    const objects = [{position:[0,0,0],scale:[0.5,0.5,0.5]}];
    return <InstancedGLTF src={src} objects={objects} />;
}

export function Scene() {
    const [modelSrc, setModelSrc] = useState('assets/obj/gallery_chapel_baked/scene.gltf');
    return(
        <>
        <ambientLight />
        <Stars />
        <Suspense fallback={<Loading />}>
            <Model3D src={modelSrc} />
        </Suspense>
        <OrbitControls />
        </>
    );
}

export default function AppDirty(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    );
}