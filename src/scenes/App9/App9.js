import React, {useEffect, useState, useRef} from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';
import * as THREE from 'three';
import loadVideo from '../../helpers/loadVideo';
import BackgroundVideo, { BackgroundVideoRaw } from '../../drei-espinaco/Background';

import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Scene({video}) {

    return(
        <>
        <ambientLight />
        {/* <Loading /> */}
        {video ? <BackgroundVideoRaw video={video} /> : null }
        <OrbitControls />
        </>
    );
}

function videoScroll(url, scrollContainer){


    return null;
    // return videoDom
}

export default function App9(props) {

    const [video, setVideo] = useState(null);
	useEffect( () => {
		async function load(){
            const videoDom = await loadVideo('assets/musica/elane-low.mp4');
            videoDom.pause();
            setVideo(videoDom);
		}
		load();
    }, [])

    const [topPercentage, setTopPercentage] = useState(0);
    const scrollContainer = useRef(null);
    useEffect(()=>{
        if(video){
            gsap.registerPlugin(ScrollTrigger);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scrollContainer.current,
                    start: 'top top',
                    end: 'bottom 100%',
                    scrub: true,
                    // markers:{color: 'white' }
                }
            });
            const obj = { percent: 0 };
            tl.to(obj, {
                percent: 1.0,
                ease: Linear.easeNone,
                duration: 10,
                onUpdate: function() {
                    video.currentTime = obj.percent * video.duration;
                }
            });
        }
    },[video]);

    return (
    <>
        <Canvas className="canvas" style={{ position: 'fixed'}} >
            <Scene top={topPercentage} video={video} />
        </Canvas>
        <div ref={scrollContainer} className="scroll-container-gsap">
        </div>
    </>
    );
}