

export default function createPointsRecursive(numPoints=50, initialPoint=[0,0,0], spaceBetweenPoint=[10,0,0]) {
    const pointsList = [];
    for(let i = 0; i < numPoints; i++) {
        pointsList.push([
            initialPoint[0] + i * spaceBetweenPoint[0], // x
            initialPoint[1] + i * spaceBetweenPoint[1], // y
            initialPoint[2] + i * spaceBetweenPoint[2]  // z
        ]);
    }
    return pointsList;
}