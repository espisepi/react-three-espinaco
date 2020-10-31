import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import { PointerLockControls, OrbitControls } from 'drei';
import { Physics } from 'use-cannon';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { Cube } from './components/Cube';

import useCreatorMap from './useCreatorMap';
import simpleReducer from './simpleReducer';
import {mapa as mapa} from './mapas';

import { VideoPoints, AudioComponents } from './components/drei-espinaco/VideoPoints';
import  Ocean  from './components/drei-espinaco/Ocean';

import loadVideo from './helpers/loadVideo';

import * as THREE from 'three';

function LoadScene({}) {
	const options = {
		separacion: [2,2],
	}
	const meshes = useCreatorMap(mapa, simpleReducer, options);
	return meshes;
}

function BackgroundVideo({}) {
	const [textureVideo, setTextureVideo] = useState(null);
	useEffect( () => {
		async function load(){
			const videoDom = await loadVideo('assets/musica/070Shake.mp4');
			const textureVideo1 = await new THREE.VideoTexture(videoDom);
			setTextureVideo(textureVideo1);
		}
		load();
	}, [])

	const { scene } = useThree();
	useEffect(()=>{
		scene.background = textureVideo;
		console.log(scene);
	}, [scene, textureVideo])

	return null;
}

function Scene({ }) {
	// const array = new Array(16).fill(5);

	return (
		<>
		<ambientLight intensity={0.3} />
		<spotLight intensity={1.2} color="white" position={[0,0,0]} />
		<Physics gravity={[0, -30, 0]}>
			<LoadScene />
			<Ground position={[0,-1,0]} />
			<Player />
			{/* <Ocean /> */}
		</Physics>
		<BackgroundVideo />
		<PointerLockControls />
		</>
	);
}


function App({ }) {

	const [play, setPlay] = useState(false);

	return (
		<>

		<Canvas className="canvas">
			<Scene />
		</Canvas>
		

		{/*------ must Click before inicializate scene --------*/}

		{/* { play ? (
		<Canvas className="canvas">
			<Scene />
		</Canvas>
		) : (
		<div style={{position:'relative', width:'100%', height:'100vh'}}>
			<button onClick={()=> setPlay(true) }>CLICK</button>
		</div>
		) } */}
		
		
		</>
		);
}

export default App;