import React from 'react';


import HelicopterCurveAnimation from './HelicopterCurveAnimation'
import { pathTest } from '../paths'

export default function ScrollAnimations(){
    return (
        <>
        <HelicopterCurveAnimation pointsDefault={pathTest} />
        </>
    );
}