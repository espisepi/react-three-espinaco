import { ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { Text } from 'troika-three-text'

export default class Game{

    constructor(state, scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.squares = [];
        this.checkers = [];
        this.state = state;
        this.index = 0;

        this.nextWord();
        // intercambiamos de posicion a los checkers checkers.forEach( (checker, i) => {   })
    }

    nextWord() {

        if(this.index === this.state.length){
            alert('YOU WIN');
            return;
        }

        const stateEl = this.state[this.index];

        if(this.squares.length != 0 && this.checkers.length != 0){

            this.squares.forEach( square => {
                this.scene.remove(square);
            })
            this.squares = [];

            this.checkers.forEach( checker => {
                this.scene.remove(checker);
            })
            this.checkers = [];

            this.scene.remove(stateEl.model.scene);

        }

        // Draw model
        this.scene.add(stateEl.model.scene);

        // Draw squares and checkers
        const wordLetters = stateEl.word.split(''); // 'lion' => [ 'l', 'i', 'o', 'n' ]
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
            this.createText(letter, checkerMesh);
            
        });

        if(this.controls){
            this.disposeControls();
        }
        this.updateControls();

        this.index++;
    }

    createText(text, parent) {
        const textMesh = new Text();
        textMesh.position.set(0,0.4,0)
        textMesh.font = 'https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff';
        textMesh.text = text
        textMesh.fontSize = 0.6;
        textMesh.color = 0x9966FF;
        textMesh.sync();
        parent.add(textMesh);
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