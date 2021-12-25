const {enumerate} = require('./utils');

module.exports.create = function(type, value, pos_start, pos_end) {
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
}

module.exports.tokens = enumerate(
	[
		"TK_SUB", "TK_MUL", "TK_DIV",
		"TK_INT", "TK_FLOAT", "TK_ADD",
		"TK_POW", "TK_LPAREN", "TK_NEWLINE",
		"TK_RPAREN", "TKN_BINOPR", "TKN_NUMBER",
		"TKN_UNARYOPR", "TKN_EOF"
	]
);

module.exports.getTokenName = function(value) {
	return Object.keys(module.exports.tokens).find(key => module.exports.tokens[key] === value)
}