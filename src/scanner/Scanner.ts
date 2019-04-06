import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";
import { Character } from "./Character";
import { KEYWORDS } from "./Keywords";
import { PUNCTUATION } from "./Punctuation";

const CHARACTERS_LOOKAHEAD = 4;

export class Scanner {
  public location: { line: number, column: number };
  private source: string;
  private index: number;
  private char: Character;
  constructor(source: string) {
    this.source = source;
    this.index = 0;
    this.char = Character.from(this.source[this.index]);
    this.location = { line: 1, column: 1 };
  }

  public next(): Token {
    while (this.char.isWhitespace()) {
      this.whitespace();
      this.comment();
    }

    if (this.char.isAlpha()) {
      return this.identifierOrKeyword();
    } else if (this.char.isDigit()) {
      return this.numericLiteral();
    } else if (this.char.isSomeOf(["'", '"'])) {
      return this.stringLiteral();
    } else if (this.char.isEOF()) {
      return new Token(TokenType.EOF, "EOF");
    } else {
      for (let i = CHARACTERS_LOOKAHEAD; i > 0; i--) {
        const lookahead = this.slice(i);
        const token = PUNCTUATION.get(lookahead);
        if (token) {
          this.advance(lookahead.length);
          return token;
        }
      }

      throw new Error(`Unrecognized character ${this.char} at ${this.location.line}:${this.location.column}`);
    }
  }

  /**
   * Advances the cursor in the source code.
   *
   * @param shift How many characters to advance
   */
  private advance(shift: number = 1): Scanner {
    this.index += shift;
    this.location.column += shift;
    this.char = Character.from(this.source[this.index]);

    return this;
  }

  /**
   * Peeks up a character specified by shift argument, starting from current position.
   * This method does not modify the state of the cursor.
   *
   * @param shift How many characters to skip before peeking
   */
  private peek(shift: number = 1): Character {
    return Character.from(this.source[this.index + shift]);
  }

  /**
   * Takes a substring of required length, starting from the current position.
   *
   * @param length How many characters to slice from current position
   */
  private slice(length: number = 1): string {
    return this.source.slice(this.index, this.index + length);
  }

  private incrementLineLocation(): void {
    this.location.line++;
    this.location.column = 0;
  }

  private whitespace(): void {
    while (this.char.isWhitespace()) {
      if (this.char.isLineTerminator()) {
        this.incrementLineLocation();
      }

      this.advance();
    }
  }

  private comment(): Scanner {
    this.multiLineComment();
    this.singleLineComment();

    return this;
  }

  private multiLineComment(): Scanner {
    if (this.char.is("/") && this.peek().is("*")) {
      this.advance(2);

      while (!(this.char.is("*") && this.peek().is("/"))) {
        if (this.char.isEOF()) {
          throw new Error(`Expected */ at ${this.location.line}:${this.location.column}`);
        }

        if (this.char.isLineTerminator()) {
          this.incrementLineLocation();
        }

        this.advance();
      }

      this.advance(2);
    }

    return this;
  }

  private singleLineComment(): Scanner {
    if (this.char.is("/") && this.peek().is("/")) {
      this.advance(2);

      while (!(this.char.isLineTerminator() || this.char.isEOF())) {
        this.advance();

        if (this.char.isLineTerminator()) {
          this.incrementLineLocation();
        }
      }

      this.advance();
    }

    return this;
  }

  private numericLiteral(): Token {
    if (this.char.is("0") && this.peek().isSomeOf(["x", "X"]) && this.peek(2).isHexDigit()) {
      return this.hexadecimalIntegerLiteral();
    } else if (this.char.is("0") && this.peek().isSomeOf(["o", "O"]) && this.peek(2).isOctalDigit()) {
      return this.octalIntegerLiteral();
    } else if (this.char.is("0") && this.peek().isSomeOf(["b", "B"]) && this.peek(2).isBinaryDigit()) {
      return this.binaryIntegerLiteral();
    } else {
      return this.decimalLiteral();
    }
  }

  private decimalLiteral(): Token {
    let buffer: string = "";

    while (this.char.isDigit()) {
      buffer += this.char;
      this.advance();
    }

    if (this.char.is(".") && this.peek().isDigit()) {
      buffer += this.char;
      this.advance();

      while (this.char.isDigit()) {
        buffer += this.char;
        this.advance();
      }
    }

    return new Token(TokenType.DECIMAL_LITERAL, buffer);
  }

  private hexadecimalIntegerLiteral(): Token {
    let buffer: string = "0x";
    this.advance(2);

    while (this.char.isHexDigit()) {
      buffer += this.char;
      this.advance();
    }

    return new Token(TokenType.HEXADECIMAL_LITERAL, buffer);
  }

  private octalIntegerLiteral(): Token {
    let buffer: string = "0o";
    this.advance(2);

    while (this.char.isOctalDigit()) {
      buffer += this.char;
      this.advance();
    }

    return new Token(TokenType.OCTAL_LITERAL, buffer);
  }

  private binaryIntegerLiteral(): Token {
    let buffer: string = "0b";
    this.advance(2);

    while (this.char.isBinaryDigit()) {
      buffer += this.char;
      this.advance();
    }

    return new Token(TokenType.BINARY_LITERAL, buffer);
  }

  private stringLiteral(): Token {
    let buffer: string = "";

    const quoteType: string = this.char.toString();
    this.advance();

    while (!this.char.is(quoteType)) {
      if (this.char.isLineTerminator() || this.char.isEOF()) {
        throw new Error(`Unterminated string literal at ${this.location.line}:${this.location.column}`);
      }

      buffer += this.char;
      this.advance();
    }

    this.advance();
    return new Token(TokenType.STRING_LITERAL, buffer);
  }

  private identifierOrKeyword(): Token {
    let buffer: string = "";

    while (this.char.isAlphaNumeric()) {
      buffer += this.char;
      this.advance();
    }

    return KEYWORDS.get(buffer) || new Token(TokenType.IDENTIFIER, buffer);
  }
}
