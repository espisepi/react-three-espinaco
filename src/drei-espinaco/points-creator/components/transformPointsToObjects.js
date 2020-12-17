

export default function transformPointsToObjects(pointsList=[], rotation=[0,0,0], scale=[1,1,1]) {
    const objects = [];
    pointsList.forEach((point) => {
        objects.push({
            position: point,
            rotation: rotation,
            scale: scale
        })
    });
    return objects;
}