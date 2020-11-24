import React from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';

export default function ShaderMesh() {
    const [url1, url2] = ['assets/img/highkili.png','assets/img/highkili.png'];
    const [texture1, texture2] = useLoader(THREE.TextureLoader, [url1, url2]);

    // const urlVideo = 'assets/musica/070shake.mp4';
    // const [video] = useState(() => {
    //     const vid = document.createElement('video');
    //     vid.src = urlVideo;
    //     vid.crossOrigin = "Anonymous";
    //     vid.loop = true;
    //     vid.play();
    //     return vid;
    // });
    // const videoTexture = THREE.VideoTexture(video);

    const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3 },
        iChannel0: { value: texture1 },
    }

    const vertexShader = `
        uniform float iTime;
        uniform sampler2D iChannel0;

        varying vec2 vUv;

        void main() {
            vUv = uv;
            vec3 positionCopy = vec3(position);
    
            vec4 texture = texture(iChannel0, vUv);
            float gray = (texture.r + texture.g + texture.b) / 3.0;
            positionCopy.z += - gray * 0.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(positionCopy,1.0);
        }

    `;
    
    const fragmentShader = `
    #include <common>
 
    uniform vec3 iResolution;
    uniform float iTime;
    uniform sampler2D iChannel0;

    varying vec2 vUv;
    
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = fragCoord/iResolution.xy;

        vec4 texture = texture(iChannel0, vUv);
        vec3 col = vec3(texture.rgb);
        //col = vec3(1.0,0.0,0.0);
    
        // Output to screen
        fragColor = vec4(col,1.0);
    }
    
    void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `;
    
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
    });
    useFrame(({clock, gl}) => {
        const canvas = gl.domElement;
        uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
        uniforms.iTime.value = clock.elapsedTime;
    });
    return (
        <mesh
            geometry={new THREE.PlaneBufferGeometry(1,1,100,100)}
            material={material}
        />
    );
}
