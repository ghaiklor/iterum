import { ICatchClause } from "../../src/ast/clauses/CatchClause";
import { IBinaryExpression } from "../../src/ast/expressions/BinaryExpression";
import { IIdentifier } from "../../src/ast/miscellaneous/Identifier";
import { ILiteral } from "../../src/ast/miscellaneous/Literal";
import { IProgram } from "../../src/ast/programs/Program";
import { IBlockStatement } from "../../src/ast/statements/BlockStatement";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { ITryStatement } from "../../src/ast/statements/TryStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::TryStatement", () => {
  it("Should properly parse catch/finally block", () => {
    const source = `
    try {
      2 + 3;
    } catch(e) {
      2 + 3;
    } finally {
      2 + 3;
    }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        block: {
          body: [{
            expression: {
              left: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
              loc: null,
              operator: "+",
              right: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
              type: "BinaryExpression",
            } as IBinaryExpression,
            loc: null,
            type: "ExpressionStatement",
          } as IExpressionStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        finalizer: {
          body: [{
            expression: {
              left: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
              loc: null,
              operator: "+",
              right: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
              type: "BinaryExpression",
            } as IBinaryExpression,
            loc: null,
            type: "ExpressionStatement",
          } as IExpressionStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        handler: {
          body: {
            body: [{
              expression: {
                left: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
                loc: null,
                operator: "+",
                right: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
                type: "BinaryExpression",
              } as IBinaryExpression,
              loc: null,
              type: "ExpressionStatement",
            } as IExpressionStatement],
            loc: null,
            type: "BlockStatement",
          } as IBlockStatement,
          guard: null,
          loc: null,
          param: { type: "Identifier", loc: null, name: "e" } as IIdentifier,
          type: "CatchClause",
        } as ICatchClause,
        loc: null,
        type: "TryStatement",
      } as ITryStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse catch block only", () => {
    const source = `
    try {
      2 + 3;
    } catch(e) {
      2 + 3;
    }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        block: {
          body: [{
            expression: {
              left: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
              loc: null,
              operator: "+",
              right: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
              type: "BinaryExpression",
            } as IBinaryExpression,
            loc: null,
            type: "ExpressionStatement",
          } as IExpressionStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        finalizer: null,
        handler: {
          body: {
            body: [{
              expression: {
                left: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
                loc: null,
                operator: "+",
                right: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
                type: "BinaryExpression",
              } as IBinaryExpression,
              loc: null,
              type: "ExpressionStatement",
            } as IExpressionStatement],
            loc: null,
            type: "BlockStatement",
          } as IBlockStatement,
          guard: null,
          loc: null,
          param: { type: "Identifier", loc: null, name: "e" } as IIdentifier,
          type: "CatchClause",
        } as ICatchClause,
        loc: null,
        type: "TryStatement",
      } as ITryStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse finally block only", () => {
    const source = `
    try {
      2 + 3;
    } finally {
      2 + 3;
    }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        block: {
          body: [{
            expression: {
              left: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
              loc: null,
              operator: "+",
              right: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
              type: "BinaryExpression",
            } as IBinaryExpression,
            loc: null,
            type: "ExpressionStatement",
          } as IExpressionStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        finalizer: {
          body: [{
            expression: {
              left: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
              loc: null,
              operator: "+",
              right: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
              type: "BinaryExpression",
            } as IBinaryExpression,
            loc: null,
            type: "ExpressionStatement",
          } as IExpressionStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        handler: null,
        loc: null,
        type: "TryStatement",
      } as ITryStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
