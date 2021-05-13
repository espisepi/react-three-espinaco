
import spidermp3 from './spider.mp3';
import spiderSoundwav from './spiderSound.wav';

import wolfmp3 from './wolf.mp3';
import wolfSoundwav from './wolfSound.wav';

import batmp3 from './bat.mp3';
import batSoundwav from './batSound.wav';

import butterflymp3 from './butterfly.mp3';
import butterflySoundmp3 from './butterflySound.mp3';

import cowmp3 from './cow.mp3';

import catmp3 from './cat.mp3';

import mousemp3 from './mouse.mp3';

import lofiAmbientmp3 from './lofiambient.mp3';
import selectionwav from './selection.wav';
import successwav from './success.wav';
import youwinmp3 from './youwin.mp3';

const spider = new Audio(spidermp3);
const spiderSound = new Audio(spiderSoundwav);

const wolf = new Audio(wolfmp3);
const wolfSound = new Audio(wolfSoundwav);

const bat = new Audio(batmp3);
const batSound = new Audio(batSoundwav);

const butterfly = new Audio(butterflymp3);
const butterflySound = new Audio(butterflySoundmp3);

const cow = new Audio(cowmp3);

const cat = new Audio(catmp3);

const mouse = new Audio(mousemp3);

const lofiAmbient = new Audio(lofiAmbientmp3);
const selection = new Audio(selectionwav);
const success = new Audio(successwav);
const youwin = new Audio(youwinmp3);

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


export { playAudio, stopAudio, spider, spiderSound, wolf, wolfSound, bat, batSound, butterfly, butterflySound, cow, cat, mouse, lofiAmbient, selection, success, youwin };