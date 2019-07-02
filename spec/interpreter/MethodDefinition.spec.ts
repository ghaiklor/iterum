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

  it("Should properly interpret constructor in the class", () => {
    const source = `
      class Point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }

        sumX(point) {
          return this.x + point.x;
        }

        sumY(point) {
          return this.y + point.y;
        }
      }

      const point1 = new Point(2, 3);
      const point2 = new Point(5, 7);

      const sumX = point1.sumX(point2);
      const sumY = point1.sumY(point2);

      sumX + sumY;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(17);
  });
});
