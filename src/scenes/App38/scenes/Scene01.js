import React from 'react';
import * as THREE from 'three';
import { Sky } from 'drei';

import { Pla } from '../Prefab';

export default function Scene01(){
    return(
        <>
        <ambientLight />
        <Pla />
        <Sky
            distance={450000} // Camera distance (default=450000)
            inclination={0.65} // Sun elevation angle from 0 to 1 (default=0)
            azimuth={0.50} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        />
        </>
    );
}