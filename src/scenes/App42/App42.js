import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, useGLTF } from 'drei';
import Loading from '../../components/Loading';

export function Catedral(props) {
    const {nodes} = useGLTF('assets/obj/vr_gallery_round/scene.gltf');
    console.log(nodes.root)
    return (
    <group {...props} >
        <primitive object={nodes.root} rotation={[-Math.PI / 2, 0 ,0 ]}/>
    </group>
    );
}

export function Scene() {
    return(
        <>
        {/* <ambientLight /> */}
        <pointLight position={[0,2,0]} />
        <Suspense fallback={<Loading/>}>
            <Catedral />
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