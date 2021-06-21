import React, { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';
import { HTML } from 'drei'

import useScroll from '../../../drei-espinaco/hooks/useScroll';
import Curve from '../../../drei-espinaco/Curve';
import Camera from '../../../components/Camera';

import HelicopterCurveAnimation from './HelicopterCurveAnimation'
import { pathTest, path, pathWalk } from '../paths'

import { HelicopterInstanced } from '../components/Prefab';

export function AnimationsVR({visible}) {
    return (
        <>
        <HelicopterCurveAnimation pointsDefault={path} visible={visible} />
        </>
    );
}

export function AnimationsSimple() {
    const { camera } = useThree()
    useEffect(()=>{
        camera.rotation.set(0,0,0)
        camera.position.set(-0.00677610794082284, 22.35056495666504, -5.594905853271484)
    },[])
    return (
        <>
        <HelicopterCurveAnimation pointsDefault={path} />
        </>
    );
}

export function Animations({ setMode }){

    const { camera } = useThree();

    const topAnimation1 = useScroll('.section-one', '.section-three');
    const topAnimation2 = useScroll('.section-three', '.section-four');

    const [animation1, setAnimation1] = useState(true)
    const [animation2, setAnimation2] = useState(true)
    const [animation3, setAnimation3] = useState(false)
    
    useEffect(()=>{
        if(animation1) {
            setMode(20)
        }
    },[animation1, setMode])

    useEffect(()=>{
        if(topAnimation2 >= 1.0) {
            setAnimation1(false)
            setAnimation2(false)
            setAnimation3(true)
            setMode(0)
            camera.rotation.set(0,0,0)
            camera.position.set(-0.00677610794082284, 22.35056495666504, 14.594905853271484)
        }
    },[topAnimation2])
    
    return (
        <>
        { animation1 && (
            <>
            <Curve points={pathWalk} top={topAnimation1}  visibleLine={true} visible={true} velocity={0.1}>
                <group name='boxCurve' >
                    {/* <Box name='boxCurve' scale={[5,5,5]} material-color='green' /> */}
                    <Camera rotation={[0,Math.PI,0]} />
                </group>
            </Curve>

            <HelicopterInstanced />
            </>

        ) }

        { animation2 && (
            <HTML fullscreen >
            <div style={{ width:'100%', height:'100vh', position:'absolute', top:0, display:'flex', alignItems:'center', justifyContent: 'center', flexDirection: 'column' }}>
                { topAnimation1 >= 0.8 ? null : <h1 style={{ opacity:`${ 0.9 - topAnimation1 }`, fontSize:'400%' }}>Scroll To Move</h1> }
                { topAnimation1 >= 0.9 ? <h1 style={{ opacity:`${ 1.0 - topAnimation2 }`, fontSize :'400%' }}>Scroll To Run Motor</h1> : null }
                <div style={{ width:`${topAnimation2 * 100}%`, height:'1em', top:50, backgroundColor:'#495057', opacity:0.8 }}></div>
            </div>
            </HTML>
        ) }

        { animation3 && (
            <HelicopterCurveAnimation pointsDefault={path} visibleLine={false} visible={true} />
        ) }
        </>
    );
}