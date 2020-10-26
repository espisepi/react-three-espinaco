import React from 'react';
import { Canvas} from 'react-three-fiber';
import { PointerLockControls, OrbitControls } from 'drei';
import { Physics } from 'use-cannon';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { Cube } from './components/Cube';

import useCreatorMap from './hooks/useCreatorMap';
import simpleReducer from './reducers/simpleReducer';

function splitterArray (array, len) {
	const res = [];
	const arrayLength = array.length;
	for(let i = 0; i < arrayLength; i += len ) {
		res.push(array.slice(i, i + len ));
	}
	return res;
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

	const mapaTest = [
		1,1,1,1,1,
		1,0,0,0,1,
		1,0,0,0,1,
		1,1,0,1,1
	];
	const mapaTestProcesado = splitterArray(mapaTest,5);

	const options = {
		separacion: [2,2],
	}
	const meshes = useCreatorMap(mapa, simpleReducer, options);

	return meshes;
}

function Scene({ }) {
	// const array = new Array(16).fill(5);
	// console.log(array)
	return (
		<>
		<ambientLight intensity={0.3} />
		<spotLight intensity={1.2} color="white" position={[0,0,0]} />
		<Physics gravity={[0, -30, 0]}>
			<LoadScene />
			<Ground position={[0,-1,0]} />
			<Player />
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