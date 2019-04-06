import { IUpdateExpression } from "../../../src/ast/expressions/UpdateExpression";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { IProgram } from "../../../src/ast/programs/Program";
import { IExpressionStatement } from "../../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::UpdateExpression", () => {
  it("Should properly parse increment expression", () => {
    const source = `a++;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
          loc: null,
          operator: "++",
          prefix: false,
          type: "UpdateExpression",
        } as IUpdateExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse decrement expression", () => {
    const source = `a--;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
          loc: null,
          operator: "--",
          prefix: false,
          type: "UpdateExpression",
        } as IUpdateExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse decrement expression", () => {
    const source = `--a;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
          loc: null,
          operator: "--",
          prefix: true,
          type: "UpdateExpression",
        } as IUpdateExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse increment expression", () => {
    const source = `++a;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
          loc: null,
          operator: "++",
          prefix: true,
          type: "UpdateExpression",
        } as IUpdateExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
