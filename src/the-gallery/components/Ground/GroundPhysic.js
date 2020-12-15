import React, { useMemo } from 'react';
import { usePlane } from "use-cannon";
import * as THREE from 'three';
import { Reflector } from '@react-three/drei';

const GroundPhysic = ({visible=false}) => {

    const [ref] = usePlane(() => ({ 
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0.1, 22],
    }));

    return (
        <>
            <mesh ref={ref} receiveShadow>
                <planeBufferGeometry attach="geometry" args={[70, 75]} />
                <meshBasicMaterial attach="material" color='green' wireframe={true} visible={visible} />
            </mesh>
        </>
    );
}

export default GroundPhysic;