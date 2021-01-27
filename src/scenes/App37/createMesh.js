import * as THREE from 'three';

export function createMesh( { positions, scale, x, y, z, color } ) {
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', positions.clone() );
    geometry.setAttribute( 'initialPosition', positions.clone() );
    geometry.attributes.position.setUsage( THREE.DynamicDrawUsage );

    const clones = [

        [ 6000, 0, - 4000 ],
        [ 5000, 0, 0 ],
        [ 1000, 0, 5000 ],
        [ 1000, 0, - 5000 ],
        [ 4000, 0, 2000 ],
        [ - 4000, 0, 1000 ],
        [ - 5000, 0, - 5000 ],

        [ 0, 0, 0 ]

    ];

    let mesh;
    for ( let i = 0; i < clones.length; i ++ ) {

        const c = ( i < clones.length - 1 ) ? 0x252525 : color;

        mesh = new THREE.Points( geometry, new THREE.PointsMaterial( { size: 5, color: c } ) );
        mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
        mesh.position.x = x + clones[ i ][ 0 ];
        mesh.position.y = y + clones[ i ][ 1 ];
        mesh.position.z = z + clones[ i ][ 2 ];
    }
    return mesh;

}
