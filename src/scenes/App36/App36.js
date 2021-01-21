import React, {Suspense, useEffect} from 'react';
import { Canvas, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF } from 'drei';
import Loading from '../../components/Loading';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';

// https://threejs.live/#/webgl_decals
function Model(){

    const { scene } = useThree();
    const gltf = useGLTF('assets/obj/LeePerrySmith/LeePerrySmith.glb');
    const [map,specularMap,normalMap] = useLoader(THREE.TextureLoader, ['assets/obj/LeePerrySmith/Map-COL.jpg','assets/obj/LeePerrySmith/Map-COL.jpg','assets/obj/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg'])

    const decalMap = useLoader(THREE.TextureLoader, 'assets/img/highkili.png');
    

    // TODO: Hacer el dispose de los elementos
    useEffect(()=>{
        const mesh = gltf.scene.children[0];
        mesh.material = new THREE.MeshPhongMaterial( {
            specular: 0x111111,
            map: map,
            specularMap: specularMap,
            normalMap: normalMap,
            shininess: 25
        } );
        scene.add(mesh);

        const decalMaterial = new THREE.MeshPhongMaterial({
            specular: 0x444444,
            map: decalMap,
            // normalMap: decalNormal,
            normalScale: new THREE.Vector2( 1, 1 ),
            shininess: 30,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: - 4,
            wireframe: false
        });
        const position = new THREE.Vector3(0,0,-1);
        const rotation = new THREE.Euler(0,0,0);
        const scale = new THREE.Vector3(5,5,5);
        const decal = new THREE.Mesh( new DecalGeometry( mesh, position, rotation, scale ), decalMaterial );
        scene.add(decal);
    },[]);

    useEffect(()=>{
       
    });

    return null;

}

export function Scene() {
    return(
        <>
        <ambientLight args={0x443333} />
        <directionalLight args={[0xffddcc, 1]} position={[1, 0.75, 0.5]} />
        <directionalLight args={[0xccccff, 1]} position={[-1, 0.75, 0.5]} />
        <Suspense fallback={<Loading />} >
            <Model />
        </Suspense>
        {/* <Picture /> */}
        <OrbitControls />
        </>
    );
}

export default function AppDirty(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Scene />
    </Canvas>
    );
}