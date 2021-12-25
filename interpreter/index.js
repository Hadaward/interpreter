const Lexer = require('./lexer');
const Parser = require('./parser');
const Context = require('./context');
const Exception = require('./exception');
const Interpreter = require('./interpreter');

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
		
		const globals = new Context('<program>');
		const interpreter = new Interpreter();
		
		const result = interpreter.visit(parserResult, globals);
		
		if (result.error instanceof Exception) {
			Exception.log(result.error);
			return;
		}
		
		return result.value.value;
	}
}