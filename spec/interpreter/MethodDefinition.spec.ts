import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::MethodDefinition", () => {
  it("Should properly interpret method in the class", () => {
    const source = `
      class Point {
        sum(a, b) {
          return a + b;
        }
      }

      const point = new Point();
      point.sum(2, 3);
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(5);
  });
});
