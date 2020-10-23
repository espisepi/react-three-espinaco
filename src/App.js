import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { extend as applyThree, Canvas, useFrame, useThree } from 'react-three-fiber';
import { Box, OrbitControls } from 'drei';

function getMeshFromMapaValue(id, position) {
	switch (id) {
		case 0:
			return null;
		case 1:
			return <Box args={[1,1,1]} position={position} />

		default:
			return null;

	}
}

function useCreatorMap(mapa, reducer) {
	// Obtenemos el tamano del mapa
	// https://stackoverflow.com/questions/10237615/get-size-of-dimensions-in-array
	const [ sizeY, sizeX ] = [ mapa.length, mapa[0].length ];

	// Rellenamos el array de meshes
	const meshes = useMemo(() => {

		const meshes = [];
		const [ separacionX, separacionY] = [ 1, 1 ];

		for(let y = 0; y < sizeY; y++) {
			for(let x = 0; x < sizeX; x++) {
	
				let id = mapa[y][x];
				let position = new THREE.Vector3( x * separacionX, 0, y * separacionY );
	
				let mesh = reducer(id, position);
				if(mesh){
					meshes.push(mesh);
				}
			}
		}

		return meshes;

	},[mapa, reducer]);

	return meshes;

}


function LoadScene({}) {

	// Creamos el mapa
	const mapa = [
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,1,0,1],
		[1,0,0,0,1],
		[1,1,0,1,1],
	];

	const meshesTest = useCreatorMap(mapa, getMeshFromMapaValue);

	return meshesTest;
}

function Scene({ }) {

	return (
		<>
		<LoadScene />
		<spotLight intensity={1.2} color="white" position={[0,0,0]} />
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