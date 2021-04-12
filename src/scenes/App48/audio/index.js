import spidermp3 from './spider.mp3';
import spiderSoundwav from './spiderSound.wav';
import wolfmp3 from './wolf.mp3';
import wolfSoundwav from './wolfSound.wav';
import selectionwav from './selection.wav';
import successwav from './success.wav';

const spider = new Audio(spidermp3);
const spiderSound = new Audio(spiderSoundwav);
const wolf = new Audio(wolfmp3);
const wolfSound = new Audio(wolfSoundwav);
const selection = new Audio(selectionwav);
const success = new Audio(successwav);


export { spider, spiderSound, wolf, wolfSound, selection, success };