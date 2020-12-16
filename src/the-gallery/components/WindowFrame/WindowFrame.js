import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from 'drei';
import InstancedMesh from '../../../drei-espinaco/InstancedMesh';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const WindowFrame = ({ 
    scale,
    position,
    rotation,
    modelUrl,
    mapUrl,
    normalMapUrl,
    objects

}) => {
    let newMaterial, map;
    const { scene } = useGLTF( modelUrl);

    newMaterial = new THREE.MeshPhysicalMaterial();
    
    map = useMemo(() => new THREE.TextureLoader().load(mapUrl), [mapUrl]);
    map.flipY=false;

    const meshes = useMemo(()=>{
        const res = [];
        scene.traverse( function ( child ) {
            if ( child.isMesh ) { 
                child.material = newMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.metalness = 0.9;
                child.material.clearcoat = 1;
                child.material.clearcoatRoughness = 0.6;
                child.material.roughness = 0.9;
                child.material.map = map;
                res.push(child);
                // res.push(<InstancedMesh geometry={child.geometry} material={child.material} objects={objects} />)
            }
        })
        return res;
    },[scene, objects])

    if(meshes && objects){
        const geometry = BufferGeometryUtils.mergeBufferGeometries([meshes[0].geometry, meshes[1].geometry], false)
        return (
        <>
            <InstancedMesh geometry={geometry} material={meshes[0].material} objects={objects} />
            {/* <InstancedMesh geometry={meshes[1].geometry} material={meshes[1].material} objects={objects} /> */}
        </>
        );
    } else{
    
        return (
            <primitive 
                scale={scale}
                position={position}
                rotation={rotation}
                object={scene}
                dispose={null}
            /> 
        )
    }

  }

  export default WindowFrame;