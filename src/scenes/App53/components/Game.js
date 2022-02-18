import * as THREE from 'three';


export default class Game {

    /**
     * 
     * @param {THREE.Scene} scene 
     * @param {THREE.Camera} camera 
     * @param { Map<String, THREE.texture> } textures
     */
    constructor(scene, camera) {

        // Obtenemos los objetos del escenario
        //const plataforma1 = scene.getObjectByName("plataforma1");

        // plataforma 1
        // tumba, 3 tumbas con instanced mesh
        // TODO: No se muestra el modelo 3d de la tumba aka lapida
        // const lapidaModel = models["lapidaModel"];
        // const lapidaTextures = models["lapidaTextures"];
        //const lapidaMaterial = new THREE.MeshBasicMaterial({color: "red"});
        // const lapidaMaterial = new THREE.MeshPhongMaterial({
        //     map: lapidaTextures[0],
        //     normalMap: lapidaTextures[1],
        //     specularMap: lapidaTextures[2]
        // });

        //const lapidaMesh = new THREE.Mesh(lapidaModel.geometry, lapidaMaterial);
        //scene.add(lapidaMesh);

        // const countLapida = 5;
        // const offset =  ( countLapida - 1 ) / 2;
        // const dummy = new THREE.Object3D();
        // const lapidaInstancedMesh = new THREE.InstancedMesh( lapidaModel.geometry, lapidaMaterial, countLapida );
		// //lapidaInstancedMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
		// scene.add( lapidaInstancedMesh );
        // for(let i = 0; i < countLapida; i++) {
        //     dummy.position.set(offset - i,offset - i,offset - i);
        //     dummy.updateMatrix();
        //     lapidaInstancedMesh.setMatrixAt( i, dummy.matrix );
        // }

        // const cubeMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1,1,1), new THREE.MeshBasicMaterial({color:"red"}) );
        // cubeMesh.position.set(3,0,0);
        // scene.add(cubeMesh);

    }

    start() {}

    update() {}
}