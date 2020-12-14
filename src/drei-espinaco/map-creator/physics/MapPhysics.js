import React, {useMemo} from 'react';
import { usePlane, useBox } from "use-cannon";

function CreatePhysicBox({object, visible = false}) {
    const [ref] = useBox(() => ({ 
                        position: object.position,
                        rotation: object.rotation,
                        args: object.args
                    }));

    return (
        <mesh ref={ref}>
            <boxBufferGeometry args={object.args} />
            <meshBasicMaterial color='green' wireframe={true} visible={visible} />
        </mesh>
    );
}


export default function MapPhysics({args=[], visible}) {

    const physicMeshes = useMemo(()=>{
        const physicMeshes = [];
        args.forEach( (physic) => {
            if(physic.type === 'plane'){
                physic.objects.forEach((object) => {
                    object.args.push(0.1); // args = [x,y,0.1] box mesh physics
                    const physicMesh = <CreatePhysicBox object={object} visible={visible} />;
                    physicMeshes.push(physicMesh);
                });
            }
            if(physic.type === 'box'){
                physic.objects.forEach((object) => {
                    const physicMesh = <CreatePhysicBox object={object} visible={visible} />;
                    physicMeshes.push(physicMesh);
                });
            }
        } );

        return physicMeshes;
    }, [args]);
    
    return physicMeshes ? physicMeshes : null;
}