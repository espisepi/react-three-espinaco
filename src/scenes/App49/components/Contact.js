//   https://www.tutorialspoint.com/html/html_ascii_codes.htm
import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { Plane, Text } from 'drei';
import * as THREE from 'three';

const defaultFont = `https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff`;

export default function Contact() {

    return (
    <group position={[0,5,5]} rotation={[Math.PI / 2, 0, 0]}>
      <Plane
        scale={[6,3,1]}
        args={[1, 1, 1, 1]} >
        <meshBasicMaterial color="#840404" side={THREE.FrontSide} transparent={true} opacity={0.8} />
      </Plane>
      <Text
        color={'#FFF'} // default
        textAlign={'center'}
        fontSize={1}
        position={[0,2,0]}
        font={defaultFont} >
        CONTACT
      </Text>
      <Text
        color={'#FFF'} // default
        textAlign={'center'}
        fontSize={0.3}
        position={[0,1,0.1]}
        font={defaultFont} >
        josdomesp&#64;gmail&#46;com
      </Text>
      <Text
        color={'#FFF'} // default
        textAlign={'center'}
        fontSize={0.3}
        position={[0,0,0.1]}
        font={defaultFont} >
        github&#46;com&#47;espisepi
      </Text>
    </group>
    );
  }