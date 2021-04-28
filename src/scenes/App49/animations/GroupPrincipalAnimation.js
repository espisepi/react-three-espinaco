import React, { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';

export default function GroupPrincipalAnimation({gsap}){

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