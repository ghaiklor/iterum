import { IVariableDeclaration } from "../../src/ast/declarations/VariableDeclaration";
import { IVariableDeclarator } from "../../src/ast/declarations/VariableDeclarator";
import { IArrayExpression } from "../../src/ast/expressions/ArrayExpression";
import { IObjectExpression } from "../../src/ast/expressions/ObjectExpression";
import { IIdentifier } from "../../src/ast/miscellaneous/Identifier";
import { ILiteral } from "../../src/ast/miscellaneous/Literal";
import { IProperty } from "../../src/ast/miscellaneous/Property";
import { IArrayPattern } from "../../src/ast/patterns/ArrayPattern";
import { IObjectPattern } from "../../src/ast/patterns/ObjectPattern";
import { IProgram } from "../../src/ast/programs/Program";
import { IBlockStatement } from "../../src/ast/statements/BlockStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::VariableDeclaration", () => {
  it("Should properly parse variable with initializer", () => {
    const source = `var a = 2;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declarations: [{
          id: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
          init: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
          loc: null,
          type: "VariableDeclarator",
        } as IVariableDeclarator],
        loc: null,
        type: "VariableDeclaration",
      } as IVariableDeclaration],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse multiple variable declarator with initializer", () => {
    const source = `var a, b = 2;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declarations: [
          {
            id: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
            init: null,
            loc: null,
            type: "VariableDeclarator",
          } as IVariableDeclarator,
          {
            id: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
            init: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
            loc: null,
            type: "VariableDeclarator",
          } as IVariableDeclarator,
        ],
        loc: null,
        type: "VariableDeclaration",
      } as IVariableDeclaration],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse variable declaration with object binding pattern", () => {
    const source = `let { a } = { a: 2 };`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declarations: [{
          id: {
            loc: null,
            properties: [{
              key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
            } as IProperty],
            type: "ObjectPattern",
          } as IObjectPattern,
          init: {
            loc: null,
            properties: [{
              key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
            } as IProperty],
            type: "ObjectExpression",
          } as IObjectExpression,
          loc: null,
          type: "VariableDeclarator",
        } as IVariableDeclarator],
        kind: "let",
        loc: null,
        type: "VariableDeclaration",
      } as IVariableDeclaration],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse variable declaration with object binding pattern (kind const)", () => {
    const source = `const { a } = { a: 2 };`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declarations: [{
          id: {
            loc: null,
            properties: [{
              key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
            } as IProperty],
            type: "ObjectPattern",
          } as IObjectPattern,
          init: {
            loc: null,
            properties: [{
              key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
            } as IProperty],
            type: "ObjectExpression",
          } as IObjectExpression,
          loc: null,
          type: "VariableDeclarator",
        } as IVariableDeclarator],
        kind: "const",
        loc: null,
        type: "VariableDeclaration",
      } as IVariableDeclaration],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse variable declaration with array binding pattern", () => {
    const source = `let [ a ] = [ 1 ];`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declarations: [{
          id: {
            elements: [
              { type: "Identifier", loc: null, name: "a" } as IIdentifier,
            ],
            loc: null,
            type: "ArrayPattern",
          } as IArrayPattern,
          init: {
            elements: [
              { type: "Literal", loc: null, value: 1, raw: "1" } as ILiteral,
            ],
            loc: null,
            type: "ArrayExpression",
          } as IArrayExpression,
          loc: null,
          type: "VariableDeclarator",
        } as IVariableDeclarator],
        kind: "let",
        loc: null,
        type: "VariableDeclaration",
      } as IVariableDeclaration],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse variable declaration with object binding pattern (different key/value)", () => {
    const source = `let { a: c } = { a: 2 };`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declarations: [{
          id: {
            loc: null,
            properties: [{
              key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { type: "Identifier", loc: null, name: "c" } as IIdentifier,
            } as IProperty],
            type: "ObjectPattern",
          } as IObjectPattern,
          init: {
            loc: null,
            properties: [{
              key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
            } as IProperty],
            type: "ObjectExpression",
          } as IObjectExpression,
          loc: null,
          type: "VariableDeclarator",
        } as IVariableDeclarator],
        kind: "let",
        loc: null,
        type: "VariableDeclaration",
      } as IVariableDeclaration],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse variable declaration with object binding pattern (empty)", () => {
    const source = `let { } = { a: 2 };`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declarations: [{
          id: {
            loc: null,
            properties: [],
            type: "ObjectPattern",
          } as IObjectPattern,
          init: {
            loc: null,
            properties: [{
              key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              kind: "init",
              loc: null,
              type: "Property",
              value: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
            } as IProperty],
            type: "ObjectExpression",
          } as IObjectExpression,
          loc: null,
          type: "VariableDeclarator",
        } as IVariableDeclarator],
        kind: "let",
        loc: null,
        type: "VariableDeclaration",
      } as IVariableDeclaration],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse variable declaration with array binding pattern (empty)", () => {
    const source = `let [ ] = [ 1 ];`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declarations: [{
          id: {
            elements: [],
            loc: null,
            type: "ArrayPattern",
          } as IArrayPattern,
          init: {
            elements: [
              { type: "Literal", loc: null, value: 1, raw: "1" } as ILiteral,
            ],
            loc: null,
            type: "ArrayExpression",
          } as IArrayExpression,
          loc: null,
          type: "VariableDeclarator",
        } as IVariableDeclarator],
        kind: "let",
        loc: null,
        type: "VariableDeclaration",
      } as IVariableDeclaration],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse variable declaration with array binding pattern (multiple variables)", () => {
    const source = `let [ a, b ] = [ 1, 2 ];`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declarations: [{
          id: {
            elements: [
              { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              { type: "Identifier", loc: null, name: "b" } as IIdentifier,
            ],
            loc: null,
            type: "ArrayPattern",
          } as IArrayPattern,
          init: {
            elements: [
              { type: "Literal", loc: null, value: 1, raw: "1" } as ILiteral,
              { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
            ],
            loc: null,
            type: "ArrayExpression",
          } as IArrayExpression,
          loc: null,
          type: "VariableDeclarator",
        } as IVariableDeclarator],
        kind: "let",
        loc: null,
        type: "VariableDeclaration",
      } as IVariableDeclaration],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse variable declaration with object binding pattern (multiple variables)", () => {
    const source = `let { a, b } = { a: 2, b: 3 };`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declarations: [{
          id: {
            loc: null,
            properties: [
              {
                key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                kind: "init",
                loc: null,
                type: "Property",
                value: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
              } as IProperty,
              {
                key: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                kind: "init",
                loc: null,
                type: "Property",
                value: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
              } as IProperty,
            ],
            type: "ObjectPattern",
          } as IObjectPattern,
          init: {
            loc: null,
            properties: [
              {
                key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                kind: "init",
                loc: null,
                type: "Property",
                value: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
              } as IProperty,
              {
                key: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                kind: "init",
                loc: null,
                type: "Property",
                value: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
              } as IProperty,
            ],
            type: "ObjectExpression",
          } as IObjectExpression,
          loc: null,
          type: "VariableDeclarator",
        } as IVariableDeclarator],
        kind: "let",
        loc: null,
        type: "VariableDeclaration",
      } as IVariableDeclaration],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse lexical declaration inside block statement", () => {
    const source = `
      {
        const { a, b } = { a: 2, b: 3 };
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: [{
          declarations: [{
            id: {
              loc: null,
              properties: [
                {
                  key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                  kind: "init",
                  loc: null,
                  type: "Property",
                  value: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                } as IProperty,
                {
                  key: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                  kind: "init",
                  loc: null,
                  type: "Property",
                  value: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                } as IProperty,
              ],
              type: "ObjectPattern",
            } as IObjectPattern,
            init: {
              loc: null,
              properties: [
                {
                  key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                  kind: "init",
                  loc: null,
                  type: "Property",
                  value: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
                } as IProperty,
                {
                  key: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                  kind: "init",
                  loc: null,
                  type: "Property",
                  value: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
                } as IProperty,
              ],
              type: "ObjectExpression",
            } as IObjectExpression,
            loc: null,
            type: "VariableDeclarator",
          } as IVariableDeclarator],
          kind: "const",
          loc: null,
          type: "VariableDeclaration",
        } as IVariableDeclaration],
        loc: null,
        type: "BlockStatement",
      } as IBlockStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse multiple lexical declarations inside block statement", () => {
    const source = `
      {
        const { a } = { a: 2 }, [ b ] = [ 5 ];
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: [{
          declarations: [
            {
              id: {
                loc: null,
                properties: [
                  {
                    key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                    kind: "init",
                    loc: null,
                    type: "Property",
                    value: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                  } as IProperty,
                ],
                type: "ObjectPattern",
              } as IObjectPattern,
              init: {
                loc: null,
                properties: [
                  {
                    key: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                    kind: "init",
                    loc: null,
                    type: "Property",
                    value: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
                  } as IProperty,
                ],
                type: "ObjectExpression",
              } as IObjectExpression,
              loc: null,
              type: "VariableDeclarator",
            } as IVariableDeclarator,
            {
              id: {
                elements: [
                  { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                ],
                loc: null,
                type: "ArrayPattern",
              } as IArrayPattern,
              init: {
                elements: [
                  { type: "Literal", loc: null, value: 5, raw: "5" } as ILiteral,
                ],
                loc: null,
                type: "ArrayExpression",
              } as IArrayExpression,
              loc: null,
              type: "VariableDeclarator",
            } as IVariableDeclarator,
          ],
          kind: "const",
          loc: null,
          type: "VariableDeclaration",
        } as IVariableDeclaration],
        loc: null,
        type: "BlockStatement",
      } as IBlockStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
