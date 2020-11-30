import React, {useCallback} from 'react';

export default function Fullscreen() {

    const handleFullscreen = useCallback(()=>{
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen(); 
          }
        }
    },[]);

    return(
    <div onClick={handleFullscreen} style={{ position:'absolute', width:'20px', height:'20px', bottom: 0, borderStyle: 'dashed', color: '#e60005', zIndex: 20 }}></div>
    );
}

