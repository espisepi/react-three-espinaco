import React, {Suspense, useEffect, useState, useMemo} from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame, useLoader } from 'react-three-fiber';
import { OrbitControls, PointerLockControls } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';
import MusicPoints,{AudioComponents} from '../../drei-espinaco/MusicPoints';
import Camera from '../../components/Camera';

import {Physics, useBox, useSphere, useConvexPolyhedron} from 'use-cannon';
import { Ground } from '../../components/Ground';
import { Player } from '../../components/Player';

function Box({mesh}) {
    console.log(mesh)
    const geo = useMemo(() => new THREE.Geometry().fromBufferGeometry(mesh.geometry), [mesh])
    const [ref] = useConvexPolyhedron(() => ({ mass: 100, args: geo, onCollide: e => console.log('collision', e.contact.impactVelocity) }))
    return <mesh ref={ref} geometry={mesh.geometry} material={mesh.material} />;
}

function LoadScenario(){
    const { nodes } = useLoader(GLTFLoader, 'assets/obj/scenarios/scenario1.glb');
    const scene = nodes.Scene;
    // console.log(scene)
    // Rellenamos el array de meshes
	const objects = useMemo(() => {
        const meshes = [];
		scene.traverse((child) =>{
            // Objects with Physics defined
            if(child.hasOwnProperty('userData') && child.userData.hasOwnProperty('data') && child.userData.data === 'physics') {
                if(child.userData.type === 'trimesh'){
                    const box = Box({mesh:child});
                    meshes.push(box);    
                }
                
            }else {
                console.log(child)
                const meshClean = (<primitive object={child}></primitive>);
                meshes.push(meshClean)
            }
        });
		return meshes;
	},[]);
    return (
        objects
    );
}

function LoadGLTF(){
    const {nodes} = useLoader(GLTFLoader, 'assets/obj/scenarios/untitled.glb');
    console.log(nodes)
    return <primitive object={nodes.Cube} />;
}

function LoadFBX(){
    const nodes = useLoader(FBXLoader, 'assets/obj/scenarios/untitled.fbx');
    console.log(nodes)
    return <mesh ref={nodes.children} />;
}

export function Scene({y=0}) {

    const { scene } = useThree()
    // console.log(scene)
    
    return(
        <>
        <ambientLight />
        {/* <pointLight /> */}
        <Suspense fallback={<Loading/>}>
        </Suspense>
        <Physics gravity={[0,-30,0]}>
            {/* <LoadScenario /> */}
            {/* <LoadGLTF /> */}
            <LoadFBX />
            <Ground position={[0,-1,0]} />
			<Player position={[0, 10, 20]} />
        </Physics>
        <PointerLockControls />
        </>
    );
}

export default function AppDirty(props) {
    // const [y] = useYScroll([-100, 2400], { domTarget: window })
    
    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    {/* <aDom.div className="bar" style={{ height: y.interpolate([-100, 2400], ['0%', '100%']) }} /> */}
    </>
    );
}