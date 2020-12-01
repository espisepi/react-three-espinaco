import React, { useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from 'react-three-fiber';

import MusicShader from './shaders/MusicShader';
import AudioVisualizer from './shaders/AudioVisualizer';




export default function ShadertoyMusic() {

    /* -------- Material Audio ---------- */

    const audioSrc = 'assets/musica/070shake.mp3';
    const audioBuffer = useLoader(THREE.AudioLoader, audioSrc);
    const audio = useMemo(()=>{
        if(!audioBuffer) return null;
        const audioListener = new THREE.AudioListener();
        const audioTemp = new THREE.Audio(audioListener);
        audioTemp.setBuffer(audioBuffer);
        audioTemp.setLoop(true);
        audioTemp.setVolume(0.5);
        audioTemp.play();
        return audioTemp;
    },[audioBuffer]);

    const fftSize = 128;
    const analyser = useMemo(()=>{
        if(!audio) return null;
        return new THREE.AudioAnalyser(audio, fftSize);
    },[audio]);

    const audioTexture = useMemo(()=>{
        if(!analyser) return null;
        return new THREE.DataTexture( analyser.data, fftSize / 2, 1, THREE.LuminanceFormat );
    }, [analyser])



    /* ------- FIN Audio -------- */

    const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3 },
        iChannel0: { value: audioTexture },
        iMouse: { value: new THREE.Vector2 },
        iChannelTime: { value: new THREE.Vector4 }
    }
    const vertexShader = AudioVisualizer.vertexShader;
    const fragmentShader = AudioVisualizer.fragmentShader;

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide
    });
    useFrame(({clock, gl}) => {
        const canvas = gl.domElement;
        if(analyser){
            analyser.getFrequencyData();
            uniforms.iChannel0.value.needsUpdate = true;
        }
        uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
        uniforms.iTime.value = clock.elapsedTime;
        uniforms.iChannelTime.value.set(clock.elapsedTime, 0, 0, 0);
        uniforms.iMouse.value.set(clock.elapsedTime, clock.elapsedTime / 2.0)
    });
    return (
        <mesh
            geometry={new THREE.PlaneBufferGeometry(10,10)}
            material={material}
        />
    );
}