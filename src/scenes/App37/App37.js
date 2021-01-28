import React, { useEffect, useMemo } from 'react';
import { Canvas, useLoader, useThree } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls, useFBX, useAnimations } from 'drei';
import Loading from '../../components/Loading';
import { Suspense } from 'react';
import { combineBuffer } from './combineBuffer';
import { createMesh } from './createMesh';
import { useSphere } from 'use-cannon';

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
    return(
        <>
        <ambientLight />
        <Suspense fallback={<Loading />}>
            <Head />
        </Suspense>
        <OrbitControls />
        </>
    );
}

export default function AppDirty(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    );
}

//https://stackoverflow.com/questions/56347639/react-useeffect-vs-usememo-vs-usestate