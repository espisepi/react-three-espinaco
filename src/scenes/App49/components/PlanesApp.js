import React, { useState, useCallback, useMemo } from 'react';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';

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
      {
        name: 'app47',
        img: '/assets/img/home/naughty-vr.png'
      }
];

function Plane({map, nameApp, ...props}){

    const handleClickProject = useCallback((nameApp)=>{
      const path = window.location.href;
      const pathNew =  path.includes("app49") ? path.replace("app49", nameApp) : path.concat(nameApp);
      window.location.href = pathNew;
    });

    const [hovered, setHover] = useState(false);

    return (
            <mesh {...props} onPointerDown={ (event) => handleClickProject(nameApp) } onPointerOver={(event) => setHover(true)} onPointerOut={(event) => setHover(false)}>
                <planeBufferGeometry args={[1, 1]} />
                <meshBasicMaterial map={map} color={ hovered ? 'red': 'white' }  />
            </mesh>
    );
}

export default function PlanesApp(){

    const images = useMemo(() => {
      const images = [];
      projects.forEach((p)=>{
        images.push(p.img);
      })
      return images;
    },[])
    const texturesApp = useLoader( THREE.TextureLoader, [...images] );
    // const texturesApp = useLoader( THREE.TextureLoader, projects.map(p=>p.img) ); NOT WORK IN PRODUCTION -> LOADING INFINITE

    return (
        <>
        {texturesApp.map((texture, i) => (
            <Plane key={'planeApp' + i} nameApp={projects[i].name} map={texture} position={[0, -i * 1.5, 0]} />
        ))}
        </>
    );
}