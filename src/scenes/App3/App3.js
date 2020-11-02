import React, {useRef, useEffect, useState} from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

import state from './state';

export function Scene({}) {
    return(
        <>
        <ambientLight />
        <Loading />
        <OrbitControls />
        </>
    );
}

export default function App3(props) {
    const scrollArea = useRef()
    const onScroll = (e) => (state.top = e.target.scrollTop)
    useEffect(() => void onScroll({ target: scrollArea.current }), [])
    const [pages, setPages] = useState(0)
    return (
        <>
        <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
            <Scene />
        </Canvas>
        <div
            className="scrollArea"
            ref={scrollArea}
            onScroll={onScroll}
            onPointerMove={(e) => (state.mouse = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1])}>
        <div style={{ height: `${pages * 100}vh` }} />
        </div>
        </>
    );
}