import React, {useRef, useMemo, useEffect, useState, useCallback} from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, Box } from 'drei';
import * as THREE from 'three';

import Loading from '../../components/Loading';
import Curve from '../../drei-espinaco/Curve';

import Camera from '../../components/Camera';

const pointsForCurve = [
    [0,0,-20],
    [0,1,0],
    [0,-1,20]
]

export function Scene({top = 0}) {
    /* Normalizamos la variable top */
    const { size } = useThree();
    const scrollMax = size.height * 4;
    const topNormalized = top / scrollMax;

    return (
        <>
        <ambientLight />
        <Curve points={pointsForCurve} draw={true} top={topNormalized} >
            <Box position={[0,0,-10]} />
        </Curve>
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App2(props) {
    const pages = 4;
    const [ top, setTop ] = useState(0);
    const onScroll = useCallback(e => setTop(e.target.scrollTop), [])
    
    return (
    <>
        <Canvas className="canvas" >
            <Scene top={top} />
        </Canvas>
        <div className="scroll-container" onScroll={onScroll}>
            <div style={{ height: `${pages * 100}vh` }} />
        </div>
    </>
    );
}