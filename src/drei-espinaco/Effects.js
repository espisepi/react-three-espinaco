import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree, extend, useLoader } from 'react-three-fiber';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass';

import * as THREE from 'three';

extend({ EffectComposer, RenderPass, ShaderPass, LUTPass })
export default function Effects({shaders=[], lut }) {
    const { gl, scene, camera, size } = useThree();
    const composer = useRef();
    useEffect(() => {
        composer.current.setSize(size.width, size.height)
    }, [size]);
    useFrame(() => {
        composer.current.render()
    }, 1)

    const [ target ] = useState(()=> new THREE.WebGLRenderTarget( {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding
    } ));
    
    return (
        <effectComposer ref={composer} args={[gl, target]}>
            <renderPass attachArray="passes" args={[scene, camera]} />
            { shaders.map( (shader, i) => {
                return ( <shaderPass key={'shaderpass' + i} attachArray="passes" args={[shader]} /> );
            })}
            {
                lut ? ( <lUTPass attachArray="passes" lut={lut.texture} /> ) : null
            }
        </effectComposer>
    );
}