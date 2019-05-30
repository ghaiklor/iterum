import { IFunctionDeclaration } from "../../../src/ast/declarations/FunctionDeclaration";
import { IBinaryExpression } from "../../../src/ast/expressions/BinaryExpression";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { IProgram } from "../../../src/ast/programs/Program";
import { IBlockStatement } from "../../../src/ast/statements/BlockStatement";
import { IReturnStatement } from "../../../src/ast/statements/ReturnStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::FunctionDeclaration", () => {
  it("Should properly parse function declaration in block", () => {
    const source = `
      {
        function add(a, b) {
          return a + b;
        };
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        body: [{
          async: false,
          body: {
            body: [
              {
                argument: {
                  left: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
                  loc: null,
                  operator: "+",
                  right: { type: "Identifier", loc: null, name: "b" } as IIdentifier,
                  type: "BinaryExpression",
                } as IBinaryExpression,
                loc: null,
                type: "ReturnStatement",
              } as IReturnStatement,
            ],
            loc: null,
            type: "BlockStatement",
          } as IBlockStatement,
          generator: false,
          id: { type: "Identifier", loc: null, name: "add" } as IIdentifier,
          loc: null,
          params: [
            { type: "Identifier", loc: null, name: "a" } as IIdentifier,
            { type: "Identifier", loc: null, name: "b" } as IIdentifier,
          ],
          type: "FunctionDeclaration",
        } as IFunctionDeclaration],
        loc: null,
        type: "BlockStatement",
      } as IBlockStatement],
      loc: null,
      sourceType: "module",
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse function declaration outside of lexical block", () => {
    const source = `
      function add(a, b) {
        return a + b;
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        async: false,
        body: {
          body: [{
            argument: {
              left: { type: "Identifier", name: "a" } as IIdentifier,
              loc: null,
              operator: "+",
              right: { type: "Identifier", name: "b" } as IIdentifier,
              type: "BinaryExpression",
            } as IBinaryExpression,
            loc: null,
            type: "ReturnStatement",
          } as IReturnStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        generator: false,
        id: { type: "Identifier", name: "add", loc: null } as IIdentifier,
        loc: null,
        params: [
          { type: "Identifier", name: "a", loc: null } as IIdentifier,
          { type: "Identifier", name: "b", loc: null } as IIdentifier,
        ],
        type: "FunctionDeclaration",
      } as IFunctionDeclaration],
      loc: null,
      sourceType: "module",
      type: "Program",
    } as IProgram);
  });
});
