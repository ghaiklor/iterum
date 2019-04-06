import { IAssignmentExpression } from "../../../src/ast/expressions/AssignmentExpression";
import { IBinaryExpression } from "../../../src/ast/expressions/BinaryExpression";
import { IUpdateExpression } from "../../../src/ast/expressions/UpdateExpression";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { IProgram } from "../../../src/ast/programs/Program";
import { IBlockStatement } from "../../../src/ast/statements/BlockStatement";
import { IDoWhileStatement } from "../../../src/ast/statements/DoWhileStatement";
import { IExpressionStatement } from "../../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::DoWhileStatement", () => {
  it("Should properly parse do-while loop", () => {
    const source = `
      do {
        a = b++;
      } while(a < b);
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: {
          body: [{
            expression: {
              left: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              loc: null,
              operator: "=",
              right: {
                argument: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                loc: null,
                operator: "++",
                prefix: false,
                type: "UpdateExpression",
              } as IUpdateExpression,
              type: "AssignmentExpression",
            } as IAssignmentExpression,
            loc: null,
            type: "ExpressionStatement",
          } as IExpressionStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        loc: null,
        test: {
          left: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
          loc: null,
          operator: "<",
          right: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
          type: "BinaryExpression",
        } as IBinaryExpression,
        type: "DoWhileStatement",
      } as IDoWhileStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse the while loop", () => {
    const source = `
      while (a < b) {
        a = b++;
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: {
          body: [{
            expression: {
              left: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              loc: null,
              operator: "=",
              right: {
                argument: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                loc: null,
                operator: "++",
                prefix: false,
                type: "UpdateExpression",
              } as IUpdateExpression,
              type: "AssignmentExpression",
            } as IAssignmentExpression,
            loc: null,
            type: "ExpressionStatement",
          } as IExpressionStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        loc: null,
        test: {
          left: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
          loc: null,
          operator: "<",
          right: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
          type: "BinaryExpression",
        } as IBinaryExpression,
        type: "DoWhileStatement",
      } as IDoWhileStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
