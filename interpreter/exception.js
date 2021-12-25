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

module.exports.RuntimeError = class extends module.exports {
	constructor(pos_start, pos_end, details, context) {
		super("Runtime Error", pos_start, pos_end, details);
		this.context = context;
		
		this.toString = function() {
			return `${this.generate_traceback()}${this.name}: ${this.details}\n\n${this.position_start.inputText}`
		};
	}
	
	generate_traceback() {
		let result = '';
		let position = this.position_start;
		let context = this.context;
		
		while (context != null && context != undefined && context) {
			result = `   Interpreter, line ${position.lineNumber + 1}, in ${context.name}\n` + result;
			position = context.parent_entry_position;
			context = context.parent;
		}
		
		return `Traceback (most recent call last):\n${result}`;
	}
}

module.exports.log = function(exception) {
	if (exception instanceof module.exports) {
		console.error(exception.toString());
	}
} 