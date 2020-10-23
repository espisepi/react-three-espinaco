import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function useCreatorMap(mapa, reducer) {
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
