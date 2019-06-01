import { ITokenLocation, Token } from "../../src/token/Token";
import { TokenType } from "../../src/token/TokenType";

describe("Iterum::Token", () => {
  test("Should properly instantiate Token", () => {
    const token = new Token(TokenType.IDENTIFIER, "foo", { line: 1, column: 1 } as ITokenLocation);

    expect(token.type).toEqual(TokenType.IDENTIFIER);
    expect(token.name).toEqual("identifier");
    expect(token.lexeme).toEqual("foo");
    expect(token.location).toEqual({ line: 1, column: 1 } as ITokenLocation);
  });

  test("Should properly check if token is the same type as provided in #is", () => {
    const token = new Token(TokenType.IDENTIFIER, "foo", { line: 1, column: 1 } as ITokenLocation);

    expect(token.is(TokenType.FUNCTION)).toBeFalsy();
    expect(token.is(TokenType.IDENTIFIER)).toBeTruthy();
  });

  test("Should properly check if token is not it the provided list in #isNotSomeOf", () => {
    const token = new Token(TokenType.IDENTIFIER, "foo", { line: 1, column: 1 } as ITokenLocation);

    expect(token.isNotSomeOf([TokenType.FINALLY, TokenType.VAR])).toBeTruthy();
  });

  test("Should properly serialize token to string representation", () => {
    const token = new Token(TokenType.IDENTIFIER, "foo", { line: 5, column: 3 } as ITokenLocation);

    expect(token.toString()).toEqual("[5:3] Token(identifier, foo)");
  });
});
