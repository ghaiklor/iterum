import { Scanner } from "../../src/scanner/Scanner";
import { Token } from "../../src/token/Token";
import { TokenType } from "../../src/token/TokenType";

describe("Iterum::Scanner", () => {
  it("Should properly tokenize mathematical symbols", () => {
    const source = "+ - * / %";
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.PLUS, lexeme: "+" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.MINUS, lexeme: "-" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.MULTIPLY, lexeme: "*" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DIVIDE, lexeme: "/" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.MODULUS, lexeme: "%" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize number literals", () => {
    const source = `2 2.52`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, lexeme: "2" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, lexeme: "2.52" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize hexadecimal literal", () => {
    const source = `0x19AF`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.HEXADECIMAL_LITERAL, lexeme: "0x19AF" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize octal literal", () => {
    const source = `0o07`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.OCTAL_LITERAL, lexeme: "0o07" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize binary literal", () => {
    const source = `0b101`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.BINARY_LITERAL, lexeme: "0b101" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize string literals", () => {
    const source = `
      let foo = 'bar';
      let bar = "foo";
    `;

    const scanner = new Scanner(source);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize string literals, ignoring single-line comments", () => {
    const source = `
      // Variable foo
      let foo = 'bar';

      let bar = "foo"; // Inline comment about variable bar
      // Random comment to check that let foo = 'bar' here is not tokenized
    `;

    const scanner = new Scanner(source);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
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

    const scanner = new Scanner(source);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly ignore single-line comment when no new line, but EOF instead", () => {
    const source = `let foo = 'bar'; // comment`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly skip comment in the start position of the source", () => {
    const source = `// Just a comment, but bug was there`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "", name: "end-of-file" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "", name: "end-of-file" } as Token);
  });

  it("Should properly recover from an error if multi-line comment with no closing block for it", () => {
    const source = `
      let foo = 'bar';
      /* not closed comment
    `;

    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.errors.map((error) => error.toString())).toMatchObject([
      "[4:5] LexicalError: Expected */",
    ]);
  });

  it("Should properly recover from an error if string literal does not have a closing quote", () => {
    const source = `"foo`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toBeNull();
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.errors.map((error) => error.toString())).toMatchObject([
      "[1:5] LexicalError: Unterminated string literal",
    ]);
  });

  it("Should properly tokenize logical operators", () => {
    const source = `&& == >= > < <= != || !`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.LOGICAL_AND, lexeme: "&&" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EQUAL, lexeme: "==" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.GREATER_THAN_OR_EQUAL, lexeme: ">=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.GREATER_THAN, lexeme: ">" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LESS_THAN, lexeme: "<" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LESS_THAN_OR_EQUAL, lexeme: "<=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.NOT_EQUAL, lexeme: "!=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LOGICAL_OR, lexeme: "||" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LOGICAL_NOT, lexeme: "!" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize boolean literals", () => {
    const source = `true false`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.BOOLEAN_LITERAL, lexeme: "true" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.BOOLEAN_LITERAL, lexeme: "false" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize null literal", () => {
    const source = `null`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.NULL_LITERAL, lexeme: "null" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize increment and decrement tokens", () => {
    const source = `foo++ bar--`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.PLUS_PLUS, lexeme: "++" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.MINUS_MINUS, lexeme: "--" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize public keyword", () => {
    const source = `public foo = null`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.PUBLIC, lexeme: "public" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.NULL_LITERAL, lexeme: "null" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize strict equality", () => {
    const source = `foo === true && bar !== false`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRICT_EQUAL, lexeme: "===" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.BOOLEAN_LITERAL, lexeme: "true" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LOGICAL_AND, lexeme: "&&" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.NOT_STRICT_EQUAL, lexeme: "!==" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.BOOLEAN_LITERAL, lexeme: "false" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize dot sign", () => {
    const source = `obj.foo = 2`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "obj" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DOT, lexeme: "." } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, lexeme: "2" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize logical expression", () => {
    const source = `
      if (a > 5) {
        print("Greater");
      } else {
        print("Lesser");
      }
    `;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.IF, lexeme: "if" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "a" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.GREATER_THAN, lexeme: ">" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, lexeme: "5" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, lexeme: "{" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.PRINT, lexeme: "print" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "Greater" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, lexeme: "}" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ELSE, lexeme: "else" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, lexeme: "{" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.PRINT, lexeme: "print" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "Lesser" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, lexeme: "}" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize array declarator", () => {
    const source = `let a = [1, 2];`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "a" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_SQUARE_BRACKETS, lexeme: "[" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, lexeme: "1" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.COMMA, lexeme: "," } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, lexeme: "2" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_SQUARE_BRACKETS, lexeme: "]" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly tokenize some simple program", () => {
    const source = `
      function add(a, b) {
        return a + b;
      };

      let result = add(1, 2);
      print(result);
    `;

    const scanner = new Scanner(source);
    expect(scanner.scan()).toMatchObject({ type: TokenType.FUNCTION, lexeme: "function" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "add" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "a" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.COMMA, lexeme: "," } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "b" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, lexeme: "{" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RETURN, lexeme: "return" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "a" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.PLUS, lexeme: "+" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "b" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, lexeme: "}" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "result" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "add" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, lexeme: "1" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.COMMA, lexeme: "," } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, lexeme: "2" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.PRINT, lexeme: "print" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "result" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly recover from error if unrecognized character at multi-line code", () => {
    const source = `
      let foo = "bar";
      let bar § "foo";
    `;

    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "bar" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "bar" } as Token);
    expect(scanner.scan()).toBeNull();
    expect(scanner.scan()).toMatchObject({ type: TokenType.STRING_LITERAL, lexeme: "foo" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.errors.map((error) => error.toString())).toMatchObject([
      "[3:15] LexicalError: Unrecognized character §",
    ]);
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
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.FUNCTION, lexeme: "function" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "multiplyBy10" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "a" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, lexeme: "{" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RETURN, lexeme: "return" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "a" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.MULTIPLY, lexeme: "*" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, lexeme: "10" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, lexeme: "}" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.FUNCTION, lexeme: "function" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "divideBy5" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "a" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, lexeme: "{" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RETURN, lexeme: "return" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "a" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DIVIDE, lexeme: "/" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.DECIMAL_LITERAL, lexeme: "5" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, lexeme: "}" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "a" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "read" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LET, lexeme: "let" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "result" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.ASSIGN, lexeme: "=" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "divideBy5" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "multiplyBy10" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "a" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.PRINT, lexeme: "print" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, lexeme: "(" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "result" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, lexeme: ")" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.SEMICOLON, lexeme: ";" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly parse the identifier, which uses JS run-time property names", () => {
    const source = `constructor isPrototypeOf`;
    const scanner = new Scanner(source);

    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "constructor" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.IDENTIFIER, lexeme: "isPrototypeOf" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
    expect(scanner.scan()).toMatchObject({ type: TokenType.EOF, lexeme: "" } as Token);
  });

  it("Should properly report lexical errors", () => {
    const source = `§ "foo`;
    const scanner = new Scanner(source);

    expect(scanner.scanAll()).toMatchObject([
      { type: TokenType.EOF, lexeme: "" } as Token,
    ]);

    expect(scanner.errors.map((error) => error.toString())).toMatchObject([
      "[1:1] LexicalError: Unrecognized character §",
      "[1:7] LexicalError: Unterminated string literal",
    ]);
  });

  it("Should properly tokenize the source code, using the static method of scanner", () => {
    const source = `let a = 2;`;
    const { tokens, errors } = Scanner.tokenize(source);

    expect(errors).toMatchObject([]);
    expect(tokens).toMatchObject([
      { type: TokenType.LET, lexeme: "let", name: "let", location: { line: 1, column: 4 } } as Token,
      { type: TokenType.IDENTIFIER, lexeme: "a", name: "identifier", location: { line: 1, column: 6 } } as Token,
      { type: TokenType.ASSIGN, lexeme: "=", name: "=", location: { line: 1, column: 8 } } as Token,
      { type: TokenType.DECIMAL_LITERAL, lexeme: "2", name: "literal", location: { line: 1, column: 10 } } as Token,
      { type: TokenType.SEMICOLON, lexeme: ";", name: ";", location: { line: 1, column: 11 } } as Token,
      { type: TokenType.EOF, lexeme: "", name: "end-of-file", location: { line: 1, column: 11 } } as Token,
    ]);
  });
});
