import React from 'react';
import { Canvas} from 'react-three-fiber';
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

function LoadScene({}) {
	const options = {
		separacion: [2,2],
	}
	const meshes = useCreatorMap(mapa, simpleReducer, options);
	return meshes;
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
			<Ocean />
		</Physics>
		<PointerLockControls />
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