import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { Stars } from 'drei';
import ScrollAnimations from './animations/ScrollAnimations';

import FullScreen from '../../drei-espinaco/Fullscreen';

import Catedral from './components/Catedral'

import OrbitControlsFollowTarget from './components/OrbitControlsFollowTarget';

export function Scene() {
    
    // useEffect( () => {

    //     THREE.DefaultLoadingManager.onStart = () => console.log('start loading');
    //     THREE.DefaultLoadingManager.onLoad = () => console.log(' Loading complete ');
    //     THREE.DefaultLoadingManager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
    //         console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    //     };

    // }, [] );

    

    return(
        <>
        <ambientLight />
        <pointLight position={[0,-3,5]}  />
        <Stars radius={200} />
        <Suspense fallback={null}>
            <group name="cubeWireframe" position={[0,0,8]}>
                <mesh>
                    <boxBufferGeometry args={[1,1,1]} />
                    <meshBasicMaterial wireframe={true} />
                </mesh>
            </group>
            <group name="cubeWireframe" position={[0,0,-8]}>
                <mesh>
                    <boxBufferGeometry args={[1,1,1]} />
                    <meshBasicMaterial wireframe={true} color='green' />
                </mesh>
            </group>
            <Catedral />
        </Suspense>
        <OrbitControlsFollowTarget nameTarget='groupCurve_boxCurve' />
        <ScrollAnimations />
        </>
    );
}

export default function App51(props) {

    return (
    <>
    <div style={{overflow:'hidden'}}>
    <Canvas gl={{antialias: true}} onCreated={ ({gl}) => gl.toneMapping = 0 } className="canvas" style={{ backgroundColor:'#000', position:'fixed', width:'100%', height:'100vh', zIndex:'5'}} colorManagement>
        <Scene />
    </Canvas>
    <SectionsHtml />
    <FullScreen width='30px' position='fixed' height='30px' backgroundImage={'url("assets/img/icon/fullscreen64.png")'} backgroundSize={'cover'} borderStyle={'none'} WebkitFilter={'invert(100%)'} opacity={0.6} />  
    </div>
    </>
    );
}

/* To see background debug, comment line "backgroundColor:'#000'" in <Canvas> element above*/
function SectionsHtml(){
    return (
        <>
        <section className="section-one" style={{ ...section, ...tomatoColor }}></section>
        <section className="section-two" style={{ ...section, ...steelblueColor }}></section>
        <section className="section-three" style={{ ...section, ...limeColor }}></section>
        <section className="section-four" style={{ ...section, ...tomatoColor }}></section>
        <section className="section-five" style={{ ...section, ...limeColor }}></section>
        <section className="section-six" style={{ ...section, ...tomatoColor }}></section>
        <section className="section-sevent" style={{ ...section, ...limeColor }}></section>
        <section className="section-eight" style={{ ...section, ...tomatoColor }}></section>
        </>
    );
}

const section = {
    width: '100%',
    height: '100vh',
    position: 'relative'
}

const tomatoColor = {
    backgroundColor: 'tomato'
}

const steelblueColor = {
    backgroundColor: 'steelblue'
}

const limeColor = {
    backgroundColor: 'lime'
}

