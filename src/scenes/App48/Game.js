import { ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

export default class Game{

    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.squares = [];
        this.checkers = [];
        this.state = [
            {
                word:'lion',
                scale:[1,1,1]
            },
            {
                word:'birds',
                scale:[1,1,1]
            }
        ];
        this.index = 0;

        this.nextWord();
        // intercambiamos de posicion a los checkers checkers.forEach( (checker, i) => {   })
    }

    nextWord() {

        if(this.index === this.state.length){
            alert('YOU WIN');
            return;
        }

        if(this.squares.length != 0 && this.checkers.length != 0){

            this.squares.forEach( square => {
                this.scene.remove(square);
            })
            this.squares = [];

            this.checkers.forEach( checker => {
                this.scene.remove(checker);
            })
            this.checkers = [];

        }

        const wordLetters = this.state[this.index].word.split(''); // 'lion' => [ 'l', 'i', 'o', 'n' ]
        this.index++;
        wordLetters.forEach( (letter,i) => {

            const squareMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1), new THREE.MeshBasicMaterial({color:'red'}));
            squareMesh.position.set(i * 1.5 - 2, 2, 0);
            squareMesh.userData.letter = letter;
            this.scene.add(squareMesh);
            this.squares.push(squareMesh);

            const checkerMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1), new THREE.MeshBasicMaterial({color:'blue'}));
            checkerMesh.position.set(i * 1.5 - 2, -2, 0.1);
            checkerMesh.userData.letter = letter;
            this.scene.add(checkerMesh);
            this.checkers.push(checkerMesh);
            
        });

        if(this.controls){
            this.disposeControls();
        }
        this.updateControls();
    }
    
    updateControls() {

        this.controls = new DragControls( [ ... this.checkers ], this.camera, this.renderer.domElement );

        const raycaster = new THREE.Raycaster();
        const self = this;
        this.controls.addEventListener( 'dragend', function ( event ) {
            const checkerMesh = event.object;
            raycaster.set(checkerMesh.position,new THREE.Vector3(0,0,-1));
            const intersectObjects = raycaster.intersectObjects( self.squares );
            if(intersectObjects.length != 0) {
                const squareMesh = intersectObjects[0].object;
                checkerMesh.position.set(squareMesh.position.x,squareMesh.position.y,squareMesh.position.z + 0.1);
                if(self.checkGameSuccess()){
                    self.nextWord();
                }
            }
        } );
    }

    disposeControls() {
        this.controls.dispose();
    }

    checkGameSuccess() {
        const squares = this.squares;
        const checkers = this.checkers;

        let aciertos = 0;
        checkers.forEach( checker => {
            squares.forEach( square => {
               if(square.position.x == checker.position.x && square.position.y == checker.position.y ) {
                   if(square.userData.letter == checker.userData.letter ){
                        aciertos++;
                   }
               }
            })
        });

        if(checkers.length == aciertos){
            return true;
        } else {
            return false;
        }
        
    }

}