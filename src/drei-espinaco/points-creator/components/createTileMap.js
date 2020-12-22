import createMapPoints from './createMapPoints';
import createMapsPoints from './createMapsPoints';

export default function createTileMap(initialPoints=[[0,0,0]],size=[1,1], row=5, column=5){
    const numPoints = row;
    const spaceBetweenPoint = [size[0], 0, 0];
    const numGroups = column;
    const spaceBetweenGroup = [0,0,size[1]];

    const pointsList = Array.isArray(initialPoints[0]) ? 
                                        (createMapsPoints(numPoints, initialPoints, spaceBetweenPoint, numGroups, spaceBetweenGroup))
                                        : (createMapPoints(numPoints, initialPoints, spaceBetweenPoint, numGroups, spaceBetweenGroup));
    return pointsList;
}