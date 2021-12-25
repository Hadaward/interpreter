const Token = require('./token');
const {InvalidSyntaxError} = require('./exception');

module.exports = class {
	constructor(tokens) {
		this.position = -1;
		this.tokens = tokens;
		this.currentToken = null;
	}
	
	next() {
		if (this.position < this.tokens.length) {
			this.position++;
			this.currentToken = this.tokens[this.position];
		}
	}
	
	factor() {
		const result = new module.exports.result();

		const token = this.currentToken;
		
		if (!token) return {type: Token.tokens.TKN_EOF}
		
		if ([Token.tokens.TK_INT, Token.tokens.TK_FLOAT].includes(token.type)) {
			this.next();
			return result.success({type: Token.tokens.TKN_NUMBER, token: token, position_start: token.position_start, position_end: token.position_end});
			
		} else if([Token.tokens.TK_ADD, Token.tokens.TK_SUB].includes(token.type)) {
			this.next();
			const factor = result.register(this.factor());
			
			if (result.error != null) {
				return result;
			}
			
			return result.success({type: Token.tokens.TKN_UNARYOPR, node: factor, op: token, position_start: token.position_start, position_end: factor.position_end});
			
		} else if (token.type == Token.tokens.TK_LPAREN) {
			this.next();
			const expr = result.register(this.expr());
			
			if (result.error != null) {
				return result;
			}
			
			if (this.currentToken.type == Token.tokens.TK_RPAREN) {
				this.next();
				return result.success(expr);
			} else {
				return result.failure(new InvalidSyntaxError(token.position_start, token.position_end, "Expected ')'"))
			}
		}
		
		return result.failure(new InvalidSyntaxError(token.position_start, token.position_end, "Expected int or float"))
	}
	
	term() {
		return this.binopr(this.factor, [Token.tokens.TK_MUL, Token.tokens.TK_DIV, Token.tokens.TK_POW]);
	}
	
	expr() {
		return this.binopr(this.term, [Token.tokens.TK_ADD, Token.tokens.TK_SUB]);
	}
	
	binopr(callback, ops) {
		const result = new module.exports.result();
		
		let left = result.register(callback.apply(this, []));
		
		if (result.error != null) {
			return result;
		}
		
		while (this.currentToken && ops.includes(this.currentToken.type)) {
			const token = this.currentToken;
			this.next();
			
			const right = result.register(callback.apply(this, []));
			
			if (result.error != null) {
				return result;
			}
			
			left = {
				type: Token.tokens.TKN_BINOPR,
				left: left,
				op: token,
				right: right,
				
				position_start: left.position_start,
				position_end: right.position_end
			}
		}
		
		return result.success(left);
	}
	
	parse() {
		this.next();
		
		const result = this.expr();
		
		if (result.error != null && this.currentToken.type == Token.tokens.TK_EOF) {
			result.failure(new InvalidSyntaxError(this.currentToken.position_start, this.currentToken.position_end, "Expected '+', '-', '*', '/', '^', 'integer' or 'float'"))
		}
		
		return result.error !== null ? result.error : result.node;
	}
}

module.exports.result = class {
	constructor() {
		this.error = null;
		this.node = null;
	}
	
	register(value) {
		if (value instanceof module.exports.result) {
			if (value.error != null) {
				this.error = value.error;
			}
			return value.node;
		}
		
		return value;
	}
	
	success(node) {
		this.node = node;
		return this;
	}
	
	failure(error) {
		this.error = error;
		return this;
	}
}