import { ITokenLocation } from "../token/ITokenLocation";
import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";
import { Character } from "./Character";
import { ILexer } from "./ILexer";

export class Lexer implements ILexer {
  public sourceCode: string;
  public cursorPosition: number;
  public currentChar: Character;
  public charLocation: ITokenLocation;
  constructor(source: string) {
    this.sourceCode = source;
    this.cursorPosition = 0;
    this.currentChar = Character.from(this.sourceCode[this.cursorPosition]);
    this.charLocation = { line: 1, column: 0 };
  }

  /**
   * Advances the cursor in the source code.
   *
   * @param shift How many characters to advance
   */
  public advance(shift: number = 1): Lexer {
    this.cursorPosition += shift;
    this.charLocation.column += shift;
    this.currentChar = Character.from(this.sourceCode[this.cursorPosition]);

    return this;
  }

  /**
   * Peeks up a character specified by shift argument, starting from current position.
   *
   * @param shift How many characters to skip before peeking
   */
  public peek(shift: number = 1): string {
    return this.sourceCode[this.cursorPosition + shift];
  }

  public next(): Token {
    if (this.currentChar.isWhitespace()) {
      this.skipWhitespace();
    }

    if (this.currentChar.is("*")) {
      this.advance();
      return new Token(TokenType.ASTERISK, "*", this.charLocation);
    } else if (this.currentChar.is("+")) {
      this.advance();
      return new Token(TokenType.PLUS, "+", this.charLocation);
    } else if (this.currentChar.is("-")) {
      this.advance();
      return new Token(TokenType.MINUS, "-", this.charLocation);
    } else if (this.currentChar.is("/")) {
      this.advance();
      return new Token(TokenType.SLASH, "/", this.charLocation);
    } else if (this.currentChar.is("\\")) {
      this.advance();
      return new Token(TokenType.BACKSLASH, "\\", this.charLocation);
    }

    throw new Error(`Unrecognized token at ${this.charLocation.line}:${this.charLocation.column}`);
  }

  private skipWhitespace() {
    while (this.currentChar.isWhitespace()) {
      if (this.currentChar.isNewline()) {
        this.charLocation.line++;
        this.charLocation.column = 1;
      }

      this.advance();
    }
  }
}
