import React, { Suspense, useState, useCallback, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, useGLTF } from 'drei';
import Loading from '../../components/Loading';

import Stars from '../../drei-espinaco/Stars';

import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { modelActiveState, modelsState } from './state';

import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';

function Model3D({src}) {
    const mesh = useRef(null);
    useEffect(()=>{
        console.log(src)
        if(mesh.current) {
            console.log(mesh)
        }
    },[src]);
    const gltf = useGLTF(src);
    return <a.primitive object={gltf.scene} />;
}

function PanelOptions({visible=false, controls}) {
    const [models] = useRecoilState(modelsState);
    const [modelActive, setModelActive] = useRecoilState(modelActiveState);

    const handleOption = useCallback((id)=>{
        const modelSelected = models.array[id];
        setModelActive({
            src: modelSelected.src,
            opacity: 1.0
        });
    },[]);
    
    return (
    <>
        <mesh>
            <planeBufferGeometry args={[1,1,1,1]} />
            <meshBasicMaterial color='red' />
        </mesh>

        <mesh scale={[0.2,0.2,0.2]} position={[0,0,0.1]} onClick={()=>handleOption(0)}>
            <planeBufferGeometry args={[1,1,1,1]} />
            <meshBasicMaterial color='blue' />
        </mesh>
        <mesh scale={[0.2,0.2,0.2]} position={[0.5,0,0.1]} onClick={()=>handleOption(1)}>
            <planeBufferGeometry args={[1,1,1,1]} />
            <meshBasicMaterial color='blue' />
        </mesh>
    </>
    );
}

function ViewController({viewMenu, controls}) {
    // console.log(viewMenu)
    const [modelActive, setModelActive] = useRecoilState(modelActiveState);
    return(
        <>
        <Suspense fallback={<Loading />}>
            <Model3D src={modelActive.src} />
        </Suspense>
        <PanelOptions controls={controls} />
        </>
    );
}

export function Scene({viewMenu}) {
    const controls = useRef(null);

    const [modelActive, setModelActive] = useRecoilState(modelActiveState);
    
    return(
        <>
        <ambientLight />
        <Stars />
        <ViewController viewMenu={viewMenu} controls={controls} />
        <OrbitControls ref={controls} />
        </>
    );
}

export default function AppDirty(props) {

    const [viewMenu, setViewMenu] = useState(false);
    const handleViewMenu = useCallback(()=>{
        setViewMenu( v => !v);
    },[]);
    
    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <RecoilRoot>
            <Scene viewMenu={viewMenu} />
        </RecoilRoot>
    </Canvas>
    <div onClick={handleViewMenu}  style={{ position:'absolute', width:'20px', height:'20px', bottom: 80, borderStyle: 'dashed', color: '#e60005', zIndex: 20 }}></div>
    </>
    );
}