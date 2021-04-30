import React, {useCallback, useEffect, useRef, useState} from 'react';
import { useThree, useLoader } from 'react-three-fiber';
import { TextureLoader, DoubleSide } from 'three';

export default function BlackPlane(props) {
    const texture = useLoader(TextureLoader, '/assets/img/icon/fullscreen.png');
    return(
        <mesh {...props} >
            <planeBufferGeometry args={[10,10]} />
            <meshBasicMaterial color='#840404' map={texture} transparent={true} opacity={0.95} />
        </mesh>
    );
}

