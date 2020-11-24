import React, { useRef } from "react";
import { useFrame } from 'react-three-fiber';

const Plane = ({position, rotation, args=[20,20,20,20], scale=[1,1,1]}) => {
  position = position || [0, -1, 0];
  rotation = rotation || [Math.PI / 2, 0, 0];
  const plane = useRef();
  useFrame(({clock})=>{
    plane.current.position.z = 0.5 * (clock.elapsedTime % 4);
  });
  return (
    <mesh ref={plane} rotation={rotation} position={position} scale={scale}>
      <planeBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color='#ff0000' wireframe={true} />
    </mesh>
  );
};

export default Plane;