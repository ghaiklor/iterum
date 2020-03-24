import { IFunctionDeclaration } from '../../src/ast/declarations/FunctionDeclaration';
import { IBinaryExpression } from '../../src/ast/expressions/BinaryExpression';
import { ICallExpression } from '../../src/ast/expressions/CallExpression';
import { IMemberExpression } from '../../src/ast/expressions/MemberExpression';
import { ILiteral } from '../../src/ast/literals/Literal';
import { IIdentifier } from '../../src/ast/miscellaneous/Identifier';
import { IExportNamedDeclaration } from '../../src/ast/modules/ExportNamedDeclaration';
import { IExportSpecifier } from '../../src/ast/modules/ExportSpecifier';
import { IImportDeclaration } from '../../src/ast/modules/ImportDeclaration';
import { IImportSpecifier } from '../../src/ast/modules/ImportSpecifier';
import { IProgram } from '../../src/ast/programs/Program';
import { IBlockStatement } from '../../src/ast/statements/BlockStatement';
import { IExpressionStatement } from '../../src/ast/statements/ExpressionStatement';
import { IReturnStatement } from '../../src/ast/statements/ReturnStatement';
import { Parser } from '../../src/parser/Parser';

describe('Iterum::Parser::Program', () => {
  it('Should properly parse multiple import/export declarations', () => {
    const source = `
      import { foo, bar as baz } from 'bar';
      export { foo };
    `;

    const ast = Parser.parse(source);
    expect(ast).toMatchObject({
      body: [
        {
          source: { type: 'Literal', loc: null, value: 'bar', raw: 'bar' } as ILiteral,
          specifiers: [
            {
              imported: { type: 'Identifier', loc: null, name: 'foo' } as IIdentifier,
              loc: null,
              local: { type: 'Identifier', loc: null, name: 'foo' } as IIdentifier,
              type: 'ImportSpecifier'
            } as IImportSpecifier,
            {
              imported: { type: 'Identifier', loc: null, name: 'bar' } as IIdentifier,
              loc: null,
              local: { type: 'Identifier', loc: null, name: 'baz' } as IIdentifier,
              type: 'ImportSpecifier'
            } as IImportSpecifier
          ],
          type: 'ImportDeclaration'
        } as IImportDeclaration,
        {
          declaration: null,
          loc: null,
          source: null,
          specifiers: [
            {
              exported: { type: 'Identifier', loc: null, name: 'foo' } as IIdentifier,
              loc: null,
              local: { type: 'Identifier', loc: null, name: 'foo' } as IIdentifier,
              type: 'ExportSpecifier'
            } as IExportSpecifier
          ],
          type: 'ExportNamedDeclaration'
        } as IExportNamedDeclaration
      ],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse the program that sums up two numbers', () => {
    const source = `
      function add(a, b) {
        return a + b;
      }

      console.log(2, 5);
    `;

    const ast = Parser.parse(source);
    expect(ast).toMatchObject({
      body: [
        {
          async: false,
          body: {
            body: [
              {
                argument: {
                  left: { type: 'Identifier', loc: null, name: 'a' },
                  loc: null,
                  operator: '+',
                  right: { type: 'Identifier', loc: null, name: 'b' },
                  type: 'BinaryExpression'
                } as IBinaryExpression,
                loc: null,
                type: 'ReturnStatement'
              } as IReturnStatement
            ],
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
          type: 'FunctionDeclaration'
        } as IFunctionDeclaration,
        {
          expression: {
            arguments: [
              { type: 'Literal', loc: null, value: 2, raw: '2' } as ILiteral,
              { type: 'Literal', loc: null, value: 5, raw: '5' } as ILiteral
            ],
            callee: {
              computed: false,
              loc: null,
              object: {
                loc: null,
                name: 'console',
                type: 'Identifier'
              } as IIdentifier,
              property: {
                loc: null,
                name: 'log',
                type: 'Identifier'
              } as IIdentifier,
              type: 'MemberExpression'
            } as IMemberExpression,
            loc: null,
            type: 'CallExpression'
          } as ICallExpression,
          loc: null,
          type: 'ExpressionStatement'
        } as IExpressionStatement
      ],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });
});
