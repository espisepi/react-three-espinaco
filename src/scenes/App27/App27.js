// https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_texture_canvas.html
// https://konvajs.org/docs/select_and_transform/Keep_Ratio.html
// https://konvajs.org/docs/sandbox/Image_Resize.html

import React, { Suspense, useMemo, useCallback, useRef, useEffect, useState } from 'react';
import * as Konva from 'konva';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Stars from '../../drei-espinaco/Stars';

export default function App27(props) {
    const container = useRef();
    const [konvaCanvas, setKonvaCanvas] = useState();
    useEffect(()=>{
        if(container.current) {
            var width = window.innerWidth;
            var height = window.innerHeight;

            var stage = new Konva.Stage({
                container: 'container',
                width: width,
                height: height,
            });

            var layer = new Konva.Layer();
            stage.add(layer);

            var text1 = new Konva.Text({
                x: 50,
                y: 70,
                fontSize: 30,
                text: 'keepRatio = true',
                draggable: true,
            });
            layer.add(text1);

            var tr1 = new Konva.Transformer({
                nodes: [text1],
                keepRatio: true,
                enabledAnchors: [
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
                ],
            });
            layer.add(tr1);

            var darthVaderImg = new Konva.Image({
                width: 200,
                height: 137,
              });
            var darthVaderGroup = new Konva.Group({
                x: 180,
                y: 50,
                draggable: true,
            });
            layer.add(darthVaderGroup);
            darthVaderGroup.add(darthVaderImg);

            var imageObj1 = new Image();
            imageObj1.onload = function () {
              darthVaderImg.image(imageObj1);
              layer.draw();
            };
            imageObj1.src = '/assets/img/macarena.jpg';

            var tr2 = new Konva.Transformer({
                nodes: [darthVaderImg],
                keepRatio: false,
                enabledAnchors: [
                  'top-left',
                  'top-right',
                  'bottom-left',
                  'bottom-right',
                ],
              });
            layer.add(tr2);

            layer.draw();

            const konvaCanvasTemp = container.current.children[0].children[0];
            setKonvaCanvas(konvaCanvasTemp);
        }
    },[container]);

    const mesh = useRef();
    const [map, setMap] = useState();
    useEffect(()=>{
        if(konvaCanvas){
            console.log(konvaCanvas)
            const mapTemp = new THREE.CanvasTexture(konvaCanvas);
            setMap(mapTemp);
        }
    },[konvaCanvas]);

    return (
    <>
    <div ref={container} id="container"></div>
    <Canvas>
        <Stars />
        <mesh ref={mesh}>
            <boxBufferGeometry attach='geometry' args={[1,1,1]} />
            <meshBasicMaterial attach='material' map={map} />
        </mesh>
        <OrbitControls />
    </Canvas>
    </>
    );
}