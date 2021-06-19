// https://baronwatts.com/exporting-a-curve-from-blender-to-three-js/
import React, {useRef, useMemo} from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

 /* Define points from a curve */
 const pointsDefault = [
    [ -10, 0, 10 ],
    [ -5,  5, 5 ],
    [  0,  0, 0 ],
    [  5, -5, 5 ],
    [ 10,  0, 10 ]
];
export default function Curve({points = pointsDefault, visibleLine = false, visible, top, velocity, children }) {

    /* Create a curve */
    const line = useRef(null);
    const { curve, geometry, material } = useMemo(()=>{

        const pointsProcessed = points.map( p => new THREE.Vector3( p[0], p[1], p[2] ) );
        const curve = new THREE.CatmullRomCurve3( [
            ...pointsProcessed
        ] );

        const pointsCurve = curve.getPoints( 200 );
        const geometry = new THREE.BufferGeometry().setFromPoints( pointsCurve );
        const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

        return { curve, geometry, material };
    }, [points]);

    // console.log(top)

    /* Movement of group object with the curve */
    const group = useRef(null);
    const curvePosition = new THREE.Vector3();
    const curveTarget = new THREE.Vector3();

    useFrame( ({clock}) => {

       if(group){
        const time = getTimeWithElapsedTime(clock.elapsedTime, velocity); // [-1,1] to |[-1,1]| (Absolute value) -> [0,1]

        /* curvePosition and curveTarget were modified by the curve object*/
        if(top !== undefined){
            curve.getPoint(top, curvePosition);
            curve.getPointAt(top, curveTarget);
        } else {
            // console.log(`time: ${time}`)
            curve.getPoint(time, curvePosition);
            curve.getPointAt(time, curveTarget);
        }

        

        group.current.position.copy(curvePosition);
        group.current.lookAt(curveTarget);
        group.current.position.lerpVectors(curvePosition, curveTarget, 0.5);
        
       } 
    });

    function getTimeWithElapsedTime(elapsedTime, velocity = 1) {
        return Math.abs( Math.sin( elapsedTime * velocity * 0.05 ) );
    }

    return (
        <>
        <group name={`groupCurve_${children.props.name ? children.props.name : 'undefinedName'}`} ref={group} visible={visible}>
            {children}
        </group>

        {/* Drawing the curve in scene */}
        { visibleLine ? 
            (
                <line ref={line}
                    geometry={geometry}
                    material={material}
                    />
            ) : null 
        }
        
        </>
        
    );


}