import React from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HelicopterCurveAnimation from './HelicopterCurveAnimation'
import { pathTest } from '../paths'

gsap.registerPlugin(ScrollTrigger);
export default function ScrollAnimations(){
    return (
        <>
        <HelicopterCurveAnimation gsap={gsap} pointsDefault={pathTest} />
        </>
    );
}