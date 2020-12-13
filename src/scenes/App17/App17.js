import React, {useEffect, useMemo, useState, Suspense} from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stats } from 'drei';
import Loading from '../../components/Loading';

import Map from '../../drei-espinaco/Map';
import randomMapCreation from '../../drei-espinaco/map-creator/maps/randomMapCreation';
import mapSimple from '../../drei-espinaco/map-creator/maps/mapSimple';
import mapGallery from '../../drei-espinaco/map-creator/maps/mapGallery';

import { Physics } from 'use-cannon';
import Ground from '../../the-gallery/components/Ground/Ground';
import Player from '../../the-gallery/components/Player/Player';
import Joystick from '../../drei-espinaco/Joystick';
import FullScreen from '../../drei-espinaco/Fullscreen';


export function Scene() {

    const [map, setMap] = useState([]);
    useEffect(()=>{
        setMap(mapGallery());
    },[mapSimple]);

    return(
        <>
        <pointLight args={[0xff0000, 10, 100]} />
        <Map args={map} />
        {/* <OrbitControls /> */}
        <Physics gravity={[0, -30, 0]}>
          <Suspense fallback={null}>
            <Ground /> 
          </Suspense>      
          <Player />       
        </Physics>
        </>
    );
}

export default function App17(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Stats />
        <Scene />
    </Canvas>
    <Joystick />
    </>
    );
}