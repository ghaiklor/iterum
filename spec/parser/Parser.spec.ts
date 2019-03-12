import { BinaryExpression } from "../../src/ast/expression/BinaryExpression";
import { ConditionalExpression } from "../../src/ast/expression/ConditionalExpression";
import { SequenceExpression } from "../../src/ast/expression/SequenceExpression";
import { Identifier } from "../../src/ast/Identifier";
import { Literal } from "../../src/ast/Literal";
import { Program } from "../../src/ast/Program";
import { ExpressionStatement } from "../../src/ast/statement/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser", () => {
  it("Should properly parse the simplest expression with +", () => {
    const source = `5 + 2;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 5, raw: "5" } as Literal,
          operator: "+",
          right: { value: 2, raw: "2" } as Literal,
          type: "BinaryExpression",
        } as BinaryExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse the simplest expression with the correct precedence", () => {
    const source = `5 + 10 / 2;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 5, raw: "5" } as Literal,
          operator: "+",
          right: {
            left: { value: 10, raw: "10" } as Literal,
            operator: "/",
            right: { value: 2, raw: "2" } as Literal,
            type: "BinaryExpression",
          } as BinaryExpression,
          type: "BinaryExpression",
        } as BinaryExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse expression within parenthesis", () => {
    const source = `5 * (10 + 2);`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 5, raw: "5" } as Literal,
          operator: "*",
          right: {
            left: { value: 10, raw: "10" } as Literal,
            operator: "+",
            right: { value: 2, raw: "2" } as Literal,
            type: "BinaryExpression",
          } as BinaryExpression,
          type: "BinaryExpression",
        } as BinaryExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse string literals", () => {
    const source = `"Hello, World!";`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: { value: "Hello, World!", raw: "Hello, World!" } as Literal,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
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
            { name: "foo", type: "Identifier" } as Identifier,
            { name: "bar", type: "Identifier" } as Identifier,
          ],
          type: "SequenceExpression",
        } as SequenceExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse conditional expression", () => {
    const source = `foo ? true : false;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          alternate: { value: false, raw: "false" } as Literal,
          consequent: { value: true, raw: "true" } as Literal,
          test: { name: "foo" } as Identifier,
          type: "ConditionalExpression",
        } as ConditionalExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });
});
