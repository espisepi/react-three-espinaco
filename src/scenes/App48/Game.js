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

            const stateElPrev = this.state[this.index - 1];
            this.scene.remove(stateElPrev.model.scene);

        }

        // add model to scene and animate -- still not workin
        // stateEl.model.scene.position.set(stateEl.modelAtt.position.x,stateEl.modelAtt.position.y,stateEl.modelAtt.position.z)
        // stateEl.model.scene.rotation.set(stateEl.modelAtt.rotation.x,stateEl.modelAtt.rotation.y,stateEl.modelAtt.rotation.z)
        // stateEl.model.scene.scale.set(stateEl.modelAtt.scale.x,stateEl.modelAtt.scale.y,stateEl.modelAtt.scale.z)
        this.scene.add(stateEl.model.scene);
        // console.log(stateEl.model)
        // const mixer = new THREE.AnimationMixer( stateEl.model.scene );
        // const clip = stateEl.model.animations[0];
        // const action = mixer.clipAction( clip );
        // action.play();
        // this.mixer = mixer;

        // Draw squares and checkers
        const wordLetters = stateEl.word.split(''); // 'lion' => [ 'l', 'i', 'o', 'n' ]
        wordLetters.forEach( (letter,i) => {

            const squareMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1), new THREE.MeshBasicMaterial({color:'red'}));
            squareMesh.position.set(i * 1.5 - 2, 2, 0);
            squareMesh.userData.letter = letter;
            this.scene.add(squareMesh);
            this.squares.push(squareMesh);

            const checkerMesh = this.createText(letter);
            checkerMesh.position.set(i * 1.5 - 2, -2, 0.1);
            checkerMesh.userData.letter = letter;
            this.scene.add(checkerMesh);
            this.checkers.push(checkerMesh);
            
            
        });

        if(this.controls){
            this.disposeControls();
        }
        this.updateControls();

        this.index++;
    }

    createText(text) {
        const textMesh = new Text();
        textMesh.font = 'https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff';
        textMesh.text = text
        textMesh.fontSize = 0.6;
        textMesh.color = 0x9966FF;
        textMesh.sync();
        return textMesh;
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
                checkerMesh.position.set(squareMesh.position.x - 0.15,squareMesh.position.y + 0.4,squareMesh.position.z + 0.1);
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
               if(square.position.x - 0.15 == checker.position.x && square.position.y + 0.4 == checker.position.y ) {
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

    update(delta) {
        if(this.mixer){
            this.mixer.update(delta);
        }
    }

}