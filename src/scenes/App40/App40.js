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



export function ScenePrincipal() {
    return(
        <>
        <Loading />
        </>
    );
}

export function RunApp40(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        {/* <Stats /> */}
        <ScenePrincipal />
        <OrbitControls />
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