import React from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BoxCurveAnimation from './BoxCurveAnimation'

gsap.registerPlugin(ScrollTrigger);
export default function ScrollAnimations(){
    return (
        <>
        <BoxCurveAnimation gsap={gsap} />
        </>
    );
}