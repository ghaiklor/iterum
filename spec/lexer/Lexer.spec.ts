import { Lexer } from "../../src/lexer/Lexer";
import { TokenType } from "../../src/token/TokenType";

describe("Iterum::Lexer", () => {
  test("Should properly tokenize mathematical expression", () => {
    const source = "+ - * /";
    const lexer = new Lexer(source);

    expect(lexer.next().toString()).toEqual("Token(+, +, 1:1)");
    expect(lexer.next().toString()).toEqual("Token(-, -, 1:3)");
    expect(lexer.next().toString()).toEqual("Token(*, *, 1:5)");
    expect(lexer.next().toString()).toEqual("Token(/, /, 1:7)");
  });

  test("Should properly tokenize some simple program", () => {
    const source = `
      function add(a, b) {
        return a + b;
      };

      add(1, 2);
    `;

    const lexer = new Lexer(source);
    expect(lexer.next().type).toEqual(TokenType.FUNCTION);
    expect(lexer.next().type).toEqual(TokenType.IDENTIFIER);
    expect(lexer.next().type).toEqual(TokenType.LEFT_PARENTHESIS);
    expect(lexer.next().type).toEqual(TokenType.IDENTIFIER);
    expect(lexer.next().type).toEqual(TokenType.COMMA);
    expect(lexer.next().type).toEqual(TokenType.IDENTIFIER);
    expect(lexer.next().type).toEqual(TokenType.RIGHT_PARENTHESIS);
    expect(lexer.next().type).toEqual(TokenType.LEFT_CURLY_BRACES);
    expect(lexer.next().type).toEqual(TokenType.RETURN);
    expect(lexer.next().type).toEqual(TokenType.IDENTIFIER);
    expect(lexer.next().type).toEqual(TokenType.PLUS);
    expect(lexer.next().type).toEqual(TokenType.IDENTIFIER);
    expect(lexer.next().type).toEqual(TokenType.SEMICOLON);
    expect(lexer.next().type).toEqual(TokenType.RIGHT_CURLY_BRACES);
    expect(lexer.next().type).toEqual(TokenType.SEMICOLON);
    expect(lexer.next().type).toEqual(TokenType.IDENTIFIER);
    expect(lexer.next().type).toEqual(TokenType.LEFT_PARENTHESIS);
    expect(lexer.next().type).toEqual(TokenType.NUMBER_LITERAL);
    expect(lexer.next().type).toEqual(TokenType.COMMA);
    expect(lexer.next().type).toEqual(TokenType.NUMBER_LITERAL);
    expect(lexer.next().type).toEqual(TokenType.RIGHT_PARENTHESIS);
    expect(lexer.next().type).toEqual(TokenType.SEMICOLON);
    expect(lexer.next().code).toEqual("function");
    expect(lexer.next().code).toEqual("add");
    expect(lexer.next().code).toEqual("(");
    expect(lexer.next().code).toEqual("a");
    expect(lexer.next().code).toEqual(",");
    expect(lexer.next().code).toEqual("b");
    expect(lexer.next().code).toEqual(")");
    expect(lexer.next().code).toEqual("{");
    expect(lexer.next().code).toEqual("return");
    expect(lexer.next().code).toEqual("a");
    expect(lexer.next().code).toEqual("+");
    expect(lexer.next().code).toEqual("b");
    expect(lexer.next().code).toEqual(";");
    expect(lexer.next().code).toEqual("}");
    expect(lexer.next().code).toEqual(";");
    expect(lexer.next().code).toEqual("add");
    expect(lexer.next().code).toEqual("(");
    expect(lexer.next().code).toEqual("1");
    expect(lexer.next().code).toEqual(",");
    expect(lexer.next().code).toEqual("2");
    expect(lexer.next().code).toEqual(")");
    expect(lexer.next().code).toEqual(";");
  });
});
