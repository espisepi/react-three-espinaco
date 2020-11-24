
import React, { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame, useThree } from 'react-three-fiber';

export const AudioComponents = ({audioSrc='assets/musica/070shake.mp4',videoSrc='assets/musica/070shake.mp4', position=[0,0,0], rotation=[0,0,0], scale=[0.05,0.05,0.05] }) => {
    const configuration = `
          r = bass + 0.5;
          g = bass;
          b = bass;
          color.r = bass;
          color.g = mid;
          color.b = mid
          distance = 1;
          density = 1;
      `;
  
    if(audioSrc.includes("www.youtube.com")){
      audioSrc = 'http://164.90.215.243:5000/download?URL=' + audioSrc; // Tengo que tener levantada esa maquina en DigitalOcean
    }
    const audioBuffer = useLoader(THREE.AudioLoader, audioSrc);
    const audioListener = useMemo(() => new THREE.AudioListener(),[]);
    const audio = useMemo(() => new THREE.Audio(audioListener),[]);
  
    useMemo(()=>{
        audio.setBuffer(audioBuffer);
        audio.setLoop(true);
        audio.setVolume(0.5);
        audio.play();
    },[]);
   return(
     <>
      <MusicPoints audio={audio} videoSrc={videoSrc} configuration={configuration} position={position} rotation={rotation} scale={scale} />
    </>
    );
    
}

/** Arguments explanation:
 * audio: THREE.audio
 * video: string => 'https://www.youtube.com/watch?v=CIb...' || 'assets/...mp4' || '' (webcam)
 * configuration: string => 
 *                              const configuration = `
                                    r = bass + 0.5;
                                    g = treble;
                                    b = mid;
                                    color.r = bass;
                                    color.g = mid;
                                    color.b = mid
                                    distance = 2;
                                `; 
 */
export const MusicPoints = ({ audio, videoSrc, configuration, position=[0,0,0], rotation=[0,0,0], scale=[1,1,1] }) => {
    videoSrc = videoSrc || '';
    configuration = configuration || `
                                                r = bass + 0.5;
                                                g = treble;
                                                b = mid;
                                                color.r = bass;
                                                color.g = mid;
                                                color.b = mid
                                                distance = 2;                
                                            `;


    const fftSize = 2048;
    const frequencyRange = {
        bass: [20, 140],
        lowMid: [140, 400],
        mid: [400, 2600],
        highMid: [2600, 5200],
        treble: [5200, 14000],
    };

    let analyser;
    if(audio){
        analyser = new THREE.AudioAnalyser(audio, fftSize);
    }
    
    const configurationArray = configuration.split("\n");

    const {scene} = useThree();

    const [video, setVideo] = useState(null);
    const [particles, setParticles] = useState(null);

    useEffect(()=>{
        const getVideo = async () =>{
            const res = await initVideo(videoSrc);
            setVideo(res);
        };
        getVideo();
    }, [videoSrc]);

    useFrame(({clock})=>{
        
        if( !particles && video && video.readyState === 4 ){
            const res = createParticles(video);
            res.position.set(...position);
            res.rotation.set(...rotation);
            res.scale.set(...scale);
            // res.scale.set(0.05,0.05,0.05);
            scene.add(res);
            setParticles(res);
        }
        
        let data, bass, mid, treble;
        if(particles && analyser){
            data = analyser.getFrequencyData();
            bass = getFrequencyRangeValue(frequencyRange.bass, data);
            mid = getFrequencyRangeValue(frequencyRange.mid, data);
            treble = getFrequencyRangeValue(frequencyRange.treble, data);
            // console.log( 'bass ' + bass + ' / mid ' + mid + ' / treble ' + treble)

            particles.geometry.setAttribute( 'dataSound', new THREE.BufferAttribute( data, 1 ) );
        }
    });

    return (
        null
    );
};

function createParticles(video){
    const imageData = getImageData(video);
    const geometry = new THREE.Geometry();
    geometry.morphAttributes = {};  // This is necessary to avoid error.

    const texture0 = new THREE.Texture(imageData);

    const material = new THREE.ShaderMaterial({
        uniforms: {
            iTime: { value: 0 },
            iResolution:  { value: new THREE.Vector3(1, 1, 1) },

            bass: { value: 0.0 },
            mid: { value: 0.0 },
            treble: { value: 0.0 },

            iChannel0: { value: texture0 }
        },
        vertexShader: `

        varying vec2 vUv;

        uniform float iTime;

        attribute float dataSound;

			void main() {
                vUv = uv;

                vec3 pos = position;
                pos.y += dataSound;


				vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
                float size = 2.0;
				gl_PointSize = size ;

				gl_Position = projectionMatrix * mvPosition;

			}
        `,
        fragmentShader: `
        #include <common>

        varying vec2 vUv;

        uniform vec3 iResolution;
        uniform float iTime;

        uniform float bass;
        uniform float mid;
        uniform float treble;

        vec3 colorA = vec3(0.3,0.0,0.0);
        vec3 colorB = vec3(1.0,0.0,0.0);

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
            
            vec2 uv = fragCoord.xy / iResolution.xy;
            uv.x *= iResolution.x / iResolution.y;

            //vec3 color = vec3(bass+0.6,0.0,0.0);
            //vec3 color = mix(colorA,colorB,bass+0.3);
            vec3 color = vec3(1.0,0.0,0.0);
            
            fragColor = vec4( color, 1.0 );


        }
        void main() {
            mainImage(gl_FragColor, vUv * iResolution.xy);
        }
        `
    });


    const points = [];
    // for (let y = 0, height = imageData.height; y < height; y += 1) {
    //     for (let x = 0, width = imageData.width; x < width; x += 1) {
    //         const vertex = new THREE.Vector3(
    //             x - imageData.width / 2,
    //             -y + imageData.height / 2,
    //             0
    //         );
    //         points.push( vertex );
    //     }
    // }

    const dataLength = 1024;
    for( let i= 0 - 100; i < dataLength; i++ ){
        points.push( new THREE.Vector3( i+1, 0, 0 ) );    
    }
    const bufferGeometry = new THREE.BufferGeometry().setFromPoints( points );

    var dataSound = new Float32Array( new Array(dataLength).fill(0) );
    // itemSize = 1
    bufferGeometry.setAttribute( 'dataSound', new THREE.BufferAttribute( dataSound, 1 ) );

    const particles = new THREE.Points(bufferGeometry, material);
    return particles;
}

function initVideo(url, webcam) {
    return new Promise(resolve => {
        const video = document.createElement("video");
        video.autoplay = true;
        video.muted = true;

        if(url && url.includes("www.youtube.com")){
            // const src = 'assets/musica/070shake.mp4';
            const src = 'http://164.90.215.243:5000/download?URL=' + url;
            video.src = src;
            video.crossOrigin = 'Anonymous';
            video.load();
            video.play();
            resolve(video);        
        }else {
            video.src = url;
            video.load();
            video.play();
            resolve(video);
        }
    });
  }

function getImageData(video) {
    const canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(video, 0, 0);
    const imageCache = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return imageCache;
}

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

