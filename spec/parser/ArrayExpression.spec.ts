import { IArrayExpression } from "../../src/ast/expressions/ArrayExpression";
import { ILiteral } from "../../src/ast/miscellaneous/Literal";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::ArrayExpression", () => {
  it("Should properly parse array literals with multiply elements", () => {
    const source = `[null, true, false];`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          elements: [
            { value: null, raw: "null", type: "Literal", loc: null } as ILiteral,
            { value: true, raw: "true", type: "Literal", loc: null } as ILiteral,
            { value: false, raw: "false", type: "Literal", loc: null } as ILiteral,
          ],
          loc: null,
          type: "ArrayExpression",
        } as IArrayExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse array literals with no elements", () => {
    const source = `[];`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          elements: [],
          loc: null,
          type: "ArrayExpression",
        } as IArrayExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
