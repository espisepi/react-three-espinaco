import { ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

export default class Game{

    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.squares = [];
        this.checkers = [];
        this.word = 'lion';

        const wordLetters = ['l','i','o','n'];

        wordLetters.forEach( (letter,i) => {

            const squareMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1), new THREE.MeshBasicMaterial({color:'red'}));
            squareMesh.position.set(i * 1.5 - 2, 2, 0);
            squareMesh.userData.letter = letter;
            scene.add(squareMesh);
            this.squares.push(squareMesh);

            const checkerMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1), new THREE.MeshBasicMaterial({color:'blue'}));
            checkerMesh.position.set(i * 1.5 - 2, -2, 0.1);
            checkerMesh.userData.letter = letter;
            scene.add(checkerMesh);
            this.checkers.push(checkerMesh);
            
        });

        // intercambiamos de posicion a los checkers
        // checkers.forEach( (checker, i) => {
            
        // })

        const controls = new DragControls( [ ... this.checkers ], camera, renderer.domElement );

        const raycaster = new THREE.Raycaster();
        const self = this;
        controls.addEventListener( 'dragend', function ( event ) {
            const checkerMesh = event.object;
            raycaster.set(checkerMesh.position,new THREE.Vector3(0,0,-1));
            const intersectObjects = raycaster.intersectObjects( self.squares );
            if(intersectObjects.length != 0) {
                const squareMesh = intersectObjects[0].object;
                checkerMesh.position.set(squareMesh.position.x,squareMesh.position.y,squareMesh.position.z + 0.1);
                if(self.checkGameSuccess()){
                    alert('has ganado');
                }
            }
        } );
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