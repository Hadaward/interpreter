module.exports = class {
	constructor(index, lineNumber, columnNumber, inputText) {
		this.index = index;
		this.lineNumber = lineNumber;
		this.columnNumber = columnNumber;
		this.inputText = inputText;
	}
	
	next(current) {
		this.index++;
		this.columnNumber++;
		
		if (current == "\n") {
			this.lineNumber++;
			this.columnNumber=0;
		}
		
		return this;
	}
	
	copy() {
		return new module.exports(this.index, this.lineNumber, this.columnNumber, this.inputText);
	}
}