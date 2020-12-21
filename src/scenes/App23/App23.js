// https://3dtextures.me/
// https://threejsfundamentals.org/threejs/lessons/threejs-textures.html

import React, { Suspense, useMemo, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, Reflector, Stats } from 'drei';
import Loading from '../../components/Loading';

import {InstancedMesh, InstancedMeshes, InstancedFBX, InstancedGLTF} from '../../drei-espinaco/instancedMesh/';
import { createMapsPoints, createMapPoints, transformPointsToObjects } from '../../drei-espinaco/points-creator/';

import Joystick from '../../drei-espinaco/Joystick';
import { Physics } from 'use-cannon';
import Player from '../../the-gallery/components/Player/Player';
import GroundPhysic from '../../the-gallery/components/Ground/GroundPhysic';

import {useBox} from 'use-cannon';

function Cesped() {
    const objects = useMemo(()=>{
        const numPoints = 20;
        const initialPoint = [0,-1,0];
        const initialPoint2 = [150,-1,0];
        const spaceBetweenPoint = [6, 0, 0];
        const numGroups = 20;
        const spaceBetweenGroup = [0,0,6];

        const pointsList = createMapsPoints(numPoints, [initialPoint, initialPoint2], spaceBetweenPoint, numGroups, spaceBetweenGroup);
        const objects = transformPointsToObjects(pointsList, [-Math.PI/2,0,0], [6, 6, 6]);
   
        return objects;
    });

    const geometry = useMemo(() => new THREE.PlaneBufferGeometry(1,1,1,1), []);

    const [grassMap, grassDisplacementMap, grassNormalMap] = useLoader(THREE.TextureLoader, [
        'assets/img/jipis/charls/doggy.jpeg',
        'assets/Textures/forrest_ground/forrest_ground_01_disp_1k.jpg',
        'assets/Textures/forrest_ground/forrest_ground_01_nor_1k.jpg'
    ]);
    grassMap.encoding = THREE.sRGBEncoding;
    grassMap.wrapS = THREE.RepeatWrapping;
    const material = useMemo(() => new THREE.MeshPhongMaterial({
                                                  map:grassMap,
                                                  normalMap: grassNormalMap,
                                                  side: THREE.DoubleSide
                                                }), []);

    return <InstancedMesh geometry={geometry} material={material} objects={objects} />;
}

function Horse() {
    const objects = [];
    for(let i = 0; i< 10; i++){
        objects.push({position:[i*100,0,0]})
    }
    return <InstancedGLTF src='assets/obj/Horse.glb' objects={objects} />
}


function CreatePhysicBox({object, visible = true}) {
    const position = object.position ? object.position : [0,0,0];
    const rotation = object.rotation ? object.rotation : [0,0,0];
    const scale = object.scale ? object.scale : [1,1,1];
    const [ref] = useBox(() => ({
                                    position: position,
                                    rotation: rotation,
                                    scale: scale,
                                    ...object.props}));
    return (
        <mesh ref={ref}>
            <boxBufferGeometry args={[1,1,1]} />
            <meshBasicMaterial color='green' wireframe={true} visible={visible} />
        </mesh>
    );
}

function InstancedMeshPhysics(){
    const visible = true;
    const geometry = new THREE.BoxBufferGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color:'red'});
    const objects = [];
    for(let i = 0; i< 10; i++){
        for(let j = 0; j < 10; j++){
            objects.push({
                position:[j * 1,i*1,0],
                props: {
                    mass: 1,
                    args: [1,1,1]
                }
            })
        }
    }
    // const objects = [
    //     {
    //         position: [0,0,0],
    //         props: {
    //             mass: 1,
    //             args: [1,1,1]
    //         }
    //     },
    //     {
    //         position: [5,0,0],
    //         props: {
    //             mass: 1,
    //             args: [1,1,1]
    //         }
    //     }
    // ];
    
    const physicMeshes = [];
    if(geometry.type === 'BoxBufferGeometry'){
        objects.forEach((object) => {
            const physicMesh = <CreatePhysicBox object={object} visible={visible} />;
            physicMeshes.push(physicMesh);
        });
    }
    
    const uuid = useMemo(()=>THREE.MathUtils.generateUUID(),[]);
    const createObjectsMod = useCallback((state)=>{
        const objectsMod = [];
        state.scene.children.forEach(object => {
            if(object.uuid === uuid) {
                object.children.forEach( (meshPhysic,id) => {
                    objectsMod.push({
                        ids: [id],
                        object: {
                            position: [meshPhysic.position.x,meshPhysic.position.y,meshPhysic.position.z],
                            rotation: [meshPhysic.rotation.x,meshPhysic.rotation.y,meshPhysic.rotation.z],
                            scale: [meshPhysic.scale.x,meshPhysic.scale.y,meshPhysic.scale.z],
                        }
                    });
                });
            }
        });
      return objectsMod;
    });
    
    return (
    <>
    <group uuid={uuid}>
        {physicMeshes ? physicMeshes : null}
    </group>
    <InstancedMesh
        geometry={geometry}
        material={material}
        objects={objects}
        createObjectsMod={createObjectsMod}
    />
    </>
    );
}

function getPointsVisuals(){
    const res = [];

    const vertices = [];
    const indices = [];
    const normals = [];
    const colors = [];

    const size = 20;
    const segments = 10;

    const halfSize = size / 2;
    const segmentSize = size / segments;

    // generate vertices, normals and color data for a simple grid geometry

    for ( let i = 0; i <= segments; i ++ ) {

        const y = ( i * segmentSize ) - halfSize;

        for ( let j = 0; j <= segments; j ++ ) {

            const x = ( j * segmentSize ) - halfSize;

            vertices.push( x, - y, 0 );
            normals.push( 0, 0, 1 );

            const r = ( x / size ) + 0.5;
            const g = ( y / size ) + 0.5;

            colors.push( r, g, 1 );

        }

    }

    // generate indices (data for element array buffer)

    for ( let i = 0; i < segments; i ++ ) {

        for ( let j = 0; j < segments; j ++ ) {

            const a = i * ( segments + 1 ) + ( j + 1 );
            const b = i * ( segments + 1 ) + j;
            const c = ( i + 1 ) * ( segments + 1 ) + j;
            const d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );

            // generate two faces (triangles) per iteration

            indices.push( a, b, d ); // face one
            indices.push( b, c, d ); // face two

        }

    }

    return {vertices, indices, normals, colors};
}

function CustomMesh(){
    const geometry = new THREE.BufferGeometry();
    const {vertices, indices, normals, colors} = getPointsVisuals();
    console.log(vertices)

    geometry.setIndex( indices );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    const material = new THREE.MeshPhysicalMaterial({color:'red', clearcoat:1.0, wireframe:true});

    return <mesh geometry={geometry} material={material} />
    // return (
    // <Reflector>
    // <bufferGeometry args={[2, 5]} attach="geometry" />
    // </Reflector>
    // );
}

export function Scene() {
    return(
        <>
        <Cesped />
        <Horse />
        <Physics>
            <Player />
            <GroundPhysic />
            <InstancedMeshPhysics />
            <CustomMesh />
        </Physics>
        </>
    );
}

export default function App23(props) {

    return (
    <>
    <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute'}}>
        <Stats />
        <ambientLight intensity={0.4}/>
        <pointLight />
        <Suspense fallback={<Loading />}>
            <Scene />
        </Suspense>
        {/* <OrbitControls /> */}
    </Canvas>
    <Joystick />
    </>
    );
}