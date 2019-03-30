import { ILiteral } from "../../src/ast/miscellaneous/Literal";
import { IProgram } from "../../src/ast/programs/Program";
import { IExpressionStatement } from "../../src/ast/statements/ExpressionStatement";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Parser::Literal", () => {
  it("Should properly parse string literals", () => {
    const source = `"Hello, World!";`;
    const ast = Parser.parse(source);

    expect(ast).toMatchObject({
      body: [{
        expression: {
          loc: null,
          raw: "Hello, World!",
          type: "Literal",
          value: "Hello, World!",
        } as ILiteral,
        loc: null,
        type: "ExpressionStatement",
      } as IExpressionStatement],
      loc: null,
      type: "Program",
    } as IProgram);
  });
});
