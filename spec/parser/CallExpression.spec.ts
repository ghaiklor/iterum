import { ICallExpression } from "../../src/ast/expressions/CallExpression";
import { IIdentifier } from "../../src/ast/miscellaneous/Identifier";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::CallExpression", () => {
  it("Should properly parse call expression", () => {
    const source = `a()`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          arguments: [],
          callee: { type: "Identifier", loc: null, name: "a" } as IIdentifier,
          loc: null,
          type: "CallExpression",
        } as ICallExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
