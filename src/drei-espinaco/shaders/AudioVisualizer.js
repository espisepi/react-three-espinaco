

const AudioVisualizer = {
    vertexShader: `

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }

    `,

    fragmentShader: `

    // License https://github.com/mrdoob/three.js/blob/master/examples/webaudio_visualizer.html

    uniform sampler2D iChannel0; // new THREE.DataTexture( analyser.data, fftSize / 2, 1, THREE.LuminanceFormat );

    varying vec2 vUv;

    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

        vec3 backgroundColor = vec3( 0.125, 0.125, 0.125 );
        vec3 color = vec3( 1.0, 1.0, 0.0 );

        float f = texture2D( iChannel0, vec2( vUv.x, 0.0 ) ).r;

        float i = step( vUv.y, f ) * step( f - 0.0125, vUv.y );

        fragColor = vec4( mix( backgroundColor, color, i ), 1.0 );
    }

    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
};

export default AudioVisualizer;