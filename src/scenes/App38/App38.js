import React, { Suspense, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { Stats, OrbitControls, TransformControls } from 'drei';
import Loading from './Loading';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics, useBox } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import {InstancedMesh, InstancedMeshPhysics, InstancedMeshes, InstancedFBX, InstancedGLTF, InstancedGLTFPhysics, InstancedPhysics} from '../../drei-espinaco/instancedMesh/';
import { createMapsPoints, createMapPoints, transformPointsToObjects } from '../../drei-espinaco/points-creator/';

import Scene01 from './scenes/Scene01';

import { proxy, useProxy } from "valtio";

import Fullscreen from '../../drei-espinaco/Fullscreen';

import MeshTransformControls from '../../drei-espinaco/MeshTransformControls';

export function ScenePrincipal() {
    return(
        <>
        <Physics gravity={[0, -100, 0]} >
        <Suspense fallback={<Loading />}>
            {/* <MeshTransformControls /> */}
            <Scene01 />

            <Player mass={200.0} height={4.0} acceleration={[300,0.25]} />
            <GroundPhysic />
        </Suspense>
        </Physics>
        </>
    );
}

export default function App38(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Stats />
        <ScenePrincipal />
    </Canvas>
    <Joystick />
    <Fullscreen />
    </>
    );
}