import { IBinaryExpression } from '../../../src/ast/expressions/BinaryExpression';
import { IFunctionExpression } from '../../../src/ast/expressions/FunctionExpression';
import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { IBlockStatement } from '../../../src/ast/statements/BlockStatement';
import { IExpressionStatement } from '../../../src/ast/statements/ExpressionStatement';
import { IReturnStatement } from '../../../src/ast/statements/ReturnStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::FunctionExpression', () => {
  it('Should properly parse the expression', () => {
    const source = `
      (function add(a, b) {
        return a + b;
      });
    `;

    const ast = Parser.parse(source);
    expect(ast).toMatchObject({
      body: [{
        expression: {
          async: false,
          body: {
            body: [{
              argument: {
                left: { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
                loc: null,
                operator: '+',
                right: { type: 'Identifier', loc: null, name: 'b' } as IIdentifier,
                type: 'BinaryExpression'
              } as IBinaryExpression,
              loc: null,
              type: 'ReturnStatement'
            } as IReturnStatement],
            loc: null,
            type: 'BlockStatement'
          } as IBlockStatement,
          generator: false,
          id: { type: 'Identifier', loc: null, name: 'add' } as IIdentifier,
          loc: null,
          params: [
            { type: 'Identifier', loc: null, name: 'a' } as IIdentifier,
            { type: 'Identifier', loc: null, name: 'b' } as IIdentifier
          ],
          type: 'FunctionExpression'
        } as IFunctionExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });
});
