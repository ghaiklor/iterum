import { IAssignmentExpression } from "../../src/ast/expressions/AssignmentExpression";
import { IIdentifier } from "../../src/ast/miscellaneous/Identifier";
import { ILiteral } from "../../src/ast/miscellaneous/Literal";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::AssignmentExpression", () => {
  it("Should properly parse assign expression", () => {
    const source = "a = 5";
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
          loc: null,
          operator: "=",
          right: { type: "Literal", value: 5, raw: "5" } as ILiteral,
          type: "AssignmentExpression",
        } as IAssignmentExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
