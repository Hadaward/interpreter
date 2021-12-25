const Lexer = require('./lexer');
const Exception = require('./exception');

module.exports = {
	run: function(inputText) {
		const lex = new Lexer(inputText);
		const result = lex.analysis();
		
		if (result instanceof Exception) {
			console.error(result.toString());
			return;
		}
		
		
	}
}