import React, { useRef, useState, useEffect, useCallback } from "react"
import { useThree } from "react-three-fiber"
import * as THREE from 'three';
import Car from '../models/Car'
import Shoe from '../models/Shoe'

export default function HUD() {

    const group = useRef();
    const { camera, scene } = useThree();
    useEffect(()=>{
      if(group.current){
        camera.add(group.current);
        scene.add(camera);
      }
    },[group.current]);
  
    const [currentModel, setCurrentModel] = useState(<Shoe/>);
    const changeModel = useCallback((e)=>{
      if(e.object.name === 'HUDCar') {
        setCurrentModel( <Car/> )
      }
      if(e.object.name === 'HUDShoe') {
        setCurrentModel( <Shoe/> )
      }
    });
  
    return (
      <>
      
      { currentModel }
  
      <group name="groupHUD" ref={group} onPointerDown={(e) => changeModel(e)} >
  
        <mesh name="HUDShoe" position={[-0.3,-0.6,-1]} scale={[0.2,0.2]} >
          <planeBufferGeometry args={[1,1]} />
          <meshBasicMaterial color='red' side={THREE.FrontSide} />
        </mesh>
  
        <mesh name="HUDCar" position={[0.3,-0.6,-1]} scale={[0.2,0.2]} >
          <planeBufferGeometry args={[1,1]} />
          <meshBasicMaterial color='blue' side={THREE.FrontSide} />
        </mesh>
  
      </group>
  
      </>
    );
  }