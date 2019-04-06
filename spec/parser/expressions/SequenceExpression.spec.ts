import { ISequenceExpression } from "../../../src/ast/expressions/SequenceExpression";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { IProgram } from "../../../src/ast/programs/Program";
import { IExpressionStatement } from "../../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::SequenceExpression", () => {
  it("Should properly parse the sequence of expressions", () => {
    const source = `foo, bar;`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          expressions: [
            { name: "foo", type: "Identifier" } as IIdentifier,
            { name: "bar", type: "Identifier" } as IIdentifier,
          ],
          loc: null,
          type: "SequenceExpression",
        } as ISequenceExpression,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
