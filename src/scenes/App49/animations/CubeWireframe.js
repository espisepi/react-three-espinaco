import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';

export default function CubeWireframe({gsap}){

    /* ------------------ Get Object3D that we use to animate ---------- */
    const [cubeWireframe, setCubeWireframe] = useState();
    const { scene } = useThree();
    useEffect(()=>{
        if( !cubeWireframe && scene.getObjectByName('cubeWireframe') ) {
            setCubeWireframe( scene.getObjectByName('cubeWireframe') );
        }
    },[scene.children.length]);

    /* ----------------- Animate Objects3D --------- */
    useEffect(()=>{

        if(cubeWireframe) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-one",
                    start: 'bottom bottom',
                    endTrigger: ".section-three",
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });
            tl.to(cubeWireframe.position, { z: 2 });
            // tl.to(cubeWireframe.position, { z: 0 });
            // tl.to(cubeWireframe.position, { y: 0 });
        }

    }, [scene.children.length]);

    useFrame(()=>{
        if(cubeWireframe){
            cubeWireframe.rotation.y += 0.01;
        }
    })

   return null;
}