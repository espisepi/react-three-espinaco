import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { Box, Text } from 'drei'
import { path } from '../App51/paths'
import Curve from '../../drei-espinaco/Curve';

export default function Loading(){

    const mesh = useRef(null);
    useFrame(() => {
        if( mesh ) {
            mesh.current.rotation.y += 0.05;
        }
    })
    return (
        <Curve points={path} /* top={top} */  visibleLine={false} visible={true} velocity={0.1}>
            <group ref={mesh} name='boxCurve' >
                <Box scale={[5,5,5]} material-color='green' material-wireframe={true} />
                <Text position={[0,0,0]} fontSize={ 1.0 } color='black' >
                    Loading...
                </Text>
            </group>
        </Curve>
    )
}