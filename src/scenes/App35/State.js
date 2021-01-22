import { proxy } from "valtio";

export const Images = [
    'assets/img/jipis/charls/doggy.jpeg',
    'assets/img/jipis/charls/doggy2.jpeg',
];

const Music = {
    pause: false,
    current: {audio: 'assets/musica/masnaisraelb.mp3', img: 'assets/img/masnaisraelb.png'},
    array: [
        {audio: 'assets/musica/masnaisraelb.mp3', img: 'assets/img/masnaisraelb.png'},
        {audio: 'assets/musica/070shake.mp3', img: 'assets/img/jipis/charls/doggy.jpeg'}
    ]
}
export const MusicState = proxy(Music);

const Action = {
    name: null, // name of the action
    current: null// () => console.log('action executed')
}
export const ActionState = proxy(Action);