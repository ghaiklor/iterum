import { IConditionalExpression } from "../../../src/ast/expressions/ConditionalExpression";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { ILiteral } from "../../../src/ast/miscellaneous/Literal";
import { IProgram } from "../../../src/ast/programs/Program";
import { IExpressionStatement } from "../../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::ConditionalExpression", () => {
  it("Should properly parse conditional expression", () => {
    const source = `foo ? true : false;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          alternate: { value: false, raw: "false", type: "Literal", loc: null } as ILiteral,
          consequent: { value: true, raw: "true", type: "Literal", loc: null } as ILiteral,
          loc: null,
          test: { name: "foo" } as IIdentifier,
          type: "ConditionalExpression",
        } as IConditionalExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
