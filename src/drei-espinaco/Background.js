import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from 'react-three-fiber';
import loadVideo from '../helpers/loadVideo';


export default function BackgroundVideo({url = 'assets/musica/070Shake.mp4'}) {
	const [textureVideo, setTextureVideo] = useState(null);
	useEffect( () => {
		async function load(){
			const videoDom = await loadVideo(url);
			const textureVideo1 = await new THREE.VideoTexture(videoDom);
			textureVideo1.minFilter = THREE.LinearFilter;
			textureVideo1.magFilter = THREE.LinearFilter;
			textureVideo1.format = THREE.RGBFormat;
			setTextureVideo(textureVideo1);
		}
		load();
	}, [])

	const { scene } = useThree();
	useEffect(()=>{
		scene.background = textureVideo;
	}, [scene, textureVideo])

	return null;
}