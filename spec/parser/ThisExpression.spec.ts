import { IThisExpression } from "../../src/ast/expressions/ThisExpression";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::ThisExpression", () => {
  it("Should properly parse this expression", () => {
    const source = `this;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: { type: "ThisExpression", loc: null } as IThisExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
