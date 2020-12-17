import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { draco } from 'drei';

const InstancedMesh = ({ 
    geometry,
    material,
    objects

}) => {
    const tempObject = new THREE.Object3D()
    const ref = useRef()

    useEffect(()=>{
      objects.forEach((object, id) => {
        const position = object.position ? object.position : [0,0,0];
        const rotation = object.rotation ? object.rotation : [0,0,0];
        const scale = object.scale ? object.scale : [1,1,1];
        tempObject.position.set(...position); 
        tempObject.rotation.set(...rotation);
        tempObject.scale.set(...scale);
        tempObject.updateMatrix();
        ref.current.setMatrixAt(id, tempObject.matrix);
      });
      ref.current.instanceMatrix.needsUpdate = true;
    },[ref, objects]);
  
    return (
      <instancedMesh ref={ref} args={[geometry, material, objects.length]} >
      </instancedMesh>
    )
  }

  export default InstancedMesh;