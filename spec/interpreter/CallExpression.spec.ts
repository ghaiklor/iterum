import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::CallExpression", () => {
  it("Should throw an error when arity mismatch", () => {
    const source = `
      function add(a, b) {
        return a + b;
      }

      add(1);
    `;

    const ast = Parser.parse(source);

    expect(() => Interpreter.interpret(ast)).toThrowError(`<function add> expect 2 arguments, but got 1`);
  });
});
