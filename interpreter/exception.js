module.exports = class {
	constructor(name, pos_start, pos_end, details) {
		this.name = name
		this.details = details
		this.position_end = pos_end
		this.position_start = pos_start
		
		this.toString = function() {
			return `${this.name}: ${this.details}\nInterpreter, line ${this.position_start.lineNumber + 1}\n\n${this.position_start.inputText}`;
		};
	}
}

module.exports.IllegalCharError = class extends module.exports {
	constructor(pos_start, pos_end, details) {
		super("Illegal Character", pos_start, pos_end, details);
	}
}

module.exports.InvalidSyntaxError = class extends module.exports {
	constructor(pos_start, pos_end, details) {
		super("Invalid Syntax", pos_start, pos_end, details);
	}
}

module.exports.log = function(exception) {
	if (exception instanceof module.exports) {
		console.error(exception.toString());
	}
} 