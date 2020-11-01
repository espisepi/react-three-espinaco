import React, {useRef, useMemo} from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls, Box } from 'drei';
import Loading from '../../components/Loading';

import * as THREE from 'three';

function Curve(props) {

    /* Create a curve */
    const line = useRef(null);
    const { curve, geometry, material } = useMemo(()=>{
        const curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 )
        ] );

        const points = curve.getPoints( 200 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
        return { curve, geometry, material };
    }, []);

    /* Movement of group object with the curve */
    const group = useRef(null);
    const curvePosition = new THREE.Vector3();
    const curveTarget = new THREE.Vector3();
    useFrame(({clock, camera})=>{

       if(group){
        const time = Math.abs( Math.sin( clock.elapsedTime * 0.2 ) ); // [-1,1] to |[-1,1]| (Absolute value) -> [0,1]

        /* carPosition and carTarget were modified by the curve */
        curve.getPoint(time, curvePosition);
        curve.getPointAt(time, curveTarget);
        // if(line){
        //     curvePosition.applyMatrix4(line.current.matrixWorld);
        //     curveTarget.applyMatrix4(line.current.matrixWorld);
        // }

        group.current.position.copy(curvePosition);
        group.current.lookAt(curveTarget);
        group.current.position.lerpVectors(curvePosition, curveTarget, 0.5);
        
       } 
    });



    return (
        <>
        <group ref={group}>
            <Box />
        </group>

        {/* Pintamos la curva en pantalla */}
        <line ref={line}
            geometry={geometry}
            material={material}
        />

        </>
        
    );


}

export default function App2(props) {

    return (
    <Canvas className="canvas" >
        <ambientLight />
        {/* <Loading /> */}
        <Curve />
        <OrbitControls />
    </Canvas>
    );
}