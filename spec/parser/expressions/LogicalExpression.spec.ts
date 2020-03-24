import { ILogicalExpression } from '../../../src/ast/expressions/LogicalExpression';
import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { IExpressionStatement } from '../../../src/ast/statements/ExpressionStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::LogicalExpression', () => {
  it('Should properly parse logical OR expression', () => {
    const source = 'a || b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '||',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'LogicalExpression'
        } as ILogicalExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse logical AND expression', () => {
    const source = 'a && b;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
          loc: null,
          operator: '&&',
          right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
          type: 'LogicalExpression'
        } as ILogicalExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });
});
