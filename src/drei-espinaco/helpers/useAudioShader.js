import React, {useMemo} from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';

import MusicShader from '../shaders/MusicShader';

export default function useAudioShader() {
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
    const vertexShader = `
    
			precision mediump float;
			precision mediump int;

			uniform mat4 modelViewMatrix; // optional
			uniform mat4 projectionMatrix; // optional

			attribute vec3 position;
			attribute vec4 color;

			varying vec3 vPosition;
			varying vec4 vColor;

			void main()	{

				vPosition = position;
				vColor = color;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}
    `;
    const fragmentShader = `
    
            precision mediump float;
			precision mediump int;

			uniform float time;

			varying vec3 vPosition;
			varying vec4 vColor;

			void main()	{

				vec4 color = vec4( vColor );
				// color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

				gl_FragColor = vec4(1.0,0.0,0.0,1.0);

			}

    `;

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide
    });

    return { material, audioTexture };
}
