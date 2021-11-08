import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { enterSound, selectionSound, playAudio } from '../audios/index';

/* Error de infinite loading en production por el guion de naughty-vr en -> '/assets/img/home/naughty-vr.png' */

const projects = [
      {
        name: 'app36',
        img: '/assets/img/home/videopoints2.png'
      },
      {
        name: 'app36?url=assets/musica/gotham.mp4&scene=1',
        img: '/assets/img/home/gatacattana.png'
      },
      {
        name: 'app51',
        img: '/assets/img/home/catedralTour.png'
      },
      {
        name: 'app52',
        img: '/assets/img/home/catedralTourVR.png'
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
        name: 'app48',
        img: '/assets/img/home/englishgame.png'
      },
      {
        name: 'app34',
        img: '/assets/img/home/viewer.png'
      },
      {
        name: 'app36?url=assets/musica/elane-low.mp4&scene=2',
        img: '/assets/img/home/elane.png'
      },
      // {
      //   name: 'app39',
      //   img: '/assets/img/home/naughty.png'
      // },
      {
        name: 'app46',
        img: '/assets/img/home/mcpi.png'
      },
      {
        name: 'app50',
        img: '/assets/img/home/physics.png'
      },
      // {
      //   name: 'app47',
      //   img: '/assets/img/home/naughty-vr.png'
      // }
];

function Plane({map, textureArrow, nameApp, ...props}){

    const groupRef = useRef();
    const { camera } = useThree();
    const handleClickProject = useCallback((nameApp)=>{

      const tween = gsap.fromTo(
        groupRef.current.rotation,
        {
          y:0
        },
        { 
          y:6.28,
          duration: 2,
          onComplete: () => {
            
          }
        });

      const initialPosition = camera.position.clone();
      const tween2 = gsap.to(
        camera.position,
        {
          x: 0,
          y: 0,
          z: 2,
          duration: 2,
          onComplete: () => {
            camera.position.set(initialPosition.x,initialPosition.y,initialPosition.z);

            const path = window.location.href;
            const pathNew =  path.includes("app49") ? path.replace("app49", nameApp) : path.concat(nameApp);
            window.location.href = pathNew;
            
          }
        },
      );
      tween.play();
      tween2.play();
      playAudio(enterSound);
    });

    const [hovered, setHover] = useState(false);
    useEffect(()=>{
      if(hovered){
        playAudio(selectionSound);
      }
    }, [hovered]);
    return (
      <group ref={groupRef} {...props}>
        <mesh>
            <planeBufferGeometry args={[1, 1]} />
            <meshPhongMaterial map={map} color={ hovered ? 'red': 'white' } side={THREE.DoubleSide}  />
        </mesh>
        <mesh position={[-0.3,0.3,0.1]} onPointerDown={ (event) => handleClickProject(nameApp) } onPointerOver={(event) => setHover(true)} onPointerOut={(event) => setHover(false)}>
            <planeBufferGeometry args={[0.3, 0.3]} />
            <meshPhongMaterial map={textureArrow} color={ hovered ? 'red': 'white' } side={THREE.FrontSide} transparent={true} />
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