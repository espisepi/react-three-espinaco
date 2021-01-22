import React, {useEffect} from 'react';
import Plane from '../../../drei-espinaco/Plane';
import PicturesDisplay from '../displays/PicturesDisplay';
import { useThree } from 'react-three-fiber';
import { AudioComponents } from '../MediaPointsShader';

import { proxy, useProxy } from "valtio";
import {ActionState} from '../State';

export default function Scene02() {

    // Go youtube music link as Action
    useEffect(()=>{
        ActionState.name = 'Youtube';
        ActionState.current = () => {
            window.open('https://www.youtube.com/watch?v=mdfM2Lr_uYY&ab_channel=ISRAELB','_blank');
            // const win = window.open('https://www.youtube.com/watch?v=mdfM2Lr_uYY&ab_channel=ISRAELB','_blank');
            // if (win) {
            //     //Browser has allowed it to be opened
            //     win.focus();
            // } else {
            //     //Browser has blocked it
            //     alert('Please allow popups for this website');
            // }
        }
        return () => {
            ActionState.name = null;
            ActionState.current = null;
        }
    },[]);

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