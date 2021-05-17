// https://github.com/r21nomi/webcam-audio-visualizer/blob/master/src/index2.js
import * as THREE from 'three';

export default function VideoShader0(texture){
    return new THREE.ShaderMaterial({uniforms: {
        iTime: { value: 0 },
        iResolution:  { value: new THREE.Vector3(1, 1, 1) },

        bass: { value: 0.0 },
        mid: { value: 0.0 },
        treble: { value: 0.0 },

        colorInput: { value: new THREE.Vector3(0,0,0) },

        iChannel0: { value: texture }
    },
    vertexShader: `

    varying vec2 vUv;

    uniform float iTime;
    uniform sampler2D iChannel0;

    uniform float bass;
    uniform float mid;
    uniform float treble;


        void main() {
            vUv = uv;

            vec4 textureVideo = texture2D( iChannel0, vec2( vUv.x, vUv.y) );
            float gray = (textureVideo.r + textureVideo.g + textureVideo.b) / 3.0;
            float threshold = 300.0;
            vec3 pos = position;

            float r = bass + 0.5;
            float g = treble;
            float b = mid;
            float distance = 400.0;
            float distance2 = 300.0;
            float distance3 = 100.0;

            if(gray < 0.1){
                pos.z = - gray * ( bass * 1.0) ;
            } else if (gray < 0.3) {
                pos.z = - gray * ( bass * distance) ;
            } else if(gray < 0.4) {
                pos.z = - gray * bass * distance2;
                // pos.z = -1000.0;
            } else if(gray < 0.6) {
                pos.z = - gray * bass * distance3;
            } else if(gray < 0.8) {
                pos.z = - gray * bass * distance2;
            }

            // if(gray < 0.3){
            //     pos.z = - gray * r * bass * distance;
            // } else if(gray < 0.6) {
            //     pos.z = gray * r * bass * distance2;
            // } else {
            //     pos.z = gray * bass * distance3;
            // }
            
            pos.z += gray * bass;


            float size = 1.0;
            gl_PointSize = size ;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

        }
    `,
    fragmentShader: `
    #include <common>

    varying vec2 vUv;

    uniform vec3 iResolution;
    uniform float iTime;

    uniform float bass;
    uniform float mid;
    uniform float treble;
    uniform sampler2D iChannel0;

    uniform vec3 colorInput;

    vec3 colorA = vec3(0.3,0.0,0.0);
    vec3 colorB = vec3(1.0,0.0,0.0);

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        
        vec2 uv = fragCoord.xy / iResolution.xy;
        uv.x *= iResolution.x / iResolution.y;

        
        //vec3 color = mix(colorA,colorB,bass+0.3);

        vec4 textureVideo = texture2D( iChannel0, vec2( vUv.x, vUv.y) );
        float gray = (textureVideo.r + textureVideo.g + textureVideo.b) / 3.0;
        vec3 color_red = vec3(bass+gray,0.0,0.0);
        vec3 color = textureVideo.rgb;                        
        color = ( textureVideo.rgb  ) * vec3(bass + 0.5 , bass + 0.5 , bass + 0.5 ) * 1.0;
        float isColor = colorInput.r + colorInput.g + colorInput.b;
        if ( isColor  != 0.0 ) {
            color = vec3( colorInput.r * (bass + gray), colorInput.g * (bass + gray), colorInput.b * (bass + gray)  );
        }
        fragColor = vec4(color, 1.0 );


    }
    void main() {
        mainImage(gl_FragColor, vUv * iResolution.xy);
    }
    `
    });
} 