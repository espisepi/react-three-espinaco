import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { draco } from 'drei';

const WindowFrame = ({ 
    scale,
    position,
    rotation,
    modelUrl,
    mapUrl,
    normalMapUrl

}) => {
    const { scene } = useLoader(GLTFLoader, modelUrl, draco("https://www.gstatic.com/draco/versioned/decoders/1.4.0/"));
    
    const map = useMemo(() => new THREE.TextureLoader().load(mapUrl), [mapUrl]);
    map.flipY=false;

    const { geometry, material } = useMemo(() => {
      let geometry;
      let material;
      scene.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.material = new THREE.MeshStandardMaterial();
            // child.castShadow = true;
            // child.receiveShadow = true;
            child.material.metalness = 0.9;
            // child.material.clearcoat = 1;
            // child.material.clearcoatRoughness = 0.6;
            child.material.roughness = 0.9;
            child.material.map = map;
            geometry = child.geometry;
            material = child.material;
        }
      });
      return { geometry, material };
    },[scene]);
    

    const tempObject = new THREE.Object3D()
    const ref = useRef()

    const windowFrameObjects = [
      {position: [27, 0, 0], scale: scale, rotation: rotation},
      {position: [5, 0, 0], scale: scale, rotation: rotation},
      {position: [10, 0, 0], scale: scale, rotation: rotation}
    ];

    useEffect(()=>{
      windowFrameObjects.map((object, id) => {
        if(object.position){
          tempObject.position.set(...object.position);    
        }
        if(object.scale){
          tempObject.scale.set(...object.scale);
        }
        if(object.rotation){
          tempObject.rotation.set(...object.rotation);
        }
        tempObject.updateMatrix();
        ref.current.setMatrixAt(id, tempObject.matrix);
      });
      ref.current.instanceMatrix.needsUpdate = true;
    },[ref]);
  
    return (
      <instancedMesh ref={ref} args={[geometry, material, windowFrameObjects.length]} >
      </instancedMesh>
        // <primitive 
        //     scale={scale}
        //     position={position}
        //     rotation={rotation}
        //     object={scene}
        //     dispose={null}
        // /> 
    )
  }

  export default WindowFrame;