import React, {Suspense, useEffect, useState, useCallback} from 'react';
import { Canvas, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF } from 'drei';
import Loading from '../../components/Loading';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';

import { AudioComponents } from '../App35/MediaPointsShader';
import FullScreen from '../../drei-espinaco/Fullscreen';

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

export function Scene({link}) {

    const { camera } = useThree();
    useEffect(()=>{
        camera.position.z = 20;
    });

    return(
        <>
        <ambientLight args={[0x443333, 0.5]} />
        <directionalLight args={[0xffddcc, 0.2]} position={[1, 0.75, 0.5]} />
        <directionalLight args={[0xccccff, 0.2]} position={[-1, 0.75, 0.5]} />
        <Suspense fallback={<Loading />} >
            {/* <Model /> */}
            <AudioComponents videoSrc={link} audioSrc={link} type='VideoPointsShader'/>
        </Suspense>
        {/* <Picture /> */}
        <OrbitControls />
        </>
    );
}

export default function AppDirty(props) {

    const [placeholder, setPlaceholder] = useState('https://www.youtube.com/watch?v=SYM-RJwSGQ8%26ab_channel=ToveLoVEVO');

    const [link, setLink] = useState();
    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const youtubeLink = urlParams.get('url');
        if(youtubeLink){
            setLink(youtubeLink);
        } else {
            setLink('https://www.youtube.com/watch?v=SYM-RJwSGQ8&ab_channel=ToveLoVEVO')
        }
        setPlaceholder(link);
    });
    

    const [input, setInput] = useState();
    const handleInput = useCallback((e)=>{
        setInput(e.target.value);
    })
    const handleSubmit = useCallback((e)=>{
        const youtubeLink = input;
        const redirectUrl = window.location.pathname + '?url=' + youtubeLink;
        window.location.replace(redirectUrl);
    })

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Scene link={link}/>
    </Canvas>
    <FullScreen />
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