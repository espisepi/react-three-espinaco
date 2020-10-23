import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { extend as applyThree, Canvas, useFrame, useThree } from 'react-three-fiber';
import { Box, OrbitControls } from 'drei';
import { Physics } from 'use-cannon';
import {Player} from './components/Player';

import data from './data';

// function getMeshFromMapaValue(value) {
// 	switch (value) {
// 		case 0:
// 			return null;
// 		case 1:
// 			return new THREE.Mesh(
// 				new THREE.BoxBufferGeometry(1,1,1),
// 				new THREE.MeshBasicMaterial({color:0xff0000})
// 			);

// 	}
// }

function getMeshFromMapaValue(id, position) {
	switch (id) {
		case 0:
			return null;
		case 1:
			return <Box args={[1,1,1]} position={position} />

	}
}


function LoadScene({}) {

	// Creamos el mapa
	const mapa = [
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,1,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
	];

	// Obtenemos la escena
	const {scene} = useThree();

	const meshes = [];

	for(let y = 0; y < 5; y++) {
		for(let x = 0; x < 5; x++) {
			let id = mapa[y][x];
			let position = new THREE.Vector3(x+2, 0, y+2);
			let mesh = getMeshFromMapaValue(id, position);
			
			if(mesh){
				// mesh.position.set(x+2,0,y+2);
				meshes.push(mesh);
				// scene.add(mesh);
			}
		}
	}

	return meshes;
}

function Scene({ }) {

	return (
		<>
		<LoadScene />
		<spotLight intensity={1.2} color="white" position={[0,0,0]} />
		{/* <Physics gravity={[0, 0, 0]}>
			<Player />
		</Physics> */}
		<OrbitControls />
		</>
	);
}


function App({ }) {

	return (
		<>
		<Canvas className="canvas">
			<Scene />
		</Canvas>
		</>
		);
}

export default App;