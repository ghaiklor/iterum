import { ILiteral } from "../../../src/ast/literals/Literal";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { IImportDeclaration } from "../../../src/ast/modules/ImportDeclaration";
import { IImportDefaultSpecifier } from "../../../src/ast/modules/ImportDefaultSpecifier";
import { IImportNamespaceSpecifier } from "../../../src/ast/modules/ImportNamespaceSpecifier";
import { IImportSpecifier } from "../../../src/ast/modules/ImportSpecifier";
import { IProgram } from "../../../src/ast/programs/Program";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::ImportDeclaration", () => {
  it("Should properly parse the default specifiers", () => {
    const source = `import foo from 'bar'`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        source: { type: "Literal", loc: null, value: "bar", raw: "bar" } as ILiteral,
        specifiers: [{
          loc: null,
          local: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
          type: "ImportDefaultSpecifier",
        } as IImportDefaultSpecifier],
        type: "ImportDeclaration",
      } as IImportDeclaration],
      loc: null,
      sourceType: "module",
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse the namespace specifiers", () => {
    const source = `import * as foo from 'bar';`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        source: { type: "Literal", loc: null, value: "bar", raw: "bar" } as ILiteral,
        specifiers: [{
          loc: null,
          local: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
          type: "ImportNamespaceSpecifier",
        } as IImportNamespaceSpecifier],
        type: "ImportDeclaration",
      } as IImportDeclaration],
      loc: null,
      sourceType: "module",
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse the named specifiers", () => {
    const source = `import { foo, bar as baz } from 'bar';`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        source: { type: "Literal", loc: null, value: "bar", raw: "bar" } as ILiteral,
        specifiers: [
          {
            imported: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
            loc: null,
            local: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
            type: "ImportSpecifier",
          } as IImportSpecifier,
          {
            imported: { type: "Identifier", loc: null, name: "bar" } as IIdentifier,
            loc: null,
            local: { type: "Identifier", loc: null, name: "baz" } as IIdentifier,
            type: "ImportSpecifier",
          } as IImportSpecifier,
        ],
        type: "ImportDeclaration",
      } as IImportDeclaration],
      loc: null,
      sourceType: "module",
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse the empty named specifiers", () => {
    const source = `import { } from 'bar';`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        loc: null,
        source: { type: "Literal", loc: null, value: "bar", raw: "bar" } as ILiteral,
        specifiers: [],
        type: "ImportDeclaration",
      } as IImportDeclaration],
      loc: null,
      sourceType: "module",
      type: "Program",
    } as IProgram);
  });
});
