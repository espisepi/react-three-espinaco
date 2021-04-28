import React, { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';

import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollAnimations(){

    /* ------------------ Get Objects3D that we use to animate ---------- */

    const [groupPrincipal, setGroupPrincipal] = useState();
    const { scene } = useThree();
    useEffect(()=>{
        if( !groupPrincipal && scene.getObjectByName('groupPrincipal') ) {
            setGroupPrincipal( scene.getObjectByName('groupPrincipal') );
        }
    },[scene.children.length]);

    /* ----------------- Final Get Objects3D ----------- */

    /* ----------------- Animate Objects3D --------- */

    useEffect(()=>{

        gsap.registerPlugin(ScrollTrigger);

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

    /* ----------------- Final Animate Objects3D ---------- */

    
    return null;
}