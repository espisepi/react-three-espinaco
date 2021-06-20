import React, { useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import { Physics } from 'use-cannon';
import { OrbitControls } from 'drei';
import { Vector3 } from 'three'

import OrbitControlsFollowObject from '../../../drei-espinaco/OrbitControlsFollowObject';
import Player from '../../../drei-espinaco/physics/Player';
import { GroundPhysic } from '../../../drei-espinaco/physics/PrefabPhysics';

export default function ControlsManager({mode=0}) {

    const { camera } = useThree()
    useEffect(()=>{
        if( mode === 1 ) {
            camera.position.set(0,0,-100);
            camera.rotation.set(0,0,0);
        } else if( mode === 2 ) {
            camera.position.set(0,5,0);
        }
    }, [mode])

    if( mode === 0 ) {
        return <OrbitControlsFollowObject nameFollowObject='groupCurve_boxCurve' nameLookAtObject={null} enablePan={false} enableZoom={true} />;
    } else if( mode === 1 ) {
        
        return (
            <Physics gravity={[0, -100, 0]} >
                <Player mass={200.0} height={4.0}/>
                <GroundPhysic />
            </Physics>
        );
    } else if( mode === 2 ) {
        return <OrbitControls target={new Vector3(-60,0,60)}  />
    } else {
        console.log('Any mode selected from ControlsManager')
        return null;
    }
}