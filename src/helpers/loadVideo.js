


export default function loadVideo(url) {
    return new Promise(resolve => {
        const video = document.createElement("video");
        video.autoplay = true;
        video.muted = true;
        video.src = url;
        video.load();
        video.play();
        resolve(video);
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

