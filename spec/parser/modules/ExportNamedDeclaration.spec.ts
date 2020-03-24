import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IExportNamedDeclaration } from '../../../src/ast/modules/ExportNamedDeclaration';
import { IExportSpecifier } from '../../../src/ast/modules/ExportSpecifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::ExportNamedDeclaration', () => {
  it('Should properly parse the declaration', () => {
    const source = 'export { foo, bar as baz }';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declaration: null,
        loc: null,
        source: null,
        specifiers: [
          {
            exported: { type: 'Identifier', loc: null, name: 'foo' } as IIdentifier,
            loc: null,
            local: { type: 'Identifier', loc: null, name: 'foo' } as IIdentifier,
            type: 'ExportSpecifier'
          } as IExportSpecifier,
          {
            exported: { type: 'Identifier', loc: null, name: 'baz' } as IIdentifier,
            loc: null,
            local: { type: 'Identifier', loc: null, name: 'bar' } as IIdentifier,
            type: 'ExportSpecifier'
          } as IExportSpecifier
        ],
        type: 'ExportNamedDeclaration'
      } as IExportNamedDeclaration],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse the declaration without specifiers', () => {
    const source = 'export { }';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declaration: null,
        loc: null,
        source: null,
        specifiers: [],
        type: 'ExportNamedDeclaration'
      } as IExportNamedDeclaration],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });
});
