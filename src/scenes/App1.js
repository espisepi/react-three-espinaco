import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Box } from 'drei';

export default function App1(props) {

    return (
    <Canvas className="canvas">
        <Box />
        <OrbitControls />
    </Canvas>
    );
}