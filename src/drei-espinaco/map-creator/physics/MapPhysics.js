import React, {useMemo} from 'react';
import { usePlane, useBox } from "use-cannon";

function CreatePhysicBox({object}) {
    console.log(object)
    const [ref] = useBox(() => ({ 
                        position: object.position,
                        rotation: object.rotation,
                        args: object.args
                    }));

    return (
        <mesh ref={ref}>
            <boxBufferGeometry args={object.args} />
            <meshBasicMaterial color='green' wireframe={true} />
        </mesh>
    );
}


export default function MapPhysics({args=[]}) {

    const physicMeshes = useMemo(()=>[], [args]);

    // I do this on this way to can use hooks inside forEarch loop
    // only execute when args is changed
    const firstTime = useMemo(()=>[], [args]);
    if(firstTime.length === 0) {
        firstTime.push(1);

        args.forEach( (physic) => {
            if(physic.type === 'plane'){
                physic.objects.forEach((object) => {
                    object.args.push(0.1); // args = [x,y,0.1] box mesh
                    const physicMesh = <CreatePhysicBox object={object} />;
                    physicMeshes.push(physicMesh);
                });
            }
            if(physic.type === 'box'){
                physic.objects.forEach((object) => {
                    const physicMesh = <CreatePhysicBox object={object} />;
                    physicMeshes.push(physicMesh);
                });
            }
        } );

    }
    
    return physicMeshes;
}