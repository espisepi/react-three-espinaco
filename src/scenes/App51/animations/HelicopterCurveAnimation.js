import React, { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';
import { Box } from 'drei'
import { Linear } from 'gsap';

import Curve from '../../../drei-espinaco/Curve';

import { Helicopter } from '../components/Prefab';


export default function HelicopterCurveAnimation({gsap, visibleLine = false, visible = false, pointsDefault}){

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
    <Curve points={pointsDefault} /* top={top} */  visibleLine={visibleLine} visible={true} velocity={0.1}>
        <group name='boxCurve'>
            {/* <Box name='boxCurve' scale={[5,5,5]} material-color='green' /> */}
            <Helicopter scale={[1,1,1]} />
        </group>
    </Curve>
   );
}

// const circleGeometry = new THREE.CircleBufferGeometry( 5, 32);
// const attributePosition = circleGeometry.attributes.position.array;

// const pointsDefault = [];
// for(let i = 0; i < attributePosition.length - 3; i += 3) {
//     pointsDefault.push( [ attributePosition[i], attributePosition[i+1], attributePosition[i+2] ] )
// }
// console.log(pointsDefault)

// const pointsDefault = [
//     [ 0, 0, 0 ],
//     [ 0,  0, -5 ],
//     [  0,  0, 0 ],
//     [  0, 0, 5 ],
//     [ 0,  0, 0 ]
// ];
