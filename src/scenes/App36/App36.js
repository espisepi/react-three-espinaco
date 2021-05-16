import React, {Suspense, useEffect, useState, useCallback, useRef} from 'react';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF } from 'drei';
import Loading from './Loading';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';

import { AudioComponents } from '../App35/MediaPointsShader';
import FullScreen from '../../drei-espinaco/Fullscreen';

import Scene1 from './scene1';
import PanelItems from './PanelItem';
import Hamburger from 'hamburger-react';

// https://threejs.live/#/webgl_decals
function Model(){

    const { scene, camera } = useThree();
    useEffect(()=>{
        camera.position.z = 10;
    });
    const gltf = useGLTF('assets/obj/LeePerrySmith/LeePerrySmith.glb');
    const [map,specularMap,normalMap, displacementMap] = useLoader(THREE.TextureLoader, ['assets/obj/LeePerrySmith/Map-COL.jpg','assets/obj/LeePerrySmith/Map-COL.jpg','assets/obj/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg','assets/obj/LeePerrySmith/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg'])

    const decalMap = useLoader(THREE.TextureLoader, 'assets/img/highkili.png');

    // TODO: Hacer el dispose de los elementos
    useEffect(()=>{
        const mesh = gltf.scene.children[0];
        // mesh.scale.set(10,10,10);
        mesh.material = new THREE.MeshPhongMaterial( {
            specular: 0x111111,
            map: map,
            specularMap: specularMap,
            normalMap: normalMap,
            shininess: 25,
            bumpMap: displacementMap,
            bumpScale: 12
        } );
        scene.add(mesh);

        const decalMaterial = new THREE.MeshPhongMaterial({
            specular: 0x444444,
            map: decalMap,
            shininess: 30,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: - 4,
            wireframe: false
        });
        const position = new THREE.Vector3(0,0,-1);
        const rotation = new THREE.Euler(0,0,0);
        const scale = new THREE.Vector3(5,5,5);
        const decal = new THREE.Mesh( new DecalGeometry( mesh, position, rotation, scale ), decalMaterial );
        scene.add(decal);
    },[]);

    useEffect(()=>{
       
    });

    return null;

}

export function Scene({link, webcam, muted, autoRotate}) {

    const { camera } = useThree();
    useEffect(()=>{
        camera.position.z = -200;
    });
    const [orbitEnabled,setOrbitEnabled] = useState(false);
    const  [firstTime, setFirstTime] = useState(true);
    const loadingRef = React.createRef();
 
    useFrame(()=>{
        if(firstTime && loadingRef.current === null){
            setFirstTime(false);
            setOrbitEnabled(true);
            console.log('this message only must show once time to enable orbitControls');
        }
    })

    const orbitRef = useRef();
    useFrame(()=>{
        if( orbitEnabled && orbitRef.current){
            orbitRef.current.autoRotate = autoRotate;
        }
    })
    
    return(
        <>
        <ambientLight args={[0x443333, 0.5]} />
        <Suspense fallback={ <Loading position={[0,0,-195]} rotation={[0,Math.PI,0]} ref={loadingRef} /> } >
            {/* <Model /> */}
            <AudioComponents videoSrc={link} audioSrc={link} webcam={webcam} muted={muted} type='VideoPointsShader'/>
        </Suspense>
        {/* <Picture /> */}
        <OrbitControls ref={orbitRef} enabled={orbitEnabled} enablePan={false} autoRotateSpeed={2.2} />
        </>
    );
}

export function RunApp36(props) {

    const [placeholder, setPlaceholder] = useState('https://www.youtube.com/watch?v=SYM-RJwSGQ8%26ab_channel=ToveLoVEVO');

    const [link, setLink] = useState();
    const [webcam, setWebcam] = useState(false);
    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const youtubeLink = urlParams.get('url');
        if(youtubeLink){
            setLink(youtubeLink);
        } else {
            // https://www.youtube.com/watch?v=SYM-RJwSGQ8&ab_channel=ToveLoVEVO
            setLink('assets/musica/stayHigh.mp4');
        }
        setPlaceholder('https://www.youtube.com/watch?v=SYM-RJwSGQ8&ab_channel=ToveLoVEVO');

        // Webcam option
        const webcam = urlParams.get('webcam');
        if(webcam){
            setWebcam(webcam);
        }
    });
    

    const [input, setInput] = useState();
    const handleInput = useCallback((e)=>{
        setInput(e.target.value);
    })
    const handleSubmit = useCallback((link)=>{
        const youtubeLink = input || link;
        const redirectUrl = window.location.pathname + '?url=' + youtubeLink;
        window.location.replace(redirectUrl);
    })

    const activateWebcam = useCallback(()=>{
        const youtubeLink = link;
        const redirectUrl = window.location.pathname + '?url=' + youtubeLink + '&webcam=' + true;
        window.location.replace(redirectUrl);
    });
    const desactivateWebcam = useCallback(()=>{
        const youtubeLink = link;
        const redirectUrl = window.location.pathname + '?url=' + youtubeLink + '&webcam=' + false;
        window.location.replace(redirectUrl);
    });

    const [muted, setMuted] = useState(0);
    const changeMuted = useCallback(() => {
        setMuted(m => !m)
    });
    const [audioIcon, setAudioIcon] = useState('url("assets/img/icon/volume64.png")');
    useEffect(()=>{
        if(muted){
            setAudioIcon('url("assets/img/icon/mute64.png")');
        } else {
            setAudioIcon('url("assets/img/icon/volume64.png")');
        }
    },[muted])

    const [sceneIndex, setSceneIndex] = useState(0);
    const changeSceneIndex = useCallback(()=>{
        setSceneIndex( (sceneIndex + 1) % 2 );
    });

    const [showPanel, setShowPanel] = useState(false);
    const changeShowPanel = useCallback(()=> {
        setShowPanel(s => !s);
    });

    const [autoRotate, setAutoRotate] = useState(false);
    const changeAutoRotate = useCallback(()=>{
        setAutoRotate(a => !a);
    })
    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute', width:'100%', height:'100vh'}}>
        <Suspense fallback={<Loading />}>
            {sceneIndex === 0 ? <Scene link={link} webcam={webcam} muted={muted} autoRotate={autoRotate} /> : null}
            {sceneIndex === 1 ? <Scene1 link={link} webcam={webcam} muted={muted} /> : null}
        </Suspense>
    </Canvas>
    { showPanel && <PanelItems setInput={setInput} handleSubmit={handleSubmit} /> }
    <div style={{zIndex:20, position:'absolute', right:'10px'}}>
        <Hamburger toggled={showPanel} toggle={changeShowPanel} color='#FFFFFF' />
    </div>
    <FullScreen width='30px' height='30px' backgroundImage={'url("assets/img/icon/fullscreen64.png")'} backgroundSize={'cover'} borderStyle={'none'} WebkitFilter={'invert(100%)'} opacity={0.6} />
    <div onClick={changeAutoRotate} style={{ backgroundImage:'url("assets/img/icon/360_64.png")', backgroundSize:'cover', position:'absolute', WebkitFilter:'invert(100%)', width:'30px', height:'30px', bottom: 95, color: '#e60005', zIndex: 20, cursor: 'pointer', opacity:0.6 }}></div>
    <div onClick={changeMuted} style={{ backgroundImage:audioIcon, backgroundSize:'cover', position:'absolute', WebkitFilter:'invert(100%)', width:'30px', height:'30px', bottom: 50, color: '#e60005', zIndex: 20, cursor: 'pointer', opacity:0.6 }}></div>
    {/* <div onClick={changeSceneIndex} style={{ position:'absolute', width:'30px', height:'30px', top: '70px', borderStyle: 'dashed', color: '#e60005', zIndex: 20, cursor: 'pointer' }}></div>
    <div onClick={activateWebcam} style={{ position:'absolute', width:'50px', height:'50px', bottom: '50px', borderStyle: 'dashed', color: '#e60005', zIndex: 20, cursor: 'pointer'}}></div>
    <div onClick={desactivateWebcam} style={{ position:'absolute', width:'50px', height:'50px', bottom: '50px', left:'50px', borderStyle: 'dashed', color: '#e60005', zIndex: 20, cursor: 'pointer'}}></div> */}
    <input onChange={handleInput}
            placeholder={placeholder}
            style={{position:'absolute', top:'0px', width:'98vw', height:'20px', color:'#ffffff', border:'none', backgroundColor:'transparent', zIndex:10000}}
            type="text"
            value={input}
    />
    <div onPointerDown={handleSubmit}
            style={{position:'absolute',
                    bottom:'0px',
                    right:'0px',
                    width:'70px', height:'20px',
                    textAlign: 'center',
                    opacity:1,
                    color:'#f1faee',
                    border:'none',
                    backgroundColor:'transparent',
                    zIndex:10000,
                    cursor:'pointer'}}
    > Enter </div>
    </>
    );
}

export default function App36(props) {
    const [click, setClick] = useState(false);
    const handleClick = useCallback((e)=>{
        e.preventDefault();
        setClick(true);
    });
    return(
        click ? <RunApp36 /> :
                <div onPointerDown={handleClick} 
                    style={{position:'absolute', width:'100vw', height:'100vh', color:'#101010', backgroundColor:'#343a40', textAlign:'center'}}> <h1>Click on Screen To Start</h1> </div>
    );
}