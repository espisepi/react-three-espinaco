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
import { createMapsPoints, createMapPoints, transformPointsToObjects } from '../../drei-espinaco/points-creator';
import Scene01 from '../App38/scenes/Scene01';
import Scene02 from '../App38/scenes/Scene02';
import { proxy, useProxy } from "valtio";
import Fullscreen from '../../drei-espinaco/Fullscreen';
import MeshTransformControls from '../../drei-espinaco/MeshTransformControls';

import { a as aDom } from '@react-spring/web';
import { a } from '@react-spring/three';

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
        <a.group>
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
    const y = 0;
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
    </>
    );
}

export default function App40(props) {
    return(
        <RunApp40 />
    );
}