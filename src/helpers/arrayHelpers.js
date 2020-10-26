

export function splitterArray (array, len) {
	const res = [];
	const arrayLength = array.length;
	for(let i = 0; i < arrayLength; i += len ) {
		res.push(array.slice(i, i + len ));
	}
	return res;
}