import React from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GroupPrincipalAnimation from './GroupPrincipalAnimation';
import GroupPlanesAppAnimation from './GroupPlanesAppAnimation';


gsap.registerPlugin(ScrollTrigger);
export default function ScrollAnimations(){
    return (
        <>
        <GroupPrincipalAnimation gsap={gsap} />
        <GroupPlanesAppAnimation gsap={gsap} />
        </>
    );
}