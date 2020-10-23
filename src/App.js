import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { extend as applyThree, Canvas, useFrame, useThree } from 'react-three-fiber';
// A React animation lib, see: https://github.com/react-spring/react-spring
import { apply as applySpring, useSpring, a, interpolate } from 'react-spring/three';

import data from './data';

import { Box, OrbitControls } from 'drei';

function getMeshFromMapaValue(value) {
	switch (value) {
		case 0:
			return null;
		case 1:
			return new THREE.Mesh(
				new THREE.BoxBufferGeometry(1,1,1),
				new THREE.MeshBasicMaterial({color:0xff0000})
			);

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

	for(let y = 0; y < 5; y++) {
		for(let x = 0; x < 5; x++) {
			let value = mapa[y][x];
			let mesh = getMeshFromMapaValue(value);
			if(mesh){
				mesh.position.set(x+2,0,y+2);
				scene.add(mesh);
			}
		}
	}
	


	return null;
}

function Scene({ }) {

	return (
		<>
		<LoadScene />
		<a.spotLight intensity={1.2} color="white" position={[0,0,0]} />
		<Box args={[2,2,2]} />
		</>
	);
}


function App({ }) {

	return (
		<>
		<Canvas className="canvas">
			<OrbitControls />
			<Scene />
		</Canvas>
		</>
		);
}

export default App;