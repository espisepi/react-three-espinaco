import React, { useState, useCallback, useMemo } from 'react';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';

/* Error de infinite loading en production por el guion de naughty-vr en -> '/assets/img/home/naughty-vr.png' */

const projects = [
    {
        name: 'app36',
        img: '/assets/img/home/videopoints.png'
      },
      {
        name: 'app35',
        img: '/assets/img/home/gallery.png'
      },
      {
        name: 'app32',
        img: '/assets/img/home/mineral.png'
      },
      {
        name: 'app31',
        img: '/assets/img/home/botines.png'
      },
      {
        name: 'app34',
        img: '/assets/img/home/viewer.png'
      },
      {
        name: 'app6',
        img: '/assets/img/home/gatacattana.png'
      },
      {
        name: 'app14',
        img: '/assets/img/home/elane.png'
      },
      {
        name: 'app39',
        img: '/assets/img/home/naughty.png'
      },
      {
        name: 'app46',
        img: '/assets/img/home/mcpi.png'
      },
      // {
      //   name: 'app47',
      //   img: '/assets/img/home/naughty-vr.png'
      // }
];

function Plane({map, textureArrow, nameApp, ...props}){

    const handleClickProject = useCallback((nameApp)=>{
      const path = window.location.href;
      const pathNew =  path.includes("app49") ? path.replace("app49", nameApp) : path.concat(nameApp);
      window.location.href = pathNew;
    });

    const [hovered, setHover] = useState(false);

    return (
      <group {...props}>
        <mesh>
            <planeBufferGeometry args={[1, 1]} />
            <meshPhongMaterial map={map} color={ hovered ? 'red': 'white' }  />
        </mesh>
        <mesh position={[0,0,0.1]} onPointerDown={ (event) => handleClickProject(nameApp) } onPointerOver={(event) => setHover(true)} onPointerOut={(event) => setHover(false)}>
            <planeBufferGeometry args={[0.4, 0.4]} />
            <meshPhongMaterial map={textureArrow} color={ hovered ? 'red': 'white' } side={THREE.DoubleSide} transparent={true} />
        </mesh>
      </group>
    );
}

export default function PlanesApp(){
  
    const texturesApp = useLoader( THREE.TextureLoader, projects.map(p=>p.img) );
    
    const textureArrow = useLoader( THREE.TextureLoader, '/assets/img/icon/directional_arrow.png' );

    return (
        <>
        {texturesApp.map((texture, i) => (
            <Plane key={'planeApp' + i} nameApp={projects[i].name} map={texture} textureArrow={textureArrow} position={[0, -i * 1.5, 0]} rotation={[-0.2,0,0]} />
        ))}
        </>
    );
}