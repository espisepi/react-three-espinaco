import React, { Suspense, useRef, useState, useEffect, useCallback } from "react"
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from "react-three-fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"

import "react-colorful/dist/index.css"
import './style.css';

import Hamburger from 'hamburger-react';

import Stars from '../../drei-espinaco/Stars'

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
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
  },
})

const modelState = proxy({
    showPanelItems: false,
    current: {
        src: 'assets/obj/minerales/3.glb',
        img: 'assets/obj/minerales/3.jpg',
        position:[0,0.3,0],
        scale: [1,1,1],
        camera: [0.62,0.29,0.55] // Camera position
    },
    items: [
        {
          src: 'assets/obj/minerales/3.glb',
          img: 'assets/obj/minerales/3.jpg',
          position:[0,0.3,0],
          scale: [1,1,1],
          camera: [0.62,0.29,0.55]
        },
        {
          src: 'assets/obj/minerales/5.glb',
          img: 'assets/obj/minerales/5.jpg',
          position:[0.0,-0.1,-0.2],
          scale: [1,1,1],
          camera: [-0.93, 0.16, 0.16],
        },
        // {
        //     src: 'assets/obj/minerales/4.glb',
        //     img: 'assets/obj/minerales/4.jpg',
        //     scale: [1,1,1]
        // },
        {
          src: 'assets/obj/cabezaPiedra.glb',
          img: 'assets/obj/cabezaPiedra.jpg',
          position: [0.0,-0.2,-0.2],
          camera: [-0.88,0.64,-0.30]
      }
    ]
});

function Loading() {
  const { camera } = useThree();
  useEffect(()=>{
    camera.position.set(0,0,-3);
  },[camera]);
  return (
      <group >
          <mesh>
              <sphereBufferGeometry attach='geometry' args={[1,32,16]} />
              <meshPhysicalMaterial attach='material' color='#774936' clearcoat={1.0} metalness={1.0} />
          </mesh>
      </group>
  );
}

function Shoe() {
  const ref = useRef()
  const snap = useProxy(state)
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("assets/obj/shoe-draco.glb")

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  // Cursor showing current color
  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} material-color={snap.items.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={snap.items.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={snap.items.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={snap.items.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={snap.items.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={snap.items.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} material-color={snap.items.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={snap.items.patch} />
    </group>
  )
}

function Picker() {
  const snap = useProxy(state)
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1 className="h1-colorful">{snap.current}</h1>
    </div>
  )
}

function Model3D({}) {
    const snap = useProxy(modelState);
    const gltf = useGLTF(snap.current.src);
    const { scene, gl, camera } = useThree();
    // const axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( axesHelper );
    useEffect(()=>{
      if(snap.current.camera){
        const position = snap.current.camera;
        camera.position.set(position[0],position[1], position[2]); 
      } else {
        camera.position.set(0,0,-3); 
      }
    },[gltf]);
    // useFrame(()=>{
    //   console.log(camera.position)
    // })
    useEffect(()=>{
        if(snap.current.position){
          gltf.scene.position.set(...snap.current.position);
        }
        if(snap.current.rotation){
          gltf.scene.rotation.set(...snap.current.rotation);
        }
        scene.add(gltf.scene);
        return () => {
            gltf.scene.traverse( object => {
                if(object.isMesh){
                    object.geometry.dispose();
                    object.material.dispose();
                }
            });
            scene.remove(gltf.scene);
            // gl.renderLists.dispose();
        }
    },[gltf]);
    return null;
}

function PanelItems() {
    const snap = useProxy(modelState);

    const handleSelectedItem = useCallback((index) => {
        const itemSelected = snap.items[index];
        modelState.current = itemSelected;

        modelState.showPanelItems = false;
    },[]);

    return (
      <>
      <div style={{position:'absolute', width:'100%', height:'100vh', backgroundColor:'#333333', opacity:'0.5' }}></div>
      <div style={{top:'30px', position:'absolute', display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
          { snap.items.map((k,i) => (
              <div key={i} style={{width:'100px', height:'100px', margin:'10px', backgroundImage:`url("/${k.img}")`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center', borderRadius:'20px', cursor:'pointer' }}
                           className='panel-items-children'
                           onClick={()=>handleSelectedItem(i)}></div>
          ))}
      </div>
      </>
    )
  }


export default function App() {
    const snap = useProxy(modelState);

    const handleShowPanelItems = useCallback(()=>{
      modelState.showPanelItems = !modelState.showPanelItems;
    },[]);

    return (
    <>
      <Canvas concurrent style={{backgroundColor:'black', position:'absolute'}} pixelRatio={[1, 2]} camera={{ position: [0, 0, 2.75] }}>
        <ambientLight intensity={0.3} />
        {/* <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} /> */}
        <Stars />
        <Suspense fallback={<Loading />}>
          <Model3D />
          <Environment files="assets/env/herkulessaulen_1k.hdr" background={true} />
          {/* <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} /> */}
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
      <Picker />
      {snap.showPanelItems ? (<PanelItems />) : null}
      <Hamburger toggled={snap.showPanelItems} toggle={handleShowPanelItems} color='#FFFFFF' />
      {/* <div onClick={()=>modelState.showPanelItems = !modelState.showPanelItems} style={{ position:'absolute', width:'20px', height:'20px', bottom: 40, borderStyle: 'dashed', color: '#e60005', zIndex: 20 }}></div> */}
    </>
  )
}
