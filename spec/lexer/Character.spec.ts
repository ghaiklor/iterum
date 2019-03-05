import { Character } from "../../src/lexer/Character";

describe("Iterum::Lexer::Character", () => {
  it("Should properly wrap the character", () => {
    const char = Character.from("*");

    expect(char).toBeInstanceOf(Character);
    expect(char.is("*")).toBeTruthy();
  });

  it("Should properly check if it is matches against other string", () => {
    const char = Character.from("*");

    expect(char.is("*")).toBeTruthy();
    expect(char.is("/")).toBeFalsy();
  });

  it("Should properly check if it is newline", () => {
    const asterisk = Character.from("*");
    const newline = Character.from(`\n`);

    expect(asterisk.isNewline()).toBeFalsy();
    expect(newline.isNewline()).toBeTruthy();
  });

  it("Should properly check if it is line terminator", () => {
    const asterisk = Character.from("*");
    const newline = Character.from(`\n`);

    expect(asterisk.isLineTerminator()).toBeFalsy();
    expect(newline.isLineTerminator()).toBeTruthy();
  });

  it("Should properly check if it is whitespace", () => {
    const whitespace = Character.from(`\n`);

    expect(whitespace.isNewline()).toBeTruthy();
  });

  it("Should properly check if it is alpha char", () => {
    const alpha = Character.from("a");

    expect(alpha.isAlpha()).toBeTruthy();
  });

  it("Should properly check if it is digit", () => {
    const digit = Character.from("2");

    expect(digit.isDigit()).toBeTruthy();
    expect(digit.isAlpha()).toBeFalsy();
  });

  it("Should properly check if it is alphanumeric", () => {
    const alpha = Character.from("b");
    const digit = Character.from("7");

    expect(alpha.isAlphaNumeric()).toBeTruthy();
    expect(digit.isAlphaNumeric()).toBeTruthy();
  });

  it("Should properly return string representation of itself", () => {
    const char = Character.from("s");

    expect(char.toString()).toEqual("s");
  });

  it("Should properly check if it is end of file", () => {
    const char = Character.from("it"[10]);

    expect(char.isEOF()).toBeTruthy();
    expect(char.isDigit()).toBeFalsy();
    expect(char.isAlpha()).toBeFalsy();
    expect(char.isAlphaNumeric()).toBeFalsy();
  });
});
