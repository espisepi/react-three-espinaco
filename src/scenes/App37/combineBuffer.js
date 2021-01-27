import * as THREE from 'three';

export function combineBuffer( model, bufferName ) {

    let count = 0;

    model.traverse( function ( child ) {

        if ( child.isMesh ) {

            const buffer = child.geometry.attributes[ bufferName ];

            count += buffer.array.length;

        }

    } );

    const combined = new Float32Array( count );

    let offset = 0;

    model.traverse( function ( child ) {

        if ( child.isMesh ) {

            const buffer = child.geometry.attributes[ bufferName ];

            combined.set( buffer.array, offset );
            offset += buffer.array.length;

        }

    } );

    return new THREE.BufferAttribute( combined, 3 );

}