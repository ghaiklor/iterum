import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::ThisExpression", () => {
  it("Should properly resolve this", () => {
    const source = `
      class Point {
        sum() {
          return this.x + this.y;
        }
      }

      const point = new Point();
      point.x = 2;
      point.y = 3;

      point.sum();
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(5);
  });
});
