import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser", () => {
  it("Should properly throw an error if unexpected token met to eat", () => {
    const source = `(5 + 2`;
    expect(() => Parser.parse(source)).toThrowError("Expected ) at 1:7, but got EOF");
  });
});
