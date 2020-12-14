import React, {useMemo} from 'react';
import { usePlane, useBox } from "use-cannon";

function CreatePhysic({object}) {
    console.log(object)
    const [ref] = useBox(() => ({ 
                        position: object.position,
                        rotation: object.rotation,
                        args: [object.args[0],object.args[1],0.1]
                    }));

    return (
        <mesh ref={ref}>
            <boxBufferGeometry args={[object.args[0],object.args[1],0.1]} />
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
                    const physicMesh = <CreatePhysic object={object} />;
                    physicMeshes.push(physicMesh);
                });
            }
            if(physic.type === 'box'){

            }
        } );

    }
    
    console.log(physicMeshes);
    return physicMeshes;
}