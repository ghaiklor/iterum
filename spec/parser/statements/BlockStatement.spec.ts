import { IAssignmentExpression } from "../../../src/ast/expressions/AssignmentExpression";
import { IBinaryExpression } from "../../../src/ast/expressions/BinaryExpression";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { ILiteral } from "../../../src/ast/miscellaneous/Literal";
import { IProgram } from "../../../src/ast/programs/Program";
import { IBlockStatement } from "../../../src/ast/statements/BlockStatement";
import { IExpressionStatement } from "../../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::BlockStatement", () => {
  it("Should properly parse multiple statements in one block", () => {
    const source = `
      {
        a = 2;
        b = a + 3;
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: [
          {
            expression: {
              left: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              loc: null,
              operator: "=",
              right: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
              type: "AssignmentExpression",
            } as IAssignmentExpression,
            loc: null,
            type: "ExpressionStatement",
          } as IExpressionStatement,
          {
            expression: {
              left: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
              loc: null,
              operator: "=",
              right: {
                left: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                loc: null,
                operator: "+",
                right: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
                type: "BinaryExpression",
              } as IBinaryExpression,
              type: "AssignmentExpression",
            } as IAssignmentExpression,
            loc: null,
            type: "ExpressionStatement",
          } as IExpressionStatement,
        ],
        loc: null,
        type: "BlockStatement",
      } as IBlockStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
