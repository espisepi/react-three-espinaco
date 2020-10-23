import React from 'react';
import {Box} from 'drei';

export default function simpleReducer(id, position) {
	switch (id) {
		case 0:
			return null;
		case 1:
			return <Box args={[1,1,1]} position={position} />

		default:
			return null;

	}
}