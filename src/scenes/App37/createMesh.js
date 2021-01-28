import * as THREE from 'three';

export function createMesh( { positionBufferAttribute, position=[0,0,0], scale, color = 0x252525 } ) {
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', positionBufferAttribute.clone() );
    geometry.setAttribute( 'initialPosition', positionBufferAttribute.clone() );
    geometry.attributes.position.setUsage( THREE.DynamicDrawUsage );

    const mesh = new THREE.Points( geometry, new THREE.PointsMaterial( { size: 1, color: color } ) );
    mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
    mesh.position.x = position[0];
    mesh.position.y = position[1];
    mesh.position.z = position[2];
    return mesh;

}
