import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { Plane } from 'drei';
import * as THREE from 'three';

export default function GridFloor() {
    const { scene } = useThree();
    useEffect(() => {
      scene.fog = new THREE.FogExp2(0, 0.05);
    }, [scene]);
    
    const mesh = useRef();
    useFrame(({clock})=>{
      mesh.current.position.z = 0.5 * (clock.elapsedTime % 5);
    });
  
    return (
      <Plane
        ref={mesh}
        position={[0, -1, -8]}
        rotation={[Math.PI / 2, 0, 0]}
        args={[80, 80, 128, 128]}
      >
        <meshStandardMaterial color="#ea5455" wireframe side={THREE.DoubleSide} />
      </Plane>
    );
  }