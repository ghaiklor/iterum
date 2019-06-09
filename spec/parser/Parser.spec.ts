import { ParserError } from "../../src/errors/ParserError";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser", () => {
  it("Should properly recover from an error if during parsing some errors were found", () => {
    const source = `(5 + 2`;

    try {
      Parser.parse(source);
      throw new Error("Should not be called");
    } catch (e) {
      const error = e as ParserError;
      expect(error.name).toEqual("ParserError");
      expect(error.message).toEqual("There are some lexical and syntax errors found in your code");
      expect(error.toString()).toEqual([
        "[1:7] SyntaxError: Expected ), but got ",
      ].join("\n"));
    }
  });

  it("Should properly recover from an error and synchronize back to known state", () => {
    const source = `
      function add(5) {}
      [1,2];
      function add(10) {}
      class function throw
    `;

    try {
      Parser.parse(source);
      throw new Error("Should not be called");
    } catch (e) {
      const error = e as ParserError;
      expect(error.name).toEqual("ParserError");
      expect(error.message).toEqual("There are some lexical and syntax errors found in your code");
      expect(error.toString()).toEqual([
        "[2:21] SyntaxError: Expected identifier, but got 5",
        "[4:22] SyntaxError: Expected identifier, but got 10",
        "[5:21] SyntaxError: Expected identifier, but got function",
        "[5:27] SyntaxError: Expected (, but got throw",
        "[6:5] SyntaxError: Unexpected end-of-file",
      ].join("\n"));
    }
  });
});
