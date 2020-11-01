import React, {useRef, useMemo, useEffect, useState, useCallback} from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, Box } from 'drei';
import Loading from '../../components/Loading';

import * as THREE from 'three';

import { useSpring } from 'react-spring/three';

import './styles.css';

function Camera(props) {
    const ref = useRef()
    const { setDefaultCamera } = useThree()
    // Make the camera known to the system
    useEffect(() => void setDefaultCamera(ref.current), [])
    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld())
    return <perspectiveCamera ref={ref} {...props} />
}

 /* Define points from a curve */
const pointsDefault = [
    [ -10, 0, 10 ],
    [ -5,  5, 5 ],
    [  0,  0, 0 ],
    [  5, -5, 5 ],
    [ 10,  0, 10 ]
];
function Curve({points = pointsDefault, draw = false, top = 0, children }) {

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
    }, []);

    /* Movement of group object with the curve */
    const group = useRef(null);
    const curvePosition = new THREE.Vector3();
    const curveTarget = new THREE.Vector3();
    useFrame(({clock, camera})=>{

       if(group){
        const time = getTimeWithElapsedTime(clock.elapsedTime); // [-1,1] to |[-1,1]| (Absolute value) -> [0,1]

        /* curvePosition and curveTarget were modified by the curve object*/
        curve.getPoint(top, curvePosition);
        curve.getPointAt(top, curveTarget);

        // curve.getPoint(time, curvePosition);
        // curve.getPointAt(time, curveTarget);

        group.current.position.copy(curvePosition);
        group.current.lookAt(curveTarget);
        group.current.position.lerpVectors(curvePosition, curveTarget, 0.5);
        
       } 
    });

    function getTimeWithScroll(top) {

    }

    function getTimeWithElapsedTime(elapsedTime) {
        return Math.abs( Math.sin( elapsedTime * 0.2 ) );
    }



    return (
        <>
        <group ref={group}>
            {children}
        </group>

        {/* Drawing the curve in scene */}
        { draw ? 
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

export function Scene({top = 0}) {

    /* Normalizamos la variable top */
    const { size } = useThree();
    const scrollMax = size.height * 4;
    const topNormalized = top / scrollMax;
    console.log(topNormalized)


    return (
        <>
        <ambientLight />
        {/* <Loading /> */}
        <Curve draw={true} top={topNormalized} >
            <Box />
        </Curve>
        <OrbitControls />
        </>
    );
}

export default function App2(props) {

    const pages = 4;
    // const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }))
    const [ top, setTop ] = useState(0);
    const onScroll = useCallback(e => setTop(e.target.scrollTop), [])
    
    return (
    <>
        <Canvas className="canvas" >
            <Scene top={top} />
        </Canvas>
        <div className="scroll-container" onScroll={onScroll}>
            <div style={{ height: `${pages * 100}vh` }} />
        </div>
    </>
    );
}