import React, {useEffect, useMemo, useState, Suspense} from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stats } from 'drei';
import Loading from '../../components/Loading';

import Map from '../../drei-espinaco/Map';
import MapPhysics from '../../drei-espinaco/map-creator/physics/MapPhysics';
import useFullmapGallery from '../../drei-espinaco/map-creator/fullmaps/useFullmapGallery';

import { Physics } from 'use-cannon';
import Ground from '../../the-gallery/components/Ground/Ground';
import Player from '../../the-gallery/components/Player/Player';
import Joystick from '../../drei-espinaco/Joystick';
import FullScreen from '../../drei-espinaco/Fullscreen';

import Vehicle from '../../drei-espinaco/Vehicle';

import Wall from '../../the-gallery/components/Wall/Wall.js';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';


export function Scene() {

    const {map, mapPhysics} = useFullmapGallery();

    return(
        <>
        <ambientLight intensity={0.0} />
        <pointLight args={[0xffffff, 1, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Wall 
            position={[0, 0, -13.5]}
            modelUrl={"assets/3D/Wall/scene.gltf"}
            mapUrl={"assets/3D/Wall/Textures/White_Wall.jpg"}
            normalMapUrl={"assets/3D/Wall/Textures/White_Wall_NORMAL.jpg"}
          />
          <GroundPhysic visible={false} /> 
          <Player />       
        </Physics>
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App19(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Stats />
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
    </Canvas>
    <Joystick />
    </>
    );
}