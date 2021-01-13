import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';
import {InstancedMesh, InstancedPhysics} from '../../drei-espinaco/instancedMesh/';


function Picture({
    img='assets/3D/Portrait/textures/initialShadingGroup_baseColor.jpg',
    position=[0,0,0],
    rotation=[0,0,0],
    scale=[1,1,1]
}) {
    const map = useLoader(THREE.TextureLoader,img);
  
    return (
        <mesh scale={scale} position={position} rotation={rotation}>
            <planeBufferGeometry attach="geometry" args={[1,1,1,1]} />
            <meshLambertMaterial attach="material" map={map} side={THREE.BackSide} />
        </mesh>
    )
}

export default function PicturesDisplay() {
    const pictures = useMemo(()=>{
        return [
            {
                img: 'assets/img/jipis/charls/doggy.jpeg',
                position: [19.4, 5, 0],
                rotation: [0,Math.PI/2,0],
                scale: [10,10,1],
                display: {
                    position: [20, 5, 0],
                    rotation: [0,Math.PI/2,0],
                    scale: [15, 18, 1]
                }
            },
            {
                img: 'assets/img/jipis/charls/doggy2.jpeg',
                position: [19.4, 5, 25],
                rotation: [0,Math.PI/2,0],
                scale:[10,10,1],
                display: {
                    position: [20, 5, 25],
                    rotation: [0,Math.PI/2,0],
                    scale: [15, 18, 1]
                }
            }
        ];
    });

    const displays = pictures.map(p => p.display);
    const displaysPhysics = displays.map(d => ({propsPhysics: {
        position: d.position,
        rotation: d.rotation,
        args: d.scale
    }}));

    const alphaMap = useMemo(() => new THREE.TextureLoader().load("assets/Textures/BiancoMarble/BIANCO-ao.jpg"), []);
    const diffuseMap = useMemo(() => new THREE.TextureLoader().load("assets/Textures/BiancoMarble/BIANCO-diffuse.jpg"), []);
    const normalMap = useMemo(() => new THREE.TextureLoader().load("assets/Textures/BiancoMarble/BIANCO-normal.jpg"), []);

    return (
        <>
        {pictures.map((p,i) => (<Picture key={i} img={p.img} position={p.position} rotation={p.rotation} scale={p.scale} />))}
        <InstancedMesh 
            geometry={new THREE.BoxBufferGeometry(1,1,1)}
            material={new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                alphaMap: alphaMap,
                diffuseMap: diffuseMap,
                normalMap: normalMap,
                roughness: 0.5
            })}
            objects={displays}
        />
        <InstancedPhysics objects={displaysPhysics} visible={false} />
        </>
    );
}