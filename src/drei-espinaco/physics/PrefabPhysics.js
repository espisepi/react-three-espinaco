import React from 'react';
import { usePlane } from "use-cannon";

export const GroundPhysic = ({visible=false, rotation=[-Math.PI / 2, 0, 0], ...props}) => {

    const [ref] = usePlane(() => ({ 
        rotation: rotation,
        ...props
    }));

    return (
        <>
            <mesh ref={ref} receiveShadow {...props} >
                <planeBufferGeometry attach="geometry" args={[70, 75]} />
                <meshBasicMaterial attach="material" color='green' wireframe={true} visible={visible} />
            </mesh>
        </>
    );
}