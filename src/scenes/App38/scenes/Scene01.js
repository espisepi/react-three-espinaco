import React from 'react';
import * as THREE from 'three';
import { Sky } from 'drei';

import { Pla, Catedral, CAAC } from '../Prefab';

import { MeshTransformControlsChildren } from '../../../drei-espinaco/MeshTransformControls';

export default function Scene01(){
    return(
        <>
        <ambientLight />
        <group position={[0,-20,0]} scale={[20,20,20]}>
        {/* <group> */}
        {/* <Pla /> */}
        {/* <CAAC /> */}
        <Catedral position={[47.97,-34.65,-313.1]} />
        {/* <MeshTransformControlsChildren>
            <Catedral position={[47.97,-32.65,-313.1]} />
        </MeshTransformControlsChildren> */}
        </group>
        <Sky
            distance={450000} // Camera distance (default=450000)
            inclination={0.65} // Sun elevation angle from 0 to 1 (default=0)
            azimuth={0.50} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        />
        </>
    );
}