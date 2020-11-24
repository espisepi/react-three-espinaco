import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';
import * as THREE from 'three';
import Shadertoy from '../../drei-espinaco/Shadertoy';
import ShaderMesh from './ShaderMesh';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import SimpleShader from './shaders/SimpleShader';
import DreamVisionShader from './shaders/DreamVisionShader';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import Effects from '../../drei-espinaco/Effects';
import ObjMesh from './ObjMesh';


import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader';

import { EffectComposer, GodRays } from '@react-three/postprocessing'

export function Scene() {

    const lut = useLoader(LUTCubeLoader, 'assets/luts/panasonic.cube');

    const [sun] = useState(()=>{
        const mesh = new THREE.Mesh(
            new THREE.SphereBufferGeometry(1,32,32),
            new THREE.MeshBasicMaterial({color:'#F1DAA4'})
        );
        mesh.position.set(0,0,-4200);
        return mesh;
    })

    return(
        <>
        <ambientLight />
        
        {/* <Effects shaders={[ ]} lut={lut} /> */}
        <EffectComposer>
            <GodRays sun={sun} />
        </EffectComposer>
        
        <ShaderMesh />
        <group position={[3,0,0]}>
            <Shadertoy />
        </group>
        <ObjMesh />

        <OrbitControls />
        </>
    );
}

export default function AppDirty(props) {
    
    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}} gl={{ antialias: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1 }} >
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
    </Canvas>
    );
}