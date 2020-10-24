import React, {useEffect, useMemo} from 'react';
import { useBox } from 'use-cannon';


export const Cube = (props) => {
    // const [ ref ] = useBox(() => ({ type: "Static", ...props }));

    return (
        <mesh receiveShadow castShadow position={props.position}>
            <boxBufferGeometry />
            <meshStandardMaterial attach='material' color='red' />
        </mesh>
    );
}