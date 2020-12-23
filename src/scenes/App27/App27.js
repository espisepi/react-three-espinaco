import React, { Suspense, useMemo, useCallback, useRef, useEffect } from 'react';
import * as Konva from 'konva';

export default function App27(props) {
    const container = useRef();
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
        }
    },[container]);

    return (
    <>
    <div ref={container} id="container"></div>
    </>
    );
}