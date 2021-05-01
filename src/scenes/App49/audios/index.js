import enterSoundmp3 from './enterSound.mp3';
import wellcomeSoundmp3 from './wellcomeSound.mp3';

const enterSound = new Audio(enterSoundmp3);
const wellcomeSound = new Audio(wellcomeSoundmp3);

const playAudio = (audio, volume = 1, loop = false) => {
    if(audio){
        audio.currentTime = 0;
        audio.volume = volume;
        audio.loop = loop;
        audio.play();
    } else {
        console.log('there is no audio to play');
    }
}

const stopAudio = (audio) => {
    if(audio){
        audio.pause();
    } else {
        console.log('there is no audio to play');
    }
}

export { enterSound, wellcomeSound, playAudio, stopAudio };