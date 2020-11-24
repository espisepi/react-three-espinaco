export default {
    uniforms: {
      tDiffuse: { value: null },
    },
  
    vertexShader: `
      varying vec2 vUv;
      void main() {
      vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
  
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D tDiffuse;
      void main() {
        vec4 textureScene = texture2D( tDiffuse, vUv );
        textureScene.r += 0.5;
        gl_FragColor = textureScene;
      }`
  }
  