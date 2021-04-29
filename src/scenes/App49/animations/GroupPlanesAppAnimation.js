import React, { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';

export default function GroupPlanesAppAnimation({gsap}){

    /* ------------------ Get Object3D that we use to animate ---------- */
    const [groupPlanesApp, setGroupPlanesApp] = useState();
    const { scene } = useThree();
    useEffect(()=>{
        if( !groupPlanesApp && scene.getObjectByName('groupPlanesApp') ) {
            setGroupPlanesApp( scene.getObjectByName('groupPlanesApp') );
        }
    },[scene.children.length]);

    /* ----------------- Animate Objects3D --------- */
    const[firstTime,setFirsTime] = useState(true);
    useEffect(()=>{

        if(groupPlanesApp && firstTime) {
            setFirsTime(false);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-two",
                    start: 'top top',
                    endTrigger: ".section-eight",
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });
            tl.to(groupPlanesApp.position, { y: 20.0 });
        }

    }, [scene.children.length]);

   return null;
}