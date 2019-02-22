import { Lexer } from "../../src/lexer/Lexer";
import { IToken } from "../../src/token/IToken";
import { TokenType } from "../../src/token/TokenType";

describe("Iterum::Lexer", () => {
  it("Should properly peek the character without advancing the cursor", () => {
    const source = 'let foo = "bar"';
    const lexer = new Lexer(source);

    expect(lexer.cursorPosition).toEqual(0);
    expect(lexer.peek().char).toEqual("e");
    expect(lexer.cursorPosition).toEqual(0);
    expect(lexer.peek(5).char).toEqual("o");
    expect(lexer.cursorPosition).toEqual(0);
  });

  it("Should properly tokenize mathematical symbols", () => {
    const source = "+ - * /";
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.PLUS, code: "+" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.MINUS, code: "-" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASTERISK, code: "*" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.SLASH, code: "/" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as IToken);
  });

  it("Should properly tokenize number literals", () => {
    const source = `2 2.52`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "2" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "2.52" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as IToken);
  });

  it("Should properly tokenize string literals", () => {
    const source = `
      let foo = 'bar';
      let bar = "foo";
    `;

    const lexer = new Lexer(source);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "bar" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "bar" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "foo" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as IToken);
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
    expect(lexer.next()).toMatchObject({ type: TokenType.FUNCTION, code: "function" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "add" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.COMMA, code: "," } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "b" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_CURLY_BRACES, code: "{" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.RETURN, code: "return" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "a" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.PLUS, code: "+" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "b" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_CURLY_BRACES, code: "}" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "result" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "add" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "1" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.COMMA, code: "," } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.NUMBER_LITERAL, code: "2" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "print" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.LEFT_PARENTHESIS, code: "(" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "result" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.RIGHT_PARENTHESIS, code: ")" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.EOF, code: "EOF" } as IToken);
  });

  it("Should properly throw an error if unrecognized character", () => {
    const source = `let foo § bar`;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as IToken);
    expect(lexer.next.bind(lexer)).toThrowError("Unrecognized character § at 1:9");
  });

  it("Should properly throw an error if unrecognized character at multi-line code", () => {
    const source = `
      let foo = "bar";
      let bar § "foo";
    `;
    const lexer = new Lexer(source);

    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "foo" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.ASSIGN, code: "=" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.STRING_LITERAL, code: "bar" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.SEMICOLON, code: ";" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.LET, code: "let" } as IToken);
    expect(lexer.next()).toMatchObject({ type: TokenType.IDENTIFIER, code: "bar" } as IToken);
    expect(lexer.next.bind(lexer)).toThrowError("Unrecognized character § at 3:15");
  });
});
