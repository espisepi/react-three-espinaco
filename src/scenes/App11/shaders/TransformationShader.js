import * as THREE from 'three';

const TransformationShader = {
    defines: {},
    uniforms: {
  
      "tDiffuse": { type: "t", value: new THREE.Texture() },
      "opacity":  { type: "f", value: 1.0 },
      "translationX":  { type: "f", value: 1.0 },
      "translationY":  { type: "f", value: 1.0 },
      "translationZ":  { type: "f", value: 1.0 },
      "scaleX":  { type: "f", value: 1.0 },
      "scaleY":  { type: "f", value: 1.0 },
      "scaleZ":  { type: "f", value: 1.0 },
      "rotationX":  { type: "f", value: 0.75 },
      "rotationY":  { type: "f", value: 0.75 },
      "rotationZ":  { type: "f", value: 0.75 }
  
    },
  
    vertexShader: [
    
      "uniform float translationX;",
      "uniform float translationY;",
      "uniform float translationZ;",
      "uniform float scaleX;",
      "uniform float scaleY;",
      "uniform float scaleZ;",
      "uniform float rotationX;",
      "uniform float rotationY;",
      "uniform float rotationZ;",
  
      "varying vec2 vUv;",
      "varying mat4 vPosition;",
  
      "void main() {",
  
        "vUv = uv;",
        
        // Translate
        "mat4 tPos = mat4(vec4(1.0,0.0,0.0,0.0),",
                         "vec4(0.0,1.0,0.0,0.0),",
                         "vec4(0.0,0.0,1.0,0.0),",
                         "vec4(translationX,translationY,translationZ,1.0));",
        
        // Rotate
        "mat4 rXPos = mat4(vec4(1.0,0.0,0.0,0.0),",
                          "vec4(0.0,cos(rotationX),-sin(rotationX),0.0),",
                          "vec4(0.0,sin(rotationX),cos(rotationX),0.0),",
                          "vec4(0.0,0.0,0.0,1.0));",
        
        "mat4 rYPos = mat4(vec4(cos(rotationY),0.0,sin(rotationY),0.0),",
                          "vec4(0.0,1.0,0.0,0.0),",
                          "vec4(-sin(rotationY),0.0,cos(rotationY),0.0),",
                          "vec4(0.0,0.0,0.0,1.0));",
        
        "mat4 rZPos = mat4(vec4(cos(rotationZ),-sin(rotationZ),0.0,0.0),",
                          "vec4(sin(rotationZ),cos(rotationZ),0.0,0.0),",
                          "vec4(0.0,0.0,1.0,0.0),",
                          "vec4(0.0,0.0,0.0,1.0));",
                          
        // Scale
        "mat4 sPos = mat4(vec4(scaleX,0.0,0.0,0.0),",
                         "vec4(0.0,scaleY,0.0,0.0),",
                         "vec4(0.0,0.0,scaleZ,0.0),",
                         "vec4(0.0,0.0,0.0,1.0));",
        
        "vPosition =  tPos * rXPos * rZPos * rYPos * sPos;",
        
        "gl_Position = projectionMatrix * modelViewMatrix * vPosition * vec4(position,1.0);",
  
      "}"
  
    ].join("\n"),
  
    fragmentShader: [
  
      "uniform float opacity;",
  
      "uniform sampler2D tDiffuse;",
  
      "varying vec2 vUv;",
  
      "void main() {",
  
        "vec4 texel = texture2D( tDiffuse, vUv );",
        "texel = vec4(1.0,0.0,0.0,1.0);",
        "gl_FragColor = opacity * texel;",
  
      "}"
  
    ].join("\n")
  };

  export default TransformationShader;