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
    },[ref, objects]);
  
    return (
      <instancedMesh ref={ref} args={[geometry, material, objects.length]} >
      </instancedMesh>
    )
  }

  export default InstancedMesh;