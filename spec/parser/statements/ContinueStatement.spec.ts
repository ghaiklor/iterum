import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { IContinueStatement } from '../../../src/ast/statements/ContinueStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::ContinueStatement', () => {
  it('Should properly parse the statement without label', () => {
    const source = 'continue;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        label: null,
        loc: null,
        type: 'ContinueStatement'
      } as IContinueStatement],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse the statement with label', () => {
    const source = 'continue foo;';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        label: { type: 'Identifier', loc: null, name: 'foo' } as IIdentifier,
        loc: null,
        type: 'ContinueStatement'
      } as IContinueStatement],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });
});
