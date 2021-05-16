import React, { useEffect, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Text } from 'drei';

const Loading = React.forwardRef( (props, ref) => {

    useFrame(() => {
        if( ref.current ) {
            ref.current.rotation.y += 0.05;
        }
    })

    return (
        <group {...props}>
            <directionalLight args={[0xffddcc, 0.2]} position={[1, 0.75, 0.5]} />
            <directionalLight args={[0xccccff, 0.2]} position={[-1, 0.75, 0.5]} />
            <mesh ref={ref}>
                <boxBufferGeometry attach='geometry' args={[1,1,1]} />
                <meshStandardMaterial attach='material' color='hotpink' />
            </mesh>
            <Text position={[0,-2,0]} fontSize={ 1.0 }>
                Loading...
            </Text>
        </group>
    );
});

export default Loading;