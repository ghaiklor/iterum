import { IMemberExpression } from '../../../src/ast/expressions/MemberExpression';
import { IUnaryExpression } from '../../../src/ast/expressions/UnaryExpression';
import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { IExpressionStatement } from '../../../src/ast/statements/ExpressionStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::UnaryExpression', () => {
  it('Should properly parse NOT expression', () => {
    const source = '!a;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '!',
          prefix: true,
          type: 'UnaryExpression'
        } as IUnaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse bitwise NOT expression', () => {
    const source = '~a;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '~',
          prefix: true,
          type: 'UnaryExpression'
        } as IUnaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse minus expression', () => {
    const source = '-a;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '-',
          prefix: true,
          type: 'UnaryExpression'
        } as IUnaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse plus expression', () => {
    const source = '+a;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '+',
          prefix: true,
          type: 'UnaryExpression'
        } as IUnaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse typeof expression', () => {
    const source = 'typeof a;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: 'typeof',
          prefix: true,
          type: 'UnaryExpression'
        } as IUnaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse void expression', () => {
    const source = 'void a;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: 'void',
          prefix: true,
          type: 'UnaryExpression'
        } as IUnaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse delete expression', () => {
    const source = 'delete a.b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          argument: {
            computed: false,
            loc: null,
            object: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
            property: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
            type: 'MemberExpression'
          } as IMemberExpression,
          loc: null,
          operator: 'delete',
          prefix: true,
          type: 'UnaryExpression'
        } as IUnaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });
});
