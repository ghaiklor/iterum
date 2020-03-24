import { ILiteral } from '../../../src/ast/literals/Literal';
import { IExportAllDeclaration } from '../../../src/ast/modules/ExportAllDeclaration';
import { IProgram } from '../../../src/ast/programs/Program';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::ExportAllDeclaration', () => {
  it('Should properly parse the declaration', () => {
    const source = 'export * from \'foo\'';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        loc: null,
        source: { type: 'Literal', loc: null, value: 'foo', raw: 'foo' } as ILiteral,
        type: 'ExportAllDeclaration'
      } as IExportAllDeclaration],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });
});
