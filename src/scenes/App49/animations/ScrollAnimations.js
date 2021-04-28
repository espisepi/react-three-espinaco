import React, { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';

import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimationGroupPrincipal(){

     /* ------------------ Get Object3D that we use to animate ---------- */
     const [groupPrincipal, setGroupPrincipal] = useState();
     const { scene } = useThree();
     useEffect(()=>{
         if( !groupPrincipal && scene.getObjectByName('groupPrincipal') ) {
             setGroupPrincipal( scene.getObjectByName('groupPrincipal') );
         }
     },[scene.children.length]);
 
     /* ----------------- Animate Objects3D --------- */
     useEffect(()=>{
 
         if(groupPrincipal) {
             const tl = gsap.timeline({
                 scrollTrigger: {
                     trigger: ".section-one",
                     start: 'top top',
                     endTrigger: ".section-four",
                     end: 'bottom bottom',
                     scrub: 1,
                 }
             });
             tl.to(groupPrincipal.position, { y: 10.0 });
         }
 
     }, [scene.children.length]);

    return null;
}

export default function ScrollAnimations(){
    return (
        <>
        <AnimationGroupPrincipal />
        </>
    );
}