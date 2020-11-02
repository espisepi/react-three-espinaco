// Thanks to https://codesandbox.io/embed/7psew (Paul Henschel, drcmda)

import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState, useCallback } from 'react'
import { Canvas, useThree, useFrame, useLoader } from 'react-three-fiber'
import { Flex, Box } from 'react-three-flex'
import { useAspect } from 'drei/misc/useAspect'
import { Line } from 'drei/abstractions/Line'
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';

import Text from './Text';
import Geo from './Geo';
import state from './state';
import Page from './Page';
import Layercard from './Layercard';
import Effects from './Effects';


export default function App3(props) {
    const scrollArea = useRef()
    const onScroll = (e) => (state.top = e.target.scrollTop)
    useEffect(() => void onScroll({ target: scrollArea.current }), [])
    const [pages, setPages] = useState(0);
    return (
        <>
        <Canvas className="canvas" style={{backgroundColor:'#43776e'}}
        concurrent
        colorManagement
        shadowMap
        noEvents
        pixelRatio={2}
        camera={{ position: [0, 0, 10], far: 1000 }}
        gl={{ powerPreference: 'high-performance', alpha: false, antialias: false, stencil: false, depth: false }}
        onCreated={({ gl }) => gl.setClearColor('#43776e')}
        >
            <Scene onReflow={setPages} />
        </Canvas>
        <div
            className="scroll-container"
            ref={scrollArea}
            onScroll={onScroll}
            onPointerMove={(e) => (state.mouse = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1])}>
        <div style={{ height: `${pages * 100}vh` }} />
        </div>
        </>
    );
}

export function Scene({ onReflow }) {
  return(
      <>
      <ambientLight />
      <Suspense fallback={<Loading />}>
        <Content onReflow={onReflow} />
      </Suspense>
      <OrbitControls />
      <Effects />
      </>
  );
}

function Content({ onReflow }) {
    const group = useRef()
    const { viewport, size } = useThree()
    const [bW, bH] = useAspect('cover', 1920, 1920, 0.5)
    const texture = useLoader(THREE.TextureLoader, state.depthbox[0].image)
    const vec = new THREE.Vector3()
    const pageLerp = useRef(state.top / size.height)
    useFrame(() => {
      const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / size.height, 0.15))
      const y = page * viewport.height
      const sticky = state.threshold * viewport.height
      group.current.position.lerp(vec.set(0, page < state.threshold ? y : sticky, page < state.threshold ? 0 : page * 1.25), 0.15)
    })
    const handleReflow = useCallback((w, h) => onReflow((state.pages = h / viewport.height + 5.5)), [onReflow, viewport.height])
    const sizesRef = useRef([])
    const scale = Math.min(1, viewport.width / 16)
    return (
      <group ref={group}>
        <Flex dir="column" position={[-viewport.width / 2, viewport.height / 2, 0]} size={[viewport.width, viewport.height, 0]} onReflow={handleReflow}>
          {state.content.map((props, index) => (
            <Page
              key={index}
              left={!(index % 2)}
              textScaleFactor={scale}
              onReflow={(w, h) => {
                sizesRef.current[index] = h
                state.threshold = Math.max(4, (4 / (15.8 * 3)) * sizesRef.current.reduce((acc, e) => acc + e, 0))
              }}
              {...props}
            />
          ))}
          <Box dir="row" width="100%" height="100%" align="center" justify="center">
            <Box centerAnchor>
              {state.lines.map((props, index) => (
                <Line key={index} {...props} />
              ))}
              <Text
                bold
                position-z={0.5}
                anchorX="center"
                anchorY="middle"
                fontSize={1.5 * scale}
                lineHeight={1}
                letterSpacing={-0.05}
                color="black"
                maxWidth={(viewport.width / 4) * 3}>
                {state.depthbox[0].text}
              </Text>
            </Box>
          </Box>
          <Box dir="row" width="100%" height="100%" align="center" justify="center">
            <Box>
              <Layercard {...state.depthbox[0]} text={state.depthbox[1].text} boxWidth={bW} boxHeight={bH} map={texture} textScaleFactor={scale} />
              <Geo position={[bW / 2, -bH / 2, state.depthbox[1].depth]} />
            </Box>
          </Box>
        </Flex>
      </group>
    )
  }