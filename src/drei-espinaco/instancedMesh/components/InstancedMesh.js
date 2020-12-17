import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { draco } from 'drei';

const InstancedMesh = ({ 
    geometry,
    material,
    objects,
    createObjectsMod
}) => {
    const ref = useRef() // <instancedMesh ref={ref} ... />

    /** ----------- Initialize objects with position, rotation and scale --------------- */
    useEffect(()=>{
      const tempObject = new THREE.Object3D();
      objects.forEach((object, id) => {
        const position = object.position ? object.position : [0,0,0];
        const rotation = object.rotation ? object.rotation : [0,0,0];
        const scale = object.scale ? object.scale : [1,1,1];
        tempObject.position.set(...position); 
        tempObject.rotation.set(...rotation);
        tempObject.scale.set(...scale);
        tempObject.updateMatrix();
        ref.current.setMatrixAt(id, tempObject.matrix);

        // To get objects with all attributes in memory
        object.position = position;
        object.rotation = rotation;
        object.scale = scale;
      });
      ref.current.instanceMatrix.needsUpdate = true;
    },[ref, objects]);
    /** -------------------------- Fin ------------------------------- */


    /** ------------- Methods to Modify attributes of objects in each frame ----------------- */
    const tempObject = useMemo(()=> new THREE.Object3D(),[]);
    const modifyImesh = useCallback((imesh, id, object)=>{
      if(objects[id]){
        const position = object.position ? object.position : objects[id].position;
        const rotation = object.rotation ? object.rotation : objects[id].rotation;
        const scale = object.scale ? object.scale : objects[id].scale;
        tempObject.position.set(...position); 
        tempObject.rotation.set(...rotation);
        tempObject.scale.set(...scale);
        tempObject.updateMatrix();
        imesh.setMatrixAt(id, tempObject.matrix);
        imesh.instanceMatrix.needsUpdate = true;
      } else {
        console.log('InstancedMesh: modifyImesh method is called with an id out of array objects')
      }
    });

    const setImeshFromObjectsMod = useCallback((imesh, objectsMod)=>{
      for(let indexObjectsMod = 0; indexObjectsMod < objectsMod.length; indexObjectsMod++ ){
        const objectMod = objectsMod[indexObjectsMod];
        for(let indexIds = 0; indexIds < objectMod.ids.length; indexIds++) {
          const id = objectMod.ids[indexIds];
          modifyImesh(imesh,id,objectMod.object);
        }
      }
    })

    const modifyObjects = useCallback((imesh,state)=>{
      const objectsMod = createObjectsMod(state);
      setImeshFromObjectsMod(imesh,objectsMod);
    },[])

    useFrame((state)=>{
      if(createObjectsMod){
        modifyObjects(ref.current, state);
      }
    });

    /** -------------------------- FIN ------------------------------------ */
  
    return (
      <instancedMesh ref={ref} args={[geometry, material, objects.length]} >
      </instancedMesh>
    )
  }

  export default InstancedMesh;




  /** Getting Started Examples */
    // createObjectsMod = useCallback((state)=>{
    //   const objectsMod = [
    //     {
    //       ids: [0,1],
    //       object: {
    //         rotation: [0,state.clock.getElapsedTime(),0]
    //       }
    //     }
    //   ];
    //   return objectsMod;
    // });