import { INewExpression } from '../../../src/ast/expressions/NewExpression';
import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { IExpressionStatement } from '../../../src/ast/statements/ExpressionStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::NewExpression', () => {
  it('Should properly parse new expression', () => {
    const source = 'new Class();';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          arguments: [],
          callee: { type: 'Identifier', loc: null, name: 'Class' } as IIdentifier,
          loc: null,
          type: 'NewExpression'
        } as INewExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });
});
