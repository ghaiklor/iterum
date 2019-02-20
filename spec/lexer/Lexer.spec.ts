import { Lexer } from "../../src/lexer/Lexer";
import { TokenType } from "../../src/token/TokenType";

describe("Iterum::Lexer", () => {
  test("Should properly tokenize mathematical expression", () => {
    const source = "+ - * /";
    const lexer = new Lexer(source);

    expect(lexer.next().toString()).toEqual("Token(PLUS, +, 1:1)");
    expect(lexer.next().toString()).toEqual("Token(MINUS, -, 1:3)");
    expect(lexer.next().toString()).toEqual("Token(ASTERISK, *, 1:5)");
    expect(lexer.next().toString()).toEqual("Token(SLASH, /, 1:7)");
  });

  test("Should properly tokenize some simple program", () => {
    const source = `
      function add(a, b) {
        return a + b;
      };

      add(1, 2);
    `;

    const lexer = new Lexer(source);
    expect(lexer.next()).toHaveProperty("type", TokenType.FUNCTION);
    expect(lexer.next()).toHaveProperty("type", TokenType.IDENTIFIER);
    expect(lexer.next()).toHaveProperty("type", TokenType.LEFT_PARENTHESIS);
    expect(lexer.next()).toHaveProperty("type", TokenType.IDENTIFIER);
    expect(lexer.next()).toHaveProperty("type", TokenType.COMMA);
    expect(lexer.next()).toHaveProperty("type", TokenType.IDENTIFIER);
    expect(lexer.next()).toHaveProperty("type", TokenType.RIGHT_PARENTHESIS);
    expect(lexer.next()).toHaveProperty("type", TokenType.LEFT_CURLY_BRACES);
    expect(lexer.next()).toHaveProperty("type", TokenType.RETURN);
    expect(lexer.next()).toHaveProperty("type", TokenType.IDENTIFIER);
    expect(lexer.next()).toHaveProperty("type", TokenType.PLUS);
    expect(lexer.next()).toHaveProperty("type", TokenType.IDENTIFIER);
    expect(lexer.next()).toHaveProperty("type", TokenType.SEMICOLON);
    expect(lexer.next()).toHaveProperty("type", TokenType.RIGHT_CURLY_BRACES);
    expect(lexer.next()).toHaveProperty("type", TokenType.SEMICOLON);
    expect(lexer.next()).toHaveProperty("type", TokenType.IDENTIFIER);
    expect(lexer.next()).toHaveProperty("type", TokenType.LEFT_PARENTHESIS);
    expect(lexer.next()).toHaveProperty("type", TokenType.NUMBER_LITERAL);
    expect(lexer.next()).toHaveProperty("type", TokenType.COMMA);
    expect(lexer.next()).toHaveProperty("type", TokenType.NUMBER_LITERAL);
    expect(lexer.next()).toHaveProperty("type", TokenType.RIGHT_PARENTHESIS);
    expect(lexer.next()).toHaveProperty("type", TokenType.SEMICOLON);
  });
});
