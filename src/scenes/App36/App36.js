import React, {Suspense, useEffect} from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF } from 'drei';
import Loading from '../../components/Loading';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';


function Model(){

    const { scene } = useThree();
    // const gltf = useGLTF('assets/obj/shoe-draco.glb');

    // TODO: Hacer el dispose de los elementos
    useEffect(()=>{
        const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2,10,10), new THREE.MeshBasicMaterial({color:'blue'}));
        scene.add(mesh);

        console.log(mesh)
        const material = new THREE.MeshBasicMaterial({color:'red'})
        const position = new THREE.Vector3(0,0,0);
        const rotation = new THREE.Euler(0,0,0);
        const scale = new THREE.Vector3(1,1,1);
        const decal = new THREE.Mesh( new DecalGeometry( mesh, position, rotation, scale ), material );
        scene.add(decal);
    },[]);

    useEffect(()=>{
       
    });

    return null;

}

export function Scene() {
    return(
        <>
        <ambientLight />
        <Suspense fallback={<Loading />} >
            <Model />
        </Suspense>
        {/* <Picture /> */}
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