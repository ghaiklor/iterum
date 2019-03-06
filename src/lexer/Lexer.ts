import { Token } from "../token/Token";
import { TokenLocation } from "../token/TokenLocation";
import { TokenType } from "../token/TokenType";
import { Character } from "./Character";

export class Lexer {
  private sourceCode: string;
  private cursorPosition: number;
  private currentChar: Character;
  private tokenLocation: TokenLocation;
  constructor(source: string) {
    this.sourceCode = source;
    this.cursorPosition = 0;
    this.currentChar = Character.from(this.sourceCode[this.cursorPosition]);
    this.tokenLocation = TokenLocation.from(1, 1);
  }

  /**
   * Iterates over the source code and returns token one at a time.
   */
  public next(): Token {
    while (this.currentChar.isWhitespace()) {
      this.skipWhitespace();
      this.skipComments();
    }

    if (this.currentChar.isAlpha()) {
      return this.identifierOrKeyword();
    } else if (this.currentChar.isDigit() || (this.currentChar.is("-") && this.peek().isDigit())) {
      return this.numericLiteral();
    } else if (this.currentChar.is('"')) {
      return this.stringLiteral('"');
    } else if (this.currentChar.is("'")) {
      return this.stringLiteral("'");
    } else if (this.currentChar.is("=") && this.peek().is("=") && this.peek(2).is("=")) {
      this.advance(3);
      return this.createToken(TokenType.STRICT_EQUAL, "===");
    } else if (this.currentChar.is("!") && this.peek().is("=") && this.peek(2).is("=")) {
      this.advance(3);
      return this.createToken(TokenType.NOT_STRICT_EQUAL, "!==");
    } else if (this.currentChar.is("+") && this.peek().is("+")) {
      this.advance(2);
      return this.createToken(TokenType.INCREMENT, "++");
    } else if (this.currentChar.is("-") && this.peek().is("-")) {
      this.advance(2);
      return this.createToken(TokenType.DECREMENT, "--");
    } else if (this.currentChar.is("&") && this.peek().is("&")) {
      this.advance(2);
      return this.createToken(TokenType.AND, "&&");
    } else if (this.currentChar.is("=") && this.peek().is("=")) {
      this.advance(2);
      return this.createToken(TokenType.EQUAL, "==");
    } else if (this.currentChar.is(">") && this.peek().is("=")) {
      this.advance(2);
      return this.createToken(TokenType.GREATER_THAN_OR_EQUAL, ">=");
    } else if (this.currentChar.is("<") && this.peek().is("=")) {
      this.advance(2);
      return this.createToken(TokenType.LESS_THAN_OR_EQUAL, "<=");
    } else if (this.currentChar.is("!") && this.peek().is("=")) {
      this.advance(2);
      return this.createToken(TokenType.NOT_EQUAL, "!=");
    } else if (this.currentChar.is("|") && this.peek().is("|")) {
      this.advance(2);
      return this.createToken(TokenType.OR, "||");
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
    } else if (this.currentChar.is("%")) {
      this.advance();
      return this.createToken(TokenType.PERCENT, "%");
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
    } else if (this.currentChar.is("[")) {
      this.advance();
      return this.createToken(TokenType.LEFT_SQUARE_BRACKETS, "[");
    } else if (this.currentChar.is("]")) {
      this.advance();
      return this.createToken(TokenType.RIGHT_SQUARE_BRACKETS, "]");
    } else if (this.currentChar.is("!")) {
      this.advance();
      return this.createToken(TokenType.EXCLAMATION_MARK, "!");
    } else if (this.currentChar.is("~")) {
      this.advance();
      return this.createToken(TokenType.TILDE, "~");
    } else if (this.currentChar.is(".")) {
      this.advance();
      return this.createToken(TokenType.DOT, ".");
    } else if (this.currentChar.is(";")) {
      this.advance();
      return this.createToken(TokenType.SEMICOLON, ";");
    } else if (this.currentChar.is(">")) {
      this.advance();
      return this.createToken(TokenType.GREATER_THAN, ">");
    } else if (this.currentChar.is("<")) {
      this.advance();
      return this.createToken(TokenType.LESS_THAN, "<");
    } else if (this.currentChar.isEOF()) {
      return this.createToken(TokenType.EOF, "EOF");
    }

    throw new Error(`Unrecognized character ${this.currentChar} at ${this.tokenLocation}`);
  }

  /**
   * Advances the cursor in the source code.
   *
   * @param shift How many characters to advance
   */
  private advance(shift: number = 1): Lexer {
    this.cursorPosition += shift;
    this.tokenLocation.column += shift;
    this.currentChar = Character.from(this.sourceCode[this.cursorPosition]);

    return this;
  }

  /**
   * Peeks up a character specified by shift argument, starting from current position.
   * This method does not modify the state of the cursor.
   *
   * @param shift How many characters to skip before peeking
   */
  private peek(shift: number = 1): Character {
    return Character.from(this.sourceCode[this.cursorPosition + shift]);
  }

  /**
   * Creates new instance of a token.
   * Same as new Token(), but it does not require location of a token.
   *
   * @param tokenType Type of the token to create
   * @param code Part of the source code that is related to token
   */
  private createToken(tokenType: TokenType, code: string): Token {
    return new Token(tokenType, code, this.tokenLocation);
  }

  private incrementLineLocation(): void {
    this.tokenLocation.line++;
    this.tokenLocation.column = 0;
  }

  private skipWhitespace(): void {
    while (this.currentChar.isWhitespace()) {
      if (this.currentChar.isLineTerminator()) {
        this.incrementLineLocation();
      }

      this.advance();
    }
  }

  private skipComments(): void {
    if (this.currentChar.is("/") && this.peek().is("*")) {
      this.advance(2);

      while (!(this.currentChar.is("*") && this.peek().is("/"))) {
        if (this.currentChar.isEOF()) {
          throw new Error(`Expected */ at ${this.tokenLocation}`);
        }

        if (this.currentChar.isLineTerminator()) {
          this.incrementLineLocation();
        }

        this.advance();
      }

      this.advance(2);
      return;
    }

    if (this.currentChar.is("/") && this.peek().is("/")) {
      this.advance(2);

      while (!(this.currentChar.isLineTerminator() || this.currentChar.isEOF())) {
        this.advance();

        if (this.currentChar.isLineTerminator()) {
          this.incrementLineLocation();
        }
      }

      this.advance();
      return;
    }
  }

  private numericLiteral(): Token {
    let buffer: string = "";

    buffer += this.currentChar;
    this.advance();

    while (this.currentChar.isDigit()) {
      buffer += this.currentChar;
      this.advance();
    }

    if (this.currentChar.is(".") && this.peek().isDigit()) {
      buffer += this.currentChar;
      this.advance();

      while (this.currentChar.isDigit()) {
        buffer += this.currentChar;
        this.advance();
      }
    }

    return this.createToken(TokenType.NUMBER_LITERAL, buffer);
  }

  private stringLiteral(quoteType: string): Token {
    let buffer: string = "";
    this.advance();

    while (!this.currentChar.is(quoteType)) {
      buffer += this.currentChar;
      this.advance();
    }

    this.advance();
    return this.createToken(TokenType.STRING_LITERAL, buffer);
  }

  private identifierOrKeyword(): Token {
    const KEYWORDS: Record<string, () => Token> = {
      async: this.createToken.bind(this, TokenType.ASYNC, "async"),
      await: this.createToken.bind(this, TokenType.AWAIT, "await"),
      break: this.createToken.bind(this, TokenType.BREAK, "break"),
      case: this.createToken.bind(this, TokenType.CASE, "case"),
      catch: this.createToken.bind(this, TokenType.CATCH, "catch"),
      class: this.createToken.bind(this, TokenType.CLASS, "class"),
      const: this.createToken.bind(this, TokenType.CONST, "const"),
      continue: this.createToken.bind(this, TokenType.CONTINUE, "continue"),
      debugger: this.createToken.bind(this, TokenType.DEBUGGER, "debugger"),
      default: this.createToken.bind(this, TokenType.DEFAULT, "default"),
      delete: this.createToken.bind(this, TokenType.DELETE, "delete"),
      do: this.createToken.bind(this, TokenType.DO, "do"),
      else: this.createToken.bind(this, TokenType.ELSE, "else"),
      enum: this.createToken.bind(this, TokenType.ENUM, "enum"),
      export: this.createToken.bind(this, TokenType.EXPORT, "export"),
      extends: this.createToken.bind(this, TokenType.EXTENDS, "extends"),
      false: this.createToken.bind(this, TokenType.BOOLEAN_LITERAL, "false"),
      finally: this.createToken.bind(this, TokenType.FINALLY, "finally"),
      for: this.createToken.bind(this, TokenType.FOR, "for"),
      function: this.createToken.bind(this, TokenType.FUNCTION, "function"),
      if: this.createToken.bind(this, TokenType.IF, "if"),
      implements: this.createToken.bind(this, TokenType.IMPLEMENTS, "implements"),
      import: this.createToken.bind(this, TokenType.IMPORT, "import"),
      in: this.createToken.bind(this, TokenType.IN, "in"),
      instanceof: this.createToken.bind(this, TokenType.INSTANCE_OF, "instanceof"),
      interface: this.createToken.bind(this, TokenType.INTERFACE, "interface"),
      let: this.createToken.bind(this, TokenType.LET, "let"),
      new: this.createToken.bind(this, TokenType.NEW, "new"),
      null: this.createToken.bind(this, TokenType.NULL_LITERAL, "null"),
      package: this.createToken.bind(this, TokenType.PACKAGE, "package"),
      private: this.createToken.bind(this, TokenType.PRIVATE, "private"),
      protected: this.createToken.bind(this, TokenType.PROTECTED, "protected"),
      public: this.createToken.bind(this, TokenType.PUBLIC, "public"),
      return: this.createToken.bind(this, TokenType.RETURN, "return"),
      super: this.createToken.bind(this, TokenType.SUPER, "super"),
      switch: this.createToken.bind(this, TokenType.SWITCH, "switch"),
      this: this.createToken.bind(this, TokenType.THIS, "this"),
      throw: this.createToken.bind(this, TokenType.THROW, "throw"),
      true: this.createToken.bind(this, TokenType.BOOLEAN_LITERAL, "true"),
      try: this.createToken.bind(this, TokenType.TRY, "try"),
      typeof: this.createToken.bind(this, TokenType.TYPE_OF, "typeof"),
      var: this.createToken.bind(this, TokenType.VAR, "var"),
      void: this.createToken.bind(this, TokenType.VOID, "void"),
      while: this.createToken.bind(this, TokenType.WHILE, "while"),
      with: this.createToken.bind(this, TokenType.WITH, "with"),
      yield: this.createToken.bind(this, TokenType.YIELD, "yield"),
    };

    let buffer: string = "";

    while (this.currentChar.isAlphaNumeric()) {
      buffer += this.currentChar;
      this.advance();
    }

    if (typeof KEYWORDS[buffer] === "function") {
      return KEYWORDS[buffer]();
    } else {
      return this.createToken(TokenType.IDENTIFIER, buffer);
    }
  }
}
