import { IObjectExpression } from "../../src/ast/expressions/ObjectExpression";
import { IIdentifier } from "../../src/ast/miscellaneous/Identifier";
import { ILiteral } from "../../src/ast/miscellaneous/Literal";
import { IProperty } from "../../src/ast/miscellaneous/Property";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::ObjectExpression", () => {
  it("Should properly parse object literals with multiply properties", () => {
    const source = `({ foo: "bar", bar: 2 });`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          properties: [
            {
              key: { name: "foo", type: "Identifier" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { value: "bar", raw: "bar", type: "Literal", loc: null } as ILiteral,
            } as IProperty,
            {
              key: { name: "bar", type: "Identifier", loc: null } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { value: 2, raw: "2", type: "Literal", loc: null } as ILiteral,
            } as IProperty,
          ],
          type: "ObjectExpression",
        } as IObjectExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse object literals with no properties", () => {
    const source = `({ });`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          loc: null,
          properties: [],
          type: "ObjectExpression",
        } as IObjectExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse object literals with destructuring properties", () => {
    const source = `({ foo, bar });`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          loc: null,
          properties: [
            {
              key: { name: "foo", type: "Identifier" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { name: "foo", type: "Identifier" } as IIdentifier,
            } as IProperty,
            {
              key: { name: "bar", type: "Identifier" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { name: "bar", type: "Identifier" } as IIdentifier,
            } as IProperty],
          type: "ObjectExpression",
        } as IObjectExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse object literals with literal properties", () => {
    const source = `({ 5: "foo" });`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          properties: [
            {
              key: { value: 5, raw: "5", type: "Literal", loc: null } as ILiteral,
              kind: "init",
              loc: null,
              type: "Property",
              value: { value: "foo", raw: "foo", type: "Literal", loc: null } as ILiteral,
            } as IProperty,
          ],
          type: "ObjectExpression",
        } as IObjectExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly throw an error when unexpected token at key", () => {
    const source = `({ instanceof: 5 });`;
    expect(() => Parser.parse(source)).toThrowError(`Unexpected instanceof at 1:14`);
  });
});
