
const filterYoutubeLink = 'youtu';
const herokuapp = 'https://video-dl-esp.herokuapp.com/video/video?url=';

export default function loadVideo(url) {
    return new Promise(resolve => {
        const video = document.createElement("video");
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        // video.load();
        if(url && url.includes(filterYoutubeLink)){
            const src = herokuapp + url;
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
        // resolve(video);
    });
}
        
        /*--------- Get Webcam image ---------*/
        // else{
        //     const option = {
        //         video: true,
        //         audio: false
        //     };
        //     navigator.mediaDevices.getUserMedia(option)
        //         .then((stream) => {
        //             video.srcObject = stream;
        //             video.addEventListener("loadeddata", () => {
        //                 // videoWidth = video.videoWidth;
        //                 // videoHeight = video.videoHeight;
        //                 resolve(video);
        //                 // createParticles();
        //             });
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        //     }

