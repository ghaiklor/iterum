import { Lexer } from "../../src/lexer/Lexer";

describe("Iterum::Lexer", () => {
  test("Should properly parse mathematical expression", () => {
    const source = "+ - * /";
    const lexer = new Lexer(source);

    expect(lexer.next().toString()).toEqual("Token(PLUS, +, 1:1)");
    expect(lexer.next().toString()).toEqual("Token(MINUS, -, 1:3)");
    expect(lexer.next().toString()).toEqual("Token(ASTERISK, *, 1:5)");
    expect(lexer.next().toString()).toEqual("Token(SLASH, /, 1:7)");
  });
});
