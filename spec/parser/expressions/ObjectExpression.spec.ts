import { IObjectExpression } from '../../../src/ast/expressions/ObjectExpression';
import { ILiteral } from '../../../src/ast/literals/Literal';
import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { IProperty } from '../../../src/ast/properties/Property';
import { IExpressionStatement } from '../../../src/ast/statements/ExpressionStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::ObjectExpression', () => {
  it('Should properly parse object literals with multiply properties', () => {
    const source = '({ foo: "bar", bar: 2 });';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          properties: [
            {
              computed: false,
              key: { name: 'foo', type: 'Identifier' } as IIdentifier,
              kind: 'init',
              loc: null,
              method: false,
              shorthand: false,
              type: 'Property',
              value: { value: 'bar', raw: 'bar', type: 'Literal', loc: null } as ILiteral
            } as IProperty,
            {
              computed: false,
              key: { name: 'bar', type: 'Identifier', loc: null } as IIdentifier,
              kind: 'init',
              loc: null,
              method: false,
              shorthand: false,
              type: 'Property',
              value: { value: 2, raw: '2', type: 'Literal', loc: null } as ILiteral
            } as IProperty
          ],
          type: 'ObjectExpression'
        } as IObjectExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse object literals with no properties', () => {
    const source = '({ });';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          loc: null,
          properties: [],
          type: 'ObjectExpression'
        } as IObjectExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse object literals with destructuring properties', () => {
    const source = '({ foo, bar });';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          loc: null,
          properties: [
            {
              computed: false,
              key: { name: 'foo', type: 'Identifier' } as IIdentifier,
              kind: 'init',
              loc: null,
              method: false,
              shorthand: true,
              type: 'Property',
              value: { name: 'foo', type: 'Identifier' } as IIdentifier
            } as IProperty,
            {
              computed: false,
              key: { name: 'bar', type: 'Identifier' } as IIdentifier,
              kind: 'init',
              loc: null,
              method: false,
              shorthand: true,
              type: 'Property',
              value: { name: 'bar', type: 'Identifier' } as IIdentifier
            } as IProperty],
          type: 'ObjectExpression'
        } as IObjectExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse object literals with literal properties', () => {
    const source = '({ 5: "foo" });';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          properties: [
            {
              computed: false,
              key: { value: 5, raw: '5', type: 'Literal', loc: null } as ILiteral,
              kind: 'init',
              loc: null,
              method: false,
              shorthand: false,
              type: 'Property',
              value: { value: 'foo', raw: 'foo', type: 'Literal', loc: null } as ILiteral
            } as IProperty
          ],
          type: 'ObjectExpression'
        } as IObjectExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });
});
