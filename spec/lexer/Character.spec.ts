import { Character } from "../../src/lexer/Character";

describe("Iterum::Lexer::Character", () => {
  test("Should properly wrap the character", () => {
    const char = Character.from("*");

    expect(char).toBeInstanceOf(Character);
    expect(char.char).toEqual("*");
  });

  test("Should properly check if it is matches against other string", () => {
    const char = Character.from("*");

    expect(char.is("*")).toBeTruthy();
    expect(char.is("/")).toBeFalsy();
  });

  test("Should properly check if it is newline", () => {
    const asterisk = Character.from("*");
    const newline = Character.from(`\n`);

    expect(asterisk.isNewline()).toBeFalsy();
    expect(newline.isNewline()).toBeTruthy();
  });

  test("Should properly check if it is whitespace", () => {
    const whitespace = Character.from(`\n`);

    expect(whitespace.isNewline()).toBeTruthy();
  });

  test("Should properly check if it is alpha char", () => {
    const alpha = Character.from("a");

    expect(alpha.isAlpha()).toBeTruthy();
  });

  test("Should properly check if it is digit", () => {
    const digit = Character.from("2");

    expect(digit.isDigit()).toBeTruthy();
    expect(digit.isAlpha()).toBeFalsy();
  });

  test("Should properly check if it is alphanumeric", () => {
    const alpha = Character.from("b");
    const digit = Character.from("7");

    expect(alpha.isAlphaNumeric()).toBeTruthy();
    expect(digit.isAlphaNumeric()).toBeTruthy();
  });

  test("Should properly return string representation of itself", () => {
    const char = Character.from("s");

    expect(char.toString()).toEqual("s");
  });

  test("Should properly check if it is end of file", () => {
    const char = Character.from("test"[10]);

    expect(char.isEOF()).toBeTruthy();
    expect(char.isDigit()).toBeFalsy();
    expect(char.isAlpha()).toBeFalsy();
    expect(char.isAlphaNumeric()).toBeFalsy();
  });
});
