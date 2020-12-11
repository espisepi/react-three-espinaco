import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { draco } from 'drei';

const WindowFrame = ({ 
    scale,
    position,
    rotation,
    modelUrl,
    mapUrl,
    normalMapUrl

}) => {
    const { scene } = useLoader(GLTFLoader, modelUrl, draco("https://www.gstatic.com/draco/versioned/decoders/1.4.0/"));
    
    const map = useMemo(() => new THREE.TextureLoader().load(mapUrl), [mapUrl]);
    map.flipY=false;

    let geometry;
    let material;
    scene.traverse( function ( child ) {
        if ( child.isMesh ) {
            geometry = child.geometry;
            material = child.material;
            child.material = new THREE.MeshStandardMaterial();
            // child.castShadow = true;
            // child.receiveShadow = true;
            child.material.metalness = 0.9;
            // child.material.clearcoat = 1;
            // child.material.clearcoatRoughness = 0.6;
            child.material.roughness = 0.9;
            child.material.map = map;
        }
    })

    // scene === mesh
    const tempObject = new THREE.Object3D()
    const tempColor = new THREE.Color()
    const colors = new Array(1000).fill()
    const [hovered, set] = useState()
    const colorArray = useMemo(() => Float32Array.from(new Array(1000).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), [])
  
    const ref = useRef()
    const previous = useRef()
    useEffect(() => void (previous.current = hovered), [hovered])
  
    useFrame(state => {
      const time = state.clock.getElapsedTime()
    //   ref.current.rotation.x = Math.sin(time / 4)
    //   ref.current.rotation.y = Math.sin(time / 2)
      let i = 0
    //   for (let x = 0; x < 10; x++)
    //     for (let y = 0; y < 10; y++)
    //       for (let z = 0; z < 10; z++) {
            const id = i++
    //         tempObject.position.set(5, 5, 5);
            // tempObject.position.set(5 - x, 5 - y, 5 - z)
            // tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
            // tempObject.rotation.z = tempObject.rotation.y * 2
            // if (hovered !== previous.current) {
            //   tempColor.set(id === hovered ? 'white' : colors[id]).toArray(colorArray, id * 3)
            //   ref.current.geometry.attributes.color.needsUpdate = true
            // }
            // const scale = id === hovered ? 2 : 1
            // tempObject.scale.set(scale, scale, scale)
            tempObject.updateMatrix()
            ref.current.setMatrixAt(0, tempObject.matrix)
    //       }
      ref.current.instanceMatrix.needsUpdate = true
    })
  console.log(geometry)
  console.log(material)
    return (
      <instancedMesh ref={ref} args={[geometry, material, 2]}>
        {/* <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
          <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
        </boxBufferGeometry>
        <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} /> */}
      </instancedMesh>
        // <primitive 
        //     scale={scale}
        //     position={position}
        //     rotation={rotation}
        //     object={scene}
        //     dispose={null}
        // /> 
    )
  }

  export default WindowFrame;