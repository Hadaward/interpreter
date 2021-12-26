import {RuntimeError} from './exception.js';

const number = class {
	constructor(value) {
		this.value = value.toFixed(10);
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
		if (other instanceof number) {
			return new number(this.value + other.value).set_context(this.context);
		}
	}
	
	SUB(other) {
		if (other instanceof number) {
			return new number(this.value - other.value).set_context(this.context);
		}
	}
	
	MUL(other) {
		if (other instanceof number) {
			return new number(this.value * other.value).set_context(this.context);
		}
	}
	
	DIV(other) {
		if (other instanceof number) {
			if (other.value == 0) {
				return new RuntimeError(other.position_start, other.position_end, "Division by zero", this.context);
			}
			return new number(this.value / other.value).set_context(this.context);
		}
	}
	
	POW(other) {
		if (other instanceof number) {
			return new number(this.value ** other.value).set_context(this.context);
		}
	}
	
	toString() {
		return String(this.value);
	}
}

export default number;
