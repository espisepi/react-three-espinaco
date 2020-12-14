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


export function Scene() {

    const {map, mapPhysics} = useFullmapGallery();

    return(
        <>
        <ambientLight intensity={1.0} />
        <pointLight />
        <pointLight args={[0xffffff, 1, 100]} />
        <Map args={map} />
        {/* <OrbitControls /> */}
        <Physics gravity={[0, -30, 0]}>
          <MapPhysics args={mapPhysics} visible={true} />
          <Ground /> 
          <Player />       
        </Physics>
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