import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';

export default function CameraAnimation({gsap}){

    /* ------------------ Get Object3D that we use to animate ---------- */
    const { camera } = useThree();
    /* ----------------- Animate Objects3D --------- */
    useEffect(()=>{

        if(camera) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-five",
                    start: 'bottom bottom',
                    endTrigger: ".section-eight",
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });
            tl.to(camera.rotation, { x: 1.5 });
        }

    }, []);

   return null;
}