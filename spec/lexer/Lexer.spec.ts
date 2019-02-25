import { Lexer } from "../../src/lexer/Lexer";
import { Token } from "../../src/token/Token";
import { TokenType } from "../../src/token/TokenType";

describe("Iterum::Lexer", () => {
  it("Should properly peek the character without advancing the cursor", () => {
    const source = 'let foo = "bar"';
    const lexer = new Lexer(source);

    expect(lexer.peek().is("e")).toBeTruthy();
    expect(lexer.peek(5).is("o")).toBeTruthy();
  });

  it("Should properly tokenize mathematical symbols", () => {
    const source = "+ - * /";
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.PLUS, code: "+" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.MINUS, code: "-" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASTERISK, code: "*" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.SLASH, code: "/" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as Token);
  });

  it("Should properly tokenize number literals", () => {
    const source = `2 2.52 -15 -10.5`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "2" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "2.52" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "-15" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "-10.5" } as Token);
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

  it("Should properly tokenize logical operators", () => {
    const source = `&& == >= > < <= != ||`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.AND, code: "&&" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.EQUAL, code: "==" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.GREATER_THAN_OR_EQUAL, code: ">=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.GREATER_THAN, code: ">" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LESS_THAN, code: "<" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.LESS_THAN_OR_EQUAL, code: "<=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NOT_EQUAL, code: "!=" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.OR, code: "||" } as Token);
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
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "5" } as Token);
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
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "1" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.COMMA, code: "," } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "2" } as Token);
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
    expect(lexer.next()).toMatchObject({ type: TokenType.ASTERISK, code: "*" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "10" } as Token);
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
    expect(lexer.next()).toMatchObject({ type: TokenType.SLASH, code: "/" } as Token);
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "5" } as Token);
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
