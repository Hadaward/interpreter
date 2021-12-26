import {IllegalCharError} from './exception.js';
import Position from './position.js';
import Token from './token.js';

import {DIGITS} from './utils.js';

export default class {
	constructor(inputText) {
		this.inputText = typeof inputText === "string" ? inputText : "";
		this.position = new Position(-1, 0, -1, this.inputText);
		this.currentChar = {
			char: null,
			byte: -1
		};
	}
	
	next() {
		this.position.next();
		
		if (this.position.index < this.inputText.length) {
			this.currentChar.char = this.inputText[this.position.index];
			this.currentChar.byte = this.currentChar.char.charCodeAt(0);
		} else {
			this.currentChar.char = null;
		}
	}
	
	readNumber() {
		let buffer = "";
		let dots = 0;
		
		const pos_start = this.position.copy();
		
		while (this.currentChar.char != null && (DIGITS.includes(this.currentChar.byte) || this.currentChar.byte == 46)) {
			switch(this.current) {
				case ".":
					if (dots == 0) {
						dots++;
						buffer+=this.currentChar.char;
					}
					break;
				default:
					buffer+=this.currentChar.char;
					break;
			}
			this.next();
		}
		
		const pos_end = this.position.copy();
		this.position.index--;
		
		const tk_type = dots === 0 ? Token.tokens.TK_INT : Token.tokens.TK_FLOAT;
		
		return Token.create(tk_type, Number(buffer), pos_start, pos_end);
	}
	
	analysis() {
		const tokens = [];
		
		this.next();
		
		while(this.currentChar.char !== null || this.position.index === 0) {
			if (this.currentChar.char.replace(/\s/g, '').length) {
				switch(this.currentChar.char) {
					case "+":
						tokens.push(Token.create(Token.tokens.TK_ADD, null, this.position));
						break;
					case "-":
						tokens.push(Token.create(Token.tokens.TK_SUB, null, this.position));
						break;
					case "*":
						tokens.push(Token.create(Token.tokens.TK_MUL, null, this.position));
						break;
					case "/":
						tokens.push(Token.create(Token.tokens.TK_DIV, null, this.position));
						break;
					case "^":
						tokens.push(Token.create(Token.tokens.TK_POW, null, this.position));
						break;
					case "(":
						tokens.push(Token.create(Token.tokens.TK_LPAREN, null, this.position));
						break;
					case ")":
						tokens.push(Token.create(Token.tokens.TK_RPAREN, null, this.position));
						break;
					default:
						if (DIGITS.includes(this.currentChar.byte)) {
							tokens.push(this.readNumber());
						} else {
							const char = this.currentChar.char, pos_start = this.position.copy();
							this.next();
							return new IllegalCharError(pos_start, this.position, `'${char}'`);
						}
				}
			}
			
			this.next(this.currentChar.char);
		}
		
		tokens.push(Token.create(Token.tokens.TKN_EOF, null, this.position));
		return tokens;
	}
}