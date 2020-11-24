import * as THREE from 'three'
import React, { useLayoutEffect } from 'react'
import { useThree, useLoader } from 'react-three-fiber'
import { Box, useFlexSize } from 'react-three-flex'

import Text from './Text';

function HeightReporter({ onReflow }) {
    const size = useFlexSize()
    useLayoutEffect(() => onReflow && onReflow(...size), [onReflow, size])
    return null
  }
  
export default function Page({ text, tag, images, textScaleFactor, onReflow, left = false }) {
    const textures = useLoader(THREE.TextureLoader, images)
    const { viewport } = useThree()
    const boxProps = {
        centerAnchor: true,
        grow: 1,
        marginTop: 1,
        marginLeft: left * 1,
        marginRight: !left * 1,
        width: 'auto',
        height: 'auto',
        minWidth: 3,
        minHeight: 3,
        maxWidth: 6,
        maxHeight: 6,
    }
    return (
        <Box dir="column" align={left ? 'flex-start' : 'flex-end'} justify="flex-start" width="100%" height="auto" minHeight="100%">
        <HeightReporter onReflow={onReflow} />
        <Box dir="row" width="100%" height="auto" justify={left ? 'flex-end' : 'flex-start'} margin={0} grow={1} wrap="wrap">
            {textures.map((texture, index) => (
            <Box key={index} {...boxProps}>
                {(width, height) => (
                <mesh>
                    <planeBufferGeometry args={[width, height]} />
                    <meshBasicMaterial map={texture} toneMapped={false} />
                </mesh>
                )}
            </Box>
            ))}
        </Box>
        <Box marginLeft={1.5} marginRight={1.5} marginTop={2}>
            <Text position={[left ? 1 : -1, 0.5, 1]} fontSize={textScaleFactor} lineHeight={1} letterSpacing={-0.05} maxWidth={(viewport.width / 4) * 3}>
            {tag}
            <meshBasicMaterial color="#cccccc" toneMapped={false} />
            </Text>
        </Box>
        <Box marginLeft={left ? 1.5 : 1} marginRight={left ? 1 : 1.5} marginBottom={1}>
            <Text
            bold
            position-z={0.5}
            textAlign={left ? 'left' : 'right'}
            fontSize={1.5 * textScaleFactor}
            lineHeight={1}
            letterSpacing={-0.05}
            color="black"
            maxWidth={(viewport.width / 4) * 3}>
            {text}
            </Text>
        </Box>
        </Box>
    )
}