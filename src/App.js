import React from 'react';
import { Canvas} from 'react-three-fiber';
import { PointerLockControls, OrbitControls } from 'drei';
import { Physics } from 'use-cannon';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { Cube } from './components/Cube';

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
	const array = new Array(16).fill(5);
	console.log(array)
	return (
		<>
		<ambientLight intensity={0.3} />
		<spotLight intensity={1.2} color="white" position={[0,0,0]} />
		<Physics gravity={[0, -30, 0]}>
			<LoadScene />
			<Ground position={[0,-1,0]} />
			<Player />
			{array.forEach((el,index)=>(
				<Cube key={index}/>
			))}
		
		</Physics>
		<PointerLockControls />
		{/* <OrbitControls /> */}
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