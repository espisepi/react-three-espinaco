import React from 'react';
import { useLoader } from 'react-three-fiber';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';

export default function ObjMesh(){
    const obj = useLoader(OBJLoader, 'assets/obj/destroyedWalls_UV1.obj');
    return <primitive object={obj} />;
}