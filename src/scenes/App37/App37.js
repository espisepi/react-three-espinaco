import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Canvas, useLoader, useThree } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls, useFBX, useAnimations, Stats } from 'drei';
import Loading from '../../components/Loading';
import { Suspense } from 'react';
import { combineBuffer } from './combineBuffer';
import { createMesh } from './createMesh';
import { AudioComponents } from '../App35/MediaPointsShader';

function Person({}) {
    const obj = useLoader(OBJLoader, 'assets/obj/male02/male02.obj');
    return <primitive object={obj} />;
}
function Persons({}) {
    const obj = useLoader(OBJLoader, 'assets/obj/male02/male02.obj');
    const { scene } = useThree();
    useEffect(()=>{
        const positions = combineBuffer( obj, 'position' );
        const mesh = createMesh( {positions:positions, scale:1.0,x:0,y:0,z:0,color:0xff7744 });
        scene.add(mesh);
    });
    return null;
}

function Head({}){
    const fbx = useFBX('assets/obj/simondev/resources/zombie/mremireh_o_desbiens.fbx');
    const positionBufferAttribute = useMemo(()=>combineBuffer(fbx, 'position'));
    const mesh = useMemo(()=>createMesh({ positionBufferAttribute:positionBufferAttribute, position:[0,0,0], scale:1.0, color:0xffff00 }));
    const { scene } = useThree();
    useEffect(()=>{
        scene.add(mesh);
    });

    // animation
    // const fbxWalk = useFBX('assets/obj/simondev/resources/zombie/walk.fbx');
    // const animation = fbxWalk.animations[0]
    // console.log(clips)
    // useEffect(() => {
    //     // scene.add(ref);
    //     actions.jump.play()
    // })
    return null;
}

export function Scene() {

    const { camera } = useThree();
    useEffect(()=>{
        camera.position.z = 80;
    })
    return(
        <>
        <ambientLight />
        <Suspense fallback={<Loading />}>
        <AudioComponents scale={[0.5,0.5,0.5]} videoSrc={'assets/musica/coronil.mp4'} audioSrc={'assets/musica/coronil.mp3'} webcam={false} muted={false} type='VideoPointsShader'/>
        </Suspense>
        <OrbitControls />
        </>
    );
}

export function RunApp37(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Stats />
        <Scene />
    </Canvas>
    );
}

export default function App37(props) {
    const [click, setClick] = useState(false);
    const handleClick = useCallback((e)=>{
        e.preventDefault();
        setClick(true);
    });
    return(
        click ? <RunApp37 /> :
                <div onPointerDown={handleClick} 
                    style={{position:'absolute', width:'100vw', height:'100vh', color:'#101010', backgroundColor:'#343a40', textAlign:'center'}}> <h1>Click on Screen To Start</h1> </div>
    );
}

//https://stackoverflow.com/questions/56347639/react-useeffect-vs-usememo-vs-usestate