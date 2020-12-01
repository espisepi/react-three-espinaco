import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import { SpriteMaterial } from 'three';


export default function ShadertoyMusic() {

    const vertexShader = `
        uniform float iTime;

        varying vec2 vUv;

        void main() {
            vUv = uv;
            vec3 positionCopy = vec3(position);
            positionCopy.z += sin(position.x + iTime);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(positionCopy,1.0);
        }

    `;
    
    const fragmentShader = `
    #include <common>
 
    uniform vec3 iResolution;
    uniform float iTime;
    
    // By iq: https://www.shadertoy.com/user/iq  
    // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = fragCoord/iResolution.xy;
    
        // Time varying pixel color
        vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    
        // Output to screen
        fragColor = vec4(col,1.0);
    }
    
    void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `;

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

    const uniforms = {

        tAudioData: { value: new THREE.DataTexture( analyser.data, fftSize / 2, 1, THREE.LuminanceFormat ) }

    };

    setAudioData(uniforms.tAudioData.value);

    },[]);


    /* ------- FIN Audio -------- */

    const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3 },
        tAudioData: audioData,
    }
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms
    });
    useFrame(({clock, gl}) => {
        const canvas = gl.domElement;
        uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
        uniforms.iTime.value = clock.elapsedTime;
    });
    return (
        <mesh
            geometry={new THREE.BoxBufferGeometry(1,1,1)}
            material={material}
        />
    );
}