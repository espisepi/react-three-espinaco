/* Author this code: espisepi */
/* Code based in: https://tympanus.net/codrops/2019/09/06/how-to-create-a-webcam-audio-visualizer-with-three-js/ */
import React, { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame, useThree } from 'react-three-fiber';

export const AudioComponents = ({audioSrc='assets/musica/070shake.mp4',videoSrc='assets/musica/070shake.mp4', position, rotation, scale, muted=false }) => {
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

    const [audio, setAudio] = useState(null);
    const audioBuffer = useLoader(THREE.AudioLoader, audioSrc);
    useEffect(()=>{
        if(audioBuffer){
            const audioListener = new THREE.AudioListener();
            const audioTemp = new THREE.Audio(audioListener);
            audioTemp.setBuffer(audioBuffer);
            audioTemp.setLoop(true);
            audioTemp.setVolume(0.5);
            audioTemp.play();

            setAudio(audioTemp);
        }
        return ()=> {
            setAudio(audio => {
                audio.stop();
                audio.setBuffer(null);
            });
        }
    },[audioBuffer]);

    useEffect(()=>{
        if(audio){
            const volume = muted ? 0.0 : 0.5;
            audio.setVolume(volume);
        }
    }, [audio, muted]);

  
   return(
     <>
      <VideoPointsShader audio={audio} videoSrc={videoSrc} configuration={configuration} position={position} rotation={rotation} scale={scale} />
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
export const VideoPointsShader = ({ audio, videoSrc, configuration, position=[0,0,0], rotation=[Math.PI, Math.PI, 0], scale=[1,1,1] }) => {
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

    const configurationArray = configuration.split("\n");

    const fftSize = 2048;
    const frequencyRange = {
        bass: [20, 140],
        lowMid: [140, 400],
        mid: [400, 2600],
        highMid: [2600, 5200],
        treble: [5200, 14000],
    };

    const [analyser, setAnalyser] = useState(null);
    useEffect(()=>{
        if(audio){
            setAnalyser(new THREE.AudioAnalyser(audio, fftSize));
        }
    },[audio]);

    const {scene} = useThree();

    const [video, setVideo] = useState(null);
    const [particles, setParticles] = useState(null);

    useEffect(()=>{
        const getVideo = async () =>{
            const res = await initVideo(videoSrc);
            setVideo(res);
        };
        getVideo();

        return ()=> {
            setVideo(null);}
    }, [videoSrc]);

    useFrame(({clock})=>{
        
        if( !particles && video && video.readyState === 4 ){
            const res = createParticles(video);
            res.position.set(...position);
            res.rotation.set(...rotation);
            res.scale.set(...scale);
            // res.rotation.set(Math.PI, Math.PI, 0);
            // res.scale.set(0.05,0.05,0.05);
            scene.add(res);
            setParticles(res);
        }
        
        let data, bass, mid, treble;
        if(analyser){
            data = analyser.getFrequencyData();
            bass = getFrequencyRangeValue(frequencyRange.bass, data);
            mid = getFrequencyRangeValue(frequencyRange.mid, data);
            treble = getFrequencyRangeValue(frequencyRange.treble, data);
            // console.log( 'bass ' + bass + ' / mid ' + mid + ' / treble ' + treble)
        }
        if(particles){
            let r,g,b;
            eval(configurationArray[1]); // r = loquesea
            eval(configurationArray[2]); // g = loquesea
            eval(configurationArray[3]); // b = loquesea
            // eval('particles.material.'+configurationArray[4]); // color.r = loquesea
            // eval('particles.material.'+configurationArray[5]); // color.g = loquesea
            // eval('particles.material.'+configurationArray[6]); // color.b = loquesea
            let distance;
            eval(configurationArray[7]); // distance = loquesea
            let density;
            eval(configurationArray[8]); // density = loquesea

            particles.material.uniforms.iTime.value = clock.elapsedTime;
            particles.material.uniforms.bass.value = bass;
            particles.material.uniforms.mid.value = mid;
            particles.material.uniforms.treble.value = treble;

            // const density = 2;
            // const useCache = parseInt(t) % 2 === 0;  // To reduce CPU usage.
        //     const imageData = getImageData(video);
        //     for (let i = 0, length = particles.geometry.vertices.length; i < length; i++) {
        //         const particle = particles.geometry.vertices[i];
        //         if (density && i % density !== 0) {
        //             // particle.z = 10000;
        //              continue;
        //         }
        //         let index = i * 4;
        //         let gray = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
        //         let threshold = 300;
  
        //         if (gray < threshold) {
        //             if (gray < threshold / 3) {
        //                 particle.z = gray * r * distance;
        //             } else if (gray < threshold / 2) {
        //                 particle.z = gray * g * distance;
        //             } else {
        //                 particle.z = gray * b * distance;
        //             }
        //         } else {
        //             // particle.z = 10000;
        //         }
        //     }
        //     particles.geometry.verticesNeedUpdate = true;

        }
        
    });

    return (
        null
    );
};

function createParticles(video){
    const imageData = getImageData(video);

    // const texture0 = new THREE.Texture(imageData);
    const texture0 = new THREE.VideoTexture(video);


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
        uniform sampler2D iChannel0;

        uniform float bass;
        uniform float mid;
        uniform float treble;


			void main() {
                vUv = uv;

                vec4 textureVideo = texture2D( iChannel0, vec2( vUv.x, vUv.y) );
                float gray = (textureVideo.r + textureVideo.g + textureVideo.b) / 3.0;
                float threshold = 300.0;
                vec3 pos = position;

                float r = bass + 0.5;
                float g = treble;
                float b = mid;
                float distance = 400.0;
                float distance2 = 300.0;
                float distance3 = 2.0;

                if(gray < 0.2){
                    pos.z = - gray * ( bass * distance) ;
                } else if(gray < 0.4) {
                    pos.z = - gray * bass * distance2;
                } else if(gray < 0.6) {
                    pos.z = - gray * bass * distance3;
                } else if(gray < 0.8) {
                    pos.z = - gray * bass * distance2;
                }

                // if(gray < 0.3){
                //     pos.z = - gray * r * bass * distance;
                // } else if(gray < 0.6) {
                //     pos.z = gray * r * bass * distance2;
                // } else {
                //     pos.z = gray * bass * distance3;
                // }
                
                pos.z += gray * bass;


                float size = 1.0;
				gl_PointSize = size ;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

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
        uniform sampler2D iChannel0;

        vec3 colorA = vec3(0.3,0.0,0.0);
        vec3 colorB = vec3(1.0,0.0,0.0);

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
            
            vec2 uv = fragCoord.xy / iResolution.xy;
            uv.x *= iResolution.x / iResolution.y;

            
            //vec3 color = mix(colorA,colorB,bass+0.3);

            vec4 textureVideo = texture2D( iChannel0, vec2( vUv.x, vUv.y) );
            float gray = (textureVideo.r + textureVideo.g + textureVideo.b) / 3.0;
            vec3 color_red = vec3(bass+gray,0.0,0.0);
            vec3 color = textureVideo.rgb;                        
            color = ( textureVideo.rgb  ) * vec3(bass + 0.5 , bass + 0.5 , bass + 0.5 ) * 1.0;
            

            
            fragColor = vec4(color, 1.0 );


        }
        void main() {
            mainImage(gl_FragColor, vUv * iResolution.xy);
        }
        `
    });

    const geometry = new THREE.BufferGeometry();

    const positions = [];
    const uvs = [];

    for (let y = 0, height = imageData.height; y < height; y += 1) {
        for (let x = 0, width = imageData.width; x < width; x += 1) {
            const vertex = new THREE.Vector3(
                x - imageData.width / 2,
                -y + imageData.height / 2,
                0
            );
            positions.push( vertex.x, vertex.y, vertex.z );
            uvs.push( x / imageData.width, y / imageData.height );
        }
    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
    
    const particles = new THREE.Points(geometry, material);

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

