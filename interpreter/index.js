const Lexer = require('./lexer');
const Parser = require('./parser');
const Exception = require('./exception');

module.exports = {
	run: function(inputText) {
		const lex = new Lexer(inputText);
		const lexerResult = lex.analysis();
		
		if (lexerResult instanceof Exception) {
			Exception.log(lexerResult);
			return;
		}
		
		const parser = new Parser(lexerResult);
		const parserResult = parser.parse();
		
		if (parserResult instanceof Exception) {
			Exception.log(parserResult);
			return;
		}
		
		console.log(parserResult)
	}
}