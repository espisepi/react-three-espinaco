import React, { Suspense, useCallback, useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Loading from '../../components/Loading';
import Camera from '../../components/Camera';
import Curve from '../../drei-espinaco/Curve';
import { Text } from "../../drei-espinaco/Text";
import create from 'zustand';

const [useStore, api] = create((set, get) => {
    return {
        camera: undefined,
        cameraPositions: [
            [0,0,0],
            [2,0,6],
            [2,0,0],
            [4,0,0]
        ],
        // topNormalized: 0, // Range [0,1]
        // setTopNormalized: (topNormalized) => {
        //     set({ topNormalized });
        // },
        index: 0,
        setIndex: (num) => set( state => {
            const length = state.cameraPositions.length;
            state.index =  num % length; // index Range [0, length]
        }),
        pictures: [
            {
                img: 'assets/img/gallery/lion.jpg',
                position: [0,0,-1]
            },
            {
                img: 'assets/img/gallery/tiger.jpg',
                position: [2,0,-1]
            },
            {
                img: 'assets/img/masnaisraelb.png',
                position: [4,0,-1]
            }
        ],
        actions: {
            init(camera) {
                set({ camera });
            }
        }
    }
});

export function Picture({img, ...props}) {
    const texture = useLoader(THREE.TextureLoader, img);
    return (
        <mesh {...props} visible={true}>
            <planeBufferGeometry attach='geometry' args={[1,1]} />
            <meshBasicMaterial attach='material' map={texture} />
        </mesh>
    );
}

export function Arrows({}) {
    const cameraPositions = useStore( state => state.cameraPositions );
    const [index, setIndex] = useStore( state => [state.index, state.setIndex] );
    const [newPosition, setNewPosition] = useState(new THREE.Vector3(...cameraPositions[index]));

    const { camera } = useThree();
    useFrame(()=>{
        if(group.current){
            group.current.position.lerp(newPosition, 0.1);
        }
    });

    const handleClick = useCallback((e)=>{
        setIndex( index + 1 );
        setNewPosition( new THREE.Vector3(...cameraPositions[index]) );
    });

    const group = useRef();
    useEffect(()=>{
        if(group.current){
            group.current.add(camera);
        }
    },[group.current])
    return (
        <group name ref={group}>
            <mesh position={[0,-0.3, -0.5]} scale={[0.1,0.1,0.1]} onClick={handleClick}>
                <planeBufferGeometry attach='geometry' args={[1,1]} />
                <meshBasicMaterial attach='material' color='red' side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

export function Pictures() {
    const pictures = useStore(state => state.pictures);
    return pictures.map((data, i) => <Picture key={i} {...data} />);
}

class GameQuestion {
    constructor(question, answer, img) {
        this.state = {
            question: question, // 'What animal is this ?',
            answer: answer,     // 'lion',
            img: img,           // 'assets/img/gallery/lion.jpg'
        };
    }
    checkGame(input) {
        return input === this.state.answer;
    }
}


export function Scene() {
    // const [cameraPositions, topNormalized] = useStore(state => [state.cameraPositions, state.topNormalized]);
    return(
        <>
        <ambientLight />
        {/* <Curve points={cameraPositions} top={topNormalized}>
            <Camera position={[0, 0, 0]} near={0.1} far={1000} fov={70} />
        </Curve> */}
        <Suspense fallback={<Loading />}>
            <Pictures />
            <Arrows />
        </Suspense>
        {/* <OrbitControls /> */}
        </>
    );
}

export default function App43(props) {
    const actions = useStore(state => state.actions);
    return (
    <Canvas className="canvas" 
            style={{backgroundColor:'#000000'}}
            camera={{ position: [0, 0, 0], near: 0.01, far: 10000, fov:70 }}
            onCreated={({ gl, camera }) => {
                actions.init(camera);
                // gl.gammaInput = true
                // gl.toneMapping = THREE.Uncharted2ToneMapping
                // gl.setClearColor(new THREE.Color('#020209'))
            }}>
        <Scene />
    </Canvas>
    );
}




/** --------------- Old function -------------- */

// class GameRockPaperScissor {
//     constructor() {
//         this.state = {
//             rock: 'rock',
//             paper: 'paper',
//             scissor: 'scissor',
//             itemSelected: undefined
//         }
//     }
//     checkGame(input) {
//         this.update();
//         // if(input === this.state.rock && this.itemSelected === ) { }
//         return true; // You win
//     }
//     update() {// should be private function
//         this.itemSelected = this.state.rock;
//         return null
//     }
// }

// export function Arrows({}) {
//     const cameraPositions = useStore( state => state.cameraPositions );
//     const [topNormalized, setTopNormalized] = useStore( state => [state.topNormalized,state.setTopNormalized]);
//     const [nextPoint, setNextPoint] = useState(topNormalized); // Range [0,1]

//     useFrame(()=>{
//         if(topNormalized < nextPoint ){
//             setTopNormalized(topNormalized + 0.01);
//         } else if (topNormalized > nextPoint) {
//             // setTopNormalized(topNormalized - 0.01);
//             setTopNormalized(nextPoint);
//         }
//     });
    
//     const [index, setIndex] = useState(0);
//     const handleClick = useCallback((e)=>{
//         const length = cameraPositions.length;
//         setIndex( (index + 1) % length );
//         console.log(index);
//         const indexNormalized = index / length;
//         setNextPoint(indexNormalized);
//     });
//     const { camera } = useThree();
//     return (
//         <mesh position={[camera.position.x,camera.position.y,camera.position.z  - 0.5]} scale={[0.2,0.2,0.2]} onClick={handleClick}>
//             <planeBufferGeometry attach='geometry' args={[1,1]} />
//             <meshBasicMaterial attach='material' color='red' />
//         </mesh>
//     );
// }