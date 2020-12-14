

const simpleMapPhysics = [
    {
        type: 'plane',
        objects: [
            {
                position: [0,0,0],
                rotation: [0,0,0],
                args: [100,100],
            },
            // {
            //     position: [0,0,0],
            //     rotation: [0,Math.PI/3,0],
            //     args: [100,100],
            // },
        ]
    },
    {
        type: 'box',
        objects: [
            {
                position: [0,0,20],
                rotation: [0,0,0],
                args: [5,5,5],
            }
        ]
    }


];

export default simpleMapPhysics;