import React from 'react';

import useScroll from '../../../drei-espinaco/hooks/useScroll';

import HelicopterCurveAnimation from './HelicopterCurveAnimation'
import { pathTest, path } from '../paths'

export function AnimationsVR() {
    return (
        <>
        <HelicopterCurveAnimation pointsDefault={path} />
        </>
    );
}

export default function Animations(){

    const top = useScroll('.section-one', '.section-eight');
    
    return (
        <>
        <HelicopterCurveAnimation pointsDefault={path} top={top} visibleLine={true} />
        </>
    );
}