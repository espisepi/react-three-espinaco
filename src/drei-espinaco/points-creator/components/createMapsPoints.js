import createMapPoints from './createMapPoints';

export default function createMapsPoints(numPoints, initialPoints=[[0,0,0],[10,0,0]], spaceBetweenPoint, numGroups, spaceBetweenGroup) {
    const res = [];
    initialPoints.forEach((initialPoint) => {
        const pointsList = createMapPoints(numPoints, initialPoint, spaceBetweenPoint, numGroups, spaceBetweenGroup);
        res.push(...pointsList);
    });
    return res;
}