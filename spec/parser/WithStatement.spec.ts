import { IAssignmentExpression } from "../../src/ast/expressions/AssignmentExpression";
import { IBinaryExpression } from "../../src/ast/expressions/BinaryExpression";
import { IObjectExpression } from "../../src/ast/expressions/ObjectExpression";
import { IIdentifier } from "../../src/ast/miscellaneous/Identifier";
import { ILiteral } from "../../src/ast/miscellaneous/Literal";
import { IProperty } from "../../src/ast/miscellaneous/Property";
import { IProgram } from "../../src/ast/programs/Program";
import { IBlockStatement } from "../../src/ast/statements/BlockStatement";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { IWithStatement } from "../../src/ast/statements/WithStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::WithStatement", () => {
  it("Should properly parse the statement", () => {
    const source = `
      with({foo: 'bar'}) {
        foo = foo + 'bar';
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: {
          body: [{
            expression: {
              left: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
              loc: null,
              operator: "=",
              right: {
                left: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
                loc: null,
                operator: "+",
                right: { type: "Literal", loc: null, value: "bar", raw: "bar" } as ILiteral,
                type: "BinaryExpression",
              } as IBinaryExpression,
              type: "AssignmentExpression",
            } as IAssignmentExpression,
            loc: null,
            type: "ExpressionStatement",
          } as IExpressionStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        loc: null,
        object: {
          loc: null,
          properties: [
            {
              key: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { type: "Literal", loc: null, value: "bar", raw: "bar" } as ILiteral,
            } as IProperty,
          ],
          type: "ObjectExpression",
        } as IObjectExpression,
        type: "WithStatement",
      } as IWithStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
