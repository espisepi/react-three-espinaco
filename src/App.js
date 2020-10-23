import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { extend as applyThree, Canvas, useFrame, useThree } from 'react-three-fiber';
// A React animation lib, see: https://github.com/react-spring/react-spring
import { apply as applySpring, useSpring, a, interpolate } from 'react-spring/three';

import data from './data';

import { Plane, OrbitControls } from 'drei';


function Scene({ }) {

	return (
		<>
		<a.spotLight intensity={1.2} color="white" position={[0,0,0]} />
		<Plane args={[2,2]} />
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