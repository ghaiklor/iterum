import { IBinaryExpression } from '../../../src/ast/expressions/BinaryExpression';
import { ILiteral } from '../../../src/ast/literals/Literal';
import { IProgram } from '../../../src/ast/programs/Program';
import { IReturnStatement } from '../../../src/ast/statements/ReturnStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::ReturnStatement', () => {
  it('Should properly parse the statement', () => {
    const source = 'return 2 + 3;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        argument: {
          left: { type: 'Literal', loc: null, value: 2, raw: '2' } as ILiteral,
          loc: null,
          operator: '+',
          right: { type: 'Literal', loc: null, value: 3, raw: '3' } as ILiteral,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        loc: null,
        type: 'ReturnStatement'
      } as IReturnStatement],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });
});
