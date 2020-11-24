import React from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';


export default function Shadertoy() {

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
    const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3 },
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