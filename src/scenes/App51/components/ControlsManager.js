import React from 'react';

import OrbitControlsFollowObject from '../../../drei-espinaco/OrbitControlsFollowObject';

export default function ControlsManager({mode=0}) {

    if( mode === 0 ) {
        return <OrbitControlsFollowObject nameFollowObject='groupCurve_boxCurve' nameLookAtObject={null} enablePan={false} enableZoom={true} />;
    }
}