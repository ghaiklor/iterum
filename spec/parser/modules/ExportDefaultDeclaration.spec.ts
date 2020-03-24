import { IClassBody } from '../../../src/ast/classes/ClassBody';
import { IClassDeclaration } from '../../../src/ast/classes/ClassDeclaration';
import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IExportDefaultDeclaration } from '../../../src/ast/modules/ExportDefaultDeclaration';
import { IProgram } from '../../../src/ast/programs/Program';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::ExportDefaultDeclaration', () => {
  it('Should properly parse the declaration', () => {
    const source = 'export default class Foo {}';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        declaration: {
          body: { type: 'ClassBody', loc: null, body: [] } as IClassBody,
          id: { type: 'Identifier', loc: null, name: 'Foo' } as IIdentifier,
          superClass: null,
          type: 'ClassDeclaration'
        } as IClassDeclaration,
        loc: null,
        type: 'ExportDefaultDeclaration'
      } as IExportDefaultDeclaration],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });
});
