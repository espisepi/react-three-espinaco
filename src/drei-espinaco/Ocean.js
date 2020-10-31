import React, { useRef, useEffect } from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { Water } from 'three/examples/jsm/objects/Water';
import * as THREE from 'three';

extend({Water});
const Ocean = () => {
    const { scene } = useThree();
    const water = useRef();
    useEffect(()=>{
        water.current.rotation.x = - Math.PI / 2;
    });
    useFrame(()=>{
        water.current.material.uniforms[ 'time' ].value += 1.0 / 400.0;
    });

    useEffect(()=>{
        water.current.material.side = THREE.DoubleSide;
    },[water])
    return(
        // <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
        //   <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        //   <meshStandardMaterial
        //     attach="material"
        //     color="white"
        //     transparent
        //     opacity={0.6}
        //     roughness={1}
        //     metalness={0}
        //   />
        // </mesh>
        <group position={[0,49.5,0]}>
            <water ref={water} args={[new THREE.BoxBufferGeometry( 100, 100, 100),
                {
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