import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { useGLTF, useFBX, useTexture, Box } from '@react-three/drei';

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

const posicionParaReestablecer = 10;
const posicionReestablecida = -50;
const velocity = -25;

/* --------------- A partir de aqui se crea el mapa con los objetos 3d ------------- */
export function Map() {

    // Cuando la posicion z de cada plataforma llegue a coincidir con la de la camara se reestablece a un punto por delante de la camara
    const plataforma1Ref = useRef();
    const plataforma2Ref = useRef();


    useFrame((state, dt)=>{
        const plataforma1 = plataforma1Ref.current;
        const plataforma2 = plataforma2Ref.current;
        if(plataforma1 && plataforma2) {
            //console.log(plataforma1.position.z + " --- " + posicionParaReestablecer)
            if(plataforma1.position.z >= posicionParaReestablecer) {
                plataforma1.position.set(plataforma1.position.x, plataforma1.position.y, posicionReestablecida);
            } else {
                plataforma1.position.set(plataforma1.position.x, plataforma1.position.y, plataforma1.position.z - (velocity * dt) );
            }

        }
    });

    /*
    useFrame((state, dt)=>{
        const plataforma1 = plataforma1Ref.current;
        const plataforma2 = plataforma2Ref.current;
        if(plataforma1 && plataforma2) {
            //console.log(plataforma1.position.z + " --- " + posicionParaReestablecer)
            if(plataforma1.position.z >= posicionParaReestablecer) {
                plataforma1.position.set(plataforma1.position.x, plataforma1.position.y, posicionReestablecida);
            } else {
                plataforma1.position.set(plataforma1.position.x, plataforma1.position.y, plataforma1.position.z - (velocity * dt) );
            }

        }
    });
    */

    return (
        <group ref={plataforma1Ref} name="map">
            {/* <Box material-color="blue" /> */}
            <group  name="plataforma1" position={[0,0,0]}>
                <Lapida />
                <Lapida position={[-10,0,-10]}/>
                <Lapida position={[18,0,-18]}/>
            </group>
            <group ref={plataforma2Ref} name="plataforma2" position={[0,0,-30]}>
                <Lapida position={[0,0,-10]}/>
                <Lapida position={[-20,0,-10]}/>
                <Lapida position={[18,0,-18]}/>
            </group>
        </group>
    );
}

/*
export function Lapida({...props}) {
    const lapidaModel = useFBX("assets/obj/lapida/lapida.fbx");
    const lapidaTextures = useTexture(["assets/obj/lapida/lapida_D.jpg","assets/obj/lapida/lapida_N.jpg", "assets/obj/lapida/lapida_S.jpg"])
    return (
        <Instances range={100} geometry={lapidaModel.children[0].geometry}>
            <meshPhongMaterial map={lapidaTextures[0]} normalMap={lapidaTextures[1]} specularMap={lapidaTextures[2]} />
            <Instance
                color="red"
                scale={2}
                position={[1, 2, 3]}
                rotation={[Math.PI / 3, 0, 0]} />
        </Instances>
    )
}
*/

export function Lapida({...props}) {
    const lapidaModel = useFBX("assets/obj/lapida/lapida.fbx");
    const lapidaTextures = useTexture(["assets/obj/lapida/lapida_D.jpg","assets/obj/lapida/lapida_N.jpg", "assets/obj/lapida/lapida_S.jpg"])
    return (
        <mesh geometry={lapidaModel.children[0].geometry} {...props}>
            <meshPhongMaterial map={lapidaTextures[0]} normalMap={lapidaTextures[1]} specularMap={lapidaTextures[2]} />
        </mesh>
    )
}