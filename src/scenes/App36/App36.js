import React, {Suspense, useEffect, useState, useCallback, useRef} from 'react';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF } from 'drei';
import Loading from './Loading';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';

import { AudioComponents } from './MediaPointsShader';
import FullScreen from '../../drei-espinaco/Fullscreen';

import Scene1 from './scene1';
import PanelItems from './PanelItem';
import Hamburger from 'hamburger-react';

import { HexColorPicker } from "react-colorful";

// Scenes
import * as App6 from '../App6/App6';

// https://threejs.live/#/webgl_decals
// function Model(){

//     const { scene, camera } = useThree();
//     useEffect(()=>{
//         camera.position.z = 10;
//     });
//     const gltf = useGLTF('assets/obj/LeePerrySmith/LeePerrySmith.glb');
//     const [map,specularMap,normalMap, displacementMap] = useLoader(THREE.TextureLoader, ['assets/obj/LeePerrySmith/Map-COL.jpg','assets/obj/LeePerrySmith/Map-COL.jpg','assets/obj/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg','assets/obj/LeePerrySmith/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg'])

//     const decalMap = useLoader(THREE.TextureLoader, 'assets/img/highkili.png');

//     // TODO: Hacer el dispose de los elementos
//     useEffect(()=>{
//         const mesh = gltf.scene.children[0];
//         // mesh.scale.set(10,10,10);
//         mesh.material = new THREE.MeshPhongMaterial( {
//             specular: 0x111111,
//             map: map,
//             specularMap: specularMap,
//             normalMap: normalMap,
//             shininess: 25,
//             bumpMap: displacementMap,
//             bumpScale: 12
//         } );
//         scene.add(mesh);

//         const decalMaterial = new THREE.MeshPhongMaterial({
//             specular: 0x444444,
//             map: decalMap,
//             shininess: 30,
//             transparent: true,
//             depthTest: true,
//             depthWrite: false,
//             polygonOffset: true,
//             polygonOffsetFactor: - 4,
//             wireframe: false
//         });
//         const position = new THREE.Vector3(0,0,-1);
//         const rotation = new THREE.Euler(0,0,0);
//         const scale = new THREE.Vector3(5,5,5);
//         const decal = new THREE.Mesh( new DecalGeometry( mesh, position, rotation, scale ), decalMaterial );
//         scene.add(decal);
//     },[]);

//     useEffect(()=>{
       
//     });

//     return null;

// }

export function Scene({link, webcam, muted, autoRotate, colorInput}) {

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
            <AudioComponents videoSrc={link} audioSrc={link} webcam={webcam} muted={muted} type='VideoPointsShader' colorInput={colorInput} />
        </Suspense>
        {/* <Picture /> */}
        <OrbitControls ref={orbitRef} enabled={orbitEnabled} enablePan={false} autoRotateSpeed={1.6} />
        </>
    );
}

export function RunApp36() {

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

        const params = new URLSearchParams(window.location.search)
        const sceneParam = params.get('scene') ? `&scene=${ parseInt( params.get('scene') ) }` : ''

        const youtubeLink = input || link;

        const redirectUrl = window.location.pathname + '?url=' + youtubeLink + sceneParam;

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

    const urlParams = new URLSearchParams(window.location.search)
    const sceneIndexParam = urlParams.get('scene') ? parseInt(urlParams.get('scene')) : 0;
    const [sceneIndex, setSceneIndex] = useState(sceneIndexParam);
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
    });

    const [firstTime, setFirsTime] = useState(true);
    const [color, setColor] = useState('#ff0000');
    const [colorInput, setColorInput] = useState(new THREE.Vector3(0,0,0));
    useEffect(()=>{
        if(firstTime) {
            setFirsTime(false);
            setColorInput( new THREE.Vector3(0,0,0) );
        } else {
            const colorVector = new THREE.Color(color);
            setColorInput( new THREE.Vector3(colorVector.r, colorVector.g, colorVector.b ) );
        }
    },[color]);
    const restoreColor = useCallback(()=>{
        setColorInput( new THREE.Vector3(0,0,0) );
    });
    
    const [showColorPicker, setShowColorPicker] = useState(false);
    const changeShowColorPicker = useCallback(()=>{
        setShowColorPicker( s => !s );
    });

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute', width:'100%', height:'100vh'}} camera={{far:20000}}>
        <Suspense fallback={<Loading />}>
            {sceneIndex === 0 ? <Scene link={link} webcam={webcam} muted={muted} autoRotate={autoRotate} colorInput={colorInput} /> : null}
            {sceneIndex === 1 ? <App6.Scene url={link} webcam={webcam} muted={muted} autoRotate={autoRotate} /> : null}
        </Suspense>
    </Canvas>

    { showPanel && <PanelItems setInput={setInput} handleSubmit={handleSubmit} /> }

    <div style={{zIndex:20, position:'absolute', right:'10px', top:'10px'}}>
        <Hamburger toggled={showPanel} toggle={changeShowPanel} color='#FFFFFF' />
    </div>

    { sceneIndex === 0 && showColorPicker && <div style={{zIndex:20, position:'absolute', top:100}}> <HexColorPicker color={color} onChange={setColor} /> <div style={{width:'100px', height:'100px', size:'50px', color:'red', cursor: 'pointer'}} onPointerDown={restoreColor}>Reset Color</div> </div> }
    { sceneIndex === 0 && <div onClick={changeShowColorPicker} style={{ position:'absolute', width:'30px', height:'30px', bottom: 175, backgroundImage:'url("assets/img/icon/color64.png")', WebkitFilter:'invert(100%)', backgroundSize:'cover', color: '#e60005', zIndex: 20, cursor: 'pointer', opacity: 0.6 }}></div> }
    <div onClick={changeSceneIndex} style={{ position:'absolute', width:'30px', height:'30px', bottom: 135, backgroundImage:'url("assets/img/icon/scene64.png")', backgroundSize:'cover' , WebkitFilter:'invert(100%)', color: '#e60005', zIndex: 20, cursor: 'pointer', opacity:0.6 }}></div>
    <div onClick={changeAutoRotate} style={{ backgroundImage:'url("assets/img/icon/360_64.png")', backgroundSize:'cover', position:'absolute', WebkitFilter:'invert(100%)', width:'30px', height:'30px', bottom: 95, color: '#e60005', zIndex: 20, cursor: 'pointer', opacity:0.6 }}></div>
    <div onClick={changeMuted} style={{ backgroundImage:audioIcon, backgroundSize:'cover', position:'absolute', WebkitFilter:'invert(100%)', width:'30px', height:'30px', bottom: 50, color: '#e60005', zIndex: 20, cursor: 'pointer', opacity:0.6 }}></div>
    <FullScreen width='30px' height='30px' backgroundImage={'url("assets/img/icon/fullscreen64.png")'} backgroundSize={'cover'} borderStyle={'none'} WebkitFilter={'invert(100%)'} opacity={0.6} />
    {/* <div onClick={activateWebcam} style={{ position:'absolute', width:'50px', height:'50px', bottom: '50px', borderStyle: 'dashed', color: '#e60005', zIndex: 20, cursor: 'pointer'}}></div>
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