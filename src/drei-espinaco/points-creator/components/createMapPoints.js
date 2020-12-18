import createPointsRecursive from './createPointsRecursive';

export default function createMapPoints(numPoints=50, initialPoint=[0,0,0], spaceBetweenPoint=[10,0,0], numGroups=10, spaceBetweenGroup=[0,0,20]){
    let pointsList = [];
    for(let i = 0; i < numGroups; i++){
        pointsList = pointsList.concat(createPointsRecursive(numPoints, initialPoint, spaceBetweenPoint));
        initialPoint[0] += spaceBetweenGroup[0];
        initialPoint[1] += spaceBetweenGroup[1];
        initialPoint[2] += spaceBetweenGroup[2];
    }
    return pointsList;
}