/** CLIP GataCattana (L) */

import React, { Suspense, useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
import { OrbitControls, PointerLockControls } from 'drei';
import * as THREE from 'three';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { Physics } from 'use-cannon';
import { Ground } from '../../components/Ground';
import { Player } from '../../components/Player';

import SimondevPersonController from '../../drei-espinaco/simondev/SimondevPersonController';
import Joystick from '../../drei-espinaco/Joystick';
import Fullscreen from '../../drei-espinaco/Fullscreen';

import ShaderHorse from './shaders/shaderHorse';

function AssetGltf({ url, speed = 1 }) {

    /* --------- Load horse ----------- */
    const { nodes, materials, animations } = useLoader(GLTFLoader, url);

    /* --------- Material horse ---------- */
    const [tRoad, tLut] = useLoader(THREE.TextureLoader, [ 'assets/img/gatacattana/road.jpg', 'assets/img/gatacattana/lut.png'])
    const { gl, scene } = useThree();
    const canvas = gl.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const resolution = useMemo(()=>(new THREE.Vector2(width, height)),[width, height]) ;

    const uniforms = Object.assign({}, THREE.UniformsLib.lights, {
        iResolution: { value: resolution },
        iChannel0: { value: scene.background },
        iChannel1: { value: tRoad },
        iLookup: { value: tLut },
        opacity: { value: 1 },
        diffuse: {  value: new THREE.Color(0xffffff) },
		iGlobalTime: {  value: 0 },
    });

    nodes.mesh_0.material.onBeforeCompile = function (shader) {
        shader.fragmentShader = ShaderHorse.fragmentShader;
        Object.assign(shader.uniforms, uniforms);
        shader.vertexShader = 'varying vec2 vUv;\n' + shader.vertexShader;
        shader.vertexShader = 'uniform vec2 iResolution;\n' + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          [ 
            '#include <begin_vertex>',
            'vec4 newPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
            'vec2 screenPos = newPosition.xy / newPosition.w;',
            'vUv = screenPos;',
            'vUv.x *= iResolution.x / iResolution.y;'
          ].join('\n')
          );
    }


    /* --------- Animations horse --------- */
    const [ mixer ] = useState(() => new THREE.AnimationMixer());
    const group = useRef();
    useEffect(()=> void mixer.clipAction(animations[0], group.current).play(),[]);
    useFrame((state, delta) => {
        mixer.update(delta * speed);
    });

    return (
        <group ref={group} dispose={null} scale={[0.2,0.2,0.2]} position={[0,-7,100]} rotation={[0,Math.PI / 2, 0]}>
            <primitive object={nodes.mesh_0} />
        </group>
    );
}


export default function App6(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position: 'absolute'}} camera-rotation={[0,Math.PI/2,0]}>
        <directionalLight args={[ 0xffffff, 0.54 ]} castShadow={true} shadow-mapSize={new THREE.Vector2( 1024, 1024 )} />
        <hemisphereLight args={[0xffffff, 0xffffff, 0.61]} />

        <Background url='assets/musica/gotham.mp4' />
        <Ocean geometry={new THREE.BoxBufferGeometry( 500, 500, 500 )} position={[0,240,70]} />

        <Suspense fallback={<Loading />}>
            <AssetGltf url="assets/obj/Horse.glb" />
        </Suspense>

        {/* <Physics gravity={[0, -30, 0]}>
			<Ground position={[0,-1,0]} visible={false} />
			<Player position={[0, 50, -100]} />
		</Physics>
        <PointerLockControls /> */}

        <SimondevPersonController />

        {/* <OrbitControls /> */}
        
    </Canvas>
    <Joystick />
    <Fullscreen />
    </>
    );
}

/* Instrucciones para que funcione el efecto visual del oceano (de chiste churra)
* Rotar [0,Math.PI/2,0] tanto la camara como el mesh del oceano
* <Player position={[0, 50, 20]} /> (para que la escena empiece en la cuspide del cubo y se renderice el video dentro del cubo)
* Moverse un poquito por el escenario
*/