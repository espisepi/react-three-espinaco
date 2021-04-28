import React from 'react';
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

export default function PlanesApp(){

    const projectsTextures = useLoader( THREE.TextureLoader, projects.map(p=>p.img) );

    return (
        <mesh position={[0.5, -0.5, 0]}>
            <planeBufferGeometry args={[1, 1]} />
            <meshStandardMaterial color='red' />
        </mesh>
    );
}