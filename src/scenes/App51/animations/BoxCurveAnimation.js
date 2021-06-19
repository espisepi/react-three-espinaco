import React, { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';
import { Box } from 'drei'
import { Linear } from 'gsap';

import Curve from '../../../drei-espinaco/Curve';


export default function BoxCurveAnimation({gsap, visibleLine = false, visible = false}){

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
    <Curve points={pointsDefault} /* top={top} */  visibleLine={visibleLine} visible={visible} velocity={0.1}>
        <Box name='boxCurve' scale={[5,5,5]} material-color='green' />
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

const pointsDefault = [
    [-20.80479621887207, 14.568523406982422, 8.236968040466309] ,
    [-20.80479621887207, 14.568523406982422, 8.236968040466309] ,
    [-78.42012023925781, 21.7979736328125, 14.137633323669434] ,
    [-126.66670989990234, 23.423503875732422, 14.849699974060059] ,
    [-147.4891357421875, 22.646026611328125, 24.409330368041992] ,
    [-150.39739990234375, 22.743762969970703, 71.13949584960938] ,
    [-137.9447784423828, 26.252412796020508, 134.70672607421875] ,
    [-91.48371124267578, 27.979162216186523, 194.11053466796875] ,
    [-17.995662689208984, 37.15248489379883, 205.71490478515625] ,
    [9.17502498626709, 43.28644561767578, 147.34912109375] ,
    [-10.84031867980957, 56.304988861083984, 89.134521484375] ,
    [-33.14289855957031, 61.09523391723633, 33.040035247802734] ,
    [-76.85803985595703, 52.232826232910156, 57.018306732177734] ,
    [-110.11432647705078, 52.027366638183594, 78.48513793945312] ,
    [-140.96278381347656, 50.60854721069336, 133.5706787109375] ,
    [-141.9256591796875, 50.8936882019043, 157.24957275390625] ,
    [-96.6279296875, 55.019798278808594, 210.46185302734375] ,
    [-76.76349639892578, 44.65653991699219, 92.280517578125] ,
    [-131.4158935546875, 77.56108856201172, 80.35659790039062] ,
    [-156.50245666503906, 77.26237487792969, 134.53466796875] ,
    [-139.60226440429688, 98.49053192138672, 131.2060546875] ,
    [-103.15132141113281, 94.32512664794922, 176.21014404296875] ,
    [-117.85550689697266, 96.3292465209961, 153.36572265625] ,
    [-111.27154541015625, 82.22543334960938, 175.318359375] ,
    [-140.26141357421875, 79.8313980102539, 168.25018310546875] ,
    [-156.50245666503906, 77.26237487792969, 134.53466796875] ,
    [-131.4158935546875, 77.56108856201172, 80.35659790039062] ,
    [-76.76349639892578, 44.65653991699219, 92.280517578125] ,
    [-96.6279296875, 55.019798278808594, 210.46185302734375] ,
    [-141.9256591796875, 50.8936882019043, 157.24957275390625] ,
    [-140.96278381347656, 50.60854721069336, 133.5706787109375] ,
    [-110.11432647705078, 52.027366638183594, 78.48513793945312] ,
    
]