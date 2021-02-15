import React, { Suspense, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { Stats, OrbitControls, TransformControls } from 'drei';
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
import useYScroll from './useYScroll';


export function ScenePrincipal({y}) {
    console.log(y);
    return(
        <>
        <Loading />
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
        <ScenePrincipal y={y} />
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