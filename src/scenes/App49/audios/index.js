import enterSoundmp3 from './enterSound.mp3';
import wellcomeSoundmp3 from './wellcomeSound.mp3';
import selectionwav from './selection.wav';

const enterSound = new Audio(enterSoundmp3);
const wellcomeSound = new Audio(wellcomeSoundmp3);
const selectionSound = new Audio(selectionwav);

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

export {playAudio, stopAudio, enterSound, wellcomeSound, selectionSound };