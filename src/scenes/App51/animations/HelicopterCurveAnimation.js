import React from 'react';

import Curve from '../../../drei-espinaco/Curve';

import { Helicopter } from '../components/Prefab';


export default function HelicopterCurveAnimation({top, visibleLine = false, visible = true, pointsDefault, ...props }) {
   return (

    <Curve points={pointsDefault} /* top={top} */  visibleLine={visibleLine} visible={visible} velocity={0.1}>
        <group name='boxCurve' {...props} >
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
