module.exports.enumerate = function(list) {
	const result = {};
	
	for (let key=0; key < list.length; key++) {
		result[ list[key] ] = key;
	}
	
	return result;
}

module.exports.addArrows = function(text, pos_start, pos_end) {
	const text_fixed = text.split('\n')[pos_end.lineNumber - 1];
	let arrows = " ".repeat(text_fixed.length);
	
	for (let k=pos_start.columnNumber-1; k<pos_end.columnNumber; k++) {
		arrows = arrows.substr(0, k) + '^' + arrows.substr(k+1, arrows.length);
	}
	
	return text_fixed + '\n' + arrows;
}

module.exports.DIGITS = Array(10).fill().map((_, index) => 48 + index);