import React, {useState,useEffect} from 'react';
import * as THREE from 'three';
import { Sky } from 'drei';

import { Pla, Catedral } from '../Prefab';
import { useLoader } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import Stars from '../../../drei-espinaco/Stars';
import loadVideo from '../../../helpers/loadVideo';

function useTextureVideo(){
    const url = 'assets/musica/naughtyswain.mp4'
    const muted = false;
    const [textureVideo, setTextureVideo] = useState({});
	useEffect( () => {
		let videoDom;
		async function load(){
			videoDom = await loadVideo(url);
			videoDom.muted=muted;
			const textureVideo1 = await new THREE.VideoTexture(videoDom);
			textureVideo1.minFilter = THREE.LinearFilter;
			textureVideo1.magFilter = THREE.LinearFilter;
			textureVideo1.format = THREE.RGBFormat;
			setTextureVideo(textureVideo1);
		}
		load();

		// Remove sound when user out of scene page
		return () => {
			videoDom.removeAttribute('src'); // empty source
			videoDom.load();
		} 
	}, [])
    return [textureVideo, setTextureVideo];
}

function Edificios() {
    const [textureVideo, setTextureVideo] = useTextureVideo();
    const obj = useLoader(OBJLoader,'assets/obj/destroyedWalls_UV1.obj');
    obj.traverse(object => {
        if(object.isMesh){
            object.material.map = textureVideo;
        }
    });


    return (
        <>
        <mesh position={[0,0,-250]}>
            <planeBufferGeometry attach='geometry' args={[400,400,1,1]} />
            <meshBasicMaterial attach='material' map={textureVideo} side={THREE.DoubleSide} />
        </mesh>
        <primitive object={obj} position={[0,-20,0]} scale={[20,20,20]} />
        </>
    )
}

export default function Scene02(){
    return(
        <>
        <ambientLight />
        <Stars />
        <group >
            <Edificios />
        </group>
        {/* <Sky
            distance={450000} // Camera distance (default=450000)
            inclination={0.65} // Sun elevation angle from 0 to 1 (default=0)
            azimuth={0.50} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        /> */}
        </>
    );
}