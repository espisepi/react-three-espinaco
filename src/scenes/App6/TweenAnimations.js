import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useThree, useFrame } from 'react-three-fiber'
import TWEEN from '@tweenjs/tween.js'

export default function TweenAnimations() {

    const { camera } = useThree()

    const animations = useMemo( () => ( [ tween1(camera), tween2(camera) ].reverse() ) )
    const numAnimaciones = useMemo( () => ( 2 ) )
    
    let video;
    const checkTweenAnimation = useCallback(()=>{
        if (!video) {
            video = document.getElementsByTagName('video')[0]
        }
        if (animations.length != 0 && video) {
            if(video.currentTime > 3.0 && animations.length === numAnimaciones) {
                (animations.pop())();
            }
            if(video.currentTime > 110.0 && animations.length === numAnimaciones - 1) {
                (animations.pop())();
            }
        }
    })

    useFrame(()=>{
        TWEEN.update()
        checkTweenAnimation()
    })

    return null
}






/* ------------------- TWEEN ------------------- */
/* http://tweenjs.github.io/tween.js/examples/03_graphs.html */

function tween1(camera) {
    return () => {
        let from = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        };

        let to = {
            x: 116.19,
            y: 4.31,
            z: 163.98
        };

        let to2 = {
            x:  442.94,
            y: 111.44,
            z: 1.93
        };


        let update = () => {
            camera.position.set(from.x, from.y, from.z);
            //camera.lookAt(new THREE.Vector3(0, 0, 0));
        };

        let tween1 = new TWEEN.Tween(from)
            .to(to, 11000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(update)
            .onComplete(function () {
                //controls.target.copy(scene.position);
            });

        let tween2 = new TWEEN.Tween(from)
            .to(to2, 16000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(update)
            .onComplete(function () {
                //controls.target.copy(scene.position);
            });

        tween1.chain(tween2);
        tween1.start();
    }
}

function tween2(camera) {
    return () => {
        // 48 segundos tenemos para lucirnos

        let posicionGatacattana = {
            x: 442.94,
            y: 111.44,
            z: 1.93
        };

        let posicionCercaAguaLejosCaballo = {
            x: 920.7504792035136,
            y: 4.997434958552961,
            z: 478.6020417334049
        }

        let fromPosition = {
            x: posicionGatacattana.x,
            y: posicionGatacattana.y,
            z: posicionGatacattana.z
        };

        let posiciones = {
            x: [ posicionCercaAguaLejosCaballo.x,512.3417884392231, -578.8537004670098, posicionGatacattana.x ],
            y: [posicionCercaAguaLejosCaballo.y,posicionCercaAguaLejosCaballo.y,posicionCercaAguaLejosCaballo.y, posicionGatacattana.y],
            z: [posicionCercaAguaLejosCaballo.z,902.2332684245173, 861.0733837999686, posicionGatacattana.z]
        }

        let toPosition = {
            x: posiciones.x[0],
            y: posiciones.y[0],
            z: posiciones.z[0]
        };

        let toPosition2 = {
            x: posiciones.x[1],
            y: posiciones.y[1],
            z: posiciones.z[1]
        };

        let toPosition3 = {
            x: posiciones.x[3],
            y: posiciones.y[3],
            z: posiciones.z[3]
        };

        let updatePosition = () => {
            camera.position.set(fromPosition.x, fromPosition.y, fromPosition.z);
        };

        let tweenPosition = new TWEEN.Tween(fromPosition)
            .to(toPosition, 18000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(updatePosition)
            .onComplete(function () {
                //controls.target.copy(scene.position);
            });

        let tweenPosition2 = new TWEEN.Tween(fromPosition)
            .to(toPosition2, 20000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(updatePosition)
            .onComplete(function () {
                //controls.target.copy(scene.position);
            });

        let tweenPosition3 = new TWEEN.Tween(fromPosition)
            .to(toPosition3, 10000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(updatePosition)
            .onComplete(function () {
                //controls.target.copy(scene.position);
            });

        tweenPosition.chain(tweenPosition2);
        tweenPosition2.chain(tweenPosition3);
        tweenPosition.start();
    }
}