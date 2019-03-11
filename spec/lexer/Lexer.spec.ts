import { Lexer } from "../../src/lexer/Lexer";
import { Token } from "../../src/token/Token";
import { TokenType } from "../../src/token/TokenType";

describe("Iterum::Lexer", () => {
  it("Should properly tokenize mathematical symbols", () => {
    const source = "+ - * / %";
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.PLUS, code: "+" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.MINUS, code: "-" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.MULTIPLY, code: "*" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DIVIDE, code: "/" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.MODULUS, code: "%" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize number literals", () => {
    const source = `2 2.52`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, code: "2" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, code: "2.52" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize hexadecimal literal", () => {
    const source = `0x19AF`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.HEXADECIMAL_LITERAL, code: "0x19AF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize octal literal", () => {
    const source = `0o07`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.OCTAL_LITERAL, code: "0o07" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize binary literal", () => {
    const source = `0b101`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.BINARY_LITERAL, code: "0b101" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize string literals", () => {
    const source = `
      let foo = 'bar';
      let bar = "foo";
    `;

    const lexer = new Lexer(source);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize string literals, ignoring single-line comments", () => {
    const source = `
      // Variable foo
      let foo = 'bar';

      let bar = "foo"; // Inline comment about variable bar
      // Random comment to check that let foo = 'bar' here is not tokenized
    `;

    const lexer = new Lexer(source);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize string literals, ignoring multi-line comments", () => {
    const source = `
      /**
       * @type {String}
       * @example
       * let foo = 'bar';
       */
      let foo = 'bar';

      let bar = "foo"; /* Inline multi-line comment about variable bar */
      /* Random comment to check that let foo = 'bar' here is not tokenized */
    `;

    const lexer = new Lexer(source);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly ignore single-line comment when no new line, but EOF instead", () => {
    const source = `let foo = 'bar'; // comment`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly throw an error if multi-line comment with no closing block for it", () => {
    const source = `
      let foo = 'bar';
      /* not closed comment
    `;

    const lexer = new Lexer(source);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next.bind(lexer)).toThrowError(`Expected */ at 4:5`);
  });

  it("Should properly throw an error if one-line string literal (double quote) does not have a closing quote", () => {
    const source = `"foo`;
    const lexer = new Lexer(source);

    expect(lexer.next.bind(lexer)).toThrowError("Unterminated string literal at 1:5");
  });

  it("Should properly throw an error if multi-line string literal (double quote) does not have a closing quote", () => {
    const source = `
      "foo
    `;
    const lexer = new Lexer(source);

    expect(lexer.next.bind(lexer)).toThrowError("Unterminated string literal at 2:11");
  });

  it("Should properly throw an error if one-line string literal (single quote) does not have a closing quote", () => {
    const source = `'foo`;
    const lexer = new Lexer(source);

    expect(lexer.next.bind(lexer)).toThrowError("Unterminated string literal at 1:5");
  });

  it("Should properly throw an error if multi-line string literal (single quote) does not have a closing quote", () => {
    const source = `
      'foo
    `;
    const lexer = new Lexer(source);

    expect(lexer.next.bind(lexer)).toThrowError("Unterminated string literal at 2:11");
  });

  it("Should properly tokenize logical operators", () => {
    const source = `&& == >= > < <= != || !`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.AND, code: "&&" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EQUAL, code: "==" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.GREATER_THAN_OR_EQUAL, code: ">=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.GREATER_THAN, code: ">" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LESS_THAN, code: "<" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LESS_THAN_OR_EQUAL, code: "<=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NOT_EQUAL, code: "!=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.OR, code: "||" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NOT, code: "!" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize boolean literals", () => {
    const source = `true false`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.BOOLEAN_LITERAL, code: "true" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.BOOLEAN_LITERAL, code: "false" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize null literal", () => {
    const source = `null`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.NULL_LITERAL, code: "null" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize increment and decrement tokens", () => {
    const source = `foo++ bar--`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.PLUS_PLUS, code: "++" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.MINUS_MINUS, code: "--" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize public keyword", () => {
    const source = `public foo = null`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.PUBLIC, code: "public" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NULL_LITERAL, code: "null" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize strict equality", () => {
    const source = `foo === true && bar !== false`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRICT_EQUAL, code: "===" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.BOOLEAN_LITERAL, code: "true" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.AND, code: "&&" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NOT_STRICT_EQUAL, code: "!==" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.BOOLEAN_LITERAL, code: "false" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize dot sign", () => {
    const source = `obj.foo = 2`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "obj" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DOT, code: "." } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, code: "2" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize logical expression", () => {
    const source = `
      if (a > 5) {
        print("Greater");
      } else {
        print("Lesser");
      }
    `;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.IF, code: "if" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.GREATER_THAN, code: ">" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, code: "5" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, code: "{" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "print" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "Greater" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, code: "}" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ELSE, code: "else" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, code: "{" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "print" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "Lesser" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, code: "}" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize array declarator", () => {
    const source = `let a = [1, 2];`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_SQUARE_BRACKETS, code: "[" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, code: "1" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.COMMA, code: "," } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, code: "2" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_SQUARE_BRACKETS, code: "]" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize some simple program", () => {
    const source = `
      function add(a, b) {
        return a + b;
      };

      let result = add(1, 2);
      print(result);
    `;

    const lexer = new Lexer(source);
    expect(lexer.next()).toMatchObject({ type: TokenType.FUNCTION, code: "function" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "add" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.COMMA, code: "," } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "b" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, code: "{" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RETURN, code: "return" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.PLUS, code: "+" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "b" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, code: "}" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "result" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "add" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, code: "1" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.COMMA, code: "," } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, code: "2" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "print" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "result" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly throw an error if unrecognized character", () => {
    const source = `let foo § bar`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next.bind(lexer)).toThrowError("Unrecognized character § at 1:9");
  });

  it("Should properly throw an error if unrecognized character at multi-line code", () => {
    const source = `
      let foo = "bar";
      let bar § "foo";
    `;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "bar" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "bar" } as Token);
    expect(lexer.next.bind(lexer)).toThrowError("Unrecognized character § at 3:15");
  });

  it("Should properly tokenize a program with read/print calls", () => {
    const source = `
      function multiplyBy10(a) {
        return a * 10;
      }

      function divideBy5(a) {
        return a / 5;
      }

      let a = read();
      let result = divideBy5(multiplyBy10(a));
      print(result);
    `;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.FUNCTION, code: "function" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "multiplyBy10" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, code: "{" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RETURN, code: "return" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.MULTIPLY, code: "*" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, code: "10" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, code: "}" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.FUNCTION, code: "function" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "divideBy5" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, code: "{" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RETURN, code: "return" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DIVIDE, code: "/" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, code: "5" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, code: "}" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "read" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "result" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "divideBy5" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "multiplyBy10" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "print" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "result" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });
});
