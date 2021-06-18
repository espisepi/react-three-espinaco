import React from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CameraAnimation from './CameraAnimation'

gsap.registerPlugin(ScrollTrigger);
export default function ScrollAnimations(){
    return (
        <>
        <CameraAnimation gsap={gsap} />
        </>
    );
}