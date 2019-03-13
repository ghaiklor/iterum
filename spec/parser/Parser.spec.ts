import { ArrayExpression } from "../../src/ast/expression/ArrayExpression";
import { BinaryExpression } from "../../src/ast/expression/BinaryExpression";
import { ConditionalExpression } from "../../src/ast/expression/ConditionalExpression";
import { ObjectExpression } from "../../src/ast/expression/ObjectExpression";
import { SequenceExpression } from "../../src/ast/expression/SequenceExpression";
import { Identifier } from "../../src/ast/Identifier";
import { Literal } from "../../src/ast/Literal";
import { Program } from "../../src/ast/Program";
import { Property } from "../../src/ast/Property";
import { ExpressionStatement } from "../../src/ast/statement/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";
import { MemberExpression } from "../../src/ast/expression/MemberExpression";

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

  it("Should properly parse binary expression with hexadecimal literals", () => {
    const source = `0x10 + 0xF`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 16, raw: "0x10", type: "Literal" } as Literal,
          operator: "+",
          right: { value: 15, raw: "0xF", type: "Literal" } as Literal,
          type: "BinaryExpression",
        } as BinaryExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse binary expression with octal literals", () => {
    const source = `0o10 + 0o15`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 8, raw: "0o10", type: "Literal" } as Literal,
          operator: "+",
          right: { value: 13, raw: "0o15", type: "Literal" } as Literal,
          type: "BinaryExpression",
        } as BinaryExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse binary expression with binary literals", () => {
    const source = `0b10 + 0b100`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 2, raw: "0b10", type: "Literal" } as Literal,
          operator: "+",
          right: { value: 4, raw: "0b100", type: "Literal" } as Literal,
          type: "BinaryExpression",
        } as BinaryExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse array literals with multiply elements", () => {
    const source = `[null, true, false]`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          elements: [
            { value: null, raw: "null", type: "Literal" } as Literal,
            { value: true, raw: "true", type: "Literal" } as Literal,
            { value: false, raw: "false", type: "Literal" } as Literal,
          ],
          type: "ArrayExpression",
        } as ArrayExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse array literals with no elements", () => {
    const source = `[]`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          elements: [],
          type: "ArrayExpression",
        } as ArrayExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse object literals with multiply properties", () => {
    const source = `({ foo: "bar", bar: 2 })`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          properties: [
            {
              key: { name: "foo", type: "Identifier" } as Identifier,
              type: "Property",
              value: { value: "bar", raw: "bar", type: "Literal" } as Literal,
            } as Property,
            {
              key: { name: "bar", type: "Identifier" } as Identifier,
              type: "Property",
              value: { value: 2, raw: "2", type: "Literal" } as Literal,
            } as Property,
          ],
          type: "ObjectExpression",
        } as ObjectExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse object literals with no properties", () => {
    const source = `({ })`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          properties: [],
          type: "ObjectExpression",
        } as ObjectExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse object literals with destructuring properties", () => {
    const source = `({ foo, bar })`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          properties: [
            {
              key: { name: "foo", type: "Identifier" } as Identifier,
              type: "Property",
              value: { name: "foo", type: "Identifier" } as Identifier,
            } as Property,
            {
              key: { name: "bar", type: "Identifier" } as Identifier,
              type: "Property",
              value: { name: "bar", type: "Identifier" } as Identifier,
            } as Property],
          type: "ObjectExpression",
        } as ObjectExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse object literals with literal properties", () => {
    const source = `({ 5: "foo" })`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          properties: [
            {
              key: { value: 5, raw: "5", type: "Literal" } as Literal,
              type: "Property",
              value: { value: "foo", raw: "foo", type: "Literal" } as Literal,
            } as Property,
          ],
          type: "ObjectExpression",
        } as ObjectExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });

  it("Should properly parse member expression with dot notation", () => {
    const source = `foo.bar.baz`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          object: {
            object: { name: "foo", type: "Identifer" } as Identifier,
            property: { name: "bar", type: "Identifier" } as Identifier,
            type: "MemberExpression",
          } as MemberExpression,
          property: { name: "baz", type: "Identifier" } as Identifier,
          type: "MemberExpression",
        } as MemberExpression,
        type: "ExpressionStatement",
      } as ExpressionStatement],
      type: "Program",
    } as Program);
  });
});
