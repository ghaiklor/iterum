import { INewExpression } from "../../../src/ast/expressions/NewExpression";
import { ILiteral } from "../../../src/ast/literals/Literal";
import { IIdentifier } from "../../../src/ast/miscellaneous/Identifier";
import { IProgram } from "../../../src/ast/programs/Program";
import { IThrowStatement } from "../../../src/ast/statements/ThrowStatement";
import { Parser } from "../../../src/parser/Parser";

describe("Iterum::Parser::ThrowStatement", () => {
  it("Should properly parse the statement", () => {
    const source = `throw new Error("Error message here");`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        argument: {
          arguments: [{
            loc: null,
            raw: "Error message here",
            type: "Literal",
            value: "Error message here",
          } as ILiteral],
          callee: { type: "Identifier", loc: null, name: "Error" } as IIdentifier,
          loc: null,
          type: "NewExpression",
        } as INewExpression,
        loc: null,
        type: "ThrowStatement",
      } as IThrowStatement],
      loc: null,
      sourceType: "module",
      type: "Program",
    } as IProgram);
  });
});
