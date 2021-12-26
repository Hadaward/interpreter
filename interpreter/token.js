import {enumerate} from './utils.js';

const token = {
	create: function(type, value, pos_start, pos_end) {
		const result = {
			type: type,
			value: value
		}
		
		if (pos_start && pos_start != null && pos_start != undefined) {
			result.position_start = pos_start.copy()
		}
		
		if (pos_end && pos_end != null && pos_end != undefined) {
			result.position_end = pos_end.copy()
		}
		
		if (result.position_start && !result.position_end) {
			result.position_end = result.position_start.copy()
			result.position_end.next();
		}
		
		return result;
	},
	
	tokens: enumerate(
		[
			"TK_SUB", "TK_MUL", "TK_DIV",
			"TK_INT", "TK_FLOAT", "TK_ADD",
			"TK_POW", "TK_LPAREN", "TK_NEWLINE",
			"TK_RPAREN", "TKN_BINOPR", "TKN_NUMBER",
			"TKN_UNARYOPR", "TKN_EOF"
		]
	),
	
	getTokenName: function(value) {
		return String(Object.keys(this.tokens).find(key => this.tokens[key] === value)).split('_')[1];
	},
	
	match: function(token, type, value) {
		return token.type === type && token.value === value;
	}
}

export default token;