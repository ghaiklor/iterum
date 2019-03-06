import { Token } from "../../src/token/Token";
import { TokenType } from "../../src/token/TokenType";

describe("Iterum::Token", () => {
  test("Should properly instantiate Token", () => {
    const token = new Token(TokenType.IDENTIFIER, "foo");

    expect(token.type).toEqual("IDENTIFIER");
    expect(token.code).toEqual("foo");
  });

  test("Should properly check if token is the same type as provided in #is", () => {
    const token = new Token(TokenType.IDENTIFIER, "foo");

    expect(token.is(TokenType.FUNCTION)).toBeFalsy();
    expect(token.is(TokenType.IDENTIFIER)).toBeTruthy();
  });

  test("Should properly serialize token to string representation", () => {
    const token = new Token(TokenType.IDENTIFIER, "foo");

    expect(token.toString()).toEqual("Token(IDENTIFIER, foo)");
  });
});
