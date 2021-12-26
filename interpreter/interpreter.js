import Token from './token.js';
import Number from './number.js';
import Exception from './exception.js';

const interpreter = class {
	visit(node, context) {
		const method_name = `visit_${Token.getTokenName(node.type)}`;
		const method = this[method_name] || this.no_visit_method;
		return method.apply(this, [node, context]);
		
		return result.error !== null ? result.error : result.value;
	}
	
	no_visit_method(node, context) {
		throw Error(`No visit method visit_${Token.getTokenName(node.type)} defined`);
	}
	
	visit_NUMBER(node, context) {
		return new interpreter.result().success(new Number(node.token.value).set_context(context).set_position(node.position_start, node.position_end));
	}
	
	visit_BINOPR(node, context) {
		const result = new interpreter.result();
		
		const left = result.register(this.visit(node.left, context));
		
		if (result.error != null) {
			return result;
		}
		
		const right = result.register(this.visit(node.right, context));
		
		if (result.error != null) {
			return result;
		}
		
		const method = left[Token.getTokenName(node.op.type)];
		const opr = method.apply(left, [right]);
		
		if (opr instanceof Exception) {
			return result.failure(opr);
		}
		
		return result.success(opr.set_position(node.position_start, node.position_end));
	}
	
	visit_UNARYOPR(node, context) {
		const result = new interpreter.result();
		
		let number = result.register(this.visit(node.node, context));
		
		if (result.error != null) {
			return result;
		}
		
		if (node.op.type == Token.tokens.TK_SUB) {
			number = number.MUL(new Number(-1));
			
			if (number instanceof Exception) {
				return result.failure(number);
			}
		}
		
		return result.success(number.set_position(node.position_start, node.position_end));
	}
}

interpreter.result = class {
	constructor() {
		this.value = null;
		this.error = null;
	}
	
	register(result) {
		if (result.error != null) {
			this.error = result.error;
		} else {
			this.value = result.value;
		}
		return result.value;
	}
	
	success(value) {
		this.value = value
		return this;
	}
	
	failure(error) {
		this.error = error
		return this;
	}
}

export default interpreter;