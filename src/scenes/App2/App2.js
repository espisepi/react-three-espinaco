import React, {useRef, useMemo, useEffect, useState, useCallback} from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, Box } from 'drei';
import * as THREE from 'three';

import './styles.css';

import Loading from '../../components/Loading';
import Curve from '../../drei-espinaco/Curve';

export function Scene({top = 0}) {
    /* Normalizamos la variable top */
    const { size } = useThree();
    const scrollMax = size.height * 4;
    const topNormalized = top / scrollMax;
    console.log(topNormalized)

    return (
        <>
        <ambientLight />
        {/* <Loading /> */}
        <Curve draw={true} top={topNormalized} >
            <Box />
        </Curve>
        <OrbitControls />
        </>
    );
}

export default function App2(props) {
    const pages = 4;
    // const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }))
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