import React, { Suspense, useState, useCallback, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { Stars, Sky, useHelper } from 'drei';
import * as THREE from 'three';

import FullScreen from '../../drei-espinaco/Fullscreen';
import ClickToStartPanel from '../../drei-espinaco/ClickToStartPanel';
import Joystick from '../../drei-espinaco/Joystick';

import Loading from './components/Loading';

import { Catedral } from './components/Prefab';
import { Animations, AnimationsSimple } from './animations/Animations';
import ControlsManager from './components/ControlsManager';
import MeshTransformControls from '../../drei-espinaco/MeshTransformControls';
import Ocean from '../../drei-espinaco/Ocean';

export function Scene({mode, setMode, autoRotate, physicsVisible}) {
    
    // useEffect( () => {

    //     THREE.DefaultLoadingManager.onStart = () => console.log('start loading');
    //     THREE.DefaultLoadingManager.onLoad = () => console.log(' Loading complete ');
    //     THREE.DefaultLoadingManager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
    //         console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    //     };

    // }, [] );

    return(
        <>
        <ambientLight intensity={0.5} />
        <pointLight position={[200, 200, 50]}  />
        <Sky
            distance={450000} // Camera distance (default=450000)
            
            inclination={0.65} // Sun elevation angle from 0 to 1 (default=0)
            azimuth={0.50} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        />

        <Stars radius={200} />

        {/* <Ocean geometry={new THREE.PlaneBufferGeometry( 10000, 10000 )} position={[0,-0.3,0]} rotation={[0,0,0]} /> */}

        <Suspense fallback={<Loading />}>
            
            <Catedral />
          
            <AnimationsSimple setMode={setMode} />
            
        </Suspense>

        <ControlsManager mode={mode} autoRotate={autoRotate} physicsVisible={physicsVisible} />
        {/* <MeshTransformControls /> */}

        </>
    );
}

export default function App51(props) {

    // mode of controls
    const modesMax = 3;
    const [mode, setMode] = useState(0)
    const changeMode = useCallback(()=>{
        setMode( (mode + 1) % modesMax );
    },[mode]);

    // autoRotate
    const [autoRotate, setAutoRotate] = useState(false);
    const changeAutoRotate = useCallback(()=>{
        setAutoRotate(a => !a);
    },[]);

    // visible physics
    const [physicsVisible, setPhysicsVisible] = useState(false)
    const changePhysicsVisible = useCallback(()=>{
        setPhysicsVisible(v => !v);
    },[])

    return (
    <>
    <div id='root_app' style={{overflow:'hidden'}}>
    <Canvas gl={{antialias: true}} onCreated={ ({gl}) => gl.toneMapping = 0 } className="canvas" style={{ backgroundColor:'#000', position:'fixed', width:'100%', height:'100vh', zIndex:'5'}} colorManagement>
        <ClickToStartPanel parentId='root_app' title='Click To Start <br><br> Catedral - Seville'>
            <Scene mode={mode} setMode={setMode} autoRotate={autoRotate} physicsVisible={physicsVisible} />
        </ClickToStartPanel>
    </Canvas>
    {/* <SectionsHtml /> */}
    { mode === 1 && <div onClick={changePhysicsVisible} style={{ position:'fixed', width:'30px', height:'30px', bottom: 175, backgroundImage:'url("assets/img/icon/color64.png")', backgroundSize:'cover', color: '#e60005', zIndex: 20, cursor: 'pointer', opacity: 1.0 }}></div> }
    { mode === 1 ? (<Joystick />) : null }
    <div onClick={changeMode} style={{ position:'fixed', width:'30px', height:'30px', bottom: 135, backgroundImage:'url("assets/img/icon/scene64.png")', backgroundSize:'cover' , color: '#e60005', zIndex: 20, cursor: 'pointer', opacity:1.0 }}></div>
    <div onClick={changeAutoRotate} style={{ backgroundImage:'url("assets/img/icon/360_64.png")', backgroundSize:'cover', position:'fixed', width:'30px', height:'30px', bottom: 95, color: '#e60005', zIndex: 20, cursor: 'pointer', opacity:1.0 }}></div>
    <FullScreen width='30px' position='fixed' height='30px' backgroundImage={'url("assets/img/icon/fullscreen64.png")'} backgroundSize={'cover'} borderStyle={'none'} opacity={1.0} />  
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

