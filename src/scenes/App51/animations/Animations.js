import React from 'react';

import useScroll from '../../../drei-espinaco/hooks/useScroll';

import HelicopterCurveAnimation from './HelicopterCurveAnimation'
import { pathTest } from '../paths'

export function AnimationsVR() {
    return (
        <>
        <HelicopterCurveAnimation pointsDefault={pathTest} />
        </>
    );
}

export default function Animations(){

    const top = useScroll('.section-one', '.section-eight');
    
    return (
        <>
        <HelicopterCurveAnimation pointsDefault={pathTest} top={top} />
        </>
    );
}