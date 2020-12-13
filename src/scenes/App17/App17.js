import React, {useEffect, useMemo, useState, Suspense} from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stats } from 'drei';
import Loading from '../../components/Loading';
import Map from '../../drei-espinaco/Map';


import { Physics } from 'use-cannon';
import Ground from '../../the-gallery/components/Ground/Ground';
import Player from '../../the-gallery/components/Player/Player';
import Joystick from '../../drei-espinaco/Joystick';
import FullScreen from '../../drei-espinaco/Fullscreen';



export function randomMapCreation(){
    const map = [];
    const meshedTemp = {
        geometry: new THREE.BoxBufferGeometry(1,1,1),
        material: new THREE.MeshBasicMaterial({color:'red'}),
        objects: []
    }
    const objectTemp = {
        position: [0,0,0],
        rotation: [0,0,0],
        scale: [1,1,1]
    }

    /** ------- Add first meshed to map array -------- */
    meshedTemp.geometry = new THREE.BoxBufferGeometry(1,1,1);
    meshedTemp.material = new THREE.MeshPhysicalMaterial({color:'red', clearcoat:0.9});
    for(let i=0; i < 50000; i++){
        const object = Object.assign({},objectTemp);
        object.position = [Math.random()*50,Math.random()*50,Math.random()*50];
        meshedTemp.objects.push(object);
    }
    map.push(meshedTemp);

    return map;
}

const mapSimple = [
    {
        geometry: new THREE.BoxBufferGeometry(1,1,1),
        material: new THREE.MeshStandardMaterial({color:'red'}),
        objects: [
            {
                position: [0,0,5],
                rotation: [0,0,0],
                scale: [1,1,1]
            },
            {
                position: [0,0,-5],
                rotation: [0,0,0],
                scale: [1,1,1]
            }
        ]
    },

]

export function Scene() {

    const [map, setMap] = useState([]);
    useEffect(()=>{
        setMap(randomMapCreation());
    },[mapSimple]);

    return(
        <>
        <pointLight args={[0xff0000, 10, 100]} />
        <Map args={map} />
        {/* <OrbitControls /> */}
        <Physics gravity={[0, -30, 0]}>
          <Suspense fallback={null}>
            <Ground /> 
          </Suspense>      
          <Player />       
        </Physics>
        </>
    );
}

export default function App17(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Stats />
        <Scene />
    </Canvas>
    <Joystick />
    </>
    );
}