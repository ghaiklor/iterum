import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::SequenceExpression", () => {
  it("Should properly interpret sequence expression", () => {
    const source = `5, 10, 15, 20`;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(20);
  });
});
