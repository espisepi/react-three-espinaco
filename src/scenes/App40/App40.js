import React, { Suspense, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree, extend } from 'react-three-fiber';
import { Stats, OrbitControls, TransformControls, Plane, useTexture } from 'drei';
import Loading from '../App38/Loading';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics, useBox } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';
import {InstancedMesh, InstancedMeshPhysics, InstancedMeshes, InstancedFBX, InstancedGLTF, InstancedGLTFPhysics, InstancedPhysics} from '../../drei-espinaco/instancedMesh/';
import { createMapsPoints, createMapPoints, transformPointsToObjects } from '../../drei-espinaco/points-creator/';
import Scene01 from '../App38/scenes/Scene01';
import Scene02 from '../App38/scenes/Scene02';
import { proxy, useProxy } from "valtio";
import Fullscreen from '../../drei-espinaco/Fullscreen';
import MeshTransformControls from '../../drei-espinaco/MeshTransformControls';

import { a as aDom } from '@react-spring/web';
import { a } from '@react-spring/three';
import useYScroll from './useYScroll';

import { shaderMaterial } from 'drei';

const MyMaterial = shaderMaterial(
    { map: new THREE.Texture(), repeats: 1 },
    `
  varying vec2 vUv;
  
  void main()	{
    vUv = uv;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
  }
  `,
    `
  varying vec2 vUv;
  uniform float repeats;
  uniform sampler2D map;
  
  float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
  }
  
  void main(){
    vec2 uv = vUv;
  
    uv *= repeats;
    uv = fract(uv);
  
    vec3 color = vec3(
      texture2D(map, uv).r,
      texture2D(map, uv + vec2(0.01,0.01)).g,
      texture2D(map, uv - vec2(0.01,0.01)).b
    );
    
    gl_FragColor = vec4(color,1.0);
  }
  `
);
  
extend({ MyMaterial });

export function Picture({src, ...props}){
    const map = useTexture(src);

    return(
        <Plane {...props} >
            <meshBasicMaterial map={map} />
        </Plane>
    );
}

const pictures = [
    {
        src:'https://source.unsplash.com/random/400x400'
    },
    {
        src:'https://source.unsplash.com/random/400x400'
    },
    {
        src:'https://source.unsplash.com/random/400x400'
    },
    {
        src:'https://source.unsplash.com/random/400x400'
    },
]

export function ScenePrincipal({y}) {
    
    return(
        <>
        <a.group position-y={y.to((y) => ( y / 500 ) * 25 )} >
            {pictures.map( (object, i) => (
                <Picture key={`picture${i}`} src={object.src} position={[0,i*-7,0]} scale={[5,5,5]} rotation={[-0.5,0,0]} />
            ))}
        </a.group>
        </>
    );
}

export const bar = {
    position:'absolute',
    top:0,
    left:0,
    width:'4px',
    background: 'lightcoral',
    zIndex:10
}

export function RunApp40(props) {

    const [y] = useYScroll([-100, 2400], { domTarget: window });
    
    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        {/* <Stats /> */}
        <Suspense fallback={<Loading />}>
            <ScenePrincipal y={y} />
        </Suspense>
        {/* <OrbitControls /> */}
    </Canvas>
    <Fullscreen />
    <aDom.div style={{...bar, height: y.interpolate([-100, 2400], ['0%', '100%']) }} />
    </>
    );
}

export default function App40(props) {
    return(
        <RunApp40 />
    );
}