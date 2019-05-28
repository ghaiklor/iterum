import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::WhileStatement", () => {
  it("Should properly interpret while statement", () => {
    const source = `
      let a = 0;

      while (a < 10) {
        a = a + 1;
      }

      a;
    `;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(10);
  });
});
