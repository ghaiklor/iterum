import { ITokenLocation } from "../token/ITokenLocation";
import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";
import { Character } from "./Character";

export class Lexer {
  public sourceCode: string;
  public cursorPosition: number;
  public currentChar: Character;
  public cursorLocation: ITokenLocation;
  constructor(source: string) {
    this.sourceCode = source;
    this.cursorPosition = 0;
    this.currentChar = Character.from(this.sourceCode[this.cursorPosition]);
    this.cursorLocation = { line: 1, column: 0 };
  }

  /**
   * Advances the cursor in the source code.
   *
   * @param shift How many characters to advance
   */
  public advance(shift: number = 1): Lexer {
    this.cursorPosition += shift;
    this.cursorLocation.column += shift;
    this.currentChar = Character.from(this.sourceCode[this.cursorPosition]);

    return this;
  }

  /**
   * Peeks up a character specified by shift argument, starting from current position.
   * This method does not modify the state of the cursor.
   *
   * @param shift How many characters to skip before peeking
   */
  public peek(shift: number = 1): Character {
    return Character.from(this.sourceCode[this.cursorPosition + shift]);
  }

  /**
   * Creates new instance of a token.
   * Same as new Token(), but it does not require location of a token.
   *
   * @param tokenType Type of the token to create
   * @param code Part of the source code that is related to token
   */
  public createToken(tokenType: TokenType, code: string): Token {
    return new Token(tokenType, code, this.cursorLocation);
  }

  /**
   * Iterates over the source code and returns token one at a time.
   */
  public next(): Token {
    if (this.currentChar.isWhitespace()) {
      this.skipWhitespace();
    }

    if (this.currentChar.is("*")) {
      this.advance();
      return new Token(TokenType.ASTERISK, "*", this.cursorLocation);
    } else if (this.currentChar.is("+")) {
      this.advance();
      return new Token(TokenType.PLUS, "+", this.cursorLocation);
    } else if (this.currentChar.is("-")) {
      this.advance();
      return new Token(TokenType.MINUS, "-", this.cursorLocation);
    } else if (this.currentChar.is("/")) {
      this.advance();
      return new Token(TokenType.SLASH, "/", this.cursorLocation);
    } else if (this.currentChar.is("\\")) {
      this.advance();
      return new Token(TokenType.BACKSLASH, "\\", this.cursorLocation);
    }

    throw new Error(`Unrecognized token at ${this.cursorLocation.line}:${this.cursorLocation.column}`);
  }

  private skipWhitespace() {
    while (this.currentChar.isWhitespace()) {
      if (this.currentChar.isNewline()) {
        this.cursorLocation.line++;
        this.cursorLocation.column = 1;
      }

      this.advance();
    }
  }
}
