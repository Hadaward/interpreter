export function enumerate(list) {
	const result = {};
	
	for (let key=0; key < list.length; key++) {
		result[ list[key] ] = key;
	}
	
	return result;
}

export const DIGITS = Array(10).fill().map((_, index) => 48 + index);