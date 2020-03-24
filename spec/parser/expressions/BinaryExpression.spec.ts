import { IBinaryExpression } from '../../../src/ast/expressions/BinaryExpression';
import { ILiteral } from '../../../src/ast/literals/Literal';
import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { IExpressionStatement } from '../../../src/ast/statements/ExpressionStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::BinaryExpression', () => {
  it('Should properly parse the simplest expression with +', () => {
    const source = '5 + 2;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 5, raw: '5', loc: null, type: 'Literal' } as ILiteral,
          loc: null,
          operator: '+',
          right: { value: 2, raw: '2', loc: null, type: 'Literal' } as ILiteral,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse the simplest expression with the correct precedence', () => {
    const source = '5 + 10 / 2;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 5, raw: '5', loc: null, type: 'Literal' } as ILiteral,
          loc: null,
          operator: '+',
          right: {
            left: { value: 10, raw: '10', loc: null, type: 'Literal' } as ILiteral,
            loc: null,
            operator: '/',
            right: { value: 2, raw: '2', loc: null, type: 'Literal' } as ILiteral,
            type: 'BinaryExpression'
          } as IBinaryExpression,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse expression within parenthesis', () => {
    const source = '5 * (10 + 2);';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 5, raw: '5', type: 'Literal', loc: null } as ILiteral,
          loc: null,
          operator: '*',
          right: {
            left: { value: 10, raw: '10', type: 'Literal', loc: null } as ILiteral,
            loc: null,
            operator: '+',
            right: { value: 2, raw: '2', type: 'Literal', loc: null } as ILiteral,
            type: 'BinaryExpression'
          } as IBinaryExpression,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse binary expression with hexadecimal literals', () => {
    const source = '0x10 + 0xF;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 16, raw: '0x10', type: 'Literal', loc: null } as ILiteral,
          loc: null,
          operator: '+',
          right: { value: 15, raw: '0xF', type: 'Literal', loc: null } as ILiteral,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse binary expression with octal literals', () => {
    const source = '0o10 + 0o15;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 8, raw: '0o10', type: 'Literal', loc: null } as ILiteral,
          loc: null,
          operator: '+',
          right: { value: 13, raw: '0o15', type: 'Literal', loc: null } as ILiteral,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse binary expression with binary literals', () => {
    const source = '0b10 + 0b100;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { value: 2, raw: '0b10', type: 'Literal', loc: null } as ILiteral,
          loc: null,
          operator: '+',
          right: { value: 4, raw: '0b100', type: 'Literal', loc: null } as ILiteral,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse bitwise OR expression', () => {
    const source = 'a | b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '|',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse bitwise XOR expression', () => {
    const source = 'a ^ b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '^',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse bitwise AND expression', () => {
    const source = 'a & b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '&',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse non strict equality expression (==)', () => {
    const source = 'a == b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '==',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse non strict equality expression (!=)', () => {
    const source = 'a != b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '!=',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse strict equality expression (===)', () => {
    const source = 'a === b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '===',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse strict equality expression (!==)', () => {
    const source = 'a !== b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '!==',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse in expression', () => {
    const source = 'a in b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: 'in',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse instanceof expression', () => {
    const source = 'a instanceof b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: 'instanceof',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse < expression', () => {
    const source = 'a < b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '<',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse <= expression', () => {
    const source = 'a <= b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '<=',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse > expression', () => {
    const source = 'a > b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '>',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse >= expression', () => {
    const source = 'a >= b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '>=',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse logical bitwise right shift expression', () => {
    const source = 'a >>> b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '>>>',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse arithmetic bitwise right shift expression', () => {
    const source = 'a >> b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '>>',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse bitwise left shift expression', () => {
    const source = 'a << b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '<<',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse minus expression', () => {
    const source = 'a - b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '-',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse add expression', () => {
    const source = 'a + b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '+',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse multiply expression', () => {
    const source = 'a * b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '*',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse divide expression', () => {
    const source = 'a / b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '/',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse modulus expression', () => {
    const source = 'a % b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '%',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse exponentiation expression', () => {
    const source = 'a ** b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '**',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });
});
