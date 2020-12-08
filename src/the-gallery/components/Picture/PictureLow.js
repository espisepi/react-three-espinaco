import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { draco } from 'drei';

const PictureLow = ({
  url,
  scale,
  position,  
  rotation,
  metalness,
  roughness

}) => {
    
    const map = useLoader(THREE.TextureLoader,url);
  
    return (
        <mesh scale={scale} position={position} rotation={rotation}>
            <planeBufferGeometry attach="geometry" args={[1,1,1,1]} />
            <meshLambertMaterial attach="material" map={map} side={THREE.DoubleSide} />
        </mesh>
    )
  }

  export default PictureLow;

