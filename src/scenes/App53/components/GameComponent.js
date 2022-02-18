import React, { useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import { useGLTF, useFBX, useTexture, Box } from 'drei';

import Game from './Game';

export default function GameComponent() {

    const {scene, camera} = useThree();

    useEffect(()=>{
        const game = new Game(scene,camera);
        game.start();
    })
    return (
        <>
            <Map />
        </>
    );
}

/* --------------- A partir de aqui se crea el mapa con los objetos 3d ------------- */
export function Map() {
    return (
        <group name="map">
            <Box material-color="blue" />
            <group name="plataforma1">
                <Lapida />
            </group>
        </group>
    );
}

export function Lapida() {
    const lapidaModel = useFBX("assets/obj/lapida/lapida.fbx");
    const lapidaTextures = useTexture(["assets/obj/lapida/lapida_D.jpg","assets/obj/lapida/lapida_N.jpg", "assets/obj/lapida/lapida_S.jpg"])
    return (
        <mesh geometry={lapidaModel.children[0].geometry}>
            <meshPhongMaterial map={lapidaTextures[0]} normalMap={lapidaTextures[1]} specularMap={lapidaTextures[2]} />
        </mesh>
    )
}