import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::ArrayExpression", () => {
  it("Should properly interpret array expression", () => {
    const source = `[1, 2, 3]`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual([1, 2, 3]);
  });
});
