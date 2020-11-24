import React, {useRef, useMemo, useEffect, useState, useCallback} from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, Box } from 'drei';
import * as THREE from 'three';

import Loading from '../../components/Loading';
import Curve from '../../drei-espinaco/Curve';

import Camera from '../../components/Camera';

import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        <Curve points={pointsForCurve} draw={true} top={top} >
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

    const [topPercentage, setTopPercentage] = useState(0);
    const scrollContainer = useRef(null);
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollContainer.current,
                start: 'top top',
                end: 'bottom 100%',
                scrub: 5,
                // markers:{color: 'white' }
            }
        });
        const obj = { percent : 0 };
        console.log('mami')
        tl.to(obj, {
            percent: 0.96,
            ease: Linear.easeNone,
            duration: 10,
            onUpdate: function() {
                console.log('oye')
                setTopPercentage(obj.percent);
                console.log(obj.percent)
            }
        });
    },[]);

    
    return (
    <>
        <Canvas className="canvas" style={{position: 'fixed'}} >
            <Scene top={topPercentage} />
        </Canvas>
        <div ref={scrollContainer} className="scroll-container-gsap">
        </div>
    </>
    );
}