import React from 'react';
import {Box} from 'drei';
import { Cube } from '../components/Cube';

export default function simpleReducer(id, position) {
	switch (id) {
		case 0:
			return null;
		case 1:
			return <Box position={position} />

		default:
			return null;

	}
}

{/* <Cube position={position} /> */}