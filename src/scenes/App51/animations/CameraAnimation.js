import React, { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';

import Curve from '../../../drei-espinaco/Curve';
import Camera from '../../../components/Camera';

import { Linear } from 'gsap';

export default function CameraAnimation({gsap}){

    /* ------------------ Get Object3D that we use to animate ---------- */
    const { camera } = useThree();
    /* ----------------- Animate Objects3D --------- */
    const[firstTime,setFirsTime] = useState(true);
    const [ top, setTop ] = useState(0);
    useEffect(()=>{

        if(camera && firstTime) {
            setFirsTime(false);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-one",
                    start: 'top top',
                    endTrigger: ".section-eight",
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });
            // tl.to(top, { y: 1 });
            const obj = { percent : 0 };
            tl.to(obj, {
            percent: 1.0,
            ease: Linear.easeNone,
            duration: 10,
            onUpdate: function() {
                setTop(obj.percent);
            }
        });
        }

    }, [])

   return (
    <Curve points={pointsDefault} top={top}>
        <Camera/>
    </Curve>
   );
}

const pointsDefault = [
    [ 0, 0, 0 ],
    [ 0,  0, -5 ],
    [  0,  0, 0 ],
    [  0, 0, 5 ],
    [ 0,  0, 0 ]
];