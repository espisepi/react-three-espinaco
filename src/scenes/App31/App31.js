import React, { Suspense, useRef, useState, useEffect, useCallback } from "react"
import { Canvas, useFrame, useThree } from "react-three-fiber"
import * as THREE from 'three';
import { ContactShadows, Environment, useGLTF, OrbitControls } from "drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"
import Loading from '../../components/Loading';

import HUD from './hud/HUD'

import "react-colorful/dist/index.css"
import './style.css';

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
export const state = proxy({
  current: null,
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
    paint: "#ffffff"
  },
})





function Picker() {
  const snap = useProxy(state)
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1 className="h1-colorful">{snap.current}</h1>
    </div>
  )
}



export default function App() {
  return (
    <>
      <Canvas concurrent style={{backgroundColor:'white'}} pixelRatio={[1, 2]} camera={{ position: [0, 0, 2.75] }}>
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <Suspense fallback={<Loading />}>
          {/* <Shoe /> */}
          {/* <Car /> */}
          <HUD />
          <Environment files="assets/env/royal_esplanade_1k.hdr" background={false} />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
        </Suspense>
        <OrbitControls /*minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2}*/ enableZoom={true} enablePan={true} />
      </Canvas>
      <Picker />
    </>
  )
}
