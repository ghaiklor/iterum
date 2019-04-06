import { ISwitchCase } from "../../../src/ast/clauses/SwitchCase";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { ILiteral } from "../../../src/ast/miscellaneous/Literal";
import { IProgram } from "../../../src/ast/programs/Program";
import { IExpressionStatement } from "../../../src/ast/statements/ExpressionStatement";
import { ISwitchStatement } from "../../../src/ast/statements/SwitchStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::SwitchStatement", () => {
  it("Should properly parse the statement", () => {
    const source = `
      switch (foo) {
        case 'bar':
          1;
        case 'baz':
          2;
        default:
          3;
      }
    `;

    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        cases: [
          {
            consequent: [{
              expression: { type: "Literal", loc: null, value: 1, raw: "1" } as ILiteral,
              loc: null,
              type: "ExpressionStatement",
            } as IExpressionStatement],
            loc: null,
            test: { type: "Literal", loc: null, value: "bar", raw: "bar" } as ILiteral,
            type: "SwitchCase",
          } as ISwitchCase,
          {
            consequent: [{
              expression: { type: "Literal", loc: null, value: 2, raw: "2" } as ILiteral,
              loc: null,
              type: "ExpressionStatement",
            } as IExpressionStatement],
            loc: null,
            test: { type: "Literal", loc: null, value: "baz", raw: "baz" } as ILiteral,
            type: "SwitchCase",
          } as ISwitchCase,
          {
            consequent: [{
              expression: { type: "Literal", loc: null, value: 3, raw: "3" } as ILiteral,
              loc: null,
              type: "ExpressionStatement",
            } as IExpressionStatement],
            loc: null,
            test: null,
            type: "SwitchCase",
          } as ISwitchCase,
        ],
        discriminant: { type: "Identifier", loc: null, name: "foo" } as IIdentifier,
        lexical: true,
        loc: null,
        type: "SwitchStatement",
      } as ISwitchStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
