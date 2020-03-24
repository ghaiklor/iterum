import { IVariableDeclaration } from '../../../src/ast/declarations/VariableDeclaration';
import { IVariableDeclarator } from '../../../src/ast/declarations/VariableDeclarator';
import { IBinaryExpression } from '../../../src/ast/expressions/BinaryExpression';
import { IUpdateExpression } from '../../../src/ast/expressions/UpdateExpression';
import { ILiteral } from '../../../src/ast/literals/Literal';
import { IIdentifier } from '../../../src/ast/miscellaneous/Identifier';
import { IProgram } from '../../../src/ast/programs/Program';
import { IBlockStatement } from '../../../src/ast/statements/BlockStatement';
import { IForStatement } from '../../../src/ast/statements/ForStatement';
import { Parser } from '../../../src/parser/Parser';

describe('Iterum::Parser::ForStatement', () => {
  it('Should properly parse for statement with variable initializer', () => {
    const source = 'for (var i = 0; i < 2; i++) {}';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: {
          body: [],
          loc: null,
          type: 'BlockStatement'
        } as IBlockStatement,
        init: {
          declarations: [{
            id: { type: 'Identifier', loc: null, name: 'i' } as IIdentifier,
            init: { type: 'Literal', loc: null, value: 0, raw: '0' } as ILiteral,
            loc: null,
            type: 'VariableDeclarator'
          } as IVariableDeclarator],
          kind: 'var',
          loc: null,
          type: 'VariableDeclaration'
        } as IVariableDeclaration,
        loc: null,
        test: {
          left: { type: 'Identifier', loc: null, name: 'i' } as IIdentifier,
          loc: null,
          operator: '<',
          right: { type: 'Literal', loc: null, value: 2, raw: '2' } as ILiteral,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        type: 'ForStatement',
        update: {
          argument: { type: 'Identifier', loc: null, name: 'i' } as IIdentifier,
          loc: null,
          operator: '++',
          prefix: false,
          type: 'UpdateExpression'
        } as IUpdateExpression
      } as IForStatement],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse for statement with lexical initializer', () => {
    const source = 'for (let i = 0; i < 2; i++) {}';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: {
          body: [],
          loc: null,
          type: 'BlockStatement'
        } as IBlockStatement,
        init: {
          declarations: [{
            id: { type: 'Identifier', loc: null, name: 'i' } as IIdentifier,
            init: { type: 'Literal', loc: null, value: 0, raw: '0' } as ILiteral,
            loc: null,
            type: 'VariableDeclarator'
          } as IVariableDeclarator],
          kind: 'let',
          loc: null,
          type: 'VariableDeclaration'
        } as IVariableDeclaration,
        loc: null,
        test: {
          left: { type: 'Identifier', loc: null, name: 'i' } as IIdentifier,
          loc: null,
          operator: '<',
          right: { type: 'Literal', loc: null, value: 2, raw: '2' } as ILiteral,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        type: 'ForStatement',
        update: {
          argument: { type: 'Identifier', loc: null, name: 'i' } as IIdentifier,
          loc: null,
          operator: '++',
          prefix: false,
          type: 'UpdateExpression'
        } as IUpdateExpression
      } as IForStatement],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });

  it('Should properly parse for statement without var/let/const as initializers', () => {
    const source = 'for (i; i < 2; i++) {}';
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: {
          body: [],
          loc: null,
          type: 'BlockStatement'
        } as IBlockStatement,
        init: { type: 'Identifier', loc: null, name: 'i' } as IIdentifier,
        loc: null,
        test: {
          left: { type: 'Identifier', loc: null, name: 'i' } as IIdentifier,
          loc: null,
          operator: '<',
          right: { type: 'Literal', loc: null, value: 2, raw: '2' } as ILiteral,
          type: 'BinaryExpression'
        } as IBinaryExpression,
        type: 'ForStatement',
        update: {
          argument: { type: 'Identifier', loc: null, name: 'i' } as IIdentifier,
          loc: null,
          operator: '++',
          prefix: false,
          type: 'UpdateExpression'
        } as IUpdateExpression
      } as IForStatement],
      loc: null,
      sourceType: 'module',
      type: 'Program'
    } as IProgram);
  });
});
