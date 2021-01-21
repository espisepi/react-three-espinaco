import React, {useEffect} from 'react';
import Plane from '../../../drei-espinaco/Plane';
import PicturesDisplay from '../displays/PicturesDisplay';
import { useThree } from 'react-three-fiber';
import { AudioComponents } from '../MediaPointsShader';

export default function Scene02() {
    const {scene} = useThree();
    useEffect(()=>{
        scene.background = null;
    },[]);
    return(
        <>
        <ambientLight />
        <group scale={[30,30,30]} position={[0,0,-200]}>
        <Plane args={[50,50,50,50]}/>
        <Plane args={[50,50,50,50]} rotation={[0, -Math.PI / 2, 0]} position={[10,0,0]}/>
        <Plane args={[50,50,50,50]} rotation={[0, -Math.PI / 2, 0]} position={[-10,0,0]}/>
        </group>
        <AudioComponents audioSrc='assets/musica/masnaisraelb.mp3' type='MusicShader'/>
        </>
    );
}