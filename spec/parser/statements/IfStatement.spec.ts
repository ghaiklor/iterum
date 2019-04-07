import { ILiteral } from "../../../src/ast/literals/Literal";
import { IProgram } from "../../../src/ast/programs/Program";
import { IBlockStatement } from "../../../src/ast/statements/BlockStatement";
import { IIfStatement } from "../../../src/ast/statements/IfStatement";
import { IReturnStatement } from "../../../src/ast/statements/ReturnStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::IfStatement", () => {
  it("Should properly parse the if statement without alternate branch", () => {
    const source = `
      if (true) {
        return 2;
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        alternate: null,
        consequent: {
          body: [{
            argument: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
            loc: null,
            type: "ReturnStatement",
          } as IReturnStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        loc: null,
        test: { type: "Literal", loc: null, value: true, raw: "true" } as ILiteral,
        type: "IfStatement",
      } as IIfStatement],
      loc: null,
      sourceType: "module",
      type: "Program",
    } as IProgram);
  });

  it("Should properly parse the if statement with alternate branch", () => {
    const source = `
      if (true) {
        return 2;
      } else {
        return 3;
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        alternate: {
          body: [{
            argument: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
            loc: null,
            type: "ReturnStatement",
          } as IReturnStatement],
          loc: null,
          type: "BlockStatement",
        },
        consequent: {
          body: [{
            argument: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
            loc: null,
            type: "ReturnStatement",
          } as IReturnStatement],
          loc: null,
          type: "BlockStatement",
        } as IBlockStatement,
        loc: null,
        test: { type: "Literal", loc: null, value: true, raw: "true" } as ILiteral,
        type: "IfStatement",
      } as IIfStatement],
      loc: null,
      sourceType: "module",
      type: "Program",
    } as IProgram);
  });
});
