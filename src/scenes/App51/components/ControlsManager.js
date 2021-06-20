import React from 'react';
import { Physics } from 'use-cannon';

import OrbitControlsFollowObject from '../../../drei-espinaco/OrbitControlsFollowObject';
import Player from '../../../drei-espinaco/physics/Player';
import { GroundPhysic } from '../../../drei-espinaco/physics/PrefabPhysics';

export default function ControlsManager({mode=0}) {

    if( mode === 0 ) {
        return <OrbitControlsFollowObject nameFollowObject='groupCurve_boxCurve' nameLookAtObject={null} enablePan={false} enableZoom={true} />;
    } else if( mode === 1 ) {
        return (
            <Physics gravity={[0, -100, 0]} >
                <Player mass={200.0} height={4.0}/>
                <GroundPhysic />
            </Physics>
        );
    } else {
        console.log('Any mode selected from ControlsManager')
        return null;
    }
}