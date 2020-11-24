import * as THREE from 'three';

export default function MulticolorShader(textureSrc){
    textureSrc = textureSrc || 'assets/img/highkili.png';
    const texture = new THREE.TextureLoader().load(textureSrc);
    
    return {
        vertexShader: `
        varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
        `,
        fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D texture0;
        uniform float time;
        void main() {
            vec4 background = texture2D( texture0, vec2( vUv.x, vUv.y ) );
            if(background.r > 0.8 && background.g > 0.8 ){
                gl_FragColor = vec4(1.0,sin(time),cos(time),0.3);
            }else{
                gl_FragColor = background;
            }
            
        }
        `,
        uniforms: {
            texture0: {value:texture},
            time: {value:0.0},
        }
    };
}


// export function MulticolorShader(textureSrc){
//     textureSrc = textureSrc || 'assets/highkili.png';
//     const texture = new THREE.TextureLoader().load(textureSrc);
    
//     return {
//         vertexShader: `
//         varying vec2 vUv;
//             void main() {
//                 vUv = uv;
//                 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//             }
//         `,
//         fragmentShader: `
//         varying vec2 vUv;
//         uniform sampler2D texture0;
//         uniform float time;
//         void main() {
//             vec4 background = texture2D( texture0, vec2( vUv.x, vUv.y ) );
//             if(background.r > 0.8 && background.g > 0.8 ){
//                 gl_FragColor = vec4(1.0,sin(time),cos(time),sin(time));
//             }else{
//                 gl_FragColor = background;
//             }
            
//         }
//         `,
//         uniforms: {
//             texture0: {value:texture},
//             time: {value:0.0},
//         }
//     };
// }