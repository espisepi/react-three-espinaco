import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { extend as applyThree, Canvas, useFrame, useThree } from 'react-three-fiber';
import { Box, OrbitControls } from 'drei';

import useCreatorMap from './hooks/useCreatorMap';
import simpleReducer from './reducers/simpleReducer';

function LoadScene({}) {

	// Creamos el mapa
	const mapa = [
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,1,0,1],
		[1,0,0,0,1],
		[1,1,0,1,1],
	];

	const meshesTest = useCreatorMap(mapa, simpleReducer);

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