// Scroll with GSAP ScrollTrigger library
import { useState, useEffect } from 'react'
import { gsap, Linear } from 'gsap';

// trigger: String --> name of class HTMLElement to start
// endTrigger: String --> name of class HTMLElement to end
export default function useScroll(trigger, endTrigger) {

    const [ top, setTop ] = useState(0);
    const[firstTime,setFirsTime] = useState(true);

    useEffect(()=>{
        if(firstTime) {
            setFirsTime(false);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top top',
                    endTrigger: endTrigger,
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });

            const obj = { percent : 0 };
            tl.to(obj, {
                percent: 1.0,
                ease: Linear.easeNone,
                duration: 10,
                onUpdate: function() {
                    setTop(obj.percent);
                }
            });
        }
    }, [])

    return top
}