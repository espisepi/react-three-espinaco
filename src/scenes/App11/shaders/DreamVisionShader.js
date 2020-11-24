// https://www.geeks3d.com/20091112/shader-library-dream-vision-post-processing-filter-glsl/

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
        vec4 c = texture2D(tDiffuse, vUv);
  
        c += texture2D(tDiffuse, vUv+0.001);
        c += texture2D(tDiffuse, vUv+0.003);
        c += texture2D(tDiffuse, vUv+0.005);
        c += texture2D(tDiffuse, vUv+0.007);
        c += texture2D(tDiffuse, vUv+0.009);
        c += texture2D(tDiffuse, vUv+0.011);

        c += texture2D(tDiffuse, vUv-0.001);
        c += texture2D(tDiffuse, vUv-0.003);
        c += texture2D(tDiffuse, vUv-0.005);
        c += texture2D(tDiffuse, vUv-0.007);
        c += texture2D(tDiffuse, vUv-0.009);
        c += texture2D(tDiffuse, vUv-0.011);

        c.rgb = vec3((c.r+c.g+c.b)/3.0);
        c = c / 9.5;
        gl_FragColor = c;
      }`
  }
  