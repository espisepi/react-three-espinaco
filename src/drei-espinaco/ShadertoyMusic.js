import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

import MusicShader from './shaders/MusicShader';




export default function ShadertoyMusic() {

    /* -------- Material Audio ---------- */

    const [audioData, setAudioData] = useState({});

    useEffect(()=>{

    const listener = new THREE.AudioListener();

    const audio = new THREE.Audio( listener );
    const file = 'assets/musica/070shake.mp3';

    if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {

        const loader = new THREE.AudioLoader();
        loader.load( file, function ( buffer ) {

            audio.setBuffer( buffer );
            audio.play();

        } );

    } else {

        const mediaElement = new Audio( file );
        mediaElement.play();

        audio.setMediaElementSource( mediaElement );

    }

    const fftSize = 128;
    const analyser = new THREE.AudioAnalyser( audio, fftSize );

    //

    // const format = ( renderer.capabilities.isWebGL2 ) ? THREE.RedFormat : THREE.LuminanceFormat;

    const dataTexture = new THREE.DataTexture( analyser.data, fftSize / 2, 1, THREE.LuminanceFormat );

    setAudioData(dataTexture);

    },[]);


    /* ------- FIN Audio -------- */

    const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3 },
        iChannel0: { value: audioData },
        iMouse: { value: new THREE.Vector2 },
        iChannelTime: { value: new THREE.Vector4 }
    }
    const vertexShader = MusicShader.vertexShader;
    const fragmentShader = MusicShader.fragmentShader;
    
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide
    });
    useFrame(({clock, gl}) => {
        const canvas = gl.domElement;
        uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
        uniforms.iTime.value = clock.elapsedTime;
        uniforms.iChannelTime.value.set(clock.elapsedTime, 0, 0, 0);
        uniforms.iMouse.value.set(clock.elapsedTime, clock.elapsedTime / 2.0)
    });
    return (
        <mesh
            geometry={new THREE.BoxGeometry(500,500, 500)}
            material={material}
        />
    );
}