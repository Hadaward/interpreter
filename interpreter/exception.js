const exception = class {
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

exception.IllegalCharError = class extends exception {
	constructor(pos_start, pos_end, details) {
		super("Illegal Character", pos_start, pos_end, details);
	}
}

exception.InvalidSyntaxError = class extends exception {
	constructor(pos_start, pos_end, details) {
		super("Invalid Syntax", pos_start, pos_end, details);
	}
}

exception.RuntimeError = class extends exception {
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

exception.log = function(value) {
	if (value instanceof exception) {
		throw value.toString();
	}
} 

export const InvalidSyntaxError = exception.InvalidSyntaxError;
export const IllegalCharError = exception.IllegalCharError;
export const RuntimeError = exception.RuntimeError;
export const log = exception.log;
export default exception;