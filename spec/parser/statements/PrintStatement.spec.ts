import { IBinaryExpression } from '../../../src/ast/expressions/BinaryExpression';
import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { IPrintStatement } from '../../../src/ast/statements/PrintStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::PrintStatement', () => {
  it('Should properly parse the statement', () => {
    const source = 'print a + b;';
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
        type: 'PrintStatement'
      } as IPrintStatement],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });
});
