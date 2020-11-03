import React, {useMemo, useRef} from 'react';
import * as THREE from 'three';
import {useFrame, useLoader} from 'react-three-fiber';
import AudioVisualizer from '../../components/AudioVisualizer';
import MulticolorShader from './shaders/MulticolorShader';

export default function GroupComponent() {
    const group = useRef();
    // Si es invisible al principio, descomentar este codigo para ponerlo visible
    // useFrame(()=>{
    //   if(!group.current.visible && audio.context.currentTime >= 39.0) group.current.visible = true;
    // });
  
    const audioSrc = 'assets/musica/highkili-imtheman.mp3';
    const audioBuffer = useLoader(THREE.AudioLoader, audioSrc);
    const audioListener = useMemo(() => new THREE.AudioListener(),[]);
    const audio = useMemo(() => new THREE.Audio(audioListener),[]);
    useMemo(()=>{
        audio.setBuffer(audioBuffer);
        audio.setLoop(true);
        audio.setVolume(0.5);
        audio.play();
    },[]);
  
    const {vertexShader,fragmentShader,uniforms} = MulticolorShader();
    const mesh = new THREE.Mesh(
       new THREE.PlaneBufferGeometry(3, 3, 100, 100),
       new THREE.ShaderMaterial({
         vertexShader,
         fragmentShader,
         uniforms
       })
    );
    mesh.material.transparent = true;
    useFrame(({clock})=>{
      uniforms.time.value = clock.elapsedTime ;
    })
   return(
     <>
    <group ref={group} visible={true}>
      {/* <FireCustom position={[0.2,0.8,-0.5]} rotation={[0.0,0.0,0.0]}/> */}
    {/* //   <AudioVisualizerShader audio={audio} /> */}
      <AudioVisualizer audio={audio} position={[0, 0.5, 0]} mesh={mesh} />
      {/* <PlaneTexture /> */}
    </group>
    </>
    );
    
  }