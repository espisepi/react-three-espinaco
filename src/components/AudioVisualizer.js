import React from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

const AudioVisualizer = ({audio, mesh, img, position}) => {
    img = img || 'assets/musica/highkili.png';
    position = position || [ 0, 0, 0 ]
    const texture = new THREE.TextureLoader().load(img);
    mesh = mesh || new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 3, 3, 100, 100 ),
        new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture })
    );
    mesh.position.set(...position);
    // mesh.rotation.y += -1.0;

    const fftSize = 2048;
    const frequencyRange = {
        bass: [20, 140],
        lowMid: [140, 400],
        mid: [400, 2600],
        highMid: [2600, 5200],
        treble: [5200, 14000],
    };
    const analyser = new THREE.AudioAnalyser(audio, fftSize);

    useFrame(({clock})=>{
        const data = analyser.getFrequencyData();
        const bass = getFrequencyRangeValue(frequencyRange.bass, data);
        // const mid = getFrequencyRangeValue(frequencyRange.mid, data);
        // const treble = getFrequencyRangeValue(frequencyRange.treble, data);
        const arrayPosition = mesh.geometry.attributes.position.array;
        for(let i = 0; i < arrayPosition.length; i = i + 3 ){
            if( i % 2 ){
                arrayPosition[i + 2] = bass + 0.1;
            }else{
                // arrayPosition[i + 2] = mid * 1.5;
            }
        }

        /*
            Codigo necesario para poder mover los vertices del mesh
        */
        mesh.geometry.attributes.position.needsUpdate = true;
        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeFaceNormals();

        mesh.rotation.y = Math.sin(clock.elapsedTime/5)  ;
        
    });

    return (
        <primitive object={mesh} />
    );
};

function getFrequencyRangeValue (_frequencyRange, frequencyData) {
    const data = frequencyData;
    const nyquist = 48000 / 2;
    const lowIndex = Math.round(_frequencyRange[0] / nyquist * data.length);
    const highIndex = Math.round(_frequencyRange[1] / nyquist * data.length);
    let total = 0;
    let numFrequencies = 0;

    for (let i = lowIndex; i <= highIndex; i++) {
        total += data[i];
        numFrequencies += 1;
    }
    
    return total / numFrequencies / 255;
};

export default AudioVisualizer;

