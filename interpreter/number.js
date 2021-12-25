const {RuntimeError} = require('./exception');

module.exports = class {
	constructor(value) {
		this.value = value;
		this.set_position();
		this.set_context();
	}
	
	set_position(start, end) {
		this.position_start = start;
		this.position_end = end;
		return this;
	}
	
	set_context(context) {
		this.context = context;
		return this;
	}
	
	ADD(other) {
		if (other instanceof module.exports) {
			return new module.exports(this.value + other.value).set_context(this.context);
		}
	}
	
	SUB(other) {
		if (other instanceof module.exports) {
			return new module.exports(this.value - other.value).set_context(this.context);
		}
	}
	
	MUL(other) {
		if (other instanceof module.exports) {
			return new module.exports(this.value * other.value).set_context(this.context);
		}
	}
	
	DIV(other) {
		if (other instanceof module.exports) {
			if (other.value == 0) {
				return new RuntimeError(other.position_start, other.position_end, "Division by zero", this.context);
			}
			return new module.exports(this.value / other.value).set_context(this.context);
		}
	}
	
	POW(other) {
		if (other instanceof module.exports) {
			return new module.exports(this.value ** other.value).set_context(this.context);
		}
	}
	
	toString() {
		return String(this.value);
	}
}