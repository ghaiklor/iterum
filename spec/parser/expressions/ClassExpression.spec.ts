import { IClassBody } from '../../../src/ast/classes/ClassBody';
import { IClassExpression } from '../../../src/ast/expressions/ClassExpression';
import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { IExpressionStatement } from '../../../src/ast/statements/ExpressionStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::ClassExpression', () => {
  it('Should properly parse the expression', () => {
    const source = '(class Foo {});';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          body: {
            body: [],
            loc: null,
            type: 'ClassBody'
          } as IClassBody,
          id: { type: 'Identifier', loc: null, name: 'Foo' } as IIdentifier,
          loc: null,
          superClass: null,
          type: 'ClassExpression'
        } as IClassExpression,
        loc: null,
        type: 'ExpressionStatement'
      } as IExpressionStatement],
      loc: null,
      type: 'Program'
    } as IProgram);
  });
});
