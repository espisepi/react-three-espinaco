import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { Stars, Sky } from 'drei';

import FullScreen from '../../drei-espinaco/Fullscreen';
import ClickToStartPanel from '../../drei-espinaco/ClickToStartPanel';

import { Catedral } from './components/Prefab';
import ScrollAnimations from './animations/ScrollAnimations';
import ControlsManager from './components/ControlsManager';

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

        <ControlsManager />

        </>
    );
}

export default function App51(props) {



    return (
    <>
    <div id='root_app' style={{overflow:'hidden'}}>
    <Canvas gl={{antialias: true}} onCreated={ ({gl}) => gl.toneMapping = 0 } className="canvas" style={{ backgroundColor:'#000', position:'fixed', width:'100%', height:'100vh', zIndex:'5'}} colorManagement>
        <ClickToStartPanel parentId='root_app'>
            <Scene />
        </ClickToStartPanel>
    </Canvas>
    {/* <SectionsHtml /> */}
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

