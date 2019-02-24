import { BinaryExpression } from "../../src/ast/BinaryExpression";
import { Literal } from "../../src/ast/Literal";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser", () => {
  it("Should properly parse the simplest expression with +", () => {
    const source = `5 + 2`;
    const parser = new Parser(source);
    const ast = parser.parse();

    expect(ast.body[0]).toMatchObject({
      left: { value: 5, raw: "5" } as Literal,
      operator: "+",
      right: { value: 2, raw: "2" } as Literal,
      type: "BinaryExpression",
    } as BinaryExpression);
  });

  it("Should properly parse the expression with all mathematical operators", () => {
    const source = `5 + 10 - -20 * -4.20 / 2`;
    const parser = new Parser(source);
    const ast = parser.parse();

    expect(ast.body[0]).toMatchObject({
      left: { value: 5 } as Literal,
      operator: "+",
      right: {
        left: { value: 10 } as Literal,
        operator: "-",
        right: {
          left: { value: -20 } as Literal,
          operator: "*",
          right: {
            left: { value: -4.20 } as Literal,
            operator: "/",
            right: { value: 2 } as Literal,
            type: "BinaryExpression",
          } as BinaryExpression,
          type: "BinaryExpression",
        } as BinaryExpression,
        type: "BinaryExpression",
      } as BinaryExpression,
      type: "BinaryExpression",
    } as BinaryExpression);
  });
});
