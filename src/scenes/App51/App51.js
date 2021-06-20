import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
import { Stars, Sky } from 'drei';

import FullScreen from '../../drei-espinaco/Fullscreen';
import ClickToStartPanel from '../../drei-espinaco/ClickToStartPanel';
import Joystick from '../../drei-espinaco/Joystick';

import { Catedral } from './components/Prefab';
import ScrollAnimations from './animations/ScrollAnimations';
import ControlsManager from './components/ControlsManager';

export function Scene({mode, autoRotate}) {
    
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
        <pointLight position={[-20,-3,5]}  />
        <Sky
            distance={450000} // Camera distance (default=450000)
            
            inclination={0.65} // Sun elevation angle from 0 to 1 (default=0)
            azimuth={0.50} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        />

        <Stars radius={200} />

        <Suspense fallback={null}>
            <Catedral />
        </Suspense>

        <Suspense fallback={null}>
            <ScrollAnimations />
        </Suspense>

        <ControlsManager mode={mode} autoRotate={autoRotate} />

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

    return (
    <>
    <div id='root_app' style={{overflow:'hidden'}}>
    <Canvas gl={{antialias: true}} onCreated={ ({gl}) => gl.toneMapping = 0 } className="canvas" style={{ backgroundColor:'#000', position:'fixed', width:'100%', height:'100vh', zIndex:'5'}} colorManagement>
        <ClickToStartPanel parentId='root_app'>
            <Scene mode={mode} autoRotate={autoRotate} />
        </ClickToStartPanel>
    </Canvas>
    {/* <SectionsHtml /> */}
    <div onClick={changeMode} style={{ position:'absolute', width:'30px', height:'30px', bottom: 135, backgroundImage:'url("assets/img/icon/scene64.png")', backgroundSize:'cover' , color: '#e60005', zIndex: 20, cursor: 'pointer', opacity:1.0 }}></div>
    { mode === 1 ? (<Joystick />) : null }
    <div onClick={changeAutoRotate} style={{ backgroundImage:'url("assets/img/icon/360_64.png")', backgroundSize:'cover', position:'absolute', width:'30px', height:'30px', bottom: 95, color: '#e60005', zIndex: 20, cursor: 'pointer', opacity:1.0 }}></div>
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

