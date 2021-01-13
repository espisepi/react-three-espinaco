import React from 'react';
import * as THREE from 'three';
import { Sky } from 'drei';
import Ocean from '../../../drei-espinaco/Ocean';

export default function Scene01(){
    return(
        <>
        <ambientLight />
        <Ocean geometry={new THREE.PlaneBufferGeometry( 500, 500, 1, 1 )} position={[0,1,0]} rotation={[Math.PI/2,0,0]} />
        <Sky
            distance={450000} // Camera distance (default=450000)
            inclination={0.65} // Sun elevation angle from 0 to 1 (default=0)
            azimuth={0.50} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        />
        </>
    );
}