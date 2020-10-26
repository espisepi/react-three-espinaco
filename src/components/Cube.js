import React, {useEffect, useMemo} from 'react';
import { useBox } from 'use-cannon';


export const Cube = (props) => {
    const [ ref ] = useBox(() => ({ type: "Static", ...props }));

    return (
        <mesh ref={ref} receiveShadow castShadow>
            <boxBufferGeometry args={props.args} />
            <meshStandardMaterial attach='material' color='red' />
        </mesh>
    );
}