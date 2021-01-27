import { proxy } from "valtio";

const playlistTrapSpain = {
    name: 'trap spain',
    toggled: true,
    children: [
        { name:'ilham - never even know (official music video)', url:'https://www.youtube.com/watch?v=r0HLDjPnU24&list=PLbF25hg0V3wDZtHBc3OXtHLLnLDseleFB&index=1&ab_channel=ilham' },
        { name:'Tokischa - Twerk (Official Video) ft. Eladio Carrión', url:'https://www.youtube.com/watch?v=VAQZ3ZHr22E&ab_channel=TokischaVEVO' },
    ]
};
export const statePlaylistTrapSpain = proxy(playlistTrapSpain);