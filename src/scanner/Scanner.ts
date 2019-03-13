import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";
import { Character } from "./Character";

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
      this.skipWhitespace();
      this.skipComments();
    }

    if (this.char.isAlpha()) {
      return this.identifierOrKeyword();
    } else if (this.char.is("0") && this.peek().isSomeOf(["x", "X"]) && this.peek(2).isHexDigit()) {
      return this.hexadecimalLiteral();
    } else if (this.char.is("0") && this.peek().isSomeOf(["o", "O"]) && this.peek(2).isOctalDigit()) {
      return this.octalLiteral();
    } else if (this.char.is("0") && this.peek().isSomeOf(["b", "B"]) && this.peek(2).isBinaryDigit()) {
      return this.binaryLiteral();
    } else if (this.char.isDigit()) {
      return this.decimalLiteral();
    } else if (this.char.is('"')) {
      return this.stringLiteral('"');
    } else if (this.char.is("'")) {
      return this.stringLiteral("'");
    } else if (Scanner.PUNCTUATION[this.slice(4)]) {
      const token = Scanner.PUNCTUATION[this.slice(4)];
      this.advance(this.slice(4).length);
      return token;
    } else if (Scanner.PUNCTUATION[this.slice(3)]) {
      const token = Scanner.PUNCTUATION[this.slice(3)];
      this.advance(this.slice(3).length);
      return token;
    } else if (Scanner.PUNCTUATION[this.slice(2)]) {
      const token = Scanner.PUNCTUATION[this.slice(2)];
      this.advance(this.slice(2).length);
      return token;
    } else if (Scanner.PUNCTUATION[this.slice()]) {
      const token = Scanner.PUNCTUATION[this.slice()];
      this.advance();
      return token;
    } else if (this.char.isEOF()) {
      return new Token(TokenType.EOF, "EOF");
    }

    throw new Error(`Unrecognized character ${this.char} at ${this.location.line}:${this.location.column}`);
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

  private skipWhitespace(): void {
    while (this.char.isWhitespace()) {
      if (this.char.isLineTerminator()) {
        this.incrementLineLocation();
      }

      this.advance();
    }
  }

  private skipComments(): void {
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
      return;
    }

    if (this.char.is("/") && this.peek().is("/")) {
      this.advance(2);

      while (!(this.char.isLineTerminator() || this.char.isEOF())) {
        this.advance();

        if (this.char.isLineTerminator()) {
          this.incrementLineLocation();
        }
      }

      this.advance();
      return;
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

  private hexadecimalLiteral(): Token {
    let buffer: string = "0x";
    this.advance(2);

    while (this.char.isHexDigit()) {
      buffer += this.char;
      this.advance();
    }

    return new Token(TokenType.HEXADECIMAL_LITERAL, buffer);
  }

  private octalLiteral(): Token {
    let buffer: string = "0o";
    this.advance(2);

    while (this.char.isOctalDigit()) {
      buffer += this.char;
      this.advance();
    }

    return new Token(TokenType.OCTAL_LITERAL, buffer);
  }

  private binaryLiteral(): Token {
    let buffer: string = "0b";
    this.advance(2);

    while (this.char.isBinaryDigit()) {
      buffer += this.char;
      this.advance();
    }

    return new Token(TokenType.BINARY_LITERAL, buffer);
  }

  private stringLiteral(quoteType: string): Token {
    let buffer: string = "";
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

    return Scanner.KEYWORDS[buffer] || new Token(TokenType.IDENTIFIER, buffer);
  }

  static get PUNCTUATION(): Record<string, Token> {
    return {
      "!": new Token(TokenType.NOT, "!"),
      "!=": new Token(TokenType.NOT_EQUAL, "!="),
      "!==": new Token(TokenType.NOT_STRICT_EQUAL, "!=="),
      "%": new Token(TokenType.MODULUS, "%"),
      "%=": new Token(TokenType.MODULUS_ASSIGN, "%="),
      "&": new Token(TokenType.BITWISE_AND, "&"),
      "&&": new Token(TokenType.AND, "&&"),
      "&=": new Token(TokenType.BITWISE_AND_ASSIGN, "&="),
      "(": new Token(TokenType.LEFT_PARENTHESIS, "("),
      ")": new Token(TokenType.RIGHT_PARENTHESIS, ")"),
      "*": new Token(TokenType.MULTIPLY, "*"),
      "*=": new Token(TokenType.MULTIPLY_ASSIGN, "*="),
      "+": new Token(TokenType.PLUS, "+"),
      "++": new Token(TokenType.PLUS_PLUS, "++"),
      "+=": new Token(TokenType.PLUS_ASSIGN, "+="),
      ",": new Token(TokenType.COMMA, ","),
      "-": new Token(TokenType.MINUS, "-"),
      "--": new Token(TokenType.MINUS_MINUS, "--"),
      "-=": new Token(TokenType.MINUS_ASSIGN, "-="),
      ".": new Token(TokenType.DOT, "."),
      "...": new Token(TokenType.ELLIPSIS, "..."),
      "/": new Token(TokenType.DIVIDE, "/"),
      "/=": new Token(TokenType.DIVIDE_ASSIGN, "/="),
      ":": new Token(TokenType.COLON, ":"),
      ";": new Token(TokenType.SEMICOLON, ";"),
      "<": new Token(TokenType.LESS_THAN, "<"),
      "<<": new Token(TokenType.BITWISE_LEFT_SHIFT, "<<"),
      "<<=": new Token(TokenType.BITWISE_LEFT_SHIFT_ASSIGN, "<<="),
      "<=": new Token(TokenType.LESS_THAN_OR_EQUAL, "<="),
      "=": new Token(TokenType.ASSIGN, "="),
      "==": new Token(TokenType.EQUAL, "=="),
      "===": new Token(TokenType.STRICT_EQUAL, "==="),
      "=>": new Token(TokenType.ARROW, "=>"),
      ">": new Token(TokenType.GREATER_THAN, ">"),
      ">=": new Token(TokenType.GREATER_THAN_OR_EQUAL, ">="),
      ">>": new Token(TokenType.BITWISE_RIGHT_SHIFT, ">>"),
      ">>=": new Token(TokenType.BITWISE_RIGHT_SHIFT_ASSIGN, ">>="),
      ">>>": new Token(TokenType.BITWISE_RIGHT_SHIFT_ZERO, ">>>"),
      ">>>=": new Token(TokenType.BITWISE_RIGHT_SHIFT_ZERO_ASSIGN, ">>>="),
      "?": new Token(TokenType.QUESTION_MARK, "?"),
      "[": new Token(TokenType.LEFT_SQUARE_BRACKETS, "["),
      "]": new Token(TokenType.RIGHT_SQUARE_BRACKETS, "]"),
      "^": new Token(TokenType.BITWISE_XOR, "^"),
      "^=": new Token(TokenType.BITWISE_XOR_ASSIGN, "^="),
      "{": new Token(TokenType.LEFT_CURLY_BRACES, "{"),
      "|": new Token(TokenType.BITWISE_OR, "|"),
      "|=": new Token(TokenType.BITWISE_OR_ASSIGN, "|="),
      "||": new Token(TokenType.OR, "||"),
      "}": new Token(TokenType.RIGHT_CURLY_BRACES, "}"),
      "~": new Token(TokenType.BITWISE_NOT, "~"),
    };
  }

  static get KEYWORDS(): Record<string, Token> {
    return {
      async: new Token(TokenType.ASYNC, "async"),
      await: new Token(TokenType.AWAIT, "await"),
      break: new Token(TokenType.BREAK, "break"),
      case: new Token(TokenType.CASE, "case"),
      catch: new Token(TokenType.CATCH, "catch"),
      class: new Token(TokenType.CLASS, "class"),
      const: new Token(TokenType.CONST, "const"),
      continue: new Token(TokenType.CONTINUE, "continue"),
      debugger: new Token(TokenType.DEBUGGER, "debugger"),
      default: new Token(TokenType.DEFAULT, "default"),
      delete: new Token(TokenType.DELETE, "delete"),
      do: new Token(TokenType.DO, "do"),
      else: new Token(TokenType.ELSE, "else"),
      enum: new Token(TokenType.ENUM, "enum"),
      export: new Token(TokenType.EXPORT, "export"),
      extends: new Token(TokenType.EXTENDS, "extends"),
      false: new Token(TokenType.BOOLEAN_LITERAL, "false"),
      finally: new Token(TokenType.FINALLY, "finally"),
      for: new Token(TokenType.FOR, "for"),
      function: new Token(TokenType.FUNCTION, "function"),
      get: new Token(TokenType.GET, "get"),
      if: new Token(TokenType.IF, "if"),
      implements: new Token(TokenType.IMPLEMENTS, "implements"),
      import: new Token(TokenType.IMPORT, "import"),
      in: new Token(TokenType.IN, "in"),
      instanceof: new Token(TokenType.INSTANCE_OF, "instanceof"),
      interface: new Token(TokenType.INTERFACE, "interface"),
      let: new Token(TokenType.LET, "let"),
      new: new Token(TokenType.NEW, "new"),
      null: new Token(TokenType.NULL_LITERAL, "null"),
      package: new Token(TokenType.PACKAGE, "package"),
      private: new Token(TokenType.PRIVATE, "private"),
      protected: new Token(TokenType.PROTECTED, "protected"),
      public: new Token(TokenType.PUBLIC, "public"),
      return: new Token(TokenType.RETURN, "return"),
      set: new Token(TokenType.SET, "set"),
      static: new Token(TokenType.STATIC, "static"),
      super: new Token(TokenType.SUPER, "super"),
      switch: new Token(TokenType.SWITCH, "switch"),
      this: new Token(TokenType.THIS, "this"),
      throw: new Token(TokenType.THROW, "throw"),
      true: new Token(TokenType.BOOLEAN_LITERAL, "true"),
      try: new Token(TokenType.TRY, "try"),
      typeof: new Token(TokenType.TYPE_OF, "typeof"),
      var: new Token(TokenType.VAR, "var"),
      void: new Token(TokenType.VOID, "void"),
      while: new Token(TokenType.WHILE, "while"),
      with: new Token(TokenType.WITH, "with"),
      yield: new Token(TokenType.YIELD, "yield"),
    };
  }
}