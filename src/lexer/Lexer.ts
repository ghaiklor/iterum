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
    while (this.currentChar.isWhitespace()) {
      if (this.currentChar.isNewline()) {
        this.cursorLocation.line++;
        this.cursorLocation.column = 0;
      }

      this.advance();
    }

    if (this.currentChar.isDigit()) {
      let buffer: string = "";

      while (this.currentChar.isDigit()) {
        buffer += this.currentChar;
        this.advance();
      }

      return this.createToken(TokenType.NUMBER_LITERAL, buffer);
    } else if (this.currentChar.isAlpha()) {
      let buffer: string = "";

      while (this.currentChar.isAlphaNumeric()) {
        buffer += this.currentChar;
        this.advance();
      }

      if (buffer === "function") {
        return this.createToken(TokenType.FUNCTION, "function");
      }

      if (buffer === "return") {
        return this.createToken(TokenType.RETURN, "return");
      }

      return this.createToken(TokenType.IDENTIFIER, buffer);
    } else if (this.currentChar.is('"')) {
      let buffer: string = "";
      this.advance();

      while (!this.currentChar.is('"')) {
        buffer += this.currentChar;
        this.advance();
      }

      return this.createToken(TokenType.STRING_LITERAL, buffer);
    } else if (this.currentChar.is("'")) {
      let buffer: string = "";
      this.advance();

      while (!this.currentChar.is("'")) {
        buffer += this.currentChar;
        this.advance();
      }

      return this.createToken(TokenType.STRING_LITERAL, buffer);
    } else if (this.currentChar.is("*")) {
      this.advance();
      return this.createToken(TokenType.ASTERISK, "*");
    } else if (this.currentChar.is("+")) {
      this.advance();
      return this.createToken(TokenType.PLUS, "+");
    } else if (this.currentChar.is("-")) {
      this.advance();
      return this.createToken(TokenType.MINUS, "-");
    } else if (this.currentChar.is("/")) {
      this.advance();
      return this.createToken(TokenType.SLASH, "/");
    } else if (this.currentChar.is("\\")) {
      this.advance();
      return this.createToken(TokenType.BACKSLASH, "\\");
    } else if (this.currentChar.is("=")) {
      this.advance();
      return this.createToken(TokenType.ASSIGN, "=");
    } else if (this.currentChar.is(",")) {
      this.advance();
      return this.createToken(TokenType.COMMA, ",");
    } else if (this.currentChar.is("(")) {
      this.advance();
      return this.createToken(TokenType.LEFT_PARENTHESIS, "(");
    } else if (this.currentChar.is(")")) {
      this.advance();
      return this.createToken(TokenType.RIGHT_PARENTHESIS, ")");
    } else if (this.currentChar.is("{")) {
      this.advance();
      return this.createToken(TokenType.LEFT_CURLY_BRACES, "{");
    } else if (this.currentChar.is("}")) {
      this.advance();
      return this.createToken(TokenType.RIGHT_CURLY_BRACES, "}");
    } else if (this.currentChar.is(":")) {
      this.advance();
      return this.createToken(TokenType.COLON, ":");
    } else if (this.currentChar.is(";")) {
      this.advance();
      return this.createToken(TokenType.SEMICOLON, ";");
    } else if (this.currentChar.isEOF()) {
      return this.createToken(TokenType.EOF, "EOF");
    }

    throw new Error(`Unrecognized character ${this.currentChar} at ${this.cursorLocation}`);
  }
}
