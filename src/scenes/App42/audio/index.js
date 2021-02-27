import lionSoundAudio from './lion.mp3';
import tigerSoundAudio from './tiger.mp3';
import ambientAudio from './ambient.mp3';

const lionSound = new Audio(lionSoundAudio);
const tigerSound = new Audio(tigerSoundAudio);
const ambient = new Audio(ambientAudio);

export { ambient, lionSound, tigerSound };