import { IMemberExpression } from "../../../src/ast/expressions/MemberExpression";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { ILiteral } from "../../../src/ast/miscellaneous/Literal";
import { IProgram } from "../../../src/ast/programs/Program";
import { IExpressionStatement } from "../../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::MemberExpression", () => {
  it("Should properly parse member expression with dot notation", () => {
    const source = `foo.bar;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: { name: "foo", type: "Identifier", loc: null } as IIdentifier,
          property: { name: "bar", type: "Identifier" } as IIdentifier,
          type: "MemberExpression",
        } as IMemberExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse member expression with square brackets", () => {
    const source = `foo["bar"];`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: { name: "foo", type: "Identifier", loc: null } as IIdentifier,
          property: { raw: "bar", value: "bar", type: "Literal", loc: null } as ILiteral,
          type: "MemberExpression",
        } as IMemberExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse member expression with several square brackets", () => {
    const source = `foo["bar"]["baz"];`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: {
            computed: false,
            loc: null,
            object: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
            property: { type: "Literal", loc: null, value: "bar", raw: "bar" } as ILiteral,
            type: "MemberExpression",
          } as IMemberExpression,
          property: { raw: "baz", value: "baz", type: "Literal", loc: null } as ILiteral,
          type: "MemberExpression",
        } as IMemberExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse member expression with several dots", () => {
    const source = `foo.bar.baz;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: {
            computed: false,
            loc: null,
            object: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
            property: { type: "Identifier", loc: null, name: "bar" } as IIdentifier,
            type: "MemberExpression",
          } as IMemberExpression,
          property: { type: "Identifier", loc: null, name: "baz" } as IIdentifier,
          type: "MemberExpression",
        } as IMemberExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse member expression with different combinations of accessors", () => {
    const source = `foo["bar"].baz.baa[1];`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: {
            computed: false,
            loc: null,
            object: {
              computed: false,
              loc: null,
              object: {
                computed: false,
                loc: null,
                object: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
                property: { type: "Literal", loc: null, value: "bar", raw: "bar" } as ILiteral,
                type: "MemberExpression",
              } as IMemberExpression,
              property: { type: "Identifier", loc: null, name: "baz" } as IIdentifier,
              type: "MemberExpression",
            } as IMemberExpression,
            property: { type: "Identifier", loc: null, name: "baa" } as IIdentifier,
            type: "MemberExpression",
          } as IMemberExpression,
          property: { type: "Literal", loc: null, value: 1, raw: "1" } as ILiteral,
          type: "MemberExpression",
        } as IMemberExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse member expression with different combinations of accessors", () => {
    const source = `foo.bar.baz.baa[1];`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: {
            computed: false,
            loc: null,
            object: {
              computed: false,
              loc: null,
              object: {
                computed: false,
                loc: null,
                object: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
                property: { type: "Identifier", loc: null, name: "bar" } as IIdentifier,
                type: "MemberExpression",
              } as IMemberExpression,
              property: { type: "Identifier", loc: null, name: "baz" } as IIdentifier,
              type: "MemberExpression",
            } as IMemberExpression,
            property: { type: "Identifier", loc: null, name: "baa" } as IIdentifier,
            type: "MemberExpression",
          } as IMemberExpression,
          property: { type: "Literal", loc: null, value: 1, raw: "1" } as ILiteral,
          type: "MemberExpression",
        } as IMemberExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
