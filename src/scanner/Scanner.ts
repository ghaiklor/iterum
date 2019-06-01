import { ErrorCode } from "../errors/ErrorCode";
import { LexicalError } from "../errors/LexicalError";
import { ITokenLocation, Token } from "../token/Token";
import { TokenType } from "../token/TokenType";
import { Character } from "./Character";
import { KEYWORDS } from "./Keywords";
import { PUNCTUATION } from "./Punctuation";

const CHARACTERS_LOOKAHEAD = 4;

export class Scanner {
  public static tokenize(source: string): { tokens: Token[], errors: LexicalError[] } {
    const scanner = new Scanner(source);
    const tokens = scanner.scanAll();
    const errors = scanner.errors;

    return { tokens, errors };
  }

  public errors: LexicalError[] = [];
  private source: string;
  private offset: number;
  private char: Character;
  private location: ITokenLocation;
  private tokens: Token[] = [];
  constructor(source: string) {
    this.source = source;
    this.offset = 0;
    this.char = Character.from(this.source[this.offset]);
    this.location = { line: 1, column: 1 } as ITokenLocation;
  }

  public scan(): Token | null {
    while (
      (this.char.isWhitespace()) ||
      (this.char.is("/") && this.peek().is("/")) ||
      (this.char.is("/") && this.peek().is("*"))
    ) {
      this.whitespace();
      this.comment();
    }

    if (this.char.isAlpha()) {
      return this.identifierOrKeyword();
    } else if (this.char.isDigit()) {
      return this.numericLiteral();
    } else if (this.char.isSomeOf(["'", '"'])) {
      return this.stringLiteral();
    } else if (this.isEOF()) {
      return this.createToken(TokenType.EOF, "");
    } else {
      for (let offset = CHARACTERS_LOOKAHEAD; offset > 0; offset--) {
        const slice = this.slice(offset);
        const tokenType = PUNCTUATION.get(slice);
        if (tokenType !== undefined) {
          this.advance(slice.length);
          return this.createToken(tokenType, slice);
        }
      }

      this.recoverableError(ErrorCode.UNRECOGNIZED_CHARACTER, this.char.toString());
      this.advance();

      return null;
    }
  }

  public scanAll(): Token[] {
    while (!this.isEOF()) {
      const token = this.scan();
      if (token !== null) {
        this.tokens.push(token);
      }
    }

    this.tokens.push(this.createToken(TokenType.EOF, ""));
    return this.tokens;
  }

  private advance(offset: number = 1): null {
    this.offset += offset;
    this.location.column += offset;
    this.char = Character.from(this.source[this.offset]);

    return null;
  }

  private peek(offset: number = 1): Character {
    return Character.from(this.source[this.offset + offset]);
  }

  private slice(offset: number): string {
    return this.source.slice(this.offset, this.offset + offset);
  }

  private createToken(type: TokenType, lexeme: string): Token {
    return new Token(type, lexeme, this.location);
  }

  private recoverableError(code: ErrorCode, ...args: string[]): null {
    this.errors.push(new LexicalError(code, this.location, ...args));
    return null;
  }

  private isEOF(): boolean {
    return this.offset >= this.source.length;
  }

  private incrementLineLocation(): null {
    this.location.line++;
    this.location.column = 0;

    return null;
  }

  private whitespace(): null {
    while (this.char.isWhitespace()) {
      if (this.char.isLineFeed()) {
        this.incrementLineLocation();
      }

      this.advance();
    }

    return null;
  }

  private comment(): null {
    this.multiLineComment();
    this.singleLineComment();

    return null;
  }

  private multiLineComment(): null {
    if (this.char.is("/") && this.peek().is("*")) {
      this.advance(2);

      while (!(this.char.is("*") && this.peek().is("/"))) {
        if (this.isEOF()) {
          this.recoverableError(ErrorCode.EXPECTED, "*/");
          return null;
        }

        if (this.char.isLineFeed()) {
          this.incrementLineLocation();
        }

        this.advance();
      }

      this.advance(2);
    }

    return null;
  }

  private singleLineComment(): null {
    if (this.char.is("/") && this.peek().is("/")) {
      this.advance(2);

      while (!(this.char.isLineFeed() || this.isEOF())) {
        this.advance();

        if (this.char.isLineFeed()) {
          this.incrementLineLocation();
        }
      }

      this.advance();
    }

    return null;
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
    let buffer = "";

    while (this.char.isDigit()) {
      buffer += this.char.toString();
      this.advance();
    }

    if (this.char.is(".") && this.peek().isDigit()) {
      buffer += this.char.toString();
      this.advance();

      while (this.char.isDigit()) {
        buffer += this.char.toString();
        this.advance();
      }
    }

    return this.createToken(TokenType.DECIMAL_LITERAL, buffer);
  }

  private hexadecimalIntegerLiteral(): Token {
    let buffer = "0x";
    this.advance(2);

    while (this.char.isHexDigit()) {
      buffer += this.char.toString();
      this.advance();
    }

    return this.createToken(TokenType.HEXADECIMAL_LITERAL, buffer);
  }

  private octalIntegerLiteral(): Token {
    let buffer = "0o";
    this.advance(2);

    while (this.char.isOctalDigit()) {
      buffer += this.char.toString();
      this.advance();
    }

    return this.createToken(TokenType.OCTAL_LITERAL, buffer);
  }

  private binaryIntegerLiteral(): Token {
    let buffer = "0b";
    this.advance(2);

    while (this.char.isBinaryDigit()) {
      buffer += this.char.toString();
      this.advance();
    }

    return this.createToken(TokenType.BINARY_LITERAL, buffer);
  }

  private stringLiteral(): Token | null {
    const quoteType = this.char.code;
    let buffer = "";

    this.advance();
    while (this.char.isNot(quoteType)) {
      if (this.char.isLineFeed() || this.isEOF()) {
        this.recoverableError(ErrorCode.UNTERMINATED_STRING_LITERAL);
        this.advance();
        return null;
      }

      buffer += this.char.toString();
      this.advance();
    }

    this.advance();
    return this.createToken(TokenType.STRING_LITERAL, buffer);
  }

  private identifierOrKeyword(): Token {
    let buffer = "";

    while (this.char.isAlphaNumeric()) {
      buffer += this.char.toString();
      this.advance();
    }

    let tokenType = KEYWORDS.get(buffer);
    if (tokenType === undefined) {
      tokenType = TokenType.IDENTIFIER;
    }

    return this.createToken(tokenType, buffer);
  }
}
