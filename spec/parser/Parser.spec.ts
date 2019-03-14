import { IBinaryExpression } from "../../src/ast/expressions/BinaryExpression";
import { ILiteral } from "../../src/ast/miscellaneous/Literal";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";
import { IIdentifer } from "../../src/ast/miscellaneous/Identifier";
import { ISequenceExpression } from "../../src/ast/expressions/SequenceExpression";
import { IConditionalExpression } from "../../src/ast/expressions/ConditionalExpression";
import { IArrayExpression } from "../../src/ast/expressions/ArrayExpression";
import { IObjectExpression } from "../../src/ast/expressions/ObjectExpression";
import { IProperty } from "../../src/ast/miscellaneous/Property";
import { IMemberExpression } from "../../src/ast/expressions/MemberExpression";

describe("Iterum::Parser", () => {
  it("Should properly parse the simplest expression with +", () => {
    const source = `5 + 2;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 5, raw: "5", loc: null, type: "Literal" } as ILiteral,
          loc: null,
          operator: "+",
          right: { value: 2, raw: "2", loc: null, type: "Literal" } as ILiteral,
          type: "BinaryExpression",
        } as IBinaryExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse the simplest expression with the correct precedence", () => {
    const source = `5 + 10 / 2;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 5, raw: "5", loc: null, type: "Literal" } as ILiteral,
          loc: null,
          operator: "+",
          right: {
            left: { value: 10, raw: "10", loc: null, type: "Literal" } as ILiteral,
            loc: null,
            operator: "/",
            right: { value: 2, raw: "2", loc: null, type: "Literal" } as ILiteral,
            type: "BinaryExpression",
          } as IBinaryExpression,
          type: "BinaryExpression",
        } as IBinaryExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse expression within parenthesis", () => {
    const source = `5 * (10 + 2);`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 5, raw: "5", type: "Literal", loc: null } as ILiteral,
          loc: null,
          operator: "*",
          right: {
            left: { value: 10, raw: "10", type: "Literal", loc: null } as ILiteral,
            loc: null,
            operator: "+",
            right: { value: 2, raw: "2", type: "Literal", loc: null } as ILiteral,
            type: "BinaryExpression",
          } as IBinaryExpression,
          type: "BinaryExpression",
        } as IBinaryExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse string literals", () => {
    const source = `"Hello, World!";`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: { value: "Hello, World!", raw: "Hello, World!", type: "Literal", loc: null } as ILiteral,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly throw an error if unexpected token met to eat", () => {
    const source = `(5 + 2`;
    expect(() => Parser.parse(source)).toThrowError("Expected ) at 1:7, but got EOF");
  });

  it("Should properly throw an error if unrecognized token met", () => {
    const source = `5 + /;`;
    expect(() => Parser.parse(source)).toThrowError("Unexpected / at 1:6");
  });

  it("Should properly parse the sequence of expressions", () => {
    const source = `foo, bar;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          expressions: [
            { name: "foo", type: "Identifier" } as IIdentifer,
            { name: "bar", type: "Identifier" } as IIdentifer,
          ],
          loc: null,
          type: "SequenceExpression",
        } as ISequenceExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse conditional expression", () => {
    const source = `foo ? true : false;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          alternate: { value: false, raw: "false", type: "Literal", loc: null } as ILiteral,
          consequent: { value: true, raw: "true", type: "Literal", loc: null } as ILiteral,
          loc: null,
          test: { name: "foo" } as IIdentifer,
          type: "ConditionalExpression",
        } as IConditionalExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse binary expression with hexadecimal literals", () => {
    const source = `0x10 + 0xF`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 16, raw: "0x10", type: "Literal", loc: null } as ILiteral,
          loc: null,
          operator: "+",
          right: { value: 15, raw: "0xF", type: "Literal", loc: null } as ILiteral,
          type: "BinaryExpression",
        } as IBinaryExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse binary expression with octal literals", () => {
    const source = `0o10 + 0o15`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 8, raw: "0o10", type: "Literal", loc: null } as ILiteral,
          loc: null,
          operator: "+",
          right: { value: 13, raw: "0o15", type: "Literal", loc: null } as ILiteral,
          type: "BinaryExpression",
        } as IBinaryExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse binary expression with binary literals", () => {
    const source = `0b10 + 0b100`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 2, raw: "0b10", type: "Literal", loc: null } as ILiteral,
          loc: null,
          operator: "+",
          right: { value: 4, raw: "0b100", type: "Literal", loc: null } as ILiteral,
          type: "BinaryExpression",
        } as IBinaryExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse array literals with multiply elements", () => {
    const source = `[null, true, false]`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          elements: [
            { value: null, raw: "null", type: "Literal", loc: null } as ILiteral,
            { value: true, raw: "true", type: "Literal", loc: null } as ILiteral,
            { value: false, raw: "false", type: "Literal", loc: null } as ILiteral,
          ],
          loc: null,
          type: "ArrayExpression",
        } as IArrayExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse array literals with no elements", () => {
    const source = `[]`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          elements: [],
          loc: null,
          type: "ArrayExpression",
        } as IArrayExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse object literals with multiply properties", () => {
    const source = `({ foo: "bar", bar: 2 })`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          properties: [
            {
              key: { name: "foo", type: "Identifier" } as IIdentifer,
              kind: "init",
              loc: null,
              type: "Property",
              value: { value: "bar", raw: "bar", type: "Literal", loc: null } as ILiteral,
            } as IProperty,
            {
              key: { name: "bar", type: "Identifier", loc: null } as IIdentifer,
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
    const source = `({ })`;
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
    const source = `({ foo, bar })`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          loc: null,
          properties: [
            {
              key: { name: "foo", type: "Identifier" } as IIdentifer,
              kind: "init",
              loc: null,
              type: "Property",
              value: { name: "foo", type: "Identifier" } as IIdentifer,
            } as IProperty,
            {
              key: { name: "bar", type: "Identifier" } as IIdentifer,
              kind: "init",
              loc: null,
              type: "Property",
              value: { name: "bar", type: "Identifier" } as IIdentifer,
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
    const source = `({ 5: "foo" })`;
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

  it("Should properly parse member expression with single dot notation", () => {
    const source = `foo.bar`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: { name: "foo", type: "Identifier", loc: null } as IIdentifer,
          property: { name: "bar", type: "Identifier" } as IIdentifer,
          type: "MemberExpression",
        } as IMemberExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse member expression with dot notations", () => {
    const source = `foo.bar.baz`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          computed: false,
          loc: null,
          object: {
            computed: false,
            loc: null,
            object: { name: "foo", type: "Identifier", loc: null } as IIdentifer,
            property: { name: "bar", type: "Identifier" } as IIdentifer,
            type: "MemberExpression",
          } as IMemberExpression,
          property: { name: "baz", type: "Identifier" } as IIdentifer,
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
