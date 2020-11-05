import React, { useRef, useEffect } from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { Water } from 'three/examples/jsm/objects/Water';
import * as THREE from 'three';

extend({Water});
const Ocean = ({ geometry=new THREE.BoxBufferGeometry( 100, 100, 100 ), position=[0,0,0], rotation=[0,Math.PI/2,0] }) => {
    const { scene,gl } = useThree();
    const water = useRef();
    useEffect(()=>{
        gl.toneMapping = 0;
        gl.outputEncoding = 3000;
        water.current.rotation.x = - Math.PI / 2;
    });
    useFrame(()=>{
        water.current.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    });
    
    return(
        <group >
            <water ref={water} position={position} rotation={rotation} args={[geometry,
                {
                    side:THREE.DoubleSide,
                    textureWidth: 512,
                    textureHeight: 512,
                    waterNormals: new THREE.TextureLoader().load( 'assets/img/waternormals.jpg', function ( texture ) {

                        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                    } ),
                    alpha: 1.0,
                    sunDirection: new THREE.Vector3(),
                    sunColor: 0xffffff,
                    waterColor: 0x001e0f,
                    distortionScale: 3.7,
                    fog: scene.fog !== undefined
                }
            ]} />
        </group>
    );
};

export default Ocean;