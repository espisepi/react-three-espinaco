import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { PointerLockControls, OrbitControls } from 'drei';
import { Physics } from 'use-cannon';
import { Ground } from '../../components/Ground';
import { Player } from '../../components/Player';
import Plane from '../../drei-espinaco/Plane';
import GroupComponent from './GroupComponent';


export default function App4(props) {

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <ambientLight intensity={0.3} />
		<spotLight intensity={1.2} color="white" position={[0,0,0]} />
		<Physics gravity={[0, -30, 0]}>
			<Ground position={[0,-1,0]} visible={false} />
			<Player position={[0, 10, 5]} />
		</Physics>
        <PointerLockControls />
        <Suspense fallback={null} >
        <Plane args={[100,100,100,100]}/>
        <GroupComponent />
        </Suspense>
    </Canvas>
    );
}