import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::DoWhileStatement", () => {
  it("Should properly interpret do while statement", () => {
    const source = `
      let a;

      do {
        a = a + 1;
      } while (a < 5);

      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);
    expect(result).toEqual(5);
  });
});
